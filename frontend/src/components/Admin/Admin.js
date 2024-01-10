import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendUserAdminRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onResReceived=(data)=>{
    // console.log(data.id);
    dispatch(adminActions.login());
    localStorage.setItem("AdminID",data.id);
    localStorage.setItem("token",data.token);
    navigate("/");
  }
  const getData=(data)=>{
    // console.log("admin",data);
    sendUserAdminRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  }
  return (
    <div><AuthForm onSubmit={getData} isAdmin={true}/></div>
  )
}

export default Admin