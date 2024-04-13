import React, { useRef } from "react";

const Modal = ({ imgUrl, title, description, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 transition-opacity duration-300 ease-in-out" onClick={handleClickOutside}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4">
        <div ref={modalRef} className="relative w-full md:max-w-2xl bg-white rounded-lg shadow-lg">
          <img src={imgUrl} alt={title} className="w-full h-auto object-contain rounded-t-lg" />
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">{title}</h5>
            <p className="text-gray-500">{description}</p>
          </div>
          <button type="button" className="absolute top-3 right-3.5 rounded-full p-1.5 text-center text-2xl" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
