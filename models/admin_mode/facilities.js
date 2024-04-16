const mongoose  = require('mongoose')

const facilitySchema =  new mongoose.Schema({
    facilityname:{
        type:String,
        required: true,
        trim: true,
        lowercase: true
    },
    category: [{
        type: String,
        enum: ['football', 'badminton', 'tennis', 'basketball', 'boxing', 'handball']
      }],
    facilitydescription:{
        type:String,
        lowercase: true,
        trim: true
    },
    favoriteSports: [{
        type: String,
        enum: ['football', 'badminton', 'tennis', 'basketball', 'boxing', 'handball']
      }],
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type:String,
        required: true
    },
    numberofplayer:{
        type: Number,
        // required: true
    },
    facilityrule:{
        type:String,
        lowercase: true,
        trim: true,
        max:150
    },

    activehours:{
        dayOfWeek: { type: Number}, // Day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        openinghours: { type: String }, // Start time of the active hour (in HH:mm format)
        closinghours: { type: String }, // End time of the active hour (in HH:mm format)
    },
    chargeForFacility: [{
        startGameAt: { type: String }, // Start time of the charge
        endAt: { type: String }, // End time of the charge
        price: { type: Number }, // Price for this time range
      }],
    facilityphoto:[{
        type: String,
        required: false
    }],

})
const Facility = mongoose.model("Facility", facilitySchema)

module.exports = Facility