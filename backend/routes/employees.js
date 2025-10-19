import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get models from server.js (they will be available through the app context)
const getModels = () => {
  if (mongoose.connection.readyState !== 1) {
    return null;
  }
  
  try {
    return {
      Employee: mongoose.model('Employee'),
      User: mongoose.model('User'),
      Branch: mongoose.model('Branch')
    };
  } catch (error) {
    return null;
  }
};

// Middleware to authenticate user
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

// Generate random avatar color
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

// Get all employees for user
router.get('/', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      employees: [
        {
          _id: 'test-employee-1',
          name: 'Ali Valiyev',
          phone: '+998901234567',
          position: 'Kassir',
          branchId: 'test-branch-1',
          branchName: 'Asosiy filial',
          permissions: {
            canAddDebt: true,
            canEditDebt: false,
            canDeleteDebt: false,
            canViewDebts: true,
            canManagePayments: true,
            canViewReports: false,
            canManageCreditors: false
          },
          isActive: true,
          hireDate: new Date(),
          generatedPassword: 'emp123456',
          employeeUsername: 'testuser'
        }
      ]
    });
  }

  try {
    const employees = await models.Employee.find({
      ownerId: req.user.userId,
      isActive: true
    }).populate('branchId', 'name').populate('employeeUserId', 'username');

    // Format employees for response
    const formattedEmployees = employees.map(emp => ({
      _id: emp._id,
      name: emp.name,
      phone: emp.phone,
      position: emp.position,
      branchId: emp.branchId._id,
      branchName: emp.branchId.name,
      permissions: emp.permissions,
      isActive: emp.isActive,
      hireDate: emp.hireDate,
      generatedPassword: emp.generatedPassword,
      employeeUsername: emp.employeeUserId.username
    }));

    res.json({
      success: true,
      employees: formattedEmployees
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add new employee
router.post('/', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      message: 'Employee added successfully (test mode)',
      employee: {
        _id: 'test-employee-new',
        name: req.body.name,
        phone: req.body.phone,
        position: req.body.position,
        branchId: req.body.branchId,
        permissions: req.body.permissions,
        generatedPassword: 'emp' + Math.random().toString(36).substr(2, 6),
        employeeUsername: req.body.phone.replace(/[^0-9]/g, '')
      }
    });
  }

  try {
    const { name, phone, position, branchId, permissions } = req.body;

    // Validation
    if (!name || !phone || !branchId) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and branch are required'
      });
    }

    // Verify branch ownership
    const branch = await models.Branch.findOne({
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

    // Check employee limit based on subscription tier
    const user = await models.User.findById(req.user.userId);
    const employeeCount = await models.Employee.countDocuments({
      ownerId: req.user.userId,
      isActive: true
    });

    // Employee limit = branch count (same as branch limit)
    const EMPLOYEE_LIMITS = {
      free: 1,
      lite: 2,
      standard: 3,
      pro: 5
    };

    const employeeLimit = EMPLOYEE_LIMITS[user.subscriptionTier] || 1;

    if (employeeCount >= employeeLimit) {
      return res.status(400).json({
        success: false,
        message: `Employee limit reached. Your ${user.subscriptionTier} plan allows ${employeeLimit} employees.`
      });
    }

    // Check if phone already exists
    const existingEmployee = await models.Employee.findOne({ phone });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this phone number already exists'
      });
    }

    // Generate password for employee
    const generatedPassword = 'emp' + Math.random().toString(36).substr(2, 6);
    
    // Create employee user account
    const employeeUsername = phone.replace(/[^0-9]/g, ''); // Use phone digits as username
    
    // Check if username already exists
    let finalUsername = employeeUsername;
    let counter = 1;
    while (await models.User.findOne({ username: finalUsername })) {
      finalUsername = employeeUsername + counter;
      counter++;
    }

    const employeeUser = new models.User({
      username: finalUsername,
      phone: phone,
      password: generatedPassword,
      subscriptionTier: 'free',
      role: 'employee',
      avatarColor: generateRandomAvatarColor()
    });

    console.log('Creating employee user:', employeeUser);
    await employeeUser.save();
    console.log('Employee user created successfully');

    // Create employee record
    const employee = new models.Employee({
      ownerId: req.user.userId,
      employeeUserId: employeeUser._id,
      branchId,
      name: name.trim(),
      phone: phone.trim(),
      position: position?.trim() || 'Xodim',
      permissions: permissions || {
        canAddDebt: false,
        canEditDebt: false,
        canDeleteDebt: false,
        canViewDebts: true,
        canManagePayments: false,
        canViewReports: false,
        canManageCreditors: false
      },
      generatedPassword
    });

    await employee.save();

    // Populate branch info for response
    await employee.populate('branchId', 'name');

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      employee: {
        _id: employee._id,
        name: employee.name,
        phone: employee.phone,
        position: employee.position,
        branchId: employee.branchId._id,
        branchName: employee.branchId.name,
        permissions: employee.permissions,
        isActive: employee.isActive,
        hireDate: employee.hireDate,
        generatedPassword: employee.generatedPassword,
        employeeUsername: finalUsername
      }
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// Update employee
router.put('/:id', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      message: 'Employee updated successfully (test mode)',
      employee: {
        _id: req.params.id,
        ...req.body,
        updatedAt: new Date()
      }
    });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = await models.Employee.findOne({
      _id: id,
      ownerId: req.user.userId
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Update employee
    const updatedEmployee = await models.Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('branchId', 'name').populate('employeeUserId', 'username');

    res.json({
      success: true,
      message: 'Employee updated successfully',
      employee: {
        _id: updatedEmployee._id,
        name: updatedEmployee.name,
        phone: updatedEmployee.phone,
        position: updatedEmployee.position,
        branchId: updatedEmployee.branchId._id,
        branchName: updatedEmployee.branchId.name,
        permissions: updatedEmployee.permissions,
        isActive: updatedEmployee.isActive,
        hireDate: updatedEmployee.hireDate,
        generatedPassword: updatedEmployee.generatedPassword,
        employeeUsername: updatedEmployee.employeeUserId.username
      }
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete employee
router.delete('/:id', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      message: 'Employee deleted successfully (test mode)'
    });
  }

  try {
    const { id } = req.params;

    const employee = await models.Employee.findOne({
      _id: id,
      ownerId: req.user.userId
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Soft delete - mark as inactive
    await models.Employee.findByIdAndUpdate(id, { isActive: false });

    // Also deactivate the user account
    await models.User.findByIdAndUpdate(employee.employeeUserId, { 
      status: 'suspended' 
    });

    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const models = getModels();
  
  // Test mode response
  if (!models) {
    return res.json({
      success: true,
      employee: {
        _id: req.params.id,
        name: 'Test Employee',
        phone: '+998901234567',
        position: 'Test Position',
        branchId: 'test-branch-1',
        permissions: {
          canAddDebt: true,
          canEditDebt: false,
          canDeleteDebt: false,
          canViewDebts: true,
          canManagePayments: false,
          canViewReports: false,
          canManageCreditors: false
        }
      }
    });
  }

  try {
    const { id } = req.params;

    const employee = await models.Employee.findOne({
      _id: id,
      ownerId: req.user.userId,
      isActive: true
    }).populate('branchId', 'name').populate('employeeUserId', 'username');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      employee: {
        _id: employee._id,
        name: employee.name,
        phone: employee.phone,
        position: employee.position,
        branchId: employee.branchId._id,
        branchName: employee.branchId.name,
        permissions: employee.permissions,
        isActive: employee.isActive,
        hireDate: employee.hireDate,
        generatedPassword: employee.generatedPassword,
        employeeUsername: employee.employeeUserId.username
      }
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;