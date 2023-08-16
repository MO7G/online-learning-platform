import React, { useState, useEffect } from 'react';
import './SideNavBar.scss';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import UserWrapper from '../wrapper/UserWrapper'
import { FaSignOutAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, logout, generalInfo } from "../../features/auth/authSlice";

const SideNavBar = () => {
  const [renderSideNavActive, setRenderSideNavActive] = useState(false);
  const user = useSelector(state => state.auth.user);
  const isLogged = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }


  console.log(isLogged ? `this is the user ${user.img}` : "no one inside");

  return (
    <div>
      <div className="side-bar">
        <div id="close-btn">
          <AiOutlineClose />
        </div>
        <div className={`profile`}>
          <UserWrapper >
            <img className='image'
              src={`data:image/jpeg;base64,${isLogged ? user.img : ""}`} // Make sure to specify the appropriate image format
              alt={isLogged ? user.name : " "}
            />
            <h3 className="name">{user ? user.name : ' '}</h3>
            <p className="role">{user ? user.role : ' '}</p> {/* Corrected "studen" to "student" */}
            <Link to="/profile" className="btn"> {/* Use Link component */}
              View Profile
            </Link>
          </UserWrapper >
          <div className="flex-btn">
            {isLogged ? (
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            ) : (

              <React.Fragment>
                <div>
                  <h1 className='name'>Become a memeber</h1>
                  <Link to="/login" className="option-btn">
                    Login
                  </Link>
                  <Link to="/register" className="option-btn">
                    Register
                  </Link>
                </div>
              </React.Fragment>
            )}
          </div>
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
          <Link to="/contactus">
            <i className="fas fa-headset"></i>
            <span>Contact Us</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideNavBar;
