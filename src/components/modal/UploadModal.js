/**
 * React functional component that allows users to upload an image and associated metadata
 * @param {Object} props - An object containing props passed down from the parent component
 * @param {function} props.handleCloseModal - A function that closes the modal when called
 * @returns {JSX.Element} A React JSX element that renders the UploadModal component
 */
import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import PropTypes from "prop-types";
import firebase from "../../firebase";
import LocationPicker from "./LocationPicker";

const UploadModal = ({ handleCloseModal, ...props }) => {
  UploadModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  /**
   * A function that prevents clicks on the modal content from bubbling up to the overlay
   * @param {Object} e - An event object
   */
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Declare state variables for the map position, location, and form data
  const [mapPosition, setMapPosition] = useState(null);
  const [setLocation] = useState({ lat: null, lng: null });
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    category: "",
    file: null,
    locationData: { lat: null, lng: null },
  });

  /**
   * A function that updates the location and form data state whenever user input changes
   * @param {Object} newLocation - An object containing the new latitude and longitude values
   */
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setFormData({
      ...formData,
      locationData: {
        lat: newLocation.lat,
        lng: newLocation.lng,
      },
    });
    setMapPosition(newLocation);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  /**
   * A function that updates the formData state whenever an input field changes
   * @param {Object} event - An event object that contains information about the input field that triggered the function
   */
  const inputChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      locationData: {
        lat: mapPosition ? mapPosition.lat : null,
        lng: mapPosition ? mapPosition.lng : null,
      },
    });
  };

  /**
   * A function that updates the formData state whenever a new file is selected
   * @param {Object} event - An event object that contains information about the file input field
   */
  const fileChangeHandler = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0],
    });
  };

  /**
   * A function that handles the submission of the form and associated image data
   * @param {Object} event - An event object that contains information about the form submission event
   */
  const submitOrderHandler = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.date ||
      !formData.category ||
      !formData.file
    ) {
      alert("All fields are required!");
      return;
    }
    setIsSubmitting(true);

    const storageRef = firebase.storage().ref();
    const databaseRef = firebase.database().ref("images");

    const fileRef = storageRef.child(`images/${formData.file.name}`);
    await fileRef.put(formData.file);
    const downloadURL = await fileRef.getDownloadURL();

    const imageData = {
      name: formData.name,
      location: formData.location,
      date: formData.date,
      category: formData.category,
      file: downloadURL,
      lat: formData.locationData.lat,
      lng: formData.locationData.lng,
    };
    const newImageRef = databaseRef.push();
    const randomId = Math.round(Math.random() * 1000);
    await newImageRef.set({ ...imageData, id: randomId.toString() });

    setIsSubmitting(false);
    setDidSubmit(true);
    props.onClose(true);
  };
  useEffect(() => {
    // Disable scrolling on the document when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on the document when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="modal-container" onClick={handleCloseModal}>
      {didSubmit ? (
        alert("Upload is submited!")
      ) : (
        <form
          className="modal"
          onClick={handleContentClick}
          onSubmit={submitOrderHandler}
        >
          <div className="input-container">
            <label className="modal-label" htmlFor="name">
              Name:
            </label>
            <input
              className="modal-input"
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-container">
            <label className="modal-label" htmlFor="location">
              Location:
            </label>
            <LocationPicker onLocationChange={handleLocationChange} />
          </div>
          <div className="input-container">
            <label className="modal-label" htmlFor="date">
              Date:
            </label>
            <input
              className="modal-input"
              type="date"
              id="date"
              name="date"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-container">
            <label className="modal-label" htmlFor="category">
              Category:
            </label>
            <select
              className="modal-input"
              id="category"
              name="category"
              value={formData.category}
              onChange={inputChangeHandler}
            >
              <option value="">-- select --</option>
              <option value="1">Basic image</option>
              <option value="2">Video</option>
              <option value="3">360 Photo</option>
            </select>
          </div>
          <div className="input-container">
            <label className="modal-label" htmlFor="file">
              File:
            </label>
            <input
              className="modal-input"
              type="file"
              id="file"
              name="file"
              onChange={fileChangeHandler}
            />
          </div>
          <div className="modal-buttons">
            <button
              className="modal-button"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <button
              className="modal-button"
              type="button"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadModal;
