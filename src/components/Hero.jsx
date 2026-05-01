import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Hero = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchLatestBanner = async () => {
      try {
        const res = await api.get('latest-banner');
        if (res?.data?.status && res?.data?.data) {
          setBanner(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch latest banner:', err);
      }
    };
    fetchLatestBanner();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, scaleX: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
    },
  };

  return (
    <section
      id="home"
      className="relative w-full h-[calc(100vh-80px)] min-h-[500px] max-h-[950px] overflow-hidden"
    >
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        key={banner?.id || 'default'}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={banner?.banner_image || "/shivgroup/images/hero section.webp"}
          alt={banner?.title || "Construction site excavator"}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Modern Overlay */}
      <div className="absolute inset-0 z-10 bg-[#0f1c26]/60" />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 border border-white/20"
        />

        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="absolute left-[78%] top-0 h-full w-[1px] bg-white/15 origin-top"
        />
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="absolute left-[93%] top-0 h-full w-[1px] bg-white/15 origin-top"
        />

        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="absolute left-0 top-[55%] h-[1px] w-full bg-white/15 origin-left"
        />
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="absolute left-0 bottom-[10%] h-[1px] w-full bg-white/15 origin-left"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 mx-auto h-full w-full max-w-[1920px] px-8 lg:px-[135px]"
      >
        {/* Top Floating Text */}
        <motion.p
          key={banner?.id ? `desc-${banner.id}` : 'default-desc'}
          variants={itemVariants}
          className="absolute left-8 lg:left-[135px] top-[10%] max-w-[280px] font-body text-[14px] md:text-[16px] font-bold uppercase leading-relaxed tracking-[0.1em] text-white whitespace-pre-line"
        >
          {banner?.description || "FROM CONCEPT TO COMPLETION \n WE BUILD IT RIGHT"}
        </motion.p>

        {/* Main Header Reveal */}
        <div className="absolute bottom-[260px] sm:bottom-[9%] left-4 sm:left-8 lg:left-[135px]">
          <motion.h1
            key={banner?.id ? `title-${banner.id}` : 'default-title'}
            variants={itemVariants}
            className="font-heading text-[42px] sm:text-[60px] md:text-[90px] lg:text-[120px] xl:text-[140px] font-bold uppercase tracking-tight text-white leading-[1] whitespace-pre-line"
          >
            {banner?.title || "We Build \n The Future"}
          </motion.h1>
        </div>

        {/* Side Info Box - Slides in from right */}
        <motion.aside
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 50 }}
          className="absolute bottom-[20px] sm:bottom-[10%] left-4 sm:left-auto sm:right-8 lg:right-[135px] w-[calc(100%-32px)] sm:w-[260px] md:w-[320px] bg-primary group px-4 block"
        >
          <div className="py-6 md:py-8 md:p-10 text-white">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="font-heading font-bold text-[60px] sm:text-[80px] md:text-[100px] leading-none mb-3 md:mb-4"
            >
              20+
            </motion.div>
            <p className="font-body font-bold text-[12px] md:text-[16px] uppercase leading-tight tracking-wider opacity-90">
              Leading Years In <br /> Construction Excellence
            </p>
          </div>

          <a
            href="shivgroup/contact"
            className="flex h-[50px] md:h-[60px] mb-4 items-center border border-white/80 hover:bg-white text-white hover:text-primary transition-all duration-300 px-6 md:px-8 group/btn"
          >
            <span className="flex-1 text-[11px] md:text-[13px] font-bold uppercase tracking-widest">Get In Touch</span>
            <span className="text-xl md:text-2xl transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
          </a>
        </motion.aside>

        {/* Subtle Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute right-[135px] top-[10%] hidden xl:block"
        >
          <div className="flex items-center gap-6 text-white/40 font-body text-[12px] font-bold uppercase tracking-[0.2em] transform rotate-90 origin-right">
            <span>Scroll to Explore</span>
            <div className="w-12 h-px bg-white/40" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
