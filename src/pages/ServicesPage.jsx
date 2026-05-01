import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const ServicesPage = () => {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('get-services');
        if (res?.data?.status) {
          setServicesList(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-heading text-gray-400">Loading Services...</div>
      </div>
    );
  }

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative  pb-20 md:pb-28"
        style={{
          backgroundImage: "url('images/page_title_bg.jpg')",
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
            <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold !pt-25">
              Our Service
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#fff] py-[60px] md:py-[80px] px-4 sm:px-6 md:px-12 lg:px-[135px]">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-black text-[36px] md:text-[42px] lg:text-[48px] font-extrabold uppercase tracking-[-0.02em] leading-none">
              MAIN SERVICES
            </h2>
            <p className="max-w-[350px] text-[15px] md:text-[16px] leading-[1.65] text-[#5a5a5a] font-medium">
              The core services shaping strong, reliable construction outcomes across projects
            </p>
          </div>

          <div className="mt-8 space-y-8 md:space-y-10">
            {servicesList.length > 0 ? (
              servicesList.map((service) => (
                <Link
                  to={`/services/${service.hash}`}
                  key={service.hash}
                  className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_minmax(0,1.2fr)] gap-5 lg:gap-8 p-5 border border-[#e5e5e5] py-6 px-5 transition-all hover:shadow-lg hover:border-[#ff5a1f] hover:-translate-y-1 cursor-pointer block"
                >
                  <img
                    src={service.service_image}
                    alt={service.title}
                    className="w-full h-[200px] lg:w-[300px] lg:h-[280px] object-cover"
                    loading="lazy"
                  />

                  <div className="self-center">
                    <h3 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] leading-[1.1] font-semibold uppercase text-black">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[15px] md:text-[18px] leading-[1.6] text-[#666666] font-medium">{service.short_description}</p>
                  </div>

                  <motion.ul 
                    className="self-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.15
                        }
                      }
                    }}
                  >
                    {(service.subservices || []).map((sub, index) => (
                      <motion.li 
                        key={sub.id || index} 
                        className="flex items-center gap-3 !mb-4 pointer-events-none"
                        variants={{
                          hidden: { opacity: 0, x: 30 },
                          visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: {
                              duration: 0.5,
                              ease: "easeOut"
                            }
                          }
                        }}
                      >
                        <motion.span 
                          className="w-[7px] h-[7px] rounded-full bg-[#ff5a1f] flex-shrink-0"
                          variants={{
                            hidden: { scale: 0 },
                            visible: { 
                              scale: 1,
                              transition: { delay: index * 0.15 + 0.1, type: "spring", stiffness: 300 }
                            }
                          }}
                        />
                        <span className="text-[16px] md:text-[18px] leading-[1.5] text-[#222222] font-medium m-0">{sub.description}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400 font-body">No services found.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;