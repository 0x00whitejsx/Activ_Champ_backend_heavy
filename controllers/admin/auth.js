// const isAdminUser  = require("../../models/admin_mode/profile")
const Facility = require("../../models/admin_mode/facilities")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


const isSignup = async (req, res) => {
    const files = req.files;
    try {
        const {
            facilityname,
            address,
            phonenumber,
            email,
            password,
            favoriteSports,
            facilitydescription,
            facilityrule,
            activehours,
            numberofplayer,
            category,
            chargeForFacility,
        } = req.body;
       
        console.log('Password:', password);
        console.log('Files:', files);
        // Check if facility with the same name or email already exists
        const existingFacility = await Facility.findOne({ $or: [{ facilityname }, { email }] });
        if (existingFacility) {
            return res.status(400).json({ msg: "Oops! A facility with this name or email already exists" });
        }
        if(password == "" || facilityname == "" || category == "") {
            return res.status(400).json({ msg: "Oops! fiels is required places" });
        }
    

        // Generate hash for password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


             // Upload images to Cloudinary
             const imageUrls = [];
             for (const file of files) {
                 const { path } = file;
                 const result = await cloudinary.uploader.upload(path);
                 imageUrls.push(result.secure_url);
             }

        // Create new facility
        const newFacility = new Facility({
            facilityname,
            address,
            phonenumber,
            numberofplayer,
            favoriteSports,
            email,
            password: hashedPassword,
            facilitydescription,
            facilityrule,
            activehours,
            chargeForFacility,
            facilityphoto:imageUrls,
            category,
        });

        // Save the new facility to the database
        const savedFacility = await newFacility.save();
        res.status(201).json(savedFacility);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const isSignin = async(req, res) => {
    // const {  } = req.body
   try {
     const { email, password } = req. body
     let user

    if (email) {
            user = await Facility.findOne({ email });
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
}



const isLogout = async(req, res) => {
    // const {  } = req.body
    try {
        res.clearCookie("token", {
                        sameSite:"none", secure:true
        }).status(200).json("User logout successfully!")
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const isAdminUser = async(req, res) => {
    // const {  } = req.body
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
}





module.exports = {
    isSignup,
    isSignin,
    isLogout,
    isAdminUser
}