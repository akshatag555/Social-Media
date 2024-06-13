import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser, getUserProfile, getUsersPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import {  useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import User from "../User/User";
const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params=useParams();
  const { user, loading: userLoading,error:userError } = useSelector((state) => state.userProfile);
  const { user:me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading:followLoading
  } = useSelector((state) => state.like);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following,setFollowing]=useState(false)
  const [myProfile,setMyProfile]=useState(false)
  const followHandler=async ()=>{
    setFollowing(!following)
    await dispatch(followUnfollowUser(user._id))
    dispatch(getUserProfile(params.id))
  }
  useEffect(() => {
    dispatch(getUsersPosts(params.id));
    dispatch(getUserProfile(params.id))
    
    //why going infinite calls???? if uuser followers are check heree...
  }, [dispatch,params.id]);
  useEffect(()=>{
    if(me._id===params.id){
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  },[user,me._id,params.id])
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "like/ClearErrors",
      });
    }

    if (followError) {
      alert.error(followError);
      dispatch({
        type: "like/ClearErrors",
      });
    }
    if(userError){
      alert.error(userError);
      dispatch({
        type: "userProfile/ClearErrors",
      });
    }
    if (message) {
      alert.success(message);
      dispatch({
        type: "like/ClearMsg",
      });
    }
  }, [alert, error, message, followError,userError, dispatch]);

  return loading === true || userLoading ? (
    <Loader />
  ) : loading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
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
          <Typography variant="h6">No Post To Show</Typography>
        )}
      </div>
      <div className="accountright">
        {
          user&&(
            <>
            <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <Typography>{user.posts.length}</Typography>

          <Typography>Posts</Typography>
        </div>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>{user.followers.length}</Typography>
            <Typography>Followers</Typography>
          </button>
        </div>
        <div>
          <button>
            <Typography onClick={() => setFollowingToggle(!followingToggle)}>
              {user.following.length}
            </Typography>
            <Typography>Following</Typography>
          </button>
        </div>
        {
            myProfile?null: <Button variant="contained" style={{background:following?"red":""}} onClick={followHandler} disabled={followLoading}>
            {
                following?"Unfollow":"Follow"
            }
          </Button>
        }
       
            </>
          )
        }
        
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={user.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have No Follower
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((following) => (
                <User
                  key={following._id}
                  userId={following._id}
                  name={following.name}
                  avatar={
                user.avatar.url
                  }
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You dont follow anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};



export default UserProfile
