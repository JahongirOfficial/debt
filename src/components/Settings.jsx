import React, { useEffect } from 'react';
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
  const { language, setLanguage } = useLanguage();
  const { user, settings, logout, updateUserSettings } = useAuth();
  // Use theme from settings instead of local state
  const t = useTranslation(language);
  
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">{t('settings.title', 'Sozlamalar')}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t('settings.subtitle', 'Ilova sozlamalarini boshqaring')}</p>
      </div>
      
      {/* User Info Card */}
      {user && (
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-6 dark:bg-gray-800/30 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">{t('settings.user.title', 'Foydalanuvchi ma\'lumotlari')}</h3>
          <div className="flex items-center gap-4">
            {/* User Avatar with persistent color */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${avatarColor}`}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-800 text-lg dark:text-white">{user.username}</h4>
                <button 
                  onClick={logout}
                  className="ml-auto px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                >
                  {t('settings.logout', 'Chiqish')}
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-2 dark:text-gray-300">{user.email}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${tierInfo.color} ${tierInfo.textColor} bg-opacity-20`}>
                  {tierInfo.name}
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium dark:text-blue-400 dark:hover:text-blue-300">
                  {t('settings.subscription.upgrade', 'Yangilash')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Cards */}
      <div className="space-y-6">
        {/* Language Settings */}
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl dark:bg-gray-800/30 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {t('settings.language.title', 'Til sozlamalari')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">{t('settings.language.interface', 'Interfeys tili')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('settings.language.description', 'Ilova tilini tanlang')}</p>
              </div>
              <select 
                value={settings.language || language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400 md:text-base text-sm"
              >
                <option value="uz">{t('languages.uz', "O'zbek tili")}</option>
                <option value="ru">{t('languages.ru', 'Русский')}</option>
                <option value="en">{t('languages.en', 'English')}</option>
                <option value="tjk">{t('languages.tjk', 'Тоҷикӣ')}</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Currency Settings */}
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl dark:bg-gray-800/30 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('settings.currency.title', 'Valyuta sozlamalari')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">{t('settings.currency.main', 'Asosiy valyuta')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('settings.currency.description', 'Qarzlar ko\'rsatish uchun asosiy valyuta')}</p>
              </div>
              <select 
                value={settings.currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400 md:text-base text-sm"
              >
                <option value="UZS">{t('currencies.UZS', "UZS - O'zbek so'm")}</option>
                <option value="USD">{t('currencies.USD', 'USD - Dollar')}</option>
                <option value="EUR">{t('currencies.EUR', 'EUR - Yevro')}</option>
                <option value="RUB">{t('currencies.RUB', 'RUB - Rubl')}</option>
                <option value="TJS">{t('currencies.TJS', 'TJS - Tojik somoni')}</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Theme Settings */}
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl dark:bg-gray-800/30 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
            {settings.theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
            {t('settings.theme.title', 'Mavzu sozlamalari')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">{t('settings.theme.color', 'Rang mavzusi')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('settings.theme.description', 'Yorug\' yoki qorong\'u mavzuni tanlang')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    settings.theme === 'light' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {t('settings.theme.light', 'Yorug\'')}
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    settings.theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
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
        
        {/* About Section */}
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl dark:bg-gray-800/30 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('settings.about.title', 'Ilova haqida')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">{t('settings.about.totalDebts', 'Jami qarzlar')}</h4>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {/* {t('settings.about.debtCountNote', 'This would be replaced with actual debt count from backend')} */}
                {t('settings.about.noDebts', '0')}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">{t('settings.about.selectedLanguage', 'Tanlangan til')}</h4>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {t(`languages.${settings.language || language}`, settings.language || language)}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">{t('settings.about.mainCurrency', 'Asosiy valyuta')}</h4>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {t(`currencies.${settings.currency}`, settings.currency)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}