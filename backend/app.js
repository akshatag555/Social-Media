const express=require('express');
const app=express();
const cookieParser=require("cookie-parser")
var cors = require('cors')
if(process.env.NODE_ENV!=="producion") require("dotenv").config({path:"backend/config/config.env"})
//using middleware
app.use(express.json({limit:'50mb'}))
app.use(express.json());
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"*"
}));
//importing route
 const post=require("./routes/posts");
const user=require("./routes/user");
//using route
app.use("/api/v1",post)
app.use("/api/v1",user)
module.exports=app;