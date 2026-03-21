// Script to import users from pan_india_tl.json into MongoDB User collection
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const users = require("./pan_india_tl.json");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

async function importUsers() {
  await connectDB();
  for (const u of users) {
    const email = u.flipkart_email_id;
    const name = u.name;
    const phone = u.contact_number;
    let city = u.city;
    // Map city names to match ALLOWED_CITIES in authRoutes.js
    if (city === "Bangalore") city = "Bengaluru";
    if (city === "Delhi") city = "NCR";

    try {
      // Hash the default password for new users
      const hashedPassword = await bcrypt.hash("flipkart123", 10);
      
      await User.updateOne(
        { email },
        { 
          $setOnInsert: { 
            name, 
            email, 
            phone, 
            city, 
            password: hashedPassword,
            role: "tl"
          } 
        },
        { upsert: true }
      );
      console.log(`Imported: ${email} (${city})`);
    } catch (err) {
      console.error(`Error importing ${email}:`, err.message);
    }
  }
  await mongoose.disconnect();
  console.log("User import complete.");
}

importUsers();
