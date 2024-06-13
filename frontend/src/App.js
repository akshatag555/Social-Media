import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Login from "./Component/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Home from "./Component/Home/Home"
import Account from "./Component/Account/Account";
import Newpost from "./Component/Newpost/Newpost";
import Register from "./Component/Register/Register";
import UpdateProfile from "./Component/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Component/UpdatePassword/UpdatePassword";
import ForgotPass from "./Component/ForgotPass/ForgotPass";
import ResetPass from "./Component/ResetPass/ResetPass";
import UserProfile from "./Component/UserProfile/UserProfile";
import Search from "./Component/Search/Search";
import NotFound from "./Component/NotFound/NotFound";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  const {isAuth}=useSelector((state)=> state.user)
  return (
    <Router>
      {
        isAuth&&<Header/>
      }
      
      <Routes>
        <Route path="/account" element={isAuth?<Account/>:<Login/>}></Route>
        <Route path="/register" element={isAuth?<Account/>:<Register/>}></Route>
        <Route path="/" element={isAuth?<Home/>:<Login/>}/>
        <Route path="/newpost" element={isAuth?<Newpost/>:<Login/>}></Route>
        <Route path="/update/profile" element={isAuth?<UpdateProfile/>:<Login/>}></Route>
        <Route path="/update/password" element={isAuth?<UpdatePassword/>:<Login/>}></Route>
        <Route path="/forgot/password" element={isAuth?<UpdatePassword/>:<ForgotPass/>}></Route>
        <Route path="/password/reset/:token" element={isAuth?<UpdatePassword/>:<ResetPass/>}></Route>
        <Route path="/user/:id" element={isAuth?<UserProfile/>:<Login/>}></Route>
        <Route path="/search" element={isAuth?<Search/>:<Login/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
