import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ServicesSection = () => {
  const [servicesList, setServicesList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = servicesList[activeIndex];
  
  // Scroll animation logic for the title
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  // Map scroll progress to the percentage of text to be filled with white
  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  useEffect(() => {
    const fetchLatestService = async () => {
      try {
        const res = await api.get('get-latest-service');
        if (res?.data?.status && res?.data?.data) {
          // Putting it in an array to maintain the list structure of the component
          setServicesList([res.data.data]);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    fetchLatestService();
  }, []);

  return (
    <section 
      id="services" 
      ref={targetRef}
      className="services_section bg-[#161616] w-full py-[80px] px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-[1920px] mx-auto">
        {/* Title with Scroll-linked Fill Animation */}
        <div className="md:mb-14 relative">
          <div className="relative inline-block overflow-hidden">
            {/* Base layer (muted color) */}
            <h2 className="font-heading text-[54px] md:text-[82px] lg:text-[110px] text-white/10 font-bold tracking-tighter leading-[0.9] uppercase pb-10">
              SERVICES
            </h2>
            
            {/* Animated fill layer (white color) */}
            <motion.h2 
              style={{ width: fillWidth }}
              className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap font-heading text-[54px] md:text-[82px] lg:text-[110px] text-white font-bold tracking-tighter leading-[0.9] uppercase pb-10 border-r-2 border-primary/0"
            >
              SERVICES
            </motion.h2>
          </div>
        </div>

        {/* Main Grid Container with borders */}
        <div className="border border-white/20">
          {servicesList.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
              
              {/* Left Column: Services List */}
              <div className="lg:border-r border-white/20">
                {servicesList.map((service, index) => (
                  <button
                    key={service.id || index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left group flex items-center justify-between gap-4 px-6 md:px-10 py-6 md:py-8 lg:py-10 border-b border-white/20 last:border-b-0 transition-all duration-300 cursor-pointer ${
                      index === activeIndex ? 'bg-white/0' : ''
                    }`}
                  >
                    <h3
                      className={`font-heading text-[24px] md:text-[32px] lg:text-[42px] font-semibold tracking-[0.01em] leading-tight uppercase transition-colors duration-300 ${
                        index === activeIndex
                          ? 'text-white'
                          : 'text-[#8c8c8c] group-hover:text-white/80'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <img
                      src="/shivgroup/images/arrow-left-white.svg"
                      alt="arrow"
                      className={`w-[24px] h-[24px] md:w-[32px] md:h-[32px] transition-all duration-300 ${
                        index === activeIndex ? 'opacity-100' : 'opacity-30'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Right Column: Active Service Details */}
              {activeService && (
                <div className="flex flex-col md:flex-row min-h-[335px] services_section_right">
                  {/* Sub-services List & Read More */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between  md:border-b-0 md:border-r border-white/20">
                    <ul className="space-y-5">
                      {(activeService.subservices || []).map((sub, idx) => (
                        <li key={sub.id || idx} className="flex items-start gap-4 text-white text-[15px] md:text-[17px] font-medium">
                          <img 
                            src="/shivgroup/images/huf-circle-icon.svg" 
                            alt="icon" 
                            className="w-2 h-2 mt-3 shrink-0" 
                          />
                          {sub.description}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10">
                      <Link
                        to={`/services`}
                        className="inline-flex items-center gap-3 font-heading font-bold text-white uppercase text-base group"
                      >
                        READ MORE
                        <div className="w-10 h-10 rounded-full bg-[#AB2F2F] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <img
                            src="/shivgroup/images/arrow-left-white.svg"
                            alt="arrow"
                            className="w-5 h-5 -rotate-[45deg]"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Service Featured Image */}
                  <div className="flex-1 aspect-square md:aspect-auto overflow-hidden service_feture_img">
                    <motion.img
                      key={activeService.service_image}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      src={activeService.service_image}
                      alt={activeService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-20 text-center text-white/40 font-body">
              No services found.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center view_all_btn">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-16 py-3 md:py-4 rounded-full border border-white text-white font-heading font-bold uppercase tracking-[0.1em] text-base md:text-lg transition-all duration-300  group"
          >
            VIEW MORE SERVICES
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img
                src="/shivgroup/images/arrow-left.svg"
                alt="arrow"
                className="w-4 h-4 invert -scale-x-100 -rotate-[45deg]"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
