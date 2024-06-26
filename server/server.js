import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

//Initial
const app = express();
const __dirname = path.resolve();

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Middileware
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); //to parse form data(urlencoded)

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5000, () => {
  console.log("Server is running");
  connectDB();
});
