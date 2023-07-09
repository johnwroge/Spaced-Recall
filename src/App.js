import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from "./style.css";
import UserDisplay from "./UserDisplay";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Spaced Repetition Flashcard Application</h1>
        <Routes> 
            <Route exact path="/" element={<UserDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

