// Import necessary modules and components
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Replace 'App' with your main component
import "./index.scss";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";


// Render the main component in the root element of the HTML document
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
