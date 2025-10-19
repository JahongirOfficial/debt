import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get models from server.js
const getModels = () => {
  if (mongoose.connection.readyState !== 1) {
    return null;
  }
  
  try {
    return {
      User: mongoose.model('User'),
      Employee: mongoose.model('Employee'),
      Debt: mongoose.model('Debt'),
      Branch: mongoose.model('Branch')
    };
  } catch (error) {
    return null;
  }
};

// Middleware to authenticate admin
const authenticateAdmin = (req, res, next) => {
  // For testing without MongoDB, use test admin
  if (!mongoose.connection.readyState) {
    req.user = { userId: 'test-admin-id', role: 'admin' };
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'qarzdaftar_jwt_secret_key';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Get business owners with subscription limits
router.get('/business-owners', authenticateAdmin, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      businessOwners: [
        {
          _id: 'test-owner-1',
          username: 'Ali Valiyev',
          phone: '+998901234567',
          subscriptionTier: 'pro',
          isActive: true,
          createdAt: new Date(),
          stats: {
            totalDebts: 25,
            totalEmployees: 3,
            totalBranches: 2
          },
          limits: {
            debts: 200,
            employees: 15,
            branches: 10
          },
          usage: {
            debts: 25,
            employees: 3,
            branches: 2
          },
          isOverLimit: {
            debts: false,
            employees: false,
            branches: false
          }
        },
        {
          _id: 'test-owner-2',
          username: 'Bobur Karimov',
          phone: '+998901234568',
          subscriptionTier: 'standard',
          isActive: true,
          createdAt: new Date(),
          stats: {
            totalDebts: 55,
            totalEmployees: 2,
            totalBranches: 1
          },
          limits: {
            debts: 50,
            employees: 5,
            branches: 3
          },
          usage: {
            debts: 55,
            employees: 2,
            branches: 1
          },
          isOverLimit: {
            debts: true, // 55 > 50
            employees: false,
            branches: false
          }
        },
        {
          _id: 'test-owner-3',
          username: 'Dilshod Toshev',
          phone: '+998901234569',
          subscriptionTier: 'free',
          isActive: true,
          createdAt: new Date(),
          stats: {
            totalDebts: 12,
            totalEmployees: 1,
            totalBranches: 1
          },
          limits: {
            debts: 10,
            employees: 2,
            branches: 1
          },
          usage: {
            debts: 12,
            employees: 1,
            branches: 1
          },
          isOverLimit: {
            debts: true, // 12 > 10
            employees: false,
            branches: false
          }
        }
      ]
    });
  }

  try {
    // Get all business owners (users with role 'user')
    const businessOwners = await models.User.find({
      role: 'user'
    }).select('username phone subscriptionTier isActive createdAt');

    // Get statistics for each business owner with limit checking
    const businessOwnersWithStats = await Promise.all(
      businessOwners.map(async (owner) => {
        const subscriptionTier = owner.subscriptionTier || 'free';
        const limits = SUBSCRIPTION_LIMITS[subscriptionTier] || SUBSCRIPTION_LIMITS.free;

        const [totalDebts, totalEmployees, totalBranches] = await Promise.all([
          models.Debt.countDocuments({ userId: owner._id }),
          models.Employee.countDocuments({ ownerId: owner._id, isActive: true }),
          models.Branch.countDocuments({ userId: owner._id, isActive: true })
        ]);

        // Check if over limits
        const isOverLimit = {
          debts: limits.debts !== -1 && totalDebts > limits.debts,
          employees: limits.employees !== -1 && totalEmployees > limits.employees,
          branches: limits.branches !== -1 && totalBranches > limits.branches
        };

        return {
          ...owner.toObject(),
          stats: {
            totalDebts,
            totalEmployees,
            totalBranches
          },
          limits: {
            debts: limits.debts === -1 ? 'Cheksiz' : limits.debts,
            employees: limits.employees === -1 ? 'Cheksiz' : limits.employees,
            branches: limits.branches === -1 ? 'Cheksiz' : limits.branches
          },
          usage: {
            debts: totalDebts,
            employees: totalEmployees,
            branches: totalBranches
          },
          isOverLimit
        };
      })
    );

    res.json({
      success: true,
      businessOwners: businessOwnersWithStats
    });
  } catch (error) {
    console.error('Error fetching business owners:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all employees
router.get('/all-employees', authenticateAdmin, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      employees: [
        {
          _id: 'test-emp-1',
          name: 'Sardor Ahmadov',
          phone: '+998901111111',
          position: 'Kassir',
          isActive: true,
          hireDate: new Date(),
          permissions: {
            canAddDebt: true,
            canEditDebt: false,
            canDeleteDebt: false,
            canViewDebts: true,
            canManagePayments: true,
            canViewReports: false,
            canManageCreditors: false
          },
          ownerName: 'Ali Valiyev',
          branchName: 'Asosiy filial',
          ownerId: 'test-owner-1'
        },
        {
          _id: 'test-emp-2',
          name: 'Malika Karimova',
          phone: '+998902222222',
          position: 'Menejer',
          isActive: true,
          hireDate: new Date(),
          permissions: {
            canAddDebt: true,
            canEditDebt: true,
            canDeleteDebt: true,
            canViewDebts: true,
            canManagePayments: true,
            canViewReports: true,
            canManageCreditors: false
          },
          ownerName: 'Bobur Karimov',
          branchName: 'Ikkinchi filial',
          ownerId: 'test-owner-2'
        }
      ]
    });
  }

  try {
    const employees = await models.Employee.find({})
      .populate('ownerId', 'username')
      .populate('branchId', 'name')
      .sort({ createdAt: -1 });

    const formattedEmployees = employees.map(emp => ({
      _id: emp._id,
      name: emp.name,
      phone: emp.phone,
      position: emp.position,
      isActive: emp.isActive,
      hireDate: emp.hireDate,
      permissions: emp.permissions,
      ownerName: emp.ownerId?.username || 'Noma\'lum',
      branchName: emp.branchId?.name || 'Noma\'lum',
      ownerId: emp.ownerId?._id
    }));

    res.json({
      success: true,
      employees: formattedEmployees
    });
  } catch (error) {
    console.error('Error fetching all employees:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Subscription limits
const SUBSCRIPTION_LIMITS = {
  free: { debts: 10, employees: 2, branches: 1 },
  standard: { debts: 50, employees: 5, branches: 3 },
  pro: { debts: 200, employees: 15, branches: 10 },
  enterprise: { debts: -1, employees: -1, branches: -1 } // unlimited
};

// Get all debts for SMS reminders with subscription limits
router.get('/all-debts', authenticateAdmin, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      debts: [
        {
          id: 'test-debt-1',
          creditorName: 'Ahmad Valiyev',
          creditorPhone: '+998901234567',
          debtorName: 'Ahmad Valiyev',
          debtorPhone: '+998901234567',
          amount: 1500000,
          dueDate: '2025-10-22T00:00:00.000Z', // 3 kun qoldi (22 oktyabr)
          status: 'active',
          ownerName: 'Ali Karimov',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Ahmad Valiyev',
            phone: '+998901234567'
          },
          subscriptionTier: 'pro',
          isOverLimit: false,
          debtIndex: 1,
          debtLimit: 200
        },
        {
          id: 'test-debt-2',
          creditorName: 'Bobur Toshev',
          creditorPhone: '+998902345678',
          debtorName: 'Bobur Toshev',
          debtorPhone: '+998902345678',
          amount: 2500000,
          dueDate: '2025-10-20T00:00:00.000Z', // 1 kun qoldi (20 oktyabr)
          status: 'active',
          ownerName: 'Dilshod Rahimov',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Bobur Toshev',
            phone: '+998902345678'
          },
          subscriptionTier: 'standard',
          isOverLimit: false,
          debtIndex: 15,
          debtLimit: 50
        },
        {
          id: 'test-debt-3',
          creditorName: 'Malika Saidova',
          creditorPhone: '+998903456789',
          debtorName: 'Malika Saidova',
          debtorPhone: '+998903456789',
          amount: 800000,
          dueDate: '2025-10-17T00:00:00.000Z', // 2 kun oldin (muddati o'tgan)
          status: 'active',
          ownerName: 'Sardor Ahmadov',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Malika Saidova',
            phone: '+998903456789'
          },
          subscriptionTier: 'free',
          isOverLimit: true, // Free tarif - 10 dan ortiq
          debtIndex: 12,
          debtLimit: 10
        },
        {
          id: 'test-debt-4',
          creditorName: 'Zarina Karimova',
          creditorPhone: '+998904567890',
          debtorName: 'Zarina Karimova',
          debtorPhone: '+998904567890',
          amount: 3200000,
          dueDate: '2025-10-12T00:00:00.000Z', // 7 kun oldin (muddati o'tgan)
          status: 'active',
          ownerName: 'Nodir Saidov',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Zarina Karimova',
            phone: '+998904567890'
          },
          subscriptionTier: 'standard',
          isOverLimit: true, // Standard tarif - 50 dan ortiq
          debtIndex: 52,
          debtLimit: 50
        },
        {
          id: 'test-debt-5',
          creditorName: 'Jasur Rahimov',
          creditorPhone: '+998905678901',
          debtorName: 'Jasur Rahimov',
          debtorPhone: '+998905678901',
          amount: 950000,
          dueDate: '2025-10-26T00:00:00.000Z', // 7 kun keyin (hafta ichida)
          status: 'active',
          ownerName: 'Feruza Tosheva',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Jasur Rahimov',
            phone: '+998905678901'
          },
          subscriptionTier: 'pro',
          isOverLimit: false,
          debtIndex: 45,
          debtLimit: 200
        },
        {
          id: 'test-debt-6',
          creditorName: 'Nigora Ahmadova',
          creditorPhone: '+998906789012',
          debtorName: 'Nigora Ahmadova',
          debtorPhone: '+998906789012',
          amount: 1800000,
          dueDate: '2025-10-19T00:00:00.000Z', // bugun (19 oktyabr)
          status: 'active',
          ownerName: 'Bekzod Valiyev',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Nigora Ahmadova',
            phone: '+998906789012'
          },
          subscriptionTier: 'free',
          isOverLimit: true, // Free tarif - 10 dan ortiq
          debtIndex: 11,
          debtLimit: 10
        },
        // Qo'shimcha test ma'lumotlari - aniq kunlar uchun
        {
          id: 'test-debt-7',
          creditorName: 'Otabek Saidov',
          creditorPhone: '+998907890123',
          debtorName: 'Otabek Saidov',
          debtorPhone: '+998907890123',
          amount: 1200000,
          dueDate: '2025-10-20T00:00:00.000Z', // 1 kun qoldi (20 oktyabr)
          status: 'active',
          ownerName: 'Aziza Karimova',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Otabek Saidov',
            phone: '+998907890123'
          }
        },
        {
          id: 'test-debt-8',
          creditorName: 'Gulnora Tosheva',
          creditorPhone: '+998908901234',
          debtorName: 'Gulnora Tosheva',
          debtorPhone: '+998908901234',
          amount: 2100000,
          dueDate: '2025-10-21T00:00:00.000Z', // 2 kun qoldi (21 oktyabr)
          status: 'active',
          ownerName: 'Jamshid Valiyev',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Gulnora Tosheva',
            phone: '+998908901234'
          }
        },
        {
          id: 'test-debt-9',
          creditorName: 'Sherzod Ahmadov',
          creditorPhone: '+998909012345',
          debtorName: 'Sherzod Ahmadov',
          debtorPhone: '+998909012345',
          amount: 750000,
          dueDate: '2025-10-22T00:00:00.000Z', // 3 kun qoldi (22 oktyabr)
          status: 'active',
          ownerName: 'Madina Rahimova',
          createdAt: new Date().toISOString(),
          debtor: {
            name: 'Sherzod Ahmadov',
            phone: '+998909012345'
          }
        }
      ]
    });
  }

  try {
    // Get all active debts with user information
    const debts = await models.Debt.find({
      status: { $ne: 'paid' }
    })
    .populate('userId', 'username subscriptionTier')
    .sort({ dueDate: 1 });

    // Group debts by user to check limits
    const debtsByUser = {};
    debts.forEach(debt => {
      const userId = debt.userId._id.toString();
      if (!debtsByUser[userId]) {
        debtsByUser[userId] = {
          user: debt.userId,
          debts: []
        };
      }
      debtsByUser[userId].debts.push(debt);
    });

    // Format debts for frontend with limit checking
    const formattedDebts = [];
    
    Object.values(debtsByUser).forEach(({ user, debts: userDebts }) => {
      const subscriptionTier = user.subscriptionTier || 'free';
      const limit = SUBSCRIPTION_LIMITS[subscriptionTier]?.debts || 10;
      
      userDebts.forEach((debt, index) => {
        const isOverLimit = limit !== -1 && index >= limit;
        
        formattedDebts.push({
          id: debt._id,
          creditorName: debt.creditorName || debt.debtorName,
          creditorPhone: debt.creditorPhone || debt.debtorPhone,
          amount: debt.amount,
          dueDate: debt.dueDate,
          status: debt.status,
          ownerName: debt.userId?.username || 'Noma\'lum',
          createdAt: debt.createdAt,
          debtor: {
            name: debt.debtorName,
            phone: debt.debtorPhone
          },
          subscriptionTier: subscriptionTier,
          isOverLimit: isOverLimit,
          debtIndex: index + 1,
          debtLimit: limit
        });
      });
    });

    // Sort by creation date
    formattedDebts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      debts: formattedDebts
    });
  } catch (error) {
    console.error('Error fetching all debts:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get SMS reminders data
router.get('/sms-reminders', authenticateAdmin, async (req, res) => {
  const models = getModels();
  const { template = '3days' } = req.query;
  
  // Test mode response
  if (!models) {
    const testData = [
      {
        userId: 'test-user-1',
        debtId: 'test-debt-1',
        debtorName: 'Ahmad Valiyev',
        phone: '+998901234567',
        amount: 1500000,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        daysLeft: 3,
        ownerName: 'Ali Karimov'
      },
      {
        userId: 'test-user-2',
        debtId: 'test-debt-2',
        debtorName: 'Bobur Toshev',
        phone: '+998902345678',
        amount: 2500000,
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        daysLeft: 1,
        ownerName: 'Dilshod Rahimov'
      },
      {
        userId: 'test-user-3',
        debtId: 'test-debt-3',
        debtorName: 'Malika Saidova',
        phone: '+998903456789',
        amount: 800000,
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
        daysLeft: -2,
        ownerName: 'Sardor Ahmadov'
      }
    ];

    // Filter based on template
    let filteredData = testData;
    if (template === '3days') {
      filteredData = testData.filter(item => item.daysLeft === 3);
    } else if (template === '1day') {
      filteredData = testData.filter(item => item.daysLeft === 1);
    } else if (template === 'overdue') {
      filteredData = testData.filter(item => item.daysLeft < 0);
    } else if (template === 'weekly') {
      filteredData = testData.filter(item => item.daysLeft >= 0 && item.daysLeft <= 7);
    }

    return res.json({
      success: true,
      smsData: filteredData
    });
  }

  try {
    const today = new Date();
    let dateFilter = {};

    // Set date filter based on template
    if (template === '3days') {
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);
      dateFilter = {
        dueDate: {
          $gte: new Date(threeDaysFromNow.setHours(0, 0, 0, 0)),
          $lt: new Date(threeDaysFromNow.setHours(23, 59, 59, 999))
        }
      };
    } else if (template === '1day') {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      dateFilter = {
        dueDate: {
          $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
          $lt: new Date(tomorrow.setHours(23, 59, 59, 999))
        }
      };
    } else if (template === 'overdue') {
      dateFilter = {
        dueDate: { $lt: new Date(today.setHours(0, 0, 0, 0)) },
        status: { $ne: 'paid' }
      };
    } else if (template === 'weekly') {
      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      dateFilter = {
        dueDate: {
          $gte: new Date(today.setHours(0, 0, 0, 0)),
          $lt: new Date(weekFromNow.setHours(23, 59, 59, 999))
        }
      };
    }

    // Get debts matching the criteria
    const debts = await models.Debt.find({
      ...dateFilter,
      status: { $ne: 'paid' }
    }).populate('userId', 'username');

    // Format data for SMS
    const smsData = debts.map(debt => {
      const dueDate = new Date(debt.dueDate);
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return {
        userId: debt.userId._id,
        debtId: debt._id,
        debtorName: debt.debtorName,
        phone: debt.debtorPhone,
        amount: debt.amount,
        dueDate: debt.dueDate,
        daysLeft: daysLeft,
        ownerName: debt.userId.username
      };
    });

    res.json({
      success: true,
      smsData: smsData
    });
  } catch (error) {
    console.error('Error fetching SMS reminders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get dashboard statistics
router.get('/dashboard-stats', authenticateAdmin, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      stats: {
        totalUsers: 156,
        activeUsers: 89,
        totalDebts: 1247,
        totalRevenue: 45678900,
        newUsersToday: 12,
        newDebtsToday: 34
      }
    });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Get statistics
    const [
      totalUsers,
      activeUsers,
      totalDebts,
      totalRevenue,
      newUsersToday,
      newDebtsToday
    ] = await Promise.all([
      models.User.countDocuments({ role: 'user' }),
      models.User.countDocuments({ role: 'user', isActive: true }),
      models.Debt.countDocuments({}),
      models.Debt.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      models.User.countDocuments({
        role: 'user',
        createdAt: { $gte: today, $lt: tomorrow }
      }),
      models.Debt.countDocuments({
        createdAt: { $gte: today, $lt: tomorrow }
      })
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        totalDebts,
        totalRevenue: revenue,
        newUsersToday,
        newDebtsToday
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;