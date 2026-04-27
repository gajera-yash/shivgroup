import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const logos = [
  { src: '/shivgroup/images/brand-logo01.png', alt: 'BUMN' },
  { src: '/shivgroup/images/brand-logo02.png', alt: 'Caterpillar' },
  { src: '/shivgroup/images/brand-logo03.png', alt: 'D+N' },
  { src: '/shivgroup/images/brand-logo04.png', alt: 'American Muscle' },
  { src: '/shivgroup/images/brand-logo05.png', alt: 'Volvo' },
  { src: '/shivgroup/images/brand-logo06.png', alt: 'John Deere' },
  { src: '/shivgroup/images/brand-logo07.png', alt: 'Perkins' },
  { src: '/shivgroup/images/brand-logo08.png', alt: 'Marley' },
];

const TrustedBy = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end center'],
  });

  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  return (
    <section
      id="trusted-by"
      ref={targetRef}
      className="bg-white w-full px-4 md:px-8 lg:px-12"
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <div className="max-w-[1920px] mx-auto flex flex-col items-start gap-[40px]">
        <div className="relative inline-block overflow-hidden">
          <h2 className="font-heading text-[50px] md:text-[50px] lg:text-[70px] leading-none text-[#000]/10 font-bold uppercase tracking-tight m-0">
            Trusted By
          </h2>

          <motion.h2
            style={{ width: fillWidth }}
            className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap font-heading text-[50px] md:text-[50px] lg:text-[70px] leading-none text-[#000] font-bold uppercase tracking-tight m-0"
          >
            Trusted By
          </motion.h2>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-[#aaa8a8] border-solid border-[1px]">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`h-[265px] flex items-center justify-center border-[#aaa8a8] border-solid group cursor-pointer overflow-hidden relative
                ${(index + 1) % 4 !== 0 ? 'lg:border-r-[1px]' : ''}
                ${(index + 1) % 2 !== 0 ? 'sm:border-r-[1px] lg:sm:border-r-0' : ''}
                ${index < 4 ? 'border-b-[1px]' : ''}
                ${index >= 4 ? 'sm:border-t-0' : ''}
              `}
              style={{
                borderRight: (index + 1) % 4 === 0 ? '0' : '1px solid #aaa8a8',
                borderBottom: index < 4 ? '1px solid #aaa8a8' : '0',
              }}
            >
              <div className="relative w-full h-[40px] flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={logo.src}
                  alt={`${logo.alt} grayscale`}
                  className="w-auto h-full max-w-[80%] object-contain grayscale transition-all duration-500 ease-in-out transform group-hover:-translate-y-[150%]"
                />

                <img
                  src={logo.src}
                  alt={`${logo.alt} color`}
                  className="absolute w-auto h-full max-w-[80%] object-contain translate-y-[150%] transition-all duration-500 ease-in-out group-hover:translate-y-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
