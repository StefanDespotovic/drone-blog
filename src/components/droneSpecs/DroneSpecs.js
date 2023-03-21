import React from "react";
import "./DroneSpecs.css";

const DroneSpecs = () => {
  return (
    <div className="drone-specs-container">
      <h2>DJI drone specifications</h2>
      <p>
        The Mini 2 is a small, lightweight drone designed for casual aerial
        photography and videography
        <br />{" "}
        <a href="https://www.dji.com/mini-2" title="DJI Mini 2">
          Learn more: about DJI Mini 2
        </a>
      </p>

      <ul>
        <li>
          <strong>Weight:</strong> 249 g
        </li>
        <li>
          <strong>Max Flight Time:</strong> 31 minutes
        </li>
        <li>
          <strong>Max Transmission Distance:</strong> 10 km
        </li>
        <li>
          <strong>Camera:</strong> 12MP, 4K@30fps
        </li>
        <li>
          <strong>Max Wind Resistance:</strong> 8.5-10.5 m/s
        </li>
      </ul>
    </div>
  );
};

export default DroneSpecs;
