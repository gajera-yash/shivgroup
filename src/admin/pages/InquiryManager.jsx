import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineReply, HiOutlineTrash, HiOutlineDownload } from 'react-icons/hi';

const inquiriesData = [
  { id: 1, name: 'Rajesh Patel', email: 'rajesh@email.com', phone: '+91 98765 43210', subject: 'New Commercial Building', message: 'We are looking for a construction partner for our upcoming commercial complex.', date: '2026-04-23', status: 'New', hasAttachment: true },
  { id: 2, name: 'Amit Shah', email: 'amit@company.com', phone: '+91 87654 32100', subject: 'Renovation Quote', message: 'Looking to renovate our existing office space.', date: '2026-04-22', status: 'New', hasAttachment: false },
  { id: 3, name: 'Priya Mehta', email: 'priya@gmail.com', phone: '+91 76543 21000', subject: 'Residential Project', message: 'Interested in building a residential villa.', date: '2026-04-21', status: 'Read', hasAttachment: false },
  { id: 4, name: 'Suresh Kumar', email: 'suresh@biz.in', phone: '+91 65432 10000', subject: 'Road Construction Bid', message: 'Inviting bids for highway construction project.', date: '2026-04-20', status: 'Replied', hasAttachment: true },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const InquiryManager = () => {
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const filtered = filter === 'All' ? inquiriesData : inquiriesData.filter((q) => q.status === filter);
  const selected = inquiriesData.find((q) => q.id === selectedId);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['All', 'New', 'Read', 'Replied'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>{f}</button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 self-start">
          <HiOutlineDownload className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
          {filtered.map((inq) => (
            <div key={inq.id} onClick={() => setSelectedId(inq.id)} className={`px-5 py-4 flex items-start gap-3 cursor-pointer transition-colors ${selectedId === inq.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${inq.status === 'New' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>{inq.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-[13px] truncate ${inq.status === 'New' ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>{inq.name}</h4>
                <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">{inq.subject}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{inq.message}</p>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${inq.status === 'New' ? 'bg-blue-50 text-blue-600' : inq.status === 'Read' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{inq.status}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">Details</h3>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500"><HiOutlineReply className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><HiOutlineTrash className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Name</p><p className="font-semibold text-slate-800">{selected.name}</p></div>
                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Email</p><p className="text-blue-600">{selected.email}</p></div>
                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Phone</p><p className="text-slate-700">{selected.phone}</p></div>
                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Subject</p><p className="font-semibold text-slate-800">{selected.subject}</p></div>
                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Message</p><p className="text-slate-600 leading-relaxed">{selected.message}</p></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <HiOutlineEye className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-500">Select an inquiry</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InquiryManager;
