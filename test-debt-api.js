// Test script for debt API endpoints
const API_BASE = 'http://localhost:5002/api';

// Test token (you should replace this with a real token)
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2NGU2MDYzMTNjOTFiZGJjY2RjMTciLCJ1c2VybmFtZSI6IkF6aXpiZWsgUmFoaW1vdiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYwNzkwNDM1LCJleHAiOjE3NjEzOTUyMzV9.RCpInEFjR3-9UjwP3IPPzV-QG-a5uOsWpP0UQiMc7gY';

// Test debt data
const testDebtData = {
  creditor: 'Test Kreditor',
  amount: 500000,
  description: 'Test qarz',
  phone: '901234567',
  countryCode: '+998',
  debtDate: new Date().toISOString(),
  currency: 'UZS',
  branchId: 'test-branch-id'
};

// Function to test debt creation
async function testCreateDebt() {
  console.log('🧪 Testing debt creation...');
  
  try {
    const response = await fetch(`${API_BASE}/debts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testDebtData)
    });

    const data = await response.json();
    
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data:', data);
    
    if (response.ok) {
      console.log('✅ Debt created successfully!');
      return data.debt;
    } else {
      console.log('❌ Failed to create debt:', data.message);
      return null;
    }
  } catch (error) {
    console.error('🚨 Network error:', error);
    return null;
  }
}

// Function to test debt fetching
async function testFetchDebts() {
  console.log('🧪 Testing debt fetching...');
  
  try {
    const response = await fetch(`${API_BASE}/debts`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data:', data);
    
    if (response.ok) {
      console.log('✅ Debts fetched successfully!');
      console.log(`📈 Found ${data.debts?.length || 0} debts`);
      return data.debts;
    } else {
      console.log('❌ Failed to fetch debts:', data.message);
      return null;
    }
  } catch (error) {
    console.error('🚨 Network error:', error);
    return null;
  }
}

// Function to test server connection
async function testServerConnection() {
  console.log('🧪 Testing server connection...');
  
  try {
    const response = await fetch(`${API_BASE}/auth/test`, {
      method: 'GET'
    });

    console.log('📊 Server response status:', response.status);
    
    if (response.ok) {
      console.log('✅ Server is running!');
      return true;
    } else {
      console.log('❌ Server responded with error');
      return false;
    }
  } catch (error) {
    console.error('🚨 Cannot connect to server:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  // Test 1: Server connection
  const serverOk = await testServerConnection();
  console.log('\n' + '='.repeat(50) + '\n');
  
  if (!serverOk) {
    console.log('❌ Server is not running. Please start the backend server first.');
    return;
  }
  
  // Test 2: Fetch debts
  await testFetchDebts();
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Create debt
  const createdDebt = await testCreateDebt();
  console.log('\n' + '='.repeat(50) + '\n');
  
  if (createdDebt) {
    console.log('🎉 All tests completed successfully!');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above.');
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  import('node-fetch').then(({ default: fetch }) => {
    global.fetch = fetch;
    runTests();
  }).catch(() => {
    console.log('❌ node-fetch not installed. Using built-in fetch (Node 18+)');
    runTests();
  });
} else {
  // Browser environment
  console.log('📱 Browser environment detected');
  console.log('🔧 You can run individual test functions:');
  console.log('   - testServerConnection()');
  console.log('   - testFetchDebts()');
  console.log('   - testCreateDebt()');
  console.log('   - runTests() // Run all tests');
  
  // Make functions available globally in browser
  window.testServerConnection = testServerConnection;
  window.testFetchDebts = testFetchDebts;
  window.testCreateDebt = testCreateDebt;
  window.runTests = runTests;
}

// Export functions for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testServerConnection,
    testFetchDebts,
    testCreateDebt,
    runTests
  };
}