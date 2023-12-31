import Bookings from "../models/Bookings";
import User from "../models/User";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured" }); //internal server error
  }
  return res.status(200).json({ users });
};

export const singup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !password &&
    password.trim() == ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ id:user._id });
};
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !password &&
    password.trim() == ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(201).json({ message: "updated successfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({message:"updated successfully"});
};

export const login=async(req,res,next)=>{
  const { email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try{
    existingUser=await User.findOne({email})

  }
  catch(err){
    return console.log(err);
  }
  if(!existingUser){
    return res.status(400).json({message:"unable to find user by ID"});
  }
  const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
  if(!isPasswordCorrect){
    return res.status(400).json({message:"Incorrect password"});
  }
  return res.status(200).json({message:"Login success"})

}

export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json(bookings);
};