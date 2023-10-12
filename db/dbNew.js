const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://net_ninja:test1234@cluster0.dituh.mongodb.net/social_media?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;