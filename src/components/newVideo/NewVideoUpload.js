/**
 * A React component that fetches and displays the latest video uploaded to a given YouTube channel.
 * @component
 * @param {object} props - The props object containing the YouTube channel ID.
 * @param {string} props.channelId - The ID of the YouTube channel to fetch the latest video from.
 * @return {JSX.Element} - The rendered component.
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./NewVideoUpload.css";

const NewVideoUpload = ({ channelId }) => {
  NewVideoUpload.propTypes = {
    channelId: PropTypes.string.isRequired,
  };
  // Set initial state for videoId to an empty string
  const [videoId, setVideoId] = useState("");

  const fetchVideo = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`
      );
      const data = await response.json();
      setVideoId(data.items[0].id.videoId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [channelId]);

  return (
    <div className="new-video-container">
      <h2>Latest Video</h2>
      <p>Check out the latest video</p>
      <div>
        {videoId && (
          <iframe
            className="iframe"
            title="Latest video"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen="allowfullscreen"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default NewVideoUpload;
