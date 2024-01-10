import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// import imagee from "../../assets/ayalaan.webp"


const MovieItem = ({title,releseDate,posterUrl,id}) => {
  return (
    <Card
      sx={{
        margin: 3,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      
      <img style={{ height: '50%', width: '100%' }} src={posterUrl} alt={title} />
      {/* <p>{posterUrl}</p> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth LinkComponent={Link} to={`/booking/${id}`} sx={{ margin: "auto", bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"}  }} size="small">
          Book
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

export default MovieItem;
