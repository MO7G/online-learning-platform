import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { reset, generalInfo } from "../../features/auth/authSlice";
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
      <h1>Welcome, {user.name}!</h1>
      {/* Render other profile information here */}
    </div>
  );
};

export default Profile;
