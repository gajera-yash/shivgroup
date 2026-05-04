import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineReply, HiOutlineTrash, HiOutlineDownload } from 'react-icons/hi';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('inquiries');
      setInquiries(res?.data?.data || []);
      if (res?.data?.data?.length > 0 && !selectedId) {
        // setSelectedId(res.data.data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.get(`delete-inquiries/${id}`);
        setInquiries(inquiries.filter((q) => q.id !== id));
        if (selectedId === id) setSelectedId(null);
      } catch (err) {
        console.error('Failed to delete inquiry:', err);
        alert('Failed to delete inquiry.');
      }
    }
  };

  const selected = inquiries.find((q) => q.id === selectedId);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <h2 className="text-lg font-bold text-slate-800">Inquiries</h2>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="p-8 text-center text-slate-500 font-semibold">Loading Inquiries...</div>
      ) : (
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
            {inquiries.length > 0 ? inquiries.map((inq) => (
              <div key={inq.id} onClick={() => setSelectedId(inq.id)} className={`px-5 py-4 flex items-start gap-3 cursor-pointer transition-colors ${selectedId === inq.id ? 'bg-slate-50 border-r-4 border-[#AB2F2F]' : 'hover:bg-slate-50/50'}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold bg-slate-100 text-slate-500`}>{inq.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-[13px] truncate font-bold text-slate-800`}>{inq.name}</h4>
                  <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">{inq.subject}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{inq.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <span className="text-[10px] text-slate-400">{new Date(inq.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-slate-400 italic">No inquiries found.</div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 min-h-[400px]">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">Details</h3>
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(selected.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500" title="Delete"><HiOutlineTrash className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Name</p><p className="font-semibold text-slate-800">{selected.name}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p><p className="text-blue-600 font-medium">{selected.email}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile</p><p className="text-slate-700 font-medium">{selected.mobile}</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject</p><p className="font-semibold text-slate-800">{selected.subject}</p></div>
                  {selected.attachment && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attachment</p>
                      <a href={selected.attachment} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-xs font-bold">
                        <HiOutlineDownload className="w-3.5 h-3.5" /> View / Download
                      </a>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Message</p>
                    <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-50">{selected.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                  <HiOutlineEye className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-500">Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InquiryManager;
