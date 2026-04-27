import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const categories = ["ALL", "CONSTRUCTION", "ARCHITECTURE", "DESIGN & BUILD", "INDUSTRIAL ENGINEERING"];

const projectsData = [
  {
    id: 1,
    number: "01",
    title: "INNOVATIVE BRIDGE CONSTRUCTION.",
    description: "A showcase of modern engineering and smart design — delivering a strong, safe, and sustainable bridge built for the future.",
    tags: ["BRIDGE", "CONSTRUCTION", "2026"],
    category: "CONSTRUCTION",
    image: "/shivgroup/images/project/project-1.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "SHOPPING CENTERS & SHOWROOMS..",
    description: "We create modern, durable spaces that highlight brand identity and deliver a seamless shopping experience.",
    tags: ["INNOVATION", "MARKET", "2026"],
    category: "DESIGN & BUILD",
    image: "/shivgroup/images/project/project-2.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "INDUSTRIAL MANUFACTURING COMPLEX.",
    description: "Large-scale facility with advanced infrastructure designed for maximum operational efficiency and safety.",
    tags: ["INDUSTRIAL", "ENGINEERING", "2025"],
    category: "INDUSTRIAL ENGINEERING",
    image: "/shivgroup/images/project/project-3.jpg",
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects = activeCategory === "ALL"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">

      {/* Page Hero */}
      <section
        className="relative pb-20 md:pb-10"
        style={{
          backgroundImage: "url(' images/page_title_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '400px',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold pt-25 uppercase">
              Projects
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Top Header Section */}
      <section className="pt-10 md:pt-[100px] pb-10 md:pb-[80px] px-4 sm:px-6 md:px-12 lg:px-[100px]">
        <div className="w-full mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-[22px] sm:text-[30px] md:text-[44px] lg:text-[62px] font-[900] text-black leading-[1.1] max-w-[1920px] uppercase mb-8 md:mb-12"
          >
            EVERY PROJECT IS SHAPED BY COLLABORATION, INNOVATION, AND A DEEP UNDERSTANDING OF CLIENT GOALS.
          </motion.h1>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 md:gap-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[11px] md:text-[14px] font-bold tracking-widest transition-all duration-300 border ${activeCategory === cat
                    ? "bg-black border-black text-white"
                    : "bg-transparent border-[#ddd] text-black hover:border-black"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="w-full">
        <div className="w-full flex flex-col gap-0">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ zIndex: index + 1 }}
                className={`sticky top-0 flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} w-full min-h-screen lg:h-screen overflow-hidden relative shadow-[0_-20px_50px_rgba(0,0,0,0.3)]`}
              >
                {/* Content Block */}
                <div className="w-full lg:w-1/2 bg-[#111] p-6 sm:p-10 lg:p-[80px] xl:p-[100px] flex flex-col justify-center min-h-[50vh] lg:h-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5 md:mb-8">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/30 text-white text-[10px] md:text-[12px] font-bold tracking-widest uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-[24px] sm:text-[34px] md:text-[44px] lg:text-[56px] xl:text-[64px] font-black text-white leading-[1.1] mb-5 md:mb-8 uppercase">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="font-body text-white/70 text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed mb-8 md:mb-12 max-w-[550px]">
                    {project.description}
                  </p>

                  {/* Button */}
                  <div className="flex">
                    <Link
                      to="/project-details"
                      className="flex items-center gap-3 md:gap-6 px-5 md:px-10 py-3 md:py-5 rounded-full border border-white/30 text-white text-[11px] md:text-[14px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 group"
                    >
                      READ FULL CASE STUDY
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <FiArrowUpRight className="text-lg md:text-xl" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Image Block */}
                <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[250px] sm:min-h-[350px] lg:h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>

                {/* Floating Small Card - Positioned at bottom center of the whole project row */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end z-20 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Thumbnail (Black side part) */}
                  <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] hidden sm:block overflow-hidden"
                    style={{
                      clipPath: index % 2 === 0
                        ? "polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)" // Top-left cut
                        : "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" // Top-right cut
                    }}>
                    <img src={project.image} alt="thumb" className="w-full h-full object-cover" />
                  </div>
                  {/* Text Info (Image side part) */}
                  <div className="bg-white w-[120px] h-[120px] md:w-[180px] md:h-[180px] p-5 md:p-8 flex flex-col justify-center shadow-2xl relative"
                    style={{
                      clipPath: index % 2 === 0
                        ? "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" // Top-right cut
                        : "polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)" // Top-left cut
                    }}>
                    <span className="block font-heading text-[24px] md:text-[40px] font-black text-black leading-none mb-2 md:mb-4">
                      {project.number}
                    </span>
                    <span className="block font-heading text-[12px] md:text-[20px] font-extrabold text-black uppercase leading-tight tracking-tight">
                      {project.title}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};

export default Projects;
