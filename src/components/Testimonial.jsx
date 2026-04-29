import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Testimonial = ({ className = "" }) => {
  const scrollContainerRef = useRef(null);

  /**
   * SCROLL-PIN ANIMATION MECHANICS:
   * - The outer <section> is h-[300vh] tall → creates 2 viewport heights of "scroll room"
   * - The inner div is `sticky top-0 h-screen` → stays pinned while you scroll through the 300vh
   * - scrollYProgress: 0 = section top just hit viewport top, 1 = section bottom hits viewport bottom
   * - All animations are driven by this single progress value
   */
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // ─── Animation Transforms ────────────────────────────────────────────────

  // Brush scale: Using intermediate steps to prevent the "jerk" at the end.
  // Linear scale animations feel like they explode at the end. 
  // By stepping the scale [1, 2, 5, 12, 30], the visual zoom feels perfectly smooth and constant.
  const brushScale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    [1, 2, 5, 12, 30]
  );

  // Scroll indicator: flashes at the start, disappears quickly
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1, 0]
  );

  return (
    /**
     * Outer section: tall enough to hold the scroll animation.
     * bg-white ensures the area outside the brush mask is always clean white.
     */
    <section
      ref={scrollContainerRef}
      className={`relative w-full h-[400vh] bg-white ${className}`}
    >
      {/**
       * Sticky viewport: always fills the screen while parent is scrolled.
       * bg-white here prevents any transparent bleed from behind.
       */}
      <div className="sticky top-0 w-full h-screen bg-white flex flex-col items-center justify-center overflow-hidden">

        {/* ── Layer 1: Brush-masked red div that zooms outward ── */}
        <motion.div
          className="absolute inset-0 bg-primary transform-gpu origin-center"
          style={{
            // Brush/paint stroke shape as mask
            maskImage: `url('/shivgroup/images/bg-shape.png')`,
            WebkitMaskImage: `url('/shivgroup/images/bg-shape.png')`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            // Driven by scroll
            scale: brushScale,
            zIndex: 1,
          }}
        />

        {/* ── Layer 2 (top): Text content — static, revealed by background zoom ── */}
        <div
          className="w-full max-w-[1115px] relative shrink-0 z-[1] flex flex-col items-center text-center text-[#fff] font-heading mt-[-5vh] px-6"
        >
          {/* Quote Mark */}
          <span
            className="text-[150px] max-[925px]:text-[100px] max-[450px]:text-[80px] leading-none opacity-80 mb-4 h-[100px] font-sans"
          >
            "
          </span>

          {/* Quote Texts */}
          <h1
            className="m-0 uppercase z-[1] max-[450px]:text-[33px] max-[925px]:text-[44px] text-[55px] tracking-wide"
            style={{ fontWeight: "700" }}
          >
            <span className="block">“Storytelling is a design skill. We make</span>
            <span className="block">buildings that are onion-layered, authentic</span>
            <span className="block">and biographical”.</span>
          </h1>

          {/* Signature */}
          <div className="flex items-center justify-center flex-col z-[1] mt-[50px] w-full text-3xl font-body text-white">
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
          </div>
        </div>

        {/* ── Scroll indicator (appears briefly at start) ── */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2 z-[2]"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest font-body opacity-80">
            Scroll Down
          </span>
          <div className="w-[1px] h-10 md:h-16 bg-white/20 relative overflow-hidden">
            <motion.div
              className="w-full h-1/2 bg-white absolute top-0"
              animate={{ top: ["-50%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonial;
