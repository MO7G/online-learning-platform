import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import Header from "./components/Header/Header";
import RoutesConfig from "./routes/routes";
const App = () => {
    return (
        <Router>
            <div className="App-container">
                <Header />
                <SideNavBar />
                <RoutesConfig />
            </div>
        </Router>
    );
};

export default App;
