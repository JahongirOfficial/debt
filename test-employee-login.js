// Test employee login
const API_BASE = 'http://localhost:5002/api';

async function testEmployeeLogin() {
  console.log('👤 Testing Employee Login...\n');

  // Test with the first employee from debug
  const loginData = {
    phone: '+998773109829',
    password: 'empc3xzp0'  // Password from employee record
  };

  try {
    console.log('1️⃣ Attempting employee login...');
    console.log('Phone:', loginData.phone);
    console.log('Password:', loginData.password);

    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    console.log('Login status:', response.status);
    const data = await response.json();
    console.log('Login response:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n🎉 Employee login successful!');
      console.log('Display name:', data.user.username);
      console.log('Role:', data.user.role);
      console.log('Employee info:', data.user.employeeInfo);
      console.log('Assigned branch:', data.user.assignedBranchId);

      // Test profile endpoint with employee token
      console.log('\n2️⃣ Testing profile endpoint...');
      const profileResponse = await fetch(`${API_BASE}/profile`, {
        headers: {
          'Authorization': `Bearer ${data.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Profile status:', profileResponse.status);
      const profileData = await profileResponse.json();
      console.log('Profile response:', JSON.stringify(profileData, null, 2));

    } else {
      console.log('\n❌ Employee login failed:', data.message);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testEmployeeLogin();