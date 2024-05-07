const mongoose  = require('mongoose')

const hostSchema =  new mongoose.Schema({
    hostedfacility:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
        requied: true
    },
    typeofgames:{
        type:Boolean
    },
    hostby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    numberofplayers:{
        type:Number,
    },
    datetoplay:{
        startGameAt: { type: String }, // Start time of the charge
        endAt: { type: String }, // End time of the charge
    },
    timetoplay:{
        startGameAt: { type: String }, // Start time of the charge
        endAt: { type: String }, // End time of the charge
    },
    recurrentbooking:{
        type:Boolean
    },
    teams:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    payment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transections"
    }
},
{
    timestamps: true
})
const HostGAME = mongoose.model("HostGAME", hostSchema)

module.exports = HostGAME