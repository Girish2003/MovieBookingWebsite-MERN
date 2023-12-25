import express from "express";
import { getAllUsers, singup } from "../controllers/user-controller";
const userRouter=express.Router();
userRouter.get("/",getAllUsers)
userRouter.post("/signup",singup);


export default userRouter;