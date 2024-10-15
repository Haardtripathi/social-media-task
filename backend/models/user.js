const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    socialMediaHandle: { type: String }, // A single social media handle
    uploadedImages: [{
        data: Buffer, // Store image data as Buffer
        contentType: String // Store the content type of the image (e.g., 'image/jpeg')
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
