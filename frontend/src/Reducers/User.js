import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
    isAuth:false,
    user:null,
    loading:false,
    error:null
    
};
const loginReq = createAction("user/loginReq");
const loginSuccess = createAction("user/loginSuccess");
const loginFail = createAction("user/loginFail");
const regReq = createAction("user/regReq");
const regSuccess = createAction("user/regSuccess");
const regFail = createAction("user/regFail");
const loaduserReq = createAction("user/loaduserReq");
const loaduserSuccess = createAction("user/loaduserSuccess");
const loaduserFail = createAction("user/loaduserFail");



export const userReducer = createReducer(initialState, (builder) => {
  
  builder
  
    .addCase(loginReq, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
      
      state.isAuth=true;
    })
    .addCase(loginFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth=false;
    })
    .addCase(regReq, (state) => {
      state.loading = true;
    })
    .addCase(regSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth=true;
    })
    .addCase(regFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth=false;
    })
    .addCase(loaduserReq, (state) => {
      state.loading = true;
    })
    .addCase(loaduserSuccess, (state, action) => {
      state.loading = false;
      
      state.user = action.payload;
      
      state.isAuth=true;
    })
    .addCase(loaduserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth=false;
    });
  // Add other cases for different actions if needed
});
const postOfFollowinginitialState={};
export const postOfFollowingReducer=createReducer(postOfFollowinginitialState,(builder)=>{
  builder.addCase(postOfFollowingReq, (state) => {
    
  })
  .addCase(postOfFollowingSuccess, (state,action) => {
    
  })
  .addCase(postOfFollowingFail, (state,action) => {
    
  })

}
  )
