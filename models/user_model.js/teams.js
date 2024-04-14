const mongoose  = require('mongoose')

const teamSchema =  new mongoose.Schema({
        teamname:{
            type: String,
            required:true,
        },
        numberofteam:{
            type:Number
        },
        typeofteam:{
            type:String,
            enum:["private", "public"],
            default:"public"
        },
        joiningCode:{
            type:Number
        },
        players:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        players:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notifications"
        },

})
const Team = mongoose.model("team", teamSchema)

module.exports = Team