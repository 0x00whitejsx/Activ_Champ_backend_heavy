const mongoose  = require('mongoose')

const hostSchema =  new mongoose.Schema({
    hostAt:{
        type: String,
    },
    numberofplayers:{
        type:Number,
    },
    datetoplay:{
        type: Date
    },
    timetoplay:{
        type: TimeRanges
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