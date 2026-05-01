import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormActions, FormSelect } from '../components/Modal';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ProjectCategoryManager = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('1');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('project-categories');
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setName(category.category_name);
    setStatus(category.status.toString());
    setShowAdd(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await api.get(`delete-project-categories/${id}`);
      alert(res?.data?.message || 'Category deleted successfully.');
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete category.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim()) {
      setFormError('Category Name is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        category_name: name.trim(),
        status: status,
      };
      if (editId) payload.edit = editId;

      const res = await api.post('add-project-categories', payload);
      alert(res?.data?.message || 'Category saved successfully.');
      setShowAdd(false);
      fetchCategories();
      resetForm();
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
      setFormError(firstValidationError || err?.response?.data?.message || 'Failed to save category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName('');
    setStatus('1');
    setFormError('');
  };

  const closeModal = () => {
    setShowAdd(false);
    resetForm();
  };

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
          {isLoading ? (
            <div className="p-8 text-center text-sm font-semibold text-slate-500">Loading Categories...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Category Name</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? categories.map((category) => (
                  <tr key={category.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{category.category_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${category.status == 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {category.status == 1 ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(category)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#AB2F2F] hover:border-[#AB2F2F]/30 hover:bg-red-50 transition-all">
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(category.id)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-500/30 hover:bg-red-50 transition-all">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-sm font-semibold text-slate-500">No project categories found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Add/Edit Category Modal */}
      <Modal isOpen={showAdd} onClose={closeModal} title={editId ? "Edit Category" : "Add New Category"} subtitle={editId ? "Update your project category details" : "Add a new project category to your portfolio"} size="md">
        <form onSubmit={handleSubmit} className="space-y-5">
          {formError && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
              {formError}
            </div>
          )}
          <FormInput 
            label="Category Name" 
            required 
            placeholder="e.g. Commercial" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <FormSelect 
            label="Status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: '1', label: 'Active' },
              { value: '0', label: 'Draft' },
            ]} 
          />
          <FormActions 
            onCancel={closeModal} 
            submitText={isSubmitting ? 'Saving...' : (editId ? "Update Category" : "Save Category")} 
          />
        </form>
      </Modal>
    </motion.div>
  );
};

export default ProjectCategoryManager;
