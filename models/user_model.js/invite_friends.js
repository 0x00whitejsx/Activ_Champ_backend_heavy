const mongoose  = require('mongoose')

const inviteSchema =  new mongoose.Schema({
    
})
const Invite = mongoose.model("Invite", inviteSchema)

module.exports = Invite