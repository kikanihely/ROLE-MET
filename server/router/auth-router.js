const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route("/").get(authControllers.home);
router.post("/uploadResume", upload.single("file"), authControllers.uploadResume);
router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

module.exports = router;