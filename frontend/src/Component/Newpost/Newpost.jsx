import React, { useEffect, useState } from 'react'
import "./Newpost.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from '../../Actions/Post';
import {useAlert} from "react-alert"
import { loadUser } from '../../Actions/User';
const Newpost = () => {
  
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState("");
    const {loading,error,message}=useSelector((state)=>state.like);
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        const Reader=new FileReader();
        Reader.onload=()=>{
            if(Reader.readyState===2){
                setImage(Reader.result)
            }
        }
        Reader.readAsDataURL(file)
        console.log(image)
    }
    const dispatch=useDispatch();
    const alert=useAlert();
    const submitHandler=async (e)=>{
      e.preventDefault()
      console.log(image)
      await dispatch(createNewPost(caption,image))
      dispatch(loadUser())
    };
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch({type:"like/ClearErrors"})
      }
      if(message){
        console.log("als")
        alert.success(message);
        dispatch({type:"like/ClearMsg"})
      }
    },[dispatch,error,message,alert])
  return (
    <div>
      <div className="newPost">
        <form className='newPostForm' onSubmit={submitHandler}>
            <Typography variant='h3'> New Post</Typography>
            {image&&<img src={image} alt='post'/>}
            <input type="file"  accept='"image/*' onChange={handleImageChange}/>
            
            <input type="text" placeholder='Add your caption' value={caption} onChange={(e)=>setCaption(e.target.value)}/>
            <Button disabled={loading} type='submit'>
                Post
            </Button>
        </form>
      </div>
    </div>
  )
}

export default Newpost
