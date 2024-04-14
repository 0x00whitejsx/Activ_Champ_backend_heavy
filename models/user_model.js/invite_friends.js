const mongoose  = require('mongoose')

const inviteSchema =  new mongoose.Schema({
    code: { type: String, unique: true, required: true }, // Unique code for joining
  inviter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who sent the invitation
  invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who received the invitation
  email: { type: String }, // Email of the invitee (if known)
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Status of the invitation
  createdAt: { type: Date, default: Date.now }, // Date when the invitation was created
})
const Invite = mongoose.model("Invite", inviteSchema)

module.exports = Invite


