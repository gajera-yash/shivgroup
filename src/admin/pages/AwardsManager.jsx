import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormImageUpload, FormActions } from '../components/Modal';

const awards = [
  { id: 1, title: 'Best Construction Firm 2024', year: '2024', org: 'National Builder Awards' },
  { id: 2, title: 'Excellence in Infrastructure', year: '2023', org: 'Construction World' },
  { id: 3, title: 'Green Building Award', year: '2022', org: 'Sustainable Build Forum' },
];

const partners = [
  { id: 1, name: 'Ultratech Cement', logo: '/shivgroup/images/trusted/client-1.png' },
  { id: 2, name: 'ACC Limited', logo: '/shivgroup/images/trusted/client-2.png' },
  { id: 3, name: 'Ambuja Cements', logo: '/shivgroup/images/trusted/client-3.png' },
  { id: 4, name: 'JSW Steel', logo: '/shivgroup/images/trusted/client-4.png' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const AwardsManager = () => {
  const [showAddAward, setShowAddAward] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Awards */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Awards</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage company awards and achievements</p>
          </div>
          <button onClick={() => setShowAddAward(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Award
          </button>
        </div>
        <div className="p-6 space-y-3">
          {awards.map((award) => (
            <div key={award.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🏆</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800">{award.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{award.org} • {award.year}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trusted Partners */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Trusted Partners</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage partner and client logos</p>
          </div>
          <button onClick={() => setShowAddPartner(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Partner
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.id} className="relative group p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col items-center">
              <div className="w-full h-16 flex items-center justify-center mb-2">
                <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <p className="text-xs text-slate-500 font-medium text-center">{p.name}</p>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded-md bg-white shadow-sm hover:bg-slate-100 text-slate-400"><HiOutlineTrash className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Award Modal */}
      <Modal isOpen={showAddAward} onClose={() => setShowAddAward(false)} title="Add Award" subtitle="Add a new company award or achievement" size="md">
        <form onSubmit={(e) => { e.preventDefault(); setShowAddAward(false); }} className="space-y-4">
          <FormInput label="Award Title" required placeholder="e.g. Best Construction Firm 2024" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Organization" required placeholder="e.g. National Builder Awards" />
            <FormInput label="Year" required placeholder="e.g. 2024" type="number" />
          </div>
          <FormImageUpload label="Award Certificate / Image (Optional)" />
          <FormActions onCancel={() => setShowAddAward(false)} submitText="Add Award" />
        </form>
      </Modal>

      {/* Add Partner Modal */}
      <Modal isOpen={showAddPartner} onClose={() => setShowAddPartner(false)} title="Add Partner" subtitle="Add a new trusted partner or client logo" size="sm">
        <form onSubmit={(e) => { e.preventDefault(); setShowAddPartner(false); }} className="space-y-4">
          <FormInput label="Partner / Client Name" required placeholder="e.g. Ultratech Cement" />
          <FormImageUpload label="Company Logo" />
          <FormActions onCancel={() => setShowAddPartner(false)} submitText="Add Partner" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default AwardsManager;
