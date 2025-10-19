// Test employee debt operations
const API_BASE = 'http://localhost:5002/api';

async function testEmployeeOperations() {
    console.log('🔧 Testing Employee Debt Operations...\n');

    // Login as employee with edit permissions
    const loginData = {
        phone: '+998773109830',  // Employee 2 with edit permissions
        password: 'empiqhyny'
    };

    try {
        console.log('1️⃣ Employee login (with edit permissions)...');
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
        console.log('Permissions:', loginResult.user.employeeInfo?.permissions);

        const token = loginResult.token;

        // Get debts first
        console.log('\n2️⃣ Fetching debts...');
        const debtsResponse = await fetch(`${API_BASE}/debts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const debtsResult = await debtsResponse.json();
        console.log('Debts count:', debtsResult.debts?.length || 0);

        if (debtsResult.success && debtsResult.debts.length > 0) {
            const testDebt = debtsResult.debts[0];
            console.log('Test debt:', testDebt.creditor, testDebt.amount);

            // Test adjust (add)
            console.log('\n3️⃣ Testing debt adjust (add)...');
            const adjustResponse = await fetch(`${API_BASE}/debts/${testDebt._id}/adjust`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 50000,
                    type: 'add',
                    reason: 'Employee test adjustment'
                })
            });

            console.log('Adjust status:', adjustResponse.status);
            const adjustResult = await adjustResponse.json();
            console.log('Adjust result:', adjustResult.success ? 'SUCCESS' : adjustResult.message);

            // Test mark as paid
            console.log('\n4️⃣ Testing mark as paid...');
            const paidResponse = await fetch(`${API_BASE}/debts/${testDebt._id}/paid`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reason: 'Employee marked as paid'
                })
            });

            console.log('Mark as paid status:', paidResponse.status);
            const paidResult = await paidResponse.json();
            console.log('Mark as paid result:', paidResult.success ? 'SUCCESS' : paidResult.message);

        } else {
            console.log('❌ No debts found for testing');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testEmployeeOperations();