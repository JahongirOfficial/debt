import TelegramBot from 'node-telegram-bot-api';
import crypto from 'crypto';
import XLSX from 'xlsx';
import XLSXStyle from 'xlsx-style';
import fs from 'fs-extra';
import path from 'path';

class TelegramBotHandler {
  constructor(botToken, models, useWebhook = false) {
    this.botToken = botToken;
    this.models = models; // { User, TelegramSession, Debt, DebtHistory }
    this.isPolling = false;
    this.useWebhook = useWebhook;
    this.tempDir = path.join(process.cwd(), 'temp_files');

    try {
      this.bot = new TelegramBot(botToken, {
        polling: false, // Start with polling disabled
        webHook: false
      });

      this.setupCommands();
      this.setupErrorHandling();
      this.ensureTempDirectory();

      // Start bot with minimal delay
      setTimeout(async () => {
        if (this.useWebhook) {
          this.setupWebhook();
        } else {
          await this.startPolling();
        }
      }, 1000); // Minimal delay

      console.log('Telegram bot initialized successfully');
    } catch (error) {
      console.error('Error initializing Telegram bot:', error);
      throw error;
    }
  }

  async startPolling() {
    try {
      if (this.isPolling) {
        console.log('⚠️  Bot is already polling, skipping start');
        return;
      }

      console.log('🔄 Starting Telegram bot polling...');

      // Start polling without force stopping
      await this.bot.startPolling();
      this.isPolling = true;
      console.log('✅ Telegram bot polling started successfully');

    } catch (error) {
      console.error('❌ Error in startPolling:', error.message);
      this.isPolling = false;

      // Don't retry automatically - just log the error
      console.log('❌ Bot polling failed. Manual restart required.');
    }
  }

  setupWebhook() {
    // Webhook setup for production
    console.log('🔗 Setting up webhook mode (not implemented yet)');
    // TODO: Implement webhook mode for production
  }

  setupCommands() {
    // Processed messages tracker to prevent duplicates
    this.processedMessages = new Set();

    // Single message handler to prevent duplicates
    this.bot.on('message', async (msg) => {
      // Skip if message already processed
      if (this.processedMessages.has(msg.message_id)) {
        console.log(`⚠️ Skipping duplicate message ${msg.message_id}`);
        return;
      }

      // Add to processed messages
      this.processedMessages.add(msg.message_id);

      // Clean up old processed messages (keep only last 1000)
      if (this.processedMessages.size > 1000) {
        const oldMessages = Array.from(this.processedMessages).slice(0, 500);
        oldMessages.forEach(id => this.processedMessages.delete(id));
      }

      // Skip non-text messages
      if (!msg.text) return;

      const text = msg.text.trim();

      try {
        // Handle commands
        if (text.startsWith('/start')) {
          const match = text.match(/\/start(.*)/);
          await this.handleStart(msg, match);
        } else if (text === '/help') {
          await this.handleHelp(msg);
        } else if (text === '/tomorrow') {
          await this.handleTomorrowDebts(msg);
        } else if (text === '/today') {
          await this.handleTodayDebts(msg);
        } else if (text === '/week') {
          await this.handleWeekDebts(msg);
        } else if (text === '/stats') {
          await this.handleStats(msg);
        } else if (text === '/all') {
          await this.handleAllDebts(msg);
        } else if (text.startsWith('/') && !this.isKnownCommand(text)) {
          await this.handleUnknownCommand(msg);
        }
      } catch (error) {
        console.error(`Error handling message ${msg.message_id}:`, error);
      }
    });
  }

  setupErrorHandling() {
    this.bot.on('error', (error) => {
      console.error('Telegram bot error:', error.message);
    });

    this.bot.on('polling_error', (error) => {
      console.error('Telegram bot polling error:', error.message);

      // Just mark as not polling, don't attempt restart
      this.isPolling = false;
      console.log('❌ Bot polling stopped due to error. Manual restart required.');
    });
  }

  isKnownCommand(text) {
    const knownCommands = ['/start', '/help', '/tomorrow', '/today', '/week', '/stats', '/all'];
    return knownCommands.some(cmd => text.startsWith(cmd));
  }

  async handleStart(msg, match) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();
    const username = msg.from.username || msg.from.first_name || 'Unknown';

    // Parameter ni to'g'ri olish va URL decode qilish
    let parameter = match && match[1] ? match[1].trim() : '';

    // URL decode qilish (bo'shliqlar va boshqa maxsus belgilar uchun)
    if (parameter) {
      try {
        parameter = decodeURIComponent(parameter);
        console.log(`Decoded parameter: "${parameter}"`);
      } catch (error) {
        console.log(`Failed to decode parameter, using original: "${parameter}"`);
      }
    }

    try {
      console.log(`Start command from ${username} (${telegramId}), parameter: "${parameter}"`);

      // Agar parameter mavjud bo'lsa, bu connection token
      if (parameter && parameter.length > 0) {
        console.log(`Processing connection with token: ${parameter}`);
        await this.handleConnectionWithToken(chatId, telegramId, username, parameter);
      } else {
        console.log(`Processing simple start command`);
        // Oddiy start command
        await this.handleSimpleStart(chatId, telegramId, username);
      }
    } catch (error) {
      console.error('Error in handleStart:', error);
      await this.bot.sendMessage(chatId,
        '❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring yoki admin bilan bog\'laning.\n\n' +
        `🔧 Xatolik: ${error.message}`
      );
    }
  }

  async handleConnectionWithToken(chatId, telegramId, username, token) {
    try {
      console.log(`Attempting connection with token: ${token} for user ${username} (${telegramId})`);

      // Validate token format
      if (!token || token.length < 3) {
        await this.bot.sendMessage(chatId,
          '❌ Noto\'g\'ri bog\'lanish kodi formati. Iltimos, qarzdaftar.uz saytidan qayta urinib ko\'ring.'
        );
        return;
      }

      // Token orqali foydalanuvchini topish va bog'lash
      // Pastgi chiziqlarni bo'sh joy bilan almashtirish
      const originalToken = token;
      const tokenWithSpaces = token.replace(/_/g, ' ');

      // Token username yoki phone bo'lishi mumkin
      let searchQuery = {
        $or: [
          { username: originalToken },
          { username: tokenWithSpaces },
          { phone: originalToken },
          { phone: tokenWithSpaces }
        ]
      };

      // Only add _id search if token looks like a valid ObjectId (24 hex characters)
      if (/^[0-9a-fA-F]{24}$/.test(originalToken)) {
        searchQuery.$or.push({ _id: originalToken });
      }

      // Case-insensitive qidiruv ham qo'shish
      searchQuery.$or.push(
        { username: { $regex: new RegExp(`^${originalToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
        { username: { $regex: new RegExp(`^${tokenWithSpaces.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }
      );

      console.log(`Search query:`, JSON.stringify(searchQuery, null, 2));

      const user = await this.models.User.findOne(searchQuery);

      console.log(`User found:`, user ? `${user.username} (${user._id})` : 'Not found');

      if (!user) {
        // Qo'shimcha debug: barcha foydalanuvchilarni ko'rsatish
        const allUsers = await this.models.User.find({}, 'username phone _id').limit(5);
        console.log(`Available users (first 5):`, allUsers.map(u => ({ username: u.username, phone: u.phone, id: u._id })));
      }

      if (!user) {
        await this.bot.sendMessage(chatId,
          '❌ Noto\'g\'ri bog\'lanish kodi. Iltimos, qarzdaftar.uz saytidan qayta urinib ko\'ring.\n\n' +
          `🔍 Qidirilgan kod: ${token}`
        );
        return;
      }

      // Foydalanuvchi allaqachon bog'langanligini tekshirish
      if (user.telegramId && user.telegramId !== telegramId) {
        await this.bot.sendMessage(chatId,
          '⚠️ Bu hisob boshqa Telegram akkaunt bilan bog\'langan. Admin bilan bog\'laning.\n\n' +
          `📱 Joriy Telegram ID: ${user.telegramId}\n` +
          `🆕 Yangi Telegram ID: ${telegramId}`
        );
        return;
      }

      // Foydalanuvchini bog'lash
      user.telegramId = telegramId;
      user.telegramUsername = username;
      user.telegramConnectedAt = new Date();
      await user.save();

      console.log(`User ${user.username} successfully connected to Telegram ID ${telegramId}`);

      // Session yaratish
      const sessionToken = crypto.randomBytes(32).toString('hex');

      // Eski sessionlarni o'chirish
      await this.models.TelegramSession.deleteMany({
        $or: [
          { userId: user._id },
          { telegramId: telegramId }
        ]
      });

      const session = new this.models.TelegramSession({
        userId: user._id,
        telegramId: telegramId,
        sessionToken: sessionToken,
        isActive: true,
        connectedAt: new Date(),
        lastActivity: new Date()
      });
      await session.save();

      console.log(`Session created for user ${user.username}`);

      await this.bot.sendMessage(chatId,
        `✅ Muvaffaqiyatli bog'landingiz!\n\n` +
        `👤 Foydalanuvchi: ${user.username}\n` +
        `📱 Telefon: ${user.phone}\n` +
        `🕐 Bog'lanish vaqti: ${new Date().toLocaleString('uz-UZ')}\n\n` +
        `Endi siz quyidagi buyruqlardan foydalanishingiz mumkin:\n\n` +
        `📋 /tomorrow - Ertaga muddati tugaydigan qarzlar\n` +
        `📅 /today - Bugun muddati tugaydigan qarzlar\n` +
        `📆 /week - Bir hafta ichidagi qarzlar\n` +
        `📊 /stats - Umumiy statistika\n` +
        `❓ /help - Yordam`
      );
    } catch (error) {
      console.error('Error in handleConnectionWithToken:', error);
      await this.bot.sendMessage(chatId,
        '❌ Bog\'lanishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring yoki admin bilan bog\'laning.\n\n' +
        `🔧 Xatolik: ${error.message}`
      );
    }
  }

  async handleSimpleStart(chatId, telegramId, username) {
    try {
      console.log(`Checking if user with Telegram ID ${telegramId} exists`);

      // Foydalanuvchi allaqachon bog'langanligini tekshirish
      const user = await this.models.User.findOne({ telegramId: telegramId });

      if (user) {
        console.log(`Found existing user: ${user.username}`);

        // Session ni yangilash
        await this.models.TelegramSession.updateOne(
          { telegramId: telegramId, isActive: true },
          { lastActivity: new Date() }
        );

        await this.bot.sendMessage(chatId,
          `👋 Salom, ${user.username}!\n\n` +
          `Siz allaqachon bog'langansiz. Quyidagi buyruqlardan foydalanishingiz mumkin:\n\n` +
          `📋 /tomorrow - Ertaga muddati tugaydigan qarzlar\n` +
          `📅 /today - Bugun muddati tugaydigan qarzlar\n` +
          `📆 /week - Bir hafta ichidagi qarzlar\n` +
          `📊 /stats - Umumiy statistika\n` +
          `❓ /help - Yordam\n\n` +
          `🕐 Oxirgi faollik: ${new Date().toLocaleString('uz-UZ')}`
        );
      } else {
        console.log(`No user found with Telegram ID ${telegramId}`);

        await this.bot.sendMessage(chatId,
          `👋 Salom, ${username}!\n\n` +
          `Bu Qarzdaftar rasmiy botidir. Botdan foydalanish uchun avval qarzdaftar.uz saytida ro'yxatdan o'ting va Telegram bilan bog'lang.\n\n` +
          `🔗 Bog'lanish bosqichlari:\n` +
          `1️⃣ qarzdaftar.uz saytiga kiring\n` +
          `2️⃣ Hisobingizga kiring\n` +
          `3️⃣ Sozlamalar bo'limida "Telegram bog'lash" tugmasini bosing\n` +
          `4️⃣ Maxsus havola orqali botga qaytib keling\n\n` +
          `🌐 Sayt: https://qarzdaftar.uz\n` +
          `❓ Yordam uchun: /help`
        );
      }
    } catch (error) {
      console.error('Error in handleSimpleStart:', error);
      await this.bot.sendMessage(chatId,
        '❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.\n\n' +
        `🔧 Xatolik: ${error.message}`
      );
    }
  }

  async handleHelp(msg) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();

    const user = await this.models.User.findOne({ telegramId: telegramId });

    if (!user) {
      await this.bot.sendMessage(chatId,
        `ℹ️ Qarzdaftar Bot Yordam\n\n` +
        `Bu bot qarzdaftar.uz saytining rasmiy botidir.\n\n` +
        `🔗 Bog'lanish:\n` +
        `1. qarzdaftar.uz saytida ro'yxatdan o'ting\n` +
        `2. Saytda Telegram bog'lash tugmasini bosing\n` +
        `3. Botga qaytib /start buyrug'ini yuboring\n\n` +
        `📞 Yordam: @qarzdaftar_support`
      );
      return;
    }

    await this.bot.sendMessage(chatId,
      `ℹ️ Qarzdaftar Bot Buyruqlari\n\n` +
      `📋 Mavjud buyruqlar:\n\n` +
      `/tomorrow - Ertaga muddati tugaydigan qarzlar ro'yxati\n` +
      `/today - Bugun muddati tugaydigan qarzlar ro'yxati\n` +
      `/week - Bir hafta ichidagi qarzlar ro'yxati\n` +
      `/all - Barcha qarzlar ro'yxati (Excel formatida)\n` +
      `/stats - Umumiy qarzlar statistikasi\n` +
      `/help - Bu yordam xabari\n\n` +
      `� YFayllar Excel formatida yuboriladi.\n\n` +
      `📞 Yordam: @qarzdaftar_support`
    );
  }

  async handleTomorrowDebts(msg) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();

    try {
      const user = await this.verifyUser(chatId, telegramId);
      if (!user) return;

      const initialMessage = await this.bot.sendMessage(chatId, '⏳ Ertaga muddati tugaydigan qarzlar tekshirilmoqda...');

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const endOfTomorrow = new Date(tomorrow);
      endOfTomorrow.setHours(23, 59, 59, 999);

      const debts = await this.models.Debt.find({
        userId: user._id,
        status: 'pending',
        debtDate: {
          $gte: tomorrow,
          $lte: endOfTomorrow
        }
      }).sort({ debtDate: 1 });

      if (debts.length === 0) {
        await this.bot.editMessageText('✅ Ertaga muddati tugaydigan qarzlar yo\'q!', {
          chat_id: chatId,
          message_id: initialMessage.message_id
        });
        return;
      }

      await this.sendDebtsAsFiles(chatId, debts, 'tomorrow', initialMessage.message_id);

    } catch (error) {
      console.error('Error in handleTomorrowDebts:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  }

  async handleTodayDebts(msg) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();

    try {
      const user = await this.verifyUser(chatId, telegramId);
      if (!user) return;

      const initialMessage = await this.bot.sendMessage(chatId, '⏳ Bugun muddati tugaydigan qarzlar tekshirilmoqda...');

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);

      const debts = await this.models.Debt.find({
        userId: user._id,
        status: 'pending',
        debtDate: {
          $gte: today,
          $lte: endOfToday
        }
      }).sort({ debtDate: 1 });

      if (debts.length === 0) {
        await this.bot.editMessageText('✅ Bugun muddati tugaydigan qarzlar yo\'q!', {
          chat_id: chatId,
          message_id: initialMessage.message_id
        });
        return;
      }

      await this.sendDebtsAsFiles(chatId, debts, 'today', initialMessage.message_id);

    } catch (error) {
      console.error('Error in handleTodayDebts:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  }

  async handleWeekDebts(msg) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();

    try {
      const user = await this.verifyUser(chatId, telegramId);
      if (!user) return;

      const initialMessage = await this.bot.sendMessage(chatId, '⏳ Bir hafta ichidagi qarzlar tekshirilmoqda...');

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const weekLater = new Date(today);
      weekLater.setDate(weekLater.getDate() + 7);
      weekLater.setHours(23, 59, 59, 999);

      const debts = await this.models.Debt.find({
        userId: user._id,
        status: 'pending',
        debtDate: {
          $gte: today,
          $lte: weekLater
        }
      }).sort({ debtDate: 1 });

      if (debts.length === 0) {
        await this.bot.editMessageText('✅ Bir hafta ichida muddati tugaydigan qarzlar yo\'q!', {
          chat_id: chatId,
          message_id: initialMessage.message_id
        });
        return;
      }

      await this.sendDebtsAsFiles(chatId, debts, 'week', initialMessage.message_id);

    } catch (error) {
      console.error('Error in handleWeekDebts:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  }

  async handleStats(msg) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();

    try {
      const user = await this.verifyUser(chatId, telegramId);
      if (!user) return;

      const totalDebts = await this.models.Debt.countDocuments({ userId: user._id });
      const pendingDebts = await this.models.Debt.countDocuments({ userId: user._id, status: 'pending' });
      const paidDebts = await this.models.Debt.countDocuments({ userId: user._id, status: 'paid' });

      const totalAmount = await this.models.Debt.aggregate([
        { $match: { userId: user._id, status: 'pending' } },
        { $group: { _id: '$currency', total: { $sum: '$amount' } } }
      ]);

      let amountText = '';
      if (totalAmount.length > 0) {
        amountText = totalAmount.map(item =>
          `${item.total.toLocaleString()} ${item._id}`
        ).join('\n');
      } else {
        amountText = '0 UZS';
      }

      const statsMessage =
        `📊 Qarzlar Statistikasi\n\n` +
        `👤 Foydalanuvchi: ${user.username}\n\n` +
        `📋 Umumiy qarzlar: ${totalDebts}\n` +
        `⏳ Kutilayotgan: ${pendingDebts}\n` +
        `✅ To'langan: ${paidDebts}\n\n` +
        `💰 Umumiy qarz miqdori:\n${amountText}\n\n` +
        `📅 Hisobot sanasi: ${new Date().toLocaleDateString('uz-UZ')}`;

      await this.bot.sendMessage(chatId, statsMessage);

    } catch (error) {
      console.error('Error in handleStats:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  }

  async handleAllDebts(msg) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();

    try {
      const user = await this.verifyUser(chatId, telegramId);
      if (!user) return;

      const initialMessage = await this.bot.sendMessage(chatId, '⏳ Barcha qarzlar ro\'yxati tayyorlanmoqda...');

      const allDebts = await this.models.Debt.find({
        userId: user._id
      }).sort({ createdAt: -1 });

      if (allDebts.length === 0) {
        await this.bot.editMessageText('✅ Sizda hech qanday qarz yo\'q!', {
          chat_id: chatId,
          message_id: initialMessage.message_id
        });
        return;
      }

      await this.sendDebtsAsFiles(chatId, allDebts, 'all', initialMessage.message_id);

    } catch (error) {
      console.error('Error in handleAllDebts:', error);
      await this.bot.sendMessage(chatId, '❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  }

  async handleUnknownCommand(msg) {
    const chatId = msg.chat.id;
    await this.bot.sendMessage(chatId,
      '❓ Noma\'lum buyruq. Yordam uchun /help buyrug\'ini yuboring.'
    );
  }

  async verifyUser(chatId, telegramId) {
    const user = await this.models.User.findOne({ telegramId: telegramId });

    if (!user) {
      await this.bot.sendMessage(chatId,
        '❌ Siz ro\'yxatdan o\'tmagansiz. Avval qarzdaftar.uz saytida ro\'yxatdan o\'ting va Telegram bilan bog\'lang.'
      );
      return null;
    }

    if (user.status !== 'active') {
      await this.bot.sendMessage(chatId,
        '❌ Hisobingiz faol emas. Admin bilan bog\'laning.'
      );
      return null;
    }

    // Session ni yangilash
    await this.models.TelegramSession.updateOne(
      { telegramId: telegramId, isActive: true },
      { lastActivity: new Date() }
    );

    return user;
  }

  async ensureTempDirectory() {
    try {
      await fs.ensureDir(this.tempDir);
      console.log('📁 Temp directory ensured:', this.tempDir);
    } catch (error) {
      console.error('Error creating temp directory:', error);
    }
  }

  async sendDebtsAsFiles(chatId, debts, type, messageId = null) {
    try {
      const typeText = type === 'tomorrow' ? 'Ertaga' : type === 'today' ? 'Bugun' : type === 'week' ? 'Bir hafta ichida' : 'Barcha';

      // 1. Birinchi oddiy xabar formatida ma'lumotlarni yuborish
      let textMessage = `📋 ${typeText} muddati tugaydigan qarzlar: ${debts.length} ta\n\n`;

      if (debts.length > 0) {
        debts.forEach((debt, index) => {
          textMessage += `${'─'.repeat(40)}\n`;
          textMessage += `${index + 1}. 👤 ${debt.creditor}\n`;
          textMessage += `💰 ${debt.amount.toLocaleString()} ${debt.currency}\n`;
          // Telefon raqamni clickable qilish
          if (debt.phone && debt.phone !== 'Ko\'rsatilmagan') {
            // Telefon raqamni to'liq formatda ko'rsatish
            let fullPhone = debt.phone;

            // Agar telefon raqami + bilan boshlanmasa, country code qo'shish
            if (!fullPhone.startsWith('+')) {
              const countryCode = debt.countryCode || '+998';
              fullPhone = countryCode + fullPhone;
            }

            // Telefon raqamni tozalash - faqat raqamlar va + belgisi qoldirish, bo'shliqlarni olib tashlash
            const cleanPhone = fullPhone.replace(/[^\d+]/g, '');
            textMessage += `📞 [${cleanPhone}](tel:${cleanPhone})\n`;
          } else {
            textMessage += `📞 Ko'rsatilmagan\n`;
          }
          textMessage += `📅 Muddat: ${new Date(debt.debtDate).toLocaleDateString('uz-UZ')}\n`;
          if (debt.description) {
            textMessage += `📄 Izoh: ${debt.description}\n`;
          }
          textMessage += `${'─'.repeat(40)}\n\n`;
        });
      }

      if (messageId) {
        // Mavjud xabarni tahrirlash
        await this.bot.editMessageText(textMessage, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown'
        });
      } else {
        // Yangi xabar yuborish
        await this.bot.sendMessage(chatId, textMessage, {
          parse_mode: 'Markdown'
        });
      }

      // 2. Excel faylini yaratish va yuborish
      const excelFile = await this.generateExcelFile(debts, type);

      await this.bot.sendDocument(chatId, excelFile, {
        caption: `📊 ${typeText} qarzlar - Excel format`
      }, {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      // Temp fayllarni o'chirish
      await this.cleanupFiles([excelFile]);

      console.log(`✅ Files sent for ${type} debts to chat ${chatId}`);
    } catch (error) {
      console.error('Error in sendDebtsAsFiles:', error);
      await this.bot.sendMessage(chatId, '❌ Fayllar yaratishda xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  }

  async generateTxtFile(debts, type) {
    const typeText = type === 'tomorrow' ? 'Ertaga' : type === 'today' ? 'Bugun' : 'Bir hafta ichida';
    const today = new Date();
    const fileName = `${type}_debts_${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}.txt`;
    const filePath = path.join(this.tempDir, fileName);

    // Faqat jadval formatida ma'lumotlar (header siz)
    let content = '';

    if (debts.length === 0) {
      content += `${typeText} muddati tugaydigan qarzlar yo'q\n`;
    } else {
      debts.forEach((debt) => {
        const kreditor = debt.creditor.padEnd(15);
        const summa = `${debt.amount.toLocaleString()} ${debt.currency}`.padEnd(15);
        const telefon = (debt.phone || 'Ko\'rsatilmagan').padEnd(18);
        const qarzSanasi = new Date(debt.debtDate).toLocaleDateString('uz-UZ').padEnd(12);
        const yaratilganSana = new Date(debt.createdAt).toLocaleDateString('uz-UZ').padEnd(12);
        const holat = (debt.status === 'pending' ? 'Kutilmoqda' : 'To\'langan').padEnd(10);

        content += `${kreditor}\t${summa}\t${telefon}\t${qarzSanasi}\t${yaratilganSana}\t${holat}\n`;
      });
    }

    await fs.writeFile(filePath, content, 'utf8');
    return filePath;
  }

  async generateExcelFile(debts, type) {
    const typeText = type === 'tomorrow' ? 'Ertaga' : type === 'today' ? 'Bugun' : type === 'week' ? 'Bir hafta ichida' : 'Barcha';
    const today = new Date();
    const fileName = `${type}_debts_${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}.xlsx`;
    const filePath = path.join(this.tempDir, fileName);

    const workbook = XLSX.utils.book_new();

    // Professional header va ma'lumotlar
    const data = [
      ['Kreditor', 'Summa', 'Telefon', 'Qarz sanasi', 'Yaratilgan sana', 'Holat']
    ];

    if (debts.length === 0) {
      data.push([`${typeText} muddati tugaydigan qarzlar yo'q`, '', '', '', '', '']);
    } else {
      debts.forEach((debt, index) => {
        // Telefon raqamni to'liq formatda ko'rsatish, bo'shliqlarni olib tashlash
        let fullPhone = debt.phone || 'Ko\'rsatilmagan';
        if (debt.phone && debt.phone !== 'Ko\'rsatilmagan' && !debt.phone.startsWith('+')) {
          const countryCode = debt.countryCode || '+998';
          fullPhone = countryCode + debt.phone;
        }
        // Bo'shliqlarni olib tashlash
        if (fullPhone !== 'Ko\'rsatilmagan') {
          fullPhone = fullPhone.replace(/\s+/g, '');
        }

        data.push([
          debt.creditor,
          `${debt.amount.toLocaleString()} ${debt.currency}`,
          fullPhone,
          new Date(debt.debtDate).toLocaleDateString('uz-UZ'),
          new Date(debt.createdAt).toLocaleDateString('uz-UZ'),
          debt.status === 'pending' ? 'Kutilmoqda' : 'To\'langan'
        ]);
      });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Ustun kengliklarini sozlash
    worksheet['!cols'] = [
      { width: 25 }, // Kreditor - kengroq
      { width: 18 }, // Summa - kengroq
      { width: 20 }, // Telefon - kengroq
      { width: 15 }, // Qarz sanasi
      { width: 18 }, // Yaratilgan sana - kengroq
      { width: 15 }  // Holat
    ];

    // Header styling - Orange background va bold text
    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'];
    headerCells.forEach(cell => {
      if (!worksheet[cell]) worksheet[cell] = {};
      worksheet[cell].s = {
        fill: {
          fgColor: { rgb: "FF8C00" } // Orange color
        },
        font: {
          bold: true,
          color: { rgb: "FFFFFF" }, // White text
          sz: 12 // Font size
        },
        alignment: {
          horizontal: "center",
          vertical: "center"
        },

      };
    });

    // Data rows styling - alternating colors
    if (debts.length > 0) {
      for (let row = 2; row <= debts.length + 1; row++) {
        const isEvenRow = (row - 2) % 2 === 0;
        const rowCells = [`A${row}`, `B${row}`, `C${row}`, `D${row}`, `E${row}`, `F${row}`];

        rowCells.forEach(cell => {
          if (!worksheet[cell]) worksheet[cell] = {};
          worksheet[cell].s = {
            fill: {
              fgColor: { rgb: isEvenRow ? "F8F9FA" : "FFFFFF" } // Alternating light gray and white
            },
            font: {
              sz: 11
            },
            alignment: {
              horizontal: "left",
              vertical: "center"
            },
            border: {
              top: { style: "thin", color: { rgb: "E0E0E0" } },
              bottom: { style: "thin", color: { rgb: "E0E0E0" } },
              left: { style: "thin", color: { rgb: "E0E0E0" } },
              right: { style: "thin", color: { rgb: "E0E0E0" } }
            }
          };
        });
      }
    }

    // Freeze header row
    worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Qarzlar');

    // Use XLSXStyle for styled output
    XLSXStyle.writeFile(workbook, filePath);
    return filePath;
  }

  async sendTomorrowDebtsToUser(telegramId, debts) {
    try {
      const chatId = telegramId;

      // Xabar yaratish
      let message = `🔔 **Eslatma: Ertaga to'lov qilish kerak!**\n\n`;
      message += `📋 Ertaga muddati tugaydigan qarzlar: ${debts.length} ta\n\n`;

      debts.forEach((debt, index) => {
        message += `${'─'.repeat(40)}\n`;
        message += `${index + 1}. 👤 ${debt.creditor}\n`;
        message += `💰 ${debt.amount.toLocaleString()} ${debt.currency}\n`;

        // Telefon raqamni clickable qilish
        if (debt.phone && debt.phone !== 'Ko\'rsatilmagan') {
          // Telefon raqamni to'liq formatda ko'rsatish
          let fullPhone = debt.phone;

          // Agar telefon raqami + bilan boshlanmasa, country code qo'shish
          if (!fullPhone.startsWith('+')) {
            const countryCode = debt.countryCode || '+998';
            fullPhone = countryCode + fullPhone;
          }

          // Telefon raqamni tozalash - faqat raqamlar va + belgisi qoldirish, bo'shliqlarni olib tashlash
          const cleanPhone = fullPhone.replace(/[^\d+]/g, '');
          message += `📞 [${cleanPhone}](tel:${cleanPhone})\n`;
        } else {
          message += `📞 Ko'rsatilmagan\n`;
        }

        message += `📅 Muddat: ${new Date(debt.debtDate).toLocaleDateString('uz-UZ')}\n`;
        if (debt.description) {
          message += `📄 Izoh: ${debt.description}\n`;
        }
        message += `${'─'.repeat(40)}\n\n`;
      });



      // Xabarni yuborish
      await this.bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown'
      });

      console.log(`✅ Tomorrow debts reminder sent to user ${telegramId}`);

    } catch (error) {
      console.error(`❌ Error sending tomorrow debts to user ${telegramId}:`, error);
      throw error;
    }
  }

  async sendAllDebtsToUser(telegramId, debts) {
    try {
      const chatId = telegramId;
      const today = new Date().toLocaleDateString('uz-UZ');

      // Xabar yuborish
      await this.bot.sendMessage(chatId,
        `📊 **Kunlik hisobot - Barcha qarzlar**\n\n` +
        `📅 Sana: ${today}\n` +
        `📋 Jami qarzlar: ${debts.length} ta\n\n` +
        `📁 Quyida Excel formatida to'liq jadval yuboriladi.`
      );

      // Excel faylini yaratish va yuborish
      const excelFile = await this.generateExcelFile(debts, 'all');

      await this.bot.sendDocument(chatId, excelFile, {
        caption: `📊 Barcha qarzlar jadvali - ${today}`
      }, {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      // Temp faylni o'chirish
      await this.cleanupFiles([excelFile]);

      console.log(`✅ All debts report sent to user ${telegramId}`);

    } catch (error) {
      console.error(`❌ Error sending all debts to user ${telegramId}:`, error);
      throw error;
    }
  }

  async cleanupFiles(filePaths) {
    for (const filePath of filePaths) {
      try {
        await fs.remove(filePath);
        console.log(`🗑️ Cleaned up: ${path.basename(filePath)}`);
      } catch (error) {
        console.error(`❌ Error cleaning up ${filePath}:`, error);
      }
    }
  }

  // Bot ni to'xtatish
  async stopBot() {
    if (this.bot) {
      try {
        console.log('🛑 Stopping Telegram bot...');
        this.isPolling = false;

        if (this.bot.isPolling()) {
          await this.bot.stopPolling({ cancel: true });
          console.log('🛑 Telegram bot polling stopped');
        } else {
          console.log('🛑 Bot was not polling');
        }
      } catch (error) {
        console.error('❌ Error stopping bot:', error.message);
        // Force set polling to false even if stop fails
        this.isPolling = false;
      }
    }
  }

  // Bot holatini tekshirish
  getBotStatus() {
    return {
      isPolling: this.isPolling,
      useWebhook: this.useWebhook,
      botToken: this.botToken ? '***' + this.botToken.slice(-4) : 'Not set'
    };
  }

  // Public method to send message
  async sendMessage(chatId, message, options = {}) {
    try {
      return await this.bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        ...options
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Public method to send document
  async sendDocument(chatId, document, caption = '', options = {}) {
    try {
      if (typeof document === 'object' && document.filename && document.content) {
        // Create temporary file
        const tempFilePath = path.join(this.tempDir, document.filename);
        await fs.writeFile(tempFilePath, document.content);
        
        const result = await this.bot.sendDocument(chatId, tempFilePath, {
          caption: caption,
          ...options
        });

        // Clean up temporary file
        await this.cleanupFiles([tempFilePath]);
        
        return result;
      } else {
        // Direct file path
        return await this.bot.sendDocument(chatId, document, {
          caption: caption,
          ...options
        });
      }
    } catch (error) {
      console.error('Error sending document:', error);
      throw error;
    }
  }
}

export default TelegramBotHandler;