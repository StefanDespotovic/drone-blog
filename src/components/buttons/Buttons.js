/**
 * A React functional component that displays buttons to filter and display images and videos.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onButtonClick - The callback function to be called when a button is clicked.
 * @returns {JSX.Element} - The JSX code for the Buttons component.
 */
import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import PropTypes from "prop-types";
import "./Buttons.css";
import ImageModal from "./ImageModal";

const Buttons = ({ onButtonClick }) => {
  // Define state variables to store the data, selected data, and clicked item.
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  console.log(onButtonClick);
  Buttons.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
  };

  /**
   * The effect hook to initialize Firebase and fetch data from the "images" database reference.
   */
  useEffect(() => {
    // Initialize Firebase
    // ...

    // Create a reference to the "images" database node and attach an event listener for changes to the data
    const dbRef = firebase.database().ref("images");
    dbRef.on("value", (snapshot) => {
      // Extract the data from the snapshot and convert it to an array
      const databaseData = snapshot.val();
      const dataArray = Object.values(databaseData);
      // Update the state variables for the data and selected data
      setData(dataArray);
      setSelectedData(dataArray.filter((item) => item.category === "1"));
    });
  }, []);

  /**
   * The effect hook to update the map and marker when the clicked item changes.
   */
  useEffect(() => {
    if (clickedItem) {
      // Create the map
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: clickedItem.lat, lng: clickedItem.lng },
        zoom: 17,
      });

      // Add a marker
      const marker = new window.google.maps.Marker({
        position: { lat: clickedItem.lat, lng: clickedItem.lng },
        map: map,
        title: clickedItem.name,
      });
      console.log(marker);
    }
  }, [clickedItem]);

  /**
   * The event handler for button clicks. Updates the selected data based on the category of the clicked button.
   *
   * @param {string} category - The category of the clicked button.
   */
  const handleClick = (category) => {
    setSelectedData(data.filter((item) => item.category === category));
    // Remove the "active" class from all buttons
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => button.classList.remove("active"));
    // Add the "active" class to the clicked button
    const activeButton = document.querySelector(
      `.button[data-category="${category}"]`
    );
    activeButton.classList.add("active");
  };

  /**
   * The event handler for dummy clicks. Sets the clicked item to the selected item and opens the image modal.
   *
   * @param {Object} item - The clicked item.
   */
  const handleDummyClick = (item) => {
    setClickedItem(item);
  };

  /**
   * The event handler for modal close. Closes the image modal.
   */
  const handleModalClose = () => {
    setClickedItem(null);
  };

  return (
    <div className="Image-container">
      <div className="buttons-container">
        <button
          className="button"
          onClick={() => handleClick("1")}
          data-category="1"
        >
          Image
        </button>
        <button
          className="button"
          onClick={() => handleClick("2")}
          data-category="2"
        >
          Video
        </button>
        <button
          className="button"
          onClick={() => handleClick("3")}
          data-category="3"
        >
          360 Image
        </button>
      </div>
      <div>
        {selectedData.length ? (
          <div className="dummy-container">
            {selectedData.map((item) => (
              <div
                key={item.id}
                className="dummy"
                onClick={() => handleDummyClick(item)}
              >
                <div className="imageContainer">
                  {item.category === "2" ? (
                    <iframe
                      src={item.file}
                      alt=""
                      title="Drone-video"
                      className="dummy-video"
                      scrolling="no"
                      allowFullScreen="yes"
                    />
                  ) : (
                    <img
                      src={item.file}
                      alt=""
                      title="Drone-image"
                      className="dummy-image"
                    />
                  )}
                </div>
                <h3>{item.name}</h3>
                <p>Date: {item.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="message-container">
            <h2>There is no data available to display at this time</h2>
            <h3>Come back later</h3>
          </div>
        )}
        {clickedItem && (
          <ImageModal Item={clickedItem} onClose={handleModalClose}>
            <div className="main-container">
              <div className="imageContainerModal">
                {clickedItem.category === "2" ? (
                  <iframe
                    src={clickedItem.file}
                    alt=""
                    title="Click to play"
                    className="dummy-video-modal"
                    scrolling="no"
                    allowFullScreen="yes"
                  />
                ) : (
                  <a
                    href={clickedItem.file}
                    className="dummy-image-modal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={clickedItem.file}
                      alt=""
                      title="Click to view"
                      className="dummy-image-modal"
                    />
                  </a>
                )}
              </div>
              <div className="description">
                <h3>Location: {clickedItem.name}</h3>
                <p>Date: {clickedItem.date}</p>
              </div>
              <div id="map"></div>
            </div>
          </ImageModal>
        )}
      </div>
    </div>
  );
};

export default Buttons;
