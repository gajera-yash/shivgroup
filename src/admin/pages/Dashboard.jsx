import { motion } from 'framer-motion';
import {
  HiOutlineCollection,
  HiOutlineBriefcase,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlineArrowSmUp,
  HiOutlineArrowSmDown,
  HiOutlineEye,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

const statCards = [
  {
    title: 'Total Projects',
    value: '48',
    change: '+12%',
    isPositive: true,
    icon: HiOutlineCollection,
    color: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/20',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'Active Services',
    value: '12',
    change: '+3',
    isPositive: true,
    icon: HiOutlineBriefcase,
    color: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/20',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    title: 'Testimonials',
    value: '24',
    change: '+5',
    isPositive: true,
    icon: HiOutlineChatAlt2,
    color: 'from-violet-500 to-violet-600',
    shadow: 'shadow-violet-500/20',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    title: 'New Inquiries',
    value: '8',
    change: '-2',
    isPositive: false,
    icon: HiOutlineMail,
    color: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-500/20',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
];

const recentInquiries = [
  { name: 'Rajesh Patel', email: 'rajesh@email.com', subject: 'New Building Project', time: '2 hours ago', status: 'New' },
  { name: 'Amit Shah', email: 'amit@company.com', subject: 'Renovation Quote', time: '5 hours ago', status: 'New' },
  { name: 'Priya Mehta', email: 'priya@gmail.com', subject: 'Commercial Space', time: '1 day ago', status: 'Read' },
  { name: 'Suresh Kumar', email: 'suresh@biz.in', subject: 'Road Construction', time: '2 days ago', status: 'Replied' },
];

const quickActions = [
  { label: 'Add Project', icon: HiOutlineCollection, color: 'bg-blue-500' },
  { label: 'Add Service', icon: HiOutlineBriefcase, color: 'bg-emerald-500' },
  { label: 'View Inquiries', icon: HiOutlineMail, color: 'bg-amber-500' },
  { label: 'Site Analytics', icon: HiOutlineChartBar, color: 'bg-violet-500' },
];

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
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Good Morning, Admin 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Here's what's happening with your website today.
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
                <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${
                  card.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                }`}>
                  {card.isPositive ? <HiOutlineArrowSmUp className="w-3.5 h-3.5" /> : <HiOutlineArrowSmDown className="w-3.5 h-3.5" />}
                  {card.change}
                </span>
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
              <button
                key={action.label}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 group text-left"
              >
                <div className={`w-9 h-9 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {action.label}
                </span>
              </button>
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
            <button className="text-xs font-semibold text-[#AB2F2F] hover:underline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentInquiries.map((inquiry, i) => (
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
                    {inquiry.time}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    inquiry.status === 'New' ? 'bg-blue-50 text-blue-600' :
                    inquiry.status === 'Read' ? 'bg-amber-50 text-amber-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Overview */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Website Overview</h3>
          <div className="space-y-4">
            {[
              { label: 'Homepage Sections', value: '8 Active', icon: HiOutlineEye, color: 'bg-blue-50 text-blue-600' },
              { label: 'Services Listed', value: '4 Services', icon: HiOutlineBriefcase, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Projects Published', value: '48 Projects', icon: HiOutlineCollection, color: 'bg-violet-50 text-violet-600' },
              { label: 'All Systems', value: 'Operational', icon: HiOutlineCheckCircle, color: 'bg-emerald-50 text-emerald-600' },
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
