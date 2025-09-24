import { getAnalyticsData } from './analyticsUtils';

describe('getAnalyticsData', () => {
  const mockDebts = [
    {
      _id: '1',
      creditor: 'John Doe',
      amount: 5000,
      status: 'pending',
      createdAt: '2023-01-01',
      debtDate: '2023-01-01'
    },
    {
      _id: '2',
      creditor: 'Jane Smith',
      amount: 3000,
      status: 'paid',
      createdAt: '2023-01-02',
      debtDate: '2023-01-02',
      paidAt: '2023-01-05'
    }
  ];

  const mockAdjustments = [
    {
      _id: '1',
      debtId: '1',
      creditor: 'John Doe',
      originalAmount: 5000,
      newAmount: 2000,
      adjustmentAmount: 3000,
      createdAt: '2023-01-03'
    }
  ];

  test('should calculate analytics data correctly with debt adjustments', () => {
    const result = getAnalyticsData(mockDebts, 'month', mockAdjustments);
    
    // Total amount should be 5000 (pending) + 3000 (paid) = 8000
    expect(result.totalAmount).toBe(8000);
    
    // Pending amount should be 2000 (reduced amount)
    expect(result.pendingAmount).toBe(2000);
    
    // Paid amount should be 3000 (directly paid) + 3000 (adjustment) = 6000
    expect(result.paidAmount).toBe(6000);
    
    // Adjustment amount should be 3000
    expect(result.adjustmentAmount).toBe(3000);
  });

  test('should handle empty adjustments', () => {
    const result = getAnalyticsData(mockDebts, 'month', []);
    
    // Total amount should be 5000 (pending) + 3000 (paid) = 8000
    expect(result.totalAmount).toBe(8000);
    
    // Pending amount should be 5000
    expect(result.pendingAmount).toBe(5000);
    
    // Paid amount should be 3000 (directly paid)
    expect(result.paidAmount).toBe(3000);
    
    // Adjustment amount should be 0
    expect(result.adjustmentAmount).toBe(0);
  });
});