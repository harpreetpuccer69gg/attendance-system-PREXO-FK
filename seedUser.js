const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs8103536_db_user:WYlrcGGSfrn7rTcv@cluster0.blkpulz.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ email: "ankitsinghaniaaks@gmail.com" });
    if (existing) {
      console.log("User already exists:", existing.email);
      process.exit(0);
    }
    const hashed = await bcrypt.hash("aks123456", 10);
    await User.create({
      name: "aks",
      email: "ankitsinghaniaaks@gmail.com",
      phone: "1234567890",
      password: hashed,
      city: "Mumbai",
      role: "tl",
      __v: 0
    });
    console.log("✅ User seeded — email: ankitsinghaniaaks@gmail.com");
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
