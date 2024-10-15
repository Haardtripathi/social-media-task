// adminRoutes.js
const express = require('express');
const adminControllers = require('../controllers/adminControllers'); // Adjust path as necessary
const { isAuthenticatedAndAdmin } = require('../middleware/auth');

const router = express.Router();

// Route to get all users
router.get('/dashboard', isAuthenticatedAndAdmin, adminControllers.getAllUsers);

router.post('/login', adminControllers.adminLogin);

module.exports = router;
