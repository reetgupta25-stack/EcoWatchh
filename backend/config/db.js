
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error(
      "MONGO_URI is missing. Please check your backend .env file."
    );
  }

  try {
    console.log("Connecting to MongoDB Atlas...");
await mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 20000,
  connectTimeoutMS: 15000,
});

    console.log("MongoDB connected successfully!");
    console.log(`Connected host: ${mongoose.connection.host}`);
    console.log(`Database name: ${mongoose.connection.name}`);

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    throw error;
  }
};

module.exports = connectDB;
