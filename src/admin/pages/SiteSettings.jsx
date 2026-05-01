import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineGlobeAlt, HiOutlinePhone, HiOutlineMail, HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FormImageUpload } from '../components/Modal';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const SiteSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneralSubmitting, setIsGeneralSubmitting] = useState(false);
  const [isSocialSubmitting, setIsSocialSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [socialError, setSocialError] = useState('');
  
  // General Form State
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Social Form State
  const [socialLinks, setSocialLinks] = useState({
    Facebook: '',
    LinkedIn: '',
    Twitter: '',
    YouTube: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      // Fetch General Info
      const resGen = await api.get('general-information');
      const genData = resGen?.data?.data;
      if (genData) {
        setCompanyName(genData.company_name || '');
        setTagline(genData.tagline || '');
        setMobile(genData.mobile || '');
        setEmail(genData.email || '');
        setAddress(genData.address || '');
        setLogoPreview(genData.company_logo || null);
      }

      // Fetch Social Media
      const resSoc = await api.get('social-media');
      const socData = resSoc?.data?.data;
      if (socData && Array.isArray(socData)) {
        const links = {
          Facebook: '',
          LinkedIn: '',
          Twitter: '',
          YouTube: ''
        };
        socData.forEach(item => {
          if (links.hasOwnProperty(item.platform)) {
            links[item.platform] = item.url;
          }
        });
        setSocialLinks(links);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!companyName.trim() || !tagline.trim() || !mobile.trim() || !email.trim() || !address.trim()) {
      setGeneralError('Company Name, Tagline, Phone, Email and Address are required.');
      return;
    }
    
    if (!logoFile && !logoPreview) {
      setGeneralError('Website Logo is required.');
      return;
    }

    setIsGeneralSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('company_name', companyName.trim());
      fd.append('tagline', tagline.trim());
      fd.append('mobile', mobile.trim());
      fd.append('email', email.trim());
      fd.append('address', address.trim());
      if (logoFile) {
        fd.append('company_logo', logoFile);
      }

      const res = await api.post('add-general-information', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(res?.data?.message || 'Settings updated successfully.');
    } catch (err) {
      console.error('Failed to save settings:', err);
      const apiErrors = err?.response?.data?.errors;
      const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
      setGeneralError(firstValidationError || err?.response?.data?.message || 'Failed to save settings.');
    } finally {
      setIsGeneralSubmitting(false);
    }
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    setSocialError('');

    // URL Validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .?=@%&-]*)*\/?$/;
    const invalidSocials = Object.entries(socialLinks).filter(([_, url]) => url && !urlPattern.test(url));
    
    if (invalidSocials.length > 0) {
      setSocialError(`Invalid URL for ${invalidSocials.map(([p]) => p).join(', ')}`);
      return;
    }

    setIsSocialSubmitting(true);
    try {
      const payload = {
        socials: Object.keys(socialLinks).map(key => ({
          platform: key,
          url: socialLinks[key]?.trim() || ''
        }))
      };
      const res = await api.post('add-social-media', payload);
      alert(res?.data?.message || 'Social media links updated successfully.');
    } catch (err) {
      console.error('Failed to save social links:', err);
      const apiErrors = err?.response?.data?.errors;
      const firstValidationError = apiErrors ? Object.values(apiErrors)?.[0]?.[0] : null;
      setSocialError(firstValidationError || err?.response?.data?.message || 'Failed to save social links.');
    } finally {
      setIsSocialSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      {/* General Information */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>General Information</h3>
        </div>
        <form onSubmit={handleGeneralSubmit} className="p-6">
          {generalError && <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold">{generalError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Company Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Shiv Group" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Tagline <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Building The Future" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 123 456 7890" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shivgroup@yahoo.co.in" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Office Address <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Office Location..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" 
              />
            </div>
          </div>

          <div className="max-w-xs mb-6">
            <FormImageUpload 
              label="Website Logo" 
              required
              initialPreview={logoPreview} 
              onImageSelect={(file) => setLogoFile(file)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isGeneralSubmitting}
            className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50"
          >
            {isGeneralSubmitting ? 'Saving...' : 'Save General Settings'}
          </button>
        </form>
      </motion.div>

      {/* Social Media */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Social Media Links</h3>
        </div>
        <form onSubmit={handleSocialSubmit} className="p-6">
          {socialError && <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold">{socialError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { icon: FaFacebookF, label: 'Facebook', placeholder: 'https://facebook.com/shivgroup', color: 'bg-blue-50 text-blue-600' },
              { icon: FaLinkedinIn, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/shivgroup', color: 'bg-sky-50 text-sky-600' },
              { icon: FaTwitter, label: 'Twitter', placeholder: 'https://twitter.com/shivgroup', color: 'bg-cyan-50 text-cyan-600' },
              { icon: FaYoutube, label: 'YouTube', placeholder: 'https://youtube.com/@shivgroup', color: 'bg-red-50 text-red-600' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <div key={social.label} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${social.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <input 
                    type="url" 
                    value={socialLinks[social.label] || ''}
                    onChange={(e) => setSocialLinks({ ...socialLinks, [social.label]: e.target.value })}
                    placeholder={social.placeholder} 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" 
                  />
                </div>
              );
            })}
          </div>
          <button 
            type="submit" 
            disabled={isSocialSubmitting}
            className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50"
          >
            {isSocialSubmitting ? 'Saving...' : 'Save Social Links'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SiteSettings;
