"use client";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Modal from "../LatestProjects/Modal";
import artworksData from "../../data/artworksData";
import "./styles.css";

const ITEMS_PER_PAGE = 12;

const ProjectsSection = () => {
  const [artworks, setArtworks] = useState(artworksData.slice(0, ITEMS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(artworksData.length / ITEMS_PER_PAGE);
  const [openModal, setOpenModal] = useState(null);
  const sectionRef = useRef(null);

  const fetchPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setArtworks(artworksData.slice(startIndex, endIndex));
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProjectClick = (projectId) => {
    setOpenModal(projectId);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-6" id="projects" ref={sectionRef}>
      <h2 className="text-center text-4xl font-bold  mt-4 mb-8 md:mb-12 pt-12">My Sculptures</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-2">
        {artworks.map((artwork) => (
          <ArtworkItem key={artwork.id} artwork={artwork} handleProjectClick={handleProjectClick} />
        ))}
      </ul>

      {openModal && (
        <Modal
          imgUrl={artworks.find((artwork) => artwork.id === openModal).images[0].image}
          title={artworks.find((artwork) => artwork.id === openModal).title}
          description={artworks.find((artwork) => artwork.id === openModal).description}
          artwork={artworks.find((artwork) => artwork.id === openModal)}
          onClose={closeModal}
        />
      )}

      <div className="flex items-center justify-center mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => fetchPage(page + 1)}
            className={`px-3 py-1 mr-2 rounded-md ${currentPage === page + 1 ? 'bg-primary-700 text-white' : 'bg-gray-200 text-black'} focus:outline-none`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

const ArtworkItem = ({ artwork, handleProjectClick }) => {
  return (
    <li className="project-card relative overflow-hidden rounded-sm bg-gray-800 group">
      <div className="project-card__image h-full relative group">
        <img
          src={artwork.images[0].image}
          alt={artwork.title}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 transform group-hover:scale-110"
          onClick={() => handleProjectClick(artwork.id)}
          
        />
        <div className="absolute inset-x-0 top-0 flex flex-col justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h5 className="text-white text-sm font-bold cursor-pointer" onClick={() => handleProjectClick(artwork.id)}>
            {artwork.title}
          </h5>
        </div>
      </div>
    </li>
  );
};

ArtworkItem.propTypes = {
  artwork: PropTypes.object.isRequired,
  handleProjectClick: PropTypes.func.isRequired,
};

export default ProjectsSection;
