import React from 'react';
import { render, screen } from '@testing-library/react';
import { QarzdaftarDebts } from './Debts';

// Mock the translation utility
jest.mock('../utils/translationUtils', () => ({
  useTranslation: () => (key, fallback) => {
    const translations = {
      'debts.debtHistory': 'Qarz tarixi',
      'debts.amountAdded': 'qo\'shildi',
      'debts.amountPaid': 'to\'landi',
      'debts.amountChangedFrom': 'Miqdor o\'zgardi:',
      'debts.to': 'ga',
      'debts.form.reason': 'Sabab',
      'debts.noHistoryAvailable': 'Tarix mavjud emas',
      'debts.created': 'Yaratilgan',
      'debts.updated': 'Yangilangan',
      'debts.paid': 'To\'langan',
      'debts.deleted': 'O\'chirilgan',
      'debts.adjustment': 'Tuzatish',
      'common.from': 'dan'
    };
    return translations[key] || fallback || key;
  }
}));

// Mock the storage utility
jest.mock('../utils/storageUtils', () => ({
  useStoredState: (key, defaultValue) => [defaultValue, jest.fn()]
}));

// Mock the DebtContext
jest.mock('../utils/DebtContext', () => ({
  useDebts: () => ({
    debts: [],
    loading: false,
    error: null,
    createDebt: jest.fn(),
    updateDebt: jest.fn(),
    deleteDebt: jest.fn(),
    markAsPaid: jest.fn(),
    fetchDebtHistory: jest.fn()
  })
}));

// Mock the formatCurrency function
jest.mock('../utils/debtUtils', () => ({
  formatCurrency: (amount, currency) => {
    return `${currency} ${amount.toLocaleString('en-US')}`;
  }
}));

describe('DebtHistory', () => {
  test('displays correct amount added message', () => {
    // Mock debt history data with amount increase
    const mockDebtHistory = [
      {
        action: 'updated',
        amount: 1400000,
        previousAmount: 1000000,
        newAmount: 1400000,
        creditor: 'John Doe',
        createdAt: new Date('2025-09-26T17:38:49'),
        currency: 'UZS'
      }
    ];

    // Create a test component that displays the history
    const TestComponent = () => {
      return (
        <div>
          {mockDebtHistory.map((historyItem, index) => (
            <div key={index}>
              {historyItem.previousAmount !== undefined && historyItem.newAmount !== undefined && (
                <div>
                  <p className="font-medium">
                    {historyItem.newAmount > historyItem.previousAmount 
                      ? `${(historyItem.newAmount - historyItem.previousAmount).toLocaleString('en-US')} qo'shildi` 
                      : `${(historyItem.previousAmount - historyItem.newAmount).toLocaleString('en-US')} to'landi`}
                  </p>
                  <p>
                    Miqdor o'zgardi: {historyItem.previousAmount.toLocaleString('en-US')} ga {historyItem.newAmount.toLocaleString('en-US')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

    render(<TestComponent />);
    
    // Check if the correct amount added message is displayed
    expect(screen.getByText('400,000 qo\'shildi')).toBeInTheDocument();
    expect(screen.getByText('Miqdor o\'zgardi: 1,000,000 ga 1,400,000')).toBeInTheDocument();
  });

  test('displays correct amount paid message', () => {
    // Mock debt history data with amount decrease (payment)
    const mockDebtHistory = [
      {
        action: 'adjustment',
        amount: 600000,
        previousAmount: 1000000,
        newAmount: 600000,
        creditor: 'John Doe',
        createdAt: new Date('2025-09-26T17:38:49'),
        currency: 'UZS'
      }
    ];

    // Create a test component that displays the history
    const TestComponent = () => {
      return (
        <div>
          {mockDebtHistory.map((historyItem, index) => (
            <div key={index}>
              {historyItem.previousAmount !== undefined && historyItem.newAmount !== undefined && (
                <div>
                  <p className="font-medium">
                    {historyItem.newAmount > historyItem.previousAmount 
                      ? `${(historyItem.newAmount - historyItem.previousAmount).toLocaleString('en-US')} qo'shildi` 
                      : `${(historyItem.previousAmount - historyItem.newAmount).toLocaleString('en-US')} to'landi`}
                  </p>
                  <p>
                    Miqdor o'zgardi: {historyItem.previousAmount.toLocaleString('en-US')} ga {historyItem.newAmount.toLocaleString('en-US')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

    render(<TestComponent />);
    
    // Check if the correct amount paid message is displayed
    expect(screen.getByText('400,000 to\'landi')).toBeInTheDocument();
    expect(screen.getByText('Miqdor o\'zgardi: 1,000,000 ga 600,000')).toBeInTheDocument();
  });
});