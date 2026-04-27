import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Testimonial = ({ className = "" }) => {
  const scrollContainerRef = useRef(null);

  // Track the scroll progress while the section is pinned
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Add smooth spring physics to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40, // Even lower stiffness for a slower, floaty response
    damping: 25, // Higher friction to prevent rapid zooming
    restDelta: 0.001
  });

  // Zoom the brush background continuously. Reaches full screen slowly due to the longer scroll track.
  const scaleParallax = useTransform(smoothProgress, [0, 1], [1, 12]);
  // Fade out the brush slightly at the very end to smoothly transition to the next block? 
  // Let's keep it solid instead to serve as a pure red transition.
  
  // Staggered Text Animation Variants
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // 200ms between lines
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={scrollContainerRef}
      className={`relative w-full h-[400vh] ${className}`}
    >
      {/* Sticky Container - locks the view in place once its top hits viewport top */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-[21px]">
        
        {/* Background Zoom Layer */}
        <motion.div
          className="absolute inset-0 bg-primary z-[0] transform-gpu origin-center"
          style={{
            maskImage: `url('/shivgroup/images/bg-shape.png')`,
            WebkitMaskImage: `url('/shivgroup/images/bg-shape.png')`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            scale: scaleParallax,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "100px", once: true }} /* Trigger early as it scrolls in */
          transition={{ duration: 0.8, ease: "easeOut" }}
        ></motion.div>

        {/* Inner Content wrapper: z-[1] ensures it sits above the zoomed background */}
        <motion.div
          className="w-full max-w-[1115px] relative shrink-0 z-[1] flex flex-col items-center text-center text-[#fff] font-heading mt-[-5vh]"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "0px", once: true }} // Trigger when text is visible
        >
          {/* Quote Mark */}
          <motion.span
            variants={lineVariants}
            className="text-[150px] max-[925px]:text-[100px] max-[450px]:text-[80px] leading-none opacity-80 mb-4 h-[100px]"
          >
            "
          </motion.span>

          {/* Quote Texts */}
          <h1
            className="m-0 uppercase z-[1] max-[450px]:text-[33px] max-[925px]:text-[44px] text-[55px] tracking-wide"
            style={{ fontWeight: "700" }}
          >
            <motion.span className="block" variants={lineVariants}>
              “Storytelling is a design skill. We make
            </motion.span>
            <motion.span className="block" variants={lineVariants}>
              buildings that are onion-layered, authentic
            </motion.span>
            <motion.span className="block" variants={lineVariants}>
              and biographical”.
            </motion.span>
          </h1>
        </motion.div>

        {/* Signature */}
        <motion.div
          className="flex items-center justify-center flex-col z-[1] mt-[50px] w-full text-3xl font-body text-white"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ margin: "0px", once: true }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-2.5">
            <div className="flex justify-center items-start">
              <img
                className="w-[173px] relative max-h-full object-contain invert z-[1]"
                loading="lazy"
                alt="Shiv Group CEO Signature"
                src="/shivgroup/images/signager.png"
              />
            </div>
            <h2
              className="m-0 relative uppercase z-[1] text-[24px] max-[450px]:text-lg max-[925px]:text-2xl font-body"
              style={{ fontWeight: "700" }}
            >
              CEO Shiv Group
            </h2>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2 z-[2]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest font-body opacity-80">Scroll Down</span>
          <div className="w-[1px] h-10 md:h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-white absolute top-0"
              animate={{ top: ['-50%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonial;
