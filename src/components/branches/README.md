# Branch Management Components

This directory contains all components related to branch management functionality in the Qarzdaftar application.

## Components Overview

### Core Components

#### BranchSelector
The main component for displaying and switching between branches.

**Props:**
- `onCreateBranch?: () => void` - Callback when create branch button is clicked

**Features:**
- Displays current active branch
- Dropdown with all available branches
- Search functionality for branches
- Keyboard shortcuts (Ctrl+1-5 for quick switching, Ctrl+B to open)
- Recent branches list
- Create branch button (if user has permission)
- Subscription limit warnings

**Usage:**
```jsx
import { BranchSelector } from './components/branches/BranchSelector';

function Sidebar() {
  const handleCreateBranch = () => {
    setShowCreateModal(true);
  };

  return (
    <BranchSelector onCreateBranch={handleCreateBranch} />
  );
}
```

#### BranchCreateModal
Modal for creating new branches.

**Props:**
- `isOpen: boolean` - Whether the modal is open
- `onClose: () => void` - Callback when modal is closed
- `onSuccess?: (branch: Branch) => void` - Callback when branch is created successfully

**Features:**
- Branch name and description input
- Currency selection
- Color picker with predefined colors
- Icon selection
- Form validation
- Subscription limit checking
- Loading states

**Usage:**
```jsx
import { BranchCreateModal } from './components/branches/BranchCreateModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = (branch) => {
    console.log('Branch created:', branch);
    setShowModal(false);
  };

  return (
    <BranchCreateModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onSuccess={handleSuccess}
    />
  );
}
```

#### BranchSettingsModal
Modal for editing branch settings.

**Props:**
- `isOpen: boolean` - Whether the modal is open
- `branch: Branch | null` - The branch to edit
- `onClose: () => void` - Callback when modal is closed
- `onSuccess?: (branch: Branch) => void` - Callback when branch is updated
- `onDelete?: (branch: Branch) => void` - Callback when delete button is clicked

**Features:**
- Edit branch name, description, currency, color, and icon
- Form validation
- Delete branch option
- Loading states
- Error handling

**Usage:**
```jsx
import { BranchSettingsModal } from './components/branches/BranchSettingsModal';

function BranchManager() {
  const [editingBranch, setEditingBranch] = useState(null);

  return (
    <BranchSettingsModal
      isOpen={!!editingBranch}
      branch={editingBranch}
      onClose={() => setEditingBranch(null)}
      onSuccess={(branch) => {
        console.log('Branch updated:', branch);
        setEditingBranch(null);
      }}
      onDelete={(branch) => {
        setShowDeleteModal(branch);
      }}
    />
  );
}
```

#### BranchDeleteModal
Modal for confirming branch deletion with debt transfer options.

**Props:**
- `isOpen: boolean` - Whether the modal is open
- `branch: Branch | null` - The branch to delete
- `onClose: () => void` - Callback when modal is closed
- `onSuccess?: () => void` - Callback when branch is deleted successfully

**Features:**
- Shows branch information
- Displays debt count in branch
- Options to transfer debts to another branch or delete them
- Confirmation warnings
- Loading states

**Usage:**
```jsx
import { BranchDeleteModal } from './components/branches/BranchDeleteModal';

function BranchManager() {
  const [deletingBranch, setDeletingBranch] = useState(null);

  return (
    <BranchDeleteModal
      isOpen={!!deletingBranch}
      branch={deletingBranch}
      onClose={() => setDeletingBranch(null)}
      onSuccess={() => {
        console.log('Branch deleted');
        setDeletingBranch(null);
      }}
    />
  );
}
```

### Utility Components

#### BranchSkeleton
Loading skeleton for branch components.

**Props:**
- None

**Usage:**
```jsx
import { BranchSkeleton } from './components/branches/BranchSkeleton';

function BranchList() {
  if (loading) {
    return <BranchSkeleton />;
  }
  
  return <BranchSelector />;
}
```

#### BranchListSkeleton
Loading skeleton for branch lists.

**Props:**
- `count?: number` - Number of skeleton items to show (default: 3)

**Usage:**
```jsx
import { BranchListSkeleton } from './components/branches/BranchSkeleton';

function BranchDropdown() {
  if (loading) {
    return <BranchListSkeleton count={5} />;
  }
  
  return <BranchList />;
}
```

## Context Integration

All branch components integrate with the `BranchContext` for state management:

```jsx
import { useBranches } from '../../utils/BranchContext';

function MyComponent() {
  const {
    branches,           // Array of user branches
    activeBranch,       // Currently active branch
    loading,            // Loading state
    error,              // Error state
    createBranch,       // Function to create branch
    updateBranch,       // Function to update branch
    deleteBranch,       // Function to delete branch
    switchBranch,       // Function to switch active branch
    fetchBranches,      // Function to refresh branches
    canCreateBranch,    // Boolean - can user create more branches
    branchLimit         // Number - max branches for user's tier
  } = useBranches();

  // Component logic here
}
```

## Styling and Theming

All components support both light and dark themes through the `useAuth` context:

```jsx
const { settings } = useAuth();
const isDark = settings.theme === 'dark';
```

Components use Tailwind CSS classes with conditional theming:

```jsx
className={`
  px-4 py-2 rounded-lg
  ${isDark 
    ? 'bg-gray-800 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-200'
  }
`}
```

## Animations

Branch components include smooth animations defined in `src/styles/branch-animations.css`:

- Branch switching animations
- Modal enter/exit animations
- Hover effects
- Loading states
- Success/error feedback

## Keyboard Shortcuts

The BranchSelector component supports keyboard shortcuts:

- `Ctrl+B` - Open branch selector
- `Ctrl+1-5` - Quick switch to branches 1-5
- `Escape` - Close branch selector

## Accessibility

All components follow accessibility best practices:

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## Error Handling

Components handle various error states:

- Network errors
- Validation errors
- Subscription limit errors
- Permission errors

Error messages are user-friendly and translated based on the current language setting.

## Internationalization

All text in components is internationalized using the translation system:

```jsx
import { useTranslation } from '../../utils/translationUtils';
import { useLanguage } from '../../utils/LanguageContext';

function MyComponent() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <button>
      {t('branch.create', 'Create Branch')}
    </button>
  );
}
```

## Testing

### Unit Testing

Test individual components with Jest and React Testing Library:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BranchSelector } from './BranchSelector';

test('renders branch selector', () => {
  render(<BranchSelector />);
  expect(screen.getByText('Branch Name')).toBeInTheDocument();
});
```

### Integration Testing

Test component interactions with context:

```jsx
import { render, screen } from '@testing-library/react';
import { BranchProvider } from '../../utils/BranchContext';
import { BranchSelector } from './BranchSelector';

test('creates branch successfully', async () => {
  render(
    <BranchProvider>
      <BranchSelector />
    </BranchProvider>
  );
  
  // Test branch creation flow
});
```

## Performance Considerations

- Components use React.memo for optimization where appropriate
- Large lists use virtual scrolling
- Images and icons are optimized
- API calls are debounced
- Local storage is used for caching

## Browser Support

Components are tested and supported in:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration Guide

### From Single Branch to Multi-Branch

If migrating from a single-branch system:

1. Run the migration script: `npm run migrate:branches`
2. Update components to use BranchContext
3. Add BranchProvider to your app root
4. Update API calls to include branchId

### Breaking Changes

- Debt creation now requires a branchId
- User model includes activeBranchId field
- API endpoints have changed for branch-specific operations

## Contributing

When contributing to branch components:

1. Follow the existing code style
2. Add proper TypeScript types
3. Include unit tests
4. Update documentation
5. Test in both light and dark themes
6. Verify accessibility compliance
7. Test keyboard navigation

## Examples

### Complete Branch Management Setup

```jsx
import React, { useState } from 'react';
import { BranchProvider } from '../utils/BranchContext';
import { BranchSelector } from './branches/BranchSelector';
import { BranchCreateModal } from './branches/BranchCreateModal';
import { BranchSettingsModal } from './branches/BranchSettingsModal';
import { BranchDeleteModal } from './branches/BranchDeleteModal';

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deletingBranch, setDeletingBranch] = useState(null);

  return (
    <BranchProvider>
      <div className="app">
        <BranchSelector 
          onCreateBranch={() => setShowCreateModal(true)} 
        />
        
        <BranchCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
        
        <BranchSettingsModal
          isOpen={!!editingBranch}
          branch={editingBranch}
          onClose={() => setEditingBranch(null)}
          onSuccess={() => setEditingBranch(null)}
          onDelete={(branch) => {
            setEditingBranch(null);
            setDeletingBranch(branch);
          }}
        />
        
        <BranchDeleteModal
          isOpen={!!deletingBranch}
          branch={deletingBranch}
          onClose={() => setDeletingBranch(null)}
          onSuccess={() => setDeletingBranch(null)}
        />
      </div>
    </BranchProvider>
  );
}
```

### Custom Branch Component

```jsx
import React from 'react';
import { useBranches } from '../utils/BranchContext';

function CustomBranchDisplay() {
  const { activeBranch, branches, switchBranch } = useBranches();

  if (!activeBranch) {
    return <div>No active branch</div>;
  }

  return (
    <div className="branch-display">
      <h2>{activeBranch.name}</h2>
      <p>{activeBranch.description}</p>
      
      <select 
        value={activeBranch._id}
        onChange={(e) => {
          const branch = branches.find(b => b._id === e.target.value);
          if (branch) switchBranch(branch);
        }}
      >
        {branches.map(branch => (
          <option key={branch._id} value={branch._id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```