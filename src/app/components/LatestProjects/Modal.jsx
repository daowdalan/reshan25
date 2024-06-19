"use strict"; // Using strict mode for better practices

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const Modal = React.memo(({ artwork, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index

  useEffect(() => {
    setIsOpen(true); // Set modal open on initial render or prop change
    if (closeButtonRef.current) {
      closeButtonRef.current.focus(); // Focus the close button for accessibility
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      setIsOpen(false); // Clean up on unmount
      document.removeEventListener('keydown', handleEscape);
    };
  }, [artwork, onClose]);

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Stop at the first image
  }, []);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, artwork.images.length - 1)); // Stop at the last image
  }, [artwork.images.length]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 transition-opacity duration-300 ease-in-out"
      variants={backdropVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "exit"}
      onClick={handleClickOutside}
    >
      <motion.div
        className="flex items-center justify-center min-h-screen pt-4 px-4"
        variants={modalVariants}
      >
        <div ref={modalRef} className="relative w-full md:max-w-2xl rounded-lg shadow-lg">
          {/* Close button */}
          <button
            type="button"
            ref={closeButtonRef}
            className="absolute text-white right-2 bg-transparent p-2 z-10 focus:outline-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container with absolute positioning for sliders */}
          <div className="relative h-full w-full">
            <img
              src={artwork.images[currentIndex].image}
              alt={artwork.title}
              className="object-cover h-full w-full rounded-t-lg" // Ensures full image coverage and rounded top corners
            />
            {/* Progress indicator */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {`${currentIndex + 1} / ${artwork.images.length}`}
            </div>
            {/* Navigation buttons positioned absolutely on top corners */}
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevClick}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-transparent p-2 focus:outline-none"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            {currentIndex < artwork.images.length - 1 && (
              <button
                type="button"
                onClick={handleNextClick}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent p-2 focus:outline-none"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Title and description section */}
          <div className="p-4 bg-white rounded-b-lg">
            <h5 className="text-xl font-semibold mb-2 text-black">{artwork.title}</h5>
            <p className="text-gray-500">{artwork.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default Modal;
