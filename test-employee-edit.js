// Test script for employee edit functionality
const API_BASE = 'http://localhost:5000/api';

// Test employee edit
async function testEmployeeEdit() {
    console.log('🧪 Testing Employee Edit Functionality...\n');

    try {
        // First, get all employees to find one to edit
        console.log('1. Getting employees list...');
        const employeesResponse = await fetch(`${API_BASE}/employees`, {
            headers: {
                'Authorization': 'Bearer test-token',
                'Content-Type': 'application/json'
            }
        });

        const employeesData = await employeesResponse.json();
        console.log('✅ Employees fetched:', employeesData);

        if (!employeesData.success || employeesData.employees.length === 0) {
            console.log('❌ No employees found to edit');
            return;
        }

        const employeeToEdit = employeesData.employees[0];
        console.log('📝 Employee to edit:', employeeToEdit);

        // Test updating employee
        console.log('\n2. Testing employee update...');
        const updateData = {
            name: 'Updated Employee Name',
            phone: '+998901111111',
            position: 'Senior Kassir',
            branchId: employeeToEdit.branchId,
            permissions: {
                canAddDebt: true,
                canEditDebt: true,
                canDeleteDebt: false,
                canViewDebts: true,
                canManagePayments: true,
                canViewReports: true,
                canManageCreditors: false
            },
            notes: 'Updated employee notes',
            isActive: true
        };

        const updateResponse = await fetch(`${API_BASE}/employees/${employeeToEdit._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer test-token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        const updateResult = await updateResponse.json();
        console.log('✅ Update response:', updateResult);

        if (updateResult.success) {
            console.log('🎉 Employee updated successfully!');
            console.log('📊 Updated employee data:', updateResult.employee);
        } else {
            console.log('❌ Failed to update employee:', updateResult.message);
        }

        // Test getting updated employee
        console.log('\n3. Verifying updated employee...');
        const getResponse = await fetch(`${API_BASE}/employees/${employeeToEdit._id}`, {
            headers: {
                'Authorization': 'Bearer test-token',
                'Content-Type': 'application/json'
            }
        });

        const getResult = await getResponse.json();
        console.log('✅ Get updated employee:', getResult);

        // Test validation errors
        console.log('\n4. Testing validation errors...');
        const invalidUpdateData = {
            name: '', // Empty name should fail
            phone: '',
            branchId: ''
        };

        const invalidResponse = await fetch(`${API_BASE}/employees/${employeeToEdit._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer test-token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invalidUpdateData)
        });

        const invalidResult = await invalidResponse.json();
        console.log('✅ Validation test:', invalidResult);

        // Test updating non-existent employee
        console.log('\n5. Testing non-existent employee update...');
        const nonExistentResponse = await fetch(`${API_BASE}/employees/nonexistent123`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer test-token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        const nonExistentResult = await nonExistentResponse.json();
        console.log('✅ Non-existent employee test:', nonExistentResult);

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Test permission updates specifically
async function testPermissionUpdates() {
    console.log('\n🔐 Testing Permission Updates...\n');

    try {
        // Get first employee
        const employeesResponse = await fetch(`${API_BASE}/employees`, {
            headers: {
                'Authorization': 'Bearer test-token',
                'Content-Type': 'application/json'
            }
        });

        const employeesData = await employeesResponse.json();
        if (!employeesData.success || employeesData.employees.length === 0) {
            console.log('❌ No employees found');
            return;
        }

        const employee = employeesData.employees[0];

        // Test different permission combinations
        const permissionTests = [
            {
                name: 'Kassir permissions',
                permissions: {
                    canAddDebt: true,
                    canEditDebt: false,
                    canDeleteDebt: false,
                    canViewDebts: true,
                    canManagePayments: true,
                    canViewReports: false,
                    canManageCreditors: false
                }
            },
            {
                name: 'Manager permissions',
                permissions: {
                    canAddDebt: true,
                    canEditDebt: true,
                    canDeleteDebt: true,
                    canViewDebts: true,
                    canManagePayments: true,
                    canViewReports: true,
                    canManageCreditors: false
                }
            },
            {
                name: 'Accountant permissions',
                permissions: {
                    canAddDebt: false,
                    canEditDebt: false,
                    canDeleteDebt: false,
                    canViewDebts: true,
                    canManagePayments: false,
                    canViewReports: true,
                    canManageCreditors: false
                }
            }
        ];

        for (const test of permissionTests) {
            console.log(`Testing ${test.name}...`);
            
            const updateData = {
                name: employee.name,
                phone: employee.phone,
                position: test.name.split(' ')[0],
                branchId: employee.branchId,
                permissions: test.permissions,
                isActive: true
            };

            const response = await fetch(`${API_BASE}/employees/${employee._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer test-token',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            const result = await response.json();
            console.log(`✅ ${test.name} result:`, result.success ? 'Success' : 'Failed');
            
            if (result.success) {
                console.log('   Permissions set:', Object.entries(result.employee.permissions)
                    .filter(([key, value]) => value)
                    .map(([key]) => key)
                    .join(', '));
            }
        }

    } catch (error) {
        console.error('❌ Permission test failed:', error);
    }
}

// Run tests
async function runAllTests() {
    await testEmployeeEdit();
    await testPermissionUpdates();
    console.log('\n🏁 All tests completed!');
}

runAllTests();