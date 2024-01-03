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