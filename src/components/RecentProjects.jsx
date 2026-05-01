import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const RecentProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Scroll animation logic for the title
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const res = await api.get('categories-with-latest-project');
        if (res.data?.status) {
          // Filter out categories that have no projects
          const validCategories = (res.data.data || []).filter(cat => cat.latest_project);
          setCategories(validCategories);
        }
      } catch (err) {
        console.error('Failed to fetch recent projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentProjects();
  }, []);

  // Autoplay for the slider
  useEffect(() => {
    if (categories.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories]);

  if (loading) {
    return <div className="h-[500px] flex items-center justify-center font-heading text-2xl text-dark/20 animate-pulse">LOADING RECENT PROJECTS...</div>;
  }

  if (categories.length === 0) {
    return null;
  }

  const currentCategory = categories[activeIndex];
  const currentProject = currentCategory.latest_project;

  return (
    <section 
      id="projects" 
      ref={targetRef}
      className="bg-white w-full recent_projects"
    >
      <div className="max-w-[1920px] mx-auto">
        
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-8 px-4 md:px-8 lg:px-12 section_header">
          <div className="relative inline-block overflow-hidden">
            {/* Base layer (muted color) */}
            <h2 className="font-heading text-[54px] md:text-[82px] lg:text-[110px] text-dark/10 font-bold tracking-tighter leading-[0.9] uppercase">
              RECENT PROJECTS
            </h2>
            
            {/* Animated fill layer (dark color) */}
            <motion.h2 
              style={{ width: fillWidth }}
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap font-heading text-[54px] md:text-[82px] lg:text-[110px] text-dark font-bold tracking-tighter leading-[0.9] uppercase"
            >
              RECENT PROJECTS
            </motion.h2>
          </div>
        </div>

        {/* Project Showcase Area */}
        <div className="relative w-full aspect-[21/9] min-h-[500px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img 
                src={currentProject.project_image} 
                alt={currentProject.title} 
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Top Right Navigation Tabs */}
          <div className="absolute top-8 right-8 z-10 hidden md:block">
            <div className="bg-[#5A7F99] backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 flex items-center project_tabs overflow-x-auto max-w-full">
              {categories.map((category, index) => (
                <button
                  key={category.hash}
                  onClick={() => setActiveIndex(index)}
                  className={`px-6 py-2 font-body text-sm font-medium transition-all duration-600 relative whitespace-nowrap ${
                    index === activeIndex 
                      ? 'text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{category.category_name}</span>
                  {index === activeIndex && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                    />
                  )}
                  {index < categories.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/20" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Left Project Info */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-10 left-8 md:left-12 flex flex-col gap-6 z-10"
            >
              <h3 className="font-heading text-white text-[42px] md:text-[62px] lg:text-[84px] font-bold uppercase tracking-tight leading-[0.9]">
                {currentProject.title}
              </h3>

              <div className="flex flex-wrap gap-4 button_group">
                <Link
                  to={`/project-details/${currentProject.hash_id}`}
                  className="bg-[#AB2F2F] text-white flex items-center gap-2 pl-1 pr-8 py-1 rounded-full font-heading font-bold uppercase tracking-wider text-base transition-all duration-300 hover:bg-[#8B2424] group shadow-xl"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                    <img
                      src="/shivgroup/images/arrow-left-primary.svg"
                      alt="arrow"
                      className="w-6 h-6 rotate-[5deg] invert-0"
                    />
                  </div>
                  VIEW DETAILS
                </Link>

                <Link
                  to="/projects"
                  className="bg-white text-dark flex items-center gap-2 pl-1 pr-8 py-1 rounded-full font-heading font-bold uppercase tracking-wider text-base transition-all duration-300 hover:bg-gray-100 group shadow-xl"
                >
                  <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                    <img
                      src="/shivgroup/images/arrow-left-white.svg"
                      alt="arrow"
                      className="w-4 h-4 rotate-[-45deg]"
                    />
                  </div>
                  VIEW ALL PROJECTS
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default RecentProjects;
