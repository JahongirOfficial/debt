import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/qarzdaftar';

// Branch Schema
const branchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  icon: {
    type: String,
    default: 'building'
  }
}, {
  timestamps: true
});

// User Schema (for reference)
const userSchema = new mongoose.Schema({
  username: String,
  phone: String,
  password: String,
  subscriptionTier: {
    type: String,
    enum: ['free', 'lite', 'standard', 'pro'],
    default: 'free'
  },
  activeBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    default: null
  }
}, {
  timestamps: true
});

// Debt Schema (for reference)
const debtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: false // Will be required after migration
  },
  creditor: String,
  amount: Number,
  description: String,
  phone: String,
  countryCode: String,
  debtDate: Date,
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  }
}, {
  timestamps: true
});

async function runMigration() {
  try {
    console.log('🚀 Starting branch support migration...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get models
    const User = mongoose.model('User', userSchema);
    const Branch = mongoose.model('Branch', branchSchema);
    const Debt = mongoose.model('Debt', debtSchema);

    // Step 1: Get all users
    const users = await User.find({});
    console.log(`📊 Found ${users.length} users`);

    let createdBranches = 0;
    let updatedDebts = 0;
    let updatedUsers = 0;

    // Step 2: Create default branch for each user and migrate their debts
    for (const user of users) {
      console.log(`👤 Processing user: ${user.username} (${user._id})`);

      // Check if user already has branches
      const existingBranches = await Branch.find({ userId: user._id });
      
      let defaultBranch;
      if (existingBranches.length === 0) {
        // Create default branch for user
        defaultBranch = new Branch({
          userId: user._id,
          name: 'Asosiy filial',
          description: 'Sizning asosiy filialingiz',
          currency: 'UZS',
          color: '#3B82F6',
          icon: 'building',
          isActive: true
        });

        await defaultBranch.save();
        createdBranches++;
        console.log(`  ✅ Created default branch for ${user.username}`);
      } else {
        // Use first existing branch as default
        defaultBranch = existingBranches[0];
        console.log(`  ℹ️  Using existing branch: ${defaultBranch.name}`);
      }

      // Step 3: Update user's activeBranchId
      if (!user.activeBranchId) {
        await User.findByIdAndUpdate(user._id, {
          activeBranchId: defaultBranch._id
        });
        updatedUsers++;
        console.log(`  ✅ Set active branch for ${user.username}`);
      }

      // Step 4: Migrate user's debts to default branch
      const userDebts = await Debt.find({ 
        userId: user._id, 
        branchId: { $exists: false } 
      });

      if (userDebts.length > 0) {
        await Debt.updateMany(
          { 
            userId: user._id, 
            branchId: { $exists: false } 
          },
          { 
            $set: { branchId: defaultBranch._id } 
          }
        );
        updatedDebts += userDebts.length;
        console.log(`  ✅ Migrated ${userDebts.length} debts to default branch`);
      }
    }

    // Step 5: Create indexes
    console.log('📝 Creating database indexes...');
    
    try {
      await Branch.collection.createIndex({ userId: 1 });
      await Branch.collection.createIndex({ userId: 1, name: 1 }, { unique: true });
      console.log('  ✅ Branch indexes created');
    } catch (error) {
      if (error.code !== 86) { // Index already exists
        console.log('  ⚠️  Branch indexes already exist');
      }
    }

    try {
      await Debt.collection.createIndex({ userId: 1, branchId: 1, status: 1 });
      await Debt.collection.createIndex({ branchId: 1, debtDate: 1 });
      console.log('  ✅ Debt indexes updated');
    } catch (error) {
      if (error.code !== 86) { // Index already exists
        console.log('  ⚠️  Debt indexes already exist');
      }
    }

    // Step 6: Make branchId required for future debts
    console.log('📝 Updating debt schema...');
    
    // This would be done in the application code, not in migration
    console.log('  ℹ️  Remember to update Debt schema to make branchId required');

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Created ${createdBranches} default branches`);
    console.log(`   - Updated ${updatedUsers} users with active branch`);
    console.log(`   - Migrated ${updatedDebts} debts to branches`);
    console.log(`   - Processed ${users.length} users total`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration();
}

export default runMigration;