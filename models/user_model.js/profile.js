const mongoose  = require('mongoose')

const userSchema =  new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'owner'],
        default: 'user' // Default value is optional
      },
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true
    },
    firstname: {
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
      team:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "team"
      },
      bookings:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookings"
      },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    }],

    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }],

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
  hostgames:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "HostGAME"
}
},
    {
        timestamps: true
    }

)

const User = mongoose.model("User", userSchema)

module.exports = User