// Helper function to group debts by date
export const groupDebtsByDate = (debts) => {
  // Handle empty debts array
  if (!debts || debts.length === 0) {
    return [];
  }
  
  const grouped = {};
  
  debts.forEach(debt => {
    try {
      // Group by date (YYYY-MM-DD)
      const date = new Date(debt.createdAt).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = { pending: 0, paid: 0 };
      }
      
      if (debt.status === 'pending') {
        grouped[date].pending += debt.amount || 0;
      } else {
        grouped[date].paid += debt.amount || 0;
      }
    } catch (error) {
      console.error('Error processing debt:', debt, error);
    }
  });
  
  // Convert to array and sort by date
  return Object.entries(grouped)
    .map(([date, amounts]) => ({
      date,
      pending: amounts.pending,
      paid: amounts.paid,
      total: amounts.pending + amounts.paid
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Function to format phone number
export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters except +
  let phoneNumber = value.replace(/[^\d+]/g, '');
  
  // If the value is empty or just +, return +998
  if (!phoneNumber || phoneNumber === '+') {
    return '+998 ';
  }
  
  // Ensure it starts with +998
  if (!phoneNumber.startsWith('+998')) {
    // If it starts with 998, add the +
    if (phoneNumber.startsWith('998')) {
      phoneNumber = '+' + phoneNumber;
    } 
    // If it starts with + but not +998, replace with +998
    else if (phoneNumber.startsWith('+')) {
      // Remove any extra 998 occurrences
      phoneNumber = phoneNumber.replace(/\+998/g, '');
      phoneNumber = '+998' + phoneNumber;
    }
    // Otherwise, prepend +998
    else {
      phoneNumber = '+998' + phoneNumber;
    }
  }
  
  // Remove any duplicate +998 occurrences
  if (phoneNumber.indexOf('+998') !== phoneNumber.lastIndexOf('+998')) {
    phoneNumber = phoneNumber.substring(0, phoneNumber.lastIndexOf('+998')) + 
                 phoneNumber.substring(phoneNumber.lastIndexOf('+998') + 4);
  }
  
  // Format the number after +998
  if (phoneNumber.startsWith('+998') && phoneNumber.length > 4) {
    const digits = phoneNumber.slice(4).replace(/\D/g, ''); // Get only the digits after +998
    let formatted = '+998';
    
    // Add space after +998
    formatted += ' ';
    
    // Add the first group (2 digits)
    if (digits.length >= 2) {
      formatted += digits.slice(0, 2) + ' ';
    } else if (digits.length > 0) {
      formatted += digits;
    }
    
    // Add the second group (3 digits)
    if (digits.length >= 4) {
      formatted += digits.slice(2, 5) + ' ';
    } else if (digits.length > 2) {
      formatted += digits.slice(2);
    }
    
    // Add the third group (2 digits)
    if (digits.length >= 6) {
      formatted += digits.slice(5, 7) + ' ';
    } else if (digits.length > 5) {
      formatted += digits.slice(5);
    }
    
    // Add the last group (2 digits)
    if (digits.length >= 8) {
      formatted += digits.slice(7, 9);
    } else if (digits.length > 7) {
      formatted += digits.slice(7);
    }
    
    return formatted;
  }
  
  // Return +998 with a space if we only have the prefix
  return '+998 ';
};

// Function to format currency
export const formatCurrency = (amount, currency = 'UZS') => {
  // Map of currency codes to locale settings
  const currencySettings = {
    'UZS': { locale: 'uz-UZ', currency: 'UZS' },
    'USD': { locale: 'en-US', currency: 'USD' },
    'EUR': { locale: 'de-DE', currency: 'EUR' },
    'RUB': { locale: 'ru-RU', currency: 'RUB' },
    'TJS': { locale: 'tg-TJ', currency: 'TJS' }
  };
  
  const settings = currencySettings[currency] || currencySettings['UZS'];
  
  return new Intl.NumberFormat(settings.locale, {
    style: 'currency',
    currency: settings.currency,
    minimumFractionDigits: 0
  }).format(amount);
};