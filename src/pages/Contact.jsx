import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiUser, FiMail, FiPhone, FiUploadCloud, FiMessageSquare } from 'react-icons/fi';
import api from '../utils/api';

const Contact = () => {
  const [generalInfo, setGeneralInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchGeneralInfo();
  }, []);

  const fetchGeneralInfo = async () => {
    try {
      const res = await api.get('general-information');
      if (res?.data?.data) {
        setGeneralInfo(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch general info:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('mobile', formData.mobile);
      fd.append('subject', formData.subject);
      fd.append('message', formData.message);
      if (selectedFile) {
        fd.append('attachment', selectedFile);
      }

      const res = await api.post('add-inquiries', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res?.data?.status === "success") {
        setStatusMsg({ type: 'success', text: 'Thank you! Your request has been sent successfully.' });
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
        setSelectedFile(null);
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (err?.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setStatusMsg({ type: 'error', text: firstError });
      } else {
        setStatusMsg({ type: 'error', text: err?.response?.data?.message || 'Failed to send request. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Page Hero */}
      <section
        className="relative pb-20 md:pb-10"
        style={{
          backgroundImage: "url('images/page_title_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '400px',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl font-bold pt-25 uppercase">
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-[135px]">
        
        {/* SECTION 1: FORM + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-stretch mb-[80px]">
          {/* Left: Contact Form Card */}
          <div className="bg-black text-white p-[30px] md:p-[45px] rounded-sm shadow-2xl">
            <h2 className="font-heading text-[22px] md:text-[26px] font-bold uppercase mb-[30px] leading-tight">
              BUILD WITH CONFIDENCE. BUILD WITH US.
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name*" 
                    className="w-full bg-transparent border border-gray-700 p-3 pl-12 text-sm text-white focus:border-gray-400 outline-none transition-all placeholder:text-gray-500" 
                  />
                </div>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address*" 
                    className="w-full bg-transparent border border-gray-700 p-3 pl-12 text-sm text-white focus:border-gray-400 outline-none transition-all placeholder:text-gray-500" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                  <input 
                    type="text" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Contact No*" 
                    className="w-full bg-transparent border border-gray-700 p-3 pl-12 text-sm text-white focus:border-gray-400 outline-none transition-all placeholder:text-gray-500" 
                  />
                </div>
                <div className="relative group">
                  <FiUploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                  <label className="w-full bg-transparent border border-gray-700 p-3 pl-12 text-sm text-gray-500 cursor-pointer flex justify-between items-center hover:border-gray-400 transition-all h-[46px]">
                    <span className={`truncate ${selectedFile ? 'text-white' : 'text-gray-500'}`}>
                      {selectedFile ? selectedFile.name : "Upload File"}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </label>
                </div>
              </div>

              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What are your needs?*" 
                  className="w-full bg-transparent border border-gray-700 p-3 pl-12 text-sm text-white focus:border-gray-400 outline-none transition-all placeholder:text-gray-500" 
                />
              </div>

              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" />
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How Can We Help You?*" 
                  rows="4" 
                  className="w-full bg-transparent border border-gray-700 p-3 pl-12 text-sm text-white focus:border-gray-400 outline-none transition-all resize-none placeholder:text-gray-500"
                ></textarea>
              </div>

              {statusMsg.text && (
                <p className={`text-xs font-bold uppercase tracking-wider ${statusMsg.type === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {statusMsg.text}
                </p>
              )}

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-black hover:bg-primary hover:text-white flex items-center gap-6 pl-10 pr-2 py-2 rounded-full font-heading font-bold tracking-widest text-[13px] transition-all duration-500 group uppercase disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
                  <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                     <FiArrowUpRight className="text-xl" />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Map */}
          <div className="w-full h-full min-h-[400px] lg:min-h-0 rounded-sm overflow-hidden border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70544.78864791447!2d72.7762830486328!3d21.312627400000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04bfc2084c1dd%3A0x3f6f08749d345f69!2sShiv%20Group%20Of%20Industry!5e1!3m2!1sen!2sin!4v1776935887888!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* SECTION 2: CENTER TEXT */}
        <div className="relative flex flex-col items-center justify-center text-center py-[100px] md:py-[150px] overflow-hidden">
           {/* Background Illustration/Image */}
           <div 
             className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
             style={{
               backgroundImage: "url('/shivgroup/images/building.png')",
               backgroundSize: 'contain',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
             }}
           />

           <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative z-10 font-heading text-[20px] md:text-[24px] lg:text-[36px] font-bold uppercase text-black leading-[1.3] max-w-[1200px] tracking-tight px-4"
           >
             GET IN TOUCH WITH OUR CONSTRUCTION EXPERTS. WE AIM TO RESPOND 24/7 TO DISCUSS YOUR PROJECT REQUIREMENTS AND BUILD SOLUTIONS TAILORED TO YOUR NEEDS EFFICIENTLY AND PROFESSIONALLY
           </motion.h3>
        </div>

        {/* SECTION 3: OFFICE LOCATIONS */}
        <div className="mt-[40px]">
          <h2 className="font-heading text-[32px] md:text-[42px] font-bold uppercase text-black mb-[45px]">
            VISIT OUR PHYSICAL OFFICE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                city: "Main Office",
                location: generalInfo?.address || "SURAT, GUJARAT, INDIA",
                phone: generalInfo?.mobile || "+91 123 456 7890",
                email: generalInfo?.email || "shivgroup@yahoo.co.in",
                image: "/shivgroup/images/project/project-1.jpg"
              }
            ].map((office, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white border border-gray-200 p-5 rounded-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-full h-[220px] overflow-hidden rounded-sm mb-6">
                  <img 
                    src={office.image} 
                    alt={office.city} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
                <div className="text-center mb-8 px-4">
                   <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{office.city}</p>
                   <h4 className="text-[20px] font-bold text-black mb-1">{office.phone}</h4>
                   <p className="text-gray-600 text-sm font-medium mb-2">{office.email}</p>
                   <p className="text-gray-500 text-xs uppercase font-bold tracking-wider leading-relaxed">{office.location}</p>
                </div>
                <button className="w-full bg-[#AB2F2F] text-white flex items-center justify-between pl-8 pr-2 py-2 rounded-full font-heading font-bold uppercase tracking-widest text-[11px] transition-all duration-500 hover:bg-[#8B2424] group">
                  CLICK TO SEE LOCATION
                  <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#AB2F2F] transition-transform duration-500 group-hover:rotate-45">
                    <FiArrowUpRight className="text-xl" />
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
