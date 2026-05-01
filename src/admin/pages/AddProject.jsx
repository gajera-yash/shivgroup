import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { FormInput, FormTextarea, FormImageUpload, FormSelect, FormTagInput } from '../components/Modal';
import api from '../../utils/api';

const AddProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Categories list for dropdown
  const [categories, setCategories] = useState([]);

  // Form State
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('1');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Dynamic arrays
  const [projectPoints, setProjectPoints] = useState([{ id: null, point: '' }]);
  const [projectSections, setProjectSections] = useState([{ id: null, title: '', description: '', imageFile: null, existingImage: null }]);

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('project-categories');
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjectDetails = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`fetch-projects/${id}`);
      const data = res?.data?.data;
      if (data) {
        setCategoryId(data.project_category_id?.toString() || '');
        setTitle(data.title || '');
        setStatus(data.status?.toString() || '1');
        setTags(data.tags || []);
        setDescription(data.description || '');
        setMapLink(data.map_link || '');
        setImagePreview(data.project_image || null);

        if (data.points?.length > 0) {
          setProjectPoints(data.points.map(p => ({ id: p.id, point: p.point })));
        } else {
          setProjectPoints([{ id: null, point: '' }]);
        }
        
        if (data.sections?.length > 0) {
          setProjectSections(data.sections.map(s => ({
            id: s.id,
            title: s.section_title,
            description: s.section_content,
            imageFile: null,
            existingImage: s.section_image
          })));
        } else {
          setProjectSections([{ id: null, title: '', description: '', imageFile: null, existingImage: null }]);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch project details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = (newTag) => {
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddPoint = () => setProjectPoints([...projectPoints, { id: null, point: '' }]);
  const handlePointChange = (index, value) => {
    const newPoints = [...projectPoints];
    newPoints[index].point = value;
    setProjectPoints(newPoints);
  };
  const handleRemovePoint = (index) => {
    if (projectPoints.length > 1) {
      setProjectPoints(projectPoints.filter((_, i) => i !== index));
    }
  };

  const handleAddSection = () => setProjectSections([...projectSections, { id: null, title: '', description: '', imageFile: null, existingImage: null }]);
  const handleSectionChange = (index, field, value) => {
    const newSections = [...projectSections];
    newSections[index][field] = value;
    setProjectSections(newSections);
  };
  const handleRemoveSection = (index) => {
    if (projectSections.length > 1) {
      setProjectSections(projectSections.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend Validations
    if (!title.trim() || !categoryId) {
      setError('Project Title and Category are required.');
      return;
    }
    if (!isEditMode && !imageFile) {
      setError('Project main image is required.');
      return;
    }
    if (tags.length === 0) {
      setError('At least one project tag is required.');
      return;
    }
    if (!description.trim()) {
      setError('Project description is required.');
      return;
    }
    if (!mapLink.trim()) {
      setError('Google Maps link is required.');
      return;
    }
    if (projectPoints.some(p => !p.point.trim())) {
      setError('All project points must be filled.');
      return;
    }
    if (projectSections.some(s => !s.title.trim() || !s.description.trim() || (!s.imageFile && !s.existingImage))) {
      setError('All project sections (title, description, and image) are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      if (isEditMode) fd.append('edit', id);
      fd.append('project_category_id', categoryId);
      fd.append('title', title.trim());
      fd.append('status', status);
      fd.append('description', description.trim());
      fd.append('map_link', mapLink.trim());
      fd.append('tags', JSON.stringify(tags));

      if (imageFile) {
        fd.append('project_image', imageFile);
      }

      // Project Points
      projectPoints.forEach((p, idx) => {
        if (p.id) fd.append(`project_points[${idx}][id]`, p.id);
        fd.append(`project_points[${idx}][point]`, p.point.trim());
      });

      // Project Sections
      projectSections.forEach((s, idx) => {
        if (s.id) fd.append(`project_sections[${idx}][id]`, s.id);
        fd.append(`project_sections[${idx}][section_title]`, s.title.trim());
        fd.append(`project_sections[${idx}][section_content]`, s.description.trim());
        if (s.imageFile) fd.append(`project_sections[${idx}][section_image]`, s.imageFile);
      });

      const res = await api.post('add-projects', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(res?.data?.message || `Project ${isEditMode ? 'updated' : 'added'} successfully.`);
      navigate('/admin/projects');
    } catch (err) {
      if (err?.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError(err?.response?.data?.message || 'Failed to save project.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading project details...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/projects')}
          type="button"
          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </h2>
          <p className="text-sm text-slate-500">Create a comprehensive project portfolio entry.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {error && <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold">{error}</div>}

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Basic Information */}
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Basic Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                <FormInput 
                  label="Project Title" 
                  required 
                  placeholder="e.g. HARBORLINE STUDIOS" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormSelect 
                    label="Project Category" 
                    required 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    options={[
                      { value: '', label: 'Select category' },
                      ...categories.map(c => ({ value: c.id.toString(), label: c.category_name }))
                    ]} 
                  />
                  <FormSelect 
                    label="Status" 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                      { value: '1', label: 'Published' },
                      { value: '0', label: 'Draft' },
                    ]} 
                  />
                </div>
                <FormTagInput 
                  label="Project Tags (at least one) *" 
                  tags={tags} 
                  onAddTag={handleAddTag} 
                  onRemoveTag={handleRemoveTag}
                  placeholder="e.g. Modern, Eco-friendly"
                />
              </div>
              <div className="lg:col-span-1 h-full flex flex-col justify-start">
                <FormImageUpload 
                  label={`Project Main Image ${isEditMode ? '(optional)' : '*'}`}
                  required={!isEditMode}
                  initialPreview={imagePreview}
                  onImageSelect={(file) => setImageFile(file)}
                />
              </div>
            </div>
          </div>

          {/* Description & Location */}
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Description & Map</h3>
            <div className="space-y-5">
              <FormTextarea 
                label="Description" 
                required
                rows={4} 
                placeholder="Describe the project details, scope, and achievements..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormInput 
                label="Google Maps Embed URL" 
                required
                placeholder="https://maps.google.com/..." 
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
              />
            </div>
          </div>
          
          {/* Project Details List */}
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Project Points *</h3>
                <p className="text-xs text-slate-500 mt-0.5">Add key features or bullet points for the project.</p>
              </div>
              <button type="button" onClick={handleAddPoint} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                <HiOutlinePlus className="w-3.5 h-3.5" /> Add Point
              </button>
            </div>
            <div className="space-y-3">
              {projectPoints.map((p, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      value={p.point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      placeholder={`Detail point ${index + 1}`}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>
                  {projectPoints.length > 1 && (
                    <button type="button" onClick={() => handleRemovePoint(index)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Sections Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Project Sections *</h3>
            <p className="text-sm text-slate-500 mt-1">Manage detailed sections to build your project page.</p>
          </div>
          <button type="button" onClick={handleAddSection} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold rounded-xl transition-all shadow-md shadow-slate-200">
            <HiOutlinePlus className="w-4 h-4" /> Add Section
          </button>
        </div>

        {/* Project Sections Cards */}
        <div className="space-y-6">
          {projectSections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 relative group">
              {projectSections.length > 1 && (
                <button type="button" onClick={() => handleRemoveSection(index)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              )}
              <h5 className="text-xs font-bold text-slate-500 mb-5 uppercase tracking-wider">Section {index + 1}</h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Section Title *</label>
                    <input
                      type="text"
                      required
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                      placeholder="e.g. A MID-SCALE COMMERCIAL BUILDING..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Section Description *</label>
                    <textarea
                      value={section.description}
                      required
                      onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                      rows={5}
                      placeholder="Describe this section..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] resize-none transition-all"
                    />
                  </div>
                </div>
                <div className="h-full flex flex-col justify-start">
                  <FormImageUpload 
                    label="Section Image *" 
                    required
                    initialPreview={section.existingImage}
                    onImageSelect={(file) => handleSectionChange(index, 'imageFile', file)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProject;
