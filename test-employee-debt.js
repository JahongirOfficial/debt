// Test employee debt creation
const API_BASE = 'http://localhost:5002/api';

async function testEmployeeDebt() {
  console.log('💰 Testing Employee Debt Creation...\n');

  // First login as employee
  const loginData = {
    phone: '+998773109829',
    password: 'empc3xzp0'
  };

  try {
    console.log('1️⃣ Employee login...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const loginResult = await loginResponse.json();
    
    if (!loginResult.success) {
      console.log('❌ Login failed:', loginResult.message);
      return;
    }

    console.log('✅ Employee logged in:', loginResult.user.username);
    console.log('Role:', loginResult.user.role);
    console.log('Assigned Branch:', loginResult.user.employeeInfo?.assignedBranchName);

    const token = loginResult.token;

    // Test debt creation
    console.log('\n2️⃣ Creating debt as employee...');
    const debtData = {
      creditor: 'Test Kreditor (Employee)',
      amount: 250000,
      description: 'Xodim tomonidan yaratilgan qarz',
      phone: '901234567',
      countryCode: '+998',
      debtDate: new Date().toISOString(),
      currency: 'UZS',
      branchId: loginResult.user.assignedBranchId
    };

    const debtResponse = await fetch(`${API_BASE}/debts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(debtData)
    });

    console.log('Debt creation status:', debtResponse.status);
    const debtResult = await debtResponse.json();
    console.log('Debt creation response:', JSON.stringify(debtResult, null, 2));

    if (debtResult.success) {
      console.log('\n🎉 Debt created successfully by employee!');
      console.log('Debt ID:', debtResult.debt._id);
      console.log('Owner ID:', debtResult.debt.userId);
    }

    // Test fetching debts
    console.log('\n3️⃣ Fetching debts as employee...');
    const fetchResponse = await fetch(`${API_BASE}/debts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const fetchResult = await fetchResponse.json();
    console.log('Fetch debts status:', fetchResponse.status);
    console.log('Debts count:', fetchResult.debts?.length || 0);

    if (fetchResult.success && fetchResult.debts.length > 0) {
      console.log('Latest debt:', {
        creditor: fetchResult.debts[0].creditor,
        amount: fetchResult.debts[0].amount,
        userId: fetchResult.debts[0].userId
      });
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testEmployeeDebt();