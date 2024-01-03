import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendUserAdminRequest } from '../../api-helpers/api-helpers';

function Admin() {
  const getData=(data)=>{
    console.log("admin",data);
    sendUserAdminRequest(data.inputs, data.signup)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div><AuthForm onSubmit={getData} isAdmin={true}/></div>
  )
}

export default Admin