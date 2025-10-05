import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useLanguage } from '../../utils/LanguageContext';
import { useTranslation } from '../../utils/translationUtils';
import { CountryCodeSelector } from './CountryCodeSelector';

export function Login() {
  const [countryCode, setCountryCode] = useState('+998');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0); // Track last click time for double click detection
  
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleTitleClick = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    // If second click within 500ms, show admin login info
    if (timeDiff < 500 && timeDiff > 0) {
      setError('Admin login: +998901234568 / admin123');
    }
    
    setLastClickTime(currentTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!phone || !password) {
      setError(t('auth.login.allFieldsRequired', 'All fields are required'));
      setLoading(false);
      return;
    }
    
    // Combine country code with phone number
    const fullPhoneNumber = countryCode + phone.replace(/\D/g, '');
    
    const result = await login(fullPhoneNumber, password);
    
    if (!result.success) {
      setError(result.message);
    } else {
      console.log('🚀 Login result:', result);
      console.log('🎯 User role from result:', result.user?.role);
      
      // Check if user has admin role and redirect accordingly
      if (result.user && result.user.role === 'admin') {
        console.log('✅ Admin user detected - redirecting to admin panel');
        // User has admin role, redirect to admin panel
        navigate('/admin/dashboard');
      } else {
        console.log('✅ Regular user detected - redirecting to dashboard');
        // Regular user, redirect to dashboard
        navigate('/dashboard');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
          <h1 
            className="text-3xl font-bold text-white cursor-pointer select-none"
            onClick={handleTitleClick}
          >
            {t('app.title', 'Qarzdaftar')}
          </h1>
          <p className="text-orange-100 mt-2">{t('auth.login.title', 'Tizimga kirish')}</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r text-red-700">
              <p className="font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.login.phone', 'Telefon raqam')}
              </label>
              <div className="flex space-x-2">
                <div className="w-1/3">
                  <CountryCodeSelector 
                    selectedCode={countryCode} 
                    onCodeChange={setCountryCode} 
                    language={language} 
                  />
                </div>
                <div className="w-2/3 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder={t('auth.login.phonePlaceholder', 'Telefon raqam')}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.login.password', 'Parol')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder={t('auth.login.passwordPlaceholder', 'Parolingizni kiriting')}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  {t('auth.login.rememberMe', 'Eslab qolish')}
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  {t('auth.login.forgotPassword', 'Parolni unutdingizmi?')}
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-red-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {t('auth.login.loggingIn', 'Kirish...')}
                </span>
              ) : (
                t('auth.login.button', 'Kirish')
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-center text-sm">
              {t('auth.login.noAccount', "Hisobingiz yo'qmi?")}{' '}
              <button 
                onClick={() => navigate('/register')} 
                className="text-orange-600 font-medium hover:text-orange-500 transition-colors"
              >
                {t('auth.login.registerLink', 'Ro\'yxatdan o\'ting')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}