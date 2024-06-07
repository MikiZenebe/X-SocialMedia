import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

//Initial
dotenv.config();
const app = express();

//Middileware
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running");
  connectDB();
});
