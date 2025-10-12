import XLSX from 'xlsx';
import XLSXStyle from 'xlsx-style';
import fs from 'fs-extra';
import path from 'path';
import cron from 'node-cron';

class DailyReportService {
  constructor(models, telegramBot) {
    this.models = models;
    this.telegramBot = telegramBot;
    this.reportsDir = path.join(process.cwd(), 'temp_reports');

    // Temp papkani yaratish
    this.ensureReportsDirectory();

    // Har kuni soat 09:00 da hisobot yuborish
    this.scheduleDailyReports();

    console.log('📊 Daily Report Service initialized');
  }

  async ensureReportsDirectory() {
    try {
      await fs.ensureDir(this.reportsDir);
      console.log('📁 Reports directory ensured:', this.reportsDir);
    } catch (error) {
      console.error('Error creating reports directory:', error);
    }
  }

  scheduleDailyReports() {
    // Har kuni soat 09:00 da adminlarga hisobot yuborish
    cron.schedule('0 9 * * *', async () => {
      console.log('🕘 Starting daily report generation at 09:00');
      await this.generateAndSendDailyReports();
    }, {
      timezone: "Asia/Tashkent"
    });

    // Har kuni soat 08:30 da har bir foydalanuvchiga ertaga to'lov qilishi kerak bo'lgan qarzlar haqida xabar yuborish
    cron.schedule('30 8 * * *', async () => {
      console.log('🕘 Starting tomorrow debt reminders at 08:30');
      await this.sendTomorrowDebtReminders();
    }, {
      timezone: "Asia/Tashkent"
    });

    // Har kuni soat 23:59 da har bir foydalanuvchiga barcha qarzlar jadvalini yuborish
    cron.schedule('59 23 * * *', async () => {
      console.log('🕘 Starting daily all debts report at 23:59');
      await this.sendDailyAllDebtsReport();
    }, {
      timezone: "Asia/Tashkent"
    });

    console.log('⏰ Daily reports scheduled for 09:00 (Tashkent time)');
    console.log('⏰ Tomorrow debt reminders scheduled for 08:30 (Tashkent time)');
    console.log('⏰ Daily all debts report scheduled for 23:59 (Tashkent time)');
  }

  async generateAndSendDailyReports() {
    try {
      console.log('📊 Generating daily reports...');

      // Admin foydalanuvchilarni topish
      const adminUsers = await this.models.User.find({
        role: 'admin',
        telegramId: { $exists: true, $ne: null }
      });

      if (adminUsers.length === 0) {
        console.log('⚠️ No admin users with Telegram found for daily reports');
        return;
      }

      // Barcha qarzlar ma'lumotini olish
      const allDebts = await this.models.Debt.find({})
        .populate('userId', 'username phone email')
        .sort({ createdAt: -1 });

      // Fayllar yaratish
      // const txtFile = await this.generateTxtReport(allDebts); // TXT fayl o'chirildi
      const excelFile = await this.generateExcelReport(allDebts);

      // Admin foydalanuvchilarga yuborish
      for (const admin of adminUsers) {
        try {
          await this.sendReportsToAdmin(admin.telegramId, null, excelFile);
          console.log(`✅ Reports sent to admin: ${admin.username}`);
        } catch (error) {
          console.error(`❌ Failed to send reports to admin ${admin.username}:`, error);
        }
      }

      // Temp fayllarni o'chirish
      await this.cleanupTempFiles([excelFile]); // Faqat Excel fayl

      console.log('✅ Daily reports generation completed');
    } catch (error) {
      console.error('❌ Error in generateAndSendDailyReports:', error);
    }
  }

  async generateTxtReport(debts) {
    const today = new Date();
    const fileName = `daily_report_${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}.txt`;
    const filePath = path.join(this.reportsDir, fileName);

    // Faqat jadval formatida ma'lumotlar (header siz)
    let content = '';

    if (debts.length === 0) {
      content += `Ma'lumot topilmadi\n`;
    } else {
      debts.forEach((debt) => {
        const kreditor = debt.creditor.padEnd(15);
        const summa = `${debt.amount.toLocaleString()} ${debt.currency}`.padEnd(15);

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
        const telefon = fullPhone.padEnd(18);

        const qarzSanasi = new Date(debt.debtDate).toLocaleDateString('uz-UZ').padEnd(12);
        const yaratilganSana = new Date(debt.createdAt).toLocaleDateString('uz-UZ').padEnd(12);
        const holat = (debt.status === 'pending' ? 'Kutilmoqda' : 'To\'langan').padEnd(10);

        content += `${kreditor}\t${summa}\t${telefon}\t${qarzSanasi}\t${yaratilganSana}\t${holat}\n`;
      });
    }

    await fs.writeFile(filePath, content, 'utf8');
    console.log('📄 TXT report generated:', fileName);

    return filePath;
  }

  async generateExcelReport(debts) {
    const today = new Date();
    const fileName = `daily_report_${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}.xlsx`;
    const filePath = path.join(this.reportsDir, fileName);

    // Workbook yaratish
    const workbook = XLSX.utils.book_new();

    // Professional header va ma'lumotlar
    const tableData = [
      ['Kreditor', 'Summa', 'Telefon', 'Qarz sanasi', 'Yaratilgan sana', 'Holat']
    ];

    if (debts.length === 0) {
      tableData.push(['Ma\'lumot topilmadi', '', '', '', '', '']);
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

        tableData.push([
          debt.creditor,
          `${debt.amount.toLocaleString()} ${debt.currency}`,
          fullPhone,
          new Date(debt.debtDate).toLocaleDateString('uz-UZ'),
          new Date(debt.createdAt).toLocaleDateString('uz-UZ'),
          debt.status === 'pending' ? 'Kutilmoqda' : 'To\'langan'
        ]);
      });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);

    // Ustun kengliklarini sozlash - kengroq qilish
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

    // Faylni saqlash - styled version
    XLSXStyle.writeFile(workbook, filePath);
    console.log('📊 Professional Excel report generated:', fileName);

    return filePath;
  }

  async sendReportsToAdmin(telegramId, txtFile, excelFile) {
    try {
      const today = new Date().toLocaleDateString('uz-UZ');

      // Xabar yuborish
      await this.telegramBot.bot.sendMessage(telegramId,
        `📊 KUNLIK HISOBOT - ${today}\n\n` +
        `🕘 Soat: ${new Date().toLocaleTimeString('uz-UZ')}\n` +
        `📁 Fayl: Excel formatida\n\n` +
        `Bu hisobot avtomatik ravishda har kuni soat 09:00 da yuboriladi.`
      );

      // TXT faylni yuborish (o'chirildi)
      // await this.telegramBot.bot.sendDocument(telegramId, txtFile, {
      //   caption: `📄 TXT format hisobot - ${today}`
      // });

      // Excel faylni yuborish
      await this.telegramBot.bot.sendDocument(telegramId, excelFile, {
        caption: `📊 Excel format hisobot - ${today}`
      }, {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      console.log(`✅ Reports sent to Telegram ID: ${telegramId}`);
    } catch (error) {
      console.error(`❌ Error sending reports to ${telegramId}:`, error);
      throw error;
    }
  }

  async cleanupTempFiles(filePaths) {
    for (const filePath of filePaths) {
      try {
        await fs.remove(filePath);
        console.log(`🗑️ Cleaned up temp file: ${path.basename(filePath)}`);
      } catch (error) {
        console.error(`❌ Error cleaning up ${filePath}:`, error);
      }
    }
  }

  // Manual hisobot yaratish (test uchun)
  async sendTomorrowDebtReminders() {
    try {
      console.log('📅 Sending tomorrow debt reminders to all users...');

      // Telegram ID si bor barcha foydalanuvchilarni topish
      const users = await this.models.User.find({
        telegramId: { $exists: true, $ne: null }
      });

      if (users.length === 0) {
        console.log('⚠️ No users with Telegram found for reminders');
        return;
      }

      // Ertaga sanasi
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const endOfTomorrow = new Date(tomorrow);
      endOfTomorrow.setHours(23, 59, 59, 999);

      let totalReminders = 0;

      // Har bir foydalanuvchi uchun
      for (const user of users) {
        try {
          // Foydalanuvchining ertaga to'lov qilishi kerak bo'lgan qarzlarini topish
          const tomorrowDebts = await this.models.Debt.find({
            userId: user._id,
            status: 'pending',
            debtDate: {
              $gte: tomorrow,
              $lte: endOfTomorrow
            }
          }).sort({ debtDate: 1 });

          if (tomorrowDebts.length > 0) {
            // Telegram bot orqali xabar yuborish
            await this.telegramBot.sendTomorrowDebtsToUser(user.telegramId, tomorrowDebts);
            totalReminders++;
            console.log(`✅ Tomorrow reminder sent to user: ${user.username} (${tomorrowDebts.length} debts)`);
          }
        } catch (error) {
          console.error(`❌ Error sending reminder to user ${user.username}:`, error);
        }
      }

      console.log(`✅ Tomorrow debt reminders completed. Sent to ${totalReminders} users`);

    } catch (error) {
      console.error('❌ Error in sendTomorrowDebtReminders:', error);
    }
  }

  async sendDailyAllDebtsReport() {
    try {
      console.log('📊 Sending daily all debts report to all users...');

      // Telegram ID si bor barcha foydalanuvchilarni topish
      const users = await this.models.User.find({
        telegramId: { $exists: true, $ne: null }
      });

      if (users.length === 0) {
        console.log('⚠️ No users with Telegram found for daily all debts report');
        return;
      }

      let totalReports = 0;

      // Har bir foydalanuvchi uchun
      for (const user of users) {
        try {
          // Foydalanuvchining barcha qarzlarini topish
          const allDebts = await this.models.Debt.find({
            userId: user._id
          }).sort({ createdAt: -1 });

          if (allDebts.length > 0) {
            // Telegram bot orqali barcha qarzlar jadvalini yuborish
            await this.telegramBot.sendAllDebtsToUser(user.telegramId, allDebts);
            totalReports++;
            console.log(`✅ Daily all debts report sent to user: ${user.username} (${allDebts.length} debts)`);
          } else {
            console.log(`⚠️ User ${user.username} has no debts, skipping report`);
          }
        } catch (error) {
          console.error(`❌ Error sending daily report to user ${user.username}:`, error);
        }
      }

      console.log(`✅ Daily all debts reports completed. Sent to ${totalReports} users`);

    } catch (error) {
      console.error('❌ Error in sendDailyAllDebtsReport:', error);
    }
  }

  async generateManualReport() {
    console.log('🔧 Generating manual report for testing...');
    await this.generateAndSendDailyReports();
  }

  // Vaqtni o'zgartirish
  updateSchedule(hour, minute) {
    // Eski cron job ni to'xtatish kerak (bu soddalashtirilgan versiya)
    console.log(`⏰ Schedule would be updated to ${hour}:${minute} (restart required)`);
    // Haqiqiy implementatsiyada cron job ni to'xtatib, yangisini yaratish kerak
  }
}

export default DailyReportService;