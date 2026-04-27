import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const milestones = [
  {
    year: 1978,
    
    caption:
      "This foundation year set our path in motion, driving early breakthroughs that shaped our identity in construction excellence.",
    images: ["https://html.xpressbuddy.com/brickox/assets/img/about/img01.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img02.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img03.jpg"],
  },
  {
    year: 1985,
   
    caption:
      "A period of rapid growth — new partnerships, larger contracts, and a workforce that doubled in just three years.",
    images: ["https://html.xpressbuddy.com/brickox/assets/img/about/img04.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img05.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img06.jpg"],
  },
  {
    year: 1998,
 
    caption:
      "We adopted new engineering standards and technology-driven processes that set us apart from competitors.",
    images: ["https://html.xpressbuddy.com/brickox/assets/img/about/img07.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img08.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img09.jpg"],
  },
  {
    year: 2008,
   
    caption:
      "The 2008 recession tested every builder. We delivered 14 projects that year without a single delay or default.",
    images: ["https://html.xpressbuddy.com/brickox/assets/img/about/img10.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img11.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img12.jpg"],
  },
  {
    year: 2025,
   
    caption:
      "From a two-man team in 1978 to 200+ professionals in 2025 — still building with the same values we started with.",
    images: ["https://html.xpressbuddy.com/brickox/assets/img/about/img01.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img02.jpg", "https://html.xpressbuddy.com/brickox/assets/img/about/img03.jpg"],
  },
];

const QuoteBanner = () => {
  return (
    <section className="bg-[#EEEFE6] w-full pt-10 md:pt-16 pb-12 md:px-8 relative z-0">
     
    </section>
  );
};


const History = () => {
  const [current, setCurrent] = useState(0);
  const milestone = milestones[current];

  const goTo = (idx) => {
    if (idx >= 0 && idx < milestones.length) setCurrent(idx);
  };

  return (
    <section className="history_section bg-[#EEEFE6] w-full py-10 md:py-16 px-6 sm:px-6 lg:px-12">
      <div className="max-w-[1920px] mx-auto">
      <QuoteBanner />

       <div className="">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-dark leading-tight tracking-wide">
            "FROM THE START, <span className="text-primary">WE'VE DELIVERED QUALITY</span> IN BOTH COMMERCIAL AND RESIDENTIAL PROJECTS, BUILDING A <span className="text-primary">REPUTATION FOR EXCELLENCE.</span>"
          </h2>
        </motion.div>
      </div>

      {/* Year + Photos */}
      <div className="history_detils flex flex-col lg:flex-row items-stretch gap-3 lg:gap-[20px] mt-4 md:mt-6">
        {/* Red Year Box */}
        <div className="bg-[#B53030] text-white font-heading font-bold leading-none flex items-center justify-center flex-shrink-0 h-[130px] lg:h-[200px] lg:w-[420px] text-[95px] sm:text-[122px] lg:text-[184px]">
          {milestone.year}
        </div>

        {/* 3 Photos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`photos-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-[20px] flex-1"
          >
            {/* Photo 1 */}
            <div className="overflow-hidden h-[240px] lg:h-[400px]">
              <img
                src={milestone.images[0]}
                alt={`${milestone.year} photo 1`}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Photo 2 — with caption */}
            <div >
              <div className="overflow-hidden h-[190px] lg:h-[320px]">
              <img
                src={milestone.images[1]}
                alt={`${milestone.year} photo 2`}
                className="w-full h-full object-cover object-center"
              />
              </div>
              <div className="px-3 py-3 lg:py-4 min-h-[92px] lg:min-h-[80px]">
                <p className="text-[17px] lg:text-[17px] text-[#4A4A4A] leading-[1.45] m-0">
                  {milestone.caption}
                </p>
              </div>
            </div>

            {/* Photo 3 */}
            <div className="overflow-hidden h-[240px] lg:h-[400px]">
              <img
                src={milestone.images[2]}
                alt={`${milestone.year} photo 3`}
                className="w-full h-full object-cover object-bottom"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Arrows */}
      <div className="flex justify-end gap-2 mt-4 md:mt-5 mb-5 history_navigation">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="w-12 h-12 rounded-full bg-[#fff]  flex items-center justify-center text-[15px] text-[#3E3E3E] hover:bg-[#C94444] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === milestones.length - 1}
          className="w-12 h-12 rounded-full bg-[#fff] flex items-center justify-center text-[15px] text-[#3E3E3E] hover:bg-[#C94444] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          →
        </button>
      </div>

      {/* Timeline */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-[12px] mt-6 md:mt-8 pb-4 hide-scrollbar">
        {milestones.map((m, i) => (
          <button
            key={m.year}
            onClick={() => goTo(i)}
            className={`flex-shrink-0 min-w-[140px] sm:min-w-0 font-heading font-bold text-[40px] sm:text-[56px] lg:text-[68px] leading-none py-2 lg:py-1 border border-[#CFCFCB] transition-colors h-[68px] sm:h-[78px] lg:h-[92px]
              ${i === current
                ? "bg-[#111114] text-white border-[#111114]"
                : "text-[#B9B9B9] hover:text-[#727272] bg-transparent"
              }`}
          >
            {m.year}
          </button>
        ))}
      </div>
      </div>
    </section>
  );
};

export default History;