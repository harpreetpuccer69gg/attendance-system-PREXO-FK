const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs8103536_db_user:WYlrcGGSfrn7rTcv@cluster0.blkpulz.mongodb.net/?appName=Cluster0";
    await mongoose.connect(MONGO_URI)

    console.log("MongoDB Connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB