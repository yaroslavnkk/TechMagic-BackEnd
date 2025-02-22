const mongoose = require("mongoose");

const DB_URL = 'mongodb://localhost:27017/medcare';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DB_URL);
    console.log('DB connected: ' + connection.connection.host);
  } catch (err) {
    console.error('Database connection error: ', err);
  }
};

module.exports = { connectDB };
