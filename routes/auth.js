const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  forgetPassword,
  resetPassword,
  verifyEmail,
  googleAuth,
} = require("../controllers/auth");

// Email/Password authentication routes
router.post("/signup", signup);
router.post("/login", signin);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email", verifyEmail);

// Google authentication route
router.post("/google", googleAuth);

module.exports = router;
