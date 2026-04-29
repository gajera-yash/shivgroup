import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import {
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineBriefcase,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineStar,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlineInformationCircle,
  HiOutlineX,
  HiOutlineLogout,
} from 'react-icons/hi';

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: HiOutlineHome, end: true },
  { label: 'Homepage', path: '/admin/homepage', icon: HiOutlinePhotograph },
  { label: 'About Us', path: '/admin/about', icon: HiOutlineInformationCircle },
  { label: 'Services', path: '/admin/services', icon: HiOutlineBriefcase },
  { label: 'Projects', path: '/admin/projects', icon: HiOutlineCollection },
  { label: 'Testimonials', path: '/admin/testimonials', icon: HiOutlineChatAlt2 },
  { label: 'Awards & Partners', path: '/admin/awards', icon: HiOutlineStar },
  { label: 'Inquiries', path: '/admin/inquiries', icon: HiOutlineMail },
  { label: 'Site Settings', path: '/admin/settings', icon: HiOutlineCog },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('logout');

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onClose?.();
      navigate('/admin/login');
    } catch (error) {
      // Even if API fails, continue local logout to avoid stuck session UI
      alert(err.response?.data?.message || 'Logout failed')
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#1e293b]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AB2F2F] to-[#e04848] flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight tracking-tight">Shiv Group</h1>
              <p className="text-slate-400 text-[11px] font-medium">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.end
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white shadow-lg shadow-red-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 border-t border-[#1e293b] pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          <HiOutlineLogout className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] bg-[#0f172a] flex-col flex-shrink-0 h-screen sticky top-0 border-r border-[#1e293b]">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-[260px] bg-[#0f172a] h-full z-50 lg:hidden border-r border-[#1e293b]"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
