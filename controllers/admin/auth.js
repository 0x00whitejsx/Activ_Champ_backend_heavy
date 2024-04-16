const isAdminUser  = require("../../models/admin_mode/profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const Signin = async(req, res) => {
    const {  } = req.body
}





module.exports = {
    Signup,
    Signin,
    Logout,
    fetchedUser
}