import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions } from '../components/Modal';

const storyData = [
  { id: 1, year: '1978', description: 'In 1978, Brickox started as a small suburban workshop...', images: 3 },
  { id: 2, year: '1985', description: 'By 1985, Brickox had outgrown its original suburban workshop...', images: 3 },
  { id: 3, year: '1992', description: 'By 1992, Brickox strengthened its regional reputation...', images: 3 },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const AboutManager = () => {
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Our Story Milestones */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Story Milestones</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage years, descriptions, and gallery images</p>
          </div>
          <button onClick={() => setShowAddMilestone(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Milestone
          </button>
        </div>
        <div className="p-6 space-y-3">
          {storyData.map((story) => (
            <div key={story.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#AB2F2F] to-[#c93e3e] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">{story.year}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800">Year {story.year}</h4>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{story.description}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{story.images} images attached</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* About Showcase Section */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Showcase Stats</h3>
          <p className="text-xs text-slate-400 mt-0.5">Edit the statistics and slider items on the About page</p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['400+', '₹1.5B+', '25+', '98%'].map((val, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
              <input type="text" defaultValue={val} className="w-full text-2xl font-bold text-slate-800 bg-transparent outline-none border-b border-transparent focus:border-[#AB2F2F] pb-1 transition-colors" />
              <input type="text" defaultValue={['Completed Projects', 'Project Value', 'Years Experience', 'On-Time Delivery'][i]} className="w-full text-xs text-slate-500 bg-transparent outline-none mt-2" />
            </div>
          ))}
        </div>
        <div className="px-6 pb-6">
          <button className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors">Save Changes</button>
        </div>
      </motion.div>

      {/* Add Milestone Modal */}
      <Modal isOpen={showAddMilestone} onClose={() => setShowAddMilestone(false)} title="Add Milestone" subtitle="Add a new year milestone to the Our Story section" size="lg">
        <form onSubmit={(e) => { e.preventDefault(); setShowAddMilestone(false); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Year" required placeholder="e.g. 2005" type="number" />
            <FormInput label="Title (Optional)" placeholder="e.g. Major Expansion" />
          </div>
          <FormTextarea label="Description" required rows={4} placeholder="Describe this milestone year in detail..." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormImageUpload label="Image 1" />
            <FormImageUpload label="Image 2" />
            <FormImageUpload label="Image 3" />
          </div>
          <FormActions onCancel={() => setShowAddMilestone(false)} submitText="Add Milestone" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default AboutManager;
