import React, { useState } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { formatNumberWithSpaces, parseFormattedNumber } from '../utils/formatUtils';
import { formatPhoneNumber, formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarDebts() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading, error, createDebt, updateDebt, deleteDebt, markAsPaid } = useDebts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingDebt, setEditingDebt] = useState(null); // For tracking which debt is being edited
  const [editForm, setEditForm] = useState({ amount: '', phone: '' }); // For edit form data
  
  const [activeTab, setActiveTab] = useState('dueToday'); // 'dueToday', 'pending', 'paid', 'all', 'threeDaysLeft', 'overdue'
  const [newDebt, setNewDebt] = useState({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
  
  // Country codes with flags
  const countryCodes = [
    { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+992', country: 'TJ', flag: '🇹🇯', name: 'Tajikistan' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'UK' },
    { code: '+77', country: 'KZ', flag: '🇰🇿', name: 'Kazakhstan' }
  ];

  const [debtSearch, setDebtSearch] = useState('');

  // Handle amount input change with formatting
  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    // Format the input value with spaces
    const formattedValue = formatNumberWithSpaces(inputValue);
    setNewDebt({...newDebt, amount: formattedValue});
  };

  // Handle phone number input change with international support
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const currentCountryCode = newDebt.countryCode;
    
    // Remove all non-digit characters
    const digitsOnly = inputValue.replace(/\D/g, '');
    
    // Format based on country
    let formattedNumber = '';
    let maxDigits = 9;
    
    if (currentCountryCode === '+998') { // Uzbekistan
      maxDigits = 9;
      const limitedDigits = digitsOnly.slice(0, maxDigits);
      if (limitedDigits.length > 0) {
        formattedNumber += limitedDigits.slice(0, 2);
        if (limitedDigits.length > 2) formattedNumber += ' ' + limitedDigits.slice(2, 5);
        if (limitedDigits.length > 5) formattedNumber += ' ' + limitedDigits.slice(5, 7);
        if (limitedDigits.length > 7) formattedNumber += ' ' + limitedDigits.slice(7, 9);
      }
    } else if (currentCountryCode === '+7' || currentCountryCode === '+77') { // Russia/Kazakhstan
      maxDigits = 10;
      const limitedDigits = digitsOnly.slice(0, maxDigits);
      if (limitedDigits.length > 0) {
        formattedNumber += limitedDigits.slice(0, 3);
        if (limitedDigits.length > 3) formattedNumber += ' ' + limitedDigits.slice(3, 6);
        if (limitedDigits.length > 6) formattedNumber += ' ' + limitedDigits.slice(6, 8);
        if (limitedDigits.length > 8) formattedNumber += ' ' + limitedDigits.slice(8, 10);
      }
    } else if (currentCountryCode === '+992') { // Tajikistan
      maxDigits = 9;
      const limitedDigits = digitsOnly.slice(0, maxDigits);
      if (limitedDigits.length > 0) {
        formattedNumber += limitedDigits.slice(0, 2);
        if (limitedDigits.length > 2) formattedNumber += ' ' + limitedDigits.slice(2, 5);
        if (limitedDigits.length > 5) formattedNumber += ' ' + limitedDigits.slice(5, 7);
        if (limitedDigits.length > 7) formattedNumber += ' ' + limitedDigits.slice(7, 9);
      }
    } else { // Other countries (US, UK)
      maxDigits = 10;
      const limitedDigits = digitsOnly.slice(0, maxDigits);
      if (limitedDigits.length > 0) {
        formattedNumber += limitedDigits.slice(0, 3);
        if (limitedDigits.length > 3) formattedNumber += ' ' + limitedDigits.slice(3, 6);
        if (limitedDigits.length > 6) formattedNumber += ' ' + limitedDigits.slice(6, 10);
      }
    }
    
    setNewDebt({...newDebt, phone: formattedNumber});
  };
  
  // Handle country code change
  const handleCountryCodeChange = (newCountryCode) => {
    setNewDebt({...newDebt, countryCode: newCountryCode, phone: ''});
  };

  const addDebt = async () => {
    if (!newDebt.creditor || !newDebt.amount) return;
    
    const debtData = {
      ...newDebt,
      amount: parseFormattedNumber(newDebt.amount), // Parse formatted number back to float
      debtDate: newDebt.debtDate,
      status: 'pending',
      currency: currency || 'UZS'
    };
    
    const result = await createDebt(debtData);
    
    if (result.success) {
      // Close the modal immediately after successful creation
      setShowAddForm(false);
      // Reset the form to initial state with +998 prefix and today's date
      setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
      
      // The other operations (fetching debts and calculating ratings) will happen in the background
      // without blocking the UI or keeping the modal open
    } else {
      // Handle error
      console.error('Failed to create debt:', result.message);
    }
  };

  const markAsPaidHandler = async (id) => {
    const result = await markAsPaid(id);
    if (!result.success) {
      console.error('Failed to mark debt as paid:', result.message);
    }
  };

  const deleteDebtHandler = async (id) => {
    const result = await deleteDebt(id);
    if (!result.success) {
      console.error('Failed to delete debt:', result.message);
    }
  };

  // Improved modal close function for Add Debt modal
  const closeModal = () => {
    // Reset the form to initial state with +998 prefix and today's date
    setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  // Handle backdrop click for Add Debt modal
  const handleAddModalBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      closeModal();
    }
  };

  // Handle ESC key press for Add Debt modal
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (showAddForm && e.key === 'Escape') {
        closeModal();
      }
    };

    if (showAddForm) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showAddForm]);

  // Filter debts based on current filters and active tab
  const getFilteredDebts = () => {
    let filteredDebts = debts;
    
    // Filter by status (tab)
    if (activeTab === 'dueToday') {
      // Show pending debts that are due exactly today
      // Ensure both dates are in the same format for comparison
      const todayFormatted = new Date().toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(debt => {
        // Handle potential different date formats
        if (!debt.debtDate) return false;
        
        // If debtDate is already a string in YYYY-MM-DD format
        if (typeof debt.debtDate === 'string' && debt.debtDate.length === 10) {
          return debt.status === 'pending' && debt.debtDate === todayFormatted;
        }
        
        // If debtDate is a Date object or other format, convert it to string
        try {
          const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
          return debt.status === 'pending' && debtDateFormatted === todayFormatted;
        } catch (e) {
          // If there's an error in date conversion, don't include this debt
          return false;
        }
      });
    } else if (activeTab === 'threeDaysLeft') {
      // Show pending debts that are due in 3 days or less
      const today = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);
      
      const todayFormatted = today.toISOString().split('T')[0];
      const threeDaysLaterFormatted = threeDaysLater.toISOString().split('T')[0];
      
      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        
        // If debtDate is already a string in YYYY-MM-DD format
        if (typeof debt.debtDate === 'string' && debt.debtDate.length === 10) {
          // Check if debtDate is after today and before or equal to three days later
          return debt.debtDate > todayFormatted && debt.debtDate <= threeDaysLaterFormatted;
        }
        
        // If debtDate is a Date object or other format, convert it to string
        try {
          const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
          return debtDateFormatted > todayFormatted && debtDateFormatted <= threeDaysLaterFormatted;
        } catch (e) {
          // If there's an error in date conversion, don't include this debt
          return false;
        }
      });
    } else if (activeTab === 'overdue') {
      // Show pending debts that are overdue (debtDate is before today)
      const todayFormatted = new Date().toISOString().split('T')[0];
      
      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        
        // If debtDate is already a string in YYYY-MM-DD format
        if (typeof debt.debtDate === 'string' && debt.debtDate.length === 10) {
          return debt.debtDate < todayFormatted;
        }
        
        // If debtDate is a Date object or other format, convert it to string
        try {
          const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
          return debtDateFormatted < todayFormatted;
        } catch (e) {
          // If there's an error in date conversion, don't include this debt
          return false;
        }
      });
    } else if (activeTab === 'pending') {
      filteredDebts = filteredDebts.filter(debt => debt.status === 'pending');
    } else if (activeTab === 'paid') {
      filteredDebts = filteredDebts.filter(debt => debt.status === 'paid');
    }
    
    // Filter by search term (within debts list)
    if (debtSearch) {
      const term = debtSearch.toLowerCase();
      filteredDebts = filteredDebts.filter(debt => 
        debt.creditor.toLowerCase().includes(term) ||
        (debt.description && debt.description.toLowerCase().includes(term)) ||
        debt.amount.toString().includes(term) ||
        (debt.phone && debt.phone.includes(term))
      );
    }
    
    return filteredDebts;
  };
  
  const filteredDebts = getFilteredDebts();

  // Function to show debt details
  const showDebtDetails = (debt) => {
    setShowDetailsModal(debt);
  };

  // Function to close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(null);
  };

  // Handle backdrop click for Details modal
  const handleDetailsModalBackdropClick = (e) => {
    if (e.target.id === 'details-modal-backdrop') {
      closeDetailsModal();
    }
  };

  // Handle ESC key press for details modal
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (showDetailsModal && e.key === 'Escape') {
        closeDetailsModal();
      }
    };

    if (showDetailsModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showDetailsModal]);

  // Function to start editing a debt
  const startEditing = (debt) => {
    setEditingDebt(debt._id);
    setEditForm({
      amount: formatNumberWithSpaces(debt.amount.toString()),
      phone: debt.phone || '+998 '
    });
  };

  // Function to save edited debt
  const saveEdit = async () => {
    if (!editingDebt) return;
    
    const updateData = {
      amount: parseFormattedNumber(editForm.amount),
      phone: editForm.phone
    };
    
    const result = await updateDebt(editingDebt, updateData);
    
    if (result.success) {
      setEditingDebt(null);
      setEditForm({ amount: '', phone: '' });
    } else {
      console.error('Failed to update debt:', result.message);
    }
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingDebt(null);
    setEditForm({ amount: '', phone: '' });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <SkeletonLoader type="debtsList" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('debts.title', 'Qarzlar ro\'yhati')}</h2>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Xato! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('debts.title', 'Qarzlar ro\'yhati')}</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('debts.addNew', 'Yangi qarz qo\'shish')}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t('debts.searchPlaceholder', 'Qarzlarni izlash...')}
            value={debtSearch}
            onChange={(e) => setDebtSearch(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-wrap gap-2 mb-6 p-3 bg-white/50 rounded-xl dark:bg-gray-800/50">
        <button
          onClick={() => setActiveTab('dueToday')}
          className={`px-5 py-2 rounded-full transition-all ${
            activeTab === 'dueToday'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.dueToday', 'Bugun to\'lanishi kerak')}
        </button>
        <button
          onClick={() => setActiveTab('threeDaysLeft')}
          className={`px-5 py-2 rounded-full transition-all ${
            activeTab === 'threeDaysLeft'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.threeDaysLeft', '3 kun qoldi')}
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-5 py-2 rounded-full transition-all ${
            activeTab === 'overdue'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.overdue', 'Muddati o\'tib ketgan')}
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-5 py-2 rounded-full transition-all ${
            activeTab === 'pending'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.pending', 'Kutilayotgan')}
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-5 py-2 rounded-full transition-all ${
            activeTab === 'paid'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.paid', 'To\'langan')}
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2 rounded-full transition-all ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.all', 'Barchasi')}
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          {filteredDebts.length} {t('debts.results', 'ta qarz topildi')}
        </p>
      </div>

      {/* Modern Excel-style Table Layout */}
      {filteredDebts.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {debtSearch ? t('debts.noResults', 'Filtr bo\'yicha qarzlar topilmadi') : t('debts.noDebts', 'Hali qarzlar qo\'shilmagan')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {debtSearch ? t('debts.noResultsSubtitle', 'Filtr sozlamalarini o\'zgartiring') : t('debts.noDebtsSubtitle', 'Yuqoridagi tugma orqali yangi qarz qo\'shing')}
          </p>
          {!debtSearch && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              {t('debts.addNew', 'Yangi qarz qo\'shish')}
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <th className="py-3 px-4 text-left rounded-tl-lg">#</th>
                <th className="py-3 px-4 text-left">{t('debts.form.creditor', 'Kreditor')}</th>
                <th className="py-3 px-4 text-left">{t('debts.form.amount', 'Miqdori')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('debts.form.phone', 'Telefon')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('debts.form.debtDate', 'Sana')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('debts.form.createdDate', 'Yaratilgan')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('debts.form.status', 'Holat')}</th>
                <th className="py-3 px-4 text-left rounded-tr-lg">{t('common.actions', 'Amallar')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDebts.map((debt, index) => (
                <tr 
                  key={debt._id} 
                  className={`${
                    index % 2 === 0 
                      ? 'bg-white dark:bg-gray-800' 
                      : 'bg-gray-50 dark:bg-gray-700'
                  } hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors`}
                >
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-mono">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2">
                        {debt.creditor.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{debt.creditor}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                          {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-800 dark:text-white">
                    {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    {debt.phone ? formatPhoneNumber(debt.phone, debt.countryCode) : <span className="text-gray-400 italic">-</span>}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    {new Date(debt.debtDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    {new Date(debt.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      debt.status === 'paid' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {debt.status === 'paid' 
                        ? t('common.paid', 'To\'langan') 
                        : t('common.pending', 'Kutilmoqda')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => showDebtDetails(debt)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title={t('common.details', 'Batafsil')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {debt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => markAsPaidHandler(debt._id)}
                            className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            title={t('debts.form.markAsPaid', 'To\'langan deb belgilash')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteDebtHandler(debt._id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            title={t('common.delete', 'O\'chirish')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Debt Modal */}
      {showAddForm && (
        <div 
          id="modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleAddModalBackdropClick}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 dark:bg-gray-800 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {t('debts.form.addDebt', 'Qarz qo\'shish')}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  {t('debts.form.creditor', 'Kreditor nomi')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('debts.form.creditorPlaceholder', 'Masalan: Ali')}
                  value={newDebt.creditor}
                  onChange={(e) => setNewDebt({...newDebt, creditor: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  {t('debts.form.amount', 'Qarz miqdori')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('debts.form.amountPlaceholder', 'Masalan: 1 000 000')}
                  value={newDebt.amount}
                  onChange={handleAmountChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  {t('debts.form.description', 'Izoh')} <span className="text-gray-400 text-xs">({t('debts.form.optional', 'ixtiyoriy')})</span>
                </label>
                <textarea
                  placeholder={t('debts.form.descriptionPlaceholder', 'Qarz haqida qisqa ma\'lumot')}
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    {t('debts.form.phone', 'Telefon raqami')}
                  </label>
                  <select
                    value={newDebt.countryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center'
                    }}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    &nbsp;
                  </label>
                  <input
                    type="text"
                    placeholder="XX XXX XX XX"
                    value={newDebt.phone}
                    onChange={handlePhoneChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                {t('debts.form.phoneNote', 'Raqamlar avtomatik formatlanadi')}
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  {t('debts.form.debtDate', 'Qarz sanasi')}
                </label>
                <input
                  type="date"
                  value={newDebt.debtDate}
                  onChange={(e) => setNewDebt({...newDebt, debtDate: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addDebt}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  {t('debts.form.addDebt', 'Qarz qo\'shish')}
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                >
                  {t('common.cancel', 'Bekor qilish')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debt Details Modal */}
      {showDetailsModal && (
        <div 
          id="details-modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleDetailsModalBackdropClick}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 dark:bg-gray-800 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeDetailsModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {t('debts.form.debtId', 'Qarz ID')}: {showDetailsModal._id?.substring(0, 8)}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {showDetailsModal.creditor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                    {showDetailsModal.creditor}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {formatCurrency(showDetailsModal.amount, showDetailsModal.currency || currency || 'UZS', language)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('debts.form.status', 'Holat')}
                  </label>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    showDetailsModal.status === 'paid' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {showDetailsModal.status === 'paid' 
                      ? t('common.paid', 'To\'langan') 
                      : t('common.pending', 'Kutilmoqda')}
                  </span>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('debts.form.debtDate', 'Qarz sanasi')}
                  </label>
                  <p className="text-gray-800 dark:text-white font-medium">
                    {new Date(showDetailsModal.debtDate).toLocaleDateString()}
                  </p>
                </div>
                
                {showDetailsModal.paidAt && (
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {t('debts.form.paidDate', 'To\'langan sana')}
                    </label>
                    <p className="text-gray-800 dark:text-white font-medium">
                      {new Date(showDetailsModal.paidAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('common.phoneNumber', 'Telefon raqami')}
                  </label>
                  <p className="text-gray-800 dark:text-white font-medium">
                    {showDetailsModal.phone ? formatPhoneNumber(showDetailsModal.phone, showDetailsModal.countryCode) : '-'}
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('debts.form.description', 'Izoh')}
                </label>
                <p className="text-gray-800 dark:text-white">
                  {showDetailsModal.description || '-'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('debts.form.createdDate', 'Yaratilgan sana')}
                  </label>
                  <p className="text-gray-800 dark:text-white font-medium">
                    {new Date(showDetailsModal.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t('debts.form.updatedDate', 'Yangilangan sana')}
                  </label>
                  <p className="text-gray-800 dark:text-white font-medium">
                    {new Date(showDetailsModal.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                {showDetailsModal.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        markAsPaidHandler(showDetailsModal._id);
                        closeDetailsModal();
                      }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg font-medium transition-all"
                    >
                      {t('debts.form.markAsPaid', 'To\'langan deb belgilash')}
                    </button>
                    <button
                      onClick={() => {
                        startEditing(showDetailsModal);
                        closeDetailsModal();
                      }}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium transition-all"
                    >
                      {t('common.edit', 'Tahrirlash')}
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    deleteDebtHandler(showDetailsModal._id);
                    closeDetailsModal();
                  }}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white py-2 rounded-lg font-medium transition-all"
                >
                  {t('common.delete', 'O\'chirish')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
