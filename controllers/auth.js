const User  = require("../models/user_model.js/profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const Signup = async (req, res) => {
    try {
        const { username, firstname, lastname, email, phonenumber, password, favoriteSports } = req.body;

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ msg: "Oops! Email or username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Increase salt rounds for better security
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            username,
            firstname,
            lastname,
            email,
            phonenumber,
            password: hashedPassword, // Store the hashed password
            favoriteSports
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return the saved user details
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const Signin = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        let user;

        // Find user by email or username
        if (email) {
            user = await User.findOne({ email });
        } else {
            user = await User.findOne({ username });
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ msg: "Sorry, we couldn't find user credentials!" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password input" });
        }

        // Create JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            // console.log(token)
        // Remove password from user data
        const userData = { ...user._doc };
        delete userData.password;

        // Set JWT token in cookie and send user data
        res.cookie("token", token, { httpOnly: true }).status(200).json(userData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const Logout = async(req, res) => {
    try {
        res.clearCookie("token", {
                        sameSite:"none", secure:true
        }).status(200).json("User logout successfully!")
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const fetchedUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }

            const userId = data._id;
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    Signup,
    Signin,
    Logout,
    fetchedUser
}