import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 lg:px-12 flex items-center justify-center min-h-[400px] md:min-h-[700px]">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/shivgroup/images/cta_bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* Script Top Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-[20px] xl:text-[24px] font-body font-bold text-white font-cta pb-[20px]"
        >
          Layouts to Landmarks
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight mb-8 md:mb-10"
        >
          LET'S TURN IMAGINATION INTO MEASURABLE PROGRESS
        </motion.h2>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/contact"
            className="bg-primary text-white flex items-center gap-4 pl-6 pr-2 py-2 rounded-full font-heading font-bold tracking-widest text-sm hover:bg-primary-dark transition-colors duration-300 mx-auto"
          >
            GET A FREE SCHEDULE
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary">
              <img
                src="/shivgroup/images/arrow-left-primary.svg"
                alt="arrow"
                className="w-6 h-6 rotate-[2deg]"
              />
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;
