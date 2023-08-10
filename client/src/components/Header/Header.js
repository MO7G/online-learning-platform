import React, { useState, useEffect } from "react";
import "./Header.scss";
import axios from 'axios';
import { CgDarkMode } from "react-icons/cg";
import {
  FaUserAstronaut,
  FaGripLines,
  FaGripLinesVertical,
} from "react-icons/fa";
import { BsSearch } from 'react-icons/bs'

const Header = () => {
  // Check local storage for initial dark mode preference
  const initialDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [profileActive, setProfileActive] = useState(false);



  const toggleColorMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Store the preference in local storage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const toggleProfile = () => {
    setProfileActive(!profileActive);
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
    // Fetch data when the component mounts
    axios.get('http://localhost:5002')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div>
      <header class="header">
        <section class="flex">
          <a href="home.html" class="logo">
            MO7G
          </a>

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
            <div id="user-btn" onClick={toggleProfile}>
              <FaUserAstronaut></FaUserAstronaut>
            </div>
            <div id="toggle-btn active" onClick={toggleColorMode}>
              <CgDarkMode></CgDarkMode>
            </div>
          </div>

          <div className={`profile ${profileActive ? "active" : ""}`}>
            <img src="images/pic-1.jpg" class="image" alt="" />
            <h3 class="name">shaikh anas</h3>
            <p class="role">studen</p>
            <a href="profile.html" class="btn">
              view profile
            </a>
            <div class="flex-btn">
              <a href="login.html" class="option-btn">
                login
              </a>
              <a href="register.html" class="option-btn">
                register
              </a>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Header;
