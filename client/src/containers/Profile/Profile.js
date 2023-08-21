import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { generalInfo } from "../../features/auth/authSlice";
import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { general } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(generalInfo());
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile-container">
      <div className='message'>
        <p className="greeting">Hello 👋 {user.name}</p>
        <p className="role-info">
          You are a Great <span className="role">{user.role}</span> who contributes significantly to the development of this platform.
        </p>
      </div>
    </div>
  );
};

export default Profile;
