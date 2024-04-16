const mongoose  = require('mongoose')

const transectionsSchema =  new mongoose.Schema({
    transactions: [{
        date: { type: Date, default: Date.now },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ['Debit', 'Credit'], required: true }
      }],
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminUser"
      }
})
const Transections = mongoose.model("Transections", transectionsSchema)

module.exports = Transections