import { useState, useEffect } from 'react';
import { useEmployees } from '../../utils/EmployeeContext';
import { useToast } from '../../utils/ToastContext';
import { useAuth } from '../../utils/AuthContext';

export function EmployeeEditModal({ isOpen, onClose, onEmployeeUpdated, employee, branches }) {
    const { updateEmployee } = useEmployees();
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
        },
        isActive: true
    });

    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Update form data when employee changes
    useEffect(() => {
        if (employee) {
            const initialData = {
                name: employee.name || '',
                phone: employee.phone || '',
                position: employee.position || '',
                branchId: employee.branchId || '',
                permissions: employee.permissions || {
                    canAddDebt: false,
                    canEditDebt: false,
                    canDeleteDebt: false,
                    canViewDebts: true,
                    canManagePayments: false,
                    canViewReports: false,
                    canManageCreditors: false
                },
                isActive: employee.isActive !== undefined ? employee.isActive : true
            };
            setFormData(initialData);
            setHasChanges(false);
        }
    }, [employee]);

    // Check for changes
    useEffect(() => {
        if (employee) {
            const hasChanged =
                formData.name !== (employee.name || '') ||
                formData.phone !== (employee.phone || '') ||
                formData.position !== (employee.position || '') ||
                formData.branchId !== (employee.branchId || '') ||
                formData.isActive !== (employee.isActive !== undefined ? employee.isActive : true) ||
                JSON.stringify(formData.permissions) !== JSON.stringify(employee.permissions || {});

            setHasChanges(hasChanged);
        }
    }, [formData, employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            showError('Xodim ismi kiritilishi shart');
            return;
        }

        if (!formData.phone.trim()) {
            showError('Telefon raqami kiritilishi shart');
            return;
        }

        if (!formData.branchId) {
            showError('Filial tanlanishi shart');
            return;
        }

        // Phone validation
        const phoneRegex = /^\+998[0-9]{9}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            showError('Telefon raqami noto\'g\'ri formatda. Masalan: +998901234567');
            return;
        }

        setLoading(true);

        try {
            const result = await updateEmployee(employee._id, formData);

            if (result.success) {
                onEmployeeUpdated();
                onClose();
            } else {
                showError(result.message || 'Xodim yangilashda xatolik yuz berdi');
            }
        } catch (error) {
            console.error('Employee update error:', error);
            showError('Xodim yangilashda xatolik yuz berdi');
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

    if (!isOpen || !employee) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-5xl max-h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden ${settings.theme === 'dark'
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-gray-200'
                }`}>

                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                    <h2 className={`text-xl font-bold ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
                        Xodimni tahrirlash
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto">
                    <form id="employee-edit-form" onSubmit={handleSubmit} className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            {/* Left Column - Basic Info */}
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                                    Asosiy ma'lumotlar
                                </h3>

                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 sm:mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                            Ism *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                                                ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            placeholder="Xodim ismi"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-1 sm:mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                            Telefon *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                                                ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            placeholder="+998901234567"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-1 sm:mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                            Lavozim
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
                                                ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            placeholder="Kassir, Menejer, ..."
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-1 sm:mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                            Filial *
                                        </label>
                                        <select
                                            value={formData.branchId}
                                            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors ${settings.theme === 'dark'
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

                                    {/* Status */}
                                    <div>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.isActive}
                                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                                Faol xodim
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Permissions */}
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                                    Ruxsatlar
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Qarz boshqaruvi */}
                                    <div className="space-y-2">
                                        <h4 className={`text-sm font-semibold mb-3 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                            Qarz boshqaruvi
                                        </h4>
                                        {Object.entries({
                                            canAddDebt: 'Qarz qo\'shish',
                                            canEditDebt: 'Qarzni tahrirlash',
                                            canDeleteDebt: 'Qarzni o\'chirish',
                                            canViewDebts: 'Qarzlarni ko\'rish'
                                        }).map(([key, label]) => (
                                            <label key={key} className={`flex items-center space-x-2 sm:space-x-3 cursor-pointer p-2 sm:p-2.5 rounded-lg transition-colors ${settings.theme === 'dark'
                                                ? 'hover:bg-slate-700/50'
                                                : 'hover:bg-gray-50'
                                                }`}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions[key]}
                                                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                                    {label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Boshqa ruxsatlar */}
                                    <div className="space-y-2">
                                        <h4 className={`text-sm font-semibold mb-3 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                            Boshqa ruxsatlar
                                        </h4>
                                        {Object.entries({
                                            canManagePayments: 'To\'lovlarni boshqarish',
                                            canViewReports: 'Hisobotlarni ko\'rish',
                                            canManageCreditors: 'Kreditorlarni boshqarish'
                                        }).map(([key, label]) => (
                                            <label key={key} className={`flex items-center space-x-2 sm:space-x-3 cursor-pointer p-2 sm:p-2.5 rounded-lg transition-colors ${settings.theme === 'dark'
                                                ? 'hover:bg-slate-700/50'
                                                : 'hover:bg-gray-50'
                                                }`}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions[key]}
                                                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                                    {label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Fixed Actions Footer */}
                <div className="flex justify-end items-center p-4 sm:p-6 border-t border-gray-200 dark:border-slate-700 space-x-3 flex-shrink-0 bg-gray-50 dark:bg-slate-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${settings.theme === 'dark'
                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                            } disabled:cursor-not-allowed`}
                    >
                        Bekor qilish
                    </button>

                    <button
                        type="submit"
                        form="employee-edit-form"
                        disabled={loading || !formData.name.trim() || !formData.phone.trim() || !formData.branchId || !hasChanges}
                        className={`px-4 py-2 sm:px-8 sm:py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base ${hasChanges && !loading
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                                : 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                            }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saqlanmoqda...
                            </>
                        ) : hasChanges ? (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="hidden sm:inline">O'zgarishlarni saqlash</span>
                                <span className="sm:hidden">Saqlash</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                </svg>
                                <span className="hidden sm:inline">O'zgarish yo'q</span>
                                <span className="sm:hidden">Yo'q</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}