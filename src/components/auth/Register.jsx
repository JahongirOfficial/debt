import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useLanguage } from '../../utils/LanguageContext';
import { useTranslation } from '../../utils/translationUtils';
import { CountryCodeSelector } from './CountryCodeSelector';

export function Register() {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+998');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!name || !phone || !password) {
      setError(t('auth.register.allFieldsRequired', 'Barcha maydonlar to\'ldirilishi shart'));
      setLoading(false);
      return;
    }

    // Name validatsiyasi
    if (name.length < 2 || name.length > 50) {
      setError(t('auth.register.nameLength', 'Ism 2-50 ta belgidan iborat bo\'lishi kerak'));
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError(t('auth.register.passwordTooShort', 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'));
      setLoading(false);
      return;
    }
    
    // Combine country code with phone number
    const fullPhoneNumber = countryCode + phone.replace(/\D/g, '');
    
    const result = await register(name, fullPhoneNumber, password);
    
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">{t('app.title', 'Qarzdaftar')}</h1>
          <p className="text-orange-100 mt-2">{t('auth.register.title', 'Ro\'yxatdan o\'tish')}</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r text-red-700">
              <p className="font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.name', 'Ismingiz')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder={t('auth.register.namePlaceholder', 'To\'liq ismingizni kiriting')}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.phone', 'Telefon raqam')}
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
                    placeholder={t('auth.register.phonePlaceholder', '90 123 45 67')}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.password', 'Parol')}
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
                  placeholder={t('auth.register.passwordPlaceholder', 'Kamida 6 ta belgi')}
                />
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
                  {t('auth.register.registering', 'Ro\'yxatdan o\'tish...')}
                </span>
              ) : (
                t('auth.register.button', 'Ro\'yxatdan o\'tish')
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-center text-sm">
              {t('auth.register.haveAccount', 'Hisobingiz bormi?')}{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="text-orange-600 font-medium hover:text-orange-500 transition-colors"
              >
                {t('auth.register.loginLink', 'Tizimga kiring')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
