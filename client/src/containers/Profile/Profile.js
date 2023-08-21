import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { reset, generalInfo } from "../../features/auth/authSlice";
import './Profile.scss'
const Profile = () => {
  const dispatch = useDispatch();
  const { general } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    console.log("I am refreshed")
    dispatch(generalInfo())
  }, [])
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  // User is logged in, render the profile
  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <img
            className="profile-image"
            src="profile-image.jpg"
            alt="Profile"
          />
          <h1 className="profile-name">John Doe</h1>
          <p className="profile-title">Web Developer</p>
        </div>
        <div className="profile-content">
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse mollis odio sit amet sagittis condimentum.
            Nullam eu sapien nec ex convallis posuere vitae id urna.
          </p>
        </div>
      </div>
      {/* Render other profile information here */}
    </div>
  );
};

export default Profile;
