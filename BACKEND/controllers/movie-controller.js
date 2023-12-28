import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Movie from "../models/Movie";
import Admin from "../models/Admin";
import mongoose from "mongoose";
dotenv.config();
export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(400).json({ message: "token not found" });
  }
  let adminId;
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save( {session} );
    adminUser.addedMovies.push(movie);
    await adminUser.save( {session} );
    await session.commitTransaction();


  } catch (err) {
    return console.log(err);
  }
  if(!movie){
    return res.status(500).json({message:"Request failed"});
  }
  return res.status(201).json({movie});
};
export const getAllMovies=async(req,res,next)=>{
  let movies;
  try{
    movies=await Movie.find();

  }
  catch(err){
    console.log(err);

  }
  if(!movies)
  {
    return res.status(500).json({message:"request failed"});
  }
  return res.status(200).json({movies});
}

export const getMovieById=async(req,res,next)=>{
  let movies;
  const id=req.params.id;
  try{
    movies=await Movie.findById(id);

  }
  catch(err){
    console.log(err);

  }
  if(!movies)
  {
    return res.status(500).json({message:"invalid movie ID"});
  }
  return res.status(200).json({movies});
}