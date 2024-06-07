import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

//Initial
dotenv.config();
const app = express();

//Middileware
app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data(urlencoded)
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running");
  connectDB();
});
