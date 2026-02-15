const express = require("express");
const router = express.Router();
const {
  getContent,
  getAllContent,
  updateContent,
  createInitialContent,
} = require("../controllers/contentController");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/:sectionId", getContent);
router.get("/", getAllContent);

// Protected routes
router.put("/:sectionId", protect, updateContent);
router.post("/init", protect, createInitialContent);

module.exports = router;
