const mongoose = require('mongoose');

const visaCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  cardHolderName: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cvv: { type: String, required: true },
  pin: { type: String },
  issuingBank: { type: String, required: true },
  creditLimit: { type: Number, required: true },
  availableBalance: { type: Number, required: true },
  transactions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transections"
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const VisaCard = mongoose.model('VisaCard', visaCardSchema);

module.exports = VisaCard;
