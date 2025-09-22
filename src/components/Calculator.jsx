import React, { useState } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { formatNumberWithSpaces } from '../utils/formatUtils';
import { useAuth } from '../utils/AuthContext';

export function QarzdaftarCalculator() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const { settings } = useAuth(); // Get theme settings
  const t = useTranslation(language);
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
        // Replace × with * and ÷ with / for eval
        const expression = calculatorHistory + calculatorValue;
        const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitizedExpression);
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

  const applyCalculatorResult = () => {
    const result = parseFloat(calculatorValue) || 0;
    const formattedResult = formatNumberWithSpaces(result.toString());
    // In a real app, we would pass this result to wherever it's needed
    setShowCalculator(false);
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
        // Replace × with * and ÷ with / for eval
        const expression = sidebarCalculatorHistory + sidebarCalculatorValue;
        const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitizedExpression);
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

  // Determine if dark mode is active
  const isDarkMode = settings.theme === 'dark';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">{t('calculator.title', 'Kalkulyator')}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t('calculator.subtitle', 'Asosiy matematik hisob-kitoblar')}</p>
      </div>
      
      {/* Calculator Display */}
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-6 dark:bg-gray-800/30 dark:border-gray-700">
        <div className={`rounded-xl p-6 text-right ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {sidebarCalculatorHistory}
          </div>
          <div className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {formatNumberWithSpaces(sidebarCalculatorValue)}
          </div>
        </div>
      </div>
      
      {/* Calculator Buttons */}
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl dark:bg-gray-800/30 dark:border-gray-700">
        <div className="grid grid-cols-4 gap-4">
          {/* Row 1 */}
          <button
            onClick={() => handleSidebarCalculatorInput('1')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonOne', '1')}
          >
            {t('calculator.buttonOne', '1')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('2')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonTwo', '2')}
          >
            {t('calculator.buttonTwo', '2')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('3')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonThree', '3')}
          >
            {t('calculator.buttonThree', '3')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorOperation('+')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
            title={t('calculator.buttonAdd', 'Qo\'shish')}
          >
            {t('calculator.buttonAdd', '+')}
          </button>
          
          {/* Row 2 */}
          <button
            onClick={() => handleSidebarCalculatorInput('4')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonFour', '4')}
          >
            {t('calculator.buttonFour', '4')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('5')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonFive', '5')}
          >
            {t('calculator.buttonFive', '5')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('6')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonSix', '6')}
          >
            {t('calculator.buttonSix', '6')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorOperation('-')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
            title={t('calculator.buttonSubtract', 'Ayirish')}
          >
            {t('calculator.buttonSubtract', '-')}
          </button>
          
          {/* Row 3 */}
          <button
            onClick={() => handleSidebarCalculatorInput('7')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonSeven', '7')}
          >
            {t('calculator.buttonSeven', '7')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('8')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonEight', '8')}
          >
            {t('calculator.buttonEight', '8')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('9')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonNine', '9')}
          >
            {t('calculator.buttonNine', '9')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorOperation('×')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
            title={t('calculator.buttonMultiply', 'Ko\'paytirish')}
          >
            {t('calculator.buttonMultiply', '×')}
          </button>
          
          {/* Row 4 */}
          <button
            onClick={() => handleSidebarCalculatorOperation('C')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={t('calculator.buttonClear', 'Tozalash')}
          >
            {t('calculator.buttonClear', 'C')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('0')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonZero', '0')}
          >
            {t('calculator.buttonZero', '0')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorInput('.')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title={t('calculator.buttonDecimal', 'Nuqta')}
          >
            {t('calculator.buttonDecimal', '.')}
          </button>
          <button
            onClick={() => handleSidebarCalculatorOperation('÷')}
            className={`p-4 rounded-xl font-semibold text-xl transition-colors ${
              isDarkMode 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
            title={t('calculator.buttonDivide', 'Bo\'lish')}
          >
            {t('calculator.buttonDivide', '÷')}
          </button>
          
          {/* Row 5 - Equals */}
          <button
            onClick={() => handleSidebarCalculatorOperation('=')}
            className={`col-span-4 p-4 rounded-xl font-semibold text-xl transition-all ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
            }`}
            title={t('calculator.buttonEquals', 'Hisoblash')}
          >
            {t('calculator.buttonEquals', '=')}
          </button>
        </div>
      </div>
      
      {/* Calculator Modal */}
      {showCalculator && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target.id === 'calculator-backdrop' && setShowCalculator(false)}
        >
          <div 
            id="calculator-backdrop"
            className={`rounded-2xl p-6 shadow-xl w-full max-w-sm ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('calculator.title', 'Kalkulyator')}</h3>
              <button 
                onClick={() => setShowCalculator(false)}
                className={`hover:text-gray-700 ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
                title={t('common.close', 'Yopish')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Calculator Display */}
            <div className="mb-4">
              <div className={`rounded-xl p-4 text-right ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {calculatorHistory} {getCurrencySymbol(selectedCurrency)}
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {formatNumberWithSpaces(calculatorValue)} {getCurrencySymbol(selectedCurrency)}
                </div>
              </div>
            </div>
            
            {/* Exchange Rates Display */}
            <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <div className={`text-xs mb-2 ${isDarkMode ? 'text-blue-300' : 'text-gray-600'}`}>{t('calculator.exchangeRates', 'Valyuta kurslari:')}</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>1 USD = {exchangeRates.USD.toLocaleString()} UZS</div>
                <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>1 EUR = {exchangeRates.EUR.toLocaleString()} UZS</div>
                <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>1 RUB = {exchangeRates.RUB} UZS</div>
                <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>1 TJS = {exchangeRates.TJS.toLocaleString()} UZS</div>
              </div>
            </div>
            
            {/* Calculator Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {/* Row 1 */}
              <button
                onClick={() => handleCalculatorInput('1')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonOne', '1')}
              >
                {t('calculator.buttonOne', '1')}
              </button>
              <button
                onClick={() => handleCalculatorInput('2')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonTwo', '2')}
              >
                {t('calculator.buttonTwo', '2')}
              </button>
              <button
                onClick={() => handleCalculatorInput('3')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonThree', '3')}
              >
                {t('calculator.buttonThree', '3')}
              </button>
              <button
                onClick={() => handleCalculatorOperation('C')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={t('calculator.buttonClear', 'Tozalash')}
              >
                {t('calculator.buttonClear', 'C')}
              </button>
              
              {/* Row 2 */}
              <button
                onClick={() => handleCalculatorInput('4')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonFour', '4')}
              >
                {t('calculator.buttonFour', '4')}
              </button>
              <button
                onClick={() => handleCalculatorInput('5')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonFive', '5')}
              >
                {t('calculator.buttonFive', '5')}
              </button>
              <button
                onClick={() => handleCalculatorInput('6')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonSix', '6')}
              >
                {t('calculator.buttonSix', '6')}
              </button>
              <button
                onClick={() => handleCurrencyConversion('USD')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                title={t('calculator.convertToUSD', 'USD ga konvertatsiya')}
              >
                {t('common.USD', 'USD')}
              </button>
              
              {/* Row 3 */}
              <button
                onClick={() => handleCalculatorInput('7')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonSeven', '7')}
              >
                {t('calculator.buttonSeven', '7')}
              </button>
              <button
                onClick={() => handleCalculatorInput('8')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonEight', '8')}
              >
                {t('calculator.buttonEight', '8')}
              </button>
              <button
                onClick={() => handleCalculatorInput('9')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonNine', '9')}
              >
                {t('calculator.buttonNine', '9')}
              </button>
              <button
                onClick={() => handleCurrencyConversion('EUR')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                title={t('calculator.convertToEUR', 'EUR ga konvertatsiya')}
              >
                {t('common.EUR', 'EUR')}
              </button>
              
              {/* Row 4 */}
              <button
                onClick={() => handleCalculatorInput('0')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonZero', '0')}
              >
                {t('calculator.buttonZero', '0')}
              </button>
              <button
                onClick={() => handleCalculatorInput('.')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                title={t('calculator.buttonDecimal', 'Nuqta')}
              >
                {t('calculator.buttonDecimal', '.')}
              </button>
              <button
                onClick={() => handleCalculatorOperation('=')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
                title={t('calculator.buttonEquals', 'Hisoblash')}
              >
                {t('calculator.buttonEquals', '=')}
              </button>
              <button
                onClick={() => handleCurrencyConversion('RUB')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
                title={t('calculator.convertToRUB', 'RUB ga konvertatsiya')}
              >
                {t('common.RUB', 'RUB')}
              </button>
            </div>
            
            {/* Currency Conversion Row */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => handleCurrencyConversion('TJS')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
                title={t('calculator.convertToTJS', 'TJS (Tojikiston somoni) ga konvertatsiya')}
              >
                {t('common.TJS', 'TJS')}
              </button>
              <button
                onClick={() => handleCurrencyConversion('UZS')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
                title={t('calculator.convertToUZS', 'UZS ga konvertatsiya')}
              >
                {t('common.UZS', 'UZS')}
              </button>
            </div>
            
            {/* Operations Row */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {/* Row 5 - Operations */}
              <button
                onClick={() => handleCalculatorOperation('+')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
                title={t('calculator.buttonAdd', 'Qo\'shish')}
              >
                {t('calculator.buttonAdd', '+')}
              </button>
              <button
                onClick={() => handleCalculatorOperation('-')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
                title={t('calculator.buttonSubtract', 'Ayirish')}
              >
                {t('calculator.buttonSubtract', '-')}
              </button>
              <button
                onClick={() => handleCalculatorOperation('×')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
                title={t('calculator.buttonMultiply', 'Ko\'paytirish')}
              >
                {t('calculator.buttonMultiply', '×')}
              </button>
              <button
                onClick={() => handleCalculatorOperation('÷')}
                className={`p-3 rounded-lg font-semibold transition-colors ${
                  isDarkMode 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
                title={t('calculator.buttonDivide', 'Bo\'lish')}
              >
                {t('calculator.buttonDivide', '÷')}
              </button>
            </div>
            
            {/* Apply Button */}
            <button
              onClick={applyCalculatorResult}
              className={`w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              }`}
              title={t('calculator.applyResult', 'Natijani qo\'llash')}
            >
              {t('calculator.applyResult', 'Natijani qo\'llash')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}