import { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function AdminSMSRemindersPage() {
  // State variables
  const [debts, setDebts] = useState([]);
  const [filteredDebts, setFilteredDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedDebts, setSelectedDebts] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMessages, setPreviewMessages] = useState([]);
  const [copyingId, setCopyingId] = useState(null);
  const [copyingAll, setCopyingAll] = useState(false);

  // SMS Templates
  const [smsTemplates] = useState({
    overdue: 'Hurmatli {name}, sizning {amount} UZS miqdoridagi qarzingiz {days} kun kechikmoqda. Iltimos, imkon qadar tezroq to\'lang.',
    reminder: 'Hurmatli {name}, sizning {amount} UZS miqdoridagi qarzingiz {date} sanasida tugaydi. Iltimos, vaqtida to\'lang.',
    urgent: 'DIQQAT! {name}, sizning {amount} UZS qarzingiz {days} kundan beri kechikmoqda. Zudlik bilan to\'lang!'
  });

  // Load data on component mount
  useEffect(() => {
    loadDebtsData();
  }, []);

  // Filter debts when data or period changes
  useEffect(() => {
    applyFilter();
  }, [debts, selectedPeriod]);

  // API call to fetch all debts
  const loadDebtsData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Loading debts from API...');

      const response = await apiFetch('/admin/all-debts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ API Response:', result);

        if (result.success && Array.isArray(result.debts)) {
          console.log(`📊 Loaded ${result.debts.length} debts`);
          setDebts(result.debts);
        } else {
          throw new Error('Invalid API response format');
        }
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Failed to load debts');
      }
    } catch (err) {
      console.error('❌ Error loading debts:', err);
      setError(err.message || 'Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get creditor name with fallbacks
  const getCreditorName = (debt) => {
    // Try different name fields in order of preference
    if (debt.creditorName && debt.creditorName.trim()) {
      return debt.creditorName.trim();
    }
    if (debt.debtorName && debt.debtorName.trim()) {
      return debt.debtorName.trim();
    }
    if (debt.debtor?.name && debt.debtor.name.trim()) {
      return debt.debtor.name.trim();
    }
    return 'Noma\'lum';
  };

  // Helper function to get creditor phone with fallbacks
  const getCreditorPhone = (debt) => {
    // Try different phone fields in order of preference
    if (debt.creditorPhone && debt.creditorPhone.trim()) {
      return debt.creditorPhone.trim();
    }
    if (debt.debtorPhone && debt.debtorPhone.trim()) {
      return debt.debtorPhone.trim();
    }
    if (debt.debtor?.phone && debt.debtor.phone.trim()) {
      return debt.debtor.phone.trim();
    }
    return 'Telefon yo\'q';
  };

  // Helper function to format amount
  const formatAmount = (amount) => {
    if (!amount || isNaN(amount)) return '0';
    return Number(amount).toLocaleString('uz-UZ');
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Sana yo\'q';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Noto\'g\'ri sana';
      }

      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Noto\'g\'ri sana';
    }
  };

  // Helper function to calculate days overdue
  const getDaysOverdue = (dueDate) => {
    if (!dueDate) return 0;

    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = now - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Helper function to get status text
  const getStatusText = (debt) => {
    if (!debt.dueDate) return 'Sana yo\'q';

    const daysOverdue = getDaysOverdue(debt.dueDate);
    if (daysOverdue > 0) {
      return `${daysOverdue} kun kechikdi`;
    }

    const dueDate = new Date(debt.dueDate);
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (daysUntilDue === 0) return 'Bugun tugaydi';
    if (daysUntilDue > 0) return `${daysUntilDue} kun qoldi`;
    return 'Muddati o\'tgan';
  };

  // Helper function to get status color
  const getStatusColor = (debt) => {
    const daysOverdue = getDaysOverdue(debt.dueDate);
    if (daysOverdue > 7) return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
    if (daysOverdue > 0) return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
  };

  // Filter debts based on selected period
  const applyFilter = () => {
    if (!debts || debts.length === 0) {
      setFilteredDebts([]);
      return;
    }

    console.log(`🔍 Filtering ${debts.length} debts by period: ${selectedPeriod}`);

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let filtered = [];

    switch (selectedPeriod) {
      case 'overdue':
        filtered = debts.filter(debt => {
          if (!debt.dueDate) return false;
          const dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate < now && debt.status !== 'paid';
        });
        break;

      case 'due_today':
        filtered = debts.filter(debt => {
          if (!debt.dueDate) return false;
          const dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === now.getTime() && debt.status !== 'paid';
        });
        break;

      case 'due_1day':
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        filtered = debts.filter(debt => {
          if (!debt.dueDate) return false;
          const dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === tomorrow.getTime() && debt.status !== 'paid';
        });
        break;

      case 'due_2days':
        const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        filtered = debts.filter(debt => {
          if (!debt.dueDate) return false;
          const dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === twoDaysLater.getTime() && debt.status !== 'paid';
        });
        break;

      case 'due_3days':
        const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        filtered = debts.filter(debt => {
          if (!debt.dueDate) return false;
          const dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === threeDaysLater.getTime() && debt.status !== 'paid';
        });
        break;

      case 'due_week':
        const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = debts.filter(debt => {
          if (!debt.dueDate) return false;
          const dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate >= now && dueDate <= weekLater && debt.status !== 'paid';
        });
        break;

      default: // 'all'
        filtered = debts.filter(debt => debt.status !== 'paid');
        break;
    }

    console.log(`✅ Filter result: ${filtered.length} debts`);
    setFilteredDebts(filtered);
    setSelectedDebts([]); // Reset selection when filter changes
  };

  // Generate SMS message for a debt
  const generateSMSMessage = (debt, templateType) => {
    const template = smsTemplates[templateType];
    const daysOverdue = getDaysOverdue(debt.dueDate);
    const creditorName = getCreditorName(debt);
    const amount = formatAmount(debt.amount);
    const date = formatDate(debt.dueDate);

    return template
      .replace('{name}', creditorName)
      .replace('{amount}', amount)
      .replace('{days}', daysOverdue)
      .replace('{date}', date);
  };

  // Get template type based on debt status
  const getTemplateType = (debt) => {
    const daysOverdue = getDaysOverdue(debt.dueDate);
    if (daysOverdue > 7) return 'urgent';
    if (daysOverdue > 0) return 'overdue';
    return 'reminder';
  };

  // Handle debt selection
  const handleSelectDebt = (debtId) => {
    setSelectedDebts(prev =>
      prev.includes(debtId)
        ? prev.filter(id => id !== debtId)
        : [...prev, debtId]
    );
  };

  // Handle select all debts
  const handleSelectAll = () => {
    if (selectedDebts.length === filteredDebts.length && filteredDebts.length > 0) {
      setSelectedDebts([]);
    } else {
      setSelectedDebts(filteredDebts.map(debt => debt.id));
    }
  };

  // Generate preview messages
  const generatePreview = () => {
    const messages = filteredDebts
      .filter(debt => selectedDebts.includes(debt.id))
      .map(debt => ({
        debt,
        message: generateSMSMessage(debt, getTemplateType(debt)),
        templateType: getTemplateType(debt)
      }));

    setPreviewMessages(messages);
    setShowPreview(true);
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl z-50 transform transition-all duration-300`;
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${type === 'success'
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
      }
        </svg>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0) scale(1)';
    }, 10);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%) scale(0.8)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Copy text to clipboard
  const copyToClipboard = async (text, debtId = null) => {
    if (debtId) setCopyingId(debtId);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((resolve, reject) => {
          if (document.execCommand('copy')) {
            document.body.removeChild(textArea);
            resolve();
          } else {
            document.body.removeChild(textArea);
            reject(new Error('Copy failed'));
          }
        });
      }

      showNotification('Nusxa muvaffaqiyatli olindi!', 'success');
    } catch (err) {
      console.error('Copy failed:', err);
      showNotification('Nusxa olishda xatolik', 'error');
    } finally {
      if (debtId) setCopyingId(null);
    }
  };

  // Copy all messages
  const copyAllMessages = async () => {
    setCopyingAll(true);

    try {
      const allMessages = previewMessages.map((item, index) => {
        const creditorName = getCreditorName(item.debt);
        const phone = getCreditorPhone(item.debt);
        return `${index + 1}. ${creditorName} (${phone}):\n${item.message}`;
      }).join('\n\n');

      await copyToClipboard(allMessages);
    } finally {
      setCopyingAll(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-2xl"></div>
        </div>
        <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="space-y-4">
            <div className="h-10 w-48 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
        <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 flex-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">📱 SMS Eslatmalar</h1>
          <p className="text-teal-100 text-lg">Muddatiga moslab kreditorlarga SMS eslatma yuborish</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Xatolik yuz berdi</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={loadDebtsData}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">📱 SMS Eslatmalar</h1>
            <p className="text-teal-100 text-lg">
              Muddatiga moslab kreditorlarga SMS eslatma yuborish
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">Barcha qarzlar</option>
              <option value="overdue">Muddati o'tgan</option>
              <option value="due_today">Bugun tugaydi</option>
              <option value="due_1day">1 kun qoldi</option>
              <option value="due_2days">2 kun qoldi</option>
              <option value="due_3days">3 kun qoldi</option>
              <option value="due_week">1 hafta ichida</option>
            </select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredDebts.length} ta qarz topildi
              </span>
              {selectedDebts.length > 0 && (
                <span className="text-sm text-teal-600 dark:text-teal-400">
                  ({selectedDebts.length} ta tanlangan)
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSelectAll}
              disabled={filteredDebts.length === 0}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedDebts.length === filteredDebts.length && filteredDebts.length > 0 ? 'Barchasini bekor qilish' : 'Barchasini tanlash'}
            </button>

            {selectedDebts.length > 0 && (
              <button
                onClick={generatePreview}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                SMS Ko'rish ({selectedDebts.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Debts List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Qarzlar ro'yxati</h3>
        </div>

        {filteredDebts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedDebts.length === filteredDebts.length && filteredDebts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Kreditor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Qarz miqdori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Muddat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    SMS Matn
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDebts.map((debt) => (
                  <tr key={debt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedDebts.includes(debt.id)}
                        onChange={() => handleSelectDebt(debt.id)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {getCreditorName(debt)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {getCreditorPhone(debt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatAmount(debt.amount)} UZS
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatDate(debt.dueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(debt)}`}>
                        {getStatusText(debt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {generateSMSMessage(debt, getTemplateType(debt))}
                        </div>
                        <button
                          onClick={() => copyToClipboard(generateSMSMessage(debt, getTemplateType(debt)), debt.id)}
                          disabled={copyingId === debt.id}
                          className="mt-1 flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {copyingId === debt.id ? (
                            <>
                              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Nusxa olinmoqda...
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Nusxa olish
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Qarzlar topilmadi</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tanlangan filtr bo'yicha qarzlar mavjud emas.
            </p>
          </div>
        )}
      </div>

      {/* SMS Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                SMS Xabarlar Ko'rinishi ({previewMessages.length} ta)
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={copyAllMessages}
                  disabled={copyingAll}
                  className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {copyingAll ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Nusxa olinmoqda...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Barchasini nusxa olish
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {previewMessages.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {getCreditorName(item.debt)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          ({getCreditorPhone(item.debt)})
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${item.templateType === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                            item.templateType === 'overdue' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                          {item.templateType === 'urgent' ? 'Shoshilinch' :
                            item.templateType === 'overdue' ? 'Kechikkan' : 'Eslatma'}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.message, `preview-${index}`)}
                        disabled={copyingId === `preview-${index}`}
                        className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 p-1 rounded hover:bg-teal-50 dark:hover:bg-teal-900"
                        title="Nusxa olish"
                      >
                        {copyingId === `preview-${index}` ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}