const express=require('express');
const app=express();
const cookieParser=require("cookie-parser")
var cors = require('cors')
if(process.env.NODE_ENV!=="production") require("dotenv").config({path:"backend/config/config.env"})
//using middleware
const corsOptions = {
    origin: 'https://social-media-d5i3.vercel.app/', // replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allows cookies to be sent
    optionsSuccessStatus: 204
  };
app.use(cors(corsOptions));

app.use(express.json({limit:'50mb'}))
app.use(express.json());
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(cookieParser());
//importing route
 const post=require("./routes/posts");
const user=require("./routes/user");
//using route
app.use("/api/v1",post)
app.use("/api/v1",user)
module.exports=app;