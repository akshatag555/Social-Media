import React, { useEffect, useState } from 'react'
import "./ResetPass.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { resetPass } from '../../Actions/User';
import {Link, useParams} from "react-router-dom"
import { useAlert } from 'react-alert';
const ResetPass = () => {
    const [newPassword,setNewPassword]=useState("");
    const dispatch=useDispatch();
    const params=useParams();
    const alert=useAlert();
    const {loading,error,message}=useSelector((state)=>state.like)
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(resetPass(params.token,newPassword));
        
      };
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch({
            type: "like/ClearErrors",
          });
        }
        if (message) {
          alert.success(message);
          dispatch({
            type: "like/ClearMsg",
          });
        }
      }, [alert, error, dispatch, message]);
  return (
    
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          EchoSphere
        </Typography>
        
        <input
          type="password"
          placeholder="New Password"
          className="resetPasswordInputs"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Link to="/"><Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>
        <Link to="/forgot/password"><Typography>Request Another Token</Typography></Link>
        <Button disabled={loading} type="submit">Reset Password</Button>
        
      </form>
    </div>
  )
}

export default ResetPass
