import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const infoMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      const res = await api.post('login', { email, password });
      const user = res?.data?.data?.user;
      const token = res?.data?.data?.token;

      if (!token || !token.trim()) {
        alert('Token missing. Please login again.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (Number(user?.role_id) === 1) {
        navigate('/admin');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Access denied. Admin login required.');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f172a] items-center justify-center overflow-hidden">
        {/* Gradient Circles */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#AB2F2F]/10 blur-3xl -top-32 -left-32" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#AB2F2F]/5 blur-3xl bottom-0 right-0" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-16"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#AB2F2F] to-[#e04848] flex items-center justify-center shadow-2xl shadow-red-500/30">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          <h1 className="text-white text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Shiv Group
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-[380px] mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Content Management System for managing your construction website
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: '9', label: 'Sections' },
              { value: '4', label: 'Pages' },
              { value: '100%', label: 'Dynamic' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#f8fafc]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#AB2F2F] to-[#e04848] flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-slate-800 text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Shiv Group</h1>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-1.5 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Sign in to access your admin dashboard
            </p>
            {infoMessage && (
              <p className="mt-3 text-xs font-semibold text-[#AB2F2F]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {infoMessage}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shivgroup.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#AB2F2F]/20 focus:border-[#AB2F2F] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <HiOutlineEyeOff className="w-[18px] h-[18px]" /> : <HiOutlineEye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#AB2F2F] focus:ring-[#AB2F2F]/20 accent-[#AB2F2F]" />
                <span className="text-[13px] text-slate-600 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Remember me</span>
              </label>
              <button type="button" className="text-[13px] text-[#AB2F2F] font-semibold hover:underline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#AB2F2F] to-[#c93e3e] text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © 2026 Shiv Group. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
