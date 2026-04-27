import { motion } from 'framer-motion';

const ProjectDetails = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Page Hero */}
            <section
                className="relative pb-20 md:pb-10"
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
                        <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold pt-25 uppercase">
                            Project Details
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
                                    Project Details
                                </h3>
                                <ul className="space-y-[18px]">
                                    {[
                                        "We ensure the service quality",
                                        "Precision, safety, accountability",
                                        "Strict quality control",
                                        "Reliable timelines, transparency",
                                        "Durable, standard-driven results"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-[#666] text-[15px]">
                                            <span className="mt-2 w-[6px] h-[6px] bg-[#AB2F2F] flex-shrink-0" />
                                            <span className="leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Map Card */}
                            <div className="bg-white border border-[#e5e5e5] p-[30px] shadow-sm">
                                <h3 className="font-heading text-[24px] font-bold uppercase mb-[25px] tracking-wider text-black">
                                    See Project Location
                                </h3>
                                <div className="w-full rounded-[4px] overflow-hidden border border-[#eee]">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70544.78864791447!2d72.7762830486328!3d21.312627400000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04bfc2084c1dd%3A0x3f6f08749d345f69!2sShiv%20Group%20Of%20Industry!5e1!3m2!1sen!2sin!4v1776935887888!5m2!1sen!2sin"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </aside>

                        {/* Right Content (70%) */}
                        <div className="w-full lg:w-[70%]">

                            {/* Top Banner Image */}
                            <div className="w-full h-[350px] md:h-[500px] overflow-hidden mb-[45px]">
                                <img
                                    src="/shivgroup/images/project/project-1.jpg"
                                    alt="Modern Commercial Workplace"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Main Heading */}
                            <h2 className="font-heading text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[900] uppercase text-black leading-[1.1] mb-6 md:mb-[30px]">
                                A MID-SCALE COMMERCIAL BUILDING THAT REIMAGINES THE MODERN WORKPLACE
                            </h2>

                            {/* Description Paragraphs */}
                            <div className="space-y-5 mb-10 md:mb-[65px]">
                                <p className="text-[#666] text-[15px] md:text-[17px] lg:text-[20px] leading-[1.7]">
                                    It's positioned between North Sydney's waterfront residential and the rapidly evolving CBD, Blue & William's design celebrates its locale and spectacular Sydney Harbour views.
                                </p>
                                <p className="text-[#666] text-[15px] md:text-[17px] lg:text-[20px] leading-[1.7]">
                                    Driven by a growing commercial district that contrasts with the surrounding character-rich residential streets, North Sydney presents a unique mix of challenges and opportunities. With leafy neighbourhoods iconic harbour views, and a rapidly expanding CBD delivering increasing amenity, the area is constantly evolving. Guided by deep insight into this changing urban landscape, we have envisioned an innovative, healthy workplace building that redefines the modern work experience.
                                </p>
                            </div>

                            {/* Section: Project Arrival */}
                            <div className="mb-10 md:mb-[80px]">
                                <h3 className="font-heading text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold uppercase text-black mb-6 md:mb-[40px]">
                                    Project Arrival
                                </h3>

                                {/* Architectural Labels / Timeline */}
                                <div className="w-full">
                                    <img
                                        src="/shivgroup/images/project-2.jpg"
                                        alt="Architectural Section Strip"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>

                            {/* Section: Project Place */}
                            <div className="mb-8 md:mb-[60px]">
                                <h3 className="font-heading text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold uppercase text-black mb-4 md:mb-[20px]">
                                    Project Place
                                </h3>
                                <p className="text-[#666] text-[15px] md:text-[18px] leading-relaxed mb-6 md:mb-[40px]">
                                    With a strong focus on the sweeping views across Sydney Harbour towards the city, the building's design celebrates its unique position at the meeting point of the urban core and the leafy, character-rich harbourside suburb to the south.
                                </p>

                                {/* Diagrams Stack */}
                                <div className="flex flex-col gap-[35px]">
                                    <div className="w-full">
                                        <img
                                            src="/shivgroup/images/project-3.jpg"
                                            alt="Building Diagrams"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <img
                                            src="/shivgroup/images/project-4.jpg"
                                            alt="Sydney Harbour Sketch Illustration"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;
