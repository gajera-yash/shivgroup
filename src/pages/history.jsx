import { motion } from 'framer-motion';

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
      <section className="w-full bg-white pb-[70px] lg:pb-[110px]">
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
                    value="Shiv Group"
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <InfoRow 
                    icon="/shivgroup/images/info-icon02.svg"
                    label="Head office:"
                    value={
                      <>
                        245 Market, Et #3038 San Francisco, <br className="hidden md:block" />
                        California (CA).
                      </>
                    }
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
                src="/shivgroup/images/company.jpg"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Decades of Excellence Section */}
      <section className="w-full bg-[#fff] py-[100px] px-4 md:px-8 lg:px-[135px]">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Main Title - Only once at the top */}
          <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] lg:text-[62px] font-[800] text-black uppercase leading-tight max-w-[1000px] mb-10 md:mb-[80px] m-0">
            Decades of excellence Shiv Group leading construction since 1978
          </h2>

          {/* Timeline Wrapper */}
          <div className="flex flex-col gap-[100px] lg:gap-[100px]">
            
            {/* 1978 Section (Normal Layout) */}
            <motion.div 
              className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Side: Highlight Year Block */}
              <motion.div 
                className="relative shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[450px] h-[140px] sm:h-[180px] md:h-[250px] bg-[#c0392b] flex items-center justify-center p-4 md:p-[30px] z-10 relative">
                   <span className="font-heading text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-[900] text-white leading-none">
                     1978
                   </span>
                </div>
                {/* Curve for 1978 (Normal) */}
                <motion.img 
                  src="/shivgroup/images/history-shape01.png"
                  alt="timeline curve"
                  className="absolute left-[20%] top-[95%] w-[350px] md:w-[380px] h-auto pointer-events-none z-0" 
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>

              {/* Right Side: Content Area */}
              <motion.div 
                className="flex-1 flex flex-col w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-1.jpg" alt="1978 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-2.jpg" alt="1978 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-3.jpg" alt="1978 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                 </div>
                 <motion.div 
                   variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                   className="mt-[30px] text-[18px] md:text-[20px] text-gray-500 leading-relaxed font-body space-y-6"
                 >
                    <p>Shiv Group started in 1978 in a modest suburban Chicago shop. Four staff, a few carpenters, two tables, and a sanding machine. What fueled us was drive, dedication, energy, and vision.</p>
                    <p>Twenty years later, Shiv Group expanded into a comprehensive construction and contracting team spanning 15 states. Beyond constructing buildings, we craft environments where people can excel and innovate. Our core strength is listening, visualizing, and executing with precision.</p>
                    <p>To deliver results, we develop personalized solutions for construction, expansion, and remodeling projects. With a skilled in-house team and trusted network of specialists, we provide creativity, cutting-edge technology, and quality materials. Each project is an opportunity to bring a client&apos;s vision to life in remarkable environments.</p>
                 </motion.div>
              </motion.div>
            </motion.div>

            {/* 1985 Section (Reversed Layout) */}
            <motion.div 
              className="w-full flex flex-col lg:flex-row-reverse gap-10 lg:gap-[60px] items-start relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Right Side (Desktop): Highlight Year Block */}
              <motion.div 
                className="relative shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[450px] h-[140px] sm:h-[180px] md:h-[250px] bg-[#c0392b] flex items-center justify-center p-4 md:p-[30px] z-10 relative">
                   <span className="font-heading text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-[900] text-white leading-none">
                     1985
                   </span>
                </div>
                {/* Curve for 1985 (Reversed) */}
                <motion.img 
                  src="/shivgroup/images/history-shape01.png"
                  alt="timeline curve"
                  className="absolute right-[20%] top-[95%] w-[350px] md:w-[340px] h-auto pointer-events-none z-0 transform scale-x-[-1]" 
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>

              {/* Left Side (Desktop): Content Area */}
              <motion.div 
                className="flex-1 flex flex-col w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-4.jpg" alt="1985 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-5.jpg" alt="1985 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-6.jpg" alt="1985 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                 </div>
                 <motion.div 
                   variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                   className="mt-[30px] text-[18px] md:text-[20px] text-gray-500 leading-relaxed font-body space-y-6"
                 >
                    <p>By 1985, Shiv Group had outgrown its original suburban workshop. Rising demand led to a move into a larger Chicago facility, allowing the company to scale operations and take on more ambitious projects. This expansion marked a shift from small-scale builds to structured construction planning.</p>
                    <p>Shiv Group implemented formal systems and secured its first multi-building projects, proving its ability to manage complex builds.</p>
                    <p>Shiv Group also established lasting client relationships, trusted supplier networks, and in-house training programs. The leadership culture formed in 1985 hands-on, precise, and forward-thinking became the backbone of its continued growth and reputation across regions.</p>
                 </motion.div>
              </motion.div>
            </motion.div>

            {/* 1998 Section (Normal Layout) */}
            <motion.div 
              className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Side: Highlight Year Block */}
              <motion.div 
                className="relative shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[450px] h-[140px] sm:h-[180px] md:h-[250px] bg-[#c0392b] flex items-center justify-center p-4 md:p-[30px] z-10 relative">
                   <span className="font-heading text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-[900] text-white leading-none">
                     1998
                   </span>
                </div>
                {/* Curve for 1998 (Normal) */}
                <motion.img 
                  src="/shivgroup/images/history-shape01.png"
                  alt="timeline curve"
                  className="absolute left-[20%] top-[95%] w-[350px] md:w-[360px] h-auto pointer-events-none z-0" 
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>

              {/* Right Side: Content Area */}
              <motion.div 
                className="flex-1 flex flex-col w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-7.jpg" alt="1998 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-8.jpg" alt="1998 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-9.jpg" alt="1998 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                 </div>
                 <motion.div 
                   variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                   className="mt-[30px] text-[18px] md:text-[20px] text-gray-500 leading-relaxed font-body space-y-6"
                 >
                    <p>In 1998, Shiv Group transitioned into strategic growth, expanding operations, upgrading equipment, and adopting advanced construction methods to meet increasing demand.</p>
                    <p>Shiv Group invested heavily in modern project planning tools, scheduling systems, and on-site coordination practices. These improvements increased efficiency, reduced risk, and ensured greater control across multiple active projects, setting new internal benchmarks for delivery and performance.</p>
                    <p>By 1998, Shiv Group was known for reliability, precision, and collaboration. Long-term partnerships grew, repeat clients increased, and the company&apos;s reputation as a trusted construction partner was firmly established for future multi-state success.</p>
                 </motion.div>
              </motion.div>
            </motion.div>

            {/* 2008 Section (Reversed Layout) */}
            <motion.div 
              className="w-full flex flex-col lg:flex-row-reverse gap-10 lg:gap-[60px] items-start relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Right Side (Desktop): Highlight Year Block */}
              <motion.div 
                className="relative shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[450px] h-[140px] sm:h-[180px] md:h-[250px] bg-[#c0392b] flex items-center justify-center p-4 md:p-[30px] z-10 relative">
                   <span className="font-heading text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-[900] text-white leading-none">
                     2008
                   </span>
                </div>
                {/* Curve for 2008 (Reversed) */}
                <motion.img 
                  src="/shivgroup/images/history-shape01.png"
                  alt="timeline curve"
                  className="absolute right-[20%] top-[95%] w-[350px] md:w-[340px] h-auto pointer-events-none z-0 transform scale-x-[-1]" 
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>

              {/* Left Side (Desktop): Content Area */}
              <motion.div 
                className="flex-1 flex flex-col w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-10.jpg" alt="2008 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-11.jpg" alt="2008 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-12.jpg" alt="2008 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                 </div>
                 <motion.div 
                   variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                   className="mt-[30px] text-[18px] md:text-[20px] text-gray-500 leading-relaxed font-body space-y-6"
                 >
                    <p>In 2008, Shiv Group faced a shifting market with focus and resilience. The company adapted quickly, refining strategies to remain strong during industry-wide challenges.</p>
                    <p>Shiv Group emphasized cost control, streamlined operations, and value-driven construction solutions. Smarter planning and disciplined execution ensured projects stayed on track without compromising quality.</p>
                    <p>By staying reliable during uncertain times, Shiv Group strengthened client trust and long-term partnerships. The lessons of 2008 sharpened the company&apos;s adaptability, positioning it for sustainable growth in the years ahead.</p>
                 </motion.div>
              </motion.div>
            </motion.div>

            {/* 2025 Section (Normal Layout) */}
            <motion.div 
              className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Side: Highlight Year Block */}
              <motion.div 
                className="relative shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[450px] h-[140px] sm:h-[180px] md:h-[250px] bg-[#c0392b] flex items-center justify-center p-4 md:p-[30px] z-10 relative">
                   <span className="font-heading text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-[900] text-white leading-none">
                     2025
                   </span>
                </div>
              </motion.div>

              {/* Right Side: Content Area */}
              <motion.div 
                className="flex-1 flex flex-col w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-13.jpg" alt="2025 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-14.jpg" alt="2025 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                   <motion.img variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} src="/shivgroup/images/history/h-15.jpg" alt="2025 event" className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-auto shadow-sm block" />
                 </div>
                 <motion.div 
                   variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                   className="mt-[30px] text-[18px] md:text-[20px] text-gray-500 leading-relaxed font-body space-y-6"
                 >
                    <p>In 2025, Shiv Group stands as a forward-driven construction partner, blending decades of experience with modern innovation to meet evolving industry demands.</p>
                    <p>Shiv Group integrates digital planning, sustainable practices, and advanced materials to deliver smarter, more efficient projects with long-term value.</p>
                    <p>With a strong team culture and client-first mindset, Shiv Group continues to create environments that inspire performance, support growth, and shape the future of construction.</p>
                 </motion.div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>

    </>
  );
};

export default History;
