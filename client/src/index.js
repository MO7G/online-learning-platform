// Import necessary modules and components
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Replace 'App' with your main component
import "./index.scss";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import Header from "./components/Header/Header";
import RoutesConfig from "./routes/routes";

// Render the main component in the root element of the HTML document
ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
