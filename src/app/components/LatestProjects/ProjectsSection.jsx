"use client";
import Modal from "./Modal";
import React, { useState } from "react";


const projectsData = [
  {
    id: 1,
    title: "Holy Grail of the Median Empire",
    description: "Projfdsgfsgdfgs",
    image: "/images/projects/1.jpg",
  },
  {
    id: 2,
    title: "Acbatana Royal Cup",
    description: "fsgfsgfsdfsgfdsgf",
    image: "/images/projects/2.jpg",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Project 3 description",
    image: "/images/projects/3.jpg",
  },
  {
    id: 4,
    title: "Project 4",
    description: "Project 4 description",
    image: "/images/projects/4.jpg",
  },
  {
    id: 5,
    title: "Holy Grail of the Temple of Abi in Urkish",
    description: "Profdsgfsg",
    image: "/images/projects/5.jpg",
  },

];

const ProjectsSection = () => {
  const [openModal, setOpenModal] = useState(null);

  const handleProjectClick = (projectId) => {
    setOpenModal(projectId);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Latest Projects
      </h2>
      
      <ul className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-4">
        {projectsData.map((project) => (
          <li key={project.id}>
            <div className="project-card relative overflow-hidden rounded-lg bg-gray-800 group">
              <div className="project-card__image h-full aspect-w-16 aspect-h-9 relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                />
                
                <div className="absolute inset-x-0 top-0 flex flex-col justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h5 className="text-white text-xl font-semibold cursor-pointer" onClick={() => handleProjectClick(project.id)}>
                    {project.title}
                  </h5>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {openModal && (
        <Modal
          imgUrl={projectsData[openModal - 1].image}
          title={projectsData[openModal - 1].title}
          description={projectsData[openModal - 1].description}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
