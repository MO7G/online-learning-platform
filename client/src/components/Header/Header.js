import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import axios from 'axios';
import { CgDarkMode } from "react-icons/cg";
import {
  FaUserAstronaut,
  FaGripLines,
  FaGripLinesVertical,
} from "react-icons/fa";
import { BsSearch } from 'react-icons/bs'
import UserWrapper from '../wrapper/UserWrapper'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, logout, validateToken } from "../../features/auth/authSlice";
import { FaSignOutAlt } from 'react-icons/fa'



const Header = () => {
  // Check local storage for initial dark mode preference
  const initialDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const isLogged = useSelector(state => state.auth.isValidToken);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleColorMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Store the preference in local storage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };



  const toggleSideNav = () => {

    let sideBar = document.querySelector('.side-bar');
    let body = document.body;

    sideBar.classList.toggle('active');
    body.classList.toggle('active');

  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);


  useEffect(() => {
    dispatch(validateToken());
  }, []);


  useEffect(() => {
    if (!isLogged && user == null) {
      console.log("I am callled");
      dispatch(logout());
    }
  }, [isLogged]);







  return (
    <div>
      <header class="header">
        <section class="flex">

          <Link to="/">
            <a class="logo">
              MO7G
            </a>
          </Link>

          <form action="search.html" method="post" class="search-form">
            <input
              type="text"
              name="search_box"
              required
              placeholder="search courses..."
              maxlength="100"
            />
            <button type="submit" class="fas fa-search"></button>
          </form>

          <div class="icons">
            <div id="menu-btn" onClick={toggleSideNav}><FaGripLines></FaGripLines></div>
            <div id="search-btn"><BsSearch></BsSearch></div>
            <div id="toggle-btn active" onClick={toggleColorMode}>
              <CgDarkMode></CgDarkMode>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Header;
