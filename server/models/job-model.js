// models/jobModel.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salaryRange: {
      type: String,
    },
    skillsRequired: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true, // make sure job always belongs to a company
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
