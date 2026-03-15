// Script to print all stores in MongoDB for verification
const mongoose = require("mongoose");
const Store = require("./models/Store");

const MONGO_URI = "mongodb://127.0.0.1:27017/attendanceDB";

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
