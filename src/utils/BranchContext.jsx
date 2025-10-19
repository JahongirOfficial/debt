import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

// Create the context
const BranchContext = createContext();

// Branch limits by subscription tier
const BRANCH_LIMITS = {
    free: 1,
    lite: 2,
    standard: 3,
    pro: 5
};

// Provider component
export const BranchProvider = ({ children }) => {
    const { user } = useAuth();
    const { showSuccess, showError } = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [activeBranch, setActiveBranch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSwitchTime, setLastSwitchTime] = useState(0);

    // Get branch limit for current user
    const branchLimit = user ? BRANCH_LIMITS[user.subscriptionTier] || 1 : 1;
    const canCreateBranch = branches.length < branchLimit;

    // Load active branch from localStorage
    useEffect(() => {
        if (user && branches.length > 0) {
            // For employees, always set their assigned branch as active
            if (user.role === 'employee' && user.assignedBranchId) {
                const assignedBranch = branches.find(b => b._id === user.assignedBranchId);
                if (assignedBranch && (!activeBranch || activeBranch._id !== assignedBranch._id)) {
                    setActiveBranch(assignedBranch);
                    localStorage.setItem(`activeBranchId_${user.id}`, assignedBranch._id);
                }
                return;
            }

            // For regular users, use saved branch or first branch
            const savedActiveBranchId = localStorage.getItem(`activeBranchId_${user.id}`);

            if (savedActiveBranchId) {
                const savedBranch = branches.find(b => b._id === savedActiveBranchId);
                if (savedBranch) {
                    setActiveBranch(savedBranch);
                    return;
                }
            }

            // If no saved branch or saved branch not found, use first branch
            if (!activeBranch && branches.length > 0) {
                setActiveBranch(branches[0]);
                localStorage.setItem(`activeBranchId_${user.id}`, branches[0]._id);
            }
        }
    }, [user, branches, activeBranch]);

    // Fetch branches from API
    const fetchBranches = async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/branches', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                // Sort branches by creation date and mark excess branches as disabled
                const sortedBranches = data.branches.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                const processedBranches = sortedBranches.map((branch, index) => ({
                    ...branch,
                    isDisabled: index >= branchLimit // Disable branches beyond the limit
                }));
                
                setBranches(processedBranches);

                // If no branches exist, create a default one
                if (data.branches.length === 0) {
                    await createDefaultBranch();
                }
            } else {
                throw new Error(data.message || 'Failed to fetch branches');
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
            setError(error.message);
            showError('Filiallarni yuklashda xatolik yuz berdi');
        } finally {
            setLoading(false);
        }
    };

    // Create default branch for new users
    const createDefaultBranch = async () => {
        try {
            const defaultBranch = {
                name: 'Asosiy filial',
                description: 'Sizning asosiy filialingiz',
                currency: 'UZS',
                color: '#3B82F6',
                icon: 'building'
            };

            const result = await createBranch(defaultBranch);
            if (result.success) {
                console.log('Default branch created successfully');
            }
        } catch (error) {
            console.error('Error creating default branch:', error);
        }
    };

    // Create new branch
    const createBranch = async (branchData) => {
        if (!canCreateBranch) {
            showError(`Sizning tarifingizda faqat ${branchLimit} ta filial yaratish mumkin`);
            return { success: false, message: 'Branch limit exceeded' };
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/branches', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(branchData)
            });

            const data = await response.json();

            if (data.success) {
                setBranches(prev => [...prev, data.branch]);

                // If this is the first branch, set it as active
                if (branches.length === 0) {
                    setActiveBranch(data.branch);
                    localStorage.setItem(`activeBranchId_${user.id}`, data.branch._id);
                }

                showSuccess('Filial muvaffaqiyatli yaratildi');
                return { success: true, branch: data.branch };
            } else {
                if (data.upgradeRequired) {
                    showError(`Filiallar soni chegarasi oshdi. Tarifni yangilang.`);
                } else {
                    showError(data.message || 'Filial yaratishda xatolik yuz berdi');
                }
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error creating branch:', error);
            showError('Filial yaratishda xatolik yuz berdi');
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Update branch
    const updateBranch = async (branchId, updateData) => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/branches/${branchId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            if (data.success) {
                setBranches(prev =>
                    prev.map(branch =>
                        branch._id === branchId ? data.branch : branch
                    )
                );

                // Update active branch if it's the one being updated
                if (activeBranch && activeBranch._id === branchId) {
                    setActiveBranch(data.branch);
                }

                showSuccess('Filial muvaffaqiyatli yangilandi');
                return { success: true, branch: data.branch };
            } else {
                showError(data.message || 'Filial yangilashda xatolik yuz berdi');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating branch:', error);
            showError('Filial yangilashda xatolik yuz berdi');
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Delete branch
    const deleteBranch = async (branchId, forceDelete = false) => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = forceDelete 
                ? `/api/branches/${branchId}?forceDelete=true`
                : `/api/branches/${branchId}`;
                
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setBranches(prev => prev.filter(branch => branch._id !== branchId));

                // If deleted branch was active, switch to another branch
                if (activeBranch && activeBranch._id === branchId) {
                    const remainingBranches = branches.filter(branch => branch._id !== branchId);
                    if (remainingBranches.length > 0) {
                        setActiveBranch(remainingBranches[0]);
                        localStorage.setItem(`activeBranchId_${user.id}`, remainingBranches[0]._id);
                    } else {
                        setActiveBranch(null);
                        localStorage.removeItem(`activeBranchId_${user.id}`);
                    }
                }

                const message = data.deletedDebts > 0 
                    ? `Filial va ${data.deletedDebts} ta qarz muvaffaqiyatli o'chirildi`
                    : 'Filial muvaffaqiyatli o\'chirildi';
                showSuccess(message);
                return { success: true };
            } else {
                showError(data.message || 'Filial o\'chirishda xatolik yuz berdi');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error deleting branch:', error);
            showError('Filial o\'chirishda xatolik yuz berdi');
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Switch active branch with URL routing support
    const switchBranch = (branch, updateUrl = true, showToast = true) => {
        if (!branch || branch._id === activeBranch?._id) return;
        
        // Prevent switching to disabled branches
        if (branch.isDisabled) {
            showError('Bu filial sizning tarif limitingizdan tashqarida. Tarifni yangilang yoki boshqa filialni tanlang.');
            return;
        }

        // Prevent employees from switching to branches they're not assigned to
        if (user?.role === 'employee' && user?.assignedBranchId && branch._id !== user.assignedBranchId) {
            showError('Siz faqat tayinlangan filialingizda ishlashingiz mumkin.');
            return;
        }

        setActiveBranch(branch);
        localStorage.setItem(`activeBranchId_${user.id}`, branch._id);

        // Update URL if needed (for deep linking support)
        if (updateUrl && location.pathname !== '/login' && location.pathname !== '/register') {
            // Add branch parameter to current URL without changing the route
            const currentPath = location.pathname;
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('branch', branch._id);

            // Use replace to avoid adding to browser history for every branch switch
            navigate(`${currentPath}?${searchParams.toString()}`, { replace: true });
        }

        // Only show toast if explicitly requested and prevent duplicate toasts
        if (showToast) {
            const now = Date.now();
            // Prevent showing toast if last switch was less than 500ms ago
            if (now - lastSwitchTime > 500) {
                showSuccess(`${branch.name} filialiga o'tildi`);
                setLastSwitchTime(now);
            }
        }
    };

    // Handle URL branch parameter changes
    useEffect(() => {
        if (user && branches.length > 0) {
            const searchParams = new URLSearchParams(location.search);
            const branchIdFromUrl = searchParams.get('branch');

            if (branchIdFromUrl && branchIdFromUrl !== activeBranch?._id) {
                const branchFromUrl = branches.find(b => b._id === branchIdFromUrl);
                if (branchFromUrl) {
                    // Switch branch without updating URL and without showing toast to avoid infinite loop
                    switchBranch(branchFromUrl, false, false);
                }
            }
        }
    }, [location.search, branches, user, activeBranch]);

    // Fetch branches when user changes
    useEffect(() => {
        if (user) {
            fetchBranches();
        } else {
            setBranches([]);
            setActiveBranch(null);
            setError(null);
        }
    }, [user]);

    const value = {
        // State
        branches,
        activeBranch,
        loading,
        error,

        // Actions
        createBranch,
        updateBranch,
        deleteBranch,
        switchBranch,
        fetchBranches,

        // Subscription limits
        canCreateBranch,
        branchLimit
    };

    return (
        <BranchContext.Provider value={value}>
            {children}
        </BranchContext.Provider>
    );
}

export function useBranches() {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error('useBranches must be used within a BranchProvider');
    }
    return context;
}

export { BranchContext };