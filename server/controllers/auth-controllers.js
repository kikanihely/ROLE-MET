
const pdfParse = require("pdf-parse");
const langFlowGetScore = require("./langflow-api");




const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const {
      fullName,
      city,
      state,
      jobTitle,
      experience,
      industry,
      skills,
      linkedin,
      github,
      resume,
      email,
      password,
    } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) return res.status(400).json({ msg: "email already exist" });

    const userCreated = await User.create({
      fullName,
      city,
      state,
      jobTitle,
      experience,
      industry,
      skills,
      linkedin,
      github,
      resume,
      email,
      password,
    });

    res.status(201).json({
      message: "Registration Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) return res.status(400).json({ msg: "Invalid Credentials" });

    const user = await userExist.comparePassword(password);

    if (user)
      res.status(200).json({
        message: "Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    else res.status(401).json({ msg: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
  }
};

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


module.exports = { home, register, login, uploadResume };
