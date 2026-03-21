// Script to print all stores in MongoDB for verification
const mongoose = require("mongoose");
require("dotenv").config();
const Store = require("./models/Store");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs8103536_db_user:WYlrcGGSfrn7rTcv@cluster0.blkpulz.mongodb.net/?appName=Cluster0";

async function listStores() {
  await mongoose.connect(MONGO_URI);
  const stores = await Store.find({});
  for (const s of stores) {
    console.log({
      name: s.name,
      coordinates: s.location?.coordinates
    });
  }
  console.log(`Total stores: ${stores.length}`);
  await mongoose.disconnect();
}

listStores();
