const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://attendprexo.vercel.app/"
  ]
}));
app.use(express.json());

// Connection
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
    res.send("Attendance API running");
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
