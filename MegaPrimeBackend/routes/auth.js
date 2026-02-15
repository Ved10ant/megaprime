const express = require("express");
const router = express.Router();
const { login, register, verifyToken } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/login", login);
router.post("/register", register);

// Protected routes
router.get("/verify", protect, verifyToken);

module.exports = router;
