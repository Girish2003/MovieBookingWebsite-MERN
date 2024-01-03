import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

function Movies() {
  const [movies, setmovies] = useState([]);
    useEffect(() => {
      getAllMovies().then((data)=>setmovies(data.movies)).catch((err)=>console.log(err))
    }, [])
  return (
    

    
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        display={"flex"}
        width={"100%"}
        marginTop={5}

        justifyContent={"center"}
        flexWrap={"flex-start"}
        margin={"auto"}
      >
        {movies&&movies.slice().map((movie,index) => (
          <MovieItem  key={index} id={movie.id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} />
        ))}
      </Box>
    </Box>
  );
}

export default Movies;
