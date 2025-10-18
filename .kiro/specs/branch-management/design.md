# Design Document - Filiallarni Boshqarish Tizimi

## Overview

Filiallarni boshqarish tizimi qarzdaftarchaga ko'p filiallarni yaratish va har bir filial uchun alohida qarzlarni boshqarish imkonini beradi. Tizim React frontend va Node.js/Express backend asosida qurilgan bo'lib, MongoDB ma'lumotlar bazasidan foydalanadi. Har bir filial o'zining mustaqil qarz ro'yxati, hisobotlari va sozlamalariga ega bo'ladi.

## Architecture

### Frontend Architecture
- **React Context API** - filial holatini boshqarish uchun `BranchContext`
- **React Router** - filiallar o'rtasida navigatsiya
- **Modern UI Components** - filial tanlash va boshqarish uchun zamonaviy interfeys
- **Local Storage** - oxirgi faol filial ma'lumotlarini saqlash

### Backend Architecture
- **RESTful API** - filiallar va filial-specific qarzlar uchun endpoint-lar
- **MongoDB Models** - Branch, Debt (filial bilan bog'langan), BranchSettings
- **Middleware** - filial ruxsatlarini tekshirish va tarif cheklovlari
- **Subscription Validation** - tarif bo'yicha filiallar sonini cheklash

### Database Design
```
User Collection:
- _id
- username
- phone
- subscriptionTier (free, lite, standard, pro)
- activeBranchId (oxirgi faol filial)

Branch Collection:
- _id
- userId (owner)
- name
- description
- currency
- isActive
- createdAt
- updatedAt

Debt Collection (updated):
- _id
- userId
- branchId (yangi field)
- creditor
- amount
- description
- ...existing fields

BranchSettings Collection:
- _id
- branchId
- userId
- currency
- telegramNotifications
- reminderSettings
- customTemplates
```

## Components and Interfaces

### 1. Branch Management Components

#### BranchSelector Component
```jsx
// Filiallar ro'yxatini ko'rsatish va tanlash
<BranchSelector 
  branches={branches}
  activeBranch={activeBranch}
  onBranchSelect={handleBranchSelect}
  onCreateBranch={handleCreateBranch}
  userTier={userTier}
/>
```

**Props:**
- `branches`: Array - foydalanuvchi filiallari
- `activeBranch`: Object - joriy faol filial
- `onBranchSelect`: Function - filial tanlash callback
- `onCreateBranch`: Function - yangi filial yaratish callback
- `userTier`: String - foydalanuvchi tarifi

#### BranchCreateModal Component
```jsx
// Yangi filial yaratish modali
<BranchCreateModal
  isOpen={showCreateModal}
  onClose={handleCloseModal}
  onSubmit={handleCreateBranch}
  userTier={userTier}
  currentBranchCount={branches.length}
/>
```

#### BranchSettingsModal Component
```jsx
// Filial sozlamalari modali
<BranchSettingsModal
  isOpen={showSettingsModal}
  branch={selectedBranch}
  onClose={handleCloseModal}
  onUpdate={handleUpdateBranch}
/>
```

#### BranchAnalytics Component
```jsx
// Filial uchun analitika
<BranchAnalytics
  branchId={activeBranch.id}
  dateRange={dateRange}
  showComparison={showComparison}
/>
```

### 2. Context API Design

#### BranchContext
```jsx
const BranchContext = createContext({
  // State
  branches: [],
  activeBranch: null,
  loading: false,
  error: null,
  
  // Actions
  createBranch: () => {},
  updateBranch: () => {},
  deleteBranch: () => {},
  switchBranch: () => {},
  fetchBranches: () => {},
  
  // Subscription limits
  canCreateBranch: false,
  branchLimit: 1
});
```

### 3. API Endpoints Design

#### Branch Management Endpoints
```
GET    /api/branches              - Foydalanuvchi filiallarini olish
POST   /api/branches              - Yangi filial yaratish
PUT    /api/branches/:id          - Filialni yangilash
DELETE /api/branches/:id          - Filialni o'chirish
GET    /api/branches/:id/stats    - Filial statistikasi
```

#### Branch-Specific Debt Endpoints
```
GET    /api/branches/:id/debts    - Filial qarzlarini olish
POST   /api/branches/:id/debts    - Filialga qarz qo'shish
PUT    /api/debts/:id             - Qarzni yangilash (branchId tekshirish bilan)
DELETE /api/debts/:id             - Qarzni o'chirish (branchId tekshirish bilan)
```

#### Branch Settings Endpoints
```
GET    /api/branches/:id/settings - Filial sozlamalarini olish
PUT    /api/branches/:id/settings - Filial sozlamalarini yangilash
```

### 4. Subscription Tier Limits

#### Tier Configuration
```javascript
const BRANCH_LIMITS = {
  free: 1,
  lite: 2,
  standard: 3,
  pro: 5
};
```

#### Validation Middleware
```javascript
const validateBranchLimit = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  const branchCount = await Branch.countDocuments({ userId: user._id });
  const limit = BRANCH_LIMITS[user.subscriptionTier];
  
  if (branchCount >= limit) {
    return res.status(403).json({
      success: false,
      message: 'Branch limit exceeded for your subscription tier',
      currentCount: branchCount,
      limit: limit,
      tier: user.subscriptionTier
    });
  }
  
  next();
};
```

## Data Models

### Branch Model
```javascript
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
```

### Updated Debt Model
```javascript
// Existing debtSchema ga qo'shiladigan field
branchId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Branch',
  required: true,
  index: true
}

// Yangi compound index
debtSchema.index({ userId: 1, branchId: 1, status: 1 });
debtSchema.index({ branchId: 1, debtDate: 1 });
```

### BranchSettings Model
```javascript
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
```

## Error Handling

### Frontend Error Handling
```javascript
// BranchContext da error handling
const handleBranchError = (error, action) => {
  console.error(`Branch ${action} error:`, error);
  
  if (error.response?.status === 403) {
    // Subscription limit exceeded
    showError(t('branch.limitExceeded', 'Filiallar soni chegarasi oshdi'));
    setShowUpgradeModal(true);
  } else if (error.response?.status === 404) {
    // Branch not found
    showError(t('branch.notFound', 'Filial topilmadi'));
    fetchBranches(); // Refresh branches list
  } else {
    // Generic error
    showError(t('common.error', 'Xatolik yuz berdi'));
  }
};
```

### Backend Error Handling
```javascript
// Branch operations error handling
const handleBranchOperation = async (operation, req, res) => {
  try {
    const result = await operation();
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Branch operation error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Branch with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
```

## Testing Strategy

### Unit Tests
1. **Branch Model Tests**
   - Branch creation validation
   - Branch update operations
   - Branch deletion with debt checks

2. **BranchContext Tests**
   - State management
   - API integration
   - Error handling

3. **Subscription Validation Tests**
   - Tier limit enforcement
   - Upgrade/downgrade scenarios

### Integration Tests
1. **API Endpoint Tests**
   - Branch CRUD operations
   - Branch-specific debt operations
   - Settings management

2. **Database Tests**
   - Data consistency
   - Index performance
   - Migration scripts

### E2E Tests
1. **Branch Management Flow**
   - Create new branch
   - Switch between branches
   - Manage branch settings

2. **Subscription Limit Tests**
   - Attempt to exceed limits
   - Upgrade subscription flow
   - Downgrade handling

## UI/UX Design Considerations

### Branch Selector Design
- **Dropdown Style**: Modern dropdown with branch icons and colors
- **Quick Switch**: Keyboard shortcuts (Ctrl+1, Ctrl+2, etc.)
- **Visual Indicators**: Active branch highlighting, debt count badges

### Branch Creation Flow
- **Step-by-step wizard**: Name → Settings → Confirmation
- **Template Selection**: Pre-configured branch templates
- **Limit Warnings**: Clear messaging about subscription limits

### Branch Analytics
- **Comparison View**: Side-by-side branch performance
- **Export Options**: Branch-specific or combined reports
- **Visual Charts**: Branch-specific debt trends

### Mobile Responsiveness
- **Collapsible Branch Selector**: Space-efficient mobile design
- **Swipe Navigation**: Swipe between branches on mobile
- **Touch-friendly Controls**: Large touch targets for branch actions

## Performance Considerations

### Database Optimization
- **Compound Indexes**: Optimized queries for branch-specific data
- **Aggregation Pipelines**: Efficient branch statistics calculation
- **Connection Pooling**: Optimized database connections

### Frontend Optimization
- **Lazy Loading**: Load branch data on demand
- **Caching Strategy**: Cache branch settings and statistics
- **Virtual Scrolling**: Handle large debt lists efficiently

### API Optimization
- **Pagination**: Paginated branch debt lists
- **Selective Loading**: Load only necessary branch data
- **Response Compression**: Gzip compression for API responses

## Security Considerations

### Access Control
- **Branch Ownership**: Users can only access their own branches
- **Role-based Access**: Future admin access to user branches
- **API Authentication**: JWT token validation for all branch operations

### Data Validation
- **Input Sanitization**: Clean all branch and debt inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Sanitize user-generated content

### Audit Trail
- **Branch Operations Log**: Track all branch modifications
- **Debt Movement Tracking**: Log debt transfers between branches
- **User Activity Monitoring**: Monitor suspicious branch activities