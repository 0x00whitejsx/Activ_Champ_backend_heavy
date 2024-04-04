const express = require('express');
const router = express.Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');

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

module.exports = router;