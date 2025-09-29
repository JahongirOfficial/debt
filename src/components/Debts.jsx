import React, { useState } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { formatNumberWithSpaces, parseFormattedNumber } from '../utils/formatUtils';
import { formatPhoneNumber, formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { useAuth } from '../utils/AuthContext';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarDebts() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading, error, createDebt, updateDebt, deleteDebt, markAsPaid, fetchDebtHistory } = useDebts();
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingDebt, setEditingDebt] = useState(null); // For tracking which debt is being edited
  const [editForm, setEditForm] = useState({ amount: '', phone: '', countryCode: '+998', reason: '' }); // For edit form data
  const [debtHistory, setDebtHistory] = useState([]); // For storing debt history
  const [showHistoryModal, setShowHistoryModal] = useState(null); // For tracking which debt's history is being viewed
  const [activeTab, setActiveTab] = useState('dueToday'); // 'dueToday', 'pending', 'paid', 'all', 'threeDaysLeft', 'overdue'
  const [newDebt, setNewDebt] = useState({ 
    creditor: '', 
    amount: '', 
    description: '', 
    phone: '', 
    countryCode: '+998', 
    debtDate: new Date().toISOString().split('T')[0],
    currency: currency || 'UZS' // Add currency field with default from settings
  });
  
  // Check user's subscription tier and get debt limit
  const getUserDebtLimit = () => {
    if (user && user.subscriptionTier) {
      const tier = user.subscriptionTier.toLowerCase();
      switch (tier) {
        case 'pro':
          return 500;
        case 'standard':
          return 100;
        case 'free':
        default:
          return 10;
      }
    }
    return 10; // Default to free tier limit
  };
  
  const userDebtLimit = getUserDebtLimit();
  const userTier = user && user.subscriptionTier ? user.subscriptionTier.toLowerCase() : 'free';
  
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

  // Handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setNewDebt({...newDebt, currency: newCurrency});
  };

  const addDebt = async () => {
    if (!newDebt.creditor || !newDebt.amount) return;
    
    // Check if user has reached the debt limit
    if (debts.length >= userDebtLimit) {
      const tierName = userTier.charAt(0).toUpperCase() + userTier.slice(1);
      alert(t('debts.tierLimitReached', `Siz ${tierName} tarifidasiz va ${userDebtLimit} ta qarz qo'shdingiz. Ko'proq qarz qo'shish uchun tarifni yangilang.`, { tier: tierName, limit: userDebtLimit }));
      return;
    }
    
    const debtData = {
      ...newDebt,
      amount: parseFormattedNumber(newDebt.amount), // Parse formatted number back to float
      debtDate: newDebt.debtDate,
      status: 'pending',
      currency: newDebt.currency || currency || 'UZS' // Use selected currency or default
    };
    
    const result = await createDebt(debtData);
    
    if (result.success) {
      // Close the modal immediately after successful creation
      setShowAddForm(false);
      // Reset the form to initial state with +998 prefix and today's date
      setNewDebt({ 
        creditor: '', 
        amount: '', 
        description: '', 
        phone: '', 
        countryCode: '+998', 
        debtDate: new Date().toISOString().split('T')[0],
        currency: currency || 'UZS' // Reset to default currency
      });
      
      // The other operations (fetching debts and calculating ratings) will happen in the background
      // without blocking the UI or keeping the modal open
    } else {
      // Handle error
      console.error('Failed to create debt:', result.message);
    }
  };

  const markAsPaidHandler = async (id, reason = '') => {
    const result = await markAsPaid(id, reason);
    if (!result.success) {
      console.error('Failed to mark debt as paid:', result.message);
    }
    return result;
  };

  const deleteDebtHandler = async (id, reason = '') => {
    const result = await deleteDebt(id, reason);
    if (!result.success) {
      console.error('Failed to delete debt:', result.message);
    }
    return result;
  };

  // Improved modal close function for Add Debt modal
  const closeModal = () => {
    // Reset the form to initial state with +998 prefix and today's date
    setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0], currency: currency || 'UZS' });
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
    setEditingDebt(debt);
    setEditForm({
      amount: formatNumberWithSpaces(debt.amount.toString()),
      phone: debt.phone || '',
      countryCode: debt.countryCode || '+998'
    });
  };

  // Function to handle edit form changes
  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle edit phone change
  const handleEditPhoneChange = (e) => {
    const inputValue = e.target.value;
    const currentCountryCode = editForm.countryCode;
    
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
    
    setEditForm({...editForm, phone: formattedNumber});
  };

  // Function to handle edit country code change
  const handleEditCountryCodeChange = (newCountryCode) => {
    setEditForm({...editForm, countryCode: newCountryCode, phone: ''});
  };

  // Function to handle edit amount change
  const handleEditAmountChange = (e) => {
    const inputValue = e.target.value;
    // Format the input value with spaces
    const formattedValue = formatNumberWithSpaces(inputValue);
    setEditForm({...editForm, amount: formattedValue});
  };

  // Function to save edited debt
  const saveEdit = async () => {
    if (!editingDebt) return;
    
    const updateData = {
      amount: parseFormattedNumber(editForm.amount),
      phone: editForm.phone,
      countryCode: editForm.countryCode,
      reason: editForm.reason
    };
    
    const result = await updateDebt(editingDebt._id, updateData);
    
    if (result.success) {
      setEditingDebt(null);
      setEditForm({ amount: '', phone: '', countryCode: '+998', reason: '' });
    } else {
      console.error('Failed to update debt:', result.message);
    }
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingDebt(null);
    setEditForm({ amount: '', phone: '', countryCode: '+998', reason: '' });
  };

  // Handle backdrop click for Edit modal
  const handleEditModalBackdropClick = (e) => {
    if (e.target.id === 'edit-modal-backdrop') {
      cancelEdit();
    }
  };

  // Handle ESC key press for Edit modal
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (editingDebt && e.key === 'Escape') {
        cancelEdit();
      }
    };

    if (editingDebt) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [editingDebt]);

  // Function to fetch and show debt history
  const showDebtHistory = async (debtId) => {
    const result = await fetchDebtHistory(debtId);
    
    if (result.success) {
      setDebtHistory(result.history);
      setShowHistoryModal(debtId);
    } else {
      console.error('Failed to fetch debt history:', result.message);
    }
  };

  // Handle backdrop click for History modal
  const handleHistoryModalBackdropClick = (e) => {
    if (e.target.id === 'history-modal-backdrop') {
      setShowHistoryModal(null);
      setDebtHistory([]);
    }
  };

  // Handle ESC key press for History modal
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (showHistoryModal && e.key === 'Escape') {
        setShowHistoryModal(null);
        setDebtHistory([]);
      }
    };

    if (showHistoryModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showHistoryModal]);

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
          onClick={() => {
            // Check if user has reached the debt limit
            if (debts.length >= userDebtLimit) {
              const tierName = userTier.charAt(0).toUpperCase() + userTier.slice(1);
              alert(t('debts.tierLimitReached', `Siz ${tierName} tarifidasiz va ${userDebtLimit} ta qarz qo'shdingiz. Ko'proq qarz qo'shish uchun tarifni yangilang.`, { tier: tierName, limit: userDebtLimit }));
              return;
            }
            setShowAddForm(true);
          }}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Show upgrade message when user has reached the debt limit */}
      {debts.length >= userDebtLimit && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl dark:bg-yellow-900/30 dark:border-yellow-700">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                {t('debts.tierLimitTitle', 'Qarzlar cheklangan')}
              </h4>
              <p className="text-sm text-yellow-700 mt-1 dark:text-yellow-300">
                {t('debts.tierLimitReached', `Siz ${userTier.charAt(0).toUpperCase() + userTier.slice(1)} tarifidasiz va ${userDebtLimit} ta qarz qo'shdingiz. Ko'proq qarz qo'shish uchun tarifni yangilang.`, { tier: userTier.charAt(0).toUpperCase() + userTier.slice(1), limit: userDebtLimit })}{' '}
                <button 
                  className="text-orange-600 font-medium hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                  onClick={() => alert(t('debts.upgradePrompt', 'Tarifni yangilash funksiyasi tez orada qo\'shiladi'))}
                >
                  {t('debts.upgradeNow', 'Hoziroq yangilang')}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t('debts.searchPlaceholder', 'Qarzlarni izlash...')}
            value={debtSearch}
            onChange={(e) => setDebtSearch(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
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
          className={`px-4 py-2 rounded-full transition-all text-sm ${
            activeTab === 'dueToday'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.dueToday', 'Bugungi')}
        </button>
        <button
          onClick={() => setActiveTab('threeDaysLeft')}
          className={`px-4 py-2 rounded-full transition-all text-sm ${
            activeTab === 'threeDaysLeft'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.threeDaysLeft', '3 kun qoldi')}
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-4 py-2 rounded-full transition-all text-sm ${
            activeTab === 'overdue'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.overdue', 'Qarz')}
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-full transition-all text-sm ${
            activeTab === 'pending'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.pending', 'Kutilayotgan')}
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`px-4 py-2 rounded-full transition-all text-sm ${
            activeTab === 'paid'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.paid', 'To\'langan')}
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full transition-all text-sm ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {t('debts.all', 'Barchasi')}
        </button>
      </div>
    
      {/* Add Debt Modal */}
      {showAddForm && (
        <div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleAddModalBackdropClick}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('debts.addDebt', 'Yangi qarz qo\'shish')}</h3>
            <form onSubmit={(e) => { e.preventDefault(); addDebt(); }}>
              <div className="mb-4">
                <label htmlFor="creditor" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.creditor', 'Qarzchi')}
                </label>
                <input
                  type="text"
                  id="creditor"
                  value={newDebt.creditor}
                  onChange={(e) => setNewDebt({...newDebt, creditor: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.amount', 'Summa')}
                </label>
                <input
                  type="text"
                  id="amount"
                  value={newDebt.amount}
                  onChange={handleAmountChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.phone', 'Telefon')}
                </label>
                <div className="flex">
                  <select
                    id="countryCode"
                    value={newDebt.countryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    className="w-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                  >
                    {countryCodes.map(code => (
                      <option key={code.code} value={code.code}>{code.flag} {code.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="phone"
                    value={newDebt.phone}
                    onChange={handlePhoneChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.description', 'Izoh')}
                </label>
                <textarea
                  id="description"
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="debtDate" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.date', 'Sana')}
                </label>
                <input
                  type="date"
                  id="debtDate"
                  value={newDebt.debtDate}
                  onChange={(e) => setNewDebt({...newDebt, debtDate: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg mr-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
                >
                  {t('debts.cancel', 'Bekor qilish')}
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-lg hover:shadow-lg transition-all"
                >
                  {t('debts.add', 'Qo\'shish')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Debt Details Modal */}
      {showDetailsModal && (
        <div id="details-modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleDetailsModalBackdropClick}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('debts.debtDetails', 'Qarz ma\'lumotlari')}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.creditor', 'Qarzchi')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{showDetailsModal.creditor}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.amount', 'Summa')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{formatCurrency(showDetailsModal.amount, showDetailsModal.currency || currency || 'UZS', language)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.phone', 'Telefon')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{formatPhoneNumber(showDetailsModal.phone, showDetailsModal.countryCode)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.date', 'Sana')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{new Date(showDetailsModal.debtDate).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.status', 'Holat')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{showDetailsModal.status === 'pending' ? t('debts.pending', 'Kutilayotgan') : t('debts.paid', 'To\'langan')}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.description', 'Izoh')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{showDetailsModal.description || t('debts.noDescription', 'Izoh yo\'q')}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeDetailsModal}
                className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg mr-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
              >
                {t('debts.close', 'Yopish')}
              </button>
              <button
                onClick={() => markAsPaidHandler(showDetailsModal._id)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-lg hover:shadow-lg transition-all"
              >
                {t('debts.markAsPaid', 'To\'langan deb o\'rnatish')}
              </button>
              <button
                onClick={() => showDebtHistory(showDetailsModal._id)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-lg hover:shadow-lg transition-all"
              >
                {t('debts.history', 'Tarix')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Debt Modal */}
      {editingDebt && (
        <div id="edit-modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleEditModalBackdropClick}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('debts.editDebt', 'Qarzni tahrirlash')}</h3>
            <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
              <div className="mb-4">
                <label htmlFor="creditor" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.creditor', 'Qarzchi')}
                </label>
                <input
                  type="text"
                  id="creditor"
                  value={editingDebt.creditor}
                  onChange={(e) => setEditingDebt({...editingDebt, creditor: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.amount', 'Summa')}
                </label>
                <input
                  type="text"
                  id="amount"
                  value={editForm.amount}
                  onChange={handleEditAmountChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.phone', 'Telefon')}
                </label>
                <div className="flex">
                  <select
                    id="countryCode"
                    value={editForm.countryCode}
                    onChange={(e) => handleEditCountryCodeChange(e.target.value)}
                    className="w-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                  >
                    {countryCodes.map(code => (
                      <option key={code.code} value={code.code}>{code.flag} {code.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="phone"
                    value={editForm.phone}
                    onChange={handleEditPhoneChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  {t('debts.description', 'Izoh')}
                </label>
                <textarea
                  id="description"
                  value={editForm.reason}
                  onChange={(e) => handleEditFormChange('reason', e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg mr-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
                >
                  {t('debts.cancel', 'Bekor qilish')}
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-lg hover:shadow-lg transition-all"
                >
                  {t('debts.save', 'Saqlash')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Debt History Modal */}
      {showHistoryModal && (
        <div id="history-modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleHistoryModalBackdropClick}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('debts.debtHistory', 'Qarz tarixi')}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.creditor', 'Qarzchi')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{debts.find(debt => debt._id === showHistoryModal)?.creditor}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.amount', 'Summa')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{formatCurrency(debts.find(debt => debt._id === showHistoryModal)?.amount, debts.find(debt => debt._id === showHistoryModal)?.currency || currency || 'UZS', language)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.phone', 'Telefon')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{formatPhoneNumber(debts.find(debt => debt._id === showHistoryModal)?.phone, debts.find(debt => debt._id === showHistoryModal)?.countryCode)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.date', 'Sana')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{new Date(debts.find(debt => debt._id === showHistoryModal)?.debtDate).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.status', 'Holat')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{debts.find(debt => debt._id === showHistoryModal)?.status === 'pending' ? t('debts.pending', 'Kutilayotgan') : t('debts.paid', 'To\'langan')}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.description', 'Izoh')}
              </label>
              <p className="text-gray-600 dark:text-gray-300">{debts.find(debt => debt._id === showHistoryModal)?.description || t('debts.noDescription', 'Izoh yo\'q')}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                {t('debts.history', 'Tarix')}
              </label>
              <ul className="list-disc pl-4">
                {debtHistory.map((entry, index) => (
                  <li key={index}>
                    <p className="text-gray-600 dark:text-gray-300">{entry.date}: {entry.reason}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowHistoryModal(null)}
                className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg mr-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
              >
                {t('debts.close', 'Yopish')}
              </button>
            </div>
          </div>
        </div>
      )}

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
                    <div className="flex space-x-1">
                      <button
                        onClick={() => showDebtDetails(debt)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                        title={t('common.details', 'Batafsil')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {debt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => startEditing(debt)}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            title={t('common.edit', 'Tahrirlash')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={async () => {
                              // Prompt for reason before marking as paid
                              const reason = window.prompt(t('debts.form.payReasonPrompt', 'To\'lash sababini kiriting (ixtiyoriy):'));
                              const result = await markAsPaidHandler(debt._id, reason || '');
                              // Optionally, you could show a notification or update the UI here
                            }}
                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-700 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                            title={t('debts.form.markAsPaid', 'To\'langan deb belgilash')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={async () => {
                              // Prompt for reason before deleting
                              const reason = window.prompt(t('debts.form.deleteReasonPrompt', 'O\'chirish sababini kiriting (ixtiyoriy):'));
                              const result = await deleteDebtHandler(debt._id, reason || '');
                              // Optionally, you could show a notification or update the UI here
                            }}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            title={t('common.delete', 'O\'chirish')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  {t('debts.form.currency', 'Valyuta')}
                </label>
                <select
                  value={newDebt.currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center'
                  }}
                >
                  <option value="UZS">{t('common.uzs', "UZS - O'zbek so'm")}</option>
                  <option value="USD">{t('common.usd', 'USD - Dollar')}</option>
                  <option value="EUR">{t('common.eur', 'EUR - Yevro')}</option>
                  <option value="RUB">{t('common.rub', 'RUB - Rubl')}</option>
                  <option value="TJS">{t('common.tjs', 'TJS - Tojik somoni')}</option>
                </select>
              </div>
              

              
              <div className="flex gap-2 pt-2">
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
              
              <div className="flex gap-2 pt-2 justify-center">
                {showDetailsModal.status === 'pending' && (
                  <>
                    <button
                      onClick={async () => {
                        // Prompt for reason before marking as paid
                        const reason = window.prompt(t('debts.form.payReasonPrompt', 'To\'lash sababini kiriting (ixtiyoriy):'));
                        const result = await markAsPaidHandler(showDetailsModal._id, reason || '');
                        if (result && result.success) {
                          closeDetailsModal();
                        }
                      }}
                      className="p-3 rounded-full bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-700 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                      title={t('debts.form.markAsPaid', 'To\'langan deb belgilash')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        startEditing(showDetailsModal);
                        closeDetailsModal();
                      }}
                      className="p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-500 hover:text-yellow-700 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                      title={t('common.edit', 'Tahrirlash')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </>
                )}
                <button
                  onClick={() => showDebtHistory(showDetailsModal._id)}
                  className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  title={t('debts.form.viewHistory', 'Tarixni ko\'rish')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={async () => {
                    // Prompt for reason before deleting
                    const reason = window.prompt(t('debts.form.deleteReasonPrompt', 'O\'chirish sababini kiriting (ixtiyoriy):'));
                    const result = await deleteDebtHandler(showDetailsModal._id, reason || '');
                    if (result && result.success) {
                      closeDetailsModal();
                    }
                  }}
                  className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title={t('common.delete', 'O\'chirish')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Debt Modal */}
      {editingDebt && (
        <div 
          id="edit-modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleEditModalBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {t('debts.editDebt', 'Qarzni tahrirlash')}
                </h3>
                <button 
                  onClick={cancelEdit}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('debts.form.creditor', 'Kreditor')}
                  </label>
                  <input
                    type="text"
                    value={editingDebt.creditor}
                    disabled
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('debts.form.amount', 'Miqdori')}
                  </label>
                  <input
                    type="text"
                    value={editForm.amount}
                    onChange={handleEditAmountChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={t('debts.form.amountPlaceholder', 'Miqdorni kiriting')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('debts.form.reason', 'Tahrirlash sababi')} <span className="text-gray-400 text-xs">({t('debts.form.optional', 'ixtiyoriy')})</span>
                  </label>
                  <textarea
                    value={editForm.reason}
                    onChange={(e) => handleEditFormChange('reason', e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={t('debts.form.reasonPlaceholder', 'Tahrirlash sababini kiriting')}
                    rows="2"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('debts.form.countryCode', 'Mamlakat kodi')}
                  </label>
                  <select
                    value={editForm.countryCode}
                    onChange={(e) => handleEditCountryCodeChange(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('debts.form.phone', 'Telefon')}
                  </label>
                  <input
                    type="text"
                    placeholder="XX XXX XX XX"
                    value={editForm.phone}
                    onChange={handleEditPhoneChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t('common.cancel', 'Bekor qilish')}
                  </button>
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg shadow transition-all"
                  >
                    {t('common.save', 'Saqlash')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div 
          id="history-modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleHistoryModalBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('debts.debtHistory', 'Qarz tarixi')}
                </h3>
                <button
                  onClick={() => {
                    setShowHistoryModal(null);
                    setDebtHistory([]);
                  }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`overflow-y-auto flex-grow p-6 ${debtHistory.length > 5 ? 'max-h-[60vh]' : ''}`}>
              <div className="space-y-4">
                {debtHistory.length > 0 ? (
                  debtHistory.map((historyItem, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            historyItem.action === 'created' ? 'bg-blue-100 text-blue-800' :
                            historyItem.action === 'updated' ? 'bg-yellow-100 text-yellow-800' :
                            historyItem.action === 'paid' ? 'bg-green-100 text-green-800' :
                            historyItem.action === 'deleted' ? 'bg-red-100 text-red-800' :
                            historyItem.action === 'adjustment' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {t(`debts.action.${historyItem.action}`, t(`debts.${historyItem.action}`, historyItem.action))}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(historyItem.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(historyItem.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                      
                      {/* Action description */}
                      <div className="mt-2">
                        {historyItem.action === 'created' && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {historyItem.creditor} uchun {formatCurrency(historyItem.amount, historyItem.currency || currency || 'UZS', language)} qarz yaratildi
                          </p>
                        )}
                        
                        {historyItem.action === 'updated' && historyItem.previousAmount !== undefined && historyItem.newAmount !== undefined && (
                          <div>
                            {historyItem.newAmount > historyItem.previousAmount ? (
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {formatCurrency(historyItem.newAmount - historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} qo'shildi
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                                </p>
                              </div>
                            ) : historyItem.newAmount < historyItem.previousAmount ? (
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {formatCurrency(historyItem.previousAmount - historyItem.newAmount, historyItem.currency || currency || 'UZS', language)} to'landi
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Qarz miqdori o'zgartirilmadi
                              </p>
                            )}
                          </div>
                        )}
                        
                        {historyItem.action === 'adjustment' && historyItem.previousAmount !== undefined && historyItem.newAmount !== undefined && (
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {formatCurrency(historyItem.previousAmount - historyItem.newAmount, historyItem.currency || currency || 'UZS', language)} to'landi
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                            </p>
                          </div>
                        )}
                        
                        {historyItem.action === 'paid' && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Qarz to'langan deb belgilandi
                          </p>
                        )}
                        
                        {historyItem.action === 'deleted' && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Qarz o'chirildi
                          </p>
                        )}
                      </div>
                      
                      {historyItem.reason && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <p className="font-medium text-xs">{t('debts.form.reason', 'Sabab')}:</p>
                          <p className="pl-2 border-l-2 border-gray-200 dark:border-gray-700 text-sm">{historyItem.reason}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      {t('debts.noHistoryAvailable', 'Tarix mavjud emas')}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                      {t('debts.historyWillBeCreated', 'Qarzni tahrirlash yoki to\'lash orqali tarix yaratiladi')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
