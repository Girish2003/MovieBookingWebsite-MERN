import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onResReceived=(data)=>{
    // console.log(data.id);
    dispatch(userActions.login());
    localStorage.setItem("userID",data.id);
    navigate("/");
  }
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
    // console.log("auth", data);
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
