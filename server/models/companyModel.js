const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: 2,
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    number: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    website: {
      type: String,
      trim: true,
      match: [/^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})/, "Enter a valid website URL"],
    },
    linkedIn: {
      type: String,
      trim: true,
      match: [/^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/, "Enter a valid LinkedIn URL"],
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    numberOfEmployees: {
      type: String,
    },
    companyDescription: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    logoUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
CompanySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(this.password, saltRound);
    this.password = hash_password;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare input password with stored one
CompanySchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT Token
CompanySchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.emailId,
        role: "company",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error("JWT Error:", error);
  }
};

module.exports = mongoose.model("Company", CompanySchema);
