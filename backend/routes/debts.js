import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Get models from server.js (they will be available through the app context)
const getModels = () => {
  if (mongoose.connection.readyState !== 1) {
    return null;
  }
  
  try {
    return {
      Debt: mongoose.model('Debt'),
      DebtHistory: mongoose.model('DebtHistory'),
      User: mongoose.model('User')
    };
  } catch (error) {
    return null;
  }
};

// Middleware to authenticate user (simplified version)
const authenticateToken = (req, res, next) => {
  // For testing without MongoDB, use test user
  if (!mongoose.connection.readyState) {
    req.user = { userId: 'test-user-id' };
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

  // In a real app, verify JWT token here
  // For now, extract user info from token (simplified)
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'qarzdaftar_jwt_secret_key';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Get all debts for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      debts: [
        {
          _id: 'test-debt-1',
          creditor: 'Ali Valiyev',
          amount: 1000000,
          description: 'Test qarz',
          phone: '90 123 45 67',
          countryCode: '+998',
          debtDate: '2024-01-15',
          status: 'pending',
          currency: 'UZS',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    });
  }

  try {
    const debts = await models.Debt.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      debts
    });
  } catch (error) {
    console.error('Error fetching debts:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new debt
router.post('/', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    const newDebt = {
      _id: 'test-debt-' + Date.now(),
      userId: req.user.userId,
      ...req.body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return res.status(201).json({
      success: true,
      debt: newDebt,
      message: 'Debt created successfully (test mode)'
    });
  }

  try {
    const debtData = {
      userId: req.user.userId,
      ...req.body,
      status: 'pending'
    };

    const debt = new models.Debt(debtData);
    await debt.save();

    // Create history record
    const historyRecord = new models.DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'created',
      amount: debt.amount,
      creditor: debt.creditor,
      description: debt.description,
      status: debt.status,
      reason: 'Debt created'
    });
    await historyRecord.save();

    res.status(201).json({
      success: true,
      debt,
      message: 'Debt created successfully'
    });
  } catch (error) {
    console.error('Error creating debt:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update debt
router.put('/:id', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      debt: {
        _id: req.params.id,
        userId: req.user.userId,
        ...req.body,
        updatedAt: new Date()
      },
      message: 'Debt updated successfully (test mode)'
    });
  }

  try {
    const { id } = req.params;
    const debt = await models.Debt.findOne({ _id: id, userId: req.user.userId });

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    const previousAmount = debt.amount;
    const updatedDebt = await models.Debt.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    // Create history record
    const historyRecord = new models.DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'updated',
      amount: updatedDebt.amount,
      previousAmount,
      newAmount: updatedDebt.amount,
      creditor: updatedDebt.creditor,
      description: updatedDebt.description,
      status: updatedDebt.status,
      reason: req.body.reason || 'Debt updated'
    });
    await historyRecord.save();

    res.json({
      success: true,
      debt: updatedDebt,
      message: 'Debt updated successfully'
    });
  } catch (error) {
    console.error('Error updating debt:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Mark debt as paid
router.patch('/:id/paid', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      debt: {
        _id: req.params.id,
        status: 'paid',
        paidAt: new Date(),
        updatedAt: new Date()
      },
      message: 'Debt marked as paid successfully (test mode)'
    });
  }

  try {
    const { id } = req.params;
    const { reason } = req.body;

    const debt = await models.Debt.findOne({ _id: id, userId: req.user.userId });

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    const updatedDebt = await models.Debt.findByIdAndUpdate(
      id,
      { 
        status: 'paid', 
        paidAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );

    // Create history record
    const historyRecord = new models.DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'paid',
      amount: debt.amount,
      creditor: debt.creditor,
      description: debt.description,
      status: 'paid',
      reason: reason || 'Debt marked as paid'
    });
    await historyRecord.save();

    res.json({
      success: true,
      debt: updatedDebt,
      message: 'Debt marked as paid successfully'
    });
  } catch (error) {
    console.error('Error marking debt as paid:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete debt
router.delete('/:id', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      message: 'Debt deleted successfully (test mode)'
    });
  }

  try {
    const { id } = req.params;
    const { reason } = req.body;

    const debt = await models.Debt.findOne({ _id: id, userId: req.user.userId });

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    // Create history record before deletion
    const historyRecord = new models.DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'deleted',
      amount: debt.amount,
      creditor: debt.creditor,
      description: debt.description,
      status: debt.status,
      reason: reason || 'Debt deleted'
    });
    await historyRecord.save();

    await models.Debt.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Debt deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting debt:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Adjust debt amount
router.patch('/:id/adjust', authenticateToken, async (req, res) => {
  const models = getModels();
  
  try {
    const { id } = req.params;
    const { amount, type, reason } = req.body;

    // Validate input
    if (!amount || !type || !['add', 'subtract'].includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid adjustment data' 
      });
    }

    // Test mode response
    if (!models) {
      const adjustmentAmount = parseFloat(amount);
      const mockCurrentAmount = 1000000; // Mock current amount
      const newAmount = type === 'add' 
        ? mockCurrentAmount + adjustmentAmount 
        : Math.max(0, mockCurrentAmount - adjustmentAmount);

      return res.json({
        success: true,
        debt: {
          _id: id,
          amount: newAmount,
          updatedAt: new Date()
        },
        message: 'Debt amount adjusted successfully (test mode)'
      });
    }

    const debt = await models.Debt.findOne({ _id: id, userId: req.user.userId });

    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    const adjustmentAmount = parseFloat(amount);
    const previousAmount = debt.amount;
    let newAmount;

    if (type === 'add') {
      newAmount = previousAmount + adjustmentAmount;
    } else { // subtract
      newAmount = Math.max(0, previousAmount - adjustmentAmount);
    }

    // Update debt amount
    const updatedDebt = await models.Debt.findByIdAndUpdate(
      id,
      { 
        amount: newAmount,
        updatedAt: new Date()
      },
      { new: true }
    );

    // Create history record
    const historyRecord = new models.DebtHistory({
      userId: req.user.userId,
      debtId: debt._id,
      action: 'adjustment',
      amount: adjustmentAmount,
      previousAmount,
      newAmount,
      creditor: debt.creditor,
      description: debt.description,
      status: debt.status,
      reason: reason || `Debt amount ${type === 'add' ? 'increased' : 'decreased'} by ${adjustmentAmount}`
    });
    await historyRecord.save();

    res.json({
      success: true,
      debt: updatedDebt,
      message: 'Debt amount adjusted successfully'
    });
  } catch (error) {
    console.error('Error adjusting debt amount:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get debt history
router.get('/:id/history', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      history: [
        {
          _id: 'test-history-1',
          action: 'created',
          amount: 1000000,
          creditor: 'Ali Valiyev',
          reason: 'Debt created',
          createdAt: new Date()
        }
      ]
    });
  }

  try {
    const { id } = req.params;

    // Verify debt belongs to user
    const debt = await models.Debt.findOne({ _id: id, userId: req.user.userId });
    if (!debt) {
      return res.status(404).json({
        success: false,
        message: 'Debt not found'
      });
    }

    const history = await models.DebtHistory.find({ debtId: id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Error fetching debt history:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;