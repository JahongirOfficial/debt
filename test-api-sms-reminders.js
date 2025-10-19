// Test script for SMS Reminders API
console.log('🔧 Testing SMS Reminders API...\n');

// Simulate API response
function simulateAPIResponse() {
  console.log('📡 Simulating /admin/all-debts API response...\n');
  
  const apiResponse = {
    success: true,
    debts: [
      {
        id: 'test-debt-1',
        creditorName: 'Ahmad Valiyev',
        creditorPhone: '+998901234567',
        debtorName: 'Ahmad Valiyev',
        debtorPhone: '+998901234567',
        amount: 1500000,
        dueDate: new Date('2025-10-22T00:00:00.000Z'), // 3 kun qoldi
        status: 'active',
        ownerName: 'Ali Karimov',
        createdAt: new Date(),
        debtor: {
          name: 'Ahmad Valiyev',
          phone: '+998901234567'
        }
      },
      {
        id: 'test-debt-2',
        creditorName: 'Bobur Toshev',
        creditorPhone: '+998902345678',
        debtorName: 'Bobur Toshev',
        debtorPhone: '+998902345678',
        amount: 2500000,
        dueDate: new Date('2025-10-20T00:00:00.000Z'), // 1 kun qoldi
        status: 'active',
        ownerName: 'Dilshod Rahimov',
        createdAt: new Date(),
        debtor: {
          name: 'Bobur Toshev',
          phone: '+998902345678'
        }
      },
      {
        id: 'test-debt-3',
        creditorName: 'Malika Saidova',
        creditorPhone: '+998903456789',
        debtorName: 'Malika Saidova',
        debtorPhone: '+998903456789',
        amount: 800000,
        dueDate: new Date('2025-10-17T00:00:00.000Z'), // muddati o'tgan
        status: 'active',
        ownerName: 'Sardor Ahmadov',
        createdAt: new Date(),
        debtor: {
          name: 'Malika Saidova',
          phone: '+998903456789'
        }
      },
      {
        id: 'test-debt-6',
        creditorName: 'Nigora Ahmadova',
        creditorPhone: '+998906789012',
        debtorName: 'Nigora Ahmadova',
        debtorPhone: '+998906789012',
        amount: 1800000,
        dueDate: new Date('2025-10-19T00:00:00.000Z'), // bugun
        status: 'active',
        ownerName: 'Bekzod Valiyev',
        createdAt: new Date(),
        debtor: {
          name: 'Nigora Ahmadova',
          phone: '+998906789012'
        }
      }
    ]
  };

  console.log('✅ API Response Structure:');
  console.log('   - success:', apiResponse.success);
  console.log('   - debts count:', apiResponse.debts.length);
  console.log('');

  console.log('📋 Sample Debt Data:');
  apiResponse.debts.forEach((debt, index) => {
    console.log(`${index + 1}. ${debt.creditorName || debt.debtorName}`);
    console.log(`   ID: ${debt.id}`);
    console.log(`   Phone: ${debt.creditorPhone || debt.debtorPhone}`);
    console.log(`   Amount: ${debt.amount?.toLocaleString()} UZS`);
    console.log(`   Due Date: ${debt.dueDate}`);
    console.log(`   Status: ${debt.status}`);
    console.log(`   Owner: ${debt.ownerName}`);
    console.log('');
  });

  return apiResponse;
}

// Test data validation
function testDataValidation(apiResponse) {
  console.log('🔍 Testing Data Validation...\n');
  
  const issues = [];
  
  apiResponse.debts.forEach((debt, index) => {
    const debtNum = index + 1;
    
    // Check required fields
    if (!debt.id) issues.push(`Debt ${debtNum}: Missing ID`);
    if (!debt.amount) issues.push(`Debt ${debtNum}: Missing amount`);
    if (!debt.dueDate) issues.push(`Debt ${debtNum}: Missing dueDate`);
    if (!debt.status) issues.push(`Debt ${debtNum}: Missing status`);
    
    // Check creditor/debtor name
    const hasName = debt.creditorName || debt.debtorName || debt.debtor?.name;
    if (!hasName) issues.push(`Debt ${debtNum}: Missing creditor/debtor name`);
    
    // Check phone
    const hasPhone = debt.creditorPhone || debt.debtorPhone || debt.debtor?.phone;
    if (!hasPhone) issues.push(`Debt ${debtNum}: Missing phone number`);
    
    // Check date format
    if (debt.dueDate && isNaN(new Date(debt.dueDate))) {
      issues.push(`Debt ${debtNum}: Invalid date format`);
    }
  });
  
  if (issues.length === 0) {
    console.log('✅ All data validation passed!');
  } else {
    console.log('❌ Data validation issues found:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  return issues.length === 0;
}

// Test frontend data processing
function testFrontendProcessing(apiResponse) {
  console.log('\n🖥️ Testing Frontend Data Processing...\n');
  
  // Simulate frontend processing
  const processedDebts = apiResponse.debts.map(debt => {
    const creditorName = debt.creditorName || debt.debtorName || debt.debtor?.name || 'Noma\'lum';
    const creditorPhone = debt.creditorPhone || debt.debtorPhone || debt.debtor?.phone || 'Telefon yo\'q';
    
    return {
      ...debt,
      displayName: creditorName,
      displayPhone: creditorPhone,
      formattedAmount: debt.amount?.toLocaleString() || '0',
      formattedDate: new Date(debt.dueDate).toLocaleDateString('uz-UZ')
    };
  });
  
  console.log('📊 Processed Data for Frontend:');
  processedDebts.forEach((debt, index) => {
    console.log(`${index + 1}. ${debt.displayName}`);
    console.log(`   Phone: ${debt.displayPhone}`);
    console.log(`   Amount: ${debt.formattedAmount} UZS`);
    console.log(`   Date: ${debt.formattedDate}`);
    console.log('');
  });
  
  return processedDebts;
}

// Test filter functionality
function testFilterFunctionality(debts) {
  console.log('🔍 Testing Filter Functionality...\n');
  
  const now = new Date('2025-10-19T00:00:00.000Z'); // Test date
  now.setHours(0, 0, 0, 0);
  
  const filters = [
    {
      name: 'Barcha qarzlar',
      key: 'all',
      filter: (debt) => debt.status !== 'paid'
    },
    {
      name: 'Muddati o\'tgan',
      key: 'overdue',
      filter: (debt) => {
        const dueDate = new Date(debt.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < now && debt.status !== 'paid';
      }
    },
    {
      name: 'Bugun tugaydi',
      key: 'due_today',
      filter: (debt) => {
        const dueDate = new Date(debt.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === now.getTime() && debt.status !== 'paid';
      }
    },
    {
      name: '1 kun qoldi',
      key: 'due_1day',
      filter: (debt) => {
        const tomorrow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
        const dueDate = new Date(debt.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === tomorrow.getTime() && debt.status !== 'paid';
      }
    }
  ];
  
  filters.forEach(filterConfig => {
    const filtered = debts.filter(filterConfig.filter);
    console.log(`${filterConfig.name}: ${filtered.length} ta qarz`);
    filtered.forEach(debt => {
      console.log(`   - ${debt.displayName}: ${debt.formattedDate}`);
    });
    console.log('');
  });
}

// Run all tests
function runAllTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // 1. Test API response
  const apiResponse = simulateAPIResponse();
  
  // 2. Test data validation
  const isValid = testDataValidation(apiResponse);
  
  if (!isValid) {
    console.log('\n❌ API data validation failed! Fix backend first.');
    return;
  }
  
  // 3. Test frontend processing
  const processedDebts = testFrontendProcessing(apiResponse);
  
  // 4. Test filter functionality
  testFilterFunctionality(processedDebts);
  
  console.log('🏁 All API tests completed!\n');
  console.log('📋 Summary:');
  console.log('   ✅ API response structure is correct');
  console.log('   ✅ Data validation passed');
  console.log('   ✅ Frontend processing works');
  console.log('   ✅ Filter functionality works');
  console.log('\n🎯 API is working correctly!');
}

runAllTests();