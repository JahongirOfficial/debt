// Test registration with the production API
const testRegistration = async () => {
  try {
    // Use production API URL
    const apiUrl = 'https://debt-tracker.prox.uz/api';
    
    // Registration data
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    // Register user
    console.log('Registering user...');
    const registerResponse = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const registerResult = await registerResponse.json();
    console.log('Registration result:', registerResult);

    if (!registerResult.success) {
      console.error('Registration failed:', registerResult.message);
      return;
    }

    console.log('\nRegistration test completed successfully!');
  } catch (error) {
    console.error('Registration test failed:', error);
  }
};

testRegistration();