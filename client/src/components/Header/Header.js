import React from "react";
import "./Header.scss";
import { CgDarkMode } from "react-icons/cg";
import {
  FaUserAstronaut,
  FaGripLines,
  FaGripLinesVertical,
} from "react-icons/fa";
import {BsSearch} from 'react-icons/bs'

const Header = () => {
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
            <div id="menu-btn"><FaGripLines></FaGripLines></div>
            <div id="search-btn"><BsSearch></BsSearch></div>
            <div id="user-btn">
              <FaUserAstronaut></FaUserAstronaut>
            </div>
            <div id="toggle-btn">
              <CgDarkMode></CgDarkMode>
            </div>
          </div>

          <div class="profile">
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
