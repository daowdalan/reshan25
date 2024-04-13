"use client";
import React, { useState, useRef } from "react";
import Modal from "../LatestProjects/Modal";



const projectsData = [
  {
    id: 1,
    title: "Holy Grail of the Median Empire",
    description: "assssssssssss",
    image: "/images/projects/1.jpg",
    tag: ["All", "Sculptures"],
  },
  {
    id: 2,
    title: "Acbatana Royal Cup",
    description: "Project 2 ddsafdaf",
    image: "/images/projects/2.jpg",
    tag: ["All", "Sculptures"],
  },
  {
    id: 3,
    title: "Project 3",
    description: "dsfa 3 dafdsafdsaf",
    image: "/images/projects/3.jpg",
    tag: ["All", "Sculptures", "Paints"],
  },
  {
    id: 4,
    title: "Project 4",
    description: "dsafsa 4 description",
    image: "/images/projects/4.jpg",
    tag: ["All", "Paints"],
  },
  {
    id: 5,
    title: "Holy Grail of the Temple of Abi in Urkish",
    description: "dafdaf 5 description",
    image: "/images/projects/5.jpg",
    tag: ["All", "Paints"],
  },
  {
    id: 6,
    title: "Project 6",
    description: "dafdsaf 6 description",
    image: "/images/projects/6.jpg",
    tag: ["All", "Paints"],
  },

  {
  id: 7,
    title: "Project 7",
    description: "adaf 7 description",
    image: "/images/projects/7.jpg",
    tag: ["All", "Paints"],
  },

  {
  id: 8,
    title: "Project 8",
    description: "dsffvvv 8 description",
    image: "/images/projects/8.jpg",
    tag: ["All", "Paints"],
  },

  {
  id: 9,
    title: "Project 9",
    description: "xxxx 9 description",
    image: "/images/projects/9.jpg",
    tag: ["All", "Paints"],
  },
];


const ProjectsSection = () => {
  const [openModal, setOpenModal] = useState(null);
  const [tag, setTag] = useState("All");
  const ref = useRef(null);

  const handleProjectClick = (projectId) => {
    setOpenModal(projectId);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>


      
      
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        {["All", "Sculptures", "Paints"].map((tagName) => (
          <button
            key={tagName}
            onClick={() => handleTagChange(tagName)}
            className={`rounded-full border-2 px-6 py-3 text-xl cursor-pointer ${tag === tagName ? "text-white border-primary-500" : "text-[#ADB7BE] border-slate-600 hover:border-white"}`}
          >
            {tagName}
          </button>
        ))}
      </div>


      
      <ul ref={ref} className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-4 ">
        {filteredProjects.map((project, index) => (
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