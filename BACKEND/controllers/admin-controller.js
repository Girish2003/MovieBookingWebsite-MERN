import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config(); 
export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingAdmin) {
    return res.status(480).json({ message: "Admin already exists" });
  }
  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({admin});
};
export const adminLogin=async(req,res,next)=>{
    const { email, password } = req.body;
    if (
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingAdmin;
    try{
      existingAdmin=await Admin.findOne({email})
  
    }
    catch(err){
      return console.log(err);
    }
    if(!existingAdmin){
      return res.status(400).json({message:"unable to find user by ID"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingAdmin.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message:"Incorrect password"});
    }
    const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
      expiresIn:"8h",
    });
    return res.status(200).json({message:"Auth success",token,id:existingAdmin._id});
  
  }

  export const getAdmins = async (req, res, next) => {
    let users;
    try {
      users = await Admin.find();
    } catch (err) {
      return console.log(err);
    }
    if (!users) {
      return res.status(500).json({ message: "Unexpected error occured" }); //internal server error
    }
    return res.status(200).json({ users });
  };