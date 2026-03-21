const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs8103536_db_user:WYlrcGGSfrn7rTcv@cluster0.blkpulz.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ email: "admin@flipkart.com" });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }
    const hashed = await bcrypt.hash("Admin@1234", 10);
    await User.create({
      name: "Admin",
      email: "admin@flipkart.com",
      password: hashed,
      role: "admin",
      city: "Bengaluru"
    });
    console.log("✅ Admin seeded — email: admin@flipkart.com | password: Admin@1234");
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
