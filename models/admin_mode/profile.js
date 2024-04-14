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
    email: {
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
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        trim:true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posty'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
},
   
    {
        timestamps: true
    }

)

const User = mongoose.model("User", userSchema)

module.exports = User