// Test script for employee API endpoints
const API_BASE = 'http://localhost:5002/api';

// Test token (you should replace this with a real token)
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2NGU2MDYzMTNjOTFiZGJjY2RjMTciLCJ1c2VybmFtZSI6IkF6aXpiZWsgUmFoaW1vdiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYwNzkwNDM1LCJleHAiOjE3NjEzOTUyMzV9.RCpInEFjR3-9UjwP3IPPzV-QG-a5uOsWpP0UQiMc7gY';

// Test employee data
const testEmployeeData = {
    name: 'Test Xodim',
    phone: '+998901234567',
    position: 'Test Kassir',
    branchId: '507f1f77bcf86cd799439011',
    permissions: {
        canAddDebt: true,
        canEditDebt: false,
        canDeleteDebt: false,
        canViewDebts: true,
        canManagePayments: false,
        canViewReports: false,
        canManageCreditors: false
    }
};

// Function to test employee creation
async function testCreateEmployee() {
    console.log('🧪 Testing employee creation...');

    try {
        const response = await fetch(`${API_BASE}/employees`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TEST_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testEmployeeData)
        });

        const data = await response.json();

        console.log('📊 Response status:', response.status);
        console.log('📋 Response data:', data);

        if (response.ok) {
            console.log('✅ Employee created successfully!');
            return data.employee;
        } else {
            console.log('❌ Failed to create employee:', data.message);
            return null;
        }
    } catch (error) {
        console.error('🚨 Network error:', error);
        return null;
    }
}

// Function to test employee fetching
async function testFetchEmployees() {
    console.log('🧪 Testing employee fetching...');

    try {
        const response = await fetch(`${API_BASE}/employees`, {
            headers: {
                'Authorization': `Bearer ${TEST_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log('📊 Response status:', response.status);
        console.log('📋 Response data:', data);

        if (response.ok) {
            console.log('✅ Employees fetched successfully!');
            console.log(`👥 Found ${data.employees?.length || 0} employees`);
            return data.employees;
        } else {
            console.log('❌ Failed to fetch employees:', data.message);
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
        // Try different ports
        const ports = [5002, 5000, 3000, 8000];

        for (const port of ports) {
            try {
                console.log(`🔍 Trying port ${port}...`);
                const response = await fetch(`http://localhost:${port}/api/employees`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer test-token`
                    }
                });

                console.log(`📊 Port ${port} response status:`, response.status);

                if (response.status !== 0) {
                    console.log(`✅ Server found on port ${port}!`);
                    // Update API_BASE for future requests
                    global.API_BASE = `http://localhost:${port}/api`;
                    return port;
                }
            } catch (error) {
                console.log(`❌ Port ${port} not responding`);
            }
        }

        console.log('❌ No server found on common ports');
        return false;
    } catch (error) {
        console.error('🚨 Cannot connect to server:', error.message);
        return false;
    }
}

// Function to test without authentication (test mode)
async function testWithoutAuth() {
    console.log('🧪 Testing without authentication (test mode)...');

    try {
        const response = await fetch(`${global.API_BASE || API_BASE}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testEmployeeData)
        });

        const data = await response.json();

        console.log('📊 Response status:', response.status);
        console.log('📋 Response data:', data);

        if (response.ok) {
            console.log('✅ Test mode working!');
            return data;
        } else {
            console.log('❌ Test mode failed:', data.message);
            return null;
        }
    } catch (error) {
        console.error('🚨 Network error:', error);
        return null;
    }
}

// Main test function
async function runEmployeeTests() {
    console.log('🚀 Starting Employee API tests...\n');

    // Test 1: Server connection
    const serverPort = await testServerConnection();
    console.log('\n' + '='.repeat(50) + '\n');

    if (!serverPort) {
        console.log('❌ Server is not running. Please start the backend server first.');
        return;
    }

    // Test 2: Fetch employees
    await testFetchEmployees();
    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Create employee without auth (test mode)
    await testWithoutAuth();
    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Create employee with auth
    const createdEmployee = await testCreateEmployee();
    console.log('\n' + '='.repeat(50) + '\n');

    if (createdEmployee) {
        console.log('🎉 Employee tests completed successfully!');
    } else {
        console.log('⚠️  Some tests failed. Check the logs above.');
    }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    runEmployeeTests();
} else {
    // Browser environment
    console.log('📱 Browser environment detected');
    console.log('🔧 You can run individual test functions:');
    console.log('   - testServerConnection()');
    console.log('   - testFetchEmployees()');
    console.log('   - testCreateEmployee()');
    console.log('   - runEmployeeTests() // Run all tests');

    // Make functions available globally in browser
    window.testServerConnection = testServerConnection;
    window.testFetchEmployees = testFetchEmployees;
    window.testCreateEmployee = testCreateEmployee;
    window.runEmployeeTests = runEmployeeTests;
}

// Export functions for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testServerConnection,
        testFetchEmployees,
        testCreateEmployee,
        runEmployeeTests
    };
}