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
    res.json({msg:"market is greate"})
}



const isLogout = async(req, res) => {
    // const {  } = req.body
    res.send("market is greate")
}


const isfetchedUser = async(req, res) => {
    // const {  } = req.body
    res.send("market is greate")
}




module.exports = {
    isSignup,
    isSignin,
    isLogout,
    isfetchedUser
}