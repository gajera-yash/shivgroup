import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlinePlus } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, subtitle, children, size = 'md' }) => {
  const sizes = {
    sm: 'max-w-[440px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[800px]',
    xl: 'max-w-[1000px]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`${sizes[size]} w-full bg-white rounded-2xl shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Reusable form field components
export const FormInput = ({ label, required, ...props }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    />
  </div>
);

export const FormTextarea = ({ label, required, ...props }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      {...props}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] resize-none transition-all"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    />
  </div>
);

export const FormSelect = ({ label, required, options = [], ...props }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      {...props}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all appearance-none"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

import { useState, useRef } from 'react';

export const FormImageUpload = ({ label, required, initialPreview = null, onImageSelect }) => {
  const [preview, setPreview] = useState(initialPreview);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (onImageSelect) onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#AB2F2F]/30 hover:bg-red-50/30 transition-all cursor-pointer relative overflow-hidden group"
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full h-32 object-contain rounded-lg" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <span className="text-white text-xs font-bold">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-[#AB2F2F] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Click to upload or drag and drop</p>
            <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export const FormTagInput = ({ label, tags = [], onAddTag, onRemoveTag, placeholder = "Add tag..." }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl min-h-[46px] focus-within:ring-2 focus-within:ring-[#AB2F2F]/20 focus-within:border-[#AB2F2F] transition-all">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm animate-in fade-in zoom-in duration-200"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => onRemoveTag(index)}
              className="p-0.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-red-500 transition-colors"
            >
              <HiOutlineX className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1 min-w-[120px] text-slate-800 placeholder:text-slate-400"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        />
      </div>
      <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1 px-1">
        Press <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-bold">Enter</span> to add a new tag.
      </p>
    </div>
  );
};

export const FormActions = ({ onCancel, submitText = 'Save', isLoading = false }) => (
  <div className="flex items-center justify-end gap-3 pt-5 mt-5 border-t border-slate-100">
    <button
      type="button"
      onClick={onCancel}
      className="px-5 py-2.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isLoading}
      className="px-6 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-60 flex items-center gap-2"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {isLoading && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {submitText}
    </button>
  </div>
);

export default Modal;
