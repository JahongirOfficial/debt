import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

console.log('Testing Telegram bot...');
console.log('Bot token:', TELEGRAM_BOT_TOKEN ? 'Present' : 'Missing');

if (TELEGRAM_BOT_TOKEN) {
  try {
    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    
    // Test bot info
    bot.getMe().then(info => {
      console.log('Bot info:', info);
      console.log('Bot username:', info.username);
      
      // Test sending a message
      const testChatId = '5027595868'; // Your chat ID
      
      bot.sendMessage(testChatId, '🤖 Test message from Qarzdaftar bot!')
        .then(() => {
          console.log('Test message sent successfully!');
          process.exit(0);
        })
        .catch(error => {
          console.error('Error sending test message:', error);
          process.exit(1);
        });
    }).catch(error => {
      console.error('Error getting bot info:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Error creating bot:', error);
    process.exit(1);
  }
} else {
  console.error('Telegram bot token not found in .env file');
  process.exit(1);
}