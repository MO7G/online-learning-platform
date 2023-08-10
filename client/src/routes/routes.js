// routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../containers/Home/Home";
import About from "../containers/About/About";
import Courses from "../containers/Courses/Courses";
import Profile from "../containers/Profile/Profile";
import Contactus from "../containers/Contactus/Contactus";
import Teachers from "../containers/teachers/Teachers";
import Playlist from "../containers/Playlist/Playlist";
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* courses route */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<Playlist />} />


      <Route path="/profile" element={<Profile />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/Teachers" element={<Teachers />} />
    </Routes>
  );
};

export default RoutesConfig;
