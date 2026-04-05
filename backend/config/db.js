// This file handles connecting to MongoDB
const mongoose = require('mongoose');

// Function to connect to database
const connectDB = async () => {
  try {
    // mongoose.connect() establishes connection to MongoDB
    // process.env.MONGODB_URI gets the connection string from .env file
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    // If connection fails, show error and exit the app
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
