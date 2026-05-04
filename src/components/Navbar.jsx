import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our History', path: '/history' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteInfo, setSiteInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const res = await api.get('get-site-info').catch(() => ({ data: null }));
        if (res?.data) {
          setSiteInfo(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch site info:', err);
      }
    };
    fetchSiteInfo();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full px-5 md:px-8 lg:px-12 border-t-2 border-t-[#2c6db2] border-b border-b-[#d4d4d4] z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
          : 'bg-[#ffffff]'
      }`}
    >
      <div
        className={`w-full max-w-[1920px] mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled ? 'h-[78px]' : 'h-[100px]'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={siteInfo?.company_logo || "/shivgroup/images/Logo.png"}
            alt={siteInfo?.company_name || "Shiv Group"}
            className={`w-auto object-contain transition-all duration-500 ease-out ${
              isScrolled ? 'h-10 md:h-[64px]' : 'h-12 md:h-[82px]'
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[16px] font-body font-bold uppercase transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-[#1f1f1f]'
                  : 'text-[#8d8d8d] hover:text-[#1f1f1f]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-[#111111]">
            <a
              href={`tel:${siteInfo?.mobile || "+911234567890"}`}
              className="flex items-center gap-2 text-[#111111]"
            >
              <span className="text-[16px] lg:text-[20px] xl:text-[24px] font-heading leading-none font-semibold">
                +91 {siteInfo?.mobile || "+91 123 456 7890"}
              </span>
            </a>
            <div className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full bg-[#1f5ea8] flex items-center justify-center">
              <img
                src="/shivgroup/images/call-white-icon.svg"
                alt="Call"
                className="h-[18px] md:h-[20px] w-auto object-contain"
              />
            </div>
          </div>


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#1f1f1f] text-3xl p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - full screen slide-down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 78px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-[#d4d4d4] shadow-xl z-50 overflow-hidden flex flex-col"
          >
            <div className="px-6 py-10 flex flex-col gap-6 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-[24px] font-heading font-bold uppercase tracking-widest transition-colors ${
                      location.pathname === link.path ? 'text-primary' : 'text-[#8d8d8d] hover:text-[#1f1f1f]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-6 pt-8 border-t border-[#f0f0f0]"
              >
                <a
                  href={`tel:${siteInfo?.mobile || "+911234567890"}`}
                  className="inline-flex items-center gap-4 text-[#111111]"
                >
                  <span className="w-12 h-12 rounded-full bg-[#1f5ea8] flex items-center justify-center">
                    <FiPhone className="text-white text-lg" />
                  </span>
                  <span className="text-xl font-bold">{siteInfo?.mobile || "+91 123 456 7890"}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
