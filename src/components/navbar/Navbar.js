/**
 * The navigation bar component for the application.
 *
 * @returns {JSX.Element} The navigation bar element.
 */
import React, { useState, useEffect } from "react";
import LoginModal from "../modal/LoginModal";
import UploadModal from "../modal/UploadModal";
import "./Navbar.css";
import firebase from "../../firebase";

const NavBar = () => {
  // Set initial state for showing the login modal and the upload modal to false, and user to null.
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [user, setUser] = useState(null);

  /**
   * Sets up a Firebase authentication listener that will update the user state whenever the authentication state changes.
   */
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Handles clicks on the login button by showing the login modal.
   */
  const handleLoginClick = () => {
    setShowModal(true);
  };

  /**
   * Handles closing the login modal by hiding it.
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Handles clicks on the upload button by showing the upload modal.
   */
  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  /**
   * Handles closing the upload modal by hiding it.
   */
  const handleUploadCloseModal = () => {
    setShowUploadModal(false);
  };

  /**
   * Handles clicks on the logout button by signing out the user.
   */
  const handleLogoutClick = () => {
    firebase.auth().signOut();
    console.log(handleLogoutClick);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-right">
          {user ? (
            <>
              <button
                onClick={handleLogoutClick}
                className="login-signup-button"
              >
                Logout
              </button>
              <button
                onClick={handleUploadClick}
                className="login-signup-button"
              >
                Upload
              </button>
              <div className="welcome-message">Welcome {user.email}</div>
            </>
          ) : (
            <button onClick={handleLoginClick} className="login-signup-button">
              Login
            </button>
          )}
        </div>
      </nav>
      {showModal && <LoginModal handleCloseModal={handleCloseModal} />}
      {showUploadModal && (
        <UploadModal handleCloseModal={handleUploadCloseModal} />
      )}
    </>
  );
};

export default NavBar;
