import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { FormInput, FormTextarea, FormImageUpload, FormActions, FormSelect } from '../components/Modal';

const AddProject = () => {
  const navigate = useNavigate();

  // Dynamic form state
  const [projectDetails, setProjectDetails] = useState(['']);
  const [projectSections, setProjectSections] = useState([{ title: '', description: '', image: null }]);

  const handleAddDetail = () => setProjectDetails([...projectDetails, '']);
  const handleDetailChange = (index, value) => {
    const newDetails = [...projectDetails];
    newDetails[index] = value;
    setProjectDetails(newDetails);
  };
  const handleRemoveDetail = (index) => {
    if (projectDetails.length > 1) {
      setProjectDetails(projectDetails.filter((_, i) => i !== index));
    }
  };

  const handleAddSection = () => setProjectSections([...projectSections, { title: '', description: '', image: null }]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    navigate('/admin/projects');
  };

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
          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Add New Project</h2>
          <p className="text-sm text-slate-500">Create a comprehensive project portfolio entry.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Basic Information */}
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Basic Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                <FormInput label="Project Title" required placeholder="e.g. HARBORLINE STUDIOS" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormSelect label="Category" required options={[
                    { value: '', label: 'Select category' },
                    { value: 'Commercial', label: 'Commercial' },
                    { value: 'Residential', label: 'Residential' },
                    { value: 'Infrastructure', label: 'Infrastructure' },
                  ]} />
                  <FormSelect label="Status" options={[
                    { value: 'Published', label: 'Published' },
                    { value: 'Draft', label: 'Draft' },
                  ]} />
                </div>
                <FormInput label="Tags" placeholder="e.g. Modern, Eco-friendly, High-rise (comma separated)" />
              </div>
              <div className="lg:col-span-1 h-full flex flex-col justify-start">
                <FormImageUpload label="Project Main Image" />
              </div>
            </div>
          </div>

          {/* Description & Location */}
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-5 border-b border-slate-100 pb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Description & Map</h3>
            <div className="space-y-5">
              <FormTextarea label="Description" rows={4} placeholder="Describe the project details, scope, and achievements..." />
              <FormInput label="Google Maps Embed URL" placeholder="https://maps.google.com/..." />
            </div>
          </div>
          
          {/* Project Details List */}
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Project Details List</h3>
                <p className="text-xs text-slate-500 mt-0.5">Add key features or bullet points for the project.</p>
              </div>
              <button type="button" onClick={handleAddDetail} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                <HiOutlinePlus className="w-3.5 h-3.5" /> Add Detail
              </button>
            </div>
            <div className="space-y-3">
              {projectDetails.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleDetailChange(index, e.target.value)}
                      placeholder={`Detail point ${index + 1}`}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>
                  {projectDetails.length > 1 && (
                    <button type="button" onClick={() => handleRemoveDetail(index)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
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
            <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Project Sections</h3>
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
                        <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Section Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                          placeholder="e.g. A MID-SCALE COMMERCIAL BUILDING..."
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Section Description</label>
                        <textarea
                          value={section.description}
                          onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                          rows={5}
                          placeholder="Describe this section..."
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] resize-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="h-full flex flex-col justify-start">
                      <FormImageUpload 
                        label="Section Image" 
                        onImageSelect={(file) => handleSectionChange(index, 'image', file)} 
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
            className="px-6 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Save Project
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProject;
