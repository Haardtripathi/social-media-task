// multerConfig.js
const multer = require('multer');

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory as Buffer

// Create multer instance with storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
        const extname = fileTypes.test(file.mimetype) && fileTypes.test(file.originalname.split('.').pop().toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed.'));
    }
});

module.exports = upload;
