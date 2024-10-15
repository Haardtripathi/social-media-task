// userController.js
const User = require('../models/user'); // Adjust path as necessary

// Controller function to create a user
module.exports.createUser = async (req, res) => {
    const { fullName, socialMediaHandle } = req.body;
    const uploadedImages = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
    }));

    const newUser = new User({
        fullName,
        socialMediaHandle,
        uploadedImages
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

