import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Modal, { FormInput, FormTextarea, FormImageUpload, FormActions, FormSelect } from '../components/Modal';
import api from '../../utils/api';

const heroSlides = [];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSlides, setIsLoadingSlides] = useState(false);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideStatus, setSlideStatus] = useState('active');
  const [slideImage, setSlideImage] = useState(null);
  const [formError, setFormError] = useState('');
  const [showEditSlide, setShowEditSlide] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editStatus, setEditStatus] = useState('active');
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editError, setEditError] = useState('');

  const mapBannerToSlide = (banner) => ({
    id: banner?.id,
    title: banner?.title || '',
    subtitle: banner?.description || '',
    image: banner?.banner_image || '/shivgroup/images/hero section.webp',
    active: Number(banner?.status) === 1,
  });

  const fetchSlides = async () => {
    setIsLoadingSlides(true);
    try {
      const res = await api.get('/home-banners');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setSlides(list.map(mapBannerToSlide));
    } catch {
      // keep silent fallback
    } finally {
      setIsLoadingSlides(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const resetAddSlideForm = () => {
    setSlideTitle('');
    setSlideSubtitle('');
    setSlideStatus('active');
    setSlideImage(null);
    setFormError('');
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!slideTitle.trim()) {
      setFormError('Slide title is required.');
      return;
    }

    if (!slideImage) {
      setFormError('Background image is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', slideTitle.trim());
      formData.append('description', slideSubtitle.trim());
      formData.append('banner_image', slideImage);
      formData.append('status', slideStatus === 'active' ? '1' : '0');

      const res = await api.post('/add-home-banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const created = res?.data?.data;
      const createdSlide = {
        id: created?.id || Date.now(),
        title: created?.title || slideTitle.trim(),
        subtitle: created?.description || slideSubtitle.trim(),
        image: created?.banner_image || URL.createObjectURL(slideImage),
        active: Number(created?.status ?? (slideStatus === 'active' ? 1 : 0)) === 1,
      };

      setSlides((prev) => [createdSlide, ...prev.filter((s) => s.id !== createdSlide.id)]);
      alert(res?.data?.message || 'Slide added successfully.');
      setShowAddSlide(false);
      resetAddSlideForm();
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      const firstValidationError = apiErrors
        ? Object.values(apiErrors)?.[0]?.[0]
        : null;

      const message = firstValidationError || err?.response?.data?.message || 'Failed to add slide.';
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditSlide = async (slideId) => {
    setEditError('');
    setEditImage(null);
    try {
      const res = await api.get(`/fetch-home-banners/${slideId}`);
      const banner = res?.data?.data;
      if (!banner) {
        setEditError('Slide not found.');
        return;
      }

      setEditingSlideId(slideId);
      setEditTitle(banner?.title || '');
      setEditSubtitle(banner?.description || '');
      setEditStatus(Number(banner?.status) === 1 ? 'active' : 'draft');
      setEditImagePreview(banner?.banner_image || null);
      setShowEditSlide(true);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to fetch slide details.');
    }
  };

  const resetEditForm = () => {
    setEditingSlideId('');
    setEditTitle('');
    setEditSubtitle('');
    setEditStatus('active');
    setEditImage(null);
    setEditImagePreview(null);
    setEditError('');
  };

  const handleEditSlide = async (e) => {
    e.preventDefault();
    setEditError('');

    if (!editTitle.trim()) {
      setEditError('Slide title is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('edit', editingSlideId);
      formData.append('title', editTitle.trim());
      formData.append('description', editSubtitle.trim());
      formData.append('status', editStatus === 'active' ? '1' : '0');
      if (editImage) {
        formData.append('banner_image', editImage);
      }

      const res = await api.post('/add-home-banners', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = res?.data?.data;
      const updatedSlide = {
        id: updated?.id || editingSlideId,
        title: updated?.title || editTitle.trim(),
        subtitle: updated?.description || editSubtitle.trim(),
        image: updated?.banner_image || slides.find((s) => s.id === editingSlideId)?.image,
        active: Number(updated?.status ?? (editStatus === 'active' ? 1 : 0)) === 1,
      };

      setSlides((prev) => prev.map((s) => (s.id === editingSlideId ? updatedSlide : s)));
      alert(res?.data?.message || 'Slide updated successfully.');
      setShowEditSlide(false);
      resetEditForm();
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
      setEditError(firstValidationError || err?.response?.data?.message || 'Failed to update slide.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    const ok = window.confirm('Are you sure you want to delete this slide?');
    if (!ok) return;

    try {
      const res = await api.get(`/delete-home-banners/${slideId}`);
      setSlides((prev) => prev.filter((s) => s.id !== slideId));
      alert(res?.data?.message || 'Slide deleted successfully.');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete slide.');
    }
  };

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
          {isLoadingSlides ? (
            <p className="text-sm text-slate-500">Loading slides...</p>
          ) : slides.length === 0 ? (
            <p className="text-sm text-slate-500">No slides found.</p>
          ) : slides.map((slide) => (
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
                <button
                  onClick={() => openEditSlide(slide.id)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Hero Slide Modal */}
      <Modal
        isOpen={showAddSlide}
        onClose={() => { setShowAddSlide(false); resetAddSlideForm(); }}
        title="Add Hero Slide"
        subtitle="Create a new hero banner slide"
        size="md"
      >
        <form onSubmit={handleAddSlide} className="space-y-4">
          {formError && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
              {formError}
            </div>
          )}
          <FormInput
            label="Slide Title"
            required
            placeholder="e.g. We Build The Future"
            value={slideTitle}
            onChange={(e) => setSlideTitle(e.target.value)}
          />
          <FormTextarea
            label="Subtitle Text"
            placeholder="e.g. FROM CONCEPT TO COMPLETION"
            rows={3}
            value={slideSubtitle}
            onChange={(e) => setSlideSubtitle(e.target.value)}
          />
          <FormImageUpload label="Background Image" onImageSelect={setSlideImage} />
          <FormSelect
            label="Status"
            value={slideStatus}
            onChange={(e) => setSlideStatus(e.target.value)}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
          <FormActions
            onCancel={() => { setShowAddSlide(false); resetAddSlideForm(); }}
            submitText="Add Slide"
            isLoading={isSubmitting}
          />
        </form>
      </Modal>

      <Modal
        isOpen={showEditSlide}
        onClose={() => { setShowEditSlide(false); resetEditForm(); }}
        title="Edit Hero Slide"
        subtitle="Update hero banner slide"
        size="md"
      >
        <form onSubmit={handleEditSlide} className="space-y-4">
          {editError && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
              {editError}
            </div>
          )}
          <FormInput
            label="Slide Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <FormTextarea
            label="Subtitle Text"
            rows={3}
            value={editSubtitle}
            onChange={(e) => setEditSubtitle(e.target.value)}
          />
          <FormImageUpload
            label="Background Image (optional)"
            initialPreview={editImagePreview}
            onImageSelect={setEditImage}
          />
          <FormSelect
            label="Status"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
          <FormActions
            onCancel={() => { setShowEditSlide(false); resetEditForm(); }}
            submitText="Update Slide"
            isLoading={isSubmitting}
          />
        </form>
      </Modal>
    </motion.div>
  );
};

export default HomepageManager;
