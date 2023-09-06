import React from 'react'
import  { createRoot }  from 'react-dom/client';
import ReactDOM from "react-dom";
import App from './src/App.js'
import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
    <App />
  </BrowserRouter>,
);




