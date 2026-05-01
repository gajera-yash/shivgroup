import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from '../utils/api';

const QuoteBanner = () => {
  return (
    <section className="bg-[#EEEFE6] w-full pt-10 md:pt-16 pb-12 md:px-8 relative z-0">
     
    </section>
  );
};

const History = () => {
  const [milestonesList, setMilestonesList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [currentMilestoneData, setCurrentMilestoneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch all years for the timeline
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await api.get('all-about-us-year');
        if (res?.data?.status && res.data.data.length > 0) {
          setMilestonesList(res.data.data);
          setCurrent(0); // Start with the first one
        }
      } catch (err) {
        console.error('Failed to fetch milestones:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMilestones();
  }, []);

  // Fetch full details for the selected milestone
  useEffect(() => {
    if (milestonesList.length > 0) {
      const fetchDetail = async () => {
        setDetailLoading(true);
        try {
          const res = await api.get(`get-about-us-data-by-id/${milestonesList[current].id}`);
          if (res?.data?.status) {
            setCurrentMilestoneData(res.data.data);
          }
        } catch (err) {
          console.error('Failed to fetch milestone details:', err);
        } finally {
          setDetailLoading(false);
        }
      };
      fetchDetail();
    }
  }, [current, milestonesList]);

  const goTo = (idx) => {
    if (idx >= 0 && idx < milestonesList.length) setCurrent(idx);
  };

  if (loading) {
    return (
      <section className="history_section bg-[#EEEFE6] w-full py-20 px-6 flex items-center justify-center">
        <div className="text-xl font-heading text-gray-400 italic">Rewinding the clock...</div>
      </section>
    );
  }

  if (milestonesList.length === 0) {
    return null;
  }

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
            {milestonesList[current]?.year}
          </div>

          {/* 3 Photos Grid */}
          <AnimatePresence mode="wait">
            {!detailLoading && currentMilestoneData && (
              <motion.div
                key={`milestone-${milestonesList[current]?.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-[20px] flex-1"
              >
                {/* Photo 1 */}
                <div className="overflow-hidden h-[240px] lg:h-[400px] bg-white/50">
                  {currentMilestoneData.about_us_images?.[0] && (
                    <img
                      src={currentMilestoneData.about_us_images[0].about_image}
                      alt="History stage 1"
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>

                {/* Photo 2 — with caption */}
                <div>
                  <div className="overflow-hidden h-[190px] lg:h-[320px] bg-white/50">
                    {currentMilestoneData.about_us_images?.[1] && (
                      <img
                        src={currentMilestoneData.about_us_images[1].about_image}
                        alt="History stage 2"
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </div>
                  <div className="px-3 py-3 lg:py-4 min-h-[92px] lg:min-h-[80px]">
                    <p className="text-[17px] lg:text-[17px] text-[#4A4A4A] leading-[1.45] m-0">
                      {currentMilestoneData.description}
                    </p>
                  </div>
                </div>

                {/* Photo 3 */}
                <div className="overflow-hidden h-[240px] lg:h-[400px] bg-white/50">
                  {currentMilestoneData.about_us_images?.[2] && (
                    <img
                      src={currentMilestoneData.about_us_images[2].about_image}
                      alt="History stage 3"
                      className="w-full h-full object-cover object-bottom"
                    />
                  )}
                </div>
              </motion.div>
            )}
            {detailLoading && (
              <div className="flex-1 flex items-center justify-center bg-white/10 rounded-lg min-h-[400px]">
                <div className="text-gray-400 font-heading animate-pulse">Loading year details...</div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex justify-end gap-2 mt-4 md:mt-5 mb-5 history_navigation">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0 || detailLoading}
            className="w-12 h-12 rounded-full bg-[#fff]  flex items-center justify-center text-[15px] text-[#3E3E3E] hover:bg-[#C94444] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === milestonesList.length - 1 || detailLoading}
            className="w-12 h-12 rounded-full bg-[#fff] flex items-center justify-center text-[15px] text-[#3E3E3E] hover:bg-[#C94444] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>

        {/* Timeline Tabs */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-[12px] mt-6 md:mt-8 pb-4 hide-scrollbar">
          {milestonesList.map((m, i) => (
            <button
              key={m.id}
              onClick={() => goTo(i)}
              disabled={detailLoading}
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