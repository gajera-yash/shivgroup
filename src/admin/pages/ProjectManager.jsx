import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineEye, HiOutlineLocationMarker } from 'react-icons/hi';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ProjectManager = () => {
  const [filter, setFilter] = useState('All');
  const [projectsList, setProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('projects');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setProjectsList(list);
    } catch (err) {
      console.error(err);
      setProjectsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await api.get(`delete-projects/${id}`);
      alert(res?.data?.message || 'Project deleted successfully.');
      setProjectsList(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete project.');
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setFilter('All')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'All' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}>All</button>
          {Array.from(new Set(projectsList.map(p => p.project_category?.category_name).filter(Boolean))).map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}>{cat}</button>
          ))}
        </div>
        <button onClick={() => navigate('/admin/projects/add')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all self-start">
          <HiOutlinePlus className="w-4 h-4" /> Add Project
        </button>
      </motion.div>

      {isLoading ? (
        <div className="p-8 text-center text-sm font-semibold text-slate-500">Loading Projects...</div>
      ) : (
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projectsList.filter((p) => filter === 'All' || p.project_category?.category_name === filter).map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all group">
              <div className="relative h-40 overflow-hidden">
                <img src={project.project_image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md ${project.status == 1 ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                    {project.status == 1 ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => navigate(`/admin/projects/edit/${project.id}`)} className="p-2 bg-white/90 rounded-lg hover:bg-white"><HiOutlinePencil className="w-4 h-4 text-slate-700" /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 bg-white/90 rounded-lg hover:bg-white"><HiOutlineTrash className="w-4 h-4 text-red-500" /></button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-800 truncate">{project.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded truncate max-w-[60%]">{project.project_category?.category_name || 'No Category'}</span>
                </div>
              </div>
            </div>
          ))}
          {projectsList.length === 0 && (
            <div className="col-span-full p-8 text-center text-sm font-semibold text-slate-500 bg-white border border-slate-100 rounded-2xl">
              No projects found.
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectManager;
