import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ServiceDetail from './pages/service_detail';
import History from './pages/history';
import ProjectDetails from './pages/project_details';
import Loader from './components/Loader';

// Admin imports
import AdminLayout from './admin/layouts/AdminLayout';
import AdminLogin from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HomepageManager from './admin/pages/HomepageManager';
import AboutManager from './admin/pages/AboutManager';
import ServiceManager from './admin/pages/ServiceManager';
import ProjectManager from './admin/pages/ProjectManager';
import TestimonialManager from './admin/pages/TestimonialManager';
import AwardsManager from './admin/pages/AwardsManager';
import InquiryManager from './admin/pages/InquiryManager';
import SiteSettings from './admin/pages/SiteSettings';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  let isAdmin = false;

  try {
    const user = userRaw ? JSON.parse(userRaw) : null;
    isAdmin = !!token && Number(user?.role_id) === 1;
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ message: 'Please login first as admin.' }} />;
  }

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Only show loader for front-end pages, not admin
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [location.pathname, isAdmin]);

  return (
    <>
      {!isAdmin && (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }} />
      )}
      {loading && !isAdmin && <Loader />}
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="history" element={<History />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project-details" element={<ProjectDetails />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="homepage" element={<HomepageManager />} />
          <Route path="about" element={<AboutManager />} />
          <Route path="services" element={<ServiceManager />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="testimonials" element={<TestimonialManager />} />
          <Route path="awards" element={<AwardsManager />} />
          <Route path="inquiries" element={<InquiryManager />} />
          <Route path="settings" element={<SiteSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
