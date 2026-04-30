import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ServiceManager = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  
  const [servicesList, setServicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('services');
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setServicesList(list);
    } catch (err) {
      console.error(err);
      setServicesList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await api.get(`delete-services/${id}`);
      alert(res?.data?.message || 'Service deleted successfully.');
      setServicesList(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete service.');
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <p className="text-slate-500 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage all services displayed on the Services page</p>
        <Link to="/admin/services/add" className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all">
          <HiOutlinePlus className="w-4 h-4" /> Add Service
        </Link>
      </motion.div>

      <motion.div variants={item} className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading services...</p>
        ) : servicesList.length === 0 ? (
          <p className="text-sm text-slate-500">No services found.</p>
        ) : (
          servicesList.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-sm transition-all">
              <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}>
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  <img src={service.service_image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800">{service.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${Number(service.status) === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {Number(service.status) === 1 ? 'Active' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{service.short_description}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">{(service.subservices || []).length} included items • {(service.service_rules || []).length} rules</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/admin/services/edit/${service.id}`); }}>
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); handleDelete(service.id); }}>
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                  {expandedId === service.id ? <HiOutlineChevronUp className="w-4 h-4 text-slate-400" /> : <HiOutlineChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {expandedId === service.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-slate-100 px-5 py-4 bg-slate-50/50 space-y-6">
                  {/* Included Items */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">What's Included</p>
                    <div className="space-y-2">
                      {service.subservices && service.subservices.length > 0 ? (
                        service.subservices.map((subItem) => (
                          <div key={subItem.id} className="flex items-center gap-2 py-2 px-3 bg-white rounded-lg border border-slate-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
                            <span className="text-sm text-slate-700 font-medium">{subItem.description}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">No included items.</p>
                      )}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Rules We Build By</p>
                    <div className="space-y-2">
                      {service.service_rules && service.service_rules.length > 0 ? (
                        service.service_rules.map((ruleItem) => (
                          <div key={ruleItem.id} className="flex items-center gap-2 py-2 px-3 bg-white rounded-lg border border-slate-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#AB2F2F]" />
                            <span className="text-sm text-slate-700 font-medium">{ruleItem.rule}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">No rules added.</p>
                      )}
                    </div>
                  </div>

                  {/* Brochures */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Brochures</p>
                    {service.brochures && service.brochures.length > 0 ? (
                      <div className="flex gap-3 flex-wrap">
                        {service.brochures.map((b) => (
                          <a key={b.id} href={b.brochure_file} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#AB2F2F] hover:underline bg-white px-3 py-1.5 rounded border border-slate-200">
                            View Document {b.id}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No brochures uploaded.</p>
                    )}
                  </div>

                  {/* Working Process */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Working Process Steps</p>
                    <div className="space-y-3">
                      {service.service_contents && service.service_contents.length > 0 ? (
                        service.service_contents.map((process, idx) => (
                          <div key={process.id} className="flex gap-4 p-3 bg-white rounded-xl border border-slate-100">
                            {process.content_image && (
                              <img src={process.content_image} alt={process.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                            )}
                            <div>
                              <h5 className="text-sm font-bold text-slate-800">Step {idx + 1}: {process.title}</h5>
                              <p className="text-xs text-slate-500 mt-1">{process.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">No working process steps.</p>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}
            </div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default ServiceManager;
