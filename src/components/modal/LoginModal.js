/**
 * A modal component for logging in users.
 * @param {object} props - The component props.
 * @param {Function} props.handleCloseModal - A callback function to close the modal.
 * @param {Function} props.setUser - A callback function to set the current user.
 * @returns {JSX.Element} The LoginModal component.
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./LoginModal.css";
import firebase from "../../firebase";

const LoginModal = ({ handleCloseModal, setUser }) => {
  /**
   * Handles clicks inside the modal content to prevent the modal from closing.
   * @param {MouseEvent} e - The click event.
   */
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Declare state variables for the form data (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * Updates the form data state whenever an input field changes.
   * @param {ChangeEvent} event - The change event.
   */
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handles the form submission by signing in the user with Firebase Authentication.
   * @param {FormEvent} event - The form submission event.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password);
      const user = userCredential.user;
      handleCloseModal();
      setUser(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorCode === "auth/user-not-found") {
        alert("User not found, please try again.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Incorrect password, please try again.");
      }
    }
  };

  useEffect(() => {
    // Disable scrolling on the document when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on the document when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  LoginModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  };

  return (
    <div className="modal-container" onClick={handleCloseModal}>
      <form
        className="modal"
        onClick={handleContentClick}
        onSubmit={handleFormSubmit}
      >
        <label className="modal-label">Email</label>
        <input
          className="modal-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label className="modal-label">Password</label>
        <input
          className="modal-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <div className="modal-buttons">
          <button className="modal-button" type="submit">
            Login
          </button>
          <button
            className="modal-button"
            type="button"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
        <p>
          This is the first version of the project. <br />
          For testing purposes, use the <br />
          <strong>Email</strong>'test@gmail.com'
          <br />
          <strong>Password</strong>'test12'
        </p>
      </form>
    </div>
  );
};

export default LoginModal;
