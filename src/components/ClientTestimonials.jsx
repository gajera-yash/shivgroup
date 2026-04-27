import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const testimonials = [
  {
    text: "The Brickox team brought life and clarity into our space. Their attention to detail and understanding of how we use each room made the whole environment feel intentional and deeply personal.",
    name: "Olivia Morgan",
    role: "Homeowner",
    avatar: "/shivgroup/images/hero section.webp",
    image: "/shivgroup/images/img01.png"
  },
  {
    text: "Working with Shiv Group was an incredible experience. From the initial architecture plans down to the smallest finishing touches, everything was executed natively perfectly and exactly on schedule.",
    name: "Alexander Reed",
    role: "Property Investor",
    avatar: "/shivgroup/images/img04.jpg",
    image: "/shivgroup/images/hero section.webp"
  }
];

const ClientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll animation logic for the title
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={targetRef}
      className="w-full bg-white pt-0 pb-10 md:pb-[130px] px-4 sm:px-6 md:px-12 lg:px-[135px] box-border max-w-[1920px] mx-auto text-left text-[#000] font-heading"
    >  
      <div className="flex flex-col items-start gap-[30px] max-w-full w-full">
        
        {/* Main Heading with Scroll-linked Fill Animation */}
        <div className="flex w-full justify-between items-end mb-2">
          <div className="relative inline-block overflow-hidden max-w-full">
            {/* Base layer (muted color) */}
            <h2 className="m-0 font-heading uppercase text-4xl sm:text-4xl md:text-[60px] lg:text-[70px] font-bold tracking-tight text-black/10">
              What our Clients Say
            </h2>
            
            {/* Animated fill layer (dark color) */}
            <motion.h2 
              style={{ width: fillWidth }}
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap m-0 font-heading uppercase text-4xl sm:text-4xl md:text-[60px] lg:text-[70px] font-bold tracking-tight text-black"
            >
              What our Clients Say
            </motion.h2>
          </div>
        </div>

        
        {/* EXACT 12-COLUMN CSS GRID Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 md:gap-[30px] items-stretch w-full text-[#fff] font-body">
          
          {/* Left Red Panel (9 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-9 w-full rounded-[20px] bg-primary flex flex-col justify-between pt-[40px] xl:pt-[30px]  relative overflow-hidden h-auto"
          >
            {/* Testimonial Quote */}
            <div className="flex items-start px-[30px] xl:px-[80px]  xl:pb-[100px]  xl:pr-[160px] relative z-10 w-full mb-[40px] xl:mb-[60px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="m-0 text-[18px] md:text-[24px] xl:text-[24px] font-body font-semibold leading-relaxed w-full tracking-wide "
                >
                  "{testimonials[currentIndex].text}"
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Bottom Section Layout */}
            <section className="mt-auto flex items-end justify-between w-full relative z-10">
              
              <div className="flex items-end max-w-full">
                
                {/* Vector Shape Bottom Left Corner Overlay & Arrows Component */}
                <div className="relative h-[100px] xl:h-[150px] w-[180px] xl:w-[250px] flex-shrink-0">
                  <img
                    className="absolute bottom-[-25px] left-[-2px] h-full w-full object-fill z-[0]"
                    alt="Decorative Vector Shape"
                    src="/shivgroup/images/Vector.svg"
                  />
                  {/* Arrows positioned ON the white SVG background cut-out footprint */}
                  <div className="absolute bottom-[15px] xl:bottom-[30px] left-[25px] xl:left-[65px] flex items-center gap-[20px] xl:gap-[40px] z-[10]">
                    <button 
                      onClick={prevSlide}
                      className="cursor-pointer hover:-translate-x-1 transition-transform duration-300"
                    >
                      <img src="/shivgroup/images/next_arrow.svg" alt="Previous" className="w-[35px] xl:w-[40px] h-auto object-contain rotate-180 filter brightness-0" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="cursor-pointer hover:translate-x-1 transition-transform duration-300" 
                    >
                      <img src="/shivgroup/images/next_arrow.svg" alt="Next" className="w-[35px] xl:w-[40px] h-auto object-contain filter brightness-0" />
                    </button>
                  </div>
                </div>

                {/* Profile Box placed right alongside the cutout */}
                <div className="flex items-center gap-4 md:gap-6 pb-4 md:pb-[20px] pl-2 md:pl-[20px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] relative rounded-[50%] object-cover z-[1] border-[3px] border-white/20 shadow-md"
                      loading="lazy"
                      alt={testimonials[currentIndex].name}
                      src={testimonials[currentIndex].avatar}
                    />
                  </AnimatePresence>
                  
                  <div className="flex flex-col items-start gap-1">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={"name-" + currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className=" text-[20px] xl:text-[24px] font-body font-bold"
                      >
                        {testimonials[currentIndex].name}
                      </motion.div>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={"role-" + currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[14px] xl:text-[16px] font-body opacity-90 "
                      >
                        {testimonials[currentIndex].role}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Massive Bold Quote Icon pinned to bottom right inside red panel */}
              <div className="hidden xl:flex pb-[40px] pr-[60px] opacity-[0.8] z-10">
                 <svg width="64" height="64" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M4.017 21L4.017 18C4.017 16.8954 4.91243 16 6.017 16H9.017C9.56928 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56928 8 9.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                 </svg>
              </div>

            </section>
          </motion.div>
          
          {/* Right Image Container (3 Columns) - NOW STATIC */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-3 w-full rounded-[20px] overflow-hidden min-h-[400px] xl:min-h-0  z-0 relative"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              alt="Project View"
              src="/shivgroup/images/company.jpg"
            />
          </motion.div>
        
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
