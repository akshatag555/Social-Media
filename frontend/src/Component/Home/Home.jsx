import React from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
const Home = () => {
  return (
    <div className="home">
      <div className="homeleft">
        <Post
          postImage={
            "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          ownerName={"StellarShots"}
          caption={"Where the sky meets the earth in a dance of colors."}
          
        />
        
        
      </div>
      <div className="homeright">
        <User
          userId={"user._id"}
          name={"akshat"}
          avatar={
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
    </div>
  );
};

export default Home;
