const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Adjust the path based on your project structure

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.adminId = decoded.id; // Store admin ID in the request
        next();
    });
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.adminId);
        if (!admin) {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Middleware to check if the user is not authenticated
const isNotAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (token) {
        return res.status(403).json({ message: 'Forbidden: Already authenticated' });
    }

    next();
};

// Combined middleware to check authentication and admin status
const isAuthenticatedAndAdmin = (req, res, next) => {
    isAuthenticated(req, res, () => {
        isAdmin(req, res, next);
    });
};

module.exports = {
    isAuthenticated,
    isAdmin,
    isAuthenticatedAndAdmin,
    isNotAuthenticated, // Export the new middleware
};
