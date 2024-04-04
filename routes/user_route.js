const express = require('express');
const router = express.Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// Create nodemailer transporter with your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'x10tion007@gmail.com', // Your email address
        pass: 'Christopher147369258@@' // Your email password
    }
});



// signup
router.post("/signup", async (req, res) => {
    try {
        let { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty input fields!"
            });
        }

        username = username.trim();
        email = email.trim();

        if (!username || !email) {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty username or email!"
            });
        }

        if (!/^[a-zA-Z]*$/.test(username)) {
            return res.status(400).json({
                status: "FAILED",
                message: "😭 Username not supported"
            });
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({
                status: "FAILED",
                message: "😭 Invalid email format"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                status: "FAILED",
                message: "Password too short"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ // 409 Conflict - User already exists
                status: "FAILED",
                message: "User with the provided email already exists"
            });
        }

        // Default role is 'user' if not provided
        role = role || 'user';

        const newUser = new User({
            username,
            email,
            password,
            role // Include role in the newUser object
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            status: "SUCCESS",
            message: "Signup successful",
            data: savedUser,
            redirect: "./signin"
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            status: "FAILED",
            message: "An error occurred while signing up"
        });
    }
});

/// signin
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty input fields!"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found"
            });
        }

        // Assuming password is stored securely in the database
        if (user.password !== password) {
            return res.status(401).json({
                status: "FAILED",
                message: "Incorrect password"
            });
        }

        // Generate token with expiration after 7 days
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            status: "SUCCESS",
            message: "Sign-in successful",
            expiresIn: '7d',
            data: user,
            token: token
        });

    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({
            status: "FAILED",
            message: "An error occurred while signing in"
        });
    }
});


router.post("/reset-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty email field"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found"
            });
        }

        // Generate token for password reset with expiration after 1 hour
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Compose email message
        const mailOptions = {
            from: 'x10tion007@gmail.com', // Sender email address
            to: email, // Receiver email address
            subject: 'Password Reset Link', // Email subject
            html: `<p>Dear ${user.username},</p>
                   <p>You have requested to reset your password. Click the following link to reset your password:</p>
                   <a href="https://activ-champ.onrender.com/user/reset-password/${token}">Reset Password</a>` // Reset password link
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({
                    status: "FAILED",
                    message: "Failed to send password reset email"
                });
            }
            console.log("Password reset email sent:", info.response);
            res.status(200).json({
                status: "SUCCESS",
                message: "Password reset email sent successfully"
            });
        });

    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json({
            status: "FAILED",
            message: "An error occurred while generating password reset token"
        });
    }
});



module.exports = router;