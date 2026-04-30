import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineCollection,
  HiOutlineBriefcase,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlineArrowSmUp,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import api from '../../utils/api';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('dashboard-stats');
      setData(res?.data?.data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Dashboard...</div>;
  }

  const stats = data?.stats || {};
  const recentInquiries = data?.recent_inquiries || [];

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.total_projects || 0,
      icon: HiOutlineCollection,
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Active Services',
      value: stats.total_services || 0,
      icon: HiOutlineBriefcase,
      color: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'Total Testimonials',
      value: stats.total_testimonials || 0,
      icon: HiOutlineChatAlt2,
      color: 'from-violet-500 to-violet-600',
      bgLight: 'bg-violet-50',
      textColor: 'text-violet-600',
    },
    {
      title: 'Total Inquiries',
      value: stats.total_inquiries || 0,
      icon: HiOutlineMail,
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
  ];

  const quickActions = [
    { label: 'Add Project', icon: HiOutlineCollection, color: 'bg-blue-500', link: '/admin/projects' },
    { label: 'Add Service', icon: HiOutlineBriefcase, color: 'bg-emerald-500', link: '/admin/services' },
    { label: 'View Inquiries', icon: HiOutlineMail, color: 'bg-amber-500', link: '/admin/inquiries' },
    { label: 'Awards & Partners', icon: HiOutlineChartBar, color: 'bg-violet-500', link: '/admin/awards' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Welcome back, Admin 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Here's an overview of your website's performance and recent activities.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${card.bgLight} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.textColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800 tracking-tight">{card.value}</p>
              <p className="text-[13px] text-slate-500 font-medium mt-1">{card.title}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h3 className="text-sm font-bold text-slate-800 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.link}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 group text-left"
              >
                <div className={`w-9 h-9 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-[#AB2F2F] hover:underline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>View All</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentInquiries.length > 0 ? recentInquiries.map((inquiry, i) => (
              <div key={i} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-slate-600">{inquiry.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-800 truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{inquiry.name}</p>
                    <p className="text-[12px] text-slate-400 truncate">{inquiry.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
                    <HiOutlineClock className="w-3 h-3" />
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-slate-400 italic">No recent inquiries.</div>
            )}
          </div>
        </div>

        {/* Website Overview */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Website Overview</h3>
          <div className="space-y-4">
            {[
              { label: 'Partners', value: `${stats.total_partners || 0} Partners`, icon: HiOutlineCheckCircle, color: 'bg-blue-50 text-blue-600' },
              { label: 'Awards', value: `${stats.total_awards || 0} Awards`, icon: HiOutlineCollection, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Admins', value: `${stats.total_admins || 0} Admins`, icon: HiOutlineChartBar, color: 'bg-violet-50 text-violet-600' },
              { label: 'System Status', value: 'Operational', icon: HiOutlineCheckCircle, color: 'bg-emerald-50 text-emerald-600' },
            ].map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.label} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${row.color.split(' ')[0]} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${row.color.split(' ')[1]}`} />
                    </div>
                    <span className="text-[13px] font-medium text-slate-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</span>
                  </div>
                  <span className="text-[13px] font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
