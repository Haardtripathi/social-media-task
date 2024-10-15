const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const path = require("path")
const Admin = require('./models/admin');

const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")

const app = express();

app.use(cors({
    origin: 'https://social-media-task-2.netlify.app', // Allow only your frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(userRoutes)
app.use("/admin", adminRoutes);


// Initialize database and start server
const PORT = process.env.PORT || 5000;
connectDB().then(async () => {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
        const admin = new Admin({
            username: 'admin',
            password: 'admin',
        });
        await admin.save();
        console.log('Admin user created');
    }
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});