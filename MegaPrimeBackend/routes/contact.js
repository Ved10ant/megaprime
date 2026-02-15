const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact
router.post('/', contactController.submitContact);

// GET /api/contact (Protected route - add auth middleware if needed later)
router.get('/', contactController.getAllContacts);

module.exports = router;
