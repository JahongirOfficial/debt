import React, { useState, useEffect } from 'react';
import { useBranches } from '../../utils/BranchContext';
import { useAuth } from '../../utils/AuthContext';
import { useTranslation } from '../../utils/translationUtils';
import { useLanguage } from '../../utils/LanguageContext';

const BRANCH_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280'  // Gray
];

const BRANCH_ICONS = [
  { name: 'building', label: 'Bino' },
  { name: 'store', label: 'Do\'kon' },
  { name: 'office', label: 'Ofis' },
  { name: 'home', label: 'Uy' },
  { name: 'factory', label: 'Zavod' },
  { name: 'warehouse', label: 'Ombor' }
];

const CURRENCIES = [
  { code: 'UZS', name: 'O\'zbek so\'mi', symbol: 'so\'m' },
  { code: 'USD', name: 'AQSH dollari', symbol: '$' },
  { code: 'EUR', name: 'Yevro', symbol: '€' },
  { code: 'RUB', name: 'Rossiya rubli', symbol: '₽' },
  { code: 'TJS', name: 'Tojik somoni', symbol: 'SM' }
];

export function BranchSettingsModal({ isOpen, branch, onClose, onSuccess, onDelete }) {
  const { language } = useLanguage();
  const { settings } = useAuth();
  const { updateBranch, loading } = useBranches();
  const t = useTranslation(language);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currency: 'UZS',
    color: BRANCH_COLORS[0],
    icon: 'building'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize form data when branch changes
  useEffect(() => {
    if (isOpen && branch) {
      setFormData({
        name: branch.name || '',
        description: branch.description || '',
        currency: branch.currency || 'UZS',
        color: branch.color || BRANCH_COLORS[0],
        icon: branch.icon || 'building'
      });
      setErrors({});
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  }, [isOpen, branch]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Filial nomi kiritilishi shart';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Filial nomi kamida 2 ta belgidan iborat bo\'lishi kerak';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Filial nomi 100 ta belgidan oshmasligi kerak';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Tavsif 500 ta belgidan oshmasligi kerak';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || !branch) return;

    setIsSubmitting(true);

    try {
      const result = await updateBranch(branch._id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        currency: formData.currency,
        color: formData.color,
        icon: formData.icon
      });

      if (result.success) {
        onClose();
        if (onSuccess) {
          onSuccess(result.branch);
        }
      }
    } catch (error) {
      console.error('Error updating branch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (onDelete && branch) {
      onDelete(branch);
      onClose();
    }
  };

  // Get branch icon SVG
  const getBranchIcon = (iconName) => {
    const icons = {
      building: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      store: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      office: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2H8V6" />
        </svg>
      ),
      home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      factory: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      warehouse: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4" />
        </svg>
      )
    };
    return icons[iconName] || icons.building;
  };

  if (!isOpen || !branch) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl rounded-2xl shadow-2xl ${
        settings.theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Filial sozlamalari
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              settings.theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="p-4 mx-6 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Filialni o'chirish
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Bu amalni bekor qilib bo'lmaydi. Filial va unga tegishli barcha qarzlar o'chiriladi.
                </p>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Ha, o'chirish
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-lg transition-colors"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Branch Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Filial nomi *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Masalan: Markaziy filial"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Branch Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Tavsif (ixtiyoriy)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Filial haqida qisqacha ma'lumot..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent resize-none ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Currency Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Asosiy valyuta
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  {CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column - Appearance */}
            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Filial rangi
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {BRANCH_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleInputChange('color', color)}
                      className={`w-12 h-12 rounded-lg transition-all duration-200 ${
                        formData.color === color
                          ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {formData.color === color && (
                        <svg className="w-6 h-6 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Selection */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  Filial belgisi
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {BRANCH_ICONS.map(icon => (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => handleInputChange('icon', icon.name)}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.icon === icon.name
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : settings.theme === 'dark'
                            ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: formData.color }}
                      >
                        {getBranchIcon(icon.name)}
                      </div>
                      <span className={`text-xs font-medium ${
                        formData.icon === icon.name
                          ? 'text-blue-600 dark:text-blue-400'
                          : settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {icon.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4">
            {/* Save and Cancel */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  settings.theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isSubmitting || loading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting || loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saqlanmoqda...</span>
                  </div>
                ) : (
                  'Saqlash'
                )}
              </button>
            </div>

            {/* Delete Button */}
            {onDelete && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-3 rounded-lg font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
              >
                Filialni o'chirish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}