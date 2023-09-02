import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";
import commentRoutes from "./routes/comments.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    throw err;
  });
};


app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/comments", commentRoutes)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log("Listening to port 8000");
});

