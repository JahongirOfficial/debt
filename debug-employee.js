// Debug employee API
const API_BASE = 'http://localhost:5002/api';
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2NGU2MDYzMTNjOTFiZGJjY2RjMTciLCJ1c2VybmFtZSI6IkF6aXpiZWsgUmFoaW1vdiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYwNzkwNDM1LCJleHAiOjE3NjEzOTUyMzV9.RCpInEFjR3-9UjwP3IPPzV-QG-a5uOsWpP0UQiMc7gY';

async function debugEmployeeAPI() {
  console.log('🔍 Debugging Employee API...\n');

  // Test 1: Simple GET request
  try {
    console.log('1️⃣ Testing GET /api/employees');
    const response = await fetch(`${API_BASE}/employees`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response:', data);
    console.log('\n' + '='.repeat(50) + '\n');
  } catch (error) {
    console.error('GET Error:', error);
  }

  // Test 2: POST request with minimal data
  try {
    console.log('2️⃣ Testing POST /api/employees (minimal data)');
    const minimalData = {
      name: 'Test Employee',
      phone: '+998901234567',
      branchId: '507f1f77bcf86cd799439011'
    };

    const response = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(minimalData)
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    console.log('\n' + '='.repeat(50) + '\n');
  } catch (error) {
    console.error('POST Error:', error);
  }

  // Test 3: Check if routes are loaded
  try {
    console.log('3️⃣ Testing route availability');
    const routes = [
      '/api/employees',
      '/api/auth/test',
      '/api/debts'
    ];

    for (const route of routes) {
      try {
        const response = await fetch(`${API_BASE.replace('/api', '')}${route}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${TEST_TOKEN}`
          }
        });
        console.log(`${route}: ${response.status}`);
      } catch (error) {
        console.log(`${route}: ERROR - ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Route test error:', error);
  }
}

// Run debug
debugEmployeeAPI();