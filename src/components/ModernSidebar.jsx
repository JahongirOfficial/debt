import React, { useState } from 'react';
import { useTranslation } from '../utils/translationUtils';
import { useLanguage } from '../utils/LanguageContext.jsx';
import { useAuth } from '../utils/AuthContext.jsx';
import { useDebts } from '../utils/DebtContext.jsx';
import { useBranches } from '../utils/BranchContext.jsx';
import { useNavigate } from 'react-router-dom';
import { BranchSelector } from './branches/BranchSelector';
import { BranchCreateModal } from './branches/BranchCreateModal';

export function ModernSidebar({ activeSection, switchSection, isOpen, onClose, onCollapseChange }) {
    const { language } = useLanguage();
    const { user, settings, logout } = useAuth();
    const { debts, userTier, debtLimit } = useDebts();
    const { branches } = useBranches();
    const navigate = useNavigate();
    const t = useTranslation(language);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);

    // Check if user has reached the pending debt limit
    const pendingDebtsCount = debts ? debts.filter(debt => debt.status === 'pending').length : 0;
    const hasReachedLimit = userTier === 'free' && debtLimit !== Infinity && pendingDebtsCount >= debtLimit;

    const handleCollapseToggle = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        if (onCollapseChange) {
            onCollapseChange(newCollapsedState);
        }
    };

    const menuItems = [
        {
            id: 'dashboard',
            route: '/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            label: t('navigation.dashboard', 'Dashboard'),
            badge: null
        },
        {
            id: 'debts',
            route: '/debts',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: t('navigation.debts', 'Qarzlar'),
            badge: null
        },
        {
            id: 'branches',
            route: '/branches',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            label: t('navigation.branches', 'Filiallar'),
            badge: null
        },
        {
            id: 'calculator',
            route: '/calculator',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            label: t('navigation.calculator', 'Kalkulyator'),
            badge: null
        },
        {
            id: 'ratings',
            route: '/ratings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.538-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            label: t('navigation.ratings', 'Reytinglar'),
            badge: null
        },
        {
            id: 'analytics',
            route: '/analytics',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            label: t('navigation.analytics', 'Analitika'),
            badge: null
        },
        {
            id: 'sms-notifications',
            route: '/sms-notifications',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            label: t('navigation.smsNotifications', 'SMS Eslatmalar'),
            badge: user?.subscriptionTier === 'free' ? 'PRO' : null
        },
        {
            id: 'pricing',
            route: '/pricing',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: t('navigation.pricing', 'Tariflar'),
            badge: null
        },
        {
            id: 'settings',
            route: '/settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: t('navigation.settings', 'Sozlamalar'),
            badge: null
        }
    ];

    const getSubscriptionColor = (tier) => {
        switch (tier) {
            case 'pro':
                return 'from-purple-500 to-pink-500';
            case 'standard':
                return 'from-blue-500 to-indigo-500';
            case 'lite':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getSubscriptionLabel = (tier) => {
        switch (tier) {
            case 'pro':
                return 'PRO';
            case 'standard':
                return 'STANDARD';
            case 'lite':
                return 'LITE';
            default:
                return 'FREE';
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-[267px]'}
        ${settings.theme === 'dark'
                    ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700'
                    : 'bg-white/95 backdrop-blur-xl border-r border-gray-200/50'
                }
        shadow-2xl
      `}>

                {/* Fixed Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200/20">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${settings.theme === 'dark' ? 'from-blue-500 to-cyan-500' : 'from-orange-500 to-red-500'} flex items-center justify-center shadow-lg`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {t('app.title', 'Qarzdaftar')}
                                </h1>
                                <p className={`text-xs ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Qarz boshqaruvi
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Collapse Toggle - Desktop only */}
                    <button
                        onClick={handleCollapseToggle}
                        className={`hidden md:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ${settings.theme === 'dark'
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <svg className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Close Button - Mobile only */}
                    <button
                        onClick={onClose}
                        className={`md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${settings.theme === 'dark'
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Fixed User Profile */}
                {!isCollapsed && (
                    <div className="flex-shrink-0 p-4 border-b border-gray-200/20">
                        <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getSubscriptionColor(user?.subscriptionTier)} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}>
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold truncate ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {user?.username || 'Foydalanuvchi'}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSubscriptionColor(user?.subscriptionTier)} text-white`}>
                                        {getSubscriptionLabel(user?.subscriptionTier)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Fixed Branch Selector */}
                {!isCollapsed && branches.length > 0 && (
                    <div className="flex-shrink-0 p-4 border-b border-gray-200/20">
                        <BranchSelector onCreateBranch={() => setShowCreateBranchModal(true)} />
                    </div>
                )}

                {/* Scrollable Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
                    {menuItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    switchSection(item.route);
                                    if (window.innerWidth < 768) onClose();
                                }}
                                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                                        ? settings.theme === 'dark'
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                                        : settings.theme === 'dark'
                                            ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                                title={isCollapsed ? item.label : ''}
                            >
                                <div className={`flex-shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform`}>
                                    {item.icon}
                                </div>

                                {!isCollapsed && (
                                    <>
                                        <span className="font-medium truncate">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}

                                {/* Active indicator */}
                                {isActive && (
                                    <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-l-full ${settings.theme === 'dark' ? 'bg-cyan-400' : 'bg-white'
                                        }`} />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200/20">
                    {!isCollapsed && (
                        <button
                            onClick={logout}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${settings.theme === 'dark'
                                ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                                : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">Chiqish</span>
                        </button>
                    )}

                    {isCollapsed && (
                        <button
                            onClick={logout}
                            className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${settings.theme === 'dark'
                                ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                                : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                }`}
                            title="Chiqish"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            {/* Branch Create Modal */}
            <BranchCreateModal
                isOpen={showCreateBranchModal}
                onClose={() => setShowCreateBranchModal(false)}
                onSuccess={() => {
                    setShowCreateBranchModal(false);
                }}
            />
        </>
    );
}