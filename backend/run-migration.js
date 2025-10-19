#!/usr/bin/env node

import runMigration from './migrations/002_add_branch_support.js';

console.log('🔄 Starting migration to fix old debts without branches...\n');

// Run the migration
runMigration();