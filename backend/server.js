import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import TelegramBotHandler from './services/TelegramBotHandler.js';
import DailyReportService from './services/DailyReportService.js';
import authRoutes from './routes/auth.js';
import debtRoutes from './routes/debts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/qarzdaftar';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB ga ulanish
console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    // Setup database indexes
    setupDatabaseIndexes();
    // Initialize Telegram bot
    await initializeTelegramBot();
    // Start subscription expiration check
    startSubscriptionExpirationCheck();
    // Serverni ishga tushirish
    startServer();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Starting server without MongoDB connection for testing purposes...');
    // MongoDB bo'lmasa ham serverni ishga tushirish
    startServer();
  });

// Function to check and downgrade expired subscriptions
const checkExpiredSubscriptions = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return; // Skip if database is not connected
    }

    const now = new Date();
    const expiredUsers = await User.find({
      subscriptionTier: { $in: ['standard', 'pro'] },
      subscriptionExpiresAt: { $lte: now }
    });

    if (expiredUsers.length > 0) {
      console.log(`Found ${expiredUsers.length} expired subscriptions, downgrading to free...`);

      for (const user of expiredUsers) {
        await User.findByIdAndUpdate(user._id, {
          subscriptionTier: 'free',
          subscriptionExpiresAt: null,
          subscriptionStartedAt: null
        });

        console.log(`Downgraded user ${user.username} (${user._id}) from ${user.subscriptionTier} to free`);
      }
    }
  } catch (error) {
    console.error('Error checking expired subscriptions:', error);
  }
};

// Start subscription expiration check
const startSubscriptionExpirationCheck = () => {
  // Check every hour
  setInterval(checkExpiredSubscriptions, 60 * 60 * 1000);
  // Also check immediately on startup
  setTimeout(checkExpiredSubscriptions, 5000);
};

// Scheduled task to clean up old debt history records (older than 1 month)
setInterval(async () => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const result = await DebtHistory.deleteMany({
      createdAt: { $lt: oneMonthAgo }
    });

    console.log(`Cleaned up ${result.deletedCount} old debt history records`);
  } catch (error) {
    console.error('Error cleaning up old debt history records:', error);
  }
}, 24 * 60 * 60 * 1000); // Run once every 24 hours

// Serverni ishga tushirish funksiyasi
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Port band bo'lsa boshqa portdan foydalanish
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const newPort = parseInt(PORT) + 1;
      console.log(`Port ${PORT} is already in use, trying ${newPort}`);
      // Instead of recursively calling startServer, we create a new server with the new port
      app.listen(newPort, () => {
        console.log(`Server running on port ${newPort}`);
      }).on('error', (err) => {
        console.error('Server error:', err);
      });
    } else {
      console.error('Server error:', err);
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    if (telegramBotHandler) {
      console.log('Stopping Telegram bot...');
      telegramBotHandler.stopBot();
    }
    if (dailyReportService) {
      console.log('Stopping daily report service...');
      // Daily report service doesn't need explicit stopping as cron jobs will be cleaned up
    }
    server.close(() => {
      console.log('Server closed');
      mongoose.connection.close().then(() => {
        console.log('Database connection closed');
        process.exit(0);
      });
    });
  });

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    if (telegramBotHandler) {
      console.log('Stopping Telegram bot...');
      telegramBotHandler.stopBot();
    }
    if (dailyReportService) {
      console.log('Stopping daily report service...');
      // Daily report service doesn't need explicit stopping as cron jobs will be cleaned up
    }
    server.close(() => {
      console.log('Server closed');
      mongoose.connection.close().then(() => {
        console.log('Database connection closed');
        process.exit(0);
      });
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    if (telegramBotHandler) {
      telegramBotHandler.stopBot();
    }
    if (dailyReportService) {
      // Daily report service cleanup
    }
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    if (telegramBotHandler) {
      telegramBotHandler.stopBot();
    }
    if (dailyReportService) {
      // Daily report service cleanup
    }
    process.exit(1);
  });
}

// User Schema (MongoDB ulangan bo'lsa)
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
    enum: ['free', 'lite', 'standard', 'pro'],
    default: 'free'
  },
  subscriptionExpiresAt: {
    type: Date,
    default: null // null means no expiration (for free tier)
  },
  subscriptionStartedAt: {
    type: Date,
    default: null // when the current subscription started
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active'
  },
  avatarColor: {
    type: String,
    default: null
  },
  activeBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    default: null
  },
  // Telegram integration fields
  telegramId: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  telegramUsername: {
    type: String,
    trim: true
  },
  telegramConnectedAt: {
    type: Date
  },
  telegramNotificationsEnabled: {
    type: Boolean,
    default: true
  },
  lastTelegramModalShown: {
    type: Date
  },
  // Branch management fields
  activeBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    default: null
  }
}, {
  timestamps: true
});

// Parolni hash qilish
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// User model (MongoDB ulangan bo'lsa)
let User;
try {
  User = mongoose.model('User', userSchema);
} catch (error) {
  // Model allaqachon mavjud bo'lsa
  User = mongoose.model('User');
}

// Tasodifiy avatar rangi generatsiya qilish
const generateRandomAvatarColor = () => {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-indigo-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-orange-500 to-red-500',
    'bg-gradient-to-br from-purple-500 to-pink-500',
    'bg-gradient-to-br from-yellow-500 to-orange-500',
    'bg-gradient-to-br from-teal-500 to-cyan-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Debt Schema (MongoDB ulangan bo'lsa)
const debtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
    index: true
  },
  creditor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  countryCode: {
    type: String,
    default: '+998'
  },
  debtDate: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
    index: true
  },
  paidAt: {
    type: Date
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  },
  // Branch management field
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Indekslar
debtSchema.index({ userId: 1, status: 1 });
debtSchema.index({ userId: 1, debtDate: 1 });
debtSchema.index({ userId: 1, createdAt: -1 });
// Branch-specific indexes
debtSchema.index({ userId: 1, branchId: 1, status: 1 });
debtSchema.index({ branchId: 1, debtDate: 1 });

// Debt model (MongoDB ulangan bo'lsa)
let Debt;
try {
  Debt = mongoose.model('Debt', debtSchema);
} catch (error) {
  Debt = mongoose.model('Debt');
}

// Branch Schema (MongoDB ulangan bo'lsa)
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
    default: '#3B82F6' // Default blue color
  },
  icon: {
    type: String,
    default: 'building' // Default icon
  }
}, {
  timestamps: true
});

// Branch indekslar
branchSchema.index({ userId: 1, isActive: 1 });
branchSchema.index({ userId: 1, name: 1 }, { unique: true });

// Branch model (MongoDB ulangan bo'lsa)
let Branch;
try {
  Branch = mongoose.model('Branch', branchSchema);
} catch (error) {
  Branch = mongoose.model('Branch');
}

// BranchSettings Schema (MongoDB ulangan bo'lsa)
const branchSettingsSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  },
  telegramNotifications: {
    enabled: { type: Boolean, default: true },
    dailyReports: { type: Boolean, default: true },
    debtReminders: { type: Boolean, default: true }
  },
  reminderSettings: {
    enabled: { type: Boolean, default: true },
    daysBefore: { type: Number, default: 1 },
    frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' }
  },
  customTemplates: [{
    name: String,
    template: String,
    isDefault: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

// BranchSettings indekslar
branchSettingsSchema.index({ branchId: 1 });
branchSettingsSchema.index({ userId: 1 });

// BranchSettings model (MongoDB ulangan bo'lsa)
let BranchSettings;
try {
  BranchSettings = mongoose.model('BranchSettings', branchSettingsSchema);
} catch (error) {
  BranchSettings = mongoose.model('BranchSettings');
}

// Debt History Schema (MongoDB ulangan bo'lsa)
const debtHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  debtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debt',
    required: true,
    index: true
  },
  action: {
    type: String,
    enum: ['created', 'updated', 'paid', 'deleted', 'adjustment'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  previousAmount: {
    type: Number
  },
  newAmount: {
    type: Number
  },
  creditor: {
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
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  reason: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

// DebtHistory model (MongoDB ulangan bo'lsa)
let DebtHistory;
try {
  DebtHistory = mongoose.model('DebtHistory', debtHistorySchema);
} catch (error) {
  DebtHistory = mongoose.model('DebtHistory');
}

// User Settings Schema (MongoDB ulangan bo'lsa)
const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  language: {
    type: String,
    enum: ['uz', 'ru', 'en', 'tjk'],
    default: 'uz'
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  }
}, {
  timestamps: true
});

// UserSettings model (MongoDB ulangan bo'lsa)
let UserSettings;
try {
  UserSettings = mongoose.model('UserSettings', userSettingsSchema);
} catch (error) {
  UserSettings = mongoose.model('UserSettings');
}

// Debt Adjustment Schema (MongoDB ulangan bo'lsa)
// For tracking amount reductions that should count as payments
const debtAdjustmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  debtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debt',
    required: true,
    index: true
  },
  originalAmount: {
    type: Number,
    required: true
  },
  newAmount: {
    type: Number,
    required: true
  },
  adjustmentAmount: {
    type: Number,
    required: true
  },
  creditor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

// DebtAdjustment model (MongoDB ulangan bo'lsa)
let DebtAdjustment;
try {
  DebtAdjustment = mongoose.model('DebtAdjustment', debtAdjustmentSchema);
} catch (error) {
  DebtAdjustment = mongoose.model('DebtAdjustment');
}

// Telegram Session Schema (MongoDB ulangan bo'lsa)
const telegramSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  telegramId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  sessionToken: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  connectedAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    index: true
  }
}, {
  timestamps: true
});

// TelegramSession model (MongoDB ulangan bo'lsa)
let TelegramSession;
try {
  TelegramSession = mongoose.model('TelegramSession', telegramSessionSchema);
} catch (error) {
  TelegramSession = mongoose.model('TelegramSession');
}

// Creditor Rating Schema (MongoDB ulangan bo'lsa)
const creditorRatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  creditor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    index: true
  },
  ratingScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  ratingStatus: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'unknown'],
    default: 'unknown'
  },
  totalDebts: {
    type: Number,
    default: 0
  },
  paidDebts: {
    type: Number,
    default: 0
  },
  pendingDebts: {
    type: Number,
    default: 0
  },
  averageDelay: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// CreditorRating model (MongoDB ulangan bo'lsa)
let CreditorRating;
try {
  CreditorRating = mongoose.model('CreditorRating', creditorRatingSchema);
} catch (error) {
  CreditorRating = mongoose.model('CreditorRating');
}

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'qarzdaftar_jwt_secret_key';

// Branch limits by subscription tier
const BRANCH_LIMITS = {
  free: 1,
  lite: 2,
  standard: 3,
  pro: 5
};

// Initialize Telegram Bot
const initializeTelegramBot = async () => {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log('⚠️  Telegram bot token not found in environment variables');
    console.log('   Add TELEGRAM_BOT_TOKEN to your .env file to enable Telegram bot');
    return;
  }

  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️  Database not connected, Telegram bot will be initialized after DB connection');
    return;
  }

  try {
    // Stop existing bot if running
    if (telegramBotHandler) {
      console.log('Stopping existing Telegram bot...');
      await telegramBotHandler.stopBot();
      telegramBotHandler = null;
      // Wait a bit before creating new instance
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    const models = {
      User,
      TelegramSession,
      Debt,
      DebtHistory
    };

    const useWebhook = process.env.TELEGRAM_USE_WEBHOOK === 'true';
    telegramBotHandler = new TelegramBotHandler(TELEGRAM_BOT_TOKEN, models, useWebhook);
    console.log('✅ Telegram bot handler initialized successfully');
    console.log(`🤖 Bot username: @${process.env.TELEGRAM_BOT_USERNAME || 'qarzdaftarchabot'}`);
    console.log(`📡 Mode: ${useWebhook ? 'Webhook' : 'Polling'}`);

    // Initialize Daily Report Service
    dailyReportService = new DailyReportService(models, telegramBotHandler);
    console.log('✅ Daily report service initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Telegram bot:', error);
    console.log('   Check your TELEGRAM_BOT_TOKEN and try again');
  }
};

// Database indexes setup
const setupDatabaseIndexes = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // User collection indexes
      try {
        await User.collection.createIndex({ telegramId: 1 }, { sparse: true });
        console.log('TelegramId index created');
      } catch (error) {
        if (error.code !== 86) throw error;
        console.log('TelegramId index already exists');
      }

      // TelegramSession collection indexes
      try {
        await TelegramSession.collection.createIndex({ userId: 1 });
        await TelegramSession.collection.createIndex({ telegramId: 1 }, { unique: true });
        await TelegramSession.collection.createIndex({ sessionToken: 1 }, { unique: true });
        await TelegramSession.collection.createIndex({ isActive: 1 });
        await TelegramSession.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
        console.log('TelegramSession indexes created');
      } catch (error) {
        if (error.code !== 86) throw error;
        console.log('TelegramSession indexes already exist');
      }

      // Debt collection indexes (if not already exist)
      try {
        await Debt.collection.createIndex({ userId: 1, status: 1 });
        await Debt.collection.createIndex({ userId: 1, debtDate: 1 });
        await Debt.collection.createIndex({ userId: 1, branchId: 1, status: 1 });
        await Debt.collection.createIndex({ branchId: 1, debtDate: 1 });
        console.log('Debt indexes created');
      } catch (error) {
        if (error.code !== 86) throw error;
        console.log('Debt indexes already exist');
      }

      // Branch collection indexes
      try {
        await Branch.collection.createIndex({ userId: 1, isActive: 1 });
        await Branch.collection.createIndex({ userId: 1, name: 1 }, { unique: true });
        console.log('Branch indexes created');
      } catch (error) {
        if (error.code !== 86) throw error;
        console.log('Branch indexes already exist');
      }

      // BranchSettings collection indexes
      try {
        await BranchSettings.collection.createIndex({ branchId: 1 });
        await BranchSettings.collection.createIndex({ userId: 1 });
        console.log('BranchSettings indexes created');
      } catch (error) {
        if (error.code !== 86) throw error;
        console.log('BranchSettings indexes already exist');
      }

      console.log('Database indexes setup completed successfully');
    }
  } catch (error) {
    console.error('Error creating database indexes:', error);
  }
};

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Telegram Bot Handler instance
let telegramBotHandler = null;
let dailyReportService = null;

// Telegram bot notification function
const sendTelegramNotification = async (message) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram bot credentials not configured, skipping notification');
    return;
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (response.ok) {
      console.log('Telegram notification sent successfully');
    } else {
      console.error('Failed to send Telegram notification:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
};

// Format date for Uzbek locale
const formatUzbekDate = (date) => {
  const months = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-yil ${day}-${month} ${hours}:${minutes}`;
};

// Branch limit validation middleware
const validateBranchLimit = async (req, res, next) => {
  // MongoDB ulanmagan bo'lsa o'tkazib yuborish
  if (!mongoose.connection.readyState) {
    return next();
  }

  try {
    // Get user to check subscription tier
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current branch count
    const currentBranchCount = await Branch.countDocuments({
      userId: req.user.userId,
      isActive: true
    });

    const branchLimit = BRANCH_LIMITS[user.subscriptionTier] || 1;

    if (currentBranchCount >= branchLimit) {
      return res.status(403).json({
        success: false,
        message: 'Branch limit exceeded for your subscription tier',
        currentCount: currentBranchCount,
        limit: branchLimit,
        tier: user.subscriptionTier,
        upgradeRequired: true
      });
    }

    // Add user and limits to request for use in endpoint
    req.branchUser = user;
    req.branchLimit = branchLimit;
    req.currentBranchCount = currentBranchCount;

    next();
  } catch (error) {
    console.error('Branch limit validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error validating branch limits'
    });
  }
};

// Foydalanuvchi autentifikatsiya qilinganligini tekshirish
const authenticateToken = (req, res, next) => {
  // MongoDB ulanmagan bo'lsa autentifikatsiyani o'tkazib yuborish
  if (!mongoose.connection.readyState) {
    req.user = { userId: 'test-user-id' }; // Test foydalanuvchi
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Ro'yxatdan o'tish
app.post('/api/auth/register', async (req, res) => {
  console.log('Registration request received:', req.body);

  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    console.log('MongoDB not connected, returning test response');
    const testToken = jwt.sign(
      { userId: 'test-user-id', username: req.body.username || 'testuser', role: 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.status(201).json({
      success: true,
      message: 'User registered successfully (test mode)',
      token: testToken,
      user: {
        id: 'test-user-id',
        username: req.body.username || 'testuser',
        phone: req.body.phone || '+998901234567',
        subscriptionTier: 'free',
        role: 'user',
        avatarColor: generateRandomAvatarColor()
      }
    });
  }

  try {
    const { username, phone, password } = req.body;
    console.log('Registration data:', { username, phone, password });

    // Validatsiya
    if (!username || !phone || !password) {
      console.log('Validation failed: missing fields', { username, phone, password });
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Format phone number - ensure it starts with + and contains only digits after +
    let formattedPhone = phone.trim();
    console.log('Original phone:', formattedPhone);

    if (!formattedPhone.startsWith('+')) {
      console.log('Validation failed: phone does not start with +');
      return res.status(400).json({
        success: false,
        message: 'Phone number must start with country code (e.g., +998)'
      });
    }

    // Simple phone number formatting - just remove any spaces and ensure it starts with +
    formattedPhone = formattedPhone.replace(/\s+/g, '');
    console.log('Formatted phone:', formattedPhone);

    // Foydalanuvchi mavjudligini tekshirish
    console.log('Checking for existing user with:', { phone: formattedPhone, username });
    const existingUser = await User.findOne({
      $or: [{ phone: formattedPhone }, { username }]
    });
    console.log('Existing user check result:', existingUser);

    if (existingUser) {
      console.log('Validation failed: user already exists');
      return res.status(400).json({
        success: false,
        message: 'User with this phone number or username already exists'
      });
    }

    // Tasodifiy avatar rangi
    const avatarColor = generateRandomAvatarColor();
    console.log('Generated avatar color:', avatarColor);

    // Yangi foydalanuvchi yaratish
    console.log('Creating new user with:', { username, phone: formattedPhone, password });
    const user = new User({
      username,
      phone: formattedPhone,
      password,
      subscriptionTier: 'free',
      avatarColor
    });

    // Log the user object before saving
    console.log('User object to be saved:', user);

    await user.save();
    console.log('User created successfully:', user);

    // Send Telegram notification about new user registration
    const registrationDate = formatUzbekDate(new Date());
    const telegramMessage = `🎉 <b>Yangi foydalanuvchi ro'yxatdan o'tdi!</b>\n\n` +
      `👤 <b>Foydalanuvchi:</b> ${username}\n` +
      `📱 <b>Telefon:</b> ${formattedPhone}\n` +
      `📅 <b>Sana:</b> ${registrationDate}\n` +
      `💎 <b>Obuna:</b> Bepul (Free)\n\n` +
      `#yangi_foydalanuvchi #registratsiya`;

    // Send notification asynchronously (don't wait for it to complete)
    sendTelegramNotification(telegramMessage).catch(error => {
      console.error('Failed to send Telegram notification:', error);
    });

    // JWT token generatsiya qilish
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('JWT token generated');

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        subscriptionTier: user.subscriptionTier,
        role: user.role,
        avatarColor: user.avatarColor
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    // Send a more detailed error message for debugging
    res.status(500).json({
      success: false,
      message: 'Server error during registration: ' + error.message
    });
  }
});

// Kirish
app.post('/api/auth/login', async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    const { phone, password } = req.body;

    // Validatsiya
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and password are required'
      });
    }

    // Format phone number - ensure it starts with + and contains only digits after +
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must start with country code (e.g., +998)'
      });
    }

    // Simple phone number formatting - just remove any spaces and ensure it starts with +
    formattedPhone = formattedPhone.replace(/\s+/g, '');

    // Test mode authentication
    // Only allow the predefined test account
    if (formattedPhone === '+998901234567' && password === 'password123') {
      const testToken = jwt.sign(
        { userId: 'test-user-id', username: 'testuser', role: 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        message: 'Login successful (test mode)',
        token: testToken,
        user: {
          id: 'test-user-id',
          username: 'testuser',
          phone: '+998901234567',
          subscriptionTier: 'free',
          role: 'user',
          status: 'active',
          avatarColor: generateRandomAvatarColor()
        }
      });
    } else if (formattedPhone === '+998901234568' && password === 'admin123') {
      const adminTestToken = jwt.sign(
        { userId: 'admin-user-id', username: 'admin', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        message: 'Admin login successful (test mode)',
        token: adminTestToken,
        user: {
          id: 'admin-user-id',
          username: 'admin',
          phone: '+998901234568',
          subscriptionTier: 'pro',
          role: 'admin',
          status: 'active',
          avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
        }
      });
    } else {
      // Invalid credentials in test mode
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  }

  try {
    const { phone, password } = req.body;

    // Validatsiya
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and password are required'
      });
    }

    // Format phone number - ensure it starts with + and contains only digits after +
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must start with country code (e.g., +998)'
      });
    }

    // Simple phone number formatting - just remove any spaces and ensure it starts with +
    formattedPhone = formattedPhone.replace(/\s+/g, '');

    // Foydalanuvchini telefon raqami bo'yicha topish
    const user = await User.findOne({ phone: formattedPhone });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // JWT token generatsiya qilish
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        subscriptionTier: user.subscriptionTier,
        role: user.role,
        status: user.status,
        avatarColor: user.avatarColor
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Profil
app.get('/api/profile', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      user: {
        id: 'test-user-id',
        username: 'testuser',
        phone: '+998901234567',
        subscriptionTier: 'free',
        role: 'user',
        avatarColor: generateRandomAvatarColor(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        subscriptionTier: user.subscriptionTier,
        role: user.role,
        avatarColor: user.avatarColor,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile'
    });
  }
});

// Salomatlik tekshiruvi
app.get('/api/health', (req, res) => {
  const botStatus = telegramBotHandler ? telegramBotHandler.getBotStatus() : null;

  res.json({
    success: true,
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState ? 'connected' : 'disconnected',
    telegramBot: botStatus
  });
});

// Telegram connection status tekshirish
app.get('/api/telegram/status', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      connected: false,
      telegramId: null,
      connectedAt: null
    });
  }

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.json({
        success: true,
        connected: false,
        telegramId: null,
        telegramUsername: null,
        connectedAt: null
      });
    }

    res.json({
      success: true,
      connected: !!user.telegramId,
      telegramId: user.telegramId,
      telegramUsername: user.telegramUsername,
      connectedAt: user.telegramConnectedAt
    });
  } catch (error) {
    console.error('Telegram status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking Telegram status'
    });
  }
});

// Telegram connection token yaratish
app.post('/api/telegram/generate-token', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      token: `testuser_${Date.now()}`,
      botUsername: 'qarzdaftarchabot',
      telegramUrl: `https://t.me/qarzdaftarchabot?start=testuser_${Date.now()}`
    });
  }

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Connection token yaratish (username yoki user ID)
    let connectionToken = user.username || user._id.toString();

    // URL-safe token yaratish
    const createUrlSafeToken = (str) => {
      return str
        // Avval apostrof belgilarini o'rta chiziq bilan almashtirish
        .replace(/'/g, "-")  // Curved apostrophe to dash
        .replace(/'/g, "-")  // Left single quotation mark to dash
        .replace(/'/g, "-")  // Right single quotation mark to dash
        .replace(/`/g, "-")  // Backtick to dash
        .replace(/´/g, "-")  // Acute accent to dash
        .replace(/ʻ/g, "-")  // Modifier letter turned comma to dash
        .replace(/ʼ/g, "-")  // Modifier letter apostrophe to dash
        // Keyin bo'sh joylarni pastgi chiziq bilan almashtirish
        .replace(/\s+/g, '_');
    };

    connectionToken = createUrlSafeToken(connectionToken);

    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'qarzdaftarchabot';
    const telegramUrl = `https://t.me/${botUsername}?start=${connectionToken}`;

    console.log(`Generated connection token for user ${user.username}: ${connectionToken}`);

    res.json({
      success: true,
      token: connectionToken,
      botUsername: botUsername,
      telegramUrl: telegramUrl
    });
  } catch (error) {
    console.error('Generate token error:', error);

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error generating token'
    });
  }
});

// Telegram connection ni uzish
app.post('/api/telegram/disconnect', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Telegram disconnected successfully (test mode)'
    });
  }

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Telegram ma'lumotlarini o'chirish
    user.telegramId = null;
    user.telegramUsername = null;
    user.telegramConnectedAt = null;
    await user.save();

    // Sessionlarni o'chirish
    await TelegramSession.deleteMany({ userId: user._id });

    res.json({
      success: true,
      message: 'Telegram disconnected successfully'
    });
  } catch (error) {
    console.error('Telegram disconnect error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error disconnecting Telegram'
    });
  }
});

// Manual daily report generation (admin only)
app.post('/api/telegram/generate-report', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    if (!dailyReportService) {
      return res.status(503).json({
        success: false,
        message: 'Daily report service not available'
      });
    }

    // Generate manual report
    await dailyReportService.generateManualReport();

    res.json({
      success: true,
      message: 'Daily report generated and sent successfully'
    });
  } catch (error) {
    console.error('Manual report generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating daily report'
    });
  }
});

// Qarzlarni olish
app.get('/api/debts', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      debts: [
        {
          _id: 'test-debt-1',
          userId: 'test-user-id',
          creditor: 'Test Creditor 1',
          amount: 1000000,
          description: 'Test debt description',
          phone: '+998901234567',
          countryCode: '+998',
          debtDate: new Date(),
          status: 'pending',
          currency: 'UZS',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      userTier: 'free',
      debtLimit: 20
    });
  }

  try {
    const { status, startDate, endDate, search } = req.query;

    // Get user's subscription tier and debt limit
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const getUserDebtLimit = (tier) => {
      switch (tier?.toLowerCase()) {
        case 'pro':
          return Infinity; // Unlimited for Pro tier
        case 'standard':
          return 150;
        case 'free':
        default:
          return 20;
      }
    };

    const userDebtLimit = getUserDebtLimit(user.subscriptionTier);
    const userTier = user.subscriptionTier || 'free';

    // So'rov yaratish
    const query = { userId: req.user.userId };

    // Status bo'yicha filtrlash
    if (status && ['pending', 'paid'].includes(status)) {
      query.status = status;
    }

    // Sana oralig'i bo'yicha filtrlash
    if (startDate || endDate) {
      query.debtDate = {};
      if (startDate) {
        query.debtDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.debtDate.$lte = new Date(endDate);
      }
    }

    // Qidiruv bo'yicha filtrlash
    if (search) {
      query.$or = [
        { creditor: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // So'rovni bajarish
    const debts = await Debt.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      debts,
      userTier,
      debtLimit: userDebtLimit
    });
  } catch (error) {
    console.error('Get debts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching debts'
    });
  }
});

// Yangi qarz yaratish
app.post('/api/debts', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.status(201).json({
      success: true,
      message: 'Debt created successfully (test mode)',
      debt: {
        _id: 'test-debt-' + Date.now(),
        userId: 'test-user-id',
        ...req.body,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  try {
    const { creditor, amount, description, phone, countryCode, debtDate, currency, reason } = req.body;

    // Validatsiya
    if (!creditor || !amount || !debtDate) {
      return res.status(400).json({
        success: false,
        message: 'Creditor, amount, and debtDate are required'
      });
    }

    // Get user's subscription tier and debt limit
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const getUserDebtLimit = (tier) => {
      switch (tier?.toLowerCase()) {
        case 'pro':
          return Infinity; // Unlimited for Pro tier
        case 'standard':
          return 150;
        case 'free':
        default:
          return 20;
      }
    };

    // No debt creation limit - users can create unlimited debts
    // Limitation is only on management (editing/deleting) of pending debts

    // Yangi qarz yaratish
    const debt = new Debt({
      userId: req.user.userId,
      creditor,
      amount,
      description,
      phone,
      countryCode: countryCode || '+998',
      debtDate: new Date(debtDate),
      currency: currency || 'UZS',
      status: 'pending'
    });

    await debt.save();

    // Create debt history record
    const debtHistory = new DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'created',
      amount: debt.amount,
      previousAmount: 0,
      newAmount: debt.amount,
      creditor: debt.creditor,
      description: debt.description,
      status: debt.status,
      reason: reason || '' // Add reason to debt history
    });

    await debtHistory.save();

    res.status(201).json({
      success: true,
      message: 'Debt created successfully',
      debt
    });
  } catch (error) {
    console.error('Debt creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during debt creation'
    });
  }
});

// Sozlamalarni olish
app.get('/api/settings', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      settings: {
        userId: 'test-user-id',
        language: 'uz',
        currency: 'UZS',
        theme: 'light',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  try {
    let settings = await UserSettings.findOne({ userId: req.user.userId });

    // Agar sozlamalar mavjud bo'lmasa, standart sozlamalarni yaratish
    if (!settings) {
      settings = new UserSettings({
        userId: req.user.userId,
        language: 'uz',
        currency: 'UZS',
        theme: 'light'
      });
      await settings.save();
    }

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching settings'
    });
  }
});

// Sozlamalarni yangilash
app.put('/api/settings', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Settings updated successfully (test mode)',
      settings: {
        userId: 'test-user-id',
        ...req.body,
        updatedAt: new Date()
      }
    });
  }

  try {
    const { language, currency, theme } = req.body;

    // Yangilash obyektini yaratish
    const update = {};
    if (language !== undefined) update.language = language;
    if (currency !== undefined) update.currency = currency;
    if (theme !== undefined) update.theme = theme;

    // Sozlamalarni yangilash yoki yaratish
    let settings = await UserSettings.findOneAndUpdate(
      { userId: req.user.userId },
      update,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating settings'
    });
  }
});

// Qarzni yangilash
app.put('/api/debts/:id', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Debt updated successfully (test mode)',
      debt: {
        _id: req.params.id,
        userId: 'test-user-id',
        ...req.body,
        updatedAt: new Date()
      }
    });
  }

  try {
    const { amount, phone, countryCode, description, reason } = req.body;

    // Avvalgi qarzni olish va branch ownership tekshirish
    const existingDebt = await Debt.findOne({
      _id: req.params.id,
      userId: req.user.userId
    }).populate('branchId');

    if (!existingDebt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    // Verify branch ownership if debt has branchId
    if (existingDebt.branchId) {
      const branch = await Branch.findOne({
        _id: existingDebt.branchId,
        userId: req.user.userId,
        isActive: true
      });

      if (!branch) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Branch not found or inactive'
        });
      }
    }

    // Yangilash obyektini yaratish
    const update = {};
    if (phone !== undefined) update.phone = phone;
    if (countryCode !== undefined) update.countryCode = countryCode;
    if (description !== undefined) update.description = description;

    // Create debt history record before updating
    const debtHistory = new DebtHistory({
      userId: req.user.userId,
      debtId: req.params.id,
      action: 'updated',
      amount: existingDebt.amount,
      previousAmount: existingDebt.amount,
      creditor: existingDebt.creditor,
      description: existingDebt.description,
      status: existingDebt.status,
      reason: reason || '' // Add reason to debt history
    });

    // Agar miqdor o'zgartirilgan bo'lsa
    if (amount !== undefined) {
      update.amount = amount;
      debtHistory.newAmount = amount;

      // Agar yangi miqdor avvalgisidan kam bo'lsa, farqni to'langan sifatida hisoblash
      if (amount < existingDebt.amount) {
        const adjustmentAmount = existingDebt.amount - amount;

        // DebtAdjustment yozuvini yaratish
        const debtAdjustment = new DebtAdjustment({
          userId: req.user.userId,
          debtId: req.params.id,
          originalAmount: existingDebt.amount,
          newAmount: amount,
          adjustmentAmount: adjustmentAmount,
          creditor: existingDebt.creditor
        });

        await debtAdjustment.save();

        // Update debt history action
        debtHistory.action = 'adjustment';
      }
    }

    // Save debt history
    await debtHistory.save();

    // Qarzni yangilash
    const debt = await Debt.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...update, updatedAt: new Date() },
      { new: true }
    );

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    res.json({
      success: true,
      message: 'Debt updated successfully',
      debt
    });
  } catch (error) {
    console.error('Update debt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating debt'
    });
  }
});

// Qarzni o'chirish
app.delete('/api/debts/:id', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Debt deleted successfully (test mode)'
    });
  }

  try {
    const { reason } = req.body; // Get reason from request body

    // Avvalgi qarzni olish va branch ownership tekshirish
    const existingDebt = await Debt.findOne({
      _id: req.params.id,
      userId: req.user.userId
    }).populate('branchId');

    if (!existingDebt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    // Verify branch ownership if debt has branchId
    if (existingDebt.branchId) {
      const branch = await Branch.findOne({
        _id: existingDebt.branchId,
        userId: req.user.userId,
        isActive: true
      });

      if (!branch) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Branch not found or inactive'
        });
      }
    }

    // Create debt history record before deleting
    const debtHistory = new DebtHistory({
      userId: req.user.userId,
      debtId: req.params.id,
      action: 'deleted',
      amount: existingDebt.amount,
      previousAmount: existingDebt.amount,
      newAmount: 0, // When deleting, the new amount is effectively 0
      creditor: existingDebt.creditor,
      description: existingDebt.description,
      status: existingDebt.status,
      reason: reason || '' // Add reason to debt history
    });

    await debtHistory.save();

    // Qarzni o'chirish
    const debt = await Debt.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    res.json({
      success: true,
      message: 'Debt deleted successfully'
    });
  } catch (error) {
    console.error('Delete debt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting debt'
    });
  }
});

// Qarzni to'langan deb belgilash
app.patch('/api/debts/:id/pay', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Debt marked as paid successfully (test mode)',
      debt: {
        _id: req.params.id,
        userId: 'test-user-id',
        status: 'paid',
        paidAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  try {
    const { reason } = req.body; // Get reason from request body

    // Avvalgi qarzni olish
    const existingDebt = await Debt.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!existingDebt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    // Create debt history record before updating
    const debtHistory = new DebtHistory({
      userId: req.user.userId,
      debtId: req.params.id,
      action: 'paid',
      amount: existingDebt.amount,
      previousAmount: existingDebt.amount,
      newAmount: 0, // When marking as paid, the new amount is effectively 0
      creditor: existingDebt.creditor,
      description: existingDebt.description,
      status: existingDebt.status,
      reason: reason || '' // Add reason to debt history
    });

    await debtHistory.save();

    // Qarzni to'langan deb belgilash
    const debt = await Debt.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: 'paid', paidAt: new Date(), updatedAt: new Date() },
      { new: true }
    );

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    res.json({
      success: true,
      message: 'Debt marked as paid successfully',
      debt
    });
  } catch (error) {
    console.error('Mark as paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error marking debt as paid'
    });
  }
});

// Qarz tarixini olish
app.get('/api/debts/:id/history', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      history: []
    });
  }

  try {
    // Qarz tarixini olish
    const history = await DebtHistory.find({
      debtId: req.params.id,
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Get debt history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching debt history'
    });
  }
});

// Creditor ratings olish
app.get('/api/ratings', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      ratings: [
        {
          _id: 'test-rating-1',
          userId: 'test-user-id',
          creditor: 'Test Creditor 1',
          ratingScore: 95,
          ratingStatus: 'excellent',
          totalDebts: 5,
          paidDebts: 5,
          pendingDebts: 0,
          averageDelay: 0,
          lastUpdated: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: 'test-rating-2',
          userId: 'test-user-id',
          creditor: 'Test Creditor 2',
          ratingScore: 75,
          ratingStatus: 'good',
          totalDebts: 4,
          paidDebts: 3,
          pendingDebts: 1,
          averageDelay: 2.5,
          lastUpdated: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    });
  }

  try {
    const ratings = await CreditorRating.find({
      userId: req.user.userId
    }).sort({ ratingScore: -1 });

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching ratings'
    });
  }
});

// Creditor ratings hisoblash
app.post('/api/ratings/calculate', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Ratings calculated successfully (test mode)'
    });
  }

  try {
    // Foydalanuvchining barcha qarzlarini olish
    const userDebts = await Debt.find({ userId: req.user.userId });

    // Kreditorlar bo'yicha statistikani to'plash
    const creditorStats = {};

    userDebts.forEach(debt => {
      if (!creditorStats[debt.creditor]) {
        creditorStats[debt.creditor] = {
          totalDebts: 0,
          paidDebts: 0,
          pendingDebts: 0,
          totalAmount: 0,
          paidAmount: 0,
          delays: []
        };
      }

      creditorStats[debt.creditor].totalDebts += 1;
      creditorStats[debt.creditor].totalAmount += debt.amount;

      if (debt.status === 'paid') {
        creditorStats[debt.creditor].paidDebts += 1;
        creditorStats[debt.creditor].paidAmount += debt.amount;

        // To'lov kechikishini hisoblash
        if (debt.paidAt && debt.debtDate) {
          const debtDate = new Date(debt.debtDate);
          const paidDate = new Date(debt.paidAt);
          const delay = Math.max(0, (paidDate - debtDate) / (1000 * 60 * 60 * 24));
          creditorStats[debt.creditor].delays.push(delay);
        }
      } else {
        creditorStats[debt.creditor].pendingDebts += 1;
      }
    });

    // Reytinglarni hisoblash va yangilash
    for (const creditor in creditorStats) {
      const stats = creditorStats[creditor];

      // To'lov foizi
      const paymentRate = stats.totalDebts > 0 ? (stats.paidDebts / stats.totalDebts) * 100 : 0;

      // O'rtacha kechikish
      const averageDelay = stats.delays.length > 0
        ? stats.delays.reduce((sum, delay) => sum + delay, 0) / stats.delays.length
        : 0;

      // Reyting ballini hisoblash
      let ratingScore = 0;
      let ratingStatus = 'unknown';

      if (paymentRate >= 90 && averageDelay <= 1) {
        ratingScore = Math.min(100, 90 + (10 - Math.min(10, averageDelay)));
        ratingStatus = 'excellent';
      } else if (paymentRate >= 70 && averageDelay <= 7) {
        ratingScore = Math.min(100, 70 + (20 - Math.min(20, averageDelay * 2)));
        ratingStatus = 'good';
      } else if (paymentRate >= 50) {
        ratingScore = Math.min(100, 50 + (20 - Math.min(20, averageDelay * 2)));
        ratingStatus = 'fair';
      } else if (stats.totalDebts > 0) {
        ratingScore = Math.max(0, paymentRate - (averageDelay / 2));
        ratingStatus = 'poor';
      }

      // Kreditor reytingini yangilash yoki yaratish
      await CreditorRating.findOneAndUpdate(
        { userId: req.user.userId, creditor: creditor },
        {
          ratingScore: Math.round(ratingScore),
          ratingStatus,
          totalDebts: stats.totalDebts,
          paidDebts: stats.paidDebts,
          pendingDebts: stats.pendingDebts,
          averageDelay: Math.round(averageDelay * 10) / 10,
          lastUpdated: new Date()
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      message: 'Ratings calculated successfully'
    });
  } catch (error) {
    console.error('Calculate ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error calculating ratings'
    });
  }
});

// Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  // MongoDB ulanmagan bo'lsa test admin foydalanuvchini qo'llash
  if (!mongoose.connection.readyState) {
    req.user = { userId: 'admin-user-id', username: 'admin', role: 'admin' };
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Admin access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired admin token'
      });
    }

    // Check if user has admin role
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    req.user = decoded;
    next();
  });
};

// Admin Token Verification
app.get('/api/admin/verify', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.user.userId,
      username: req.user.username
    }
  });
});

// Admin Dashboard Stats
app.get('/api/admin/dashboard-stats', authenticateAdmin, async (req, res) => {
  try {
    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      return res.json({
        success: true,
        stats: {
          totalUsers: 150,
          activeUsers: 120,
          totalDebts: 450,
          totalRevenue: 2500000,
          newUsersToday: 5,
          newDebtsToday: 12
        }
      });
    }

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      updatedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    const totalDebts = await Debt.countDocuments();

    // Calculate total revenue (simplified)
    const revenueData = await Debt.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: today }
    });
    const newDebtsToday = await Debt.countDocuments({
      createdAt: { $gte: today }
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        totalDebts,
        totalRevenue,
        newUsersToday,
        newDebtsToday
      }
    });
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard stats'
    });
  }
});

// Get Users for Admin
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'all', subscription = 'all', search = '' } = req.query;
    const skip = (page - 1) * limit;

    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      return res.json({
        success: true,
        users: [
          {
            id: 'user-1',
            username: 'testuser1',
            phone: '+998901234567',
            subscriptionTier: 'free',
            status: 'active',
            createdAt: new Date()
          },
          {
            id: 'user-2',
            username: 'testuser2',
            phone: '+998901234568',
            subscriptionTier: 'standard',
            status: 'active',
            createdAt: new Date()
          }
        ],
        total: 2
      });
    }

    // Build query
    const query = {};

    if (status !== 'all') {
      query.status = status;
    }

    if (subscription !== 'all') {
      query.subscriptionTier = subscription;
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    // Transform users to include id field for frontend compatibility
    const transformedUsers = users.map(user => ({
      id: user._id,
      username: user.username,
      phone: user.phone,
      subscriptionTier: user.subscriptionTier,
      subscriptionExpiresAt: user.subscriptionExpiresAt,
      subscriptionStartedAt: user.subscriptionStartedAt,
      status: user.status,
      role: user.role,
      avatarColor: user.avatarColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    res.json({
      success: true,
      users: transformedUsers,
      total
    });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching users'
    });
  }
});

// Update User Status
app.put('/api/admin/users/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.params.id;

    console.log(`Admin ${req.user.userId} updating user ${userId} status to ${status}`);

    // Validatsiya
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "active" or "suspended"'
      });
    }

    // Validate userId
    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      console.log('MongoDB not connected, returning test response');
      return res.json({
        success: true,
        message: 'User status updated successfully (test mode)',
        user: {
          id: userId,
          status: status
        }
      });
    }

    // User'ni topish va yangilash
    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log(`User with ID ${userId} not found`);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log(`User ${userId} status updated successfully to ${status}`);

    res.json({
      success: true,
      message: 'User status updated successfully',
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        status: user.status,
        subscriptionTier: user.subscriptionTier,
        role: user.role,
        avatarColor: user.avatarColor,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Admin update user status error:', error);

    // MongoDB validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating user status'
    });
  }
});

// Update User Subscription
app.put('/api/admin/users/:id/subscription', authenticateAdmin, async (req, res) => {
  try {
    const { subscription, expirationDays } = req.body;
    const userId = req.params.id;

    console.log(`Admin ${req.user.userId} updating user ${userId} subscription to ${subscription}`);

    // Validatsiya
    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: 'Subscription is required'
      });
    }

    if (!['free', 'lite', 'standard', 'pro'].includes(subscription)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription. Must be "free", "lite", "standard", or "pro"'
      });
    }

    // Validate userId
    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Calculate expiration date
    let subscriptionExpiresAt = null;
    let subscriptionStartedAt = null;

    if (subscription !== 'free') {
      const days = expirationDays || 30; // Default to 30 days
      subscriptionStartedAt = new Date();
      subscriptionExpiresAt = new Date();
      subscriptionExpiresAt.setDate(subscriptionExpiresAt.getDate() + days);
    }

    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      console.log('MongoDB not connected, returning test response');
      return res.json({
        success: true,
        message: 'User subscription updated successfully (test mode)',
        user: {
          id: userId,
          subscriptionTier: subscription,
          subscriptionExpiresAt,
          subscriptionStartedAt
        }
      });
    }

    // User'ni topish va yangilash
    const updateData = {
      subscriptionTier: subscription,
      subscriptionExpiresAt,
      subscriptionStartedAt
    };

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log(`User with ID ${userId} not found`);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log(`User ${userId} subscription updated successfully to ${subscription}`);

    res.json({
      success: true,
      message: 'User subscription updated successfully',
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        status: user.status,
        subscriptionTier: user.subscriptionTier,
        subscriptionExpiresAt: user.subscriptionExpiresAt,
        subscriptionStartedAt: user.subscriptionStartedAt,
        role: user.role,
        avatarColor: user.avatarColor,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Admin update user subscription error:', error);

    // MongoDB validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating user subscription'
    });
  }
});

// Delete User
app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'User deleted successfully (test mode)'
    });
  }

  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (userId === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    // Delete user's related data
    await Promise.all([
      // Delete user's debts
      Debt.deleteMany({ userId: userId }),
      // Delete user's debt history
      DebtHistory.deleteMany({ userId: userId }),
      // Delete user's settings
      UserSettings.deleteMany({ userId: userId }),
      // Delete user's debt adjustments
      DebtAdjustment.deleteMany({ userId: userId }),
      // Delete user's creditor ratings
      CreditorRating.deleteMany({ userId: userId }),
      // Delete user's telegram sessions
      TelegramSession.deleteMany({ userId: userId })
    ]);

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Send Telegram notification about user deletion
    const deletionDate = formatUzbekDate(new Date());
    const telegramMessage = `🗑️ <b>Foydalanuvchi o'chirildi!</b>\n\n` +
      `👤 <b>Foydalanuvchi:</b> ${user.username}\n` +
      `📱 <b>Telefon:</b> ${user.phone}\n` +
      `📅 <b>Sana:</b> ${deletionDate}\n` +
      `👨‍💼 <b>Admin:</b> ${req.user.username}\n\n` +
      `#foydalanuvchi_ochirildi #admin_action`;

    // Send notification asynchronously
    sendTelegramNotification(telegramMessage).catch(error => {
      console.error('Failed to send Telegram notification:', error);
    });

    res.json({
      success: true,
      message: 'User and all related data deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error deleting user'
    });
  }
});

// Get User Profile Details for Admin
app.get('/api/admin/users/:id/profile', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      return res.json({
        success: true,
        profile: {
          user: {
            id: userId,
            username: 'testuser',
            phone: '+998901234567',
            subscriptionTier: 'free',
            role: 'user',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          stats: {
            totalDebts: 15,
            pendingDebts: 8,
            paidDebts: 7,
            totalAmount: 2500000,
            pendingAmount: 1200000,
            paidAmount: 1300000,
            dueTodayCount: 2,
            dueTomorrowCount: 1,
            overdueCount: 3
          },
          dueToday: [
            { creditor: 'Ali Valiyev', amount: 500000, currency: 'UZS' },
            { creditor: 'Bobur Karimov', amount: 300000, currency: 'UZS' }
          ],
          dueTomorrow: [
            { creditor: 'Sardor Toshev', amount: 400000, currency: 'UZS' }
          ],
          overdue: [
            { creditor: 'Jasur Rahimov', amount: 200000, currency: 'UZS', daysOverdue: 3 },
            { creditor: 'Nodir Salimov', amount: 150000, currency: 'UZS', daysOverdue: 5 },
            { creditor: 'Otabek Nazarov', amount: 250000, currency: 'UZS', daysOverdue: 1 }
          ]
        }
      });
    }

    // Validate userId
    if (!userId || userId === 'undefined') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Get user details
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's debts
    const debts = await Debt.find({ userId: userId });

    // Calculate statistics
    const pendingDebts = debts.filter(debt => debt.status === 'pending');
    const paidDebts = debts.filter(debt => debt.status === 'paid');

    const totalAmount = debts.reduce((sum, debt) => sum + debt.amount, 0);
    const pendingAmount = pendingDebts.reduce((sum, debt) => sum + debt.amount, 0);
    const paidAmount = paidDebts.reduce((sum, debt) => sum + debt.amount, 0);

    // Get today's date
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Filter debts by due dates
    const dueToday = pendingDebts.filter(debt => {
      const debtDate = new Date(debt.debtDate).toISOString().split('T')[0];
      return debtDate === todayStr;
    });

    const dueTomorrow = pendingDebts.filter(debt => {
      const debtDate = new Date(debt.debtDate).toISOString().split('T')[0];
      return debtDate === tomorrowStr;
    });

    const overdue = pendingDebts.filter(debt => {
      const debtDate = new Date(debt.debtDate).toISOString().split('T')[0];
      return debtDate < todayStr;
    }).map(debt => {
      const debtDate = new Date(debt.debtDate);
      const diffTime = today - debtDate;
      const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        creditor: debt.creditor,
        amount: debt.amount,
        currency: debt.currency,
        daysOverdue: daysOverdue,
        debtDate: debt.debtDate,
        description: debt.description
      };
    });

    // Prepare response data
    const profileData = {
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        subscriptionTier: user.subscriptionTier,
        subscriptionExpiresAt: user.subscriptionExpiresAt,
        subscriptionStartedAt: user.subscriptionStartedAt,
        role: user.role,
        status: user.status,
        avatarColor: user.avatarColor,
        telegramId: user.telegramId,
        telegramUsername: user.telegramUsername,
        telegramConnectedAt: user.telegramConnectedAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      stats: {
        totalDebts: debts.length,
        pendingDebts: pendingDebts.length,
        paidDebts: paidDebts.length,
        totalAmount: totalAmount,
        pendingAmount: pendingAmount,
        paidAmount: paidAmount,
        dueTodayCount: dueToday.length,
        dueTomorrowCount: dueTomorrow.length,
        overdueCount: overdue.length
      },
      dueToday: dueToday.map(debt => ({
        creditor: debt.creditor,
        amount: debt.amount,
        currency: debt.currency,
        description: debt.description,
        debtDate: debt.debtDate
      })),
      dueTomorrow: dueTomorrow.map(debt => ({
        creditor: debt.creditor,
        amount: debt.amount,
        currency: debt.currency,
        description: debt.description,
        debtDate: debt.debtDate
      })),
      overdue: overdue
    };

    res.json({
      success: true,
      profile: profileData
    });

  } catch (error) {
    console.error('Get user profile error:', error);

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error fetching user profile'
    });
  }
});

// Send Report to User via Telegram
app.post('/api/admin/users/:id/send-report', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      return res.json({
        success: true,
        message: 'Hisobot yuborildi (test mode)'
      });
    }

    // Validate userId
    if (!userId || userId === 'undefined') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has Telegram connected
    if (!user.telegramId) {
      return res.status(400).json({
        success: false,
        message: 'Foydalanuvchi Telegram botga ulanmagan'
      });
    }

    // Get user's debts
    const debts = await Debt.find({ userId: userId, status: 'pending' });

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Filter debts due tomorrow
    const dueTomorrow = debts.filter(debt => {
      const debtDate = new Date(debt.debtDate).toISOString().split('T')[0];
      return debtDate === tomorrowStr;
    });

    if (dueTomorrow.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Ertaga to\'lanishi kerak bo\'lgan qarzlar yo\'q'
      });
    }

    // Prepare report message
    const formatCurrency = (amount, currency = 'UZS') => {
      return new Intl.NumberFormat('uz-UZ').format(amount) + ' ' + currency;
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    let reportMessage = `📊 <b>ERTAGA TO'LANISHI KERAK BO'LGAN QARZLAR HISOBOTI</b>\n\n`;
    reportMessage += `👤 <b>Foydalanuvchi:</b> ${user.username}\n`;
    reportMessage += `📅 <b>Sana:</b> ${formatDate(tomorrow)}\n`;
    reportMessage += `📋 <b>Jami qarzlar:</b> ${dueTomorrow.length} ta\n\n`;

    let totalAmount = 0;
    dueTomorrow.forEach((debt, index) => {
      totalAmount += debt.amount;
      reportMessage += `${index + 1}. <b>${debt.creditor}</b>\n`;
      reportMessage += `   💰 ${formatCurrency(debt.amount, debt.currency)}\n`;
      if (debt.description) {
        reportMessage += `   📝 ${debt.description}\n`;
      }
      if (debt.phone) {
        reportMessage += `   📞 ${debt.phone}\n`;
      }
      reportMessage += `\n`;
    });

    reportMessage += `💵 <b>JAMI SUMMA:</b> ${formatCurrency(totalAmount)}`;

    // Send via Telegram bot if available
    if (telegramBotHandler && user.telegramId) {
      try {
        await telegramBotHandler.sendMessage(user.telegramId, reportMessage);

        // Also send Excel file if there are debts
        if (dueTomorrow.length > 0) {
          // Create simple CSV content (Excel alternative)
          let csvContent = 'Qarzdor,Summa,Valyuta,Tavsif,Telefon,Muddat\n';
          dueTomorrow.forEach(debt => {
            const row = [
              debt.creditor,
              debt.amount,
              debt.currency,
              debt.description || '',
              debt.phone || '',
              formatDate(debt.debtDate)
            ].map(field => `"${field}"`).join(',');
            csvContent += row + '\n';
          });

          // Send as document
          await telegramBotHandler.sendDocument(user.telegramId, {
            filename: `qarzlar_hisoboti_${tomorrow.toISOString().split('T')[0]}.csv`,
            content: Buffer.from(csvContent, 'utf8')
          }, `📊 Ertaga to'lanishi kerak bo'lgan qarzlar Excel fayli`);
        }

        console.log(`Report sent to user ${user.username} (${user.telegramId})`);
      } catch (telegramError) {
        console.error('Error sending Telegram report:', telegramError);
        return res.status(500).json({
          success: false,
          message: 'Telegram orqali yuborishda xatolik yuz berdi'
        });
      }
    }

    res.json({
      success: true,
      message: `Hisobot ${user.username} ga Telegram orqali yuborildi`,
      reportData: {
        totalDebts: dueTomorrow.length,
        totalAmount: totalAmount,
        dueDate: formatDate(tomorrow)
      }
    });

  } catch (error) {
    console.error('Send report error:', error);

    // MongoDB CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error sending report'
    });
  }
});

// Get Pricing Plans
app.get('/api/admin/pricing', authenticateAdmin, async (req, res) => {
  try {
    // Mock pricing plans data
    const plans = [
      {
        id: 'plan-1',
        name: 'Bepul',
        price: '0',
        period: 'month',
        debtLimit: 20,
        features: [
          '20 ta qarzni boshqarish',
          'Asosiy eslatmalar',
          'Telegram qo\'llab-quvvatlash'
        ],
        color: 'gray'
      },
      {
        id: 'plan-2',
        name: 'Standart',
        price: '59000',
        period: 'month',
        debtLimit: 150,
        features: [
          '150 ta qarzni boshqarish',
          'Kengaytirilgan eslatmalar',
          'Maxsus qo\'llab-quvvatlash',
          'Hisobotlar'
        ],
        color: 'orange'
      },
      {
        id: 'plan-3',
        name: 'Professional',
        price: '129000',
        period: 'month',
        debtLimit: 1000,
        features: [
          '1000 ta qarzni boshqarish',
          'Barcha eslatmalar turlari',
          '24/7 qo\'llab-quvvatlash',
          'Kengaytirilgan hisobotlar',
          'API kirish'
        ],
        color: 'purple'
      }
    ];

    res.json({
      success: true,
      plans
    });
  } catch (error) {
    console.error('Admin get pricing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching pricing plans'
    });
  }
});

// Update Pricing Plan
app.put('/api/admin/pricing/:id', authenticateAdmin, async (req, res) => {
  try {
    // In a real application, you would update the database
    // For now, just return success
    res.json({
      success: true,
      message: 'Pricing plan updated successfully'
    });
  } catch (error) {
    console.error('Admin update pricing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating pricing plan'
    });
  }
});

// Get Reports
app.get('/api/admin/reports', authenticateAdmin, async (req, res) => {
  try {
    const { start, end } = req.query;

    // MongoDB ulanmagan bo'lsa test javob qaytarish
    if (!mongoose.connection.readyState) {
      return res.json({
        success: true,
        reports: {
          userGrowth: [],
          revenue: [],
          debtStats: {
            totalUsers: 150,
            totalDebts: 450,
            totalRevenue: 2500000
          },
          subscriptionStats: {
            activeSubscriptions: 120
          }
        }
      });
    }

    // Mock reports data
    const reports = {
      userGrowth: [],
      revenue: [],
      debtStats: {
        totalUsers: 150,
        totalDebts: 450,
        totalRevenue: 2500000
      },
      subscriptionStats: {
        activeSubscriptions: 120
      }
    };

    res.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Admin get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching reports'
    });
  }
});

// Export Reports
app.get('/api/admin/reports/export', authenticateAdmin, async (req, res) => {
  try {
    const { type } = req.query;

    // In a real application, you would generate and return an Excel file
    // For now, just return a success message
    res.json({
      success: true,
      message: `Report exported successfully: ${type}`
    });
  } catch (error) {
    console.error('Admin export reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error exporting reports'
    });
  }
});



// Analytics endpoint - Tariflar tahlili va Qurilmalar statistikasi
app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
  console.log('Analytics endpoint called by user:', req.user);
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      analytics: {
        userActivity: {
          growth: 15.2,
          newUsers: 24
        },
        debtTrends: {
          revenueGrowth: 8.5,
          debtGrowth: 12.3
        },
        subscriptionAnalytics: {
          plans: [
            { name: 'Bepul', count: 150, percentage: 60 },
            { name: 'Standart', count: 75, percentage: 30 },
            { name: 'Professional', count: 25, percentage: 10 }
          ]
        },
        deviceStats: {
          devices: [
            { name: 'Mobil', count: 180, percentage: 72 },
            { name: 'Desktop', count: 70, percentage: 28 }
          ]
        }
      }
    });
  }

  try {
    const { range = '30d' } = req.query;

    // Admin huquqini tekshirish
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    // Sana oralig'ini hisoblash
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Tariflar tahlili - real ma'lumotlar
    const subscriptionStats = await User.aggregate([
      {
        $group: {
          _id: '$subscriptionTier',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalUsers = await User.countDocuments();
    const subscriptionAnalytics = {
      plans: subscriptionStats.map(stat => {
        const tierNames = {
          'free': 'Bepul',
          'standard': 'Standart',
          'pro': 'Professional'
        };
        return {
          name: tierNames[stat._id] || stat._id,
          count: stat.count,
          percentage: Math.round((stat.count / totalUsers) * 100)
        };
      })
    };

    // Qurilmalar statistikasi - User-Agent asosida
    // Bu yerda oddiy logika - real loyihada User-Agent ni saqlash kerak
    const deviceStats = {
      devices: [
        { name: 'Mobil', count: Math.floor(totalUsers * 0.7), percentage: 70 },
        { name: 'Desktop', count: Math.floor(totalUsers * 0.3), percentage: 30 }
      ]
    };

    // Foydalanuvchilar faolligi
    const newUsersCount = await User.countDocuments({
      createdAt: { $gte: startDate }
    });

    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setTime(previousPeriodStart.getTime() - (now.getTime() - startDate.getTime()));

    const previousNewUsers = await User.countDocuments({
      createdAt: { $gte: previousPeriodStart, $lt: startDate }
    });

    const userGrowth = previousNewUsers > 0
      ? Math.round(((newUsersCount - previousNewUsers) / previousNewUsers) * 100)
      : 100;

    // Qarzlar tendensiyasi
    const totalDebts = await Debt.countDocuments({
      createdAt: { $gte: startDate }
    });

    const previousDebts = await Debt.countDocuments({
      createdAt: { $gte: previousPeriodStart, $lt: startDate }
    });

    const debtGrowth = previousDebts > 0
      ? Math.round(((totalDebts - previousDebts) / previousDebts) * 100)
      : 100;

    // Daromad o'sishi (to'langan qarzlar asosida)
    const paidDebtsAmount = await Debt.aggregate([
      {
        $match: {
          status: 'paid',
          paidAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const previousPaidAmount = await Debt.aggregate([
      {
        $match: {
          status: 'paid',
          paidAt: { $gte: previousPeriodStart, $lt: startDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const currentRevenue = paidDebtsAmount[0]?.total || 0;
    const previousRevenue = previousPaidAmount[0]?.total || 0;

    const revenueGrowth = previousRevenue > 0
      ? Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100)
      : 100;

    res.json({
      success: true,
      analytics: {
        userActivity: {
          growth: userGrowth,
          newUsers: newUsersCount
        },
        debtTrends: {
          revenueGrowth: revenueGrowth,
          debtGrowth: debtGrowth
        },
        subscriptionAnalytics,
        deviceStats
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics'
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/debts', debtRoutes);

// Telegram webhook endpoint
app.post('/api/telegram/webhook', async (req, res) => {
  try {
    console.log('Telegram webhook received:', JSON.stringify(req.body, null, 2));

    const update = req.body;

    if (update.message) {
      const message = update.message;
      const chatId = message.chat.id;
      const text = message.text;

      console.log(`Message from ${message.from.username || message.from.first_name}: ${text}`);

      // Handle the message using TelegramBotHandler
      if (global.telegramBotHandler) {
        await global.telegramBotHandler.handleUpdate(update);
      }
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Set webhook endpoint
app.post('/api/telegram/set-webhook', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TELEGRAM_BOT_TOKEN) {
      return res.status(400).json({ error: 'Telegram bot token not configured' });
    }

    const webhookUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    });

    const result = await response.json();

    res.json(result);
  } catch (error) {
    console.error('Set webhook error:', error);
    res.status(500).json({ error: 'Failed to set webhook' });
  }
});

// Get webhook info
app.get('/api/telegram/webhook-info', async (req, res) => {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TELEGRAM_BOT_TOKEN) {
      return res.status(400).json({ error: 'Telegram bot token not configured' });
    }

    const webhookUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`;

    const response = await fetch(webhookUrl);
    const result = await response.json();

    res.json(result);
  } catch (error) {
    console.error('Get webhook info error:', error);
    res.status(500).json({ error: 'Failed to get webhook info' });
  }
});

// ==================== BRANCH MANAGEMENT ENDPOINTS ====================

// Get user branches
app.get('/api/branches', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      branches: [
        {
          _id: 'default-branch-id',
          name: 'Asosiy filial',
          description: 'Default branch for test mode',
          currency: 'UZS',
          isActive: true,
          color: '#3B82F6',
          icon: 'building',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    });
  }

  try {
    const branches = await Branch.find({
      userId: req.user.userId,
      isActive: true
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      branches
    });
  } catch (error) {
    console.error('Get branches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching branches'
    });
  }
});

// Create new branch
app.post('/api/branches', authenticateToken, validateBranchLimit, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.status(201).json({
      success: true,
      message: 'Branch created successfully (test mode)',
      branch: {
        _id: 'new-branch-id',
        name: req.body.name || 'Yangi filial',
        description: req.body.description || '',
        currency: req.body.currency || 'UZS',
        isActive: true,
        color: req.body.color || '#3B82F6',
        icon: req.body.icon || 'building',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  try {
    const { name, description, currency, color, icon } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Branch name is required'
      });
    }

    // User and limits are provided by validateBranchLimit middleware
    const user = req.branchUser;
    const currentBranchCount = req.currentBranchCount;

    // Check if branch name already exists for this user
    const existingBranch = await Branch.findOne({
      userId: req.user.userId,
      name: name.trim(),
      isActive: true
    });

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: 'Branch with this name already exists'
      });
    }

    // Create new branch
    const branch = new Branch({
      userId: req.user.userId,
      name: name.trim(),
      description: description?.trim() || '',
      currency: currency || 'UZS',
      color: color || '#3B82F6',
      icon: icon || 'building',
      isActive: true
    });

    await branch.save();

    // Create default settings for the branch
    const branchSettings = new BranchSettings({
      branchId: branch._id,
      userId: req.user.userId,
      currency: currency || 'UZS'
    });

    await branchSettings.save();

    // If this is the user's first branch, set it as active
    if (currentBranchCount === 0) {
      await User.findByIdAndUpdate(req.user.userId, {
        activeBranchId: branch._id
      });
    }

    res.status(201).json({
      success: true,
      message: 'Branch created successfully',
      branch
    });
  } catch (error) {
    console.error('Create branch error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Branch with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating branch'
    });
  }
});

// Update branch
app.put('/api/branches/:id', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Branch updated successfully (test mode)',
      branch: {
        _id: req.params.id,
        name: req.body.name || 'Updated branch',
        description: req.body.description || '',
        currency: req.body.currency || 'UZS',
        isActive: true,
        color: req.body.color || '#3B82F6',
        icon: req.body.icon || 'building',
        updatedAt: new Date()
      }
    });
  }

  try {
    const { name, description, currency, color, icon } = req.body;
    const branchId = req.params.id;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Branch name is required'
      });
    }

    // Find branch and verify ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Check if new name conflicts with existing branches (excluding current)
    if (name.trim() !== branch.name) {
      const existingBranch = await Branch.findOne({
        userId: req.user.userId,
        name: name.trim(),
        isActive: true,
        _id: { $ne: branchId }
      });

      if (existingBranch) {
        return res.status(400).json({
          success: false,
          message: 'Branch with this name already exists'
        });
      }
    }

    // Update branch
    const updatedBranch = await Branch.findByIdAndUpdate(
      branchId,
      {
        name: name.trim(),
        description: description?.trim() || '',
        currency: currency || branch.currency,
        color: color || branch.color,
        icon: icon || branch.icon
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Branch updated successfully',
      branch: updatedBranch
    });
  } catch (error) {
    console.error('Update branch error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Branch with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating branch'
    });
  }
});

// Delete branch
app.delete('/api/branches/:id', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Branch deleted successfully (test mode)'
    });
  }

  try {
    const branchId = req.params.id;
    const { forceDelete } = req.query; // Query parameter to force delete with debts

    // Find branch and verify ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Check if branch has debts
    const debtCount = await Debt.countDocuments({
      branchId: branchId
    });

    // If there are debts and forceDelete is not specified, return error
    if (debtCount > 0 && forceDelete !== 'true') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete branch with pending debts',
        debtCount
      });
    }

    // Check if this is the user's active branch
    const user = await User.findById(req.user.userId);
    const isActiveBranch = user.activeBranchId && user.activeBranchId.toString() === branchId;

    // If forceDelete is true, delete all debts in this branch
    if (forceDelete === 'true' && debtCount > 0) {
      await Debt.deleteMany({
        branchId: branchId
      });
    }

    // Soft delete the branch
    await Branch.findByIdAndUpdate(branchId, {
      isActive: false
    });

    // Delete branch settings
    await BranchSettings.findOneAndDelete({
      branchId: branchId
    });

    // If this was the active branch, set another branch as active
    if (isActiveBranch) {
      const remainingBranch = await Branch.findOne({
        userId: req.user.userId,
        isActive: true
      });

      await User.findByIdAndUpdate(req.user.userId, {
        activeBranchId: remainingBranch ? remainingBranch._id : null
      });
    }

    res.json({
      success: true,
      message: 'Branch deleted successfully',
      deletedDebts: forceDelete === 'true' ? debtCount : 0
    });
  } catch (error) {
    console.error('Delete branch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting branch'
    });
  }
});

// Get branch debt count
app.get('/api/branches/:id/debts/count', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      count: 0
    });
  }

  try {
    const branchId = req.params.id;

    // Find branch and verify ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Count debts in this branch
    const debtCount = await Debt.countDocuments({
      branchId: branchId
    });

    res.json({
      success: true,
      count: debtCount
    });
  } catch (error) {
    console.error('Get branch debt count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting debt count'
    });
  }
});

// Get branch statistics
app.get('/api/branches/:id/stats', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      stats: {
        totalDebts: 5,
        pendingDebts: 3,
        paidDebts: 2,
        totalAmount: 1500000,
        pendingAmount: 900000,
        paidAmount: 600000,
        currency: 'UZS'
      }
    });
  }

  try {
    const branchId = req.params.id;

    // Verify branch ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Calculate statistics
    const [totalStats, pendingStats, paidStats] = await Promise.all([
      Debt.aggregate([
        { $match: { branchId: new mongoose.Types.ObjectId(branchId) } },
        { $group: { _id: null, count: { $sum: 1 }, total: { $sum: '$amount' } } }
      ]),
      Debt.aggregate([
        { $match: { branchId: new mongoose.Types.ObjectId(branchId), status: 'pending' } },
        { $group: { _id: null, count: { $sum: 1 }, total: { $sum: '$amount' } } }
      ]),
      Debt.aggregate([
        { $match: { branchId: new mongoose.Types.ObjectId(branchId), status: 'paid' } },
        { $group: { _id: null, count: { $sum: 1 }, total: { $sum: '$amount' } } }
      ])
    ]);

    const stats = {
      totalDebts: totalStats[0]?.count || 0,
      pendingDebts: pendingStats[0]?.count || 0,
      paidDebts: paidStats[0]?.count || 0,
      totalAmount: totalStats[0]?.total || 0,
      pendingAmount: pendingStats[0]?.total || 0,
      paidAmount: paidStats[0]?.total || 0,
      currency: branch.currency
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get branch stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching branch statistics'
    });
  }
});

// ==================== BRANCH SETTINGS ENDPOINTS ====================

// Get branch settings
app.get('/api/branches/:id/settings', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      settings: {
        currency: 'UZS',
        telegramNotifications: {
          enabled: true,
          dailyReports: true,
          debtReminders: true
        },
        reminderSettings: {
          enabled: true,
          daysBefore: 1,
          frequency: 'daily'
        },
        customTemplates: []
      }
    });
  }

  try {
    const branchId = req.params.id;

    // Verify branch ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Get or create branch settings
    let settings = await BranchSettings.findOne({ branchId: branchId });

    if (!settings) {
      // Create default settings if not exists
      settings = new BranchSettings({
        branchId: branchId,
        userId: req.user.userId,
        currency: branch.currency || 'UZS'
      });
      await settings.save();
    }

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Get branch settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching branch settings'
    });
  }
});

// Update branch settings
app.put('/api/branches/:id/settings', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      message: 'Branch settings updated successfully (test mode)',
      settings: {
        ...req.body,
        updatedAt: new Date()
      }
    });
  }

  try {
    const branchId = req.params.id;
    const {
      currency,
      telegramNotifications,
      reminderSettings,
      customTemplates
    } = req.body;

    // Verify branch ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Prepare update object
    const updateData = {};
    if (currency) updateData.currency = currency;
    if (telegramNotifications) updateData.telegramNotifications = telegramNotifications;
    if (reminderSettings) updateData.reminderSettings = reminderSettings;
    if (customTemplates) updateData.customTemplates = customTemplates;

    // Update or create settings
    const settings = await BranchSettings.findOneAndUpdate(
      { branchId: branchId },
      updateData,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    // If currency is updated, also update the branch currency
    if (currency && currency !== branch.currency) {
      await Branch.findByIdAndUpdate(branchId, { currency });
    }

    res.json({
      success: true,
      message: 'Branch settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Update branch settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating branch settings'
    });
  }
});

// ==================== BRANCH-SPECIFIC DEBT ENDPOINTS ====================

// Get debts for specific branch
app.get('/api/branches/:id/debts', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      debts: [
        {
          _id: 'test-debt-1',
          creditor: 'Test Creditor',
          amount: 500000,
          description: 'Test debt for branch',
          status: 'pending',
          debtDate: new Date(),
          currency: 'UZS',
          branchId: req.params.id
        }
      ]
    });
  }

  try {
    const branchId = req.params.id;

    // Verify branch ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Get debts for this branch
    const debts = await Debt.find({
      branchId: branchId,
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      debts
    });
  } catch (error) {
    console.error('Get branch debts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching branch debts'
    });
  }
});

// Create debt for specific branch
app.post('/api/branches/:id/debts', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.status(201).json({
      success: true,
      message: 'Debt created successfully for branch (test mode)',
      debt: {
        _id: 'new-debt-id',
        creditor: req.body.creditor || 'Test Creditor',
        amount: req.body.amount || 100000,
        description: req.body.description || '',
        status: 'pending',
        debtDate: req.body.debtDate || new Date(),
        currency: req.body.currency || 'UZS',
        branchId: req.params.id
      }
    });
  }

  try {
    const branchId = req.params.id;
    const { creditor, amount, description, phone, countryCode, debtDate, currency } = req.body;

    // Verify branch ownership
    const branch = await Branch.findOne({
      _id: branchId,
      userId: req.user.userId,
      isActive: true
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Validation
    if (!creditor || !amount || !debtDate) {
      return res.status(400).json({
        success: false,
        message: 'Creditor, amount, and debt date are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Create new debt
    const debt = new Debt({
      userId: req.user.userId,
      branchId: branchId,
      creditor: creditor.trim(),
      amount: parseFloat(amount),
      description: description?.trim() || '',
      phone: phone?.trim() || '',
      countryCode: countryCode || '+998',
      debtDate: new Date(debtDate),
      currency: currency || branch.currency || 'UZS',
      status: 'pending'
    });

    await debt.save();

    // Create debt history record
    const debtHistory = new DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'created',
      amount: debt.amount,
      creditor: debt.creditor,
      description: debt.description,
      status: debt.status
    });

    await debtHistory.save();

    res.status(201).json({
      success: true,
      message: 'Debt created successfully for branch',
      debt
    });
  } catch (error) {
    console.error('Create branch debt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating debt for branch'
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler for undefined routes - This should be the last middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});
