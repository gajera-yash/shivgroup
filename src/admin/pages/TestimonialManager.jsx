import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions, FormSelect } from '../components/Modal';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const TestimonialManager = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [quote, setQuote] = useState('');
  const [status, setStatus] = useState('active');
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editQuote, setEditQuote] = useState('');
  const [editStatus, setEditStatus] = useState('active');
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editError, setEditError] = useState('');

  const mapItem = (t) => ({
    id: t?.id,
    name: t?.name || '',
    role: t?.position || '',
    text: t?.quote || '',
    image: t?.testimonial_image || t?.image || null,
    active: Number(t?.status) === 1,
    avatar: (t?.name || 'U').trim().charAt(0).toUpperCase(),
  });

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('testimonials');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setTestimonials(list.map(mapItem));
    } catch {
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetAddForm = () => {
    setName('');
    setPosition('');
    setQuote('');
    setStatus('active');
    setImage(null);
    setFormError('');
  };

  const resetEditForm = () => {
    setEditingId('');
    setEditName('');
    setEditPosition('');
    setEditQuote('');
    setEditStatus('active');
    setEditImage(null);
    setEditImagePreview(null);
    setEditError('');
  };

  const getErrorMessage = (err, fallback) => {
    const apiErrors = err?.response?.data?.errors;
    const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
    return firstValidationError || err?.response?.data?.message || fallback;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !position.trim() || !quote.trim()) {
      setFormError('Name, Role/Company and Quote are required.');
      return;
    }
    if (!image) {
      setFormError('Client Photo is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', name.trim());
      fd.append('position', position.trim());
      fd.append('quote', quote.trim());
      fd.append('testimonial_image', image);
      fd.append('status', status === 'active' ? '1' : '0');

      const res = await api.post('add-testimonials', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const created = mapItem(res?.data?.data || {});
      setTestimonials((prev) => [created, ...prev.filter((t) => t.id !== created.id)]);
      alert(res?.data?.message || 'Testimonial added successfully.');
      setShowAdd(false);
      resetAddForm();
    } catch (err) {
      setFormError(getErrorMessage(err, 'Failed to add testimonial.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEdit = async (id) => {
    setEditError('');
    setEditImage(null);
    try {
      const res = await api.get(`fetch-testimonials/${id}`);
      const t = res?.data?.data;
      setEditingId(id);
      setEditName(t?.name || '');
      setEditPosition(t?.position || '');
      setEditQuote(t?.quote || '');
      setEditStatus(Number(t?.status) === 1 ? 'active' : 'draft');
      setEditImagePreview(t?.testimonial_image || t?.image || null);
      setShowEdit(true);
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to fetch testimonial details.'));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditError('');

    if (!editName.trim() || !editPosition.trim() || !editQuote.trim()) {
      setEditError('Name, Role/Company and Quote are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('edit', editingId);
      fd.append('name', editName.trim());
      fd.append('position', editPosition.trim());
      fd.append('quote', editQuote.trim());
      fd.append('status', editStatus === 'active' ? '1' : '0');
      if (editImage) fd.append('testimonial_image', editImage);

      const res = await api.post('add-testimonials', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = mapItem(res?.data?.data || {});
      setTestimonials((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
      alert(res?.data?.message || 'Testimonial updated successfully.');
      setShowEdit(false);
      resetEditForm();
    } catch (err) {
      setEditError(getErrorMessage(err, 'Failed to update testimonial.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await api.get(`delete-testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      alert(res?.data?.message || 'Testimonial deleted successfully.');
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to delete testimonial.'));
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <p className="text-slate-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage client testimonials displayed on the homepage</p>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
          <HiOutlinePlus className="w-4 h-4" /> Add Testimonial
        </button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-sm text-slate-500">No testimonials found.</p>
        ) : testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-slate-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AB2F2F] to-[#e04848] flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t.id)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-3">{t.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Add Testimonial Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Testimonial" subtitle="Add a new client testimonial" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          {formError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{formError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Client Name" required placeholder="e.g. Rajesh Patel" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput label="Role / Company" required placeholder="e.g. CEO, BuildCorp" value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <FormTextarea label="Testimonial Quote" required rows={4} placeholder="Write the client's testimonial here..." value={quote} onChange={(e) => setQuote(e.target.value)} />
          <FormImageUpload label="Client Photo" onImageSelect={setImage} />
          <FormSelect
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]}
          />
          <FormActions onCancel={() => { setShowAdd(false); resetAddForm(); }} submitText="Add Testimonial" isLoading={isSubmitting} />
        </form>
      </Modal>

      {/* Edit Testimonial Modal */}
      <Modal isOpen={showEdit} onClose={() => { setShowEdit(false); resetEditForm(); }} title="Edit Testimonial" subtitle="Update client testimonial" size="md">
        <form onSubmit={handleEdit} className="space-y-4">
          {editError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{editError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Client Name" required value={editName} onChange={(e) => setEditName(e.target.value)} />
            <FormInput label="Role / Company" required value={editPosition} onChange={(e) => setEditPosition(e.target.value)} />
          </div>
          <FormTextarea label="Testimonial Quote" required rows={4} value={editQuote} onChange={(e) => setEditQuote(e.target.value)} />
          <FormImageUpload label="Client Photo (Optional)" initialPreview={editImagePreview} onImageSelect={setEditImage} />
          <FormSelect
            label="Status"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]}
          />
          <FormActions onCancel={() => { setShowEdit(false); resetEditForm(); }} submitText="Update Testimonial" isLoading={isSubmitting} />
        </form>
      </Modal>
    </motion.div>
  );
};

export default TestimonialManager;
