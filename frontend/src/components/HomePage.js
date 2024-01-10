import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
  const [movies, setmovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((data)=>setmovies(data.movies)).catch((err)=>console.log(err))
  }, [])
  // console.log(movies);
  
  return (
    <Box width={"100%"} height={"100%"} margin="auto" marginTop={2}>
      <Box width={"80%"} height={"40vh"} margin="auto" padding={2}>
        <img
          src="https://imgix.hoyts.com.au/mx/headers/leo-tamil-86935423.jpg?fit=crop&auto=compress%2Cformat&crop=faces%2Centropy&w=2280&h=600"
          alt="leo"
          width={"100%"}
          height={"100%"}
        ></img>
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest releases
        </Typography>
      </Box>
      <Box
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        margin={"auto"}
      >
        {movies&&movies.slice(0,4).map((movie,index) => (
          <MovieItem id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index} />
        ))}
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button  LinkComponent={Link} to="/movies" sx={{margin:"auto",color:"#2b2d42"}} variant="outlined">
          View all Movies
        </Button>

      </Box>
    </Box>
  );
};

export default HomePage;
