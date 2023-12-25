import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import { singup } from "./controllers/user-controller";
dotenv.config();
const app = express();

//middlewares
app.use(express.json());

app.use("/user",userRouter);

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ezzqopl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () => {
      console.log("connected");
    })
  )
  .catch((e) => console.log(e));

