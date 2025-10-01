import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // .env file load karega

// DB Connect
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevConnect API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
