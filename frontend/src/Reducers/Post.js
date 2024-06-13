import { createReducer, createAction } from "@reduxjs/toolkit";
const initialState = {};
const likeReq = createAction("like/likeReq");
const likeSuccess = createAction("like/likeSuccess");
const likeFail = createAction("like/likeFail");
const addCommentReq = createAction("like/addCommentReq");
const addCommentSuccess = createAction("like/addCommentSuccesss");
const addCommentFail = createAction("like/addCommentFail");
const deleteCommentReq = createAction("like/deleteCommentReq");
const deleteCommentSuccess = createAction("like/deleteCommentSuccesss");
const deleteCommentFail = createAction("like/deleteCommentFail");
const newPostReq = createAction("like/newPostReq");
const newPostSuccess = createAction("like/newPostSuccesss");
const newPostFail = createAction("like/newPostFail");
const updateCaptionReq = createAction("like/updateCaptionReq");
const updateCaptionSuccess = createAction("like/updateCaptionSuccesss");
const updateCaptionFail = createAction("like/updateCaptionFail");
const deletePostReq = createAction("like/deletePostReq");
const deletePostSuccess = createAction("like/deletePostSuccesss");
const deletePostFail = createAction("like/deletePostFail");
const updateProfReq = createAction("like/updateProfReq");
const updateProfSuccess = createAction("like/updateProfSuccess");
const updateProfFail = createAction("like/updateProfFail");
const updatePassReq = createAction("like/updatePassReq");
const updatePassSuccess = createAction("like/updatePassSuccess");
const updatePassFail = createAction("like/updatePassFail");

const forgotPassReq = createAction("like/forgotPassReq");
const forgotPassSuccess = createAction("like/forgotPassSuccess");
const forgotPassFail = createAction("like/forgotPassFail");

const resetPassReq = createAction("like/resetPassReq");
const resetPassSuccess = createAction("like/resetPassSuccess");
const resetPassFail = createAction("like/resetPassFail");

const followUserReq = createAction("like/followUserReq");
const followUserSuccess = createAction("like/followUserSuccess");
const followUserFail = createAction("like/followUserFail");


const deleteProfReq = createAction("like/deleteProfReq");
const deleteProfSuccess = createAction("like/deleteProfSuccess");
const deleteProfFail = createAction("like/deleteProfFail");
const ClearErrors = createAction("like/ClearErrors");
const ClearMsg = createAction("like/ClearMsg");
export const likeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(likeReq, (state) => {
      state.loading = true;
    })
    .addCase(likeSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(likeFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addCommentReq, (state) => {
      state.loading = true;
    })
    .addCase(addCommentSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(addCommentFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteCommentReq, (state) => {
      state.loading = true;
    })
    .addCase(deleteCommentSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteCommentFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(newPostReq, (state) => {
      state.loading = true;
    })
    .addCase(newPostSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(newPostFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateCaptionReq, (state) => {
      state.loading = true;
    })
    .addCase(updateCaptionSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateCaptionFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deletePostReq, (state) => {
      state.loading = true;
    })
    .addCase(deletePostSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deletePostFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateProfReq, (state) => {
      state.loading = true;
      
    })
    .addCase(updateProfSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateProfFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    .addCase(updatePassReq, (state) => {
      state.loading = true;
    })
    .addCase(updatePassSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updatePassFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase(forgotPassReq, (state) => {
      state.loading = true;
    })
    .addCase(forgotPassSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(forgotPassFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(resetPassReq, (state) => {
      state.loading = true;
    })
    .addCase(resetPassSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(resetPassFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(followUserReq, (state) => {
      state.loading = true;
    })
    .addCase(followUserSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(followUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase(deleteProfReq, (state) => {
      state.loading = true;
    })
    .addCase(deleteProfSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteProfFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ClearErrors, (state) => {
      state.error = null;
    })
    .addCase(ClearMsg, (state) => {
      state.message = null;
    });
});
const myPostsReq = createAction("myPosts/myPostsReq");
const myPostsSuccess = createAction("myPosts/myPostsSuccess");
const myPostsFail = createAction("myPosts/myPostsFail");
const initialState2 = {};
export const myPostReducer = createReducer(initialState2, (builder) => {
  builder
    .addCase(myPostsReq, (state) => {
      state.loading = true;
    })
    .addCase(myPostsSuccess, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase(myPostsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ClearErrors, (state) => {
      state.error = null;
    });
});
const userPostsReq = createAction("userPosts/userPostsReq");
const userPostsSuccess = createAction("userPosts/userPostsSuccess");
const userPostsFail = createAction("userPosts/userPostsFail");
const initialState3 = {};
export const UserPostsReducer = createReducer(initialState3, (builder) => {
  builder
    .addCase(userPostsReq, (state) => {
      state.loading = true;
      
    })
    .addCase(userPostsSuccess, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase(userPostsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ClearErrors, (state) => {
      state.error = null;
    });
});
