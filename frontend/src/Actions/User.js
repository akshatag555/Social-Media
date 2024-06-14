import axios from "axios"

export const loginUser=(email,password)=>async (dispatch)=>{
    try {
        dispatch({
            type:"user/loginReq"
        })
        const {data}=await axios.post("https://social-media-akshatag555s-projects.vercel.app/api/v1/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"user/loginSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"user/loginFail",
            payload:error.response.data.message
        })
    }
}

export const registerUser=(name,email,password,avatar)=>async (dispatch)=>{
    try {
        dispatch({
            type:"user/regReq"
        })
        const {data}=await axios.post("https://social-media-akshatag555s-projects.vercel.app/api/v1/register",{name,email,password,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"user/regSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type:"user/regFail",
            payload:error.response.data.message
        })
    }
}

export const updateProfile=(name,email,avatar)=>async (dispatch)=>{
    try {
        dispatch({
            type:"like/updateProfReq"
        })
        const {data}=await axios.put("https://social-media-akshatag555s-projects.vercel.app/api/v1/update/profile",{name,email,avatar},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"like/updateProfSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"like/updateProfFail",
            payload:error.response.data.message
        })
    }
}

export const updatePass=(oldPass,newPass)=>async (dispatch)=>{
    try {
        dispatch({
            type:"like/updatePassReq"
        })
        const {data}=await axios.put("https://social-media-akshatag555s-projects.vercel.app/api/v1/update/password",{oldPass,newPass},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"like/updatePassSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"like/updatePassFail",
            payload:error.response.data.message
        })
    }
}

export const forgotPass=(email)=>async (dispatch)=>{
    try {
        dispatch({
            type:"like/forgotPassReq"
        })
        const {data}=await axios.post("https://social-media-akshatag555s-projects.vercel.app/api/v1/forgot/password",{email},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"like/forgotPassSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"like/forgotPassFail",
            payload:error.response.data.message
        })
    }
}

export const resetPass=(token,password)=>async (dispatch)=>{
    try {
        dispatch({
            type:"like/resetPassReq"
        })
        const {data}=await axios.put( `https://social-media-akshatag555s-projects.vercel.app/api/v1/password/reset/${token}`,{password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"like/resetPassSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"like/resetPassFail",
            payload:error.response.data.message
        })
    }
}

export const deleteProfile=()=>async (dispatch)=>{
    try {
        dispatch({
            type:"like/deleteProfReq"
        })
        const {data}=await axios.delete("https://social-media-akshatag555s-projects.vercel.app/api/v1/delete/me",)
        dispatch({
            type:"like/deleteProfSuccess",
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:"like/deleteProfFail",
            payload:error.response.data.message
        })
    }
}

export const logoutUser=()=>async (dispatch)=>{
    try {
        dispatch({
            type:"user/logoutReq"
        })
        await axios.get("https://social-media-akshatag555s-projects.vercel.app/api/v1/logout")
        dispatch({
            type:"user/logoutSuccess",
        
        })
    } catch (error) {
        dispatch({
            type:"user/logoutFail",
            payload:error.response.data.message
        })
    }
}

export const loadUser=()=>async (dispatch)=>{
    try {
        dispatch({
            
            type:"user/loaduserReq"
        })
        const { data } = await axios.get("https://social-media-akshatag555s-projects.vercel.app/api/v1/me");

        dispatch({
            type:"user/loaduserSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"user/loaduserFail",
            payload:error.response.data.message
        })
    }
}
export const getFollowingPosts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"postOfFollowing/postOfFollowingReq",
        })
        const {data}=await axios.get("https://social-media-akshatag555s-projects.vercel.app/api/v1/posts");
        
        dispatch({
            type:"postOfFollowing/postOfFollowingSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"postOfFollowing/postOfFollowingFail",
            payload:error.response.data.message
        })
    }
}

export const getMyPosts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"myPosts/myPostsReq",
        })
        const {data}=await axios.get("https://social-media-akshatag555s-projects.vercel.app/api/v1/my/posts");
        
        dispatch({
            type:"myPosts/myPostsSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"myPosts/myPostsFail",
            payload:error.response.data.message
        })
    }
}

export const getUsersPosts=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"userPosts/userPostsReq",
        })
        const {data}=await axios.get(`https://social-media-akshatag555s-projects.vercel.app/api/v1/user/posts/${id}`);
        
        dispatch({
            type:"userPosts/userPostsSuccess",
            payload:data.posts,
        })
    } catch (error) {
        dispatch({
            type:"userPosts/userPostsFail",
            payload:error.response.data.message
        })
    }
}

export const getUserProfile=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"userProfile/userProfReq",
        })
        const {data}=await axios.get(`https://social-media-akshatag555s-projects.vercel.app/api/v1/user/${id}`);
        
        dispatch({
            type:"userProfile/userProfSuccess",
            payload:data.user,
        })
    } catch (error) {
        dispatch({
            type:"userProfile/userProfFail",
            payload:error.response.data.message
        })
    }
}

export const getAllUsers=(name="")=>async(dispatch)=>{
    try {
        dispatch({
            type:"allUsers/allUsersReq",
        })
        const {data}=await axios.get(`https://social-media-akshatag555s-projects.vercel.app/api/v1/users?name=${name}`);
       
        dispatch({
            type:"allUsers/allUsersSuccess",
            payload:data.user,
            
        })
    } catch (error) {
        dispatch({
            type:"allUsers/allUsersFail",
            payload:error.response.data.message
        })
    }
}

export const followUnfollowUser=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"like/followUserReq",
        })
        const {data}=await axios.get(`https://social-media-akshatag555s-projects.vercel.app/api/v1/follow/${id}`);
        
        dispatch({
            type:"like/followUserSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:"like/followUserFail",
            payload:error.response.data.message
        })
    }
}