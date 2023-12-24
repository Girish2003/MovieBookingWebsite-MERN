import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ezzqopl.mongodb.net/?retryWrites=true&w=majority`
).then(()=>app.listen(5000, () => {
    console.log("connected");
  })).catch((e)=>console.log(e));

app.use("/", (req, res, next) => {
  res.send("HI");
});

