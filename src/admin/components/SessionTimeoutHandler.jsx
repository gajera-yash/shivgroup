import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const SessionTimeoutHandler = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  
  // 10 seconds for testing
  // const TIMEOUT_DURATION = 10 * 1000; 
  const TIMEOUT_DURATION = 30 * 60 * 1000; 

  const handleLogout = async () => {
    try {
      // Attempt to logout on server
      await api.post('logout');
    } catch (error) {
      console.error('Auto-logout API call failed:', error);
    } finally {
      // Clear local session regardless of server response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/admin/login');
    }
  };

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleLogout, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Only monitor if the user is actually logged in
    const token = localStorage.getItem('token');
    if (!token) return;

    // Standard activity events
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Initial timer setup
    resetTimer();

    // Register event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  return null; 
};

export default SessionTimeoutHandler;
