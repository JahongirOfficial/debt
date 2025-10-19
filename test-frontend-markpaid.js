// Test frontend mark as paid functionality
const API_BASE = 'http://localhost:5002/api';

async function testFrontendMarkPaid() {
  console.log('🎯 Testing Frontend Mark as Paid...\n');

  // Login as employee with payment permissions
  const loginData = {
    phone: '+998773109830',  // Employee 2 with payment permissions
    password: 'empiqhyny'
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
    console.log('Can manage payments:', loginResult.user.employeeInfo?.permissions?.canManagePayments);

    const token = loginResult.token;

    // Get pending debts
    console.log('\n2️⃣ Fetching pending debts...');
    const debtsResponse = await fetch(`${API_BASE}/debts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const debtsResult = await debtsResponse.json();
    const pendingDebts = debtsResult.debts?.filter(debt => debt.status === 'pending') || [];
    
    console.log('Total debts:', debtsResult.debts?.length || 0);
    console.log('Pending debts:', pendingDebts.length);

    if (pendingDebts.length > 0) {
      const testDebt = pendingDebts[0];
      console.log('Test debt:', testDebt.creditor, testDebt.amount, 'UZS');

      // Test mark as paid using correct endpoint
      console.log('\n3️⃣ Testing mark as paid (correct endpoint)...');
      const paidResponse = await fetch(`${API_BASE}/debts/${testDebt._id}/paid`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reason: 'Frontend test - marked as paid'
        })
      });

      console.log('Mark as paid status:', paidResponse.status);
      const paidResult = await paidResponse.json();
      
      if (paidResult.success) {
        console.log('✅ SUCCESS: Debt marked as paid');
        console.log('Updated debt status:', paidResult.debt?.status);
        console.log('Paid at:', paidResult.debt?.paidAt);
      } else {
        console.log('❌ FAILED:', paidResult.message);
      }

      // Verify the debt is now paid
      console.log('\n4️⃣ Verifying debt status...');
      const verifyResponse = await fetch(`${API_BASE}/debts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const verifyResult = await verifyResponse.json();
      const updatedDebt = verifyResult.debts?.find(d => d._id === testDebt._id);
      
      if (updatedDebt) {
        console.log('Debt status after update:', updatedDebt.status);
        console.log('Paid at:', updatedDebt.paidAt);
      }

    } else {
      console.log('❌ No pending debts found for testing');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testFrontendMarkPaid();