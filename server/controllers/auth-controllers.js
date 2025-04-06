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

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Resume upload and score analysis
const uploadResume = async (req, res) => {
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
    const result = await langFlowGetScore(extractedText);

    res.json({ text: extractedText });
  } catch (error) {
    console.error("Error extracting text:", error);
    res.status(500).json({ error: "Internal Server Error" });
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


module.exports = {
  home,
  register,
  login,
  uploadResume,
  getUser,
  companyRegister,
  addJob,
  getCompanyJobs
};
