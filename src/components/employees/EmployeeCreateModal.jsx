import { useState } from 'react';
import { useEmployees } from '../../utils/EmployeeContext';
import { useToast } from '../../utils/ToastContext';
import { useAuth } from '../../utils/AuthContext';

export function EmployeeCreateModal({ isOpen, onClose, onEmployeeCreated, branches }) {
  const { addEmployee } = useEmployees();
  const { showError } = useToast();
  const { settings } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    position: '',
    branchId: '',
    permissions: {
      canAddDebt: false,
      canEditDebt: false,
      canDeleteDebt: false,
      canViewDebts: true,
      canManagePayments: false,
      canViewReports: false,
      canManageCreditors: false
    }
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.branchId) {
      showError('Ism, telefon va filial majburiy maydonlar');
      return;
    }

    setLoading(true);

    try {
      const result = await addEmployee(formData);

      if (result.success) {
        onEmployeeCreated();
        setFormData({
          name: '',
          phone: '',
          position: '',
          branchId: '',
          permissions: {
            canAddDebt: false,
            canEditDebt: false,
            canDeleteDebt: false,
            canViewDebts: true,
            canManagePayments: false,
            canViewReports: false,
            canManageCreditors: false
          }
        });
      } else {
        showError(result.message || 'Xodim qo\'shishda xatolik');
      }
    } catch (error) {
      showError('Xodim qo\'shishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (permission, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col ${settings.theme === 'dark'
        ? 'bg-slate-800 border border-slate-700'
        : 'bg-white border border-gray-200'
        }`}>

        {/* Fixed Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
          <h2 className={`text-lg font-bold ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
            Yangi xodim qo'shish
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-5">
                <h3 className={`text-base font-semibold ${settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                  Asosiy ma'lumotlar
                </h3>

                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                      Ism *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Xodim ismi"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="+998901234567"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                      Lavozim
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Kassir, Menejer, ..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                      Filial *
                    </label>
                    <select
                      value={formData.branchId}
                      onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      required
                    >
                      <option value="">Filialni tanlang</option>
                      {branches.map(branch => (
                        <option key={branch._id} value={branch._id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>


                </div>
              </div>

              {/* Right Column - Permissions */}
              <div className="space-y-5">
                <h3 className={`text-base font-semibold ${settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                  Ruxsatlar
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries({
                    canAddDebt: 'Qarz qo\'shish',
                    canEditDebt: 'Qarzni tahrirlash',
                    canDeleteDebt: 'Qarzni o\'chirish',
                    canViewDebts: 'Qarzlarni ko\'rish',
                    canManagePayments: 'To\'lovlarni boshqarish',
                    canViewReports: 'Hisobotlarni ko\'rish',
                    canManageCreditors: 'Kreditorlarni boshqarish'
                  }).map(([key, label]) => (
                    <label key={key} className={`flex items-start space-x-2.5 cursor-pointer p-2.5 rounded-lg transition-colors ${settings.theme === 'dark'
                      ? 'hover:bg-slate-700/50'
                      : 'hover:bg-gray-50'
                      }`}>
                      <input
                        type="checkbox"
                        checked={formData.permissions[key]}
                        onChange={(e) => handlePermissionChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-medium block ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                          {label}
                        </span>
                        <p className={`text-xs mt-0.5 leading-tight ${settings.theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
                          {key === 'canAddDebt' && 'Yangi qarzlar yaratish'}
                          {key === 'canEditDebt' && 'Qarzlarni o\'zgartirish'}
                          {key === 'canDeleteDebt' && 'Qarzlarni o\'chirish'}
                          {key === 'canViewDebts' && 'Qarzlarni ko\'rish'}
                          {key === 'canManagePayments' && 'To\'lovlarni boshqarish'}
                          {key === 'canViewReports' && 'Hisobotlarni ko\'rish'}
                          {key === 'canManageCreditors' && 'Kreditorlarni boshqarish'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer Actions */}
        <div className="flex justify-end space-x-3 px-5 py-4 border-t border-gray-200 dark:border-slate-700 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${settings.theme === 'dark'
              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Qo\'shilmoqda...' : 'Xodim qo\'shish'}
          </button>
        </div>
      </div>
    </div>
  );
}