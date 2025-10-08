import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

console.log('Test bot started...');

bot.on('message', (msg) => {
  console.log('Received message:', msg);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Test javob: ' + msg.text);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('Bot is listening for messages...');