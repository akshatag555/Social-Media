import axios from "axios"
export const likePost=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"like/likeReq",
        })
        const {data}=await axios.get(`/api/v1/post/${id}`);
       
        dispatch({
            type:"like/likeSuccess",
            payload:data.message,
            
        })
    } catch (error) {
        dispatch({
            type:"like/likeFail",
            payload:error.response.data.message
        })
    }
}
export const addCommmentOnPost=(id,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"like/addCommentReq",
        })
        const {data}=await axios.put(`/api/v1/post/comment/${id}`,{
            comment
        },{
            headers:{
                "Content-Type":"application/json",

            }
        });
       
        dispatch({
            type:"like/addCommentSuccesss",
            payload:data.message,
            
        })
    } catch (error) {
        dispatch({
            type:"like/addCommentFail",
            payload:error.response.data.message
        })
    }
}

export const deleteCommmentOnPost=(id,commentId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"like/deleteCommentReq",
        })
       const {data}=await axios.delete(`/api/v1/post/comment/${id}`,{
        data:{commentId},
       })
       
        dispatch({
            type:"like/deleteCommentSuccesss",
            payload:data.message,
            
        })
    } catch (error) {
        dispatch({
            type:"like/deleteCommentFail",
            payload:error.response.data.message
        })
    }
}


export const createNewPost=(caption,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"like/newPostReq",
        })
        
          const {data}=await axios.post(`/api/v1/post/upload`,{
            caption,
            image,
        },{
            headers:{
                "Content-Type":"application/json",

            }
        });
       
        dispatch({
            type:"like/newPostSuccesss",
            payload:data.message,
            
        })
    } catch (error) {
        dispatch({
            type:"like/newPostFail",
            payload:error.response.data.message
        })
    }
}

export const updatePost=(caption,id)=>async(dispatch)=>{
    try { 
        console.log(caption)
        dispatch({
            type:"like/updateCaptionReq",
        })
        
          const {data}=await axios.put(`/api/v1/post/${id}`,{
            caption,
        },{
            headers:{
                "Content-Type":"application/json",

            }
        });
       
        dispatch({
            type:"like/updateCaptionSuccesss",
            payload:data.message,
            
        })
    } catch (error) {
        dispatch({
            type:"like/updateCaptionFail",
            payload:error.response.data.message
        })
    }
}

export const deletePost=(id)=>async(dispatch)=>{
    try { 
        
        dispatch({
            type:"like/deletePostReq",
        })
        
          const {data}=await axios.delete(`/api/v1/post/${id}`);
       
        dispatch({
            type:"like/deletePostSuccesss",
            payload:data.message,
            
        })
    } catch (error) {
        dispatch({
            type:"like/deletePostFail",
            payload:error.response.data.message
        })
    }
}
