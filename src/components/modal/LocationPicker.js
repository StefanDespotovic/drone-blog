/**
 * A React functional component that allows the user to select a location using the Google Maps Places Autocomplete search bar.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onLocationChange - The callback function to be called when the user selects a location.
 * @returns {JSX.Element} - The JSX code for the LocationPicker component.
 */
import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";

const LocationPicker = ({ onLocationChange }) => {
  LocationPicker.propTypes = {
    onLocationChange: PropTypes.func.isRequired,
  };
  // Declare state variables for the address and the map position
  const [address, setAddress] = useState("");
  const [mapPosition, setMapPosition] = useState(null);

  // Load the Google Maps JavaScript API using the useLoadScript hook from the @react-google-maps/api package
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  /**
   * A function that handles the selection of a place from the Google Places Autocomplete search bar.
   *
   * @param {Object} place - The selected place object from the Autocomplete component.
   */
  const handlePlaceSelect = (place) => {
    if (place && place.geometry && place.geometry.location) {
      // Extract the latitude and longitude of the selected place and update the map position and call the onLocationChange callback function with the new coordinates
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMapPosition({ lat, lng });
      onLocationChange({ lat, lng });
    }
  };

  // If there is an error while loading the maps, display an error message
  if (loadError) return "Error loading maps";
  // If the maps are still loading, display a loading message
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
        onPlaceChanged={() => handlePlaceSelect(window.autocomplete.getPlace())}
      >
        <input
          className="modal-input"
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Autocomplete>
      {mapPosition && <p>Selected location: {address}</p>}
    </div>
  );
};

export default LocationPicker;
