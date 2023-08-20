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
import Login from '../containers/Login/Login'
import Register from '../containers/Register/Register'
import VideoPage from "../containers/VideoPage/VideoPage";
import ProtectedRoutes from '../containers/util/ProtectedRoutes'
import TeacherProfile from "../containers/TeacherProfile/TeacherProfile";
const RoutesConfig = () => {
  return (
    <BrowserRouter> {/* Use BrowserRouter here */}
      <div className="continer">
        <Header></Header>
        <SideNavBar></SideNavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Private Routes  */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<Profile />} path="/profile" exact />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* Courses Routes  */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Playlist />} />
          <Route path="/courses/:courseId/:teacherIdzz" element={<TeacherProfile />} />





          <Route path="/contactus" element={<Contactus />} />
          <Route path="/Teachers" element={<Teachers />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RoutesConfig;
