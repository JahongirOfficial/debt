import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { useLanguage } from '../utils/LanguageContext';
import { useAuth } from '../utils/AuthContext';

// Function to generate a random avatar color
const getRandomAvatarColor = () => {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-indigo-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-orange-500 to-red-500',
    'bg-gradient-to-br from-purple-500 to-pink-500',
    'bg-gradient-to-br from-yellow-500 to-orange-500',
    'bg-gradient-to-br from-teal-500 to-cyan-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get subscription tier with color
const getSubscriptionTier = (tier, t) => {
  const tiers = {
    free: { name: t('settings.subscription.free', 'Bepul'), color: 'bg-gray-500', textColor: 'text-gray-700' },
    standard: { name: t('settings.subscription.standard', 'Standart'), color: 'bg-blue-500', textColor: 'text-blue-700' },
    pro: { name: t('settings.subscription.pro', 'Pro'), color: 'bg-purple-500', textColor: 'text-purple-700' }
  };
  return tiers[tier] || tiers.free;
};

export function QarzdaftarSettings() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { user, settings, logout, updateUserSettings } = useAuth();
  const t = useTranslation(language);
  
  // Function to handle upgrade button click - navigate to pricing plans
  const handleUpgradeClick = () => {
    navigate('/pricing');
  };
  
   // Function to handle admin panel button click
   const handleAdminPanelClick = () => {
     navigate('/admin/dashboard');
   };
  
  // Use actual subscription tier from user data or default to free
  const subscriptionTier = user?.subscriptionTier || 'free';
  const tierInfo = getSubscriptionTier(subscriptionTier, t);
  
  // Use actual avatar color from user data or generate a random one
  const avatarColor = user?.avatarColor || 'bg-gradient-to-br from-blue-500 to-indigo-500';

  // Handle language change
  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    await updateUserSettings({ ...settings, language: newLanguage });
  };

  // Handle currency change
  const handleCurrencyChange = async (newCurrency) => {
    await updateUserSettings({ ...settings, currency: newCurrency });
  };

  // Handle theme change
  const handleThemeChange = async (newTheme) => {
    await updateUserSettings({ ...settings, theme: newTheme });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {t('settings.title', 'Sozlamalar')}
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-sm md:text-base font-medium">
              {t('settings.subtitle', 'Ilova sozlamalarini boshqaring va shaxsiylashtiring')}
            </p>
          </div>
        </div>
      
        {/* Modern User Info Card */}
        {user && (
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800 mb-6 dark:text-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {t('settings.user.title', 'Foydalanuvchi ma\'lumotlari')}
              </h3>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Enhanced User Avatar */}
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ${avatarColor}`}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <h4 className="font-bold text-gray-800 text-xl dark:text-slate-100">{user.username}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ring-1 ${
                        subscriptionTier === 'pro' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 ring-purple-300 dark:ring-purple-600'
                          : subscriptionTier === 'standard'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 ring-blue-300 dark:ring-blue-600'
                          : 'bg-gray-100 text-gray-800 dark:bg-slate-800/80 dark:text-slate-200 ring-gray-300 dark:ring-slate-600'
                      }`}>
                        {tierInfo.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={handleUpgradeClick}
                      className="group/btn relative px-4 py-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {t('settings.subscription.upgrade', 'Yangilash')}
                      </span>
                    </button>
                    
                    {user.role === 'admin' && (
                      <button 
                        onClick={handleAdminPanelClick}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Admin Panel
                      </button>
                    )}
                    
                    <button 
                      onClick={logout}
                      className="px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('settings.logout', 'Chiqish')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      
        {/* Modern Settings Cards */}
        <div className="space-y-6">
          {/* Language Settings */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 dark:text-slate-100">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                {t('settings.language.title', 'Til sozlamalari')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">{t('settings.language.interface', 'Interfeys tili')}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{t('settings.language.description', 'Ilova tilini tanlang')}</p>
                  </div>
                  <div className="relative">
                    <select 
                      value={settings.language || language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="px-4 py-3 pr-10 rounded-xl border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/90 dark:border-slate-600/60 dark:text-slate-100 backdrop-blur-sm appearance-none transition-all duration-200 hover:border-blue-400 md:text-base text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      <option value="uz">{t('languages.uz', "O'zbek tili")}</option>
                      <option value="ru">{t('languages.ru', 'Русский')}</option>
                      <option value="en">{t('languages.en', 'English')}</option>
                      <option value="tjk">{t('languages.tjk', 'Тоҷикӣ')}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Currency Settings */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 dark:text-slate-100">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {t('settings.currency.title', 'Valyuta sozlamalari')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">{t('settings.currency.main', 'Asosiy valyuta')}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{t('settings.currency.description', 'Qarzlar ko\'rsatish uchun asosiy valyuta')}</p>
                  </div>
                  <div className="relative">
                    <select 
                      value={settings.currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="px-4 py-3 pr-10 rounded-xl border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 dark:bg-slate-800/90 dark:border-slate-600/60 dark:text-slate-100 backdrop-blur-sm appearance-none transition-all duration-200 hover:border-green-400 md:text-base text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      <option value="UZS">{t('currencies.UZS', "UZS - O'zbek so'm")}</option>
                      <option value="USD">{t('currencies.USD', 'USD - Dollar')}</option>
                      <option value="EUR">{t('currencies.EUR', 'EUR - Yevro')}</option>
                      <option value="RUB">{t('currencies.RUB', 'RUB - Rubl')}</option>
                      <option value="TJS">{t('currencies.TJS', 'TJS - Tojik somoni')}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Theme Settings */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 dark:text-slate-100">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  {settings.theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                {t('settings.theme.title', 'Mavzu sozlamalari')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">{t('settings.theme.color', 'Rang mavzusi')}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{t('settings.theme.description', 'Yorug\' yoki qorong\'u mavzuni tanlang')}</p>
                  </div>
                  <div className="flex items-center gap-3 p-1 bg-gray-100/80 dark:bg-slate-800/90 rounded-xl backdrop-blur-sm">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                        settings.theme === 'light' 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {t('settings.theme.light', 'Yorug\'')}
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                        settings.theme === 'dark' 
                          ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 shadow-lg transform scale-105 ring-2 ring-slate-600' 
                          : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:text-gray-800 dark:hover:text-slate-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      {t('settings.theme.dark', 'Qorong\'u')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Section */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-slate-500/10 to-gray-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 dark:text-slate-100">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {t('settings.about.title', 'Ilova haqida')}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100">{t('settings.about.totalDebts', 'Jami qarzlar')}</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-300">Yaratilgan qarzlar soni</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {t('settings.about.noDebts', '0')}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100">{t('settings.about.selectedLanguage', 'Tanlangan til')}</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-300">Joriy interfeys tili</p>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                      {t(`languages.${settings.language || language}`, settings.language || language)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100">{t('settings.about.mainCurrency', 'Asosiy valyuta')}</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-300">Qarzlar ko'rsatish valyutasi</p>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                      {t(`currencies.${settings.currency}`, settings.currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}