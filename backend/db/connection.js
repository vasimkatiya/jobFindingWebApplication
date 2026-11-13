const { default: mongoose } = require("mongoose");
require('dotenv').config();

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('cluster connected successfully.');
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDB;