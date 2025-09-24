// Function to calculate user rating
export const calculateUserRating = (creditor, debts) => {
  const userDebts = debts.filter(debt => debt.creditor === creditor);
  if (userDebts.length === 0) return { score: 0, status: 'unknown', color: 'gray' };
  
  const paidDebts = userDebts.filter(debt => debt.status === 'paid');
  const pendingDebts = userDebts.filter(debt => debt.status === 'pending');
  
  // Calculate payment score based on paid vs total debts
  const paymentScore = paidDebts.length / userDebts.length * 100;
  
  // Calculate average delay for paid debts
  let totalDelay = 0;
  let delayedPayments = 0;
  
  paidDebts.forEach(debt => {
    if (debt.paidAt && debt.debtDate) {
      const debtDate = new Date(debt.debtDate);
      const paidDate = new Date(debt.paidAt);
      const delay = Math.max(0, (paidDate - debtDate) / (1000 * 60 * 60 * 24));
      if (delay > 0) {
        totalDelay += delay;
        delayedPayments++;
      }
    }
  });
  
  const averageDelay = delayedPayments > 0 ? totalDelay / delayedPayments : 0;
  
  // Determine rating based on payment score and delay
  let status, color;
  if (paymentScore >= 90 && averageDelay <= 1) {
    status = 'excellent';
    color = 'green';
  } else if (paymentScore >= 70 && averageDelay <= 7) {
    status = 'good';
    color = 'blue';
  } else if (paymentScore >= 50) {
    status = 'fair';
    color = 'yellow';
  } else {
    status = 'poor';
    color = 'red';
  }
  
  return {
    score: Math.round(paymentScore),
    status,
    color,
    averageDelay: Math.round(averageDelay),
    totalDebts: userDebts.length,
    paidDebts: paidDebts.length,
    pendingDebts: pendingDebts.length
  };
};

// Function to get analytics data
export const getAnalyticsData = (debts, analyticsPeriod, debtAdjustments = []) => {
  const now = new Date();
  const periodStart = new Date();
  
  switch (analyticsPeriod) {
    case 'week':
      periodStart.setDate(now.getDate() - 7);
      break;
    case 'month':
      periodStart.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      periodStart.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      periodStart.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  const periodDebts = debts.filter(debt => 
    new Date(debt.createdAt) >= periodStart
  );
  
  // Calculate statistics
  const totalAmount = periodDebts.reduce((sum, debt) => sum + debt.amount, 0);
  const pendingAmount = periodDebts
    .filter(debt => debt.status === 'pending')
    .reduce((sum, debt) => sum + debt.amount, 0);
  
  // Calculate paid amount including debt adjustments
  const directlyPaidAmount = periodDebts
    .filter(debt => debt.status === 'paid')
    .reduce((sum, debt) => sum + debt.amount, 0);
  
  const adjustmentAmount = debtAdjustments
    .filter(adjustment => new Date(adjustment.createdAt) >= periodStart)
    .reduce((sum, adjustment) => sum + adjustment.adjustmentAmount, 0);
  
  const paidAmount = directlyPaidAmount + adjustmentAmount;
  
  // Top creditors
  const creditorStats = {};
  periodDebts.forEach(debt => {
    if (!creditorStats[debt.creditor]) {
      creditorStats[debt.creditor] = { total: 0, pending: 0, paid: 0, count: 0 };
    }
    creditorStats[debt.creditor].total += debt.amount;
    creditorStats[debt.creditor].count += 1;
    if (debt.status === 'pending') {
      creditorStats[debt.creditor].pending += debt.amount;
    } else {
      creditorStats[debt.creditor].paid += debt.amount;
    }
  });
  
  // Add adjustment amounts to creditor stats
  debtAdjustments
    .filter(adjustment => new Date(adjustment.createdAt) >= periodStart)
    .forEach(adjustment => {
      if (!creditorStats[adjustment.creditor]) {
        creditorStats[adjustment.creditor] = { total: 0, pending: 0, paid: 0, count: 0 };
      }
      creditorStats[adjustment.creditor].paid += adjustment.adjustmentAmount;
    });
  
  const topCreditors = Object.entries(creditorStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  
  // Monthly trends
  const monthlyData = {};
  periodDebts.forEach(debt => {
    const month = new Date(debt.createdAt).toISOString().slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { pending: 0, paid: 0, count: 0 };
    }
    monthlyData[month].count += 1;
    if (debt.status === 'pending') {
      monthlyData[month].pending += debt.amount;
    } else {
      monthlyData[month].paid += debt.amount;
    }
  });
  
  // Add adjustment amounts to monthly trends
  debtAdjustments
    .filter(adjustment => new Date(adjustment.createdAt) >= periodStart)
    .forEach(adjustment => {
      const month = new Date(adjustment.createdAt).toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { pending: 0, paid: 0, count: 0 };
      }
      monthlyData[month].paid += adjustment.adjustmentAmount;
    });
  
  const monthlyTrends = Object.entries(monthlyData)
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));
  
  // Payment speed analysis
  const paidDebts = periodDebts.filter(debt => debt.status === 'paid' && debt.paidAt);
  const paymentSpeeds = paidDebts.map(debt => {
    const created = new Date(debt.createdAt);
    const paid = new Date(debt.paidAt);
    return Math.ceil((paid - created) / (1000 * 60 * 60 * 24)); // days
  });
  
  const avgPaymentDays = paymentSpeeds.length > 0 
    ? Math.round(paymentSpeeds.reduce((sum, days) => sum + days, 0) / paymentSpeeds.length)
    : 0;
  
  return {
    totalAmount,
    pendingAmount,
    paidAmount,
    totalDebts: periodDebts.length,
    pendingDebts: periodDebts.filter(d => d.status === 'pending').length,
    paidDebts: periodDebts.filter(d => d.status === 'paid').length,
    topCreditors,
    monthlyTrends,
    avgPaymentDays,
    paymentSpeeds,
    adjustmentAmount // Include adjustment amount in the returned data
  };
};