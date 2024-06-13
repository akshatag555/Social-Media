import "./UpdatePassword.css";

import React, { useEffect, useState } from "react";

import { Typography, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updatePass } from "../../Actions/User";
import { useAlert } from "react-alert";


const UpdatePassword = () => {
    const alert=useAlert();
    const {loading,error,message}=useSelector((state)=>state.like)
    
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePass(oldPassword,newPassword))
  };
  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch({type:"ClearErrors"})
    }
    
    if(message){
        alert.success(message);
        dispatch({type:"ClearMsg"})
    }
  },[dispatch,alert,error,message])
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          EchoSphere
        </Typography>
        <input
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="updatePasswordInputs"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button disabled={loading} type="submit">Change Password</Button>
        
      </form>
    </div>
  );
};

export default UpdatePassword;
