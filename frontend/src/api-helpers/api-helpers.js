import axios from "axios";
export const getAllMovies = async()=>{
  const res = await axios
    .get("/movie")
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("NO Data");
  }
  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async(data,signup)=>{
  const res = await axios
    .post(`/user/${signup?"signup":"login"}`,{
      name:signup?data.name:"",
      email:data.email,
      password:data.password
    })
    .catch((err) => console.log(err));
  if (res.status !== 200&&res.status!==201) {
    return console.log("Unexpected error");
  }
  const resData = await res.data;
  return resData;
};


export const sendUserAdminRequest = async(data,signup)=>{
  const res = await axios
    .post("/admin/login",{
      // name:signup?data.name:"",
      email:data.email,
      password:data.password
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected error");
  }
  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async(id)=>{
  const res = await axios
    .get(`/movie/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected error");
  }
  const resData = await res.data;
  // console.log(resData)
  return resData;
};

export const newBooking = async(data)=>{
  // console.log("hi");

  const res = await axios
    .post("/booking",{
      movie:data.movie,
      date:data.date,
      seatNumber:data.seatNumber,
      
      user:localStorage.getItem("userID")
      // email:data.email,
      // password:data.password
    }).then((res)=>console.log(res.data))
    .catch((err) => console.log(err));
  if (res.status !== 201) {
    return console.log("Unexpected error");
  }
  console.log(res.data);
  const resData = await res.data;
  return resData;
};


export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("AdminID"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};


export const getAdminById = async () => {
  const adminId = localStorage.getItem("AdminID");
  console.log(adminId);
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
  
};
