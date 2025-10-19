import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function SMSRemindersSection() {
  const [smsData, setSmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('3days');
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetchSMSReminders();
  }, [selectedTemplate]);

  const fetchSMSReminders = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/admin/sms-reminders?template=${selectedTemplate}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSmsData(data.smsData || []);
      }
    } catch (error) {
      console.error('Error fetching SMS reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const getSMSTemplate = (daysLeft, debtorName, amount, dueDate) => {
    const templates = {
      '3days': `Hurmatli ${debtorName}! Sizning ${amount.toLocaleString()} UZS qarzingiz ${dueDate} sanasida, ya'ni 3 kun ichida to'lanishi kerak. Iltimos, o'z vaqtida to'lang. Qarzdaftar.uz`,
      '1day': `Diqqat! ${debtorName}, sizning ${amount.toLocaleString()} UZS qarzingiz ertaga (${dueDate}) to'lanishi kerak. Iltimos, kechiktirmang. Qarzdaftar.uz`,
      'overdue': `${debtorName}! Sizning ${amount.toLocaleString()} UZS qarzingiz muddati o'tib ketdi (${dueDate}). Zudlik bilan to'lang. Qarzdaftar.uz`,
      'weekly': `Eslatma: ${debtorName}, sizning ${amount.toLocaleString()} UZS qarzingiz ${dueDate} sanasida to'lanishi kerak. Qarzdaftar.uz`
    };
    return templates[selectedTemplate] || templates['3days'];
  };

  const getTemplateInfo = (template) => {
    const info = {
      '3days': { title: '3 kun qolgan qarzlar', color: 'yellow', icon: '⏰' },
      '1day': { title: '1 kun qolgan qarzlar', color: 'orange', icon: '🚨' },
      'overdue': { title: 'Muddati o\'tgan qarzlar', color: 'red', icon: '❌' },
      'weekly': { title: 'Haftalik eslatma', color: 'blue', icon: '📅' }
    };
    return info[template] || info['3days'];
  };

  const templateInfo = getTemplateInfo(selectedTemplate);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📱 SMS Eslatmalar
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Foydalanuvchilar uchun SMS eslatma xabarlari
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            templateInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
            templateInfo.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
            templateInfo.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
          }`}>
            {templateInfo.icon} {smsData.length} ta xabar
          </span>
        </div>
      </div>

      {/* Template Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: '3days', label: '3 kun qolgan', icon: '⏰' },
            { key: '1day', label: '1 kun qolgan', icon: '🚨' },
            { key: 'overdue', label: 'Muddati o\'tgan', icon: '❌' },
            { key: 'weekly', label: 'Haftalik', icon: '📅' }
          ].map((template) => (
            <button
              key={template.key}
              onClick={() => setSelectedTemplate(template.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                selectedTemplate === template.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{template.icon}</span>
              <span>{template.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SMS Messages List */}
      <div className="space-y-4">
        {smsData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              SMS xabarlari yo'q
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {templateInfo.title} uchun SMS xabarlari topilmadi
            </p>
          </div>
        ) : (
          smsData.map((item, index) => (
            <div
              key={`${item.userId}-${item.debtId}-${index}`}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.debtorName?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.debtorName || 'Noma\'lum'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.phone || 'Telefon yo\'q'} • Egasi: {item.ownerName || 'Noma\'lum'}
                      </p>
                    </div>
                  </div>

                  {/* Debt Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Qarz miqdori</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.amount?.toLocaleString() || 0} UZS
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Muddat</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Qolgan kunlar</div>
                      <div className={`font-semibold ${
                        item.daysLeft < 0 ? 'text-red-600 dark:text-red-400' :
                        item.daysLeft <= 1 ? 'text-orange-600 dark:text-orange-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>
                        {item.daysLeft < 0 ? `${Math.abs(item.daysLeft)} kun kechikdi` : `${item.daysLeft} kun`}
                      </div>
                    </div>
                  </div>

                  {/* SMS Message */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        SMS Xabari:
                      </div>
                      <button
                        onClick={() => copyToClipboard(getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'), index)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          copiedIndex === index
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                        }`}
                      >
                        {copiedIndex === index ? (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Nusxalandi
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Nusxalash
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-gray-900 dark:text-white text-sm leading-relaxed">
                      {getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum')}
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Xabar uzunligi: {getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum').length} belgi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {smsData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {smsData.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jami xabarlar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {smsData.reduce((sum, item) => sum + (getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum').length), 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jami belgilar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(smsData.map(item => item.userId)).size}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Foydalanuvchilar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {smsData.reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Jami qarz (UZS)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}