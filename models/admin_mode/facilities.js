const mongoose  = require('mongoose')

const facilitySchema =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    numberofplayer:{
        type: Number,
        required: true
    },
    facilityrule:{
        type:String,
        lowercase: true,
        trim: true,
        max:150
    },

    activehours:{
        dayOfWeek: { type: Number, required: true }, // Day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        openinghours: { type: String, required: true }, // Start time of the active hour (in HH:mm format)
        closinghours: { type: String, required: true }, // End time of the active hour (in HH:mm format)
    },
    chargeForFacility: [{
        startGameAt: { type: String, required: true }, // Start time of the charge
        endAt: { type: String, required: true }, // End time of the charge
        price: { type: Number, required: true }, // Price for this time range
      }],
    facilityphoto:{
        type: String
    }

})
const Facility = mongoose.model("Facility", facilitySchema)

module.exports = Facility