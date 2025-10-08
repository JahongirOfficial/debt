import DailyReportService from './services/DailyReportService.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Mock models for testing
const mockModels = {
  User: {
    find: async (query) => {
      // Mock admin users
      return [
        {
          _id: 'admin1',
          username: 'admin',
          role: 'admin',
          telegramId: '123456789' // Replace with your actual Telegram ID for testing
        }
      ];
    }
  },
  Debt: {
    find: () => ({
      populate: () => ({
        sort: () => [
          {
            _id: 'debt1',
            creditor: 'Ali',
            amount: 5000000,
            currency: 'UZS',
            phone: '+998 77 310 98 28',
            debtDate: new Date('2025-07-10'),
            createdAt: new Date('2025-07-10'),
            status: 'pending',
            userId: { username: 'testuser' },
            description: 'Test qarz'
          },
          {
            _id: 'debt2',
            creditor: 'Vali',
            amount: 2000000,
            currency: 'UZS',
            phone: '+998 90 123 45 67',
            debtDate: new Date('2025-07-15'),
            createdAt: new Date('2025-07-12'),
            status: 'pending',
            userId: { username: 'testuser2' },
            description: 'Boshqa qarz'
          }
        ]
      })
    })
  }
};

// Mock Telegram bot
const mockTelegramBot = {
  bot: {
    sendMessage: async (chatId, message) => {
      console.log(`📤 Message to ${chatId}: ${message}`);
      return { message_id: 1 };
    },
    sendDocument: async (chatId, filePath, options) => {
      console.log(`📎 Document to ${chatId}: ${filePath}`);
      console.log(`📝 Caption: ${options.caption}`);
      return { message_id: 2 };
    }
  }
};

async function testDailyReports() {
  console.log('🧪 Testing Daily Report Service...\n');

  try {
    // Create service instance
    const dailyReportService = new DailyReportService(mockModels, mockTelegramBot);
    
    console.log('✅ Service created successfully\n');
    
    // Test manual report generation
    console.log('🔧 Testing manual report generation...');
    await dailyReportService.generateManualReport();
    
    console.log('\n✅ Test completed successfully!');
    console.log('\n📋 Check the temp_reports folder for generated files');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run test
testDailyReports();