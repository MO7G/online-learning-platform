import React from 'react';
import './SideNavBar.scss';
import { Link } from 'react-router-dom';

const SideNavBar = () => {
  return (
    <div>
      <div className="side-bar">
        <div id="close-btn">
          <i className="fas fa-times"></i>
        </div>

        <div className="profile">
          <img src="profile-image-url" alt="Profile" />
          <h3 className="name">shaikh anas</h3>
          <p className="role">student</p>
          <Link to="/profile" className="btn">
            View Profile
          </Link>
        </div>

        <nav className="navbar">
          <Link to="/">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <Link to="/about">
            <i className="fas fa-question"></i>
            <span>About</span>
          </Link>
          <Link to="/courses">
            <i className="fas fa-graduation-cap"></i>
            <span>Courses</span>
          </Link>
          <Link to="/teachers">
            <i className="fas fa-chalkboard-user"></i>
            <span>Teachers</span>
          </Link>
          <Link to="/contact">
            <i className="fas fa-headset"></i>
            <span>Contact Us</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideNavBar;
