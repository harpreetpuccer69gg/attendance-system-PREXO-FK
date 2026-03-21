// Script to import stores from stores.json into MongoDB Store collection
const mongoose = require("mongoose");
require("dotenv").config();
const Store = require("./models/Store");
const stores = require("./stores.json");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs8103536_db_user:WYlrcGGSfrn7rTcv@cluster0.blkpulz.mongodb.net/?appName=Cluster0";

async function importStores() {
  await mongoose.connect(MONGO_URI);
  for (const s of stores) {
    // Use 'store_name' from JSON as 'name' in DB
    const name = s.name || s.store_name;
    const latitude = s.latitude;
    const longitude = s.longitude;
    if (!name || latitude == null || longitude == null) {
      console.log(`Skipped: ${JSON.stringify(s)}`);
      continue;
    }
    try {
      await Store.updateOne(
        { name },
        { $setOnInsert: {
            name,
            location: {
              type: "Point",
              coordinates: [longitude, latitude]
            }
          }
        },
        { upsert: true }
      );
      console.log(`Imported: ${name}`);
    } catch (err) {
      console.error(`Error importing ${name}:`, err.message);
    }
  }
  await mongoose.disconnect();
  console.log("Store import complete.");
}

importStores();
