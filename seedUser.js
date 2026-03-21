const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");
const connectDB = require("./config/db");

const seedUser = async () => {
  try {
    await connectDB();
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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUser();
