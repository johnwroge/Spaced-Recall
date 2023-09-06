/* Parent component holding routes for SPA functionality*/

import React from "react";
import { Routes, Route } from "react-router-dom";
import style from "./style.css";
import UserDisplay from "./UserDisplay";

const App = () => {
  return (
    <div>
      <div className = "App">
        <h1>
          Spaced Repetition Flashcard Application
          </h1>
        <Routes> 
            <Route exact path="/" element={<UserDisplay />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

