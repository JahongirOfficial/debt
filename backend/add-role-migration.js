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

async function addRoleToUsers() {
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
    console.log(`Topilgan foydalanuvchilar soni: ${users.length}`);

    // Har bir foydalanuvchiga role qo'shish
    for (const user of users) {
      if (!user.role || user.role === undefined) {
        // subscriptionTier 'admin' bo'lsa, role ham 'admin' qilamiz
        if (user.subscriptionTier === 'admin') {
          user.role = 'admin';
          console.log(`✅ ${user.username} (${user.phone}) - admin role qo'shildi`);
        } else {
          user.role = 'user';
          console.log(`✅ ${user.username} (${user.phone}) - user role qo'shildi`);
        }
        
        await user.save();
      } else {
        console.log(`ℹ️ ${user.username} (${user.phone}) - role allaqachon mavjud: ${user.role}`);
      }
    }

    console.log('Migration muvaffaqiyatli yakunlandi!');

  } catch (error) {
    console.error('Migration xatosi:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB ulanishi yopildi');
  }
}

addRoleToUsers();
