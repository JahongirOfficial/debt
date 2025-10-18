import { useState, useEffect } from 'react';
import { formatNumberWithSpaces } from '../../utils/formatUtils';
import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';
import { useBranches } from '../../utils/BranchContext';

export function AddDebtModal({ isOpen, onClose, onSubmit }) {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const { activeBranch } = useBranches();
  const t = useTranslation(language);

  const [newDebt, setNewDebt] = useState({
    creditor: '',
    amount: '',
    description: '',
    phone: '',
    countryCode: '+998',
    debtDate: new Date().toISOString().split('T')[0],
    currency: activeBranch?.currency || currency || 'UZS'
  });

  // Update currency when active branch changes
  useEffect(() => {
    if (activeBranch?.currency) {
      setNewDebt(prev => ({ ...prev, currency: activeBranch.currency }));
    }
  }, [activeBranch]);

  // Country codes with flags
  const countryCodes = [
    { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+992', country: 'TJ', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'UK' },
    { code: '+77', country: 'KZ', flag: '🇰🇿', name: 'Kazakhstan' }
  ];

  // Handle amount input change with formatting
  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatNumberWithSpaces(inputValue);
    setNewDebt({ ...newDebt, amount: formattedValue });
  };

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const currentCountryCode = newDebt.countryCode;
    const digitsOnly = inputValue.replace(/\D/g, '');

    let formattedNumber = '';
    let maxDigits = 9;

    if (currentCountryCode === '+998') {
      maxDigits = 9;
      const limitedDigits = digitsOnly.slice(0, maxDigits);
      if (limitedDigits.length > 0) {
        formattedNumber += limitedDigits.slice(0, 2);
        if (limitedDigits.length > 2) formattedNumber += ' ' + limitedDigits.slice(2, 5);
        if (limitedDigits.length > 5) formattedNumber += ' ' + limitedDigits.slice(5, 7);
        if (limitedDigits.length > 7) formattedNumber += ' ' + limitedDigits.slice(7, 9);
      }
    }

    setNewDebt({ ...newDebt, phone: formattedNumber });
  };

  const handleCountryCodeChange = (code) => {
    setNewDebt({ ...newDebt, countryCode: code, phone: '' });
  };

  const handleCurrencyChange = (curr) => {
    setNewDebt({ ...newDebt, currency: curr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDebt.creditor.trim() || !newDebt.amount.trim()) {
      return;
    }
    
    // Store data before closing modal
    const debtData = { ...newDebt };
    
    // Close modal immediately for better UX
    onClose();
    
    // Reset form
    setNewDebt({
      creditor: '',
      amount: '',
      description: '',
      phone: '',
      countryCode: '+998',
      debtDate: new Date().toISOString().split('T')[0],
      currency: currency || 'UZS'
    });

    // Call API in background
    await onSubmit(debtData);
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-[443px] max-h-[92vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-2.5">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 backdrop-blur-sm"></div>
          <div className="relative flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {t('debts.form.addDebt', 'Yangi qarz qo\'shish')}
              </h3>
              <p className="text-white/80 text-xs">
                Qarz ma'lumotlarini to'ldiring
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-3.5 space-y-3.5 max-h-[calc(92vh-140px)] overflow-y-auto">
            {/* Creditor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t('debts.form.creditor', 'Kreditor nomi')} <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder={t('debts.form.creditorPlaceholder', 'Masalan: Ali Valiyev')}
                value={newDebt.creditor}
                onChange={(e) => setNewDebt({ ...newDebt, creditor: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 text-sm"
                autoFocus
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {t('debts.form.amount', 'Qarz miqdori')} <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('debts.form.amountPlaceholder', 'Masalan: 1 000 000')}
                  value={newDebt.amount}
                  onChange={handleAmountChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 text-sm"
                  required
                />
                <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium text-xs">
                  {newDebt.currency}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('debts.form.phone', 'Telefon raqami')}
                  <span className="text-gray-400 text-xs">({t('debts.form.optional', 'ixtiyoriy')})</span>
                </span>
              </label>
              <div className="flex gap-2">
                <div className="w-32">
                  <select
                    value={newDebt.countryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 appearance-none cursor-pointer text-sm"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="XX XXX XX XX"
                    value={newDebt.phone}
                    onChange={handlePhoneChange}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Date and Currency */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t('debts.form.debtDate', 'Qarz sanasi')}
                  </span>
                </label>
                <input
                  type="date"
                  value={newDebt.debtDate}
                  onChange={(e) => setNewDebt({ ...newDebt, debtDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    {t('debts.form.currency', 'Valyuta')}
                  </span>
                </label>
                <select
                  value={newDebt.currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 appearance-none cursor-pointer text-sm"
                >
                  <option value="UZS">{t('common.uzs', "UZS - O'zbek so'm")}</option>
                  <option value="USD">{t('common.usd', 'USD - Dollar')}</option>
                  <option value="EUR">{t('common.eur', 'EUR - Yevro')}</option>
                  <option value="RUB">{t('common.rub', 'RUB - Rubl')}</option>
                  <option value="TJS">{t('common.tjs', 'TJS - Tojik somoni')}</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('debts.form.description', 'Izoh')}
                  <span className="text-gray-400 text-xs">({t('debts.form.optional', 'ixtiyoriy')})</span>
                </span>
              </label>
              <textarea
                placeholder={t('debts.form.descriptionPlaceholder', 'Qarz haqida qisqa ma\'lumot')}
                value={newDebt.description}
                onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 resize-none text-sm"
                rows="2"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1.5 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('common.cancel', 'Bekor qilish')}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1.5 shadow-lg hover:shadow-xl text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('debts.form.addDebt', 'Qarz qo\'shish')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}