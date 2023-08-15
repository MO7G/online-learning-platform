import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../containers/Home/Home";
import About from "../containers/About/About";
import Courses from "../containers/Courses/Courses";
import Profile from "../containers/Profile/Profile";
import Contactus from "../containers/Contactus/Contactus";
import Teachers from "../containers/teachers/Teachers";
import Playlist from "../containers/Playlist/Playlist";
import Header from "../components/Header/Header";
import SideNavBar from "../components/SideNavBar/SideNavBar";

const RoutesConfig = () => {
  return (
    <BrowserRouter> {/* Use BrowserRouter here */}
      <div className="continer">
        <Header></Header>
        <SideNavBar></SideNavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Playlist />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/Teachers" element={<Teachers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RoutesConfig;
