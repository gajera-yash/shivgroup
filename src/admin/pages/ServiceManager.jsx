import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions } from '../components/Modal';

const servicesData = [
  {
    id: 1, title: 'CONSTRUCTION SOLUTIONS', image: '/shivgroup/images/project/project-1.jpg',
    description: 'Smart solutions for everyday challenges in project demands.',
    items: ['Residential Construction', 'Commercial Construction', 'Industrial Construction', 'Renovation & Remodeling', 'Interior Fit-Out Works'],
  },
  {
    id: 2, title: 'CIVIL ENGINEERING SERVICES', image: '/shivgroup/images/project/project-2.jpg',
    description: 'Strong engineering execution from base structure to infrastructure systems.',
    items: ['Foundation & Structural Work', 'Concrete & Masonry Services', 'Steel Structure Fabrication', 'Road & Highway Works', 'Bridge & Infrastructure'],
  },
  {
    id: 3, title: 'ELECTRICAL INSTALLATIONS', image: '/shivgroup/images/project/project-3.jpg',
    description: 'Reliable MEP systems built for safety, performance, and efficiency.',
    items: ['Electrical Wiring & Installation', 'Plumbing & Drainage Systems', 'HVAC (Heating, Ventilation)', 'Firefighting & Safety Systems', 'Solar & Energy Solutions'],
  },
  {
    id: 4, title: 'CRAFTSMANSHIP & FINISHING', image: '/shivgroup/images/project/project-2.jpg',
    description: 'Precision finishing details that complete each space with quality craftsmanship.',
    items: ['Plastering, Painting & Decor', 'Tiling, Flooring & Ceilings', 'Carpentry & Joinery', 'Glass & Aluminum Works', 'Interior Fixtures & Details'],
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ServiceManager = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddSubService, setShowAddSubService] = useState(false);
  const [subServiceItems, setSubServiceItems] = useState(['']);

  const addSubServiceField = () => setSubServiceItems([...subServiceItems, '']);
  const removeSubServiceField = (idx) => setSubServiceItems(subServiceItems.filter((_, i) => i !== idx));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <p className="text-slate-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage all services displayed on the Services page</p>
        <button onClick={() => setShowAddService(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
          <HiOutlinePlus className="w-4 h-4" /> Add Service
        </button>
      </motion.div>

      <motion.div variants={item} className="space-y-3">
        {servicesData.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-sm transition-all">
            <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}>
              <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img src={service.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800">{service.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{service.description}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{service.items.length} sub-services</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
                {expandedId === service.id ? <HiOutlineChevronUp className="w-4 h-4 text-slate-400" /> : <HiOutlineChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {expandedId === service.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-slate-100 px-5 py-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sub-Services</p>
                  <button onClick={() => setShowAddSubService(true)} className="flex items-center gap-1 text-xs font-semibold text-[#AB2F2F] hover:underline">
                    <HiOutlinePlus className="w-3.5 h-3.5" /> Add Sub-Service
                  </button>
                </div>
                <div className="space-y-2">
                  {service.items.map((subItem, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
                        <span className="text-sm text-slate-700 font-medium">{subItem}</span>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Add Service Modal */}
      <Modal isOpen={showAddService} onClose={() => { setShowAddService(false); setSubServiceItems(['']); }} title="Add New Service" subtitle="Create a new service category" size="lg">
        <form onSubmit={(e) => { e.preventDefault(); setShowAddService(false); setSubServiceItems(['']); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Service Title" required placeholder="e.g. CONSTRUCTION SOLUTIONS" />
            <FormInput label="Short Description" required placeholder="Brief one-line description" />
          </div>
          <FormTextarea label="Full Description" rows={3} placeholder="Detailed description of this service category..." />
          <FormImageUpload label="Service Image" />

          {/* Dynamic Sub-Services */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sub-Services</label>
              <button type="button" onClick={addSubServiceField} className="flex items-center gap-1 text-xs font-semibold text-[#AB2F2F] hover:underline">
                <HiOutlinePlus className="w-3 h-3" /> Add More
              </button>
            </div>
            <div className="space-y-2">
              {subServiceItems.map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 w-5 text-center flex-shrink-0">{idx + 1}</span>
                  <input
                    type="text"
                    placeholder={`Sub-service name ${idx + 1}`}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                  />
                  {subServiceItems.length > 1 && (
                    <button type="button" onClick={() => removeSubServiceField(idx)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0">
                      <HiOutlineTrash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <FormActions onCancel={() => { setShowAddService(false); setSubServiceItems(['']); }} submitText="Add Service" />
        </form>
      </Modal>

      {/* Add Sub-Service Modal */}
      <Modal isOpen={showAddSubService} onClose={() => setShowAddSubService(false)} title="Add Sub-Service" subtitle="Add a new sub-service item" size="sm">
        <form onSubmit={(e) => { e.preventDefault(); setShowAddSubService(false); }} className="space-y-4">
          <FormInput label="Sub-Service Name" required placeholder="e.g. Residential Construction" />
          <FormActions onCancel={() => setShowAddSubService(false)} submitText="Add Sub-Service" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default ServiceManager;
