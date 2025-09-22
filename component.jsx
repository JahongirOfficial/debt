import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Calendar, DollarSign, Filter, Search, Phone, BarChart3, Menu, X, Edit, Calculator, Star, TrendingUp, TrendingDown, FileText, Download, Printer, FileSpreadsheet, PieChart, Activity, TrendingUp as TrendingUpIcon, Settings, Moon, Sun } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Function to format number with spaces (e.g., 1000 -> 1 000)
const formatNumberWithSpaces = (value) => {
  if (!value) return '';
  
  // Remove all non-digit characters
  const digits = value.toString().replace(/\D/g, '');
  
  // Format with spaces
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Function to parse formatted number back to float
const parseFormattedNumber = (value) => {
  if (!value) return 0;
  
  // Remove all spaces and convert to float
  return parseFloat(value.replace(/\s/g, '')) || 0;
};

// Translation system
const translations = {
  uz: () => import('./lang/uz.json').then(module => module.default),
  ru: () => import('./lang/ru.json').then(module => module.default),
  en: () => import('./lang/en.json').then(module => module.default),
  tjk: () => import('./lang/tjk.json').then(module => module.default)
};

// Translation hook
const useTranslation = (language) => {
  const [t, setT] = useState({});
  
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationLoader = translations[language];
        if (translationLoader) {
          const translation = await translationLoader();
          setT(translation);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to Uzbek if loading fails
        if (language !== 'uz') {
          const fallback = await translations.uz();
          setT(fallback);
        }
      }
    };
    
    loadTranslations();
  }, [language]);
  
  const translate = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };
  
  return translate;
};

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

// Helper function to group debts by date
const groupDebtsByDate = (debts) => {
  // Handle empty debts array
  if (!debts || debts.length === 0) {
    return [];
  }
  
  const grouped = {};
  
  debts.forEach(debt => {
    try {
      // Group by date (YYYY-MM-DD)
      const date = new Date(debt.createdAt).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = { pending: 0, paid: 0 };
      }
      
      if (debt.status === 'pending') {
        grouped[date].pending += debt.amount || 0;
      } else {
        grouped[date].paid += debt.amount || 0;
      }
    } catch (error) {
      console.error('Error processing debt:', debt, error);
    }
  });
  
  // Convert to array and sort by date
  return Object.entries(grouped)
    .map(([date, amounts]) => ({
      date,
      pending: amounts.pending,
      paid: amounts.paid,
      total: amounts.pending + amounts.paid
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Custom SVG Line Chart Component
const DebtTrendChart = ({ data, t }) => {
  // Handle empty or insufficient data
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white/20 rounded-xl">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">{t('dashboard.noData', 'Grafik uchun yetarli ma\'lumot yo\'q')}</p>
        </div>
      </div>
    );
  }

  // Chart dimensions
  const width = 600;
  const height = 200;
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Get min and max values for scaling
  const allValues = data.flatMap(d => [d.pending, d.paid, d.total]);
  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(...allValues, 0);

  // Create scales
  const xScale = (index) => {
    if (data.length <= 1) return innerWidth / 2;
    return (index / (data.length - 1)) * innerWidth;
  };

  const yScale = (value) => {
    if (maxValue === minValue) return innerHeight / 2;
    return innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
  };

  // Format currency for display
  const formatCurrencyShort = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' });
  };

  // Generate path data for lines
  const generatePath = (data, key) => {
    if (data.length === 0) return '';
    
    // Filter out any data points with invalid values
    const validData = data.filter(d => 
      d[key] !== null && 
      d[key] !== undefined && 
      !isNaN(d[key])
    );
    
    if (validData.length === 0) return '';
    
    const points = validData.map((d, i) => {
      const x = xScale(data.indexOf(d)); // Use original index for proper positioning
      const y = yScale(d[key]);
      return `${x},${y}`;
    });
    
    return `M${points.join(' L')}`;
  };

  // Generate circles for data points
  const generateCircles = (data, key, color) => {
    return data.map((d, i) => {
      // Skip invalid data points
      if (d[key] === null || d[key] === undefined || isNaN(d[key])) {
        return null;
      }
      
      const cx = xScale(i);
      const cy = yScale(d[key]);
      return (
        <circle
          key={`${key}-${i}`}
          cx={cx}
          cy={cy}
          r="4"
          fill={color}
          stroke="white"
          strokeWidth="2"
        />
      );
    }).filter(Boolean); // Remove null values
  };

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = ratio * innerHeight;
            const value = minValue + (maxValue - minValue) * (1 - ratio);
            return (
              <g key={i}>
                <line
                  x1="0"
                  y1={y}
                  x2={innerWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeDasharray="4"
                />
                <text
                  x="-10"
                  y={y + 4}
                  textAnchor="end"
                  fill="#6b7280"
                  fontSize="10"
                >
                  {formatCurrencyShort(value)}
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = xScale(i);
            // Show every nth label to avoid crowding
            const showLabel = data.length <= 7 || i % Math.ceil(data.length / 7) === 0;
            return showLabel ? (
              <text
                key={i}
                x={x}
                y={innerHeight + 20}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="10"
              >
                {formatDate(d.date)}
              </text>
            ) : null;
          })}
          
          {/* Pending line */}
          <path
            d={generatePath(data, 'pending')}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
          />
          {generateCircles(data, 'pending', '#f97316')}
          
          {/* Paid line */}
          <path
            d={generatePath(data, 'paid')}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          {generateCircles(data, 'paid', '#10b981')}
          
          {/* Total line */}
          <path
            d={generatePath(data, 'total')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          {generateCircles(data, 'total', '#3b82f6')}
        </g>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs text-gray-600">{t('dashboard.pending', 'Kutilayotgan')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-600">{t('dashboard.paid', 'To\'langan')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-600">{t('dashboard.totalAmount', 'Jami')}</span>
        </div>
      </div>
    </div>
  );
};

export function QarzdaftarApp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Settings state (moved up to use in translation hook)
  const [language, setLanguage] = useStoredState('qarzdaftar_language', 'uz'); // 'uz', 'ru', 'en', 'tjk'
  
  // Translation hook
  const t = useTranslation(language);
  
  // Set active section based on current route
  const [activeSection, setActiveSection] = useState(() => {
    switch (location.pathname) {
      case '/dashboard':
        return 'dashboard';
      case '/debts':
        return 'debts';
      case '/calculator':
        return 'calculator';
      case '/ratings':
        return 'ratings';
      case '/reports':
        return 'reports';
      case '/analytics':
        return 'analytics';
      case '/settings':
        return 'settings';
      default:
        return 'dashboard';
    }
  });
  
  // Update active section when route changes
  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setActiveSection('dashboard');
        break;
      case '/debts':
        setActiveSection('debts');
        break;
      case '/calculator':
        setActiveSection('calculator');
        break;
      case '/ratings':
        setActiveSection('ratings');
        break;
      case '/reports':
        setActiveSection('reports');
        break;
      case '/analytics':
        setActiveSection('analytics');
        break;
      case '/settings':
        setActiveSection('settings');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  }, [location.pathname, navigate]);

  const [debts, setDebts] = useStoredState('qarzdaftar_debts', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingDebt, setEditingDebt] = useState(null); // For tracking which debt is being edited
  const [editForm, setEditForm] = useState({ amount: '', phone: '' }); // For edit form data
  
  // Calculator states
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('0');
  const [calculatorHistory, setCalculatorHistory] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('UZS');
  const [exchangeRates, setExchangeRates] = useState({
    USD: 12300,  // 1 USD = 12,300 UZS (updated to accurate rate)
    EUR: 13400,  // 1 EUR = 13,400 UZS
    RUB: 145,    // 1 RUB = 145 UZS
    TJS: 1150,   // 1 TJS (Tajikistan Somoni) = 1,150 UZS
    UZS: 1       // Base currency
  });
  
  // Sidebar Calculator states
  const [sidebarCalculatorValue, setSidebarCalculatorValue] = useState('0');
  const [sidebarCalculatorHistory, setSidebarCalculatorHistory] = useState('');
  
  // Ratings search state
  const [ratingsSearch, setRatingsSearch] = useState('');
  
  // Reports state
  const [reportType, setReportType] = useState('all'); // 'all', 'pending', 'paid', 'monthly'
  const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format
  
  // Analytics state
  const [analyticsPeriod, setAnalyticsPeriod] = useState('month'); // 'week', 'month', 'quarter', 'year'
  
  // Settings state (language moved up for translation hook)
  const [currency, setCurrency] = useStoredState('qarzdaftar_currency', 'UZS'); // 'UZS', 'USD', 'EUR', 'RUB', 'TJS'
  const [theme, setTheme] = useStoredState('qarzdaftar_theme', 'light'); // 'light', 'dark'
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'paid', 'all'
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    creditor: ''
  });
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

  const addDebt = () => {
    if (!newDebt.creditor || !newDebt.amount) return;
    
    const debt = {
      id: Date.now(),
      ...newDebt,
      amount: parseFormattedNumber(newDebt.amount), // Parse formatted number back to float
      createdAt: new Date().toISOString(),
      debtDate: newDebt.debtDate, // Add debt date to the debt object
      status: 'pending'
    };
    
    setDebts([...debts, debt]);
    // Reset the form to initial state with +998 prefix and today's date
    setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
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
    navigate(`/${section}`);
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
  
  // Group debts by date for trend analysis
  const debtTrends = groupDebtsByDate(debts);

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
      // Reset the form to initial state with +998 prefix and today's date
      setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
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

  // Function to show debt details
  const showDebtDetails = (debt) => {
    setShowDetailsModal(debt);
  };

  // Function to close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(null);
  };

  // Function to start editing a debt
  const startEditing = (debt) => {
    setEditingDebt(debt.id);
    setEditForm({
      amount: formatNumberWithSpaces(debt.amount.toString()),
      phone: debt.phone || '+998 '
    });
  };

  // Function to save edited debt
  const saveEdit = (id) => {
    setDebts(debts.map(debt => 
      debt.id === id 
        ? { 
            ...debt, 
            amount: parseFormattedNumber(editForm.amount),
            phone: editForm.phone
          } 
        : debt
    ));
    setEditingDebt(null);
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingDebt(null);
  };

  // Handle edit form amount change with formatting
  const handleEditAmountChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatNumberWithSpaces(inputValue);
    setEditForm({...editForm, amount: formattedValue});
  };

  // Handle edit form phone number change
  const handleEditPhoneChange = (e) => {
    const inputValue = e.target.value;
    
    if (inputValue === '+998' || inputValue === '+998 ') {
      setEditForm({...editForm, phone: '+998 '});
      return;
    }
    
    const formatted = formatPhoneNumber(inputValue);
    setEditForm({...editForm, phone: formatted});
  };

  // Calculator functions
  const handleCalculatorInput = (value) => {
    if (calculatorValue === '0' && value !== '.') {
      setCalculatorValue(value);
    } else {
      setCalculatorValue(calculatorValue + value);
    }
  };

  const handleCalculatorOperation = (operation) => {
    if (operation === 'C') {
      setCalculatorValue('0');
      setCalculatorHistory('');
    } else if (operation === '=') {
      try {
        const result = eval(calculatorHistory + calculatorValue);
        setCalculatorValue(result.toString());
        setCalculatorHistory('');
      } catch (error) {
        setCalculatorValue('Error');
      }
    } else {
      setCalculatorHistory(calculatorHistory + calculatorValue + operation);
      setCalculatorValue('0');
    }
  };

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    
    // Exchange rates show how many UZS = 1 unit of foreign currency
    // So to convert FROM UZS TO foreign currency: UZS_amount / exchange_rate
    // To convert FROM foreign currency TO UZS: foreign_amount * exchange_rate
    
    let result;
    
    if (fromCurrency === 'UZS' && toCurrency !== 'UZS') {
      // Converting from UZS to foreign currency: divide by exchange rate
      result = amount / exchangeRates[toCurrency];
    } else if (fromCurrency !== 'UZS' && toCurrency === 'UZS') {
      // Converting from foreign currency to UZS: multiply by exchange rate
      result = amount * exchangeRates[fromCurrency];
    } else if (fromCurrency !== 'UZS' && toCurrency !== 'UZS') {
      // Converting between two foreign currencies: go through UZS
      const amountInUZS = amount * exchangeRates[fromCurrency];
      result = amountInUZS / exchangeRates[toCurrency];
    } else {
      result = amount; // UZS to UZS
    }
    
    return Math.round(result * 100) / 100; // Round to 2 decimal places
  };

  const handleCurrencyConversion = (currency) => {
    const currentAmount = parseFloat(calculatorValue) || 0;
    const convertedAmount = convertCurrency(currentAmount, selectedCurrency, currency);
    setCalculatorValue(convertedAmount.toString());
    setSelectedCurrency(currency);
  };

  const applyCalculatorResult = () => {
    const result = parseFloat(calculatorValue) || 0;
    const formattedResult = formatNumberWithSpaces(result.toString());
    setNewDebt({...newDebt, amount: formattedResult});
    setShowCalculator(false);
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      RUB: '₽',
      TJS: 'с.',
      UZS: 'so\'m'
    };
    return symbols[currency] || currency;
  };

  // Sidebar Calculator functions
  const handleSidebarCalculatorInput = (value) => {
    if (sidebarCalculatorValue === '0' && value !== '.') {
      setSidebarCalculatorValue(value);
    } else {
      setSidebarCalculatorValue(sidebarCalculatorValue + value);
    }
  };

  const handleSidebarCalculatorOperation = (operation) => {
    if (operation === 'C') {
      setSidebarCalculatorValue('0');
      setSidebarCalculatorHistory('');
    } else if (operation === '=') {
      try {
        const result = eval(sidebarCalculatorHistory + sidebarCalculatorValue);
        setSidebarCalculatorValue(result.toString());
        setSidebarCalculatorHistory('');
      } catch (error) {
        setSidebarCalculatorValue('Error');
      }
    } else {
      setSidebarCalculatorHistory(sidebarCalculatorHistory + sidebarCalculatorValue + operation);
      setSidebarCalculatorValue('0');
    }
  };

  // Ratings functions
  const calculateUserRating = (creditor) => {
    const userDebts = debts.filter(debt => debt.creditor === creditor);
    if (userDebts.length === 0) return { score: 0, status: 'unknown', color: 'gray' };
    
    const paidDebts = userDebts.filter(debt => debt.status === 'paid');
    const pendingDebts = userDebts.filter(debt => debt.status === 'pending');
    
    // Calculate payment score based on paid vs total debts
    const paymentScore = paidDebts.length / userDebts.length * 100;
    
    // Calculate average delay for paid debts
    let totalDelay = 0;
    let delayedPayments = 0;
    
    paidDebts.forEach(debt => {
      if (debt.paidAt && debt.debtDate) {
        const debtDate = new Date(debt.debtDate);
        const paidDate = new Date(debt.paidAt);
        const delay = Math.max(0, (paidDate - debtDate) / (1000 * 60 * 60 * 24));
        if (delay > 0) {
          totalDelay += delay;
          delayedPayments++;
        }
      }
    });
    
    const averageDelay = delayedPayments > 0 ? totalDelay / delayedPayments : 0;
    
    // Determine rating based on payment score and delay
    let status, color;
    if (paymentScore >= 90 && averageDelay <= 1) {
      status = 'excellent';
      color = 'green';
    } else if (paymentScore >= 70 && averageDelay <= 7) {
      status = 'good';
      color = 'blue';
    } else if (paymentScore >= 50) {
      status = 'fair';
      color = 'yellow';
    } else {
      status = 'poor';
      color = 'red';
    }
    
    return {
      score: Math.round(paymentScore),
      status,
      color,
      averageDelay: Math.round(averageDelay),
      totalDebts: userDebts.length,
      paidDebts: paidDebts.length,
      pendingDebts: pendingDebts.length
    };
  };

  const getRatingIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <TrendingUp className="w-4 h-4" />;
      case 'good':
        return <Check className="w-4 h-4" />;
      case 'fair':
        return <Star className="w-4 h-4" />;
      case 'poor':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getRatingText = (status) => {
    switch (status) {
      case 'excellent':
        return 'Ajoyib';
      case 'good':
        return 'Yaxshi';
      case 'fair':
        return 'O\'rta';
      case 'poor':
        return 'Yomon';
      default:
        return 'Noma\'lum';
    }
  };

  // Get filtered creditors for ratings
  const getFilteredCreditors = () => {
    const allCreditors = [...new Set(debts.map(debt => debt.creditor))].filter(Boolean);
    
    if (!ratingsSearch) {
      return allCreditors;
    }
    
    const searchTerm = ratingsSearch.toLowerCase();
    return allCreditors.filter(creditor => 
      creditor.toLowerCase().includes(searchTerm)
    );
  };

  // Reports functions
  const getReportData = () => {
    let reportDebts = debts;
    
    if (reportType === 'pending') {
      reportDebts = debts.filter(debt => debt.status === 'pending');
    } else if (reportType === 'paid') {
      reportDebts = debts.filter(debt => debt.status === 'paid');
    } else if (reportType === 'monthly') {
      const [year, month] = reportMonth.split('-');
      reportDebts = debts.filter(debt => {
        const debtDate = new Date(debt.createdAt);
        return debtDate.getFullYear() == year && debtDate.getMonth() + 1 == month;
      });
    }
    
    return reportDebts;
  };

  const generatePNGReport = () => {
    const reportData = getReportData();
    const reportTitle = getReportTitle();
    
    // Create landscape canvas for PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200; // Landscape width
    canvas.height = 800; // Landscape height
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#fef3c7'); // Light orange
    gradient.addColorStop(1, '#fed7aa'); // Light orange
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Header section with gradient
    const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    headerGradient.addColorStop(0, '#f97316'); // Orange
    headerGradient.addColorStop(1, '#dc2626'); // Red
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, canvas.width, 120);
    
    // Title
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(reportTitle, canvas.width / 2, 50);
    
    // Date
    ctx.font = '18px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(new Date().toLocaleDateString('uz-UZ'), canvas.width / 2, 85);
    
    // Summary cards
    const summaryY = 150;
    const cardWidth = 250;
    const cardHeight = 100;
    const cardSpacing = 20;
    const startX = (canvas.width - (4 * cardWidth + 3 * cardSpacing)) / 2;
    
    const summaryData = [
      { label: t('dashboard.totalDebts', 'Jami qarzlar'), value: reportData.length, color: '#3b82f6' },
      { label: t('dashboard.pending', 'Kutilayotgan'), value: reportData.filter(d => d.status === 'pending').length, color: '#f97316' },
      { label: t('dashboard.paid', 'To\'langan'), value: reportData.filter(d => d.status === 'paid').length, color: '#10b981' },
      { label: t('dashboard.totalAmount', 'Jami summa'), value: formatCurrency(reportData.reduce((sum, d) => sum + d.amount, 0)), color: '#8b5cf6' }
    ];
    
    summaryData.forEach((item, index) => {
      const x = startX + index * (cardWidth + cardSpacing);
      const y = summaryY;
      
      // Card background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, cardWidth, cardHeight);
      
      // Card border
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, cardWidth, cardHeight);
      
      // Card content
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + cardWidth / 2, y + 30);
      
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = item.color;
      ctx.fillText(item.value.toString(), x + cardWidth / 2, y + 65);
    });
    
    // Table section
    const tableY = summaryY + cardHeight + 50;
    const tableWidth = canvas.width - 100;
    const tableHeight = 400;
    const rowHeight = 35;
    const colWidths = [180, 150, 120, 200, 150, 150];
    
    // Table background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, tableY, tableWidth, tableHeight);
    
    // Table border
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, tableY, tableWidth, tableHeight);
    
    // Table header
    ctx.fillStyle = '#f97316';
    ctx.fillRect(50, tableY, tableWidth, rowHeight);
    
    // Header text
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    const headers = [t('form.creditor', 'Kreditor'), t('form.amount', 'Summa'), t('form.status', 'Holat'), t('form.phone', 'Telefon'), t('form.debtDate', 'Qarz sanasi'), t('form.paidDate', 'To\'langan sana')];
    
    headers.forEach((header, index) => {
      const x = 50 + colWidths.slice(0, index).reduce((sum, width) => sum + width, 0);
      ctx.fillText(header, x + colWidths[index] / 2, tableY + 25);
    });
    
    // Table data
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    reportData.slice(0, 10).forEach((debt, rowIndex) => { // Limit to 10 rows for landscape
      const rowY = tableY + rowHeight + (rowIndex * rowHeight);
      
      // Alternate row colors
      if (rowIndex % 2 === 0) {
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(50, rowY, tableWidth, rowHeight);
      }
      
      // Row data
      const rowData = [
        debt.creditor.length > 20 ? debt.creditor.substring(0, 20) + '...' : debt.creditor,
        formatCurrency(debt.amount),
        debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan'),
        debt.phone || t('common.notAvailable', 'Mavjud emas'),
        debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas'),
        debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-'
      ];
      
      rowData.forEach((cell, colIndex) => {
        const x = 50 + colWidths.slice(0, colIndex).reduce((sum, width) => sum + width, 0);
        ctx.fillStyle = colIndex === 2 ? (debt.status === 'pending' ? '#f97316' : '#10b981') : '#374151';
        ctx.fillText(cell, x + colWidths[colIndex] / 2, rowY + 22);
      });
      
      // Row border
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, rowY + rowHeight);
      ctx.lineTo(50 + tableWidth, rowY + rowHeight);
      ctx.stroke();
    });
    
    // Footer
    ctx.font = '14px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.fillText(`Yaratilgan: ${new Date().toLocaleString('uz-UZ')}`, canvas.width / 2, canvas.height - 40);
    ctx.fillText('Qarzdaftar - Qarz boshqarish tizimi', canvas.width / 2, canvas.height - 20);
    
    // Convert canvas to PNG and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportTitle.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const generateExcelReport = () => {
    const reportData = getReportData();
    const reportTitle = getReportTitle();
    
    // Create CSV content
    const csvContent = [
      [t('form.creditor', 'Kreditor'), t('form.amount', 'Summa'), t('form.status', 'Holat'), t('form.phone', 'Telefon'), t('form.debtDate', 'Qarz sanasi'), t('form.paidDate', 'To\'langan sana'), t('form.note', 'Izoh')],
      ...reportData.map(debt => [
        debt.creditor,
        debt.amount,
        debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan'),
        debt.phone || t('common.notAvailable', 'Mavjud emas'),
        debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas'),
        debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-',
        debt.description || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportTitle.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'pending':
        return 'Kutilayotgan Qarzlar Hisoboti';
      case 'paid':
        return 'To\'langan Qarzlar Hisoboti';
      case 'monthly':
        const [year, month] = reportMonth.split('-');
        const monthNames = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 
                           'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
        return `${monthNames[parseInt(month) - 1]} ${year} Oylik Hisobot`;
      default:
        return 'Barcha Qarzlar Hisoboti';
    }
  };

  const printReport = () => {
    const reportData = getReportData();
    const reportTitle = getReportTitle();
    
    // Create HTML content for printing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${reportTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: bold; color: #333; }
          .date { font-size: 14px; color: #666; margin-top: 10px; }
          .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          .summary-item { display: flex; justify-content: space-between; margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .status-pending { color: #f97316; }
          .status-paid { color: #10b981; }
          .total { font-weight: bold; background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${reportTitle}</div>
          <div class="date">${new Date().toLocaleDateString('uz-UZ')}</div>
        </div>
        
        <div class="summary">
          <div class="summary-item">
            <span>Jami qarzlar:</span>
            <span>${reportData.length}</span>
          </div>
          <div class="summary-item">
            <span>Kutilayotgan:</span>
            <span>${reportData.filter(d => d.status === 'pending').length}</span>
          </div>
          <div class="summary-item">
            <span>To'langan:</span>
            <span>${reportData.filter(d => d.status === 'paid').length}</span>
          </div>
          <div class="summary-item">
            <span>Jami summa:</span>
            <span>${formatCurrency(reportData.reduce((sum, d) => sum + d.amount, 0))}</span>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Kreditor</th>
              <th>Summa</th>
              <th>Holat</th>
              <th>Telefon</th>
              <th>Qarz sanasi</th>
              <th>To'langan sana</th>
            </tr>
          </thead>
          <tbody>
            ${reportData.map(debt => `
              <tr>
                <td>${debt.creditor}</td>
                <td>${formatCurrency(debt.amount)}</td>
                <td class="status-${debt.status}">${debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}</td>
                <td>${debt.phone || t('common.notAvailable', 'Mavjud emas')}</td>
                <td>${debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas')}</td>
                <td>${debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Analytics functions
  const getAnalyticsData = () => {
    const now = new Date();
    const periodStart = new Date();
    
    switch (analyticsPeriod) {
      case 'week':
        periodStart.setDate(now.getDate() - 7);
        break;
      case 'month':
        periodStart.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        periodStart.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        periodStart.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    const periodDebts = debts.filter(debt => 
      new Date(debt.createdAt) >= periodStart
    );
    
    // Calculate statistics
    const totalAmount = periodDebts.reduce((sum, debt) => sum + debt.amount, 0);
    const pendingAmount = periodDebts
      .filter(debt => debt.status === 'pending')
      .reduce((sum, debt) => sum + debt.amount, 0);
    const paidAmount = periodDebts
      .filter(debt => debt.status === 'paid')
      .reduce((sum, debt) => sum + debt.amount, 0);
    
    // Top creditors
    const creditorStats = {};
    periodDebts.forEach(debt => {
      if (!creditorStats[debt.creditor]) {
        creditorStats[debt.creditor] = { total: 0, pending: 0, paid: 0, count: 0 };
      }
      creditorStats[debt.creditor].total += debt.amount;
      creditorStats[debt.creditor].count += 1;
      if (debt.status === 'pending') {
        creditorStats[debt.creditor].pending += debt.amount;
      } else {
        creditorStats[debt.creditor].paid += debt.amount;
      }
    });
    
    const topCreditors = Object.entries(creditorStats)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
    
    // Monthly trends
    const monthlyData = {};
    periodDebts.forEach(debt => {
      const month = new Date(debt.createdAt).toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { pending: 0, paid: 0, count: 0 };
      }
      monthlyData[month].count += 1;
      if (debt.status === 'pending') {
        monthlyData[month].pending += debt.amount;
      } else {
        monthlyData[month].paid += debt.amount;
      }
    });
    
    const monthlyTrends = Object.entries(monthlyData)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
    // Payment speed analysis
    const paidDebts = periodDebts.filter(debt => debt.status === 'paid' && debt.paidAt);
    const paymentSpeeds = paidDebts.map(debt => {
      const created = new Date(debt.createdAt);
      const paid = new Date(debt.paidAt);
      return Math.ceil((paid - created) / (1000 * 60 * 60 * 24)); // days
    });
    
    const avgPaymentDays = paymentSpeeds.length > 0 
      ? Math.round(paymentSpeeds.reduce((sum, days) => sum + days, 0) / paymentSpeeds.length)
      : 0;
    
    return {
      totalAmount,
      pendingAmount,
      paidAmount,
      totalDebts: periodDebts.length,
      pendingDebts: periodDebts.filter(d => d.status === 'pending').length,
      paidDebts: periodDebts.filter(d => d.status === 'paid').length,
      topCreditors,
      monthlyTrends,
      avgPaymentDays,
      paymentSpeeds
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex">
      {/* Floating Calculator Button */}
      <button
        onClick={() => setShowCalculator(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        title="Kalkulyator"
      >
        <Calculator className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {getCurrencySymbol(selectedCurrency)}
        </div>
      </button>

      {/* Mobile Toggle Button - Visible only on mobile */}
      <button 
        className="md:hidden fixed top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg"
        onClick={() => setActiveSection(activeSection === 'mobile-menu' ? 'debts' : 'mobile-menu')}
      >
        {activeSection === 'mobile-menu' ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Offcanvas Sidebar - Slides in from right on mobile */}
      <div className={`md:hidden fixed inset-0 z-30 transition-opacity duration-300 ease-in-out ${activeSection === 'mobile-menu' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop with opacity 0.3 to match site design */}
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out"
          onClick={() => setActiveSection('debts')}
          style={{ opacity: activeSection === 'mobile-menu' ? 0.3 : 0 }}
        ></div>
        
        {/* Sidebar with enhanced smooth slide animation */}
        <div className="absolute right-0 top-0 h-full w-64 bg-white/80 backdrop-blur-lg border-l border-white/30 p-4 flex flex-col transition-transform duration-300 ease-out" 
             style={{ 
               transform: activeSection === 'mobile-menu' ? 'translateX(0)' : 'translateX(100%)' ,
               transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
             }}>
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
                  {t('navigation.dashboard', 'Dashboard')}
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
                  <Plus className="h-5 w-5" />
                  {t('navigation.debts', 'Qarzlar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('calculator')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'calculator'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <Calculator className="h-5 w-5" />
                  {t('navigation.calculator', 'Kalkulyator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('ratings')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'ratings'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <Star className="h-5 w-5" />
                  {t('navigation.ratings', 'Reytinglar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('analytics')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'analytics'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  {t('navigation.analytics', 'Analitika')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('reports')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'reports'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  {t('navigation.reports', 'Hisobotlar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchSection('settings')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    activeSection === 'settings'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  {t('navigation.settings', 'Sozlamalar')}
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
                {t('navigation.dashboard', 'Dashboard')}
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
                {t('navigation.debts', 'Qarzlar')}
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('calculator')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'calculator'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <Calculator className="h-5 w-5" />
                {t('navigation.calculator', 'Kalkulyator')}
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('ratings')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'ratings'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <Star className="h-5 w-5" />
                {t('navigation.ratings', 'Reytinglar')}
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('analytics')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'analytics'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <PieChart className="h-5 w-5" />
                {t('navigation.analytics', 'Analitika')}
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('reports')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'reports'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5" />
                {t('navigation.reports', 'Hisobotlar')}
              </button>
            </li>
            <li>
              <button
                onClick={() => switchSection('settings')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === 'settings'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/80 bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5" />
                {t('navigation.settings', 'Sozlamalar')}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content with left margin to accommodate fixed sidebar on desktop, no margin on mobile */}
      <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-auto">
        {activeSection === 'dashboard' ? (
          // Dashboard Content
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard.title', 'Bosh sahifa')}</h2>
              <p className="text-gray-600">{t('dashboard.subtitle', 'Qarzlar va moliyaviy ma\'lumotlar')}</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{t('dashboard.totalDebt', 'Umumiy qarz')}</p>
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
                    <p className="text-gray-600 text-sm font-medium">{t('dashboard.pending', 'Kutilayotgan')}</p>
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
                    <p className="text-gray-600 text-sm font-medium">{t('dashboard.paid', 'To\'langan')}</p>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('dashboard.totalPaid', 'To\'langan summa')}</h3>
              <DebtTrendChart data={debtTrends} t={t} />
            </div>
            
            {/* Recent Activity */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('dashboard.recentActivity', 'So\'nggi faoliyat')}</h3>
              {debts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">{t('dashboard.noActivity', 'Hali faoliyat yo\'q')}</p>
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
                          {debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeSection === 'calculator' ? (
          // Calculator Content
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('calculator.title', 'Kalkulyator')}</h2>
              <p className="text-gray-600">{t('calculator.subtitle', 'Asosiy matematik hisob-kitoblar')}</p>
            </div>
            
            {/* Calculator Display */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
              <div className="bg-gray-100 rounded-xl p-6 text-right">
                <div className="text-sm text-gray-600 mb-2">
                  {sidebarCalculatorHistory}
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {formatNumberWithSpaces(sidebarCalculatorValue)}
                </div>
              </div>
            </div>
            
            {/* Calculator Buttons */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-4 gap-4">
                {/* Row 1 */}
                <button
                  onClick={() => handleSidebarCalculatorInput('1')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  1
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('2')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  2
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('3')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  3
                </button>
                <button
                  onClick={() => handleSidebarCalculatorOperation('+')}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  +
                </button>
                
                {/* Row 2 */}
                <button
                  onClick={() => handleSidebarCalculatorInput('4')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  4
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('5')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  5
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('6')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  6
                </button>
                <button
                  onClick={() => handleSidebarCalculatorOperation('-')}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  -
                </button>
                
                {/* Row 3 */}
                <button
                  onClick={() => handleSidebarCalculatorInput('7')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  7
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('8')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  8
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('9')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  9
                </button>
                <button
                  onClick={() => handleSidebarCalculatorOperation('*')}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  ×
                </button>
                
                {/* Row 4 */}
                <button
                  onClick={() => handleSidebarCalculatorOperation('C')}
                  className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  C
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('0')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  0
                </button>
                <button
                  onClick={() => handleSidebarCalculatorInput('.')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  .
                </button>
                <button
                  onClick={() => handleSidebarCalculatorOperation('/')}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-semibold text-xl transition-colors"
                >
                  ÷
                </button>
                
                {/* Row 5 - Equals */}
                <button
                  onClick={() => handleSidebarCalculatorOperation('=')}
                  className="col-span-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-xl font-semibold text-xl transition-all"
                >
                  =
                </button>
              </div>
            </div>
          </div>
        ) : activeSection === 'ratings' ? (
          // Ratings Content
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('dashboard.totalCreditors', 'Kreditorlar soni')}</h3>
              <p className="text-gray-600">{t('ratings.subtitle', 'To\'lash xulq-atvori bo\'yicha reyting')}</p>
            </div>
            
            {/* Search Section */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={ratingsSearch}
                  onChange={(e) => setRatingsSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="Foydalanuvchi nomini izlash..."
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {ratingsSearch && (
                <div className="mt-2 text-sm text-gray-600">
                  "{ratingsSearch}" bo'yicha {getFilteredCreditors().length} ta natija topildi
                </div>
              )}
            </div>
            
            {/* Rating Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
              <div>
                    <p className="text-gray-600 text-sm font-medium">Ajoyib</p>
                    <p className="text-2xl font-bold text-green-600">
                      {getFilteredCreditors().filter(creditor => 
                        calculateUserRating(creditor).status === 'excellent'
                      ).length}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
              </div>
            </div>
            
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Yaxshi</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {getFilteredCreditors().filter(creditor => 
                        calculateUserRating(creditor).status === 'good'
                      ).length}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">O'rta</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {getFilteredCreditors().filter(creditor => 
                        calculateUserRating(creditor).status === 'fair'
                      ).length}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Yomon</p>
                    <p className="text-2xl font-bold text-red-600">
                      {getFilteredCreditors().filter(creditor => 
                        calculateUserRating(creditor).status === 'poor'
                      ).length}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ratings List */}
            {debts.length === 0 ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Hali reytinglar yo'q</p>
                  <p className="text-gray-500 text-sm mt-2">Qarzlar qo'shish orqali reytinglarni ko'ring</p>
                </div>
              </div>
            ) : getFilteredCreditors().length === 0 ? (
              <div className="text-center py-12">
                <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Qidiruv natijasi topilmadi</p>
                  <p className="text-gray-500 text-sm mt-2">"{ratingsSearch}" bo'yicha foydalanuvchi topilmadi</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {getFilteredCreditors().map((creditor, index) => {
                  const rating = calculateUserRating(creditor);
                  const creditorDebts = debts.filter(debt => debt.creditor === creditor);
                  const totalAmount = creditorDebts
                    .filter(debt => debt.status === 'pending')
                    .reduce((sum, debt) => sum + debt.amount, 0);
                  
                  return (
                    <div 
                      key={index} 
                      className={`backdrop-blur-lg border rounded-2xl p-4 shadow-lg ${
                        rating.color === 'green' ? 'bg-green-50/50 border-green-200/30' :
                        rating.color === 'blue' ? 'bg-blue-50/50 border-blue-200/30' :
                        rating.color === 'yellow' ? 'bg-yellow-50/50 border-yellow-200/30' :
                        rating.color === 'red' ? 'bg-red-50/50 border-red-200/30' :
                        'bg-white/40 border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          rating.color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          rating.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                          rating.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                          rating.color === 'red' ? 'bg-gradient-to-br from-red-500 to-pink-500' :
                          'bg-gradient-to-br from-gray-500 to-gray-600'
                        }`}>
                          {creditor.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Main Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800 text-lg">{creditor}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                              rating.color === 'green' ? 'bg-green-100 text-green-700' :
                              rating.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                              rating.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                              rating.color === 'red' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {getRatingIcon(rating.status)}
                              {getRatingText(rating.status)}
                            </span>
                      </div>
                      
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Reyting:</p>
                              <p className="font-bold text-lg">{rating.score}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Jami qarzlar:</p>
                              <p className="font-medium">{rating.totalDebts}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">To'langan:</p>
                              <p className="font-medium text-green-600">{rating.paidDebts}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Kutilayotgan:</p>
                              <p className="font-medium text-orange-600">{rating.pendingDebts}</p>
                            </div>
                        </div>
                        
                          {rating.averageDelay > 0 && (
                            <div className="mt-2">
                              <p className="text-gray-600 text-xs">O'rtacha kechikish: {rating.averageDelay} kun</p>
                        </div>
                          )}
                          
                          {totalAmount > 0 && (
                            <div className="mt-2">
                              <p className="text-gray-600 text-xs">Joriy qarz: {formatCurrency(totalAmount)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : activeSection === 'reports' ? (
          // Reports Content
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Hisobotlar va Eksport</h2>
              <p className="text-gray-600">Qarzlar haqida batafsil hisobotlar yarating</p>
            </div>
            
            {/* Report Type Selection */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Hisobot turini tanlang</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setReportType('all')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reportType === 'all'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white/50 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Barcha qarzlar</div>
                  <div className="text-sm opacity-75">{debts.length} ta</div>
                </button>
                
                <button
                  onClick={() => setReportType('pending')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reportType === 'pending'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white/50 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Kutilayotgan</div>
                  <div className="text-sm opacity-75">{debts.filter(d => d.status === 'pending').length} ta</div>
                </button>
                
                <button
                  onClick={() => setReportType('paid')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reportType === 'paid'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white/50 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">To'langan</div>
                  <div className="text-sm opacity-75">{debts.filter(d => d.status === 'paid').length} ta</div>
                </button>
                
                <button
                  onClick={() => setReportType('monthly')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reportType === 'monthly'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white/50 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Oylik hisobot</div>
                  <div className="text-sm opacity-75">Ma'lum oy</div>
                </button>
              </div>
              
              {/* Monthly Report Date Selection */}
              {reportType === 'monthly' && (
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Oy va yilni tanlang</label>
                  <input
                    type="month"
                    value={reportMonth}
                    onChange={(e) => setReportMonth(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              )}
            </div>
            
            {/* Report Preview */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Hisobot ko'rinishi</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Jami qarzlar</div>
                  <div className="text-2xl font-bold text-gray-800">{getReportData().length}</div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Kutilayotgan</div>
                  <div className="text-2xl font-bold text-orange-600">{getReportData().filter(d => d.status === 'pending').length}</div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">To'langan</div>
                  <div className="text-2xl font-bold text-green-600">{getReportData().filter(d => d.status === 'paid').length}</div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Jami summa</div>
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(getReportData().reduce((sum, d) => sum + d.amount, 0))}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">{getReportTitle()}</div>
                <div className="text-sm text-gray-600">Yaratilgan: {new Date().toLocaleDateString('uz-UZ')}</div>
              </div>
            </div>
            
            {/* Export Actions */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Eksport va chop etish</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={generatePNGReport}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Download className="w-6 h-6" />
                  PNG Rasm
                </button>
                
                <button
                  onClick={generateExcelReport}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <FileSpreadsheet className="w-6 h-6" />
                  Excel Eksport
                </button>
                
                <button
                  onClick={printReport}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Printer className="w-6 h-6" />
                  Chop etish
                </button>
                
                <button
                  onClick={() => {
                    // Show info about PNG export
                    alert('PNG rasm: Landscape o\'lchamda, rangli jadvali va professional ko\'rinishda PNG rasm yaratadi. Rasm sifatida saqlash va ulashish uchun ideal.');
                  }}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <FileText className="w-6 h-6" />
                  Ma'lumot
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Eksport turlari:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>PNG Rasm:</strong> Landscape o'lchamda, rangli jadvali PNG rasm yaratadi</li>
                  <li>• <strong>Excel Eksport:</strong> CSV formatida ma'lumotlarni saqlaydi</li>
                  <li>• <strong>Chop etish:</strong> Qog'ozga chop etish uchun tayyorlaydi</li>
                  <li>• <strong>Ma'lumot:</strong> PNG rasm haqida batafsil ma'lumot</li>
                </ul>
              </div>
            </div>
          </div>
        ) : activeSection === 'analytics' ? (
          // Analytics Content
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('analytics.title', 'Kengaytirilgan Analitika')}</h2>
              <p className="text-gray-600">{t('analytics.subtitle', 'Qarzlar haqida chuqur tahlil va statistikalar')}</p>
            </div>
            
            {/* Period Selection */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{t('analytics.selectPeriod', 'Davrni tanlang')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'week', label: t('analytics.week', 'Hafta'), icon: '📅' },
                  { key: 'month', label: t('analytics.month', 'Oy'), icon: '📊' },
                  { key: 'quarter', label: t('analytics.quarter', 'Chorak'), icon: '📈' },
                  { key: 'year', label: t('analytics.year', 'Yil'), icon: '📋' }
                ].map(period => (
                  <button
                    key={period.key}
                    onClick={() => setAnalyticsPeriod(period.key)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      analyticsPeriod === period.key
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 bg-white/50 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{period.icon}</div>
                    <div className="font-semibold">{period.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Analytics Data */}
            {(() => {
              const analyticsData = getAnalyticsData();
              return (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Jami summa</p>
                          <p className="text-2xl font-bold text-blue-600">{formatCurrency(analyticsData.totalAmount)}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Kutilayotgan</p>
                          <p className="text-2xl font-bold text-orange-600">{formatCurrency(analyticsData.pendingAmount)}</p>
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
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(analyticsData.paidAmount)}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">O'rtacha to'lov</p>
                          <p className="text-2xl font-bold text-purple-600">{analyticsData.avgPaymentDays} kun</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Circular Chart - Payment Status */}
                    <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        To'lov holati
                      </h3>
                      <div className="flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                            />
                            {/* Pending arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="8"
                              strokeDasharray={`${(analyticsData.pendingAmount / analyticsData.totalAmount) * 251.2} 251.2`}
                              strokeDashoffset="0"
                            />
                            {/* Paid arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="8"
                              strokeDasharray={`${(analyticsData.paidAmount / analyticsData.totalAmount) * 251.2} 251.2`}
                              strokeDashoffset={`-${(analyticsData.pendingAmount / analyticsData.totalAmount) * 251.2}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-800">{analyticsData.totalDebts}</div>
                              <div className="text-sm text-gray-600">Jami qarzlar</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Kutilayotgan ({analyticsData.pendingDebts})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">To'langan ({analyticsData.paidDebts})</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Trend Chart - Monthly Trends */}
                    <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUpIcon className="w-5 h-5" />
                        Oylik trendlar
                      </h3>
                      {analyticsData.monthlyTrends.length > 0 ? (
                        <div className="space-y-3">
                          {analyticsData.monthlyTrends.slice(-6).map((trend, index) => (
                            <div key={trend.month} className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                {new Date(trend.month + '-01').toLocaleDateString('uz-UZ', { month: 'short', year: 'numeric' })}
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                  <span className="text-sm">{trend.pending}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-sm">{trend.paid}</span>
                                </div>
                                <div className="text-sm font-medium">
                                  {formatCurrency(trend.pending + trend.paid)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>Trend ma'lumotlari yo'q</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Top Creditors */}
                  <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Eng ko'p qarz beruvchi kreditorlar
                    </h3>
                    {analyticsData.topCreditors.length > 0 ? (
                      <div className="space-y-3">
                        {analyticsData.topCreditors.map((creditor, index) => (
                          <div key={creditor.name} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{creditor.name}</div>
                                <div className="text-sm text-gray-600">{creditor.count} ta qarz</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-800">{formatCurrency(creditor.total)}</div>
                              <div className="text-sm text-gray-600">
                                {formatCurrency(creditor.pending)} kutilmoqda
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Star className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>Kreditor ma'lumotlari yo'q</p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        ) : activeSection === 'settings' ? (
          // Settings Content
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('settings.title', 'Sozlamalar')}</h2>
              <p className="text-gray-600">{t('settings.subtitle', 'Ilova sozlamalarini boshqaring')}</p>
            </div>
            
            {/* Settings Cards */}
            <div className="space-y-6">
              {/* Language Settings */}
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {t('settings.language.title', 'Til sozlamalari')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">{t('settings.language.interface', 'Interfeys tili')}</h4>
                      <p className="text-sm text-gray-600">{t('settings.language.description', 'Ilova tilini tanlang')}</p>
                    </div>
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {t('settings.currency.title', 'Valyuta sozlamalari')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">{t('settings.currency.main', 'Asosiy valyuta')}</h4>
                      <p className="text-sm text-gray-600">{t('settings.currency.description', 'Qarzlar ko\'rsatish uchun asosiy valyuta')}</p>
                    </div>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  {t('settings.theme.title', 'Mavzu sozlamalari')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">{t('settings.theme.color', 'Rang mavzusi')}</h4>
                      <p className="text-sm text-gray-600">{t('settings.theme.description', 'Yorug\' yoki qorong\'u mavzuni tanlang')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          theme === 'light' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        {t('settings.theme.light', 'Yorug\'')}
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          theme === 'dark' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        {t('settings.theme.dark', 'Qorong\'u')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* About Section */}
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('settings.about.title', 'Ilova haqida')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('app.version', 'Versiya')}:</span>
                    <span className="font-semibold">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('app.created', 'Yaratilgan')}:</span>
                    <span className="font-semibold">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('settings.about.totalDebts', 'Jami qarzlar')}:</span>
                    <span className="font-semibold">{debts.length} ta</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('settings.about.selectedLanguage', 'Tanlangan til')}:</span>
                    <span className="font-semibold">
                      {t(`languages.${language}`, language === 'uz' ? "O'zbek tili" : language === 'ru' ? 'Русский' : language === 'en' ? 'English' : 'Тоҷикӣ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('settings.about.mainCurrency', 'Asosiy valyuta')}:</span>
                    <span className="font-semibold">{currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('settings.about.theme', 'Mavzu')}:</span>
                    <span className="font-semibold">
                      {theme === 'light' ? t('settings.theme.light', 'Yorug\'') : t('settings.theme.dark', 'Qorong\'u')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Debts Content
          <div className="max-w-4xl mx-auto">
            {/* Header Section with Add Button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('debts.title', 'Qarzlar ro\'yhati')}</h2>
              </div>
              <button
                onClick={() => {
                  // Reset form to default state before opening modal
                  setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
                  setShowAddForm(true);
                }}
                className="backdrop-blur-lg bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                {t('debts.addNew', 'Yangi qarz qo\'shish')}
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
                  placeholder={t('debts.searchPlaceholder', 'Qarzlarni izlash...')}
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
                  {t('debts.pending', 'Kutilayotgan')} ({pendingDebtsCount})
                </button>
                <button
                  onClick={() => setActiveTab('paid')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'paid'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                      : 'backdrop-blur-lg bg-white/30 border border-white/20 text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {t('debts.paid', 'To\'langan')} ({paidDebtsCount})
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                      : 'backdrop-blur-lg bg-white/30 border border-white/20 text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {t('debts.all', 'Barchasi')} ({totalDebtsCount})
                </button>
              </div>
              
              {/* Filters */}
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-800">{t('debts.filter', 'Filtrlar')}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.minAmount', 'Minimal summa')}</label>
                    <input
                      type="number"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.maxAmount', 'Maksimal summa')}</label>
                    <input
                      type="number"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                      placeholder="∞"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.form.creditor', 'Kreditor nomi')}</label>
                    <input
                      type="text"
                      value={filters.creditor}
                      onChange={(e) => setFilters({...filters, creditor: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                      placeholder={t('debts.search', 'Qidiruv...')}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({ minAmount: '', maxAmount: '', creditor: '' })}
                      className="w-full backdrop-blur-lg bg-white/50 border border-white/30 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-white/70 transition-all text-sm"
                    >
                      {t('debts.clear', 'Tozalash')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Debts List */}
            {filteredDebts.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl md:p-8 md:rounded-2xl">
                  <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3 md:w-16 md:h-16 md:mb-4" />
                  {debts.length === 0 ? (
                    <>
                      <p className="text-gray-600 text-base md:text-lg">{t('debts.noDebts', 'Hali qarzlar qo\'shilmagan')}</p>
                      <p className="text-gray-500 text-xs mt-1 md:text-sm md:mt-2">{t('debts.noDebtsSubtitle', 'Yuqoridagi tugma orqali yangi qarz qo\'shing')}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 text-base md:text-lg">{t('debts.noResults', 'Filtr bo\'yicha qarzlar topilmadi')}</p>
                      <p className="text-gray-500 text-xs mt-1 md:text-sm md:mt-2">{t('debts.noResultsSubtitle', 'Filtr sozlamalarini o\'zgartiring')}</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm">
                    {filteredDebts.length} {t('debts.results', 'ta qarz topildi')}
                  </p>
                </div>
                
                {/* Horizontal Debt Items */}
                {filteredDebts.map(debt => (
                  <div key={debt.id} className={`backdrop-blur-lg border rounded-2xl p-3 shadow-md md:p-4 md:rounded-2xl md:shadow-lg ${
                    debt.status === 'pending' 
                      ? 'bg-white/40 border-white/30' 
                      : 'bg-green-50/50 border-green-200/30 opacity-90'
                  }`}>
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 md:w-12 md:h-12 md:text-lg ${
                        debt.status === 'pending' 
                          ? 'bg-gradient-to-br from-orange-500 to-red-500'
                          : 'bg-gradient-to-br from-green-500 to-emerald-500'
                      }`}>
                        {debt.creditor.charAt(0).toUpperCase()}
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 md:gap-3">
                          <h4 className="font-bold text-gray-800 text-base truncate md:text-lg">{debt.creditor}</h4>
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 md:px-2 md:py-1 ${
                            debt.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {/* Amount - Editable */}
                            {editingDebt === debt.id ? (
                              <div className="mb-1">
                                <input
                                  type="text"
                                  value={editForm.amount}
                                  onChange={handleEditAmountChange}
                                  className="w-full px-2 py-1 text-lg md:text-xl font-bold border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  placeholder="Summa"
                                />
                              </div>
                            ) : (
                              <p 
                                className={`font-bold mb-1 text-lg md:text-xl cursor-pointer hover:bg-orange-100 px-2 py-1 rounded transition-colors ${
                              debt.status === 'pending' ? 'text-red-600' : 'text-green-600'
                                }`}
                                onClick={() => startEditing(debt)}
                                title="Tahrirlash uchun bosing"
                              >
                              {formatCurrency(debt.amount)}
                            </p>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 md:text-sm md:gap-4">
                              {debt.description && (
                                <span className="truncate max-w-[100px] md:max-w-xs">{debt.description}</span>
                              )}
                              {/* Phone - Editable */}
                              {editingDebt === debt.id ? (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <input
                                    type="tel"
                                    value={editForm.phone}
                                    onChange={handleEditPhoneChange}
                                    className="px-2 py-1 text-xs md:text-sm border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="+998 77 310 98 28"
                                  />
                                </div>
                              ) : (
                                debt.phone && (
                                  <span 
                                    className="flex items-center gap-1 whitespace-nowrap cursor-pointer hover:bg-orange-100 px-2 py-1 rounded transition-colors"
                                    onClick={() => startEditing(debt)}
                                    title="Tahrirlash uchun bosing"
                                  >
                                  <Phone className="w-3 h-3" />
                                  <span className="text-xs md:text-sm">{debt.phone}</span>
                                </span>
                                )
                              )}
                              {debt.debtDate && (
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                  <Calendar className="w-3 h-3" />
                                  <span className="text-xs md:text-sm">{new Date(debt.debtDate).toLocaleDateString('uz-UZ')}</span>
                                </span>
                              )}
                              {debt.paidAt && (
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                  <Check className="w-3 h-3" />
                                  <span className="text-xs md:text-sm">{new Date(debt.paidAt).toLocaleDateString('uz-UZ')}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-1.5 flex-shrink-0 md:gap-2">
                            {editingDebt === debt.id ? (
                              <>
                                <button
                                  onClick={() => saveEdit(debt.id)}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1.5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 md:p-2"
                                  title="Saqlash"
                                >
                                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-1.5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 md:p-2"
                                  title="Bekor qilish"
                                >
                                  <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                            <button
                              onClick={() => showDebtDetails(debt)}
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-1.5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 md:p-2"
                              title="Batafsil ma'lumot"
                            >
                              <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                                <button
                                  onClick={() => startEditing(debt)}
                                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-1.5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 md:p-2"
                                  title="Tahrirlash"
                                >
                                  <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            {debt.status === 'pending' && (
                              <button
                                onClick={() => markAsPaid(debt.id)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1.5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 md:p-2"
                                title="To'landi deb belgilash"
                              >
                                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteDebt(debt.id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-1.5 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 md:p-2"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                              </>
                            )}
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
              <h3 className="text-xl font-bold text-gray-800">{t('debts.form.addDebt', 'Yangi qarz qo\'shish')}</h3>
              <button 
                onClick={() => {
                  // Reset the form to initial state with +998 prefix and today's date
                  setNewDebt({ creditor: '', amount: '', description: '', phone: '+998 ', debtDate: new Date().toISOString().split('T')[0] });
                  setShowAddForm(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.form.creditor', 'Kreditor nomi')}</label>
                <input
                  type="text"
                  value={newDebt.creditor}
                  onChange={(e) => setNewDebt({...newDebt, creditor: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                  placeholder={t('debts.form.creditorPlaceholder', 'Masalan: Ali')}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.form.debtDate', 'Qarz sanasi')}</label>
                <input
                  type="date"
                  value={newDebt.debtDate}
                  onChange={(e) => setNewDebt({...newDebt, debtDate: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.form.amount', 'Qarz miqdori')} (UZS)</label>
                <input
                  type="text"
                  value={newDebt.amount}
                  onChange={handleAmountChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                  placeholder={t('debts.form.amountPlaceholder', 'Masalan: 1 000 000')}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.form.phone', 'Telefon raqami')}</label>
                <div className="flex gap-0">
                  {/* Country Code Selector */}
                  <select
                    value={newDebt.countryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    className="px-2 py-2.5 rounded-l-xl border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-sm min-w-[100px] max-w-[100px]"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code + country.country} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  
                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    value={newDebt.phone}
                    onChange={handlePhoneChange}
                    className="flex-1 px-3 py-2.5 rounded-r-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                    placeholder={newDebt.countryCode === '+998' ? '77 310 98 28' : (newDebt.countryCode === '+7' || newDebt.countryCode === '+77') ? '903 123 45 67' : newDebt.countryCode === '+992' ? '90 123 45 67' : '555 123 4567'}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{t('debts.form.phoneNote', 'Raqamlar avtomatik formatlanadi')}</p>
              </div>
              
            </div>
            
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">{t('debts.form.description', 'Izoh')} ({t('debts.form.optional', 'ixtiyoriy')})</label>
              <textarea
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none text-sm"
                  placeholder={t('debts.form.descriptionPlaceholder', 'Qarz haqida qisqa ma\'lumot')}
                rows={2}
                />
            </div>
            
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  // Reset the form to initial state with +998 prefix and today's date
                  setNewDebt({ creditor: '', amount: '', description: '', phone: '', countryCode: '+998', debtDate: new Date().toISOString().split('T')[0] });
                  setShowAddForm(false);
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
              >
                {t('debts.form.cancel', 'Bekor qilish')}
              </button>
              <button
                onClick={addDebt}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
              >
                {t('debts.form.addDebt', 'Qarz qo\'shish')}
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
                    showDetailsModal.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {showDetailsModal.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">{t('form.debtId', 'Qarz ID')}</p>
                  <p className="font-medium">#{showDetailsModal.id}</p>
                </div>
                
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">{t('common.phoneNumber', 'Telefon raqami')}</p>
                  <p className="font-medium">{showDetailsModal.phone || t('common.notAvailable', 'Mavjud emas')}</p>
                </div>
                
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">{t('common.debtDate', 'Qarz sanasi')}</p>
                  <p className="font-medium">
                    {showDetailsModal.debtDate ? new Date(showDetailsModal.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas')}
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 rounded-xl">
                  <p className="text-gray-600 text-sm">{t('form.createdDate', 'Yaratilgan sana')}</p>
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
      
      {/* Calculator Modal */}
      {showCalculator && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target.id === 'calculator-backdrop' && setShowCalculator(false)}
        >
          <div 
            id="calculator-backdrop"
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-full max-w-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Kalkulyator</h3>
              <button 
                onClick={() => setShowCalculator(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Calculator Display */}
            <div className="mb-4">
              <div className="bg-gray-100 rounded-xl p-4 text-right">
                <div className="text-sm text-gray-600 mb-1">
                  {calculatorHistory} {getCurrencySymbol(selectedCurrency)}
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {formatNumberWithSpaces(calculatorValue)} {getCurrencySymbol(selectedCurrency)}
                </div>
              </div>
            </div>
            
            {/* Exchange Rates Display */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-2">Valyuta kurslari:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>1 USD = {exchangeRates.USD.toLocaleString()} UZS</div>
                <div>1 EUR = {exchangeRates.EUR.toLocaleString()} UZS</div>
                <div>1 RUB = {exchangeRates.RUB} UZS</div>
                <div>1 TJS = {exchangeRates.TJS.toLocaleString()} UZS</div>
              </div>
            </div>
            
            {/* Calculator Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {/* Row 1 */}
              <button
                onClick={() => handleCalculatorInput('1')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                1
              </button>
              <button
                onClick={() => handleCalculatorInput('2')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                2
              </button>
              <button
                onClick={() => handleCalculatorInput('3')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                3
              </button>
              <button
                onClick={() => handleCalculatorOperation('C')}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                C
              </button>
              
              {/* Row 2 */}
              <button
                onClick={() => handleCalculatorInput('4')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                4
              </button>
              <button
                onClick={() => handleCalculatorInput('5')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                5
              </button>
              <button
                onClick={() => handleCalculatorInput('6')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                6
              </button>
              <button
                onClick={() => handleCurrencyConversion('USD')}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition-colors"
                title="USD ga konvertatsiya"
              >
                USD
              </button>
              
              {/* Row 3 */}
              <button
                onClick={() => handleCalculatorInput('7')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                7
              </button>
              <button
                onClick={() => handleCalculatorInput('8')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                8
              </button>
              <button
                onClick={() => handleCalculatorInput('9')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                9
              </button>
              <button
                onClick={() => handleCurrencyConversion('EUR')}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors"
                title="EUR ga konvertatsiya"
              >
                EUR
              </button>
              
              {/* Row 4 */}
              <button
                onClick={() => handleCalculatorInput('0')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                0
              </button>
              <button
                onClick={() => handleCalculatorInput('.')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold transition-colors"
              >
                .
              </button>
              <button
                onClick={() => handleCalculatorOperation('=')}
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                =
              </button>
              <button
                onClick={() => handleCurrencyConversion('RUB')}
                className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg font-semibold transition-colors"
                title="RUB ga konvertatsiya"
              >
                RUB
              </button>
            </div>
            
            {/* Currency Conversion Row */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => handleCurrencyConversion('TJS')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg font-semibold transition-colors"
                title="TJS (Tojikiston somoni) ga konvertatsiya"
              >
                TJS
              </button>
              <button
                onClick={() => handleCurrencyConversion('UZS')}
                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg font-semibold transition-colors"
                title="UZS ga konvertatsiya"
              >
                UZS
              </button>
            </div>
            
            {/* Operations Row */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {/* Row 5 - Operations */}
              <button
                onClick={() => handleCalculatorOperation('+')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                +
              </button>
              <button
                onClick={() => handleCalculatorOperation('-')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                -
              </button>
              <button
                onClick={() => handleCalculatorOperation('*')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                ×
              </button>
              <button
                onClick={() => handleCalculatorOperation('/')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                ÷
              </button>
            </div>
            
            {/* Apply Button */}
            <button
              onClick={applyCalculatorResult}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Natijani qo'llash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}