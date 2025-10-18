import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useBranches } from '../../utils/BranchContext';
import { useAuth } from '../../utils/AuthContext';
import { useTranslation } from '../../utils/translationUtils';
import { useLanguage } from '../../utils/LanguageContext';

export function BranchSelector({ onCreateBranch }) {
  const { language } = useLanguage();
  const { settings, user } = useAuth();
  const t = useTranslation(language);
  const { 
    branches, 
    activeBranch, 
    switchBranch, 
    canCreateBranch, 
    branchLimit,
    loading 
  } = useBranches();
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);



  // Keyboard shortcuts handler
  const handleKeyboardShortcuts = useCallback((event) => {
    // Only handle shortcuts when not in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    // Ctrl/Cmd + 1-5 for quick branch switching
    if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '5') {
      event.preventDefault();
      const branchIndex = parseInt(event.key) - 1;
      if (branches[branchIndex] && branches[branchIndex]._id !== activeBranch?._id) {
        handleBranchSelect(branches[branchIndex]);
      }
    }

    // Ctrl/Cmd + B to open branch selector
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      setIsOpen(true);
      // Focus search input after a brief delay
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }

    // Escape to close dropdown
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      setSearchTerm('');
    }
  }, [branches, activeBranch, isOpen]);

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [handleKeyboardShortcuts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter branches based on search term
  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle branch selection
  const handleBranchSelect = (branch) => {
    switchBranch(branch);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle create branch
  const handleCreateBranch = () => {
    setIsOpen(false);
    if (onCreateBranch) {
      onCreateBranch();
    }
  };

  // Get branch icon
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
      )
    };
    return icons[iconName] || icons.building;
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  // Don't show selector if only one branch exists
  if (branches.length <= 1) {
    return (
      <div className="flex items-center space-x-3">
        {activeBranch && (
          <>
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: activeBranch.color || '#3B82F6' }}
            >
              {getBranchIcon(activeBranch.icon)}
            </div>
            <div className="flex flex-col">
              <span className={`font-semibold text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {activeBranch.name}
              </span>
              {activeBranch.description && (
                <span className={`text-xs ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activeBranch.description}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Branch Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
          settings.theme === 'dark'
            ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50'
            : 'bg-white/80 hover:bg-white border border-gray-200/50'
        } backdrop-blur-sm`}
      >
        {activeBranch && (
          <>
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: activeBranch.color || '#3B82F6' }}
            >
              {getBranchIcon(activeBranch.icon)}
            </div>
            <div className="flex flex-col items-start">
              <span className={`font-semibold text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {activeBranch.name}
              </span>
              {activeBranch.description && (
                <span className={`text-xs ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activeBranch.description}
                </span>
              )}
            </div>
          </>
        )}
        
        {/* Dropdown Arrow */}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
            settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-80 rounded-xl shadow-2xl border z-50 ${
          settings.theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        } backdrop-blur-sm`}>
          
          {/* Search Input */}
          {branches.length > 2 && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Filial qidirish... (Ctrl+B)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          )}



          {/* Branch List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredBranches.map((branch, index) => (
              <button
                key={branch._id}
                onClick={() => !branch.isDisabled && handleBranchSelect(branch)}
                disabled={branch.isDisabled}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-150 ${
                  branch.isDisabled
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
                    : activeBranch?._id === branch._id
                      ? settings.theme === 'dark'
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'bg-blue-50 text-blue-600'
                      : settings.theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0"
                  style={{ backgroundColor: branch.color || '#3B82F6' }}
                >
                  {getBranchIcon(branch.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm truncate">{branch.name}</span>
                    {branch.isDisabled && (
                      <span className="px-1 py-0.5 text-xs font-semibold rounded bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        Muzlatilgan
                      </span>
                    )}
                    {/* Keyboard shortcut indicator for first 5 branches */}
                    {index < 5 && !searchTerm && !branch.isDisabled && (
                      <kbd className={`px-1 py-0.5 text-xs font-semibold rounded ${
                        settings.theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>
                        Ctrl+{index + 1}
                      </kbd>
                    )}
                  </div>
                  {branch.description && (
                    <div className={`text-xs truncate ${
                      activeBranch?._id === branch._id
                        ? settings.theme === 'dark' ? 'text-blue-300' : 'text-blue-500'
                        : settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {branch.description}
                    </div>
                  )}
                </div>
                {activeBranch?._id === branch._id && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}

            {filteredBranches.length === 0 && searchTerm && (
              <div className={`px-4 py-6 text-center ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm">Filial topilmadi</p>
              </div>
            )}
          </div>

          {/* Create Branch Button */}
          {canCreateBranch && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCreateBranch}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-150 ${
                  settings.theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Yangi filial yaratish</span>
              </button>
            </div>
          )}

          {/* Upgrade Notice */}
          {!canCreateBranch && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className={`text-xs text-center ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {branches.length}/{branchLimit} filial ishlatilmoqda
                <br />
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  Ko'proq filial uchun tarifni yangilang
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}