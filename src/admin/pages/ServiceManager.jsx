import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Modal, { FormInput, FormActions } from '../components/Modal';

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
  const [showAddSubService, setShowAddSubService] = useState(false);
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <p className="text-slate-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage all services displayed on the Services page</p>
        <Link to="/admin/services/add" className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
          <HiOutlinePlus className="w-4 h-4" /> Add Service
        </Link>
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
