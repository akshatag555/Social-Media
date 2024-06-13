import React, { useEffect, useState } from "react";
import "./ForgotPass.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPass } from "../../Actions/User";
import { useAlert } from "react-alert";

const ForgotPass = () => {
    const alert=useAlert();
  const [email, setEmail] = useState("");
  const dispatch=useDispatch();
  const {error,loading,message}=useSelector((state)=>state.like)
  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(forgotPass(email));
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
    <div>
      <div className="forgotPassword">
        <form className="forgotPasswordForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            EchoSphere
          </Typography>
          <input
            type="email"
            className="forgotPasswordInputs"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button disabled={loading} type="submit">Request Email</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
