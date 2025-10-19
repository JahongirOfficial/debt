// Test employee dashboard statistics
const API_BASE = 'http://localhost:5002/api';

async function testEmployeeDashboard() {
  console.log('📊 Testing Employee Dashboard Statistics...\n');

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
    console.log('Assigned Branch ID:', loginResult.user.assignedBranchId);
    console.log('Assigned Branch Name:', loginResult.user.employeeInfo?.assignedBranchName);

    const token = loginResult.token;
    const assignedBranchId = loginResult.user.assignedBranchId;

    // Fetch all debts to see filtering
    console.log('\n2️⃣ Fetching all debts...');
    const debtsResponse = await fetch(`${API_BASE}/debts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const debtsResult = await debtsResponse.json();
    console.log('Total debts:', debtsResult.debts?.length || 0);

    if (debtsResult.success && debtsResult.debts.length > 0) {
      // Analyze debts by branch
      const debtsByBranch = {};
      debtsResult.debts.forEach(debt => {
        const branchId = debt.branchId || 'no-branch';
        if (!debtsByBranch[branchId]) {
          debtsByBranch[branchId] = [];
        }
        debtsByBranch[branchId].push(debt);
      });

      console.log('\n📋 Debts by branch:');
      Object.keys(debtsByBranch).forEach(branchId => {
        const count = debtsByBranch[branchId].length;
        const isAssigned = branchId === assignedBranchId;
        console.log(`  ${branchId}: ${count} debts ${isAssigned ? '(ASSIGNED BRANCH)' : ''}`);
      });

      // Show assigned branch debts
      const assignedBranchDebts = debtsResult.debts.filter(debt => debt.branchId === assignedBranchId);
      console.log(`\n🎯 Employee should see: ${assignedBranchDebts.length} debts from assigned branch`);
      
      if (assignedBranchDebts.length > 0) {
        const pending = assignedBranchDebts.filter(d => d.status === 'pending');
        const paid = assignedBranchDebts.filter(d => d.status === 'paid');
        const totalAmount = pending.reduce((sum, d) => sum + d.amount, 0);
        
        console.log('  - Pending:', pending.length);
        console.log('  - Paid:', paid.length);
        console.log('  - Total amount:', totalAmount.toLocaleString(), 'UZS');
      }
    }

    // Create a test debt for the assigned branch
    console.log('\n3️⃣ Creating test debt for assigned branch...');
    const testDebt = {
      creditor: 'Dashboard Test Kreditor',
      amount: 150000,
      description: 'Dashboard statistika uchun test qarz',
      phone: '901111111',
      countryCode: '+998',
      debtDate: new Date().toISOString(),
      currency: 'UZS',
      branchId: assignedBranchId
    };

    const createResponse = await fetch(`${API_BASE}/debts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testDebt)
    });

    const createResult = await createResponse.json();
    if (createResult.success) {
      console.log('✅ Test debt created for dashboard statistics');
      console.log('Debt ID:', createResult.debt._id);
    } else {
      console.log('❌ Failed to create test debt:', createResult.message);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testEmployeeDashboard();