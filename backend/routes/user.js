// userRoutes.js
const express = require('express');
const upload = require('../config/multerConfig'); // Adjust path as necessary
const userControllers = require('../controllers/userControllers'); // Adjust path as necessary
const { isNotAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Route to handle user creation and image upload
router.post('/users', upload.array('images'), userControllers.createUser);

module.exports = router;
