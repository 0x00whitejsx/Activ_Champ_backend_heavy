const mongoose  = require('mongoose')

const userSchema =  new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'owner'],
        default: 'user' // Default value is optional
      },
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
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
    favoriteSports: [{
        type: String,
        enum: ['football', 'badminton', 'tennis', 'basketball', 'boxing', 'handball']
      }],

    facility: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Facility"
    },
      team:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "team"
      },
      bookings:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookings"
      },
    invite:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "invites_friends"
    },
    transections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transections"
    }],
    notifications:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification"

  },
},
    {
        timestamps: true
    }

)

const adminUser = mongoose.model("adminUser", userSchema)

module.exports = adminUser