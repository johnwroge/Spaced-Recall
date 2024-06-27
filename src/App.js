/* Parent component holding routes for SPA functionality*/

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import style from "./style.css";
import UserDisplay from "./UserDisplay";

const App = () => {
  return (
    <div>
      <div className = "App">
       <nav className="navbar">
          <h1>Spaced Repetition Flashcard Application</h1>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
    
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

