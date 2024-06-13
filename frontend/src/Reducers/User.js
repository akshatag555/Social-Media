import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
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

const logoutReq = createAction("user/logoutReq");
const logoutSuccess = createAction("user/logoutSuccess");
const logoutFail = createAction("user/logoutFail");
const ClearErrors = createAction("user/ClearErrors");

export const userReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(loginReq, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;

      state.isAuth = true;
    })
    .addCase(loginFail, (state, action) => {
      
      state.loading = false;
      
      state.error = action.payload;
      state.isAuth = false;
    })
    .addCase(regReq, (state) => {
      state.loading = true;
    })
    .addCase(regSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    })
    .addCase(regFail, (state, action) => {
      state.loading = false;
      
      state.error = action.payload;
      state.isAuth = false;
    })
    .addCase(loaduserReq, (state) => {
      state.loading = true;
    })
    .addCase(loaduserSuccess, (state, action) => {
      state.loading = false;

      state.user = action.payload;

      state.isAuth = true;
    })
    .addCase(loaduserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    })
    
    .addCase(logoutReq, (state) => {
      state.loading = true;
    })
    .addCase(logoutSuccess, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuth = false;
    })
    .addCase(logoutFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = true;
    })

    .addCase(ClearErrors, (state) => {
      state.error = null;
    });
  // Add other cases for different actions if needed
});

const postOfFollowinginitialState = {};
const postOfFollowingReq = createAction("postOfFollowing/postOfFollowingReq");
const postOfFollowingSuccess = createAction(
  "postOfFollowing/postOfFollowingSuccess"
);
const postOfFollowingFail = createAction("postOfFollowing/postOfFollowingFail");

export const postOfFollowingReducer = createReducer(
  postOfFollowinginitialState,
  (builder) => {
    builder
      .addCase(postOfFollowingReq, (state) => {
        state.loading = true;
      })
      .addCase(postOfFollowingSuccess, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(postOfFollowingFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ClearErrors, (state) => {
        state.error = null;
      });
  }
);

const allUsersinitialState = {
  loading: false,
  users: null,
};
const allUsersReq = createAction("allUsers/allUsersReq");
const allUsersSuccess = createAction("allUsers/allUsersSuccess");
const allUsersFail = createAction("allUsers/allUsersFail");

export const allUsersReducer = createReducer(
  allUsersinitialState,
  (builder) => {
    builder
      .addCase(allUsersReq, (state) => {
        state.loading = true;
      })
      .addCase(allUsersSuccess, (state, action) => {
        state.loading = false;

        state.users = action.payload;
        console.log(action.payload);
      })
      .addCase(allUsersFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ClearErrors, (state) => {
        state.error = null;
      });
  }
);

const userProfReq = createAction("userProfile/userProfReq");
const userProfSuccess = createAction("userProfile/userProfSuccess");
const userProfFail = createAction("userProfile/userProfFail");
const userProfinitialState={}
export const userProfileReducer = createReducer(
  userProfinitialState,
  (builder) => {
    builder
      .addCase(userProfReq, (state) => {
        state.loading = true;
        
      })
      .addCase(userProfSuccess, (state, action) => {
        state.loading = false;

        state.user = action.payload;
        
      })
      .addCase(userProfFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ClearErrors, (state) => {
        state.error = null;
      });
  }
);
