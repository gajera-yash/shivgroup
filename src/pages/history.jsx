import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const InfoRow = ({ icon, label, value }) => (
  <>
    <div className="py-13 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 lg:gap-[162px] max-w-full">
      <div className="flex items-center gap-3 md:w-[280px] shrink-0">
        {icon && (
          <img className="w-6 h-6 object-contain" src={icon} alt="icon" />
        )}
        <h3 className="text-[19px] md:text-[22px] font-medium text-black m-0">
          {label}
        </h3>
      </div>
      <div className="text-[19px] md:text-[22px] font-medium text-black flex-1">
        {value}
      </div>
    </div>
    <div className="w-full h-[2px] bg-[#dddbdb] shrink-0" />
  </>
);

const History = () => {
  const [siteInfo, setSiteInfo] = useState(null);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, aboutRes] = await Promise.all([
          api.get('get-site-info').catch(() => ({ data: null })),
          api.get('get-about-us').catch(() => ({ data: { status: false, data: [] } }))
        ]);

        if (infoRes?.data) {
          setSiteInfo(infoRes.data);
        }

        if (aboutRes?.data?.status) {
          // Sort by year ascending
          const sortedData = (aboutRes.data.data || []).sort((a, b) => a.year - b.year);
          setAboutUsData(sortedData);
        }
      } catch (err) {
        console.error('Failed to fetch history page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eeefe6] flex items-center justify-center">
        <div className="text-2xl font-heading text-primary animate-pulse">Loading History...</div>
      </div>
    );
  }

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pb-20 md:pb-10"
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
            <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold pt-25 uppercase">
              OUR HISTORY
            </h1>
          </motion.div>
        </div>
      </section>

      {/* History Content */}
      <section className="w-full bg-white pb-[70px] lg:pb-[110px] overflow-hidden">
        <div className="max-w-full mx-auto">
          <div className="bg-[#eeefe6] flex flex-col lg:flex-row items-stretch pt-10 lg:pt-[84px] pb-10 lg:pb-[120px] px-4 sm:px-8 md:px-12 lg:px-[131px] gap-8 lg:gap-[30px]">
            
            {/* Left Box: Company Profile */}
            <div className="flex-1 flex flex-col">
              
              {/* Header */}
              <motion.div 
                className="flex flex-col gap-[15px] mb-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-[32px] sm:text-[50px] md:text-[70px] lg:text-[100px] font-medium uppercase text-black leading-tight m-0">
                  Company profile
                </h2>
                <div className="w-full h-[2px] bg-[#dddbdb] shrink-0" />
              </motion.div>

              {/* Rows */}
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <InfoRow 
                    icon="/shivgroup/images/info-icon01.svg"
                    label="Company name:"
                    value={siteInfo?.company_name || "Shiv Group"}
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <InfoRow 
                    icon="/shivgroup/images/info-icon02.svg"
                    label="Head office:"
                    value={siteInfo?.address || "245 Market, Et #3038 San Francisco, California (CA)."}
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <InfoRow 
                    icon="/shivgroup/images/info-icon03.svg"
                    label="Established :"
                    value="February 25, 1978"
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <InfoRow 
                    icon="/shivgroup/images/info-icon04.svg"
                    label="Capital :"
                    value="$1.5 billion dollar"
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <InfoRow 
                    icon="/shivgroup/images/info-icon05.svg"
                    label="Employees:"
                    value="280+ of January 31, 2026"
                  />
                </motion.div>
              </motion.div>

            </div>

            {/* Right Box: Image */}
            <div className="flex-1 flex flex-col justify-end">
              <img
                className="w-full h-auto object-cover max-h-[882px]"
                loading="lazy"
                alt="History Event"
                src={"/shivgroup/images/company.jpg"}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Decades of Excellence Section */}
      <section className="w-full bg-[#fff] py-[100px] px-4 md:px-8 lg:px-[135px] overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Main Title */}
          <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] lg:text-[62px] font-[800] text-black uppercase leading-tight max-w-[1000px] mb-10 md:mb-[80px] m-0">
            Decades of excellence {siteInfo?.company_name || "Shiv Group"} leading construction since {aboutUsData[0]?.year || "1978"}
          </h2>

          {/* Timeline Wrapper */}
          <div className="flex flex-col gap-[100px] lg:gap-[150px]">
            
            {aboutUsData.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={milestone.id}
                  className={`w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-[60px] items-start relative`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Highlight Year Block */}
                  <motion.div 
                    className="relative shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="w-full min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:w-[450px] h-[140px] sm:h-[180px] md:h-[250px] bg-[#c0392b] flex items-center justify-center p-4 md:p-[30px] z-10 relative">
                       <span className="font-heading text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-[900] text-white leading-none">
                         {milestone.year}
                       </span>
                    </div>
                    {/* Curve Shape - show only if not last item */}
                    {index < aboutUsData.length - 1 && (
                      <motion.img 
                        src="/shivgroup/images/history-shape01.png"
                        alt="timeline curve"
                        className={`absolute ${isEven ? 'left-[20%]' : 'right-[20%] transform scale-x-[-1]'} top-[95%] w-[300px] md:w-[380px] h-auto pointer-events-none z-0`} 
                        initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Content Area */}
                  <motion.div 
                    className="flex-1 flex flex-col w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: { opacity: 0, x: isEven ? 30 : -30 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
                      }
                    }}
                  >
                     {/* Images Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                       {(milestone.about_us_images || []).map((img, i) => (
                         <motion.img 
                            key={img.id}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
                            src={img.about_image} 
                            alt={`${milestone.year} event ${i}`} 
                            className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" 
                         />
                       ))}
                       {/* Fill with placeholders if less than 3 images to maintain grid */}
                       {(milestone.about_us_images?.length < 3) && [...Array(3 - milestone.about_us_images.length)].map((_, i) => (
                          <div key={`empty-${i}`} className="w-full aspect-[4/3] bg-gray-100 grayscale opacity-30" />
                       ))}
                     </div>

                     {/* Description */}
                     <motion.div 
                       variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                       className="mt-[30px] text-[18px] md:text-[20px] text-gray-500 leading-relaxed font-body space-y-6"
                     >
                        <p className="whitespace-pre-line">{milestone.description}</p>
                     </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

    </>
  );
};

export default History;
