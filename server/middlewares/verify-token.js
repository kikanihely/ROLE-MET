const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Add user data to request for downstream access
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
