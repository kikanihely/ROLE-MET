const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel"); // Adjust the path
const Candidate = require("../models/user-model"); // Optional: If you have candidate model
// const Admin = require("../models/admin-model"); // Optional: If you have admin model

const authMiddleware = async (req, res, next) => {
  console.log("Inside authMiddleware");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    let user;

    // Identify role and attach corresponding user
    if (decoded.role === "company") {
      user = await Company.findById(decoded.userId).select("-password");
    } else if (decoded.role === "candidate") {
      user = await Candidate.findById(decoded.userId).select("-password");
    // } else if (decoded.role === "admin") {
    //   user = await Admin.findById(decoded.userId).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
