import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions, FormSelect } from '../components/Modal';

const heroSlides = [
  { id: 1, title: 'We Build The Future', subtitle: 'FROM CONCEPT TO COMPLETION WE BUILD IT RIGHT', image: '/shivgroup/images/hero section.webp', active: true },
];

const ctaData = { heading: 'BUILD WITH US', buttonText: 'GET A FREE SCHEDULE', link: '/contact' };

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HomepageManager = () => {
  const [slides, setSlides] = useState(heroSlides);
  const [showAddSlide, setShowAddSlide] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Hero Section Manager */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Hero Section</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage hero slides, titles, and background images</p>
          </div>
          <button
            onClick={() => setShowAddSlide(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all"
          >
            <HiOutlinePlus className="w-4 h-4" />
            Add Slide
          </button>
        </div>
        <div className="p-6 space-y-4">
          {slides.map((slide) => (
            <div key={slide.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
              <div className="w-24 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                <img src={slide.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">{slide.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{slide.subtitle}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${slide.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {slide.active ? 'Active' : 'Draft'}
                </span>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* History / Quote Section */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>History & Quote Section</h3>
          <p className="text-xs text-slate-400 mt-0.5">Edit the homepage milestones and quote text</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormTextarea label="Quote Text" rows={3} defaultValue={`"FROM THE START, WE'VE DELIVERED QUALITY IN BOTH COMMERCIAL AND RESIDENTIAL PROJECTS..."`} />
            <div className="space-y-3">
              <FormInput label="CTA Heading" defaultValue={ctaData.heading} />
              <FormInput label="CTA Button Text" defaultValue={ctaData.buttonText} />
            </div>
          </div>
          <button className="mt-4 px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors">
            Save Changes
          </button>
        </div>
      </motion.div>

      {/* Add Hero Slide Modal */}
      <Modal
        isOpen={showAddSlide}
        onClose={() => setShowAddSlide(false)}
        title="Add Hero Slide"
        subtitle="Create a new hero banner slide"
        size="md"
      >
        <form onSubmit={(e) => { e.preventDefault(); setShowAddSlide(false); }} className="space-y-4">
          <FormInput label="Slide Title" required placeholder="e.g. We Build The Future" />
          <FormInput label="Subtitle Text" placeholder="e.g. FROM CONCEPT TO COMPLETION" />
          <FormImageUpload label="Background Image" />
          <FormSelect
            label="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
          <FormActions onCancel={() => setShowAddSlide(false)} submitText="Add Slide" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default HomepageManager;
