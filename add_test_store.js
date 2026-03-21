// Script to add a test store at the user's current location
require("dotenv").config();
const Store = require("./models/Store");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

async function addTestStore() {
  await connectDB();
  const name = "Test Store (My Location)";
  const latitude = 12.927602500000003;
  const longitude = 77.6949535;
  try {
    await Store.updateOne(
      { name },
      {
        $set: {
          name,
          location: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      },
      { upsert: true }
    );
    console.log(`Test store added at your location.`);
  } catch (err) {
    console.error(`Error adding test store:`, err.message);
  }
  await mongoose.disconnect();
}

addTestStore();
