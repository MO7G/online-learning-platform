import React from 'react';

const Profile = () => {
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("this is the user ", user);
  if (!user) {
    // User is not logged in, show a message or redirect to login page
    return <div>
      <p>Please log in to view your profile.</p>
    </div>;
  }

  // User is logged in, render the profile
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Render other profile information here */}
    </div>
  );
};

export default Profile;
