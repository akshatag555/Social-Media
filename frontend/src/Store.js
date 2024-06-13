import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/User";
import { UserPostsReducer, likeReducer, myPostReducer } from "./Reducers/Post";

const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:myPostReducer,
        userPosts:UserPostsReducer,
        userProfile:userProfileReducer
    },
})
export default store;