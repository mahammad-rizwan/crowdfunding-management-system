const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri, {
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}

connectDB();

module.exports = mongoose;
