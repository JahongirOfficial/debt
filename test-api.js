const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAPI() {
  try {
    // Test registration
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }),
    });

    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData);

    if (registerData.success) {
      // Test login
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        }),
      });

      const loginData = await loginResponse.json();
      console.log('Login response:', loginData);

      if (loginData.success) {
        // Test accessing protected endpoint with token
        const debtsResponse = await fetch('http://localhost:5000/api/debts', {
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            'Content-Type': 'application/json',
          },
        });

        const debtsData = await debtsResponse.json();
        console.log('Debts response:', debtsData);
      }
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testAPI();