import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { QarzdaftarDashboard } from './components/Dashboard';
import { QarzdaftarDebts } from './components/Debts';
import { QarzdaftarCalculator } from './components/Calculator';
import { QarzdaftarRatings } from './components/Ratings';
import { QarzdaftarReports } from './components/Reports';
import { QarzdaftarAnalytics } from './components/Analytics';
import { QarzdaftarSettings } from './components/Settings';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { useStoredState } from './utils/storageUtils';
import { useTranslation } from './utils/translationUtils';
import { useLanguage } from './utils/LanguageContext.jsx';
import { useAuth } from './utils/AuthContext.jsx';
import { DebtProvider } from './utils/DebtContext.jsx';
import { SkeletonLoader } from './components/SkeletonLoader';

// Add CSS for animation
const style = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(10px); }
  }
  .animate-fade-in-out {
    animation: fadeInOut 5s ease-in-out forwards;
  }
`;

export function QarzdaftarApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { user, loading, settings } = useAuth(); // Get settings from AuthContext
  const t = useTranslation(language);
  
  // Set active section based on current route
  const [activeSection, setActiveSection] = useState(() => {
    switch (location.pathname) {
      case '/dashboard':
        return 'dashboard';
      case '/debts':
        return 'debts';
      case '/calculator':
        return 'calculator';
      case '/ratings':
        return 'ratings';
      case '/reports':
        return 'reports';
      case '/analytics':
        return 'analytics';
      case '/settings':
        return 'settings';
      default:
        return 'dashboard';
    }
  });
  
  // Touch swipe state for mobile sidebar
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // State for showing the feedback message
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  
  // Touch handlers for swipe gesture
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Swipe threshold
    
    if (isLeftSwipe && activeSection === 'mobile-menu') {
      setActiveSection('debts'); // Close the sidebar
    }
    
    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Update active section when route changes
  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setActiveSection('dashboard');
        break;
      case '/debts':
        setActiveSection('debts');
        break;
      case '/calculator':
        setActiveSection('calculator');
        break;
      case '/ratings':
        setActiveSection('ratings');
        break;
      case '/reports':
        setActiveSection('reports');
        break;
      case '/analytics':
        setActiveSection('analytics');
        break;
      case '/settings':
        setActiveSection('settings');
        break;
      default:
        // Only navigate to dashboard if we're not already on an auth route
        if (!['/login', '/register'].includes(location.pathname)) {
          navigate('/dashboard');
        }
        break;
    }
  }, [location.pathname, navigate]);

  // Handle navigation for unauthenticated users trying to access protected routes
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/debts', '/calculator', '/ratings', '/reports', '/analytics', '/settings'];
    if (!user && protectedRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [user, location.pathname, navigate]);

  // Handle navigation for authenticated users trying to access auth routes
  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/dashboard');
    }
  }, [user, location.pathname, navigate]);

  // Function to switch sections and close mobile menu if open
  const switchSection = (section) => {
    setActiveSection(section);
    navigate(section);
    // If we're on mobile and the menu is open, close it
    if (window.innerWidth < 768 && activeSection === 'mobile-menu') {
      // Menu will close automatically when activeSection changes
    }
  };
  
  // Function to show feedback message
  const showFeedback = () => {
    setShowFeedbackMessage(true);
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowFeedbackMessage(false);
    }, 5000);
  };
  
  // Function to handle feedback button click - redirect to Telegram
  const handleFeedbackClick = () => {
    window.open('https://t.me/opscoder', '_blank');
  };
  
  // Automatically show feedback message every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      showFeedback();
    }, 10000); // 20 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <div className="w-full max-w-md p-6">
          <SkeletonLoader type="authForm" />
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">{t('common.loading', 'Yuklanmoqda...')}</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login/register routes
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  // If user is authenticated, show the main app
  return (
    <DebtProvider>
      <style>{style}</style>
      <div className={`min-h-screen flex transition-colors duration-300 ${
        settings.theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
          : 'bg-gradient-to-br from-orange-50 via-red-50 to-orange-100'
      }`}>
        {/* Feedback/Suggestion Button - moved to right side */}
        <button
          onClick={handleFeedbackClick}
          className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group md:p-4 sm:p-2 xs:p-1 ${
            settings.theme === 'dark' 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-cyan-500 hover:bg-cyan-600'
          } text-white`}
          title={t('feedback.suggestion', 'Taklifingiz bormi?')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-6 md:w-6 sm:h-4 sm:w-4 xs:h-3 xs:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>

        {/* Feedback Message - adjusted position for right alignment */}
        {showFeedbackMessage && (
          <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out md:px-4 md:py-2 md:text-base sm:px-1 sm:py-0.5 sm:text-xs xs:px-0.5 xs:py-0 xs:text-xs">
            <p className="font-medium md:text-base sm:text-xs xs:text-xs">Taklifingiz bormi?</p>
          </div>
        )}

        {/* Mobile Menu Toggle Button - Standard and professional implementation */}
        <button 
          className="md:hidden fixed top-4 right-4 z-20 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setActiveSection(activeSection === 'mobile-menu' ? 'debts' : 'mobile-menu')}
          aria-label={activeSection === 'mobile-menu' ? 'Close menu' : 'Open menu'}
        >
          {activeSection === 'mobile-menu' ? (
            // Close icon (X)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger menu icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Offcanvas Sidebar - Slides in from right on mobile */}
        <div className={`md:hidden fixed inset-0 z-30 transition-opacity duration-300 ease-in-out ${activeSection === 'mobile-menu' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          {/* Backdrop with opacity 0.3 to match site design */}
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out"
            onClick={() => setActiveSection('debts')}
            style={{ opacity: activeSection === 'mobile-menu' ? 0.3 : 0 }}
          ></div>
          
          {/* Sidebar with enhanced smooth slide animation */}
          <div className={`absolute right-0 top-0 h-full w-64 p-4 flex flex-col transition-transform duration-300 ease-out ${
            settings.theme === 'dark' 
              ? 'bg-gradient-to-b from-gray-800 to-blue-900 border-l border-blue-700' 
              : 'bg-white/80 backdrop-blur-lg border-l border-white/30'
          }`} 
               style={{ 
                 transform: activeSection === 'mobile-menu' ? 'translateX(0)' : 'translateX(100%)' ,
                 transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
               }}
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}>
            {/* Close button on the right edge of the sidebar */}
            <button 
              className="absolute top-4 -left-12 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800 rounded-l-lg shadow-lg z-10"
              onClick={() => setActiveSection('debts')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="mb-4 mt-4">
              <h1 className={`text-2xl font-bold bg-clip-text text-transparent ${
                settings.theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                  : 'bg-gradient-to-r from-orange-600 to-red-600'
              }`}>
                {t('app.title', 'Qarzdaftar')}
              </h1>
            </div>
            
            <nav className="flex-1 mt-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => switchSection('dashboard')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'dashboard'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {t('navigation.dashboard', 'Dashboard')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('debts')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'debts'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('navigation.debts', 'Qarzlar')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('calculator')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'calculator'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {t('navigation.calculator', 'Kalkulyator')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('ratings')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'ratings'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888c-.783.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {t('navigation.ratings', 'Reytinglar')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('analytics')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'analytics'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {t('navigation.analytics', 'Analitika')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('reports')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'reports'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('navigation.reports', 'Hisobotlar')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('settings')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'settings'
                        ? settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : settings.theme === 'dark'
                          ? 'text-blue-200 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('navigation.settings', 'Sozlamalar')}
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="mt-auto pt-4 border-t border-white/20">
              <p className={`text-sm text-center ${
                settings.theme === 'dark' ? 'text-blue-300' : 'text-gray-500'
              }`}>
                {t('app.version', 'Qarzdaftar v1.0')}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar - Hidden on mobile, visible on md and larger screens */}
        <div className={`hidden md:block fixed top-0 left-0 h-full w-64 p-4 flex flex-col z-10 ${
          settings.theme === 'dark' 
            ? 'bg-gradient-to-b from-gray-800 to-blue-900 border-r border-blue-700' 
            : 'bg-white backdrop-blur-lg border-r border-white/30'
        }`}>
          <div className="mb-4 mt-4">
            <h1 className={`text-2xl font-bold bg-clip-text text-transparent ${
              settings.theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-400 to-cyan-400' 
                : 'bg-gradient-to-r from-orange-600 to-red-600'
            }`}>
              {t('app.title', 'Qarzdaftar')}
            </h1>
          </div>
          
          <nav className="flex-1 mt-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => switchSection('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'dashboard'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('navigation.dashboard', 'Dashboard')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('debts')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'debts'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('navigation.debts', 'Qarzlar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('calculator')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'calculator'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {t('navigation.calculator', 'Kalkulyator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('ratings')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'ratings'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {t('navigation.ratings', 'Reytinglar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('analytics')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'analytics'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {t('navigation.analytics', 'Analitika')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('reports')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'reports'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('navigation.reports', 'Hisobotlar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('settings')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'settings'
                      ? settings.theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : settings.theme === 'dark'
                        ? 'text-blue-200 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('navigation.settings', 'Sozlamalar')}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content with left margin to accommodate fixed sidebar on desktop, no margin on mobile */}
        <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<QarzdaftarDashboard />} />
            <Route path="/debts" element={<QarzdaftarDebts />} />
            <Route path="/calculator" element={<QarzdaftarCalculator />} />
            <Route path="/ratings" element={<QarzdaftarRatings />} />
            <Route path="/reports" element={<QarzdaftarReports />} />
            <Route path="/analytics" element={<QarzdaftarAnalytics />} />
            <Route path="/settings" element={<QarzdaftarSettings />} />
            <Route path="/" element={<QarzdaftarDashboard />} />
          </Routes>
        </div>
      </div>
    </DebtProvider>
  );
}