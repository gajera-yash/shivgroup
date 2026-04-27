import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'CONSTRUCTION SOLUTIONS',
    image: '/shivgroup/images/service/main_image.jpg',
    description: 'Our Construction Solutions service offers comprehensive, end-to-end management of your building projects, ensuring that every stage—from planning and design to execution and completion—is handled with precision, innovation, and care.',
    fullDescription: 'We combine modern construction techniques with cost-effective strategies to deliver projects that meet the highest standards of quality, safety, and efficiency. Our team of experienced professionals works closely with clients to understand their unique needs and goals, providing tailored solutions that bring visions to life.',
    items: ['Residential Construction', 'Commercial Construction', 'Industrial Construction', 'Renovation & Remodelling', 'Interior Fit-Out Works'],
    workingProcess: [
      {
        id: 1,
        title: 'CONSULTATION',
        description: 'We begin by understanding your vision, requirements, and project objectives through detailed discussions, careful planning, and comprehensive site evaluations to establish a clear foundation for success.',
        images: ['/shivgroup/images/service/consultation_1.jpg', '/shivgroup/images/service/consultation_2.jpg']
      },
      {
        id: 2,
        title: 'PLANNING & DESIGN',
        description: 'Our team develops strategic plans, designs, and cost frameworks, ensuring feasibility, efficiency, and quality before execution begins.',
        images: ['/shivgroup/images/service/plannig_1.png', '/shivgroup/images/service/plannig_2.png', '/shivgroup/images/service/plannig_3.png', '/shivgroup/images/service/plannig_4.png', '/shivgroup/images/service/plannig_5.png']
      },
      {
        id: 3,
        title: 'CONSTRUCTION & DELIVERY',
        description: 'We execute the project with precision, carefully managing timelines, quality, and safety standards to ensure smooth delivery of a completed build that consistently exceeds expectations.',
        images: ['/shivgroup/images/service/final_project_image.jpg']
      }
    ]
  },
  {
    id: 2,
    title: 'CIVIL ENGINEERING SERVICES',
    image: '/shivgroup/images/service/main_image.jpg',
    description: 'Strong engineering execution from base structure to infrastructure systems.',
    fullDescription: 'We deliver complete civil engineering solutions for infrastructure projects of all scales, from foundation works to major bridge and highway construction.',
    items: ['Foundation & Structural Work', 'Concrete & Masonry Services', 'Steel Structure Fabrication', 'Road & Highway Works', 'Bridge & Infrastructure'],
    workingProcess: []
  },
  {
    id: 3,
    title: 'ELECTRICAL INSTALLATIONS',
    image: '/shivgroup/images/service/main_image.jpg',
    description: 'Reliable MEP systems built for safety, performance, and efficiency.',
    fullDescription: 'Complete MEP solutions including electrical, plumbing, HVAC and safety systems for all types of buildings.',
    items: ['Electrical Wiring & Installation', 'Plumbing & Drainage Systems', 'HVAC (Heating, Ventilation)', 'Firefighting & Safety Systems', 'Solar & Energy Solutions'],
    workingProcess: []
  },
  {
    id: 4,
    title: 'CRAFTSMANSHIP & FINISHING',
    image: '/shivgroup/images/service/main_image.jpg',
    description: 'Precision finishing details that complete each space with quality craftsmanship.',
    fullDescription: 'Premium interior and exterior finishing works with attention to every detail for perfect finish quality.',
    items: ['Plastering, Painting & Decor', 'Tiling, Flooring & Ceilings', 'Carpentry & Joinery', 'Glass & Aluminum Works', 'Interior Fixtures & Details'],
    workingProcess: []
  },
];

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
  const service = services.find(s => s.id === parseInt(id));

  if (!service) {
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
            <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold !pt-25">
              {service.title}
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
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[15px] text-gray-600 font-medium pb-3 border-b border-gray-200 last:border-0 hover:text-[#ff5a1f] transition-colors cursor-pointer">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box B - RULES WE BUILD BY */}
              <div className="border border-[#e5e7eb] p-6 bg-white">
                <h3 className="font-heading text-[18px] font-bold mb-5 uppercase tracking-wide text-gray-900 leading-tight">RULES WE BUILD BY</h3>
                <ul className="!space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[16px] text-gray-600 font-medium pb-3 border-b border-gray-200 last:border-0">
                      <CheckIcon />
                      {item}
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
                  <button className="w-full bg-[#EEEFE6] border border-[#e5e7eb] py-5 px-6 flex items-center justify-between text-[13px] font-bold text-gray-800 hover:border-[#ff5a1f] hover:text-[#ff5a1f] transition-all group">
                    Brickox Service Brochure.PDF
                    <span className="text-gray-400 group-hover:text-[#ff5a1f]"><DownloadIcon /></span>
                  </button>
                  <button className="w-full bg-[#EEEFE6] border border-[#e5e7eb] py-5 px-6 flex items-center justify-between text-[13px] font-bold text-gray-800 hover:border-[#ff5a1f] hover:text-[#ff5a1f] transition-all group">
                    Brickox Service Brochure.DOC
                    <span className="text-gray-400 group-hover:text-[#ff5a1f]"><DownloadIcon /></span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Content - 8 Columns */}
            <div className="md:col-span-9 lg:col-span-9">
              
              {/* Hero Image */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <img src={service.image} alt={service.title} className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover mb-8 md:mb-10" />
              </motion.div>

              {/* Title & Description */}
              <motion.h2 
                className="font-heading text-[28px] md:text-[34px] lg:text-[40px] font-black uppercase text-[#1f2937] leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              >
                COMPREHENSIVE {service.title} FROM PLANNING TO COMPLETION
              </motion.h2>

              <motion.p 
                className="text-[18px] text-gray-600 leading-[1.8] mb-5"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              >
                {service.description}
              </motion.p>

              <motion.p 
                className="text-[18px] text-gray-600 leading-[1.8] mb-12"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              >
                {service.fullDescription}
              </motion.p>

              {/* Working Process */}
              {service.workingProcess.length > 0 && (
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="font-heading text-[28px] font-black uppercase tracking-wide text-[#1f2937] mb-4">WORKING PROCESS</h3>
                  <p className="text-[18px] text-gray-500 mb-12 leading-relaxed">
                    Structured process ensures efficient, transparent, goal-aligned project delivery, exceeding client expectations. Every stage is carefully planned, coordinated, and executed with precision.
                  </p>

                  <div className="space-y-16">
                    {service.workingProcess.map((step, stepIdx) => {
                      // Process Step 01 (Consultation)
                      if (step.id === 1) {
                        return (
                          <div key={step.id} className="items-start">
                            <div>
                              <h4 className="font-heading text-[28px] font-black tracking-tight text-[#1f2937] mb-4 uppercase">
                                {String(step.id).padStart(2, '0')}_ {step.title}
                              </h4>
                              <p className="text-[18px] text-gray-600 leading-[1.7] mb-6">
                                {step.description}
                              </p>
                            </div>
                            <div className="flex gap-4 mb-10">
                              {step.images && step.images.map((img, imgIdx) => (
                                <img key={imgIdx} src={img} alt={step.title} className="w-1/2 h-auto object-cover shadow-sm bg-gray-100 min-h-[160px]" />
                              ))}
                            </div>
                          </div>
                        );
                      }
                      
                      // Process Step 02 (Planning & Design)
                      if (step.id === 2) {
                        return (
                          <div key={step.id}>
                            <h4 className="font-heading text-[28px] font-black tracking-tight text-[#1f2937] mb-4 uppercase">
                              {String(step.id).padStart(2, '0')}_ {step.title}
                            </h4>
                            <p className="text-[18px] text-gray-600 leading-[1.7] mb-8">
                              {step.description}
                            </p>
                            {step.images && step.images.length > 0 && (
                              <div className="flex flex-row gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar mb-10">
                                {step.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative w-[32%] md:w-[18%] flex-shrink-0 snap-center group">
                                    <div className="p-1 border border-gray-200 bg-white shadow-sm">
                                      <img src={img} alt={`Render ${imgIdx+1}`} className="w-full aspect-square object-cover" />
                                    </div>
                                    <div className="absolute top-[6px] right-[10px] bg-[#991b1b] text-white text-[11px] rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md z-10">
                                      {String(imgIdx + 1).padStart(2, '0')}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Process Step 03 (Construction & Delivery)
                      if (step.id === 3) {
                        return (
                          <div key={step.id}>
                            <h4 className="font-heading text-[28px] font-black tracking-tight text-[#1f2937] mb-4 uppercase">
                              {String(step.id).padStart(2, '0')}_ {step.title}
                            </h4>
                            <p className="text-[18px] text-gray-600 leading-[1.7] mb-8">
                              {step.description}
                            </p>
                            {step.images && step.images.length > 0 && (
                              <img src={step.images[0]} alt={step.title} className="w-full h-auto object-cover shadow-sm bg-gray-100 min-h-[300px]" />
                            )}
                          </div>
                        );
                      }

                      // Default layout for dynamic steps if more are added
                      return (
                         <div key={step.id} className="mb-10">
                            <h4 className="font-heading text-[22px] font-black tracking-tight text-[#1f2937] mb-4 uppercase">
                              {String(step.id).padStart(2, '0')}_ {step.title}
                            </h4>
                            <p className="text-[15px] text-gray-600 leading-[1.7] mb-6">
                              {step.description}
                            </p>
                         </div>
                      );
                    })}
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