import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Footer = () => {
  const [siteInfo, setSiteInfo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, socialRes] = await Promise.all([
          api.get('get-site-info').catch(() => ({ data: null })),
          api.get('get-social-links').catch(() => ({ data: { status: false, data: [] } }))
        ]);
        
        if (infoRes?.data) {
          setSiteInfo(infoRes.data);
        }
        
        if (socialRes?.data?.status) {
          setSocialLinks(socialRes.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
      }
    };
    fetchData();
  }, []);

  const getSocialIcon = (platform) => {
    if (!platform) return <FaFacebookF size={10} />;
    const p = platform.toLowerCase();
    if (p.includes('facebook')) return <FaFacebookF size={10} />;
    if (p.includes('linkedin')) return <FaLinkedinIn size={10} />;
    if (p.includes('twitter') || p.includes('x')) return <FaTwitter size={10} />;
    if (p.includes('youtube')) return <FaYoutube size={10} />;
    return <FaFacebookF size={10} />; // Fallback
  };

  return (
    <footer className="bg-[#F2F2EB] w-full pt-12 md:pt-16 lg:pt-24 pb-8 px-4 sm:px-6 md:px-12 lg:px-[135px]">
      <div className="max-w-[1920px] mx-auto w-full">

        {/* Top Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-5 items-start">

          {/* Left Column: Build with Us & CTA (Cspans 5 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-[0.9] font-bold uppercase text-black mb-4 md:mb-5 tracking-tight"
            >
              BUILD WITH US
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white flex items-center gap-6 pl-8 pr-2 py-2 rounded-full font-heading font-bold tracking-widest text-sm transition-all duration-300 group"
              >
                GET A FREE SCHEDULE
                <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary transition-transform duration-300 group-hover:rotate-45 shadow-md">
                  <img src="/shivgroup/images/arrow-left-primary.svg" alt="arrow" className="w-6 h-6 rotate--180" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Part: Info Grid (Spans 7 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">

            {/* Location */}
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold uppercase text-black">LOCATION</h3>
              <p className="font-body text-base text-black/80 font-medium leading-relaxed uppercase whitespace-pre-line">
                {siteInfo?.address || "MARKET#203 SAN FRANCISCO,\nCALIFORNIA (CA)."}
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold uppercase text-black text-left lg:text-end">CONTACT</h3>
              <div className="flex flex-col gap-1">
                <a href={`mailto:${siteInfo?.email || "shivgroup@yahoo.co.in"}`} className="font-body text-base text-left lg:text-end text-black/80 font-bold hover:text-primary transition-colors">
                  {siteInfo?.email || "shivgroup@yahoo.co.in"}
                </a>
                <a href={`tel:${siteInfo?.mobile || "+911234567890"}`} className="font-body text-base text-left lg:text-end text-black/80 font-bold hover:text-primary transition-colors">
                  {siteInfo?.mobile || "+91 123 456 7890"}
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-5">
              <h3 className="font-heading text-xl font-bold uppercase text-black">SOCIAL MEDIA</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((social) => (
                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-sm font-bold text-black group">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                        {getSocialIcon(social.platform)}
                      </span>
                      {social.platform}
                    </a>
                  ))
                ) : (
                  <>
                    <a href="#" className="flex items-center gap-3 font-body text-sm font-bold text-black group">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                        <FaFacebookF size={10} />
                      </span>
                      Facebook
                    </a>
                    <a href="#" className="flex items-center gap-3 font-body text-sm font-bold text-black group">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                        <FaLinkedinIn size={10} />
                      </span>
                      Linkedin
                    </a>
                    <a href="#" className="flex items-center gap-3 font-body text-sm font-bold text-black group">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                        <FaTwitter size={10} />
                      </span>
                      Twitter
                    </a>
                    <a href="#" className="flex items-center gap-3 font-body text-sm font-bold text-black group">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                        <FaYoutube size={10} />
                      </span>
                      Youtube
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Helpful Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold uppercase text-left lg:text-end text-black">HELPFUL LINKS</h3>
              <div className="flex flex-col lg:flex-row lg:flex-wrap justify-start lg:justify-end gap-x-2 gap-y-2 font-body text-sm font-bold text-black uppercase text-left lg:text-end">
                <Link to="/projects" className="hover:text-primary transition-colors">Our Projects</Link>
                <span className="text-primary hidden lg:inline">•</span>
                <Link to="/about" className="hover:text-primary transition-colors">About us</Link>
                <span className="text-primary hidden lg:inline">•</span>
                <Link to="/history" className="hover:text-primary transition-colors">History</Link>
                <span className="text-primary hidden lg:inline">•</span>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact us</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-black/10 mb-5 mt-5"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-body text-sm font-bold text-black">
          <p>
            Copyright © {new Date().getFullYear()} {siteInfo?.company_name || "SHIV GROUP"}, All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of use</Link>
            <span className="text-black/50">.</span>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
