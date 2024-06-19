"use client";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../LatestProjects/Modal";
import { motion, AnimatePresence } from "framer-motion";
import artworksData from "../../data/artworksData"; // Import the data
import { useInView } from "react-intersection-observer"; // For lazy loading

const ITEMS_PER_PAGE = 9; // Define how many items you want per page

const ProjectsSection = () => {
  const [artworks, setArtworks] = useState(artworksData.slice(0, ITEMS_PER_PAGE)); // Initial data for the first page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(artworksData.length / ITEMS_PER_PAGE); // Calculate total pages
  const [openModal, setOpenModal] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);

  const handleProjectClick = (projectId) => {
    setOpenModal(projectId);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  const containerVariants = {
    hidden: { opacity: 0.2 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Adjust stagger delay for animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setTimeout(() => setIsAnimating(true), 100); // Adjust delay (100ms)
  }, []);

  const fetchPage = (pageNumber) => {
    setCurrentPage(pageNumber); // Update current page state
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setArtworks(artworksData.slice(startIndex, endIndex)); // Update artworks based on the page number

    // Smooth scroll to top
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-6" id="projects" ref={sectionRef}>
      <h2 className="text-center text-4xl font-bold text-black mt-4 mb-8 md:mb-12 pt-12">My Sculptures</h2>
      <AnimatePresence>
        <motion.ul
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-2"
          initial={isAnimating ? { opacity: 0 } : undefined} // Temporary state
          animate="visible"
          variants={containerVariants}
        >
          {artworks.map((artwork) => (
            <ArtworkItem key={artwork.id} artwork={artwork} handleProjectClick={handleProjectClick} itemVariants={itemVariants} />
          ))}
        </motion.ul>
      </AnimatePresence>

      {openModal && (
        <Modal
          imgUrl={artworks.find((artwork) => artwork.id === openModal).images[0].image}
          title={artworks.find((artwork) => artwork.id === openModal).title}
          description={artworks.find((artwork) => artwork.id === openModal).description}
          artwork={artworks.find(artwork => artwork.id === openModal)}
          onClose={closeModal}
        />
      )}

      {/* Pagination */}
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

const ArtworkItem = ({ artwork, handleProjectClick, itemVariants }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load only once
    threshold: 0.1, // Trigger when 10% of the item is in view
  });

  return (
    <motion.li ref={ref} variants={itemVariants} className="project-card relative overflow-hidden rounded-sm bg-gray-800 group">
      <div className="project-card__image h-full aspect-w-16 aspect-h-9 relative group">
        {inView && (
          <img
            src={artwork.images[0].image} // Use the correct image path
            alt={artwork.title}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 transform group-hover:scale-110"
            onClick={() => handleProjectClick(artwork.id)}
          />
        )}
        <div className="absolute inset-x-0 top-0 flex flex-col justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h5 className="text-white text-sm font-bold cursor-pointer" onClick={() => handleProjectClick(artwork.id)}>
            {artwork.title}
          </h5>
        </div>
      </div>
    </motion.li>
  );
};

export default ProjectsSection;
