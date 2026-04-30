import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { FormInput, FormTextarea, FormImageUpload } from '../components/Modal';

const AddService = () => {
  const navigate = useNavigate();
  
  const [includedItems, setIncludedItems] = useState(['']);
  const [rulesItems, setRulesItems] = useState(['']);
  const [brochures, setBrochures] = useState([{ name: '', file: null }]);
  const [workingProcess, setWorkingProcess] = useState([
    { title: '', description: '', images: [] }
  ]);

  const handleAddIncluded = () => setIncludedItems([...includedItems, '']);
  const handleRemoveIncluded = (index) => setIncludedItems(includedItems.filter((_, i) => i !== index));
  const handleIncludedChange = (index, value) => {
    const newItems = [...includedItems];
    newItems[index] = value;
    setIncludedItems(newItems);
  };

  const handleAddRule = () => setRulesItems([...rulesItems, '']);
  const handleRemoveRule = (index) => setRulesItems(rulesItems.filter((_, i) => i !== index));
  const handleRuleChange = (index, value) => {
    const newItems = [...rulesItems];
    newItems[index] = value;
    setRulesItems(newItems);
  };

  const handleAddBrochure = () => setBrochures([...brochures, { name: '', file: null }]);
  const handleRemoveBrochure = (index) => setBrochures(brochures.filter((_, i) => i !== index));
  const handleBrochureChange = (index, field, value) => {
    const newBrochures = [...brochures];
    newBrochures[index][field] = value;
    setBrochures(newBrochures);
  };

  const handleAddProcess = () => setWorkingProcess([...workingProcess, { title: '', description: '', images: [] }]);
  const handleRemoveProcess = (index) => setWorkingProcess(workingProcess.filter((_, i) => i !== index));
  const handleProcessChange = (index, field, value) => {
    const newProcess = [...workingProcess];
    newProcess[index][field] = value;
    setWorkingProcess(newProcess);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save and redirect
    navigate('/admin/services');
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
          onClick={() => navigate('/admin/services')}
          className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Add New Service</h2>
          <p className="text-sm text-slate-500">Create a comprehensive service page for your clients.</p>
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
                <FormInput label="Service Title" required placeholder="e.g. CONSTRUCTION SOLUTIONS" />
                <FormTextarea label="Short Description" rows={2} required placeholder="Brief description to display on service cards..." />
                <FormTextarea label="Full Description" rows={5} placeholder="Detailed description for the main service page..." />
              </div>
              <div className="lg:col-span-1 h-full flex flex-col justify-start">
                <FormImageUpload label="Service Main Image" />
              </div>
            </div>
          </div>

          {/* Service Items (What's Included & Rules We Build By) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What's Included */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What's Included</h3>
                </div>
                <button type="button" onClick={handleAddIncluded} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                  <HiOutlinePlus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleIncludedChange(index, e.target.value)}
                        placeholder={`Included item ${index + 1}`}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
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
                <div>
                  <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Rules We Build By</h3>
                </div>
                <button type="button" onClick={handleAddRule} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 text-xs font-bold rounded-lg transition-colors">
                  <HiOutlinePlus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="space-y-3">
                {rulesItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        placeholder={`Rule ${index + 1}`}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
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
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Brochure Name</label>
                      <input
                        type="text"
                        value={brochure.name}
                        onChange={(e) => handleBrochureChange(index, 'name', e.target.value)}
                        placeholder="e.g. Brickox Service Brochure.PDF"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload File</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleBrochureChange(index, 'file', e.target.files[0])}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#AB2F2F]/10 file:text-[#AB2F2F] hover:file:bg-[#AB2F2F]/20 transition-all cursor-pointer"
                      />
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
                    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Step Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleProcessChange(index, 'title', e.target.value)}
                      placeholder="e.g. CONSULTATION"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Step Description</label>
                    <textarea
                      value={step.description}
                      onChange={(e) => handleProcessChange(index, 'description', e.target.value)}
                      rows={5}
                      placeholder="Describe this process step..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] resize-none transition-all"
                    />
                  </div>
                </div>
                <div className="h-full flex flex-col justify-start">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Step Images (Multiple allowed)</label>
                  <p className="text-xs text-slate-400 mb-3">Upload related process images here.</p>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer min-h-[200px]">
                    <div className="w-10 h-10 rounded-full bg-[#AB2F2F]/10 flex items-center justify-center mb-3 text-[#AB2F2F]">
                      <HiOutlinePlus className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Click to upload</span>
                    <span className="text-[11px] text-slate-500 mt-1">PNG, JPG up to 10MB</span>
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
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Save Service
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddService;
