// Test branches API to get real branch ID
const API_BASE = 'http://localhost:5002/api';
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2NGU2MDYzMTNjOTFiZGJjY2RjMTciLCJ1c2VybmFtZSI6IkF6aXpiZWsgUmFoaW1vdiIsInBob25lIjoiKzk5ODkwMTIzNDU2NyIsInN1YnNjcmlwdGlvblRpZXIiOiJmcmVlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjA3OTI2MjAsImV4cCI6MTc2MDg3OTAyMH0.J2PdbJ5zfP20W5sY5nh_JCFc6fj3nf6sK6eqj810TO4';

async function testBranches() {
  console.log('🏢 Testing Branches API...\n');

  try {
    // Get branches
    console.log('1️⃣ Getting user branches...');
    const response = await fetch(`${API_BASE}/branches`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Branches:', data);

    if (data.success && data.branches && data.branches.length > 0) {
      const firstBranch = data.branches[0];
      console.log('\n✅ Found branch:', firstBranch.name, 'ID:', firstBranch._id);
      
      // Now test employee creation with real branch ID
      console.log('\n2️⃣ Testing employee creation with real branch ID...');
      const employeeData = {
        name: 'Test Employee',
        phone: '+998901234567',
        position: 'Test Kassir',
        branchId: firstBranch._id,
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

      const createResponse = await fetch(`${API_BASE}/employees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });

      console.log('Employee creation status:', createResponse.status);
      const createData = await createResponse.json();
      console.log('Employee creation response:', createData);

      if (createData.success) {
        console.log('\n🎉 Employee created successfully!');
      } else {
        console.log('\n❌ Employee creation failed:', createData.message);
      }
    } else {
      console.log('\n⚠️ No branches found. Creating a test branch...');
      
      // Create a test branch
      const branchData = {
        name: 'Test Branch',
        description: 'Test branch for employee creation',
        currency: 'UZS'
      };

      const branchResponse = await fetch(`${API_BASE}/branches`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(branchData)
      });

      console.log('Branch creation status:', branchResponse.status);
      const branchResult = await branchResponse.json();
      console.log('Branch creation response:', branchResult);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testBranches();