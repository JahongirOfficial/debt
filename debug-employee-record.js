// Debug employee record
const API_BASE = 'http://localhost:5002/api';
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2NGU2MDYzMTNjOTFiZGJjY2RjMTciLCJ1c2VybmFtZSI6IkF6aXpiZWsgUmFoaW1vdiIsInBob25lIjoiKzk5ODkwMTIzNDU2NyIsInN1YnNjcmlwdGlvblRpZXIiOiJmcmVlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjA3OTI2MjAsImV4cCI6MTc2MDg3OTAyMH0.J2PdbJ5zfP20W5sY5nh_JCFc6fj3nf6sK6eqj810TO4';

async function debugEmployeeRecord() {
  console.log('🔍 Debugging Employee Record...\n');

  try {
    // Get all employees
    console.log('1️⃣ Getting all employees...');
    const response = await fetch(`${API_BASE}/employees`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Employees:', JSON.stringify(data, null, 2));

    if (data.success && data.employees.length > 0) {
      const employee = data.employees[0];
      console.log('\n📋 Employee details:');
      console.log('Employee ID:', employee._id);
      console.log('Employee User ID:', employee.employeeUserId);
      console.log('Name:', employee.name);
      console.log('Phone:', employee.phone);
      console.log('Branch ID:', employee.branchId);
      console.log('Generated Password:', employee.generatedPassword);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

debugEmployeeRecord();