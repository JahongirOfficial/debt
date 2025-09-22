import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Calendar, DollarSign, User, Filter, Search, Phone, BarChart3, Menu, X } from 'lucide-react';

// Custom hook for localStorage
const useStoredState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

export function QarzdaftarApp() {
  const [debts, setDebts] = useStoredState('qarzdaftar_debts', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'paid', 'all'
  const [activeSection, setActiveSection] = useState('debts'); // 'dashboard', 'debts', or 'creditors'
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    creditor: ''
  });
  const [newDebt, setNewDebt] = useState({
    creditor: '',
    amount: '',
    description: '',
    phone: '+998 ',
    priority: 'medium'
  });
  const [showCreditors, setShowCreditors] = useState(false);
  const [debtSearch, setDebtSearch] = useState('');

  const addDebt = () => {
    if (!newDebt.creditor || !newDebt.amount) return;
    
    const debt = {
      id: Date.now(),
      ...newDebt,
      amount: parseFloat(newDebt.amount),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setDebts([...debts, debt]);
    // Reset the form to initial state with +998 prefix
    setNewDebt({ creditor: '', amount: '', description: '', phone: '+998 ', priority: 'medium' });
    setShowAddForm(false);
  };

  const markAsPaid = (id) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, status: 'paid', paidAt: new Date().toISOString() } : debt
    ));
  };

  const deleteDebt = (id) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  // Function to switch sections and close mobile menu if open
  const switchSection = (section) => {
    setActiveSection(section);
    // If we're on mobile and the menu is open, close it
    if (window.innerWidth < 768 && activeSection === 'mobile-menu') {
      // Menu will close automatically when activeSection changes
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calculate statistics for dashboard
  const totalDebt = debts
    .filter(debt => debt.status === 'pending')
    .reduce((sum, debt) => sum + debt.amount, 0);

  const paidDebts = debts.filter(debt => debt.status === 'paid');
  
  const pendingDebtsCount = debts.filter(debt => debt.status === 'pending').length;
  const paidDebtsCount = paidDebts.length;
  const totalDebtsCount = debts.length;

  // Filter debts based on current filters and active tab
  const getFilteredDebts = () => {
    let filteredDebts = debts;
    
    // Filter by status (tab)
    if (activeTab === 'pending') {
      filteredDebts = filteredDebts.filter(debt => debt.status === 'pending');
    } else if (activeTab === 'paid') {
      filteredDebts = filteredDebts.filter(debt => debt.status === 'paid');
    }
    
    // Filter by amount range
    if (filters.minAmount) {
      filteredDebts = filteredDebts.filter(debt => debt.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filteredDebts = filteredDebts.filter(debt => debt.amount <= parseFloat(filters.maxAmount));
    }
    
    // Filter by creditor name (from main filters)
    if (filters.creditor) {
      filteredDebts = filteredDebts.filter(debt => 
        debt.creditor.toLowerCase().includes(filters.creditor.toLowerCase())
      );
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

  // Function to close modal when clicking outside
  const closeModal = (e) => {
    if (e.target.id === 'modal-backdrop') {
      // Reset the form to initial state with +998 prefix
      setNewDebt({ creditor: '', amount: '', description: '', phone: '+998 ', priority: 'medium' });
      setShowAddForm(false);
    }
  };

  // Function to format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters except +
    let phoneNumber = value.replace(/[^\d+]/g, '');
    
    // If the value is empty or just +, return +998
    if (!phoneNumber || phoneNumber === '+') {
      return '+998 ';
    }
    
    // Ensure it starts with +998
    if (!phoneNumber.startsWith('+998')) {
      // If it starts with 998, add the +
      if (phoneNumber.startsWith('998')) {
        phoneNumber = '+' + phoneNumber;
      } 
      // If it starts with + but not +998, replace with +998
      else if (phoneNumber.startsWith('+')) {
        // Remove any extra 998 occurrences
        phoneNumber = phoneNumber.replace(/\+998/g, '');
        phoneNumber = '+998' + phoneNumber;
      }
      // Otherwise, prepend +998
      else {
        phoneNumber = '+998' + phoneNumber;
      }
    }
    
    // Remove any duplicate +998 occurrences
    if (phoneNumber.indexOf('+998') !== phoneNumber.lastIndexOf('+998')) {
      phoneNumber = phoneNumber.substring(0, phoneNumber.lastIndexOf('+998')) + 
                   phoneNumber.substring(phoneNumber.lastIndexOf('+998') + 4);
    }
    
    // Format the number after +998
    if (phoneNumber.startsWith('+998') && phoneNumber.length > 4) {
      const digits = phoneNumber.slice(4).replace(/\D/g, ''); // Get only the digits after +998
      let formatted = '+998';
      
      // Add space after +998
      formatted += ' ';
      
      // Add the first group (2 digits)
      if (digits.length >= 2) {
        formatted += digits.slice(0, 2) + ' ';
      } else if (digits.length > 0) {
        formatted += digits;
      }
      
      // Add the second group (3 digits)
      if (digits.length >= 4) {
        formatted += digits.slice(2, 5) + ' ';
      } else if (digits.length > 2) {
        formatted += digits.slice(2);
      }
      
      // Add the third group (2 digits)
      if (digits.length >= 6) {
        formatted += digits.slice(5, 7) + ' ';
      } else if (digits.length > 5) {
        formatted += digits.slice(5);
      }
      
      // Add the last group (2 digits)
      if (digits.length >= 8) {
        formatted += digits.slice(7, 9);
      } else if (digits.length > 7) {
        formatted += digits.slice(7);
      }
      
      return formatted;
    }
    
    // Return +998 with a space if we only have the prefix
    return '+998 ';
  };

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    
    // If the input is just +998, allow it
    if (inputValue === '+998' || inputValue === '+998 ') {
      setNewDebt({...newDebt, phone: '+998 '});
      return;
    }
    
    const formatted = formatPhoneNumber(inputValue);
    setNewDebt({...newDebt, phone: formatted});
  };

  // Function to show debt details
  const showDebtDetails = (debt) => {
    setShowDetailsModal(debt);
  };

  // Function to close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex">
      {/* Mobile Toggle Button - Visible only on mobile */}
      <button 
        className="md:hidden fixed top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg"
        onClick={() => setActiveSection(activeSection === 'mobile-menu' ? 'debts' : 'mobile-menu')}
      >
        {activeSection === 'mobile-menu' ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Offcanvas Sidebar - Slides in from right on mobile */}
      {activeSection === 'mobile-menu' && (
        <div className="md:hidden fixed inset-0 z-30">
          {/* Backdrop with opacity 0.6 */}
          <div 
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setActiveSection('debts')}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white backdrop-blur-lg border-l border-white/30 p-4 flex flex-col transform translate-x-0 transition-transform duration-300 ease-in-out">
            <div className="mb-4 mt-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Qarzdaftar
              </h1>
            </div>
            
            <nav className="flex-1 mt-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => switchSection('dashboard')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'dashboard'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('debts')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'debts'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <DollarSign className="h-5 w-5" />
                    Qarzlar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => switchSection('creditors')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                      activeSection === 'creditors'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    Kreditorlar
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="mt-auto pt-4 border-t border-white/20">
              <p className="text-gray-500 text-sm text-center">
                Qarzdaftar v1.0
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Hidden on mobile, visible on md and larger screens */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white backdrop-blur-lg border-r border-white/30 p-4 flex flex-col z-10">
        <div className="mb-4 mt-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Qarzdaftar
          </h1>
        </div>
        
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => switchSection('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'dashboard'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('debts')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'debts'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                Qarzlar
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('creditors')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'creditors'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <User className="h-5 w-5" />
                Kreditorlar
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <p className="text-gray-500 text-sm text-center">
            Qarzdaftar v1.0
          </p>
        </div>
      </div>

      {/* Main Content with left margin to accommodate fixed sidebar on desktop, no margin on mobile */}
      <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-auto">
        {activeSection === 'dashboard' ? (
          // Dashboard Content
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
              <p className="text-gray-600">Umumiy statistikalar va trendlar</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Umumiy qarz</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDebt)}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Kutilayotgan</p>
                    <p className="text-2xl font-bold text-orange-600">{pendingDebtsCount}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">To'langan</p>
                    <p className="text-2xl font-bold text-green-600">{paidDebtsCount}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Qarz trendlari</h3>
              <div className="h-64 flex items-center justify-center bg-white/20 rounded-xl">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Grafiklar (kelajakda qo'shiladi)</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Oxirgi faoliyat</h3>
              {debts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Hali faoliyat yo'q</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {debts.slice(0, 5).map(debt => (
                    <div key={debt.id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          debt.status === 'pending' 
                            ? 'bg-gradient-to-br from-orange-500 to-red-500'
                            : 'bg-gradient-to-br from-green-500 to-emerald-500'
                        }`}>
                          {debt.creditor.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{debt.creditor}</p>
                          <p className="text-sm text-gray-600">{new Date(debt.createdAt).toLocaleDateString('uz-UZ')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          debt.status === 'pending' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formatCurrency(debt.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {debt.status === 'pending' ? 'Kutilmoqda' : 'To\'langan'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeSection === 'creditors' ? (
          // Creditors Content
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Kreditorlar ro'yhati</h2>
                <p className="text-gray-600">Barcha kreditorlaringiz va ularning qarzlari</p>
              </div>
            </div>
            
            {/* Creditors List */}
            {debts.length === 0 ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Hali kreditorlar qo'shilmagan</p>
                  <p className="text-gray-500 text-sm mt-2">Qarz qo'shish orqali kreditorlarni avtomatik qo'shing</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...new Set(debts.map(debt => debt.creditor))].filter(Boolean).map((creditor, index) => {
                  const creditorDebts = debts.filter(debt => debt.creditor === creditor);
                  const pendingCount = creditorDebts.filter(debt => debt.status === 'pending').length;
                  const paidCount = creditorDebts.filter(debt => debt.status === 'paid').length;
                  const totalAmount = creditorDebts
                    .filter(debt => debt.status === 'pending')
                    .reduce((sum, debt) => sum + debt.amount, 0);
                  
                  return (
                    <div 
                      key={index} 
                      className="backdrop-blur-lg bg-white/40 border border-white/20 rounded-2xl p-4 hover:bg-white/50 transition-all cursor-pointer shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {creditor.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 truncate">{creditor}</p>
                          <p className="text-xs text-gray-600">{creditorDebts.length} ta qarz</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Umumiy qarz:</span>
                          <span className="font-bold text-red-600">{formatCurrency(totalAmount)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Kutilayotgan:</span>
                          <span className="font-medium text-orange-600">{pendingCount}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">To'langan:</span>
                          <span className="font-medium text-green-600">{paidCount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          // Debts Content
          <div className="max-w-4xl mx-auto">
            {/* Header Section with Add Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Qarzlar ro'yhati</h2>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="backdrop-blur-lg bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                Yangi qarz qo'shish
              </button>
            </div>
            
            {/* Search within debts */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={debtSearch}
                  onChange={(e) => setDebtSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Qarzlarni izlash..."
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            {/* Tabs and Filters */}
            <div className="mb-6">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'pending'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'backdrop-blur-lg bg-white/30 border border-white/20 text-gray-700 hover:bg-white/50'
                  }`}
                >
                  Kutilayotgan ({pendingDebtsCount})
                </button>
                <button
                  onClick={() => setActiveTab('paid')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'paid'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                      : 'backdrop-blur-lg bg-white/30 border border-white/20 text-gray-700 hover:bg-white/50'
                  }`}
                >
                  To'langan ({paidDebtsCount})
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                      : 'backdrop-blur-lg bg-white/30 border border-white/20 text-gray-700 hover:bg-white/50'
                  }`}
                >
                  Barchasi ({totalDebtsCount})
                </button>
              </div>
              
              {/* Filters */}
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-800">Filtrlar</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Minimal summa</label>
                    <input
                      type="number"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Maksimal summa</label>
                    <input
                      type="number"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                      placeholder="∞"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Kreditor nomi</label>
                    <input
                      type="text"
                      value={filters.creditor}
                      onChange={(e) => setFilters({...filters, creditor: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                      placeholder="Qidiruv..."
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({ minAmount: '', maxAmount: '', creditor: '' })}
                      className="w-full backdrop-blur-lg bg-white/50 border border-white/30 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-white/70 transition-all text-sm"
                    >
                      Tozalash
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Creditors Section - Vertical Accordion style */}
            {debts.length > 0 && (
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl shadow-xl mb-6 overflow-hidden">
                <button
                  onClick={() => setShowCreditors(!showCreditors)}
                  className="w-full flex justify-between items-center p-4 text-left bg-white/50 hover:bg-white/70 transition-all"
                >
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-600" />
                    Kreditorlar
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showCreditors ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCreditors && (
                  <div className="p-4 border-t border-white/20">
                    {/* Vertical Creditors List */}
                    <div className="space-y-3">
                      {[...new Set(debts.map(debt => debt.creditor))].filter(Boolean).map((creditor, index) => {
                        const creditorDebts = debts.filter(debt => debt.creditor === creditor);
                        const pendingCount = creditorDebts.filter(debt => debt.status === 'pending').length;
                        const paidCount = creditorDebts.filter(debt => debt.status === 'paid').length;
                        const totalAmount = creditorDebts
                          .filter(debt => debt.status === 'pending')
                          .reduce((sum, debt) => sum + debt.amount, 0);
                        
                        return (
                          <div 
                            key={index} 
                            className="backdrop-blur-lg bg-white/40 border border-white/20 rounded-xl p-3 hover:bg-white/50 transition-all cursor-pointer"
                            onClick={() => setFilters({...filters, creditor: creditor})}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                {creditor.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 truncate">{creditor}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                  <span>{pendingCount} kutilayotgan</span>
                                  {paidCount > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{paidCount} to'langan</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              {totalAmount > 0 && (
                                <div className="text-right">
                                  <p className="text-sm font-bold text-red-600">{formatCurrency(totalAmount)}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Debts List */}
            {filteredDebts.length === 0 ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  {debts.length === 0 ? (
                    <>
                      <p className="text-gray-600 text-lg">Hali qarzlar qo'shilmagan</p>
                      <p className="text-gray-500 text-sm mt-2">Yuqoridagi tugma orqali yangi qarz qo'shing</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 text-lg">Filtr bo'yicha qarzlar topilmadi</p>
                      <p className="text-gray-500 text-sm mt-2">Filtr sozlamalarini o'zgartiring</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm">
                    {filteredDebts.length} ta qarz topildi
                  </p>
                </div>
                
                {/* Horizontal Debt Items */}
                {filteredDebts.map(debt => (
                  <div key={debt.id} className={`backdrop-blur-lg border rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 ${
                    debt.status === 'pending' 
                      ? 'bg-white/40 border-white/30' 
                      : 'bg-green-50/50 border-green-200/30 opacity-90'
                  }`}>
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 ${
                        debt.status === 'pending' 
                          ? 'bg-gradient-to-br from-orange-500 to-red-500'
                          : 'bg-gradient-to-br from-green-500 to-emerald-500'
                      }`}>
                        {debt.creditor.charAt(0).toUpperCase()}
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-gray-800 text-lg truncate">{debt.creditor}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            debt.status === 'pending' ? (
                              debt.priority === 'high' ? 'bg-red-100 text-red-700' :
                              debt.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            ) : 'bg-green-100 text-green-700'
                          }`}>
                            {debt.status === 'pending' ? (
                              debt.priority === 'high' ? 'Yuqori' : debt.priority === 'medium' ? "O'rta" : 'Past'
                            ) : 'To\'langan'}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className={`text-xl font-bold mb-1 ${
                              debt.status === 'pending' ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {formatCurrency(debt.amount)}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              {debt.description && (
                                <span className="truncate max-w-xs">{debt.description}</span>
                              )}
                              {debt.phone && (
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                  <Phone className="w-3 h-3" />
                                  {debt.phone}
                                </span>
                              )}
                              {debt.paidAt && (
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                  <Check className="w-3 h-3" />
                                  {new Date(debt.paidAt).toLocaleDateString('uz-UZ')}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => showDebtDetails(debt)}
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                              title="Batafsil ma'lumot"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            {debt.status === 'pending' && (
                              <button
                                onClick={() => markAsPaid(debt.id)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                title="To'landi deb belgilash"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteDebt(debt.id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add Debt Modal */}
      {showAddForm && (
        <div 
          id="modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Yangi qarz qo'shish</h3>
              <button 
                onClick={() => {
                  // Reset the form to initial state with +998 prefix
                  setNewDebt({ creditor: '', amount: '', description: '', phone: '+998 ', priority: 'medium' });
                  setShowAddForm(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Kreditor nomi</label>
                <input
                  type="text"
                  value={newDebt.creditor}
                  onChange={(e) => setNewDebt({...newDebt, creditor: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Masalan: Ali"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Qarz miqdori (UZS)</label>
                <input
                  type="number"
                  value={newDebt.amount}
                  onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Masalan: 500000"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Telefon raqami</label>
                <input
                  type="tel"
                  value={newDebt.phone}
                  onChange={handlePhoneChange}
                  onFocus={(e) => {
                    // If the field is just +998, position cursor at the end
                    if (newDebt.phone === '+998 ') {
                      setTimeout(() => {
                        e.target.setSelectionRange(newDebt.phone.length, newDebt.phone.length);
                      }, 0);
                    }
                  }}
                  onKeyDown={(e) => {
                    // Prevent deleting the +998 prefix
                    if ((newDebt.phone === '+998 ' || newDebt.phone === '+998') && 
                        (e.key === 'Backspace' || e.key === 'Delete')) {
                      e.preventDefault();
                    }
                    // Prevent cursor from moving before +998
                    if (e.target.selectionStart < 5 && 
                        (e.key === 'ArrowLeft' || e.key === 'Home')) {
                      e.preventDefault();
                      e.target.setSelectionRange(5, 5);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="+998 77 310 98 28"
                />
                <p className="text-xs text-gray-500 mt-1">Uzbekiston raqamlari avtomatik formatlanadi</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Izoh (ixtiyoriy)</label>
                <input
                  type="text"
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Qarz haqida qisqa ma'lumot"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Muhimlik darajasi</label>
              <select
                value={newDebt.priority}
                onChange={(e) => setNewDebt({...newDebt, priority: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center'
                }}
              >
                <option value="low">Past</option>
                <option value="medium">O'rta</option>
                <option value="high">Yuqori</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  // Reset the form to initial state with +998 prefix
                  setNewDebt({ creditor: '', amount: '', description: '', phone: '+998 ', priority: 'medium' });
                  setShowAddForm(false);
                }}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                Bekor qilish
              </button>
              <button
                onClick={addDebt}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Qarz qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Debt Details Modal */}
      {showDetailsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeDetailsModal}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Qarz tafsilotlari</h3>
              <button 
                onClick={closeDetailsModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                  showDetailsModal.status === 'pending' 
                    ? 'bg-gradient-to-br from-orange-500 to-red-500'
                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                }`}>
                  {showDetailsModal.creditor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">{showDetailsModal.creditor}</h4>
                  <p className={`text-xl font-bold ${
                    showDetailsModal.status === 'pending' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatCurrency(showDetailsModal.amount)}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    showDetailsModal.status === 'pending' ? (
                      showDetailsModal.priority === 'high' ? 'bg-red-100 text-red-700' :
                      showDetailsModal.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    ) : 'bg-green-100 text-green-700'
                  }`}>
                    {showDetailsModal.status === 'pending' ? (
                      showDetailsModal.priority === 'high' ? 'Yuqori' : showDetailsModal.priority === 'medium' ? "O'rta" : 'Past'
                    ) : 'To\'langan'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">Qarz ID</p>
                  <p className="font-medium">#{showDetailsModal.id}</p>
                </div>
                
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">Telefon raqami</p>
                  <p className="font-medium">{showDetailsModal.phone || 'Mavjud emas'}</p>
                </div>
                
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">Yaratilgan sana</p>
                  <p className="font-medium">
                    {new Date(showDetailsModal.createdAt).toLocaleDateString('uz-UZ')} 
                    <span className="text-gray-500 ml-2">
                      {new Date(showDetailsModal.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </p>
                </div>
                
                {showDetailsModal.paidAt && (
                  <div className="p-4 bg-white/50 rounded-xl">
                    <p className="text-gray-600 text-sm">To'langan sana</p>
                    <p className="font-medium">
                      {new Date(showDetailsModal.paidAt).toLocaleDateString('uz-UZ')}
                      <span className="text-gray-500 ml-2">
                        {new Date(showDetailsModal.paidAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              
              {showDetailsModal.description && (
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm mb-2">Izoh</p>
                  <p className="font-medium">{showDetailsModal.description}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeDetailsModal}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                Yopish
              </button>
              {showDetailsModal.status === 'pending' && (
                <button
                  onClick={() => {
                    markAsPaid(showDetailsModal.id);
                    closeDetailsModal();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  To'landi deb belgilash
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}