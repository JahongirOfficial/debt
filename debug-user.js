// Debug user and branch relationship
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'qarzdaftar_jwt_secret_key';
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2NGU2MDYzMTNjOTFiZGJjY2RjMTciLCJ1c2VybmFtZSI6IkF6aXpiZWsgUmFoaW1vdiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYwNzkwNDM1LCJleHAiOjE3NjEzOTUyMzV9.RCpInEFjR3-9UjwP3IPPzV-QG-a5uOsWpP0UQiMc7gY';

try {
  const decoded = jwt.verify(TEST_TOKEN, JWT_SECRET);
  console.log('🔍 Decoded JWT token:');
  console.log('User ID:', decoded.userId);
  console.log('Username:', decoded.username);
  console.log('Role:', decoded.role);
  console.log('\n📋 Branch from API response:');
  console.log('Branch userId: 68e64e606313c91bdbccdc17');
  console.log('Token userId:', decoded.userId);
  console.log('Match:', decoded.userId === '68e64e606313c91bdbccdc17');
} catch (error) {
  console.error('JWT decode error:', error);
}