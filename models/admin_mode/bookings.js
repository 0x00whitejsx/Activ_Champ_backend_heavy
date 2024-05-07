const mongoose  = require('mongoose')

const bookingsSchema =  new mongoose.Schema({
    
})
const Bookings = mongoose.model("Bookings", bookingsSchema)

module.exports = Bookings