/* Parent component holding routes for SPA functionality*/

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import style from "./style.css";
import Navbar from "./Navbar";
import UserDisplay from "./UserDisplay";

const App = () => {
  return (
    <div>
      <div className = "App">
       <Navbar />
    
        <h1>Welcome to Spaced Recall </h1>
        
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserDisplay />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

