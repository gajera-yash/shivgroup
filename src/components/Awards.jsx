import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const awards = [
  // Added images to each award to show during the custom cursor hover effect
  { title: 'Design Architectural Award', year: '2025', image: '/shivgroup/images/brand-logo01.png' },
  { title: 'Design Distinction Award', year: '2023', image: '/shivgroup/images/brand-logo02.png' },
];

const Awards = () => {
  const [hoveredAwardIndex, setHoveredAwardIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll animation logic for the title
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  useEffect(() => {
    // Window mousemove track is safest for smooth fixed cursor following
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <section 
      id="awards" 
      ref={targetRef}
      className="bg-[#EEEFE6] w-full py-20 px-4 md:px-8 lg:px-12" 
      style={{ paddingTop: '100px', paddingBottom: '100px'}}
    >
      
      {/* Floating Hover Cursor Image Setup */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] w-[120px] sm:w-[160px] aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-2xl border border-white/20"
        animate={{
          x: mousePosition.x + 20, // Offset horizontally so it's slightly to the right of the cursor
          y: mousePosition.y + 20, // Offset vertically so it's slightly below the cursor
          opacity: hoveredAwardIndex !== null ? 1 : 0,
          scale: hoveredAwardIndex !== null ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        {awards.map((award, index) => (
          <img
            key={index}
            src={award.image}
            alt={award.title}
            className={`absolute w-full h-full object-contain p-2 transition-opacity duration-300 ${
              hoveredAwardIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </motion.div>

      <div className="max-w-[1920px] mx-auto">
        
        {/* Title Section */}
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 lg:gap-20"
          style={{ marginBottom: '50px' }}
        >
          <div className="relative inline-block overflow-hidden">
            {/* Base layer (muted color) */}
            <h2 className="font-heading text-[50px] md:text-[50px] lg:text-[70px] leading-none text-[#0A0A0A]/10 font-bold uppercase tracking-tight m-0">
              AWARDS
            </h2>
            
            {/* Animated fill layer (dark color) */}
            <motion.h2 
              style={{ width: fillWidth }}
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap font-heading text-[50px] md:text-[50px] lg:text-[70px] leading-none text-[#0A0A0A] font-bold uppercase tracking-tight m-0"
            >
              AWARDS
            </motion.h2>
          </div>


          {/* Description text - Font size significantly increased. Max width expanded to allow proper wrapping. */}
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-xl sm:text-1xl lg:text-xl font-semibold text-[#111111] max-w-xl text-left leading-relaxed m-0"
          >
            Our work is recognized for excellence, innovation, and design, reflecting our commitment to creating.
          </motion.p>
        </div>

        {/* Content: 12 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Image (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 min-h-[300px] lg:min-h-[100%] overflow-hidden rounded-xl"
          >
            <img 
              src="/shivgroup/images/Awards.png" 
              alt="Shiv Group Awards" 
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* Right Column: Awards List (8 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 bg-white rounded-xl p-6 md:p-10 flex flex-col justify-center relative"
          >
            {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className={`flex justify-between items-center py-6 md:py-10 ${
                    index !== awards.length - 1 ? 'border-b border-[#F0F0F0]' : ''
                  } group cursor-pointer`} 
                  onMouseEnter={() => setHoveredAwardIndex(index)}
                  onMouseLeave={() => setHoveredAwardIndex(null)}
                >
                  <div className="font-body font-bold text-[#111111] text-xl sm:text-2xl md:text-3xl lg:text-4xl group-hover:text-primary transition-colors m-0 duration-300">
                    {award.title}
                  </div>
                  <div className="font-heading text-[#0A0A0A] font-bold text-2xl sm:text-4xl lg:text-[50px] leading-none group-hover:text-primary transition-colors m-0 duration-300">
                    {award.year}
                  </div>
                </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Awards;
