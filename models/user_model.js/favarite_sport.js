const mongoose  = require('mongoose')

const teamSchema =  new mongoose.Schema({})
const team = mongoose.model("team", userSchema)

module.exports = team