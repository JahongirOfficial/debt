const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testLogin() {
  try {
    // First, let's try to log in with our test user
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
      console.log('Login successful!');
      console.log('Token:', loginData.token);
      
      // Now let's try to access a protected endpoint
      const debtsResponse = await fetch('http://localhost:5000/api/debts', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const debtsData = await debtsResponse.json();
      console.log('Debts response:', debtsData);
      
      // Let's also try to access ratings
      const ratingsResponse = await fetch('http://localhost:5000/api/ratings', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const ratingsData = await ratingsResponse.json();
      console.log('Ratings response:', ratingsData);
    } else {
      console.log('Login failed:', loginData.message);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLogin();