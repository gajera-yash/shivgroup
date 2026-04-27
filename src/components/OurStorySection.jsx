import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const stories = [
  {
    year: '1978',
    description:
      'In 1978, Brickox started as a small suburban workshop focused on quality-first builds and dependable craftsmanship. This early phase built the company\'s foundation of trust and precision.',
    images: ['/shivgroup/images/project/project-1.jpg', '/shivgroup/images/project/project-2.jpg', '/shivgroup/images/project/project-3.jpg'],
  },
  {
    year: '1985',
    description:
      'By 1985, Brickox had outgrown its original suburban workshop. Rising demand led to a move into a larger Chicago facility, allowing the company to scale operations and take on more ambitious projects. Brickox implemented formal systems and secured its first multi-building projects, proving its ability to manage complex builds.',
    images: ['/shivgroup/images/project/project-2.jpg', '/shivgroup/images/project/project-3.jpg', '/shivgroup/images/project/project-1.jpg'],
  },
  {
    year: '1992',
    description:
      'By 1992, Brickox strengthened its regional reputation through long-term client partnerships, trusted supplier networks, and in-house training systems. The hands-on, forward-thinking culture became the backbone of sustained growth.',
    images: ['/shivgroup/images/project/project-3.jpg', '/shivgroup/images/project/project-1.jpg', '/shivgroup/images/project/project-2.jpg'],
  },
];

const OurStorySection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [direction, setDirection] = useState(1);
  const storyParam = Number(searchParams.get('story'));
  const safeIndex = Number.isInteger(storyParam) && storyParam >= 0 && storyParam < stories.length ? storyParam : 0;
  const activeStory = stories[safeIndex];

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

  const updateStoryInHistory = (nextIndex) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('story', String(nextIndex));
    setSearchParams(updatedParams);
  };

  const handlePrevious = () => {
    setDirection(-1);
    const prevIndex = safeIndex === 0 ? stories.length - 1 : safeIndex - 1;
    updateStoryInHistory(prevIndex);
  };

  const handleNext = () => {
    setDirection(1);
    const nextIndex = safeIndex === stories.length - 1 ? 0 : safeIndex + 1;
    updateStoryInHistory(nextIndex);
  };

  return (
    <section className="w-full bg-[#eeefe6] py-12 md:py-16 lg:py-[80px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-12">
        <h2 className="font-heading text-[28px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-none font-bold uppercase text-black">
          Our Story
        </h2>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`gallery-${safeIndex}`}
            className="mt-8 md:mt-10 flex gap-4 md:gap-[30px] overflow-x-auto pb-2"
            variants={imageVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[160px] sm:h-[220px] lg:h-[279px] min-w-[180px] sm:min-w-[260px] lg:w-[500px] text-center overflow-hidden flex-shrink-0">
              <div className="absolute h-[100%] w-[100%] bg-primary text-center" />
              <motion.p
                key={`year-${activeStory.year}`}
                className="absolute inset-0 flex items-center justify-center font-heading text-[60px] sm:text-[96px] leading-[1.1] text-center font-bold text-white lg:text-[220px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeStory.year}
              </motion.p>
            </div>

            <img
              className="h-[220px] sm:h-[320px] lg:h-[547px] min-w-[160px] sm:w-[220px] md:w-[300px] lg:w-[353px] object-cover flex-shrink-0"
              loading="lazy"
              alt="Our story image one"
              src={activeStory.images[0]}
            />

            <img
              className="h-[220px] sm:h-[320px] lg:h-[389px] min-w-[160px] sm:w-[220px] md:w-[300px] lg:w-[353px] object-cover flex-shrink-0"
              loading="lazy"
              alt="Our story image two"
              src={activeStory.images[1]}
            />

            <img
              className="h-[220px] sm:h-[320px] lg:h-[547px] min-w-[160px] sm:w-[220px] md:w-[300px] lg:w-[353px] object-cover flex-shrink-0"
              loading="lazy"
              alt="Our story image three"
              src={activeStory.images[2]}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col lg:flex-row lg:justify-start lg:gap-10">
          <div className="max-w-[1100px] overflow-hidden order-1 lg:order-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={`desc-${safeIndex}`}
                className="text-[18px] leading-[1.75] font-medium text-[#615a5a] lg:text-[22px] lg:leading-[38px]"
                variants={textVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeStory.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-end gap-3 lg:pt-[310px] order-2 lg:order-1 mt-6 lg:mt-0">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous"
              className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[#151515] transition hover:bg-[#f8f8f8]"
            >
              <FiArrowLeft className="text-[24px]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next"
              className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white text-[#151515] transition hover:bg-[#f8f8f8]"
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
