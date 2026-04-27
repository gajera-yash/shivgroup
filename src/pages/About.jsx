import { motion } from 'framer-motion';
import AboutShowcaseSection from '../components/AboutShowcaseSection';
import OurStorySection from '../components/OurStorySection';
import TrustedBy from '../components/TrustedBy';
import Awards from '../components/Awards';
import WhatWeBuildSection from '../components/WhatWeBuildSection';

const About = () => {
  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pb-20  md:pb-28"
        style={{
          backgroundImage: "url('/shivgroup/images/page_title_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '400px',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold pt-25">
              ABOUT SHIV GROUP
            </h1>
          </motion.div>
        </div>
      </section>

     

     

      <AboutShowcaseSection />

      <OurStorySection />
      <WhatWeBuildSection />
      

      <Awards/> 
      <TrustedBy />
    </>
  );
};

export default About;
