// db/connect.js

const mongoose = require('mongoose');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Throw the error to be handled by the caller
        throw error;
    }
};

module.exports = connectDb;
