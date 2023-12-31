import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Box, Tab,Tabs, TextField, Toolbar } from "@mui/material";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";

const dummyArray = ["hi", "bye", "fdffg"];

const Header = () => {
    const [value, setvalue] = useState(0);
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
      getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))
    },[]);
  return (
    <AppBar position="sticky" sx={{bgcolor:"#2b2d42"}}>
      <Toolbar>
        <Box width={"20%"}>
          <TheaterComedyIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={movies&&movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField sx={{input:{color:"white"}}} variant="standard" {...params} placeholder="Search movies" />
            )}
          />
        </Box>
        <Box display={"flex"}>
            <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e,val)=>setvalue(val)}>
                <Tab LinkComponent={Link} to="/movies" label="Movies"/>
                <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                <Tab LinkComponent={Link} to="/auth" label="Auth"/>
            </Tabs>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
