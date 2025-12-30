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
    free: { name: t('pricing.free.name', 'Bepul'), color: 'bg-gray-500', textColor: 'text-gray-700' },
    lite: { name: t('pricing.lite.name', 'Lite'), color: 'bg-green-500', textColor: 'text-green-700' },
    standard: { name: t('pricing.standard.name', 'Standart'), color: 'bg-orange-500', textColor: 'text-orange-700' },
    pro: { name: t('pricing.pro.name', 'Pro'), color: 'bg-purple-500', textColor: 'text-purple-700' }
  };
  return tiers[tier] || tiers.free;
};

export function QarzdaftarSettings() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { user, settings, logout, updateUserSettings, updateProfile } = useAuth();
  const t = useTranslation(language);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [savingName, setSavingName] = useState(false);
  
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

  // Handle name save
  const handleSaveName = async () => {
    setSavingName(true);
    const result = await updateProfile({ name: newName.trim() || null });
    setSavingName(false);
    if (result.success) {
      setEditingName(false);
    }
  };

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
                    {(user?.name || user?.username || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  {/* Name missing alert */}
                  {!user?.name && !editingName && (
                    <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg">
                      <p className="text-sm text-amber-700 dark:text-amber-300 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {t('settings.user.nameRequired', 'Iltimos, ismingizni kiriting')}
                        <button
                          onClick={() => { setEditingName(true); setNewName(''); }}
                          className="ml-auto px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded transition-colors"
                        >
                          {t('settings.user.addName', 'Ism qo\'shish')}
                        </button>
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    {editingName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder={t('settings.user.namePlaceholder', 'Ismingizni kiriting')}
                          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          maxLength={50}
                          autoFocus
                        />
                        <button
                          onClick={handleSaveName}
                          disabled={savingName}
                          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          {savingName ? '...' : '✓'}
                        </button>
                        <button
                          onClick={() => { setEditingName(false); setNewName(user?.name || ''); }}
                          className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 text-xl dark:text-slate-100">
                          {user?.name || user?.username}
                        </h4>
                        <button
                          onClick={() => { setEditingName(true); setNewName(user?.name || ''); }}
                          className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
                          title={t('settings.user.editName', 'Ismni tahrirlash')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    )}
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
                  
                  {/* Username (login) */}
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {t('settings.user.login', 'Login')}: <span className="font-medium text-gray-700 dark:text-slate-300">@{user?.username}</span>
                  </p>
                  
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
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                {t('settings.language.title', 'Til sozlamalari')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
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
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {t('settings.currency.title', 'Valyuta sozlamalari')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
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
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  {settings.theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          {/* Telegram Bot Connection Section */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.325.015.094.034.31.019.478z"/>
                  </svg>
                </div>
                {t('settings.telegram.title', 'Telegram Bot')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
                {user?.telegramId ? (
                  // Ulangan holat
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {t('settings.telegram.connected', 'Telegram ulangan')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          {t('settings.telegram.connectedDesc', 'Siz kunlik eslatmalar olasiz')}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-slate-300">
                      <p>📱 Telegram ID: <span className="font-mono">{user.telegramId}</span></p>
                      {user.telegramUsername && (
                        <p>👤 Username: @{user.telegramUsername}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  // Ulanmagan holat
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">
                          {t('settings.telegram.connect', 'Telegram botni ulash')}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-slate-300">
                          {t('settings.telegram.connectDesc', 'Har kuni soat 9:00 da qarzlar haqida eslatma oling')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                        {t('settings.telegram.instructions', 'Telegram botni ulash uchun quyidagi tugmani bosing:')}
                      </p>
                      <a
                        href={`https://t.me/qarzdaftarchabot?start=${user?.username || user?.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.325.015.094.034.31.019.478z"/>
                        </svg>
                        {t('settings.telegram.openBot', 'Telegram botni ochish')}
                      </a>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      <p>💡 {t('settings.telegram.tip', 'Bot orqali har kuni ertaga to\'lov muddati keladigan qarzlar haqida xabar olasiz')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Hard Refresh Section */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                {t('settings.refresh.title', 'Ilovani yangilash')}
              </h3>
              
              <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">{t('settings.refresh.button', 'Ilovani yangilash')}</h4>
                    <p className="text-sm text-gray-600 dark:text-slate-300">{t('settings.refresh.description', 'Ilovani to\'liq qayta yuklash (Ctrl+Shift+R)')}</p>
                  </div>
                  <button
                    onClick={() => setShowRefreshModal(true)}
                    className="group/btn relative px-4 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-xl blur opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {t('settings.refresh.button', 'Ilovani yangilash')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-slate-500/10 to-gray-600/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {t('settings.about.title', 'Ilova haqida')}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100 text-sm md:text-base">{t('settings.about.totalDebts', 'Jami qarzlar')}</h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300">Yaratilgan qarzlar soni</p>
                      </div>
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {t('settings.about.noDebts', '0')}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100 text-sm md:text-base">{t('settings.about.selectedLanguage', 'Tanlangan til')}</h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300">Joriy interfeys tili</p>
                      </div>
                    </div>
                    <div className="text-sm md:text-lg font-semibold text-green-600 dark:text-green-400">
                      {t(`languages.${settings.language || language}`, settings.language || language)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-slate-100 text-sm md:text-base">{t('settings.about.mainCurrency', 'Asosiy valyuta')}</h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300">Qarzlar ko'rsatish valyutasi</p>
                      </div>
                    </div>
                    <div className="text-sm md:text-lg font-semibold text-orange-600 dark:text-orange-400">
                      {t(`currencies.${settings.currency}`, settings.currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Refresh Confirmation Modal */}
      {showRefreshModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                    {t('settings.refresh.confirmTitle', 'Ilovani yangilashni tasdiqlang')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                    Bu amal qaytarib bo'lmaydi
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                {t('settings.refresh.confirmMessage', 'Bu amalni bajarish ilova to\'liq qayta yuklanadi va barcha saqlanmagan ma\'lumotlar yo\'qoladi. Davom etishni xohlaysizmi?')}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => setShowRefreshModal(false)}
                  className="px-4 py-2.5 text-gray-700 dark:text-slate-300 bg-gray-100/80 dark:bg-slate-700/80 hover:bg-gray-200/80 dark:hover:bg-slate-600/80 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50"
                >
                  {t('settings.refresh.cancel', 'Bekor qilish')}
                </button>
                <button
                  onClick={() => {
                    setShowRefreshModal(false);
                    // Small delay for smooth modal close animation
                    setTimeout(() => {
                      window.location.reload(true);
                    }, 200);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('settings.refresh.confirm', 'Ha, yangilash')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}