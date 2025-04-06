const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadLogo = require('../utils/cloudinaryMulter'); 
const chatBotResponse = require("../controllers/chatbot-langflow-api");
const verifyToken = require("../middlewares/verify-token");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
router.post("/uploadResume", upload.single("file"), authControllers.uploadResume);
router.post("/company-register", uploadLogo.single('logo'), authControllers.companyRegister);
router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

router.get("/user/:id",verifyToken, authControllers.getUser);
router.post("/jobs/add",verifyToken, authControllers.addJob);
router.get("/jobs/company", verifyToken, authControllers.getCompanyJobs);

// Chatbot route
router.post("/chatbot", async (req, res) => {
    const message = req.body.message;
    const reply = await chatBotResponse(message);
    res.json({ output_value: reply.data || reply.message });
  });

module.exports = router;
