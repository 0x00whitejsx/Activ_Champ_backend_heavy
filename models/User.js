const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user' // Default role is 'user' if not specified 
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;