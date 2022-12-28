import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import Header from "./Header";
import Home from "./Home";
import ProductList from "./ProductList";
import Cart from "./Cart";
import SinglePost from "./SinglePost";
import Error from "./Error";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthContextProvider } from "./AuthContet";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider> 
      <App/>
   </AuthContextProvider> 
  </React.StrictMode>
);
