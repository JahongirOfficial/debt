// Test login with the production API
const testLogin = async () => {
  try {
    // Use production API URL
    const apiUrl = 'https://debt-tracker.prox.uz/api';
    
    // Login data
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    // Login user
    console.log('Logging in...');
    const loginResponse = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const loginResult = await loginResponse.json();
    console.log('Login result:', loginResult);

    if (!loginResult.success) {
      console.error('Login failed:', loginResult.message);
      return;
    }

    const { token } = loginResult;

    // Get debts
    console.log('\nFetching debts...');
    const debtsResponse = await fetch(`${apiUrl}/debts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const debtsResult = await debtsResponse.json();
    console.log('Debts result:', debtsResult);

    // Get ratings
    console.log('\nFetching ratings...');
    const ratingsResponse = await fetch(`${apiUrl}/ratings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const ratingsResult = await ratingsResponse.json();
    console.log('Ratings result:', ratingsResult);

    console.log('\nLogin test completed successfully!');
  } catch (error) {
    console.error('Login test failed:', error);
  }
};

testLogin();