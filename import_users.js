// Script to import users from pan_india_tl.json into MongoDB User collection
const mongoose = require("mongoose");
const User = require("./models/User");
const users = require("./pan_india_tl.json");

const MONGO_URI = "mongodb://127.0.0.1:27017/attendanceDB";

async function importUsers() {
  await mongoose.connect(MONGO_URI);
  for (const u of users) {
    const email = u.flipkart_email_id;
    const name = u.name;
    const phone = u.contact_number;
    const city = u.city;
    // Default password for imported users (should be changed on first login)
    const password = "flipkart123";
    try {
      await User.updateOne(
        { email },
        { $setOnInsert: { name, email, phone, city, password } },
        { upsert: true }
      );
      console.log(`Imported: ${email}`);
    } catch (err) {
      console.error(`Error importing ${email}:`, err.message);
    }
  }
  await mongoose.disconnect();
  console.log("User import complete.");
}

importUsers();
