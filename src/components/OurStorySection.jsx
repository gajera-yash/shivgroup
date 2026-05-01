import { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../utils/api';

const OurStorySection = () => {
  const [milestonesList, setMilestonesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeStoryData, setActiveStoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [direction, setDirection] = useState(1);

  // Fetch all years
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await api.get('all-about-us-year');
        if (res?.data?.status && res.data.data.length > 0) {
          setMilestonesList(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch milestones:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMilestones();
  }, []);

  // Fetch details for active year
  useEffect(() => {
    if (milestonesList.length > 0) {
      const fetchDetail = async () => {
        setDetailLoading(true);
        try {
          const res = await api.get(`get-about-us-data-by-id/${milestonesList[currentIndex].id}`);
          if (res?.data?.status) {
            setActiveStoryData(res.data.data);
          }
        } catch (err) {
          console.error('Failed to fetch story details:', err);
        } finally {
          setDetailLoading(false);
        }
      };
      fetchDetail();
    }
  }, [currentIndex, milestonesList]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? milestonesList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === milestonesList.length - 1 ? 0 : prev + 1));
  };

  const imageVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, scale: 0.98 }),
  };

  const textVariants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
  };

  if (loading || (!activeStoryData && detailLoading)) {
    return (
      <section className="w-full bg-[#eeefe6] py-20 flex items-center justify-center">
        <div className="text-xl font-heading text-gray-400 italic">Exploring our legacy...</div>
      </section>
    );
  }

  if (milestonesList.length === 0) return null;

  return (
    <section className="w-full bg-[#eeefe6] py-12 md:py-16 lg:py-[80px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-12">
        <h2 className="font-heading text-[28px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-none font-bold uppercase text-black">
          Our Story
        </h2>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`gallery-${milestonesList[currentIndex].id}`}
            className="mt-8 md:mt-10 flex gap-4 md:gap-[30px] overflow-x-auto pb-2 hide-scrollbar"
            variants={imageVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Year Box */}
            <div className="relative h-[160px] sm:h-[220px] lg:h-[279px] min-w-[180px] sm:min-w-[260px] lg:w-[500px] text-center overflow-hidden flex-shrink-0">
              <div className="absolute h-[100%] w-[100%] bg-primary text-center" />
              <p className="absolute inset-0 flex items-center justify-center font-heading text-[60px] sm:text-[96px] leading-[1.1] text-center font-bold text-white lg:text-[220px]">
                {activeStoryData?.year}
              </p>
            </div>

            {/* Images */}
            {(activeStoryData?.about_us_images || []).map((img, idx) => (
              <img
                key={img.id || idx}
                className={`min-w-[160px] sm:w-[220px] md:w-[300px] lg:w-[353px] object-cover flex-shrink-0 ${
                    idx === 1 ? 'h-[220px] sm:h-[320px] lg:h-[389px]' : 'h-[220px] sm:h-[320px] lg:h-[547px]'
                }`}
                loading="lazy"
                alt={`Our story ${idx}`}
                src={img.about_image}
              />
            ))}
            
            {/* Fallback placeholders if less than 3 images */}
            {activeStoryData?.about_us_images?.length < 3 && [...Array(3 - activeStoryData.about_us_images.length)].map((_, i) => (
                 <div key={`fallback-${i}`} className="min-w-[160px] sm:w-[220px] md:w-[300px] lg:w-[353px] h-[220px] sm:h-[320px] lg:h-[547px] bg-white/20 flex-shrink-0" />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col lg:flex-row lg:justify-start lg:gap-10">
          <div className="max-w-[1100px] overflow-hidden order-1 lg:order-2 min-h-[150px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={`desc-${milestonesList[currentIndex].id}`}
                className="text-[18px] leading-[1.75] font-medium text-[#615a5a] lg:text-[22px] lg:leading-[38px] whitespace-pre-line"
                variants={textVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeStoryData?.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-end gap-3 lg:pt-[310px] order-2 lg:order-1 mt-6 lg:mt-0">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={detailLoading}
              aria-label="Previous"
              className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[#151515] transition hover:bg-[#f8f8f8] disabled:opacity-50"
            >
              <FiArrowLeft className="text-[24px]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={detailLoading}
              aria-label="Next"
              className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[#151515] transition hover:bg-[#f8f8f8] disabled:opacity-50"
            >
              <FiArrowRight className="text-[24px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
