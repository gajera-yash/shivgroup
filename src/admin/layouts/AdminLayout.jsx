import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/homepage': 'Homepage Manager',
  '/admin/about': 'About Us Manager',
  '/admin/services': 'Service Manager',
  '/admin/projects': 'Project Manager',
  '/admin/testimonials': 'Testimonials Manager',
  '/admin/awards': 'Awards & Partners',
  '/admin/inquiries': 'Inquiries / Leads',
  '/admin/settings': 'Site Settings',
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentTitle = Object.entries(pageTitles).find(
    ([path]) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path))
  )?.[1] || 'Admin';

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          onMenuToggle={() => setSidebarOpen(true)}
          title={currentTitle}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
