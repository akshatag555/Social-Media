import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import User from "../User/User";
const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Log out successfully");
  };
  const deleteProfHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "like/ClearErrors",
      });
    }

    if (likeError) {
      alert.error(likeError);
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
  }, [alert, error, message, likeError, dispatch]);

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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No posts to show</Typography>
        )}
      </div>
      <div className="accountright">
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
        <Button variant="contained" onClick={logoutHandler}>
          LogOut
        </Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfHandler}
          disabled={deleteLoading}
        >
          Delete Profile
        </Button>
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

export default Account;
