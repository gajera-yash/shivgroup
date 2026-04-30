import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormActions, FormSelect } from '../components/Modal';

const categoriesData = [
  { id: 1, name: 'Commercial', status: 'Active' },
  { id: 2, name: 'Residential', status: 'Active' },
  { id: 3, name: 'Infrastructure', status: 'Active' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ProjectCategoryManager = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Project Categories</h2>
          <p className="text-sm text-slate-500 mt-1">Manage categories for your projects portfolio.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all self-start">
          <HiOutlinePlus className="w-4 h-4" /> Add Category
        </button>
      </motion.div>

      <motion.div variants={item} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.map((category) => (
                <tr key={category.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{category.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${category.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{category.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#AB2F2F] hover:border-[#AB2F2F]/30 hover:bg-red-50 transition-all">
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-500/30 hover:bg-red-50 transition-all">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Category Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Category" subtitle="Add a new project category to your portfolio" size="md">
        <form onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }} className="space-y-5">
          <FormInput label="Category Name" required placeholder="e.g. Commercial" />
          <FormSelect label="Status" options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
          ]} />
          <FormActions onCancel={() => setShowAdd(false)} submitText="Save Category" />
        </form>
      </Modal>
    </motion.div>
  );
};

export default ProjectCategoryManager;
