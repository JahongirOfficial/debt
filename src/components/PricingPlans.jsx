import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useTranslation } from '../utils/translationUtils';
import { useAuth } from '../utils/AuthContext';

// Add CSS for the rotating border animation
const style = `
  @keyframes rotateBorder {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .rotate-border {
    animation: rotateBorder 3s linear infinite;
  }
  
  @keyframes pulseBorder {
    0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
  }
  .pulse-border {
    animation: pulseBorder 2s infinite;
  }
`;

export function QarzdaftarPricingPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { user } = useAuth();

  // Function to handle upgrade button click
  const handleUpgradeClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get user's current tier
  const userTier = user && user.subscriptionTier ? user.subscriptionTier.toLowerCase() : 'free';

  const plans = [
    {
      name: t('pricing.free.name', 'Bepul'),
      price: '0',
      period: t('pricing.month', 'so\'m'),
      debtLimit: 20,
      features: [
        t('pricing.free.feature1', '20 ta qarzni boshqarish'),
        t('pricing.free.feature2', 'Texnik qo\'llab-quvvatlash'),
        t('pricing.free.feature4', 'Telegram eslatmalar'),
        t('pricing.free.feature5', 'SMS xabar xizmati')
      ],
      oneTimeFeatures: [
        t('pricing.free.feature6', '5 ta AI post dizayn')
      ],
      cta: t('pricing.currentPlan', 'Joriy tarif'),
      isCurrent: userTier === 'free',
      popular: false,
      color: 'gray'
    },
    {
      name: t('pricing.standard.name', 'Standart'),
      price: '69,000',
      period: t('pricing.month', 'so\'m'),
      debtLimit: 150,
      features: [
        t('pricing.standard.feature1', '150 ta qarzni boshqarish'),
        t('pricing.standard.feature2', 'Kunlik Excel hisobotlar'),
        t('pricing.standard.feature4', 'Telegram eslatmalar'),
        t('pricing.standard.feature5', 'Maxsus qo\'llab-quvvatlash'),
        t('pricing.standard.feature6', 'SMS xabar xizmati')
      ],
      oneTimeFeatures: [
        t('pricing.standard.feature7', '15 ta AI post dizayn'),
        t('pricing.standard.feature8', '1 oylik marketing plan')
      ],
      cta: t('pricing.upgrade', 'Tarifni yangilash'),
      isCurrent: userTier === 'standard',
      popular: true,
      color: 'orange'
    },
    {
      name: t('pricing.pro.name', 'Pro'),
      price: '199,000',
      period: t('pricing.month', 'so\'m'),
      debtLimit: 'unlimited',
      features: [
        t('pricing.pro.feature1', 'Cheksiz qarzni boshqarish'),
        t('pricing.pro.feature3', 'Kunlik Excel hisobotlar'),
        t('pricing.pro.feature4', 'Telegram eslatmalar'),
        t('pricing.pro.feature5', '24/7 qo\'llab-quvvatlash'),
        t('pricing.pro.feature6', 'Kengaytirilgan SMS xizmati')
      ],
      oneTimeFeatures: [
        t('pricing.pro.feature7', '25 ta AI post dizayn'),
        t('pricing.pro.feature8', '3 oylik kengaytirilgan marketing plan')
      ],
      cta: t('pricing.upgrade', 'Tarifni yangilash'),
      isCurrent: userTier === 'pro',
      popular: false,
      color: 'purple'
    }
  ];

  // Function to get plan-specific styling
  const getPlanStyling = (plan) => {
    if (plan.isCurrent) {
      return {
        border: 'border-2 border-blue-500 shadow-lg shadow-blue-500/20',
        background: 'bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 dark:from-blue-900/30 dark:via-blue-900/20 dark:to-blue-800/30',
        title: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-500 hover:bg-blue-600 text-white',
        buttonDisabled: 'bg-blue-200 text-blue-500 cursor-not-allowed dark:bg-blue-700 dark:text-blue-400',
        glow: 'ring-2 ring-blue-500/30 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
      };
    }

    switch (plan.color) {
      case 'orange':
        return {
          border: 'border-2 border-orange-500',
          background: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30',
          title: 'text-orange-600 dark:text-orange-400',
          button: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
          buttonDisabled: 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400',
          glow: ''
        };
      case 'purple':
        return {
          border: 'border-2 border-purple-500',
          background: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30',
          title: 'text-purple-600 dark:text-purple-400',
          button: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
          buttonDisabled: 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
        };
      default:
        return {
          border: 'border-2 border-gray-200 dark:border-gray-700',
          background: 'bg-white dark:bg-gray-800',
          title: 'text-gray-800 dark:text-white',
          button: 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
          buttonDisabled: 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400',
          glow: ''
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <style>{style}</style>
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 dark:text-white">
          {t('pricing.title', 'Tarif rejalari')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('pricing.subtitle', 'O\'zingizga mos tarifni tanlang')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const styling = getPlanStyling(plan);
          return (
            <div
              key={index}
              className={`relative rounded-2xl p-6 transition-all duration-500 hover:shadow-xl flex flex-col ${styling.border
                } ${styling.background} ${plan.popular ? 'scale-105 z-10' : ''
                }`}
            >
              {plan.popular && !plan.isCurrent && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {t('pricing.popular', 'Eng ommabop')}
                </div>
              )}
              {plan.isCurrent && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  {t('pricing.currentPlan', 'Joriy tarif')}
                </div>
              )}
              <div className="flex-grow flex flex-col">
                <div className="text-center mb-6 flex-grow">
                  <h4 className={`text-lg md:text-xl font-bold mb-2 ${styling.title}`}>
                    {plan.name}
                  </h4>
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400"> {plan.period}</span>
                  </div>

                  <div className="space-y-6 mb-8 flex-grow">
                    {/* Regular Features */}
                    <ul className="space-y-3">
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

                    {/* One-time Features */}
                    {plan.oneTimeFeatures && plan.oneTimeFeatures.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t('pricing.oneTime', 'Bir martalik')}
                        </h5>
                        <ul className="space-y-3">
                          {plan.oneTimeFeatures.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <svg
                                className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0 mt-0.5"
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
                    )}
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    disabled={plan.isCurrent}
                    onClick={!plan.isCurrent ? handleUpgradeClick : undefined}
                    className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 relative ${plan.isCurrent
                      ? styling.buttonDisabled
                      : styling.button
                      } ${!plan.isCurrent && plan.color === 'purple' ? 'pulse-border' : ''
                      }`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Tarifni yangilash
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray00 dark:hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Tarif o'zgartirish uchun murojat qiling:
                </p>

                <div className="space-y-4">
                  {/* Phone Contact */}
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Telefon qilish</p>
                      <a href="tel:+998773109828" className="text-blue-600 dark:text-blue-400 hover:underline">
                        +998 77 310 98 28
                      </a>
                    </div>
                  </div>

                  {/* Telegram Contact */}
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Telegram</p>
                      <a href="https://t.me/opscoder" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        @opscoder
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
