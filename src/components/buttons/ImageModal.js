/**
 * A React component that displays a modal for images and videos.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item to display in the modal.
 * @param {function} props.onClose - The callback function to be called when the modal is closed.
 * @param {JSX.Element} props.children - The child components to display inside the modal.
 * @returns {JSX.Element} - The JSX code for the ImageModal component.
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./ImageModal.css";

const ImageModal = ({ onClose, children }) => {
  ImageModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };
  /**
   * A function to handle clicks inside the modal content.
   *
   * @param {Object} e - The click event object.
   */
  const handleContentClick = (e) => {
    e.stopPropagation();
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="image-modal-container">
        <div className="imageModal" onClick={handleContentClick}>
          <div className="modal-content">
            <button className="modal-close-button" onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
