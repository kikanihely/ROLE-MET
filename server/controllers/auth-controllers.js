const pdfParse = require("pdf-parse");
const langFlowGetScore = require("./upload-resume-langflow-api");
const Company = require('../models/companyModel');
const Candidate = require("../models/user-model");
const bcrypt = require("bcryptjs");
const Job = require("../models/job-model");
const jwt = require("jsonwebtoken")
const { registerSchema, loginSchema } = require("../validators/auth-validator");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const {
      fullName, city, state, jobTitle, experience, industry,
      skills, linkedin, github, resume, email, password,
    } = parsed.data;

    const userExist = await Candidate.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "Email already exists" });

    const userCreated = await Candidate.create({
      fullName, city, state, jobTitle, experience, industry,
      skills, linkedin, github, resume, email, password,
    });

    const token = await userCreated.generateToken();

    res.status(201).json({
      message: "Registration successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login for candidate / company
const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.errors });
  }

  const { email, emailId, password, role } = parsed.data;
  const userEmail = email || emailId;

  let user;

  try {
    if (role === "candidate") {
      user = await Candidate.findOne({ email: userEmail }).select("+password");
    } else if (role === "company") {
      user = await Company.findOne({ emailId: userEmail }).select("+password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName // or whatever fields you want
      },
      role: user.role
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Resume upload and score analysis
// Resume upload and score analysis
const uploadResume = async (req, res) => {
  // console.log(req.file, req.body)
  // res.status(500).json({ error: "Internal Server Error" });

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    // Extract text from PDF
    const data = await pdfParse(req.file.buffer);
    let extractedText = data.text;

    extractedText += "Job Description: " + req.jobDescription;
    try {
      const result = await langFlowGetScore(extractedText);

      return res.json({
        text: extractedText,
        score: result.score,
        suggestions: result.suggestions,
      });
    } catch (error) {
      console.error("Error getting response from langflow:", error);
      if (!res.headersSent) {
        return res.status(500).json({ error: "Langflow Server Error" });
      }
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get candidate user by ID
const getUser = async (req, res) => {
  try {
    const user = await Candidate.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Company registration
const companyRegister = async (req, res) => {
  try {
    const {
      companyName,
      emailId,
      password,
      number,
      website,
      linkedIn,
      address,
      city,
      state,
      numberOfEmployees,
      companyDescription,
    } = req.body;

    const logoUrl = req.file?.path || "";

    const existingCompany = await Company.findOne({ emailId });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newCompany = new Company({
      companyName,
      emailId,
      password,
      number,
      website,
      linkedIn,
      address,
      city,
      state,
      numberOfEmployees,
      companyDescription,
      logoUrl,
    });

    await newCompany.save();

    res.status(201).json({
      message: 'Company registered successfully',
      company: newCompany,
    });
  } catch (error) {
    console.error("Company Registration Error:", error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const addJob = async (req, res) => {
  try {
    const { title, description, location, experience, salaryRange, skillsRequired } = req.body;
    const companyId = req.user.userId;

    const job = new Job({
      title,
      description,
      location,
      experience,
      salaryRange,
      skillsRequired,
      company: companyId,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({
      message: "Failed to post job",
      error: error.message,
    });
  }
};

// Get all jobs posted by logged-in company
const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user.userId;

    const jobs = await Job.find({ company: companyId }).sort({ createdAt: -1 });
    
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};


//Delete jobs
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Edit jobs
const editJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update editable fields
    user.fullName = req.body.fullName || user.fullName;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.experience = req.body.experience ?? user.experience;
    user.industry = req.body.industry || user.industry;
    user.skills = req.body.skills || user.skills;
    user.linkedin = req.body.linkedin || user.linkedin;
    user.github = req.body.github || user.github;
    user.resume = req.body.resume || user.resume;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
};


module.exports = {
  home,
  register,
  login,
  uploadResume,
  getUser,
  companyRegister,
  addJob,
  getCompanyJobs,
  deleteJob,
  editJob,
  getJobById,
  updateUserProfile 
};
