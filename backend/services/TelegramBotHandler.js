import TelegramBot from 'node-telegram-bot-api';
import crypto from 'crypto';
import XLSX from 'xlsx';
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

      // Start bot with delay to avoid conflicts
      setTimeout(() => {
        if (this.useWebhook) {
          this.setupWebhook();
        } else {
          this.startPolling();
        }
      }, 2000); // Increased delay to 2 seconds

      console.log('Telegram bot initialized successfully');
    } catch (error) {
      console.error('Error initializing Telegram bot:', error);
      throw error;
    }
  }

  startPolling() {
    try {
      if (!this.isPolling) {
        // First, try to stop any existing polling
        this.bot.stopPolling().then(() => {
          // Start polling after stopping
          this.bot.startPolling();
          this.isPolling = true;
          console.log('✅ Telegram bot polling started');
        }).catch((error) => {
          // If stopping fails, try to start anyway
          console.log('⚠️  Could not stop existing polling, trying to start anyway...');
          try {
            this.bot.startPolling();
            this.isPolling = true;
            console.log('✅ Telegram bot polling started');
          } catch (startError) {
            console.error('❌ Error starting polling:', startError.message);
          }
        });
      }
    } catch (error) {
      console.error('❌ Error in startPolling:', error.message);
    }
  }

  setupWebhook() {
    // Webhook setup for production
    console.log('🔗 Setting up webhook mode (not implemented yet)');
    // TODO: Implement webhook mode for production
  }

  setupCommands() {
    // Start command - foydalanuvchi ID bog'lash
    this.bot.onText(/\/start(.*)/, (msg, match) => {
      this.handleStart(msg, match);
    });

    // Help command - yordam ma'lumotlari
    this.bot.onText(/\/help/, (msg) => {
      this.handleHelp(msg);
    });

    // Tomorrow command - ertaga muddati tugaydigan qarzlar
    this.bot.onText(/\/tomorrow/, (msg) => {
      this.handleTomorrowDebts(msg);
    });

    // Today command - bugun muddati tugaydigan qarzlar
    this.bot.onText(/\/today/, (msg) => {
      this.handleTodayDebts(msg);
    });

    // Week command - bir hafta ichida muddati tugaydigan qarzlar
    this.bot.onText(/\/week/, (msg) => {
      this.handleWeekDebts(msg);
    });

    // Stats command - umumiy statistika
    this.bot.onText(/\/stats/, (msg) => {
      this.handleStats(msg);
    });

    // Unknown command handler
    this.bot.on('message', (msg) => {
      if (msg.text && msg.text.startsWith('/') && !this.isKnownCommand(msg.text)) {
        this.handleUnknownCommand(msg);
      }
    });
  }

  setupErrorHandling() {
    this.bot.on('error', (error) => {
      console.error('Telegram bot error:', error.message);
    });

    this.bot.on('polling_error', (error) => {
      console.error('Telegram bot polling error:', error.message);

      // Handle 409 Conflict error (multiple bot instances)
      if (error.code === 'ETELEGRAM' && error.message.includes('409 Conflict')) {
        console.log('⚠️  Multiple bot instances detected. Stopping current instance...');
        this.stopBot();

        // Try to restart after a delay
        setTimeout(() => {
          console.log('🔄 Attempting to restart bot polling...');
          this.startPolling();
        }, 10000); // Wait 10 seconds before restart
        return;
      }

      // Handle other fatal errors
      if (error.code === 'EFATAL') {
        console.log('Attempting to restart polling...');
        setTimeout(() => {
          try {
            this.startPolling();
          } catch (restartError) {
            console.error('Failed to restart polling:', restartError.message);
          }
        }, 5000);
      }
    });
  }

  isKnownCommand(text) {
    const knownCommands = ['/start', '/help', '/tomorrow', '/today', '/week', '/stats'];
    return knownCommands.some(cmd => text.startsWith(cmd));
  }

  async handleStart(msg, match) {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id.toString();
    const username = msg.from.username || msg.from.first_name || 'Unknown';

    // Parameter ni to'g'ri olish
    const parameter = match && match[1] ? match[1].trim() : '';

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
      // Token username yoki phone bo'lishi mumkin
      let searchQuery = {
        $or: [
          { username: token },
          { phone: token }
        ]
      };

      // Only add _id search if token looks like a valid ObjectId (24 hex characters)
      if (/^[0-9a-fA-F]{24}$/.test(token)) {
        searchQuery.$or.push({ _id: token });
      }

      const user = await this.models.User.findOne(searchQuery);

      console.log(`User found:`, user ? `${user.username} (${user._id})` : 'Not found');

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
      `/stats - Umumiy qarzlar statistikasi\n` +
      `/help - Bu yordam xabari\n\n` +
      `📁 Fayllar TXT va Excel formatida yuboriladi.\n\n` +
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
      const typeText = type === 'tomorrow' ? 'Ertaga' : type === 'today' ? 'Bugun' : 'Bir hafta ichida';

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
    const typeText = type === 'tomorrow' ? 'Ertaga' : type === 'today' ? 'Bugun' : 'Bir hafta ichida';
    const today = new Date();
    const fileName = `${type}_debts_${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}.xlsx`;
    const filePath = path.join(this.tempDir, fileName);

    const workbook = XLSX.utils.book_new();

    // Faqat jadval formatida ma'lumotlar - rasmdagidek
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
      { width: 20 }, // Kreditor
      { width: 15 }, // Summa
      { width: 18 }, // Telefon
      { width: 12 }, // Qarz sanasi
      { width: 15 }, // Yaratilgan sana
      { width: 12 }  // Holat
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Qarzlar');

    XLSX.writeFile(workbook, filePath);
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
  stopBot() {
    if (this.bot && this.isPolling) {
      try {
        this.bot.stopPolling();
        this.isPolling = false;
        console.log('🛑 Telegram bot stopped');
      } catch (error) {
        console.error('❌ Error stopping bot:', error);
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
}

export default TelegramBotHandler;