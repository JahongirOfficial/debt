import React from 'react';
import { render, screen } from '@testing-library/react';
import { QarzdaftarAnalytics } from './Analytics';
import { DebtProvider } from '../utils/DebtContext';
import { AuthProvider } from '../utils/AuthContext';

// Mock the translation utility
jest.mock('../utils/translationUtils', () => ({
  useTranslation: () => (key, fallback) => {
    const translations = {
      'analytics.title': 'Kengaytirilgan Analitika',
      'analytics.subtitle': 'Qarzlar haqida chuqur tahlil va statistikalar',
      'analytics.paidAmount': 'To\'langan',
      'analytics.adjustmentAmount': 'Tahrirlab ayrilgan:',
      'analytics.directlyPaid': 'To\'g\'ridan-to\'g\'ri to\'langan:'
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
    loading: false
  })
}));

// Mock AuthContext
jest.mock('../utils/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user' },
    loading: false
  })
}));

describe('QarzdaftarAnalytics', () => {
  const renderComponent = () => {
    return render(
      <AuthProvider>
        <DebtProvider>
          <QarzdaftarAnalytics />
        </DebtProvider>
      </AuthProvider>
    );
  };

  test('renders analytics component', () => {
    renderComponent();
    
    // Check if the component title is rendered
    expect(screen.getByText('Kengaytirilgan Analitika')).toBeInTheDocument();
  });
});