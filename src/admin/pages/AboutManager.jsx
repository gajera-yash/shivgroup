/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions, FormSelect } from '../components/Modal';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const AboutManager = () => {
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showEditMilestone, setShowEditMilestone] = useState(false);

  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [editError, setEditError] = useState('');

  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [images, setImages] = useState([null, null, null]);

  const [editingId, setEditingId] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('active');
  const [editImages, setEditImages] = useState([null, null, null]);
  const [editImagePreviews, setEditImagePreviews] = useState([null, null, null]);

  const mapItem = (a) => {
    // લારાવેલ JSON માં 'about_us_images' કી આવે છે
    const imgList = a?.about_us_images || [];

    return {
      id: a?.id,
      year: a?.year || '',
      title: a?.title || '',
      description: a?.description || '',
      status: Number(a?.status) === 1,
      image: imgList.length > 0 ? imgList[0]?.about_image : null,
      imagesCount: imgList.length,
    };
  };

  const getErrorMessage = (err, fallback) => {
    const apiErrors = err?.response?.data?.errors;
    const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
    return firstValidationError || err?.response?.data?.message || fallback;
  };

  const fetchMilestones = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('about-us');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setMilestones(list.map(mapItem));
    } catch {
      setMilestones([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchMilestones();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetAddForm = () => {
    setYear('');
    setTitle('');
    setDescription('');
    setStatus('active');
    setImages([null, null, null]);
    setFormError('');
  };

  const resetEditForm = () => {
    setEditingId('');
    setEditYear('');
    setEditTitle('');
    setEditDescription('');
    setEditStatus('active');
    setEditImages([null, null, null]);
    setEditImagePreviews([null, null, null]);
    setEditError('');
  };

  const setAddImageAt = (index, file) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const setEditImageAt = (index, file) => {
    setEditImages((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!year.toString().trim() || !title.trim() || !description.trim()) {
      setFormError('Year, Title and Description are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('year', year.toString().trim());
      fd.append('title', title.trim());
      fd.append('description', description.trim());
      fd.append('status', status === 'active' ? '1' : '0');
      images.filter(Boolean).forEach((img) => fd.append('about_image[]', img));

      const res = await api.post('add-about-us', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const created = mapItem(res?.data?.data || {});
      setMilestones((prev) => [created, ...prev.filter((m) => m.id !== created.id)]);
      alert(res?.data?.message || 'Milestone added successfully.');
      setShowAddMilestone(false);
      resetAddForm();
    } catch (err) {
      setFormError(getErrorMessage(err, 'Failed to add milestone.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEdit = async (id) => {
    setEditError('');
    setEditImages([null, null, null]);
    try {
      const res = await api.get(`fetch-about-us/${id}`);
      const a = res?.data?.data;
      setEditingId(id);
      setEditYear(a?.year || '');
      setEditTitle(a?.title || '');
      setEditDescription(a?.description || '');
      setEditStatus(Number(a?.status) === 1 ? 'active' : 'draft');
      const list = Array.isArray(a?.about_us_images) ? a.about_us_images : [];
      setEditImagePreviews([
        list[0]?.about_image || null,
        list[1]?.about_image || null,
        list[2]?.about_image || null,
      ]);
      setShowEditMilestone(true);
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to fetch milestone details.'));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditError('');

    if (!editYear.toString().trim() || !editTitle.trim() || !editDescription.trim()) {
      setEditError('Year, Title and Description are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('edit', editingId);
      fd.append('year', editYear.toString().trim());
      fd.append('title', editTitle.trim());
      fd.append('description', editDescription.trim());
      fd.append('status', editStatus === 'active' ? '1' : '0');
      editImages.forEach((img, index) => {
        if (img) {
          // આનાથી લારાવેલને 'about_image_0', 'about_image_1' એવી રીતે મળશે
          fd.append(`about_image_${index}`, img);
        }
      });

      const res = await api.post('add-about-us', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = mapItem(res?.data?.data || {});
      setMilestones((prev) => prev.map((m) => (m.id === editingId ? updated : m)));
      alert(res?.data?.message || 'Milestone updated successfully.');
      setShowEditMilestone(false);
      resetEditForm();
    } catch (err) {
      setEditError(getErrorMessage(err, 'Failed to update milestone.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this milestone?')) return;
    try {
      const res = await api.get(`delete-about-us/${id}`);
      setMilestones((prev) => prev.filter((m) => m.id !== id));
      alert(res?.data?.message || 'Milestone deleted successfully.');
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to delete milestone.'));
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
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
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading milestones...</p>
          ) : milestones.length === 0 ? (
            <p className="text-sm text-slate-500">No milestones found.</p>
          ) : milestones.map((story) => (
            <div key={story.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#AB2F2F] to-[#c93e3e] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">{story.year}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800">{story.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{story.description}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{story.imagesCount} images attached</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => openEdit(story.id)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><HiOutlinePencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(story.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={showAddMilestone} onClose={() => setShowAddMilestone(false)} title="Add Milestone" subtitle="Add a new year milestone to the Our Story section" size="lg">
        <form onSubmit={handleAdd} className="space-y-4">
          {formError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{formError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Year" required placeholder="e.g. 2005" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            <FormInput label="Title" required placeholder="e.g. Major Expansion" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <FormTextarea label="Description" required rows={4} placeholder="Describe this milestone year in detail..." value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormImageUpload label="Image 1 " onImageSelect={(file) => setAddImageAt(0, file)} />
            <FormImageUpload label="Image 2 " onImageSelect={(file) => setAddImageAt(1, file)} />
            <FormImageUpload label="Image 3 " onImageSelect={(file) => setAddImageAt(2, file)} />
          </div>
          <FormSelect label="Status" value={status} onChange={(e) => setStatus(e.target.value)} options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]} />
          <FormActions onCancel={() => { setShowAddMilestone(false); resetAddForm(); }} submitText="Add Milestone" isLoading={isSubmitting} />
        </form>
      </Modal>

      <Modal isOpen={showEditMilestone} onClose={() => { setShowEditMilestone(false); resetEditForm(); }} title="Edit Milestone" subtitle="Update year milestone details" size="lg">
        <form onSubmit={handleEdit} className="space-y-4">
          {editError && <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">{editError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Year" required type="number" value={editYear} onChange={(e) => setEditYear(e.target.value)} />
            <FormInput label="Title" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </div>
          <FormTextarea label="Description" required rows={4} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormImageUpload label="Image 1 " initialPreview={editImagePreviews[0]} onImageSelect={(file) => setEditImageAt(0, file)} />
            <FormImageUpload label="Image 2 " initialPreview={editImagePreviews[1]} onImageSelect={(file) => setEditImageAt(1, file)} />
            <FormImageUpload label="Image 3 " initialPreview={editImagePreviews[2]} onImageSelect={(file) => setEditImageAt(2, file)} />
          </div>
          <FormSelect label="Status" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} options={[{ value: 'active', label: 'Active' }, { value: 'draft', label: 'Draft' }]} />
          <FormActions onCancel={() => { setShowEditMilestone(false); resetEditForm(); }} submitText="Update Milestone" isLoading={isSubmitting} />
        </form>
      </Modal>
    </motion.div>
  );
};

export default AboutManager;
