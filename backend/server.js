import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

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

// Serverni ishga tushirish funksiyasi
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  // Port band bo'lsa boshqa portdan foydalanish
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is already in use, trying ${parseInt(PORT) + 1}`);
      process.env.PORT = parseInt(PORT) + 1;
      startServer();
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
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
  avatarColor: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Parolni hash qilish
userSchema.pre('save', async function(next) {
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
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.status(201).json({
      success: true,
      message: 'User registered successfully (test mode)',
      token: 'test-token',
      user: {
        id: 'test-user-id',
        username: req.body.username || 'testuser',
        email: req.body.email || 'test@example.com',
        subscriptionTier: 'free',
        avatarColor: generateRandomAvatarColor()
      }
    });
  }
  
  try {
    const { username, email, password } = req.body;
    
    // Validatsiya
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }
    
    // Foydalanuvchi mavjudligini tekshirish
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email or username already exists' 
      });
    }
    
    // Tasodifiy avatar rangi
    const avatarColor = generateRandomAvatarColor();
    
    // Yangi foydalanuvchi yaratish
    const user = new User({ 
      username, 
      email, 
      password,
      subscriptionTier: 'free',
      avatarColor
    });
    await user.save();
    
    // JWT token generatsiya qilish
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        avatarColor: user.avatarColor
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Kirish
app.post('/api/auth/login', async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    const { email, password } = req.body;
    
    // Validatsiya
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    // Test mode authentication
    // Only allow the predefined test account
    if (email === 'test@example.com' && password === 'password123') {
      return res.json({
        success: true,
        message: 'Login successful (test mode)',
        token: 'test-token',
        user: {
          id: 'test-user-id',
          username: 'testuser',
          email: 'test@example.com',
          subscriptionTier: 'free',
          avatarColor: generateRandomAvatarColor()
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
    const { email, password } = req.body;
    
    // Validatsiya
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    // Foydalanuvchini email bo'yicha topish
    const user = await User.findOne({ email });
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
      { userId: user._id, username: user.username },
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
        email: user.email,
        subscriptionTier: user.subscriptionTier,
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
        email: 'test@example.com',
        subscriptionTier: 'free',
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
        email: user.email,
        subscriptionTier: user.subscriptionTier,
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
    const { creditor, amount, description, phone, countryCode, debtDate, currency } = req.body;
    
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
    const { amount, phone, countryCode, description } = req.body;
    
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
    
    // Agar miqdor o'zgartirilgan bo'lsa
    if (amount !== undefined) {
      update.amount = amount;
      
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
      }
    }
    
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
    // Qarzni to'langan deb belgilash
    const debt = await Debt.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { 
        status: 'paid', 
        paidAt: new Date(),
        updatedAt: new Date()
      },
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
    console.error('Mark debt as paid error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error marking debt as paid' 
    });
  }
});

// Qarz tuzatishlarini olish
app.get('/api/debt-adjustments', authenticateToken, async (req, res) => {
  // MongoDB ulanmagan bo'lsa test javob qaytarish
  if (!mongoose.connection.readyState) {
    return res.json({
      success: true,
      adjustments: []
    });
  }
  
  try {
    const adjustments = await DebtAdjustment.find({
      userId: req.user.userId
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      adjustments
    });
  } catch (error) {
    console.error('Get debt adjustments error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching debt adjustments' 
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
