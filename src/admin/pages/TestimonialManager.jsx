import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions } from '../components/Modal';

const testimonials = [
  { id: 1, name: 'John Smith', role: 'CEO, BuildCorp', text: '"Shiv Group delivered our project ahead of schedule with exceptional quality..."', avatar: 'J' },
  { id: 2, name: 'Sarah Johnson', role: 'Director, Realty Ventures', text: '"Their attention to detail and commitment to excellence is unmatched..."', avatar: 'S' },
  { id: 3, name: 'Michael Chen', role: 'Architect, Studio Arc', text: '"Working with Shiv Group has been a remarkable experience..."', avatar: 'M' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const TestimonialManager = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <p className="text-slate-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage client testimonials displayed on the homepage</p>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
          <HiOutlinePlus className="w-4 h-4" /> Add Testimonial
        </button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-slate-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AB2F2F] to-[#e04848] flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-3">{t.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Add Testimonial Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Testimonial" subtitle="Add a new client testimonial" size="md">
        <form onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Client Name" required placeholder="e.g. Rajesh Patel" />
            <FormInput label="Role / Company" required placeholder="e.g. CEO, BuildCorp" />
          </div>
          <FormTextarea label="Testimonial Quote" required rows={4} placeholder="Write the client's testimonial here..." />
          <FormImageUpload label="Client Photo (Optional)" />
          <FormActions onCancel={() => setShowAdd(false)} submitText="Add Testimonial" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default TestimonialManager;
