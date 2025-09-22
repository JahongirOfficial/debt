// Using built-in fetch API (Node.js 18+)
async function testRegistration() {
  try {
    // Use default port 5000 for testing
    const backendPort = 5000;
    
    const response = await fetch(`http://localhost:${backendPort}/api/auth/register`, {
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

    const data = await response.json();
    console.log('Registration response:', data);
  } catch (error) {
    console.error('Error during registration test:', error);
  }
}

testRegistration();