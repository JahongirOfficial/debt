import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

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
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Serverni ishga tushirish
    startServer();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Starting server without MongoDB connection for testing purposes...');
    // MongoDB bo'lmasa ham serverni ishga tushirish
    startServer();
  });

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
    enum: ['free', 'standard', 'pro'],
    default: 'free'
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
  }
}, {
  timestamps: true
});

// Indekslar
debtSchema.index({ userId: 1, status: 1 });
debtSchema.index({ userId: 1, debtDate: 1 });
debtSchema.index({ userId: 1, createdAt: -1 });

// Debt model (MongoDB ulangan bo'lsa)
let Debt;
try {
  Debt = mongoose.model('Debt', debtSchema);
} catch (error) {
  Debt = mongoose.model('Debt');
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

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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
  res.json({
    success: true,
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState ? 'connected' : 'disconnected'
  });
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
      ]
    });
  }

  try {
    const { status, startDate, endDate, search } = req.query;

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
      debts
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
    const { subscription } = req.body;
    const userId = req.params.id;

    console.log(`Admin ${req.user.userId} updating user ${userId} subscription to ${subscription}`);

    // Validatsiya
    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: 'Subscription is required'
      });
    }

    if (!['free', 'standard', 'pro'].includes(subscription)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription. Must be "free", "standard", or "pro"'
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
        message: 'User subscription updated successfully (test mode)',
        user: {
          id: userId,
          subscriptionTier: subscription
        }
      });
    }

    // User'ni topish va yangilash
    const user = await User.findByIdAndUpdate(
      userId,
      { subscriptionTier: subscription },
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