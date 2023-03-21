import React from "react";
import Image from "../../images/profile_photo.jpg";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-pic">
        <img src={Image} alt="Profile" />
      </div>
      <div className="profile-info">
        <h1>Despotović Stefan</h1>
        <p>Passionate drone enthusiast sharing aerial adventures</p>
      </div>
    </div>
  );
};

export default Profile;
