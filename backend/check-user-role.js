import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'standard', 'pro'],
    default: 'free'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatarColor: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function checkUserRoles() {
  try {
    // MongoDB ulanish
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/qarzdaftar';
    
    console.log('MongoDB ga ulanish...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB ga muvaffaqiyatli ulandi');

    // Barcha foydalanuvchilarni topish
    const users = await User.find({});
    console.log(`\n📊 Topilgan foydalanuvchilar soni: ${users.length}\n`);

    // Har bir foydalanuvchini ko'rsatish
    users.forEach((user, index) => {
      console.log(`${index + 1}. Foydalanuvchi:`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Username: ${user.username}`);
      console.log(`   Phone: ${user.phone}`);
      console.log(`   SubscriptionTier: ${user.subscriptionTier}`);
      console.log(`   Role: ${user.role || 'UNDEFINED'}`);
      console.log(`   AvatarColor: ${user.avatarColor}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('   ---');
    });

    // Role yo'q foydalanuvchilarni topish
    const usersWithoutRole = await User.find({ role: { $exists: false } });
    console.log(`\n❌ Role yo'q foydalanuvchilar: ${usersWithoutRole.length}`);
    
    if (usersWithoutRole.length > 0) {
      console.log('Role qo\'shilishi kerak bo\'lgan foydalanuvchilar:');
      usersWithoutRole.forEach(user => {
        console.log(`- ${user.username} (${user.phone}) - ${user.subscriptionTier}`);
      });
    }

  } catch (error) {
    console.error('Xato:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB ulanishi yopildi');
  }
}

checkUserRoles();
