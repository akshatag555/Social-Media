import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Login from "./Component/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Home from "./Component/Home/Home"
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  })
  const {isAuth}=useSelector((state)=> state.user)
  return (
    <Router>
      {
        isAuth&&<Header/>
      }
      
      <Routes>
        <Route path="/" element={isAuth?<Home/>:<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;
