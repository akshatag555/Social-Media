import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Login from "./Component/Login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/User";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  })
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;
