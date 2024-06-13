import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import {  getAllUsers,getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
const Home = () => {

  const dispatch = useDispatch();
  const alert=useAlert();

  const {error:likeError,message}=useSelector((state)=>state.like)
  const {users,loading:usersloading}=useSelector((state)=>state.allUsers);
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch({
        type:"like/ClearErrors",
      })
    }
    if(likeError){
      alert.error(likeError)
      dispatch({
        type:"like/ClearErrors",
      })
    }
    if(message){
      alert.success(message)
      dispatch({
        type:"like/ClearMsg",
      })
    }
  },[alert,error,message,likeError,dispatch])

  

  return loading===true||usersloading===true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url} 
              likes={post.likes}
              comments={post.comments}
               ownerImage={post.owner.avatar.url} 
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {
          users&&users.length>0?users.map((user)=>(
<User
key={user._id}
          userId={user._id}
          name={user.name}
          avatar={
           user.avatar.url
          }
        /> 
          )):<Typography>No Users yet</Typography>
        }
        {}
      </div>
    </div>
  );
};

export default Home;
