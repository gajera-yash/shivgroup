import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { FormInput, FormTextarea } from '../components/Modal';
import api from '../../utils/api';

const AddService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Basic Info
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [status, setStatus] = useState('1');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Dynamic Lists
  const [includedItems, setIncludedItems] = useState([{ id: null, text: '' }]);
  const [rulesItems, setRulesItems] = useState([{ id: null, text: '' }]);
  const [brochures, setBrochures] = useState([{ id: null, file: null, existingUrl: null }]);
  const [workingProcess, setWorkingProcess] = useState([
    { id: null, title: '', description: '', file: null, existingUrl: null }
  ]);

  useEffect(() => {
    if (isEditMode) {
      fetchServiceDetails();
    }
  }, [id]);

  const fetchServiceDetails = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`fetch-services/${id}`);
      const data = res?.data?.data;
      if (data) {
        setTitle(data.title || '');
        setShortDesc(data.short_description || '');
        setFullDesc(data.full_description || '');
        setStatus(data.status?.toString() || '1');
        setImagePreview(data.service_image || null);

        if (data.subservices?.length > 0) {
          setIncludedItems(data.subservices.map(s => ({ id: s.id, text: s.description })));
        } else {
          setIncludedItems([{ id: null, text: '' }]);
        }

        if (data.service_rules?.length > 0) {
          setRulesItems(data.service_rules.map(r => ({ id: r.id, text: r.rule })));
        } else {
          setRulesItems([{ id: null, text: '' }]);
        }

        if (data.brochures?.length > 0) {
          setBrochures(data.brochures.map(b => ({ id: b.id, file: null, existingUrl: b.brochure_file })));
        } else {
          setBrochures([{ id: null, file: null, existingUrl: null }]);
        }

        if (data.service_contents?.length > 0) {
          setWorkingProcess(data.service_contents.map(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
            file: null,
            existingUrl: c.content_image
          })));
        } else {
          setWorkingProcess([{ id: null, title: '', description: '', file: null, existingUrl: null }]);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch service details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // List Handlers
  const handleAddIncluded = () => setIncludedItems([...includedItems, { id: null, text: '' }]);
  const handleRemoveIncluded = (index) => setIncludedItems(includedItems.filter((_, i) => i !== index));
  const handleIncludedChange = (index, value) => {
    const newItems = [...includedItems];
    newItems[index].text = value;
    setIncludedItems(newItems);
  };

  const handleAddRule = () => setRulesItems([...rulesItems, { id: null, text: '' }]);
  const handleRemoveRule = (index) => setRulesItems(rulesItems.filter((_, i) => i !== index));
  const handleRuleChange = (index, value) => {
    const newItems = [...rulesItems];
    newItems[index].text = value;
    setRulesItems(newItems);
  };

  const handleAddBrochure = () => setBrochures([...brochures, { id: null, file: null, existingUrl: null }]);
  const handleRemoveBrochure = (index) => setBrochures(brochures.filter((_, i) => i !== index));
  const handleBrochureChange = (index, file) => {
    const newBrochures = [...brochures];
    newBrochures[index].file = file;
    setBrochures(newBrochures);
  };

  const handleAddProcess = () => setWorkingProcess([...workingProcess, { id: null, title: '', description: '', file: null, existingUrl: null }]);
  const handleRemoveProcess = (index) => setWorkingProcess(workingProcess.filter((_, i) => i !== index));
  const handleProcessChange = (index, field, value) => {
    const newProcess = [...workingProcess];
    newProcess[index][field] = value;
    if (field === 'file' && value) {
      newProcess[index].existingUrl = URL.createObjectURL(value);
    }
    setWorkingProcess(newProcess);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !shortDesc.trim() || !fullDesc.trim()) {
      setError('Title and Descriptions are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      if (isEditMode) fd.append('edit', id);
      fd.append('title', title.trim());
      fd.append('short_description', shortDesc.trim());
      fd.append('full_description', fullDesc.trim());
      fd.append('status', status);
      if (image) fd.append('service_image', image);

      // Subservices
      let includedIdx = 0;
      includedItems.forEach((sub) => {
        if (sub.text.trim()) {
          if (sub.id) fd.append(`subservice[${includedIdx}][id]`, sub.id);
          fd.append(`subservice[${includedIdx}][description]`, sub.text.trim());
          includedIdx++;
        }
      });

      // Rules
      let ruleIdx = 0;
      rulesItems.forEach((rule) => {
        if (rule.text.trim()) {
          if (rule.id) fd.append(`service_rules[${ruleIdx}][id]`, rule.id);
          fd.append(`service_rules[${ruleIdx}][rule]`, rule.text.trim());
          ruleIdx++;
        }
      });

      // Brochures
      let broIdx = 0;
      brochures.forEach((bro) => {
        if (bro.file || bro.id) {
          if (bro.id) fd.append(`brochures[${broIdx}][id]`, bro.id);
          if (bro.file) fd.append(`brochures[${broIdx}][brochure_file]`, bro.file);
          broIdx++;
        }
      });

      // Working Process
      let procIdx = 0;
      workingProcess.forEach((proc) => {
        if (proc.title.trim()) {
          if (proc.id) fd.append(`service_contents[${procIdx}][id]`, proc.id);
          fd.append(`service_contents[${procIdx}][title]`, proc.title.trim());
          fd.append(`service_contents[${procIdx}][description]`, proc.description.trim());
          if (proc.file) fd.append(`service_contents[${procIdx}][content_image]`, proc.file);
          procIdx++;
        }
      });

      const res = await api.post('add-services', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(res?.data?.message || `Service ${isEditMode ? 'updated' : 'added'} successfully.`);
      navigate('/admin/services');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading service details...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          type="button"
          onClick={() => navigate('/admin/services')}
          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {isEditMode ? 'Edit Service' : 'Add New Service'}
          </h2>
          <p className="text-sm text-slate-500">Create or update a comprehensive service page for your clients.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold">{error}</div>}

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Basic Information */}
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Basic Information</h3>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20"
                >
                  <option value="1">Active</option>
                  <option value="0">Draft</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                <FormInput label="Service Title" required placeholder="e.g. CONSTRUCTION SOLUTIONS" value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormTextarea label="Short Description" rows={2} required placeholder="Brief description to display on service cards..." value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                <FormTextarea label="Full Description" rows={5} placeholder="Detailed description for the main service page..." value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} />
              </div>
              <div className="lg:col-span-1 h-full flex flex-col justify-start">
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Service Main Image</label>
                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer min-h-[200px] overflow-hidden group">
                  {imagePreview ? (
                     <>
                       <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <span className="text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full">Change Image</span>
                       </div>
                     </
                  > ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-[#AB2F2F]/10 flex items-center justify-center mb-3 text-[#AB2F2F]">
                        <HiOutlinePlus className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">Click to upload</span>
                      <span className="text-[11px] text-slate-500 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Service Items (What's Included & Rules We Build By) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What's Included */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What's Included</h3>
                <button type="button" onClick={handleAddIncluded} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                  <HiOutlinePlus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleIncludedChange(index, e.target.value)}
                      placeholder={`Included item ${index + 1}`}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                    />
                    {includedItems.length > 1 && (
                      <button type="button" onClick={() => handleRemoveIncluded(index)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules We Build By */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Rules We Build By</h3>
                <button type="button" onClick={handleAddRule} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                  <HiOutlinePlus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {rulesItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleRuleChange(index, e.target.value)}
                      placeholder={`Rule ${index + 1}`}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                    />
                    {rulesItems.length > 1 && (
                      <button type="button" onClick={() => handleRemoveRule(index)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brochures Download Section */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-5 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Brochures / Documents</h3>
                <p className="text-xs text-slate-500 mt-0.5">Upload PDF or DOC files for clients to download.</p>
              </div>
              <button type="button" onClick={handleAddBrochure} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                <HiOutlinePlus className="w-3.5 h-3.5" /> Add Brochure
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brochures.map((brochure, index) => (
                <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                  {brochures.length > 1 && (
                    <button type="button" onClick={() => handleRemoveBrochure(index)} className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  )}
                  <div className="space-y-4 pr-6">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload File</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleBrochureChange(index, e.target.files[0])}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#AB2F2F]/10 file:text-[#AB2F2F] hover:file:bg-[#AB2F2F]/20 transition-all cursor-pointer"
                      />
                      {brochure.existingUrl && !brochure.file && (
                        <div className="mt-2 text-xs font-semibold flex gap-2 items-center">
                           <span className="text-emerald-600">Existing file uploaded.</span>
                           <a href={brochure.existingUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Working Process Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Working Process Steps</h3>
            <p className="text-sm text-slate-500 mt-1">Manage process steps like Consultation, Planning, Delivery.</p>
          </div>
          <button type="button" onClick={handleAddProcess} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold rounded-xl transition-all shadow-md shadow-slate-200">
            <HiOutlinePlus className="w-4 h-4" /> Add Step
          </button>
        </div>

        {/* Working Process Cards */}
        <div className="space-y-6">
          {workingProcess.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 relative group">
              {workingProcess.length > 1 && (
                <button type="button" onClick={() => handleRemoveProcess(index)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              )}
              <h5 className="text-xs font-bold text-slate-500 mb-5 uppercase tracking-wider">Step {String(index + 1).padStart(2, '0')}</h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Step Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleProcessChange(index, 'title', e.target.value)}
                      placeholder="e.g. CONSULTATION"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Step Description</label>
                    <textarea
                      value={step.description}
                      onChange={(e) => handleProcessChange(index, 'description', e.target.value)}
                      rows={5}
                      placeholder="Describe this process step..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] resize-none transition-all"
                    />
                  </div>
                </div>
                <div className="h-full flex flex-col justify-start">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Step Image</label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer min-h-[200px] overflow-hidden group">
                    {step.existingUrl ? (
                      <>
                        <img src={step.existingUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#AB2F2F]/10 flex items-center justify-center mb-3 text-[#AB2F2F]">
                          <HiOutlinePlus className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Click to upload</span>
                        <span className="text-[11px] text-slate-500 mt-1">PNG, JPG up to 10MB</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleProcessChange(index, 'file', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddService;
