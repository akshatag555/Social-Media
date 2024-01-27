import axios from "axios"

export const loginUser=(email,password)=>async (dispatch)=>{
    try {
        dispatch({
            type:"user/loginReq"
        })
        const {data}=await axios.post("/api/v1/login",{email,password},{
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
            payload:error
        })
    }
}
export const loadUser=()=>async (dispatch)=>{
    try {
        dispatch({
            
            type:"user/loaduserReq"
        })
        const { data } = await axios.get("/api/v1/me");

        dispatch({
            type:"user/loaduserSuccess",
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:"user/loaduserFail",
            payload:error
        })
    }
}