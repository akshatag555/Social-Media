const express=require('express');
const app=express();
const cookieParser=require("cookie-parser")
if(process.env.NODE_ENV!=="producion") require("dotenv").config({path:"backend/config/config.env"})
//using middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
//importing route
 const post=require("./routes/posts");
const user=require("./routes/user");
//using route
app.use("/api/v1",post)
app.use("/api/v1",user)
module.exports=app;