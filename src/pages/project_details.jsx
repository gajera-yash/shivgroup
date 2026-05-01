import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const ProjectDetails = () => {
    const { hash } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const res = await api.get(`get-project-details/${hash}`);
                if (res?.data?.status) {
                    setProjectData(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch project details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjectDetails();
    }, [hash]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl font-heading text-gray-400 italic">Unveiling project details...</div>
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-[60px] md:text-[80px] font-black text-gray-100 uppercase leading-none mb-4">404</h1>
                <p className="font-heading text-xl md:text-2xl text-gray-400 uppercase tracking-widest mb-8">Project not found</p>
                <Link to="/projects" className="px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#ff5a1f] transition-all">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
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
                        <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold !pt-25 uppercase">
                            {projectData.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-10 md:py-[80px] lg:py-[100px] bg-[#fff]">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[135px]">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-[50px] items-start">

                        {/* Left Sidebar (30%) */}
                        <aside className="w-full lg:w-[30%] lg:sticky lg:top-[120px]">

                            {/* Project Details Card */}
                            <div className="bg-white border border-[#e5e5e5] p-[30px] mb-[30px] shadow-sm">
                                <h3 className="font-heading text-[24px] font-bold uppercase mb-[25px] tracking-wider text-black">
                                    Project Highlights
                                </h3>
                                <ul className="space-y-[18px]">
                                    {(projectData.points || []).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-[#666] text-[15px]">
                                            <span className="mt-2 w-[6px] h-[6px] bg-[#AB2F2F] flex-shrink-0" />
                                            <span className="leading-tight">{item.point}</span>
                                        </li>
                                    ))}
                                    {(!projectData.points || projectData.points.length === 0) && (
                                        <>
                                            <li className="flex items-start gap-3 text-[#666] text-[15px]">
                                                <span className="mt-2 w-[6px] h-[6px] bg-[#AB2F2F] flex-shrink-0" />
                                                <span className="leading-tight">Precision, safety, accountability</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-[#666] text-[15px]">
                                                <span className="mt-2 w-[6px] h-[6px] bg-[#AB2F2F] flex-shrink-0" />
                                                <span className="leading-tight">Durable, standard-driven results</span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            {/* Map Card */}
                            {projectData.map_link && (
                                <div className="bg-white border border-[#e5e5e5] p-[30px] shadow-sm">
                                    <h3 className="font-heading text-[24px] font-bold uppercase mb-[25px] tracking-wider text-black">
                                        See Project Location
                                    </h3>
                                    <div className="w-full rounded-[4px] overflow-hidden border border-[#eee]">
                                        <iframe
                                            src={projectData.map_link}
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </aside>

                        {/* Right Content (70%) */}
                        <div className="w-full lg:w-[70%]">

                            {/* Top Banner Image */}
                            <div className="w-full h-[350px] md:h-[500px] overflow-hidden mb-[45px]">
                                <img
                                    src={projectData.project_image}
                                    alt={projectData.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Main Heading */}
                            <h2 className="font-heading text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[900] uppercase text-black leading-[1.1] mb-6 md:mb-[30px]">
                                {projectData.title}
                            </h2>

                            {/* Description Paragraphs */}
                            <div className="space-y-5 mb-10 md:mb-[65px]">
                                <p className="text-[#666] text-[15px] md:text-[17px] lg:text-[20px] leading-[1.7] whitespace-pre-line">
                                    {projectData.description}
                                </p>
                            </div>

                            {/* Dynamic Sections */}
                            {(projectData.sections || []).map((section, sIdx) => (
                                <div key={section.id || sIdx} className="mb-10 md:mb-[80px]">
                                    <h3 className="font-heading text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold uppercase text-black mb-6 md:mb-[20px]">
                                        {section.section_title}
                                    </h3>
                                    {section.section_content && (
                                        <p className="text-[#666] text-[15px] md:text-[18px] leading-relaxed mb-6 md:mb-[40px] whitespace-pre-line">
                                            {section.section_content}
                                        </p>
                                    )}
                                    {section.section_image && (
                                        <div className="w-full">
                                            <img
                                                src={section.section_image}
                                                alt={section.section_title}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;
