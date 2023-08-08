// About.js
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
const About = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    // Navigate to /about/yes when the "Add" button is clicked
    navigate("/about/yes");
  };

  return (
    <div>
      {/* Your About page content */}
      <h1>About Page</h1>
      <button onClick={handleAddClick}>Add</button>
      <Link to="/about/yes">Go to Yes Page</Link>
      <Outlet />
    </div>
  );
};

export default About;
