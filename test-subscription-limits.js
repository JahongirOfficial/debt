// Test subscription limits functionality
const testLimits = () => {
  console.log('🧪 Testing subscription limits...');
  
  // Test subscription limits configuration
  const SUBSCRIPTION_LIMITS = {
    free: { debts: 20, employees: 2, branches: 1 },
    lite: { debts: 70, employees: 3, branches: 2 },
    standard: { debts: 150, employees: 5, branches: 3 },
    pro: { debts: -1, employees: 15, branches: 10 }, // unlimited debts
    enterprise: { debts: -1, employees: -1, branches: -1 } // unlimited
  };

  console.log('📊 Subscription Limits:');
  Object.entries(SUBSCRIPTION_LIMITS).forEach(([tier, limits]) => {
    console.log(`  ${tier.toUpperCase()}:`);
    console.log(`    Qarzlar: ${limits.debts === -1 ? 'Cheksiz' : limits.debts}`);
    console.log(`    Xodimlar: ${limits.employees === -1 ? 'Cheksiz' : limits.employees}`);
    console.log(`    Filiallar: ${limits.branches === -1 ? 'Cheksiz' : limits.branches}`);
  });

  // Test limit checking function
  const checkLimits = (tier, usage) => {
    const limits = SUBSCRIPTION_LIMITS[tier] || SUBSCRIPTION_LIMITS.free;
    
    return {
      debts: limits.debts !== -1 && usage.debts > limits.debts,
      employees: limits.employees !== -1 && usage.employees > limits.employees,
      branches: limits.branches !== -1 && usage.branches > limits.branches
    };
  };

  // Test cases
  const testCases = [
    {
      tier: 'free',
      usage: { debts: 25, employees: 1, branches: 1 },
      expected: { debts: true, employees: false, branches: false }
    },
    {
      tier: 'lite',
      usage: { debts: 75, employees: 2, branches: 1 },
      expected: { debts: true, employees: false, branches: false }
    },
    {
      tier: 'standard',
      usage: { debts: 160, employees: 4, branches: 2 },
      expected: { debts: true, employees: false, branches: false }
    },
    {
      tier: 'pro',
      usage: { debts: 500, employees: 10, branches: 5 },
      expected: { debts: false, employees: false, branches: false }
    }
  ];

  console.log('\n🔍 Testing limit checks:');
  testCases.forEach((testCase, index) => {
    const result = checkLimits(testCase.tier, testCase.usage);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    
    console.log(`  Test ${index + 1} (${testCase.tier}): ${passed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`    Usage: ${JSON.stringify(testCase.usage)}`);
    console.log(`    Expected: ${JSON.stringify(testCase.expected)}`);
    console.log(`    Got: ${JSON.stringify(result)}`);
  });

  console.log('\n✅ Subscription limits test completed!');
};

// Run test
testLimits();