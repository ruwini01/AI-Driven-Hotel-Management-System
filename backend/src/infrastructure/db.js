const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try{
        const MONGODB_URL = process.env.MONGODB_URL;
        if(!MONGODB_URL){
            throw new Error('MONGODB_URL is not defined in environment variables');
        }
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connected');
    }
    catch(err){
        console.error("Error: "+ err.message);

    }
}

module.exports = connectDB;