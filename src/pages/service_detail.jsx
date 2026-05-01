import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
  </svg>
);

const ServiceDetail = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await api.get(`get-service-data-by-id/${id}`);
        if (res?.data?.status) {
          setServiceData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch service data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [id]);

  const handleDownload = (url) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', url.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-heading text-gray-400">Loading Service Details...</div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <h2 className="text-3xl font-bold">Service not found</h2>
        <Link to="/services" className="text-[#ff5a1f] underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pb-20  md:pb-28"
        style={{
          backgroundImage: "url('/images/page_title_bg.jpg')",
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
              {serviceData.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-[135px] py-10 md:py-[80px]">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Left Sidebar - 4 Columns */}
            <div className="md:col-span-3 lg:col-span-3 space-y-6 md:space-y-8 md:sticky md:top-24 self-start">
              
              {/* Box A - WHAT INCLUDED */}
              <div className="border border-[#e5e7eb] p-6 bg-[#f9fafb]">
                <h3 className="font-heading text-[18px] font-bold mb-5 uppercase tracking-wide text-gray-900 leading-tight">WHAT INCLUDED AT THIS SERVICE?</h3>
                <ul className="!space-y-3">
                  {(serviceData.subservices || []).map((item, idx) => (
                    <li key={item.id || idx} className="flex items-center gap-3 text-[15px] text-gray-600 font-medium pb-3 border-b border-gray-200 last:border-0 hover:text-[#ff5a1f] transition-colors cursor-pointer">
                      <CheckIcon />
                      {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box B - RULES WE BUILD BY */}
              <div className="border border-[#e5e7eb] p-6 bg-white">
                <h3 className="font-heading text-[18px] font-bold mb-5 uppercase tracking-wide text-gray-900 leading-tight">RULES WE BUILD BY</h3>
                <ul className="!space-y-3">
                  {(serviceData.service_rules || []).map((item, idx) => (
                    <li key={item.id || idx} className="flex items-center gap-3 text-[16px] text-gray-600 font-medium pb-3 border-b border-gray-200 last:border-0">
                      <CheckIcon />
                      {item.rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box C - DOWNLOAD BROCHURE */}
              <div className="border border-[#e5e7eb] p-6 bg-[#f9fafb]">
                <h3 className="font-heading text-[18px] font-bold mb-3 uppercase tracking-wide text-gray-900 leading-tight">DOWNLOAD THE BROCHURE</h3>
                <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
                  Access our document for in depth service details and work processes.
                </p>
                <div className="space-y-3">
                  {(serviceData.brochures || []).map((brochure, idx) => (
                    <button 
                      key={brochure.id || idx}
                      onClick={() => handleDownload(brochure.brochure_file)}
                      className="w-full bg-[#EEEFE6] border border-[#e5e7eb] py-5 px-6 flex items-center justify-between text-[13px] font-bold text-gray-800 hover:border-[#ff5a1f] hover:text-[#ff5a1f] transition-all group"
                    >
                      {brochure.brochure_file.split('/').pop()}
                      <span className="text-gray-400 group-hover:text-[#ff5a1f]"><DownloadIcon /></span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Content - 8 Columns */}
            <div className="md:col-span-9 lg:col-span-9">
              
              {/* Hero Image */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <img src={serviceData.service_image} alt={serviceData.title} className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover mb-8 md:mb-10" />
              </motion.div>

              {/* Title & Description */}
              <motion.h2 
                className="font-heading text-[28px] md:text-[34px] lg:text-[40px] font-black uppercase text-[#1f2937] leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              >
                 {serviceData.title}
              </motion.h2>

              <motion.p 
                className="text-[18px] text-gray-600 leading-[1.8] mb-5"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              >
                {serviceData.short_description}
              </motion.p>

              <motion.p 
                className="text-[18px] text-gray-600 leading-[1.8] mb-12"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              >
                {serviceData.full_description}
              </motion.p>

              {/* Working Process */}
              {(serviceData.service_contents || []).length > 0 && (
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="font-heading text-[28px] font-black uppercase tracking-wide text-[#1f2937] mb-4">WORKING PROCESS</h3>
                  <p className="text-[18px] text-gray-500 mb-12 leading-relaxed">
                    Structured process ensures efficient, transparent, goal-aligned project delivery, exceeding client expectations. Every stage is carefully planned, coordinated, and executed with precision.
                  </p>

                  <div className="space-y-16">
                    {(serviceData.service_contents || []).map((step, stepIdx) => (
                      <div key={step.id || stepIdx} className="items-start">
                        <div>
                          <h4 className="font-heading text-[28px] font-black tracking-tight text-[#1f2937] mb-4 uppercase">
                            {String(stepIdx + 1).padStart(2, '0')}_ {step.title}
                          </h4>
                          <p className="text-[18px] text-gray-600 leading-[1.7] mb-6">
                            {step.description}
                          </p>
                        </div>
                        {step.content_image && (
                          <div className="flex gap-4 mb-10">
                            <img src={step.content_image} alt={step.title} className="w-full h-auto max-h-[450px] object-cover shadow-sm bg-gray-100" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}

              <Link 
                to="/services"
                className="inline-flex mt-8 px-8 py-3.5 bg-[#ff5a1f] text-white font-bold rounded-sm tracking-wide text-sm hover:bg-[#e04e1b] transition-colors"
              >
                ← BACK TO ALL SERVICES
              </Link>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;