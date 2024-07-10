import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "./userRoleContext.jsx";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = "https://collegeproject-wgmy.onrender.com/api";
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
