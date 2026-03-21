// Script to add a test store at the user's current location
const mongoose = require("mongoose");
require("dotenv").config();
const Store = require("./models/Store");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs8103536_db_user:WYlrcGGSfrn7rTcv@cluster0.blkpulz.mongodb.net/?appName=Cluster0";

async function addTestStore() {
  await mongoose.connect(MONGO_URI);
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
