// src/pages/ProfilePage.js
import React from 'react';
import { useAuth } from '../hooks/authContext';
import '../styles/profile.css';

const Profile = () => {
  // Get user data from the context
  const { userProfile } = useAuth(); // Adjust the variable based on your actual context data structure

  return (
      <div className="profile-container">
          <div className="profile-header">
              <img 
                  src={userProfile?.profilePicture || "/static/img/default-profile.png"} 
                  alt="User Profile" 
                  className="profile-picture"
              />
          </div>
          <div className="profile-details">
              <div className="detail-item">
                  <h2>Username:</h2>
                  <p>{userProfile?.username || "username"}</p>
              </div>
              <div className="detail-item">
                  <h2>Email:</h2>
                  <p>{userProfile?.email || "email"}</p>
              </div>
              <div className="detail-item">
                  <h2>Joined:</h2>
                  <p>{userProfile?.date_joined || "Join Date"}</p>
              </div>
              {/* Add more details as needed */}
          </div>
          {/* <button className="edit-button">Edit Profile</button> */}
      </div>
  );
};

export default Profile;
