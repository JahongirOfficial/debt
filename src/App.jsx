import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { QarzdaftarDashboard } from './components/Dashboard';
import { QarzdaftarDebts } from './components/Debts';
import { QarzdaftarCalculator } from './components/Calculator';
import { QarzdaftarRatings } from './components/Ratings';
import { QarzdaftarAnalytics } from './components/Analytics';
import { QarzdaftarSettings } from './components/Settings';
import { QarzdaftarSMSNotifications } from './components/SMSNotifications';
import { QarzdaftarPricingPlans } from './components/PricingPlans';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserManagement } from './components/admin/UserManagement';
import { PricingManagement } from './components/admin/PricingManagement';
import { Reports } from './components/admin/Reports';
import { Analytics } from './components/admin/Analytics';
import { ModernSidebar } from './components/ModernSidebar';
import TelegramConnectionModal from './components/TelegramConnectionModal';

import { useTranslation } from './utils/translationUtils';
import { useLanguage } from './utils/LanguageContext.jsx';
import { useAuth } from './utils/AuthContext.jsx';
import { DebtProvider } from './utils/DebtContext.jsx';
import { ToastProvider } from './utils/ToastContext.jsx';
import { SkeletonLoader } from './components/SkeletonLoader';

// Add CSS for modern animations
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
  @keyframes bounceIn {
    0% { 
      opacity: 0; 
      transform: translateY(20px) scale(0.8); 
    }
    50% { 
      opacity: 1; 
      transform: translateY(-5px) scale(1.05); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
  }
  .animate-bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); 
    }
    50% { 
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); 
    }
  }
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
`;

export function QarzdaftarApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
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
      case '/analytics':
        return 'analytics';
      case '/sms-notifications':
        return 'sms-notifications';
      case '/pricing':
        return 'pricing';
      case '/settings':
        return 'settings';
      default:
        return 'dashboard';
    }
  });





  // State for mobile sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // State for sidebar collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // State for modern suggestion notification
  const [showSuggestionNotification, setShowSuggestionNotification] = useState(false);

  // State for Telegram connection modal
  const [showTelegramModal, setShowTelegramModal] = useState(false);



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
      case '/analytics':
        setActiveSection('analytics');
        break;
      case '/sms-notifications':
        setActiveSection('sms-notifications');
        break;
      case '/pricing':
        setActiveSection('pricing');
        break;
      case '/settings':
        setActiveSection('settings');
        break;
      case '/admin':
      case '/admin/dashboard':
        setActiveSection('admin-dashboard');
        break;
      case '/admin/users':
        setActiveSection('admin-users');
        break;
      case '/admin/pricing':
        setActiveSection('admin-pricing');
        break;
      case '/admin/reports':
        setActiveSection('admin-reports');
        break;
      case '/admin/analytics':
        setActiveSection('admin-analytics');
        break;
      default:
        // Don't redirect if on admin routes
        if (location.pathname.startsWith('/admin')) {
          // Let admin routes handle themselves
          break;
        }
        // Only navigate to dashboard if we're not already on an auth route or admin route
        if (!['/login', '/register'].includes(location.pathname)) {
          navigate('/dashboard');
        }
        break;
    }
  }, [location.pathname, navigate]);

  // Handle navigation for unauthenticated users trying to access protected routes
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/debts', '/calculator', '/ratings', '/analytics', '/pricing', '/settings'];
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (!user && (protectedRoutes.includes(location.pathname) || isAdminRoute)) {
      navigate('/login');
    }
  }, [user, location.pathname, navigate]);

  // Handle navigation for authenticated users trying to access auth routes
  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      // Redirect admin users to admin panel, regular users to dashboard
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, location.pathname, navigate]);

  // Handle admin route access control
  useEffect(() => {
    if (user && location.pathname.startsWith('/admin') && user.role !== 'admin') {
      console.log('❌ Non-admin user trying to access admin route - redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, location.pathname, navigate]);

  // Function to switch sections and close mobile menu if open
  const switchSection = (route) => {
    // Extract section name from route for activeSection state
    const sectionName = route.replace('/', '') || 'dashboard';
    setActiveSection(sectionName);
    navigate(route);
    // If we're on mobile and the menu is open, close it
    if (window.innerWidth < 768 && activeSection === 'mobile-menu') {
      // Menu will close automatically when activeSection changes
    }
  };

  // Function to show modern suggestion notification

  // Function to handle suggestion notification click - redirect to Telegram
  const handleSuggestionClick = () => {
    window.open('https://t.me/opscoder', '_blank');
    setShowSuggestionNotification(false); // Hide notification immediately after click
  };

  // Automatically show suggestion notification every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSuggestionNotification(true);
      // Hide the notification after 8 seconds
      setTimeout(() => {
        setShowSuggestionNotification(false);
      }, 8000);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Show Telegram connection modal after 5 seconds if user hasn't connected
  useEffect(() => {
    const checkTelegramConnection = async () => {
      if (!user || !user.id) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/telegram/status', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) return;

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) return;

        const data = await response.json();
        
        if (data.success && !data.connected) {
          // Check if modal was skipped in last 24 hours
          const lastSkipped = localStorage.getItem('telegramModalSkipped');
          const now = Date.now();
          const oneDayInMs = 24 * 60 * 60 * 1000;
          
          if (!lastSkipped || (now - parseInt(lastSkipped)) > oneDayInMs) {
            // Show modal after 5 seconds
            const timer = setTimeout(() => {
              setShowTelegramModal(true);
            }, 5000);

            return () => clearTimeout(timer);
          }
        }
      } catch (error) {
        console.error('Error checking Telegram status:', error);
      }
    };

    checkTelegramConnection();
  }, [user]);



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
    <ToastProvider>
      <DebtProvider>
        <style>{style}</style>

      {/* Check if current route is admin route */}
      {location.pathname.startsWith('/admin') ? (
        // Admin Layout - No main sidebar, only admin layout
        <div className={`min-h-screen transition-colors duration-300 ${settings.theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-red-50 to-orange-100'
          }`}>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="pricing" element={<PricingManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="analytics" element={<Analytics />} />
              <Route index element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
      ) : (
        // Regular User Layout - With modern sidebar
        <div className={`min-h-screen transition-colors duration-300 ${settings.theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-red-50 to-orange-100'
          }`}>

          {/* Modern Sidebar */}
          <ModernSidebar
            activeSection={activeSection}
            switchSection={switchSection}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
            onCollapseChange={setIsSidebarCollapsed}
          />

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden fixed top-4 right-4 z-30 w-12 h-12 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            aria-label={isMobileSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileSidebarOpen ? (
              <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>







          {/* Main Content with dynamic margin for modern sidebar */}
          <div className={`flex-1 p-4 md:p-8 overflow-auto transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-72'
            }`}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<QarzdaftarDashboard />} />
              <Route path="/debts" element={<QarzdaftarDebts />} />
              <Route path="/calculator" element={<QarzdaftarCalculator />} />
              <Route path="/ratings" element={<QarzdaftarRatings />} />
              <Route path="/analytics" element={<QarzdaftarAnalytics />} />
              <Route path="/sms-notifications" element={<QarzdaftarSMSNotifications />} />
              <Route path="/pricing" element={<QarzdaftarPricingPlans />} />
              <Route path="/settings" element={<QarzdaftarSettings />} />
            </Routes>
          </div>
        </div>
      )}

      {/* Modern Suggestion Notification */}
      {showSuggestionNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in hidden md:block">
          <div
            onClick={handleSuggestionClick}
            className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 animate-pulse-glow ${settings.theme === 'dark'
                ? 'bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 border border-slate-600/30'
                : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 border border-gray-200/50'
              } rounded-2xl p-5 shadow-2xl hover:shadow-3xl backdrop-blur-lg max-w-xs`}
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-2 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Content */}
            <div className="relative flex items-start gap-4">
              {/* Modern Telegram icon with gradient */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-base leading-tight ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
                  }`}>
                  Taklifingiz bormi?
                </p>
                <p className={`text-sm mt-1 leading-relaxed ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                  Telegram orqali bog'laning
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-medium ${settings.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                    @opscoder
                  </span>
                  <svg className={`w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 ${settings.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSuggestionNotification(false);
              }}
              className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 ${settings.theme === 'dark'
                  ? 'bg-slate-700/90 hover:bg-slate-600 text-slate-300 border border-slate-600/50'
                  : 'bg-gray-100/90 hover:bg-gray-200 text-gray-600 border border-gray-200'
                } shadow-lg backdrop-blur-sm`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Telegram Connection Modal */}
      <TelegramConnectionModal
        isOpen={showTelegramModal}
        onClose={() => setShowTelegramModal(false)}
        user={user}
      />

      {/* Debug: Manual modal trigger (remove in production) */}
      {process.env.NODE_ENV === 'development' && null}
      </DebtProvider>
    </ToastProvider>
  );
}