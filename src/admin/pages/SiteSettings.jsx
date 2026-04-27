import { motion } from 'framer-motion';
import { HiOutlineGlobeAlt, HiOutlinePhone, HiOutlineMail, HiOutlinePhotograph } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const SiteSettings = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* General */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>General Settings</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Company Name</label>
            <input type="text" defaultValue="Shiv Group" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Tagline</label>
            <input type="text" defaultValue="Building The Future" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number</label>
            <input type="text" defaultValue="+91 123 456 7890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address</label>
            <input type="text" defaultValue="shivgroup@yahoo.co.in" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Office Address</label>
            <input type="text" defaultValue="MARKET#203 SAN FRANCISCO, CALIFORNIA (CA)." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center">
                <img src="/shivgroup/images/Logo.png" alt="Logo" className="max-h-full max-w-full object-contain p-2" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <HiOutlinePhotograph className="w-4 h-4" /> Change Logo
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors">Save Changes</button>
        </div>
      </motion.div>

      {/* Social Media */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Social Media Links</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <input type="url" placeholder={social.placeholder} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
              </div>
            );
          })}
        </div>
        <div className="px-6 pb-6">
          <button className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors">Save Changes</button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div variants={item} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Footer Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Copyright Text</label>
            <input type="text" defaultValue="Copyright © 2026 SHIV GROUP, All rights reserved." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F]" />
          </div>
          <button className="px-6 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors">Save Changes</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SiteSettings;
