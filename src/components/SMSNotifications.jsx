import React, { useState, useEffect } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { useLanguage } from '../utils/LanguageContext';
import { useAuth } from '../utils/AuthContext';

export function QarzdaftarSMSNotifications() {
  const { language } = useLanguage();
  const { settings, updateUserSettings, user } = useAuth();
  const t = useTranslation(language);
  
  // Check user's subscription tier
  const getUserTier = () => {
    if (user && user.subscriptionTier) {
      return user.subscriptionTier.toLowerCase();
    }
    return 'free'; // Default to free tier
  };
  
  const userTier = getUserTier();
  
  // Define tier-based SMS limits
  const getSmsLimits = () => {
    switch (userTier) {
      case 'free':
        return 3; // 3 SMS per month
      case 'standard':
        return 100; // 100 SMS per month
      case 'pro':
        return 1000; // 1000 SMS per month
      default:
        return 0; // No SMS for unknown tiers
    }
  };
  
  // SMS settings state
  const [smsSettings, setSmsSettings] = useState({
    enabled: userTier !== 'free', // Auto-enable for standard and pro tiers
    provider: 'smsuz', // Default provider
    reminderDays: 1, // Days before due date to send reminder
    reminderTime: '09:00', // Time to send reminder
    notificationTypes: {
      dueReminder: true,
      paymentReceived: true
    },
    templates: {
      dueReminder: 'Hurmatli {{creditor}}, {{amount}} miqdordagi qarzingiz {{date}} sanasida tugaydi. Iltimos, o\'z vaqtida to\'lang.',
      paymentReceived: 'Hurmatli {{creditor}}, {{amount}} miqdordagi to\'lovingiz qabul qilindi. Qolgan qarzingiz: {{remaining}}'
    },
    usage: {
      sentThisMonth: 0,
      limit: getSmsLimits()
    }
  });
  
  // Load SMS settings from user settings
  useEffect(() => {
    if (settings.sms) {
      setSmsSettings(prev => ({
        ...settings.sms,
        enabled: userTier !== 'free' ? settings.sms.enabled : false // Override for free tier
      }));
    } else {
      // Initialize with default settings based on tier
      setSmsSettings(prev => ({
        ...prev,
        enabled: userTier !== 'free', // Auto-enable for standard and pro tiers
        usage: {
          sentThisMonth: 0,
          limit: getSmsLimits()
        }
      }));
    }
  }, [settings, userTier]);
  
  // Handle SMS settings change
  const handleSmsSettingsChange = async (newSettings) => {
    // Only update the SMS part of the settings, preserving other settings
    const updatedSettings = { 
      ...settings, 
      sms: newSettings 
    };
    
    try {
      await updateUserSettings(updatedSettings);
      setSmsSettings(newSettings);
    } catch (error) {
      console.error('Error updating SMS settings:', error);
    }
  };
  
  // Handle provider change
  const handleProviderChange = (provider) => {
    handleSmsSettingsChange({ ...smsSettings, provider });
  };
  
  // Handle reminder days change
  const handleReminderDaysChange = (days) => {
    handleSmsSettingsChange({ ...smsSettings, reminderDays: parseInt(days) });
  };
  
  // Handle reminder time change
  const handleReminderTimeChange = (time) => {
    handleSmsSettingsChange({ ...smsSettings, reminderTime: time });
  };
  
  // Handle notification type toggle
  const handleNotificationTypeToggle = (type) => {
    const updatedNotificationTypes = {
      ...smsSettings.notificationTypes,
      [type]: !smsSettings.notificationTypes[type]
    };
    handleSmsSettingsChange({
      ...smsSettings,
      notificationTypes: updatedNotificationTypes
    });
  };
  
  // Handle template change
  const handleTemplateChange = (type, template) => {
    const updatedTemplates = {
      ...smsSettings.templates,
      [type]: template
    };
    handleSmsSettingsChange({
      ...smsSettings,
      templates: updatedTemplates
    });
  };
  
  // Handle enable toggle (only for non-free tiers)
  const handleEnableToggle = () => {
    if (userTier !== 'free') {
      handleSmsSettingsChange({ ...smsSettings, enabled: !smsSettings.enabled });
    }
  };
  
  // Render tier information
  const renderTierInfo = () => {
    if (userTier === 'free') {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl dark:bg-yellow-900/30 dark:border-yellow-700 mb-6">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                {t('smsNotifications.freeTier.title', 'Bepul tarifda SMS xizmati cheklangan')}
              </h4>
              <p className="text-sm text-yellow-700 mt-1 dark:text-yellow-300">
                {t('smsNotifications.freeTier.description', 'Siz bepul tarifdasiz. SMS xizmatidan foydalanish uchun standart yoki professional tarifga o\'ting.')}{' '}
                <button 
                  className="text-orange-600 font-medium hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                  onClick={() => alert(t('smsNotifications.upgradePrompt', 'Tarifni yangilash funksiyasi tez orada qo\'shiladi'))}
                >
                  {t('smsNotifications.upgradeNow', 'Hoziroq yangilang')}
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-xl dark:bg-green-900/30 dark:border-green-700 mb-6">
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200">
              {t('smsNotifications.activeTier.title', `${userTier.charAt(0).toUpperCase() + userTier.slice(1)} tarifidasiz`)}
            </h4>
            <p className="text-sm text-green-700 mt-1 dark:text-green-300">
              {t('smsNotifications.activeTier.description', 'SMS xizmati faol. Bu oy uchun sizga {{limit}} ta SMS xabarnoma berish huquqi berilgan.', { limit: smsSettings.usage.limit })}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render SMS usage
  const renderSmsUsage = () => {
    if (userTier === 'free') {
      return null; // Removed SMS traffic section for free tier
    }
    
    const usagePercentage = (smsSettings.usage.sentThisMonth / smsSettings.usage.limit) * 100;
    
    return (
      <div className="p-4 bg-white/50 rounded-xl dark:bg-gray-700/50 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 dark:text-white">
          {t('smsNotifications.usage.title', 'SMS Foydalanish')}
        </h4>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">
              {t('smsNotifications.usage.sent', 'Yuborildi:')} {smsSettings.usage.sentThisMonth}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {t('smsNotifications.usage.limit', 'Limit:')} {smsSettings.usage.limit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" 
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('smsNotifications.usage.remaining', 'Qolgan SMS:')} {Math.max(0, smsSettings.usage.limit - smsSettings.usage.sentThisMonth)}
        </p>
      </div>
    );
  };
  
  // Render pricing plans for free tier users
  const renderPricingPlans = () => {
    if (userTier !== 'free') {
      return null; // Only show pricing plans for free tier users
    }
    
    const plans = [
      {
        name: t('settings.free', 'Bepul'),
        price: '0',
        period: t('smsNotifications.pricing.month', 'oyiga'),
        features: [
          t('smsNotifications.pricing.feature1', '3 ta SMS xabar'),
          t('smsNotifications.pricing.feature2', 'Asosiy eslatmalar'),
          t('smsNotifications.pricing.feature3', 'Telegram qo\'llab-quvvatlash'),
          t('smsNotifications.pricing.feature16', '10 ta qarzni boshqarish'), // Added new feature
          t('smsNotifications.pricing.feature17', 'Oddiy hisobotlar') // Added new feature
        ],
        cta: t('smsNotifications.pricing.currentPlan', 'Joriy tarif'),
        isCurrent: true,
        popular: false
      },
      {
        name: t('settings.standard', 'Standart'),
        price: '5',
        period: t('smsNotifications.pricing.month', 'oyiga'),
        features: [
          t('smsNotifications.pricing.feature4', '100 ta SMS xabar'),
          t('smsNotifications.pricing.feature5', 'Kengaytirilgan eslatmalar'),
          t('smsNotifications.pricing.feature6', 'Maxsus qo\'llab-quvvatlash'),
          t('smsNotifications.pricing.feature7', 'Hisobotlar'),
          t('smsNotifications.pricing.feature13', 'Kunlik eslatmalar'),
          t('smsNotifications.pricing.feature18', '100 ta qarzni boshqarish'), // Added new feature
          t('smsNotifications.pricing.feature19', 'Kengaytirilgan analitika') // Added new feature
        ],
        cta: t('smsNotifications.pricing.upgrade', 'Tarifni yangilash'),
        isCurrent: false,
        popular: true
      },
      {
        name: t('settings.pro', 'Professional'),
        price: '10',
        period: t('smsNotifications.pricing.month', 'oyiga'),
        features: [
          t('smsNotifications.pricing.feature8', 'Cheksiz SMS xabarlar'),
          t('smsNotifications.pricing.feature9', 'Barcha eslatmalar turlari'),
          t('smsNotifications.pricing.feature10', '24/7 qo\'llab-quvvatlash'),
          t('smsNotifications.pricing.feature11', 'Kengaytirilgan hisobotlar'),
          t('smsNotifications.pricing.feature12', 'API kirish'),
          t('smsNotifications.pricing.feature14', 'Maxsus shablonlar'),
          t('smsNotifications.pricing.feature15', 'Avvalgi xabarlar tarixi'),
          t('smsNotifications.pricing.feature20', '500 ta qarzni boshqarish'), // Added new feature
          t('smsNotifications.pricing.feature21', 'AI tavsiyalar') // Added new feature
        ],
        cta: t('smsNotifications.pricing.upgrade', 'Tarifni yangilash'),
        isCurrent: false,
        popular: false
      }
    ];
    
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 dark:text-white">
          {t('smsNotifications.pricing.title', 'Tarif rejalari')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-6 border-2 transition-all duration-500 hover:shadow-xl flex flex-col ${
                plan.popular 
                  ? 'border-orange-500 bg-white dark:bg-gray-800 scale-105 z-10 animate-gradient-rotate' 
                  : plan.name === t('settings.pro', 'Professional')
                    ? 'border-purple-500 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl animate-gradient-rotate-slow'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg'
              } ${plan.isCurrent ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full animate-pulse">
                  {t('smsNotifications.pricing.popular', 'Eng ommabop')}
                </div>
              )}
              <div className="flex-grow flex flex-col">
                <div className="text-center mb-6 flex-grow">
                  <h4 className={`text-lg font-bold mb-2 ${
                    plan.popular 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : plan.name === t('settings.pro', 'Professional')
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-800 dark:text-white'
                  }`}>
                    {plan.name}
                  </h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg 
                          className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <button
                    disabled={plan.isCurrent}
                    className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                      plan.isCurrent
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                        : plan.popular
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                          : plan.name === t('settings.pro', 'Professional')
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
          {t('smsNotifications.title', 'SMS Eslatmalar')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('smsNotifications.subtitle', 'SMS xabarlarini sozlash')}
        </p>
      </div>
      
      {/* Tier Information */}
      {renderTierInfo()}
      
      {/* Pricing Plans for Free Tier */}
      {renderPricingPlans()}
      
      {/* SMS Usage */}
      {renderSmsUsage()}
      
      {/* SMS Settings Card - Only for non-free tiers */}
      {userTier !== 'free' && (
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl dark:bg-gray-800/30 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {t('smsNotifications.settings.title', 'SMS Sozlamalari')}
            </h3>
            <button
              onClick={handleEnableToggle}
              disabled={userTier === 'free'}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                smsSettings.enabled 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              } ${userTier === 'free' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smsSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {userTier === 'free' && !smsSettings.enabled && (
            <div className="text-center py-4 mb-4">
              <p className="text-gray-600 dark:text-gray-300">
                {t('smsNotifications.freeTier.disabledMessage', 'SMS xizmati bepul tarifda faolsiz. Faollashtirish uchun tarifni yangilang.')}
              </p>
            </div>
          )}
          
          {(!smsSettings.enabled || userTier === 'free') ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                {userTier === 'free' 
                  ? t('smsNotifications.freeTier.disabledMessage', 'SMS xizmati bepul tarifda faolsiz. Faollashtirish uchun tarifni yangilang.')
                  : t('smsNotifications.disabledMessage', 'SMS xabarlar yoqilmagan. Yoqish uchun yuqoridagi tugmani bosing.')}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Provider Selection */}
              <div className="p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
                <h4 className="font-semibold text-gray-800 mb-3 dark:text-white">
                  {t('smsNotifications.provider.title', 'SMS Provayder')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'smsuz', name: 'SMS.uz' },
                    { id: 'eskiz', name: 'Eskiz.uz' },
                    { id: 'playmobile', name: 'Playmobile' }
                  ].map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleProviderChange(provider.id)}
                      className={`px-4 py-3 rounded-xl border transition-all ${
                        smsSettings.provider === provider.id
                          ? 'border-orange-500 bg-orange-500/10 dark:bg-orange-500/20'
                          : 'border-gray-300 hover:border-orange-400 dark:border-gray-600 dark:hover:border-orange-400'
                      }`}
                    >
                      <span className="font-medium text-gray-800 dark:text-white">
                        {provider.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Notification Types */}
              <div className="p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
                <h4 className="font-semibold text-gray-800 mb-3 dark:text-white">
                  {t('smsNotifications.notifications.title', 'Xabar Turlari')}
                </h4>
                <div className="space-y-3">
                  {[
                    { 
                      id: 'dueReminder', 
                      label: t('smsNotifications.notifications.dueReminder', 'To\'lov eslatmasi'),
                      description: t('smsNotifications.notifications.dueReminderDescription', 'Qarz muddati tugashidan oldin eslatish')
                    },
                    { 
                      id: 'paymentReceived', 
                      label: t('smsNotifications.notifications.paymentReceived', 'To\'lov qabul qilindi'),
                      description: t('smsNotifications.notifications.paymentReceivedDescription', 'Qarz to\'langanda xabar berish')
                    }
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3">
                      <button
                        onClick={() => handleNotificationTypeToggle(notification.id)}
                        className={`mt-1 relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          smsSettings.notificationTypes[notification.id] 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            smsSettings.notificationTypes[notification.id] ? 'translate-x-4' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {notification.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* SMS Templates */}
              <div className="p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
                <h4 className="font-semibold text-gray-800 mb-3 dark:text-white">
                  {t('smsNotifications.templates.title', 'SMS xabar shablonlarini boshqarish')}
                </h4>
                <div className="space-y-4">
                  {Object.keys(smsSettings.templates).map((templateKey) => (
                    <div key={templateKey}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                        {t(`smsNotifications.templates.${templateKey}`, templateKey === 'dueReminder' ? 'To\'lov eslatmasi' : 'To\'lov qabul qilindi')}
                      </label>
                      <textarea
                        value={smsSettings.templates[templateKey]}
                        onChange={(e) => handleTemplateChange(templateKey, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows="3"
                        placeholder={t(`smsNotifications.templates.${templateKey}Placeholder`, templateKey === 'dueReminder' ? 
                          'Hurmatli {{creditor}}, {{amount}} miqdordagi qarzingiz {{date}} sanasida tugaydi. Iltimos, o\'z vaqtida to\'lang.' :
                          'Hurmatli {{creditor}}, {{amount}} miqdordagi to\'lovingiz qabul qilindi. Qolgan qarzingiz: {{remaining}}')}
                      />
                      <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                        {t('smsNotifications.templates.availableVariables', 'Mavjud o\'zgaruvchilar:')} {{creditor}}, {{amount}}, {{date}}, {{remaining}}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reminder Settings */}
              <div className="p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
                <h4 className="font-semibold text-gray-800 mb-3 dark:text-white">
                  {t('smsNotifications.reminders.title', 'Eslatma Sozlamalari')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      {t('smsNotifications.reminders.daysBefore', 'Eslatma vaqti')}
                    </label>
                    <select
                      value={smsSettings.reminderDays}
                      onChange={(e) => handleReminderDaysChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {[1, 2, 3, 5, 7].map((days) => (
                        <option key={days} value={days}>
                          {days} {t('smsNotifications.reminders.days', 'kun')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      {t('smsNotifications.reminders.time', 'Yuborish vaqti')}
                    </label>
                    <input
                      type="time"
                      value={smsSettings.reminderTime}
                      onChange={(e) => handleReminderTimeChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              {/* Test SMS Button */}
              <div className="p-4 bg-white/50 rounded-xl dark:bg-gray-700/50">
                <h4 className="font-semibold text-gray-800 mb-3 dark:text-white">
                  {t('smsNotifications.test.title', 'Test Xabar')}
                </h4>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  {t('smsNotifications.test.send', 'Test SMS yuborish')}
                </button>
                <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
                  {t('smsNotifications.test.description', 'SMS sozlamalari to\'g\'ri ishlashini tekshirish uchun test xabar yuboring')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}