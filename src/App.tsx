import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import SinglePost from "./SinglePost";
import Home from "./Home";
import "./App.css";
import Login from "./Login";
import Cart from "./Cart";
import { AuthContext } from "./AuthContet";
import SignUp from "./SignUp";


function App() {
 
const {user_detail} = useContext(AuthContext)

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home/>} >
          {" "}
        </Route>
       
        <Route path="/login" element={user_detail ? <Navigate to='/' />: <Login/>} >
   
        </Route>

        <Route path="/register" element={<SignUp/>}>
            
        </Route>

        <Route path="product/:productId" element={<SinglePost />}>
          {" "}
        </Route>
        <Route path="/cart/:id" element={<Cart />}>
          {" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
