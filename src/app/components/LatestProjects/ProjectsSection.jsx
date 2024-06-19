"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import artworksData from "../../data/artworksData"; // Import the data
import LazyLoad from "react-lazyload"; // Import lazy loading library

const ProjectsSection = () => {
  const [latestArtworks, setArtworks] = useState(artworksData);
  const [openModal, setOpenModal] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleProjectClick = useCallback((projectId) => {
    const artwork = latestArtworks.find((artwork) => artwork.id === projectId);
    setSelectedArtwork(artwork);
    setOpenModal(true);
  }, [latestArtworks]);

  const closeModal = useCallback(() => {
    setOpenModal(false);
    setSelectedArtwork(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="p-6">
      <h2 className="text-center text-4xl font-bold text-black mt-4 mb-8 md:mb-12">
        Latest Artworks
      </h2>

      <motion.ul
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {latestArtworks.slice(0, 6).map((artwork) => (
          <motion.li
            key={artwork.id}
            className="project-card relative overflow-hidden rounded-sm bg-gray-800 group"
            variants={itemVariants}
          >
            <div className="project-card__image h-full aspect-w-16 aspect-h-9 relative group">
              <LazyLoad
                height="100%"
                offset={100}
                placeholder={<img src="placeholder.jpg" alt="Loading..." className="w-full h-full object-cover" />}
              >
                <img
                  src={artwork.images[0].image} // Assuming the first image is for the list
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 transform group-hover:scale-110"
                  onClick={() => handleProjectClick(artwork.id)}
                  alt={artwork.title}
                />
              </LazyLoad>

              <div className="absolute inset-x-0 top-0 flex flex-col justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h5 className="text-white text-sm font-semibold cursor-pointer" onClick={() => handleProjectClick(artwork.id)}>
                  {artwork.title}
                </h5>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {openModal && selectedArtwork && (
          <Modal
            imgUrl={selectedArtwork.images[0].image} // Assuming the first image is for the modal too
            title={selectedArtwork.title}
            description={selectedArtwork.description}
            artwork={selectedArtwork}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
