/**
 * Migration utility to move localStorage data to MongoDB
 */
import { apiFetch } from './api'; // Import the api utility

// Function to migrate debts from localStorage to MongoDB
export const migrateDebts = async (token) => {
  try {
    // Get debts from localStorage
    const storedDebts = localStorage.getItem('qarzdaftar_debts');
    if (!storedDebts) {
      return { success: true, message: 'No debts to migrate' };
    }
    
    const debts = JSON.parse(storedDebts);
    if (!Array.isArray(debts) || debts.length === 0) {
      return { success: true, message: 'No debts to migrate' };
    }
    
    // Send debts to backend for migration
    const response = await apiFetch('/migrate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ debts }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Clear localStorage after successful migration
      localStorage.removeItem('qarzdaftar_debts');
      return { success: true, message: 'Debts migrated successfully', count: data.count };
    } else {
      return { success: false, message: data.message || 'Failed to migrate debts' };
    }
  } catch (error) {
    console.error('Migration error:', error);
    return { success: false, message: 'Network error during migration' };
  }
};

// Function to check if migration is needed
export const isMigrationNeeded = () => {
  const storedDebts = localStorage.getItem('qarzdaftar_debts');
  if (!storedDebts) return false;
  
  try {
    const debts = JSON.parse(storedDebts);
    return Array.isArray(debts) && debts.length > 0;
  } catch (error) {
    console.error('Error checking migration status:', error);
    return false;
  }
};

// Function to migrate all data
export const migrateAllData = async (token) => {
  try {
    // First migrate debts
    const debtMigrationResult = await migrateDebts(token);
    
    if (!debtMigrationResult.success) {
      return { success: false, message: `Debt migration failed: ${debtMigrationResult.message}` };
    }
    
    // Migration successful
    return { 
      success: true, 
      message: `Migration completed successfully. ${debtMigrationResult.count || 0} debts migrated.` 
    };
  } catch (error) {
    console.error('Migration error:', error);
    return { success: false, message: 'Network error during migration' };
  }
};