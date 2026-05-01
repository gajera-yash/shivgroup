import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import api from '../utils/api';

const TrustedBy = () => {
  const [partnersList, setPartnersList] = useState([]);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end center'],
  });

  const fillWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get('get-partners');
        if (res?.data?.status) {
          setPartnersList(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch partners:', err);
      }
    };
    fetchPartners();
  }, []);

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
          {partnersList.length > 0 ? (
            partnersList.map((partner, index) => (
              <motion.div
                key={partner.id || index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`h-[265px] flex items-center justify-center border-[#aaa8a8] border-solid group cursor-pointer overflow-hidden relative
                  ${(index + 1) % 4 !== 0 ? 'lg:border-r-[1px]' : ''}
                  ${(index + 1) % 2 !== 0 ? 'sm:border-r-[1px] lg:sm:border-r-0' : ''}
                  ${index < Math.floor((partnersList.length - 1) / 4) * 4 ? 'border-b-[1px]' : ''}
                `}
                style={{
                  borderRight: (index + 1) % 4 === 0 ? '0' : '1px solid #aaa8a8',
                  borderBottom: index < Math.ceil(partnersList.length / 4 - 1) * 4 ? '1px solid #aaa8a8' : '0',
                }}
              >
                <div className="relative w-full h-[40px] flex flex-col items-center justify-center overflow-hidden">
                  <img
                    src={partner.partner_image}
                    alt={`${partner.partner_name} grayscale`}
                    className="w-auto h-full max-w-[80%] object-contain grayscale transition-all duration-500 ease-in-out transform group-hover:-translate-y-[150%]"
                  />

                  <img
                    src={partner.partner_image}
                    alt={`${partner.partner_name} color`}
                    className="absolute w-auto h-full max-w-[80%] object-contain translate-y-[150%] transition-all duration-500 ease-in-out group-hover:translate-y-0"
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-slate-400 font-body">No partners found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
