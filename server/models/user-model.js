const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: false,
      trim: true,
    },
    experience: {
      type: Number,
      required: false,
      min: 0,
    },
    industry: {
      type: String,
      required: true,
      trim: false,
    },
    skills: {
      type: [String],
      required: true,
    },
    linkedin: {
      type: String,
      validate: {
        validator: (url) =>
          /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/.test(url),
        message: "Invalid LinkedIn URL",
      },
    },
    github: {
      type: String,
      validate: {
        validator: (url) => /^(https?:\/\/)?(www\.)?github\.com\/.+/.test(url),
        message: "Invalid GitHub URL",
      },
    },
    resume: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(this.password, saltRound);
    this.password = hash_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
        role: this.role
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
