import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { formatNumberWithSpaces, parseFormattedNumber } from '../utils/formatUtils';
import { formatPhoneNumber, formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { useAuth } from '../utils/AuthContext';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarDebts() {
  const navigate = useNavigate();
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading, error, userTier, debtLimit, createDebt, updateDebt, deleteDebt, markDebtAsPaid, fetchDebtHistory } = useDebts();
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingDebt, setEditingDebt] = useState(null); // For tracking which debt is being edited
  const [editForm, setEditForm] = useState({ amount: '', phone: '', countryCode: '+998', reason: '' }); // For edit form data
  const [debtHistory, setDebtHistory] = useState([]); // For storing debt history
  const [showHistoryModal, setShowHistoryModal] = useState(null); // For tracking which debt's history is being viewed
  const [activeTab, setActiveTab] = useState('dueToday'); // 'dueToday', 'dueTomorrow', 'pending', 'paid', 'all', 'threeDaysLeft', 'overdue'
  const [newDebt, setNewDebt] = useState({
    creditor: '',
    amount: '',
    description: '',
    phone: '',
    countryCode: '+998',
    debtDate: new Date().toISOString().split('T')[0],
    currency: currency || 'UZS' // Add currency field with default from settings
  });

  // Use debt limit from context
  const userDebtLimit = debtLimit;

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
    setNewDebt({ ...newDebt, amount: formattedValue });
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

    setNewDebt({ ...newDebt, phone: formattedNumber });
  };

  // Handle country code change
  const handleCountryCodeChange = (newCountryCode) => {
    setNewDebt({ ...newDebt, countryCode: newCountryCode, phone: '' });
  };

  // Handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setNewDebt({ ...newDebt, currency: newCurrency });
  };

  const addDebt = async () => {
    if (!newDebt.creditor || !newDebt.amount) return;

    // No limit check here - allow adding debts even if limit is reached
    // Backend will handle the logic for manageable vs non-manageable debts

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
    const result = await markDebtAsPaid(id, reason);
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
    } else if (activeTab === 'dueTomorrow') {
      // Show pending debts that are due exactly tomorrow
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate || debt.status !== 'pending') return false;

        if (typeof debt.debtDate === 'string' && debt.debtDate.length === 10) {
          return debt.debtDate === tomorrowFormatted;
        }
        try {
          const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
          return debtDateFormatted === tomorrowFormatted;
        } catch (e) {
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

  // For free tier users, sort pending debts by creation date (oldest first) and limit management to first 20
  const getManageableDebts = () => {
    if (userTier === 'free' && userDebtLimit !== Infinity) {
      const pendingDebts = filteredDebts.filter(debt => debt.status === 'pending');
      const paidDebts = filteredDebts.filter(debt => debt.status === 'paid');

      // Sort pending debts by creation date (oldest first)
      const sortedPendingDebts = pendingDebts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      // Mark which debts are manageable (first 20 pending debts)
      const debtsWithManageability = sortedPendingDebts.map((debt, index) => ({
        ...debt,
        isManageable: index < userDebtLimit
      }));

      // Combine with paid debts (all paid debts are always manageable)
      const allPaidDebts = paidDebts.map(debt => ({ ...debt, isManageable: true }));

      return [...debtsWithManageability, ...allPaidDebts];
    }

    // For premium users, all debts are manageable
    return filteredDebts.map(debt => ({ ...debt, isManageable: true }));
  };

  const manageableDebts = getManageableDebts();

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

    setEditForm({ ...editForm, phone: formattedNumber });
  };

  // Function to handle edit country code change
  const handleEditCountryCodeChange = (newCountryCode) => {
    setEditForm({ ...editForm, countryCode: newCountryCode, phone: '' });
  };

  // Function to handle edit amount change
  const handleEditAmountChange = (e) => {
    const inputValue = e.target.value;
    // Format the input value with spaces
    const formattedValue = formatNumberWithSpaces(inputValue);
    setEditForm({ ...editForm, amount: formattedValue });
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
    // Ensure only history modal is open
    setShowAddForm(false);
    setEditingDebt(null);
    setShowDetailsModal(null);

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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <div className="h-10 w-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl animate-pulse"></div>
          </div>
          <SkeletonLoader type="debtsList" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {t('debts.title', 'Qarzlar ro\'yhati')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
                {t('debts.subtitle', 'Qarzlaringizni boshqaring va kuzatib boring')}
              </p>
            </div>
          </div>
          <div className="bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl shadow-lg" role="alert">
            <strong className="font-bold">Xato! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {t('debts.title', 'Qarzlar ro\'yhati')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
              {t('debts.subtitle', 'Qarzlaringizni boshqaring va kuzatib boring')}
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white p-4 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="relative h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* Limit warning for free tier users */}
        {userTier === 'free' && userDebtLimit !== Infinity && debts.filter(debt => debt.status === 'pending').length >= userDebtLimit && (
          <div className="mb-6 p-6 bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-800/50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  Free tarif limiti to'lgan!
                </p>
                {/* Mobile version - short text */}
                <p className="block md:hidden text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  Faqat {userDebtLimit} ta qarzni boshqarishingiz mumkin.{' '}
                  <button
                    className="inline text-orange-600 font-semibold hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline decoration-2 underline-offset-2"
                    onClick={() => navigate('/pricing')}
                  >
                    Tarifni yangilang
                  </button>
                  .
                </p>
                {/* Desktop version - full text */}
                <div className="hidden md:block">
                  <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                    Siz {userDebtLimit} ta kutilayotgan qarz limitiga yetdingiz. Faqat eng eski {userDebtLimit} ta kutilayotgan qarzni boshqarishingiz mumkin (tahrirlash, to'lash, o'chirish). Qolgan qarzlar xiralashgan ko'rinishda va ular ustida amallar bajarib bo'lmaydi.
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed mt-2">
                    Ko'proq qarzlarni boshqarish uchun{' '}
                    <button
                      className="inline text-orange-600 font-semibold hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline decoration-2 underline-offset-2"
                      onClick={() => navigate('/pricing')}
                    >
                      tarifni yangilang
                    </button>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modern Search Bar */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg hover:shadow-xl focus-within:shadow-2xl transition-all duration-300">
              <input
                type="text"
                placeholder={t('debts.searchPlaceholder', 'Qarzlarni izlash...')}
                value={debtSearch}
                onChange={(e) => setDebtSearch(e.target.value)}
                className="w-full p-4 pl-14 pr-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base md:text-lg font-medium"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {debtSearch && (
                <button
                  onClick={() => setDebtSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modern Filter Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-2 shadow-lg">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('dueToday')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'dueToday'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'dueToday' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.dueToday', 'Bugungi')}</span>
              </button>
              <button
                onClick={() => setActiveTab('dueTomorrow')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'dueTomorrow'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'dueTomorrow' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.dueTomorrow', 'Ertaga')}</span>
              </button>
              <button
                onClick={() => setActiveTab('threeDaysLeft')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'threeDaysLeft'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'threeDaysLeft' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.threeDaysLeft', '3 kun qoldi')}</span>
              </button>
              <button
                onClick={() => setActiveTab('overdue')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'overdue'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'overdue' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.overdue', 'Qarz')}</span>
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'pending'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'pending' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.pending', 'Kutilayotgan')}</span>
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'paid'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'paid' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.paid', 'To\'langan')}</span>
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${activeTab === 'all'
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
                  }`}
              >
                {activeTab === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
                )}
                <span className="relative">{t('debts.all', 'Barchasi')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Old Add Debt Modal removed. Original is below as comment. */}
        {/*
        // <div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleAddModalBackdropClick}>
        //   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        //     <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('debts.addDebt', 'Yangi qarz qo\'shish')}</h3>
        //     <form onSubmit={(e) => { e.preventDefault(); addDebt(); }}>
        //       <div className="mb-4">
        //         <label htmlFor="creditor" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        //           {t('debts.creditor', 'Qarzchi')}
        //         </label>
        //         <input
        //           type="text"
        //           id="creditor"
        //           value={newDebt.creditor}
        //           onChange={(e) => setNewDebt({...newDebt, creditor: e.target.value})}
        //           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
        //         />
        //       </div>
        //       <div className="mb-4">
        //         <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        //           {t('debts.amount', 'Summa')}
        //         </label>
        //         <input
        //           type="text"
        //           id="amount"
        //           value={newDebt.amount}
        //           onChange={handleAmountChange}
        //           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
        //         />
        //       </div>
        //       <div className="mb-4">
        //         <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        //           {t('debts.phone', 'Telefon')}
        //         </label>
        //         <div className="flex">
        //           <select
        //             id="countryCode"
        //             value={newDebt.countryCode}
        //             onChange={(e) => handleCountryCodeChange(e.target.value)}
        //             className="w-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
        //           >
        //             {countryCodes.map(code => (
        //               <option key={code.code} value={code.code}>{code.flag} {code.name}</option>
        //             ))}
        //           </select>
        //           <input
        //             type="text"
        //             id="phone"
        //             value={newDebt.phone}
        //             onChange={handlePhoneChange}
        //             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
        //           />
        //         </div>
        //       </div>
        //       <div className="mb-4">
        //         <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        //           {t('debts.description', 'Izoh')}
        //         </label>
        //         <textarea
        //           id="description"
        //           value={newDebt.description}
        //           onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
        //           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
        //         />
        //       </div>
        //       <div className="mb-4">
        //         <label htmlFor="debtDate" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        //           {t('debts.date', 'Sana')}
        //         </label>
        //         <input
        //           type="date"
        //           id="debtDate"
        //           value={newDebt.debtDate}
        //           onChange={(e) => setNewDebt({...newDebt, debtDate: e.target.value})}
        //           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
        //         />
        //       </div>
        //       <div className="flex justify-end">
        //         <button
        //           type="button"
        //           onClick={closeModal}
        //           className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg mr-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all"
        //         >
        //           {t('debts.cancel', 'Bekor qilish')}
        //         </button>
        //         <button
        //           type="submit"
        //           className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-lg hover:shadow-lg transition-all"
        //         >
        //           {t('debts.add', 'Qo\'shish')}
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
      */}




        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            {filteredDebts.length} {t('debts.results', 'ta qarz topildi')}
          </p>
        </div>

        {/* Modern Excel-style Table Layout */}
        {manageableDebts.length === 0 ? (
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
                  <th className="py-2 px-2 text-left rounded-tl-lg text-xs font-medium">#</th>
                  <th className="py-2 px-3 text-left text-xs font-medium">{t('debts.form.creditor', 'Kreditor')}</th>
                  <th className="py-2 px-3 text-left text-xs font-medium">{t('debts.form.amount', 'Summa')}</th>
                  <th className="py-2 px-2 text-left hidden md:table-cell text-xs font-medium">{t('debts.form.phone', 'Telefon')}</th>
                  <th className="py-2 px-2 text-left hidden lg:table-cell text-xs font-medium">{t('debts.form.debtDate', 'Qarz sanasi')}</th>
                  <th className="py-2 px-2 text-left hidden lg:table-cell text-xs font-medium">{t('debts.form.createdDate', 'Yaratilgan')}</th>
                  <th className="py-2 px-2 text-left hidden md:table-cell text-xs font-medium">{t('debts.form.status', 'Holat')}</th>
                  <th className="py-2 px-2 text-left rounded-tr-lg text-xs font-medium">{t('common.actions', 'Amallar')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {manageableDebts.map((debt, index) => {
                  // Check if this debt is manageable
                  const isOverLimit = !debt.isManageable;

                  return (
                    <tr
                      key={debt._id}
                      className={`${index % 2 === 0
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-50 dark:bg-gray-700'
                        } ${isOverLimit
                          ? 'opacity-40 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                          : 'hover:bg-orange-50 dark:hover:bg-gray-600'
                        } transition-all duration-200`}
                    >
                      <td className="py-2 px-2 text-gray-600 dark:text-gray-300 font-mono text-sm">
                        {index + 1}
                      </td>
                      <td className="py-2 px-3 font-medium text-gray-800 dark:text-white">
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {debt.creditor.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm truncate">{debt.creditor}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden truncate">
                              {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                              {debt.phone && (
                                <span className="ml-2">• {formatPhoneNumber(debt.phone, debt.countryCode)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 font-bold text-gray-800 dark:text-white text-sm">
                        {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                      </td>
                      <td className="py-2 px-2 text-gray-600 dark:text-gray-300 hidden md:table-cell text-sm">
                        {debt.phone ? formatPhoneNumber(debt.phone, debt.countryCode) : <span className="text-gray-400 italic">-</span>}
                      </td>
                      <td className="py-2 px-2 text-gray-600 dark:text-gray-300 hidden lg:table-cell text-sm">
                        {new Date(debt.debtDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-2 text-gray-600 dark:text-gray-300 hidden lg:table-cell text-sm">
                        {new Date(debt.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-2 hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${debt.status === 'paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          }`}>
                          {debt.status === 'paid'
                            ? t('common.paid', 'To\'langan')
                            : t('common.pending', 'Kutilmoqda')}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => showDebtDetails(debt)}
                            className={`p-2 rounded-full transition-colors ${isOverLimit
                              ? 'bg-gray-50 text-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
                              }`}
                            title={isOverLimit ? 'Limitdan tashqari qarz' : t('common.details', 'Batafsil')}
                            disabled={isOverLimit}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {debt.status === 'pending' && !isOverLimit && (
                            <>
                              <button
                                onClick={() => startEditing(debt)}
                                className="group relative p-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                                title={t('common.edit', 'Tahrirlash')}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="relative h-4 w-4 transform group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={async () => {
                                  const result = await markAsPaidHandler(debt._id, '');
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
                                  const result = await deleteDebtHandler(debt._id, '');
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
                          {debt.status === 'pending' && isOverLimit && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-400 dark:text-gray-500 italic px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-full">
                                Limitdan tashqari
                              </span>
                            </div>
                          )}

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}


        {/* Modern Add Debt Modal */}
        {showAddForm && (
          <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleAddModalBackdropClick}
          >
            <div
              className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-[443px] max-h-[92vh] overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Header */}
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
                    onClick={closeModal}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-3.5 space-y-3.5 max-h-[calc(92vh-140px)] overflow-y-auto">

                {/* Creditor */}
                <div className="group">
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
                  />
                </div>

                {/* Amount */}
                <div className="group">
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
                    />
                    <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium text-xs">
                      {newDebt.currency || 'UZS'}
                    </div>
                  </div>
                </div>

                {/* Phone Section - Country Code and Phone in one row */}
                <div className="group">
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
                    {/* Country Code */}
                    <div className="w-32">
                      <select
                        value={newDebt.countryCode}
                        onChange={(e) => handleCountryCodeChange(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 appearance-none cursor-pointer text-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '14px'
                        }}
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Number */}
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

                {/* Date and Currency in one row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="group">
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

                  <div className="group">
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
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '14px'
                      }}
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
                <div className="group">
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
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1.5 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('common.cancel', 'Bekor qilish')}
                  </button>
                  <button
                    onClick={addDebt}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 transform flex items-center justify-center gap-1.5 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {t('debts.form.addDebt', 'Qarz qo\'shish')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modern Debt Details Modal */}
        {showDetailsModal && (
          <div
            id="details-modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleDetailsModalBackdropClick}
          >
            <div
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700/30 animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modern Header */}
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-t-3xl blur opacity-30"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {showDetailsModal.creditor.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {showDetailsModal.creditor}
                      </h3>
                      <p className="text-white/90 text-lg font-semibold">
                        {formatCurrency(showDetailsModal.amount, showDetailsModal.currency || currency || 'UZS', language)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeDetailsModal}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-xl transition-all duration-200 hover:scale-110"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Status and Quick Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.status', 'Holat')}</p>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${showDetailsModal.status === 'paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          }`}>
                          {showDetailsModal.status === 'paid'
                            ? t('common.paid', 'To\'langan')
                            : t('common.pending', 'Kutilmoqda')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.debtDate', 'Qarz sanasi')}</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {new Date(showDetailsModal.debtDate).toLocaleDateString('uz-UZ', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                {showDetailsModal.phone && (
                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('common.phoneNumber', 'Telefon raqami')}</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {formatPhoneNumber(showDetailsModal.phone, showDetailsModal.countryCode)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {showDetailsModal.description && (
                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{t('debts.form.description', 'Izoh')}</p>
                        <p className="text-sm text-gray-800 dark:text-white leading-relaxed">
                          {showDetailsModal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {showDetailsModal.paidAt && (
                    <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.paidDate', 'To\'langan sana')}</p>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            {new Date(showDetailsModal.paidAt).toLocaleDateString('uz-UZ', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.createdDate', 'Yaratilgan')}</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {new Date(showDetailsModal.createdAt).toLocaleDateString('uz-UZ', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  {showDetailsModal.status === 'pending' && (
                    <>
                      <button
                        onClick={async () => {
                          const result = await markAsPaidHandler(showDetailsModal._id, '');
                          if (result && result.success) {
                            closeDetailsModal();
                          }
                        }}
                        className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                        className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                    className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    title={t('debts.form.viewHistory', 'Tarixni ko\'rish')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={async () => {
                      const result = await deleteDebtHandler(showDetailsModal._id, '');
                      if (result && result.success) {
                        closeDetailsModal();
                      }
                    }}
                    className="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

        {/* Modern Edit Debt Modal */}
        {editingDebt && (
          <div
            id="edit-modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleEditModalBackdropClick}
          >
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-[556px] max-h-[85vh] overflow-hidden animate-slideUp">
              {/* Gradient Header */}
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-3">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20 backdrop-blur-sm"></div>
                <div className="relative flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {t('debts.editDebt', 'Qarzni tahrirlash')}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {editingDebt.creditor} uchun qarz ma'lumotlarini yangilash
                    </p>
                  </div>
                  <button
                    onClick={cancelEdit}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 space-y-3 max-h-[calc(85vh-140px)] overflow-y-auto">
                {/* Creditor (Read-only) */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('debts.form.creditor', 'Kreditor')}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={editingDebt.creditor}
                      disabled
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium cursor-not-allowed text-sm"
                    />
                    <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {t('debts.form.amount', 'Miqdori')}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={editForm.amount}
                      onChange={handleEditAmountChange}
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:border-orange-400 text-sm"
                      placeholder={t('debts.form.amountPlaceholder', 'Miqdorni kiriting')}
                    />
                    <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium text-xs">
                      {editingDebt.currency || 'UZS'}
                    </div>
                  </div>
                </div>

                {/* Phone Section - Country Code and Phone in one row */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {t('debts.form.phone', 'Telefon raqami')}
                    </span>
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code */}
                    <div className="w-36">
                      <select
                        value={editForm.countryCode}
                        onChange={(e) => handleEditCountryCodeChange(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:border-orange-400 appearance-none cursor-pointer text-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '14px'
                        }}
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Number */}
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="XX XXX XX XX"
                        value={editForm.phone}
                        onChange={handleEditPhoneChange}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:border-orange-400 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {t('debts.form.reason', 'Tahrirlash sababi')}
                      <span className="text-gray-400 text-xs">({t('debts.form.optional', 'ixtiyoriy')})</span>
                    </span>
                  </label>
                  <textarea
                    value={editForm.reason}
                    onChange={(e) => handleEditFormChange('reason', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:border-orange-400 resize-none text-sm"
                    placeholder={t('debts.form.reasonPlaceholder', 'Tahrirlash sababini kiriting')}
                    rows="2"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex items-center gap-1.5 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('common.cancel', 'Bekor qilish')}
                  </button>
                  <button
                    onClick={saveEdit}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 transform flex items-center gap-1.5 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('common.save', 'Saqlash')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modern History Modal */}
        {showHistoryModal && (
          <div
            id="history-modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleHistoryModalBackdropClick}
          >
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-slideUp">
              {/* Gradient Header */}
              <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 backdrop-blur-sm"></div>
                <div className="relative flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {t('debts.debtHistory', 'Qarz tarixi')}
                    </h3>
                    <p className="text-white/80 text-xs">
                      Barcha o'zgarishlar va harakatlar tarixi
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowHistoryModal(null);
                      setDebtHistory([]);
                    }}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* History Content */}
              <div className="p-4 max-h-[calc(85vh-120px)] overflow-y-auto">
                <div className="space-y-3">
                  {debtHistory.length > 0 ? (
                    debtHistory.map((historyItem, index) => (
                      <div key={index} className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 hover:shadow-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            {/* Action Icon */}
                            <div className={`p-2 rounded-lg ${historyItem.action === 'created' ? 'bg-blue-100 dark:bg-blue-900/30' :
                              historyItem.action === 'updated' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                historyItem.action === 'paid' ? 'bg-green-100 dark:bg-green-900/30' :
                                  historyItem.action === 'deleted' ? 'bg-red-100 dark:bg-red-900/30' :
                                    historyItem.action === 'adjustment' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                      'bg-gray-100 dark:bg-gray-700/30'
                              }`}>
                              {historyItem.action === 'created' && (
                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              )}
                              {historyItem.action === 'updated' && (
                                <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              )}
                              {historyItem.action === 'paid' && (
                                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {historyItem.action === 'deleted' && (
                                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                              {historyItem.action === 'adjustment' && (
                                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                              )}
                            </div>

                            {/* Action Badge */}
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${historyItem.action === 'created' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                              historyItem.action === 'updated' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                historyItem.action === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                  historyItem.action === 'deleted' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                                    historyItem.action === 'adjustment' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}>
                              {t(`debts.action.${historyItem.action}`, t(`debts.${historyItem.action}`, historyItem.action))}
                            </span>
                          </div>

                          {/* Date and Time */}
                          <div className="text-right">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              {new Date(historyItem.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {new Date(historyItem.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
    </div>
  );
}
