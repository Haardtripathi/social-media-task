const User = require('../models/user');

const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        // Map through users to convert image data to base64
        const usersWithImages = users.map(user => ({
            _id: user._id,
            fullName: user.fullName,
            socialMediaHandle: user.socialMediaHandle,
            uploadedImages: user.uploadedImages.map(image => ({
                contentType: image.contentType,
                data: image.data.toString('base64') // Convert Buffer to base64
            }))
        }));

        res.status(200).json(usersWithImages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

module.exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // Check if admin exists
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};