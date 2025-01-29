const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.h5kqj.mongodb.net/task-management?retryWrites=true&w=majority&appName=Cluster0`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = { connectDB };
