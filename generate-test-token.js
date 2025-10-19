// Generate test JWT token
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'qarzdaftar_jwt_secret_key_2025';

// Test user data (using real user ID from branches)
const testUser = {
  userId: '68e64e606313c91bdbccdc17',
  username: 'Azizbek Rahimov',
  phone: '+998901234567',
  subscriptionTier: 'free',
  role: 'user'
};

// Generate token
const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: '24h' });

console.log('🔑 Generated test JWT token:');
console.log(token);
console.log('\n📋 Token payload:');
console.log(testUser);
console.log('\n🔧 Use this token in your API tests by replacing TEST_TOKEN variable');

export { token, testUser };