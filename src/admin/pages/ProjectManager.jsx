import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineEye, HiOutlineLocationMarker } from 'react-icons/hi';

const projectsData = [
  { id: 1, title: 'HARBORLINE STUDIOS', category: 'Commercial', location: 'Mumbai', image: '/shivgroup/images/project/project-1.jpg', status: 'Published' },
  { id: 2, title: 'CENTRAL DISTRICT TOWER', category: 'Residential', location: 'Ahmedabad', image: '/shivgroup/images/project/project-2.jpg', status: 'Published' },
  { id: 3, title: 'RIVERSIDE EXCHANGE', category: 'Infrastructure', location: 'Surat', image: '/shivgroup/images/project/project-3.jpg', status: 'Draft' },
  { id: 4, title: 'PARKVIEW QUARTER', category: 'Residential', location: 'Rajkot', image: '/shivgroup/images/project/project-1.jpg', status: 'Published' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ProjectManager = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Commercial', 'Residential', 'Infrastructure'].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}>{cat}</button>
          ))}
        </div>
        <button onClick={() => navigate('/admin/projects/add')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all self-start">
          <HiOutlinePlus className="w-4 h-4" /> Add Project
        </button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projectsData.filter((p) => filter === 'All' || p.category === filter).map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all group">
            <div className="relative h-40 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md ${project.status === 'Published' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>{project.status}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white/90 rounded-lg hover:bg-white"><HiOutlineEye className="w-4 h-4 text-slate-700" /></button>
                <button className="p-2 bg-white/90 rounded-lg hover:bg-white"><HiOutlinePencil className="w-4 h-4 text-slate-700" /></button>
                <button className="p-2 bg-white/90 rounded-lg hover:bg-white"><HiOutlineTrash className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-slate-800 truncate">{project.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{project.category}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400"><HiOutlineLocationMarker className="w-3 h-3" />{project.location}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectManager;
