# Design Document

## Overview

Telegram bot integratsiyasi orqali qarz eslatmalari tizimi qarzdaftar ilovasiga qo'shiladi. Bu tizim biznes egalari va do'kon egalariga ertaga qarzini qaytarishi kerak bo'lgan mijozlar ro'yxatini avtomatik ravishda Telegram orqali yuboradi. Tizim xavfsiz, samarali va foydalanuvchi uchun qulay bo'lishi kerak.

## Architecture

### System Components

1. **Telegram Bot Service** - Telegram API bilan ishlash
2. **User Telegram Integration** - Foydalanuvchi va Telegram ID bog'lanishi
3. **Debt Reminder Engine** - Qarz eslatmalarini hisoblash
4. **File Generation Service** - TXT va Excel fayllar yaratish
5. **Frontend Modal Component** - Telegram bog'lanish modali
6. **Notification Scheduler** - Avtomatik eslatmalar

### Database Schema Extensions

```javascript
// User schema ga qo'shimcha maydonlar
{
  telegramId: String,
  telegramUsername: String,
  telegramConnectedAt: Date,
  telegramNotificationsEnabled: Boolean,
  lastTelegramModalShown: Date
}

// Yangi TelegramSession schema
{
  userId: ObjectId,
  telegramId: String,
  sessionToken: String,
  isActive: Boolean,
  connectedAt: Date,
  lastActivity: Date
}
```

## Components and Interfaces

### 1. Telegram Bot Handler

```javascript
class TelegramBotHandler {
  constructor(botToken) {
    this.bot = new TelegramBot(botToken, { polling: true });
    this.setupCommands();
  }

  setupCommands() {
    this.bot.onText(/\/start/, this.handleStart);
    this.bot.onText(/\/help/, this.handleHelp);
    this.bot.onText(/\/tomorrow/, this.handleTomorrowDebts);
    this.bot.onText(/\/today/, this.handleTodayDebts);
    this.bot.onText(/\/week/, this.handleWeekDebts);
    this.bot.onText(/\/stats/, this.handleStats);
  }

  async handleStart(msg) {
    // Foydalanuvchini tizimda topish va bog'lash
  }

  async handleTomorrowDebts(msg) {
    // Ertaga muddati tugaydigan qarzlarni topish va fayl yuborish
  }
}
```

### 2. File Generation Service

```javascript
class FileGenerationService {
  static async generateTxtFile(debts, userId) {
    // TXT fayl yaratish
  }

  static async generateExcelFile(debts, userId) {
    // Excel fayl yaratish (xlsx kutubxonasi bilan)
  }

  static formatDebtData(debt) {
    // Qarz ma'lumotlarini formatlash
  }
}
```

### 3. Frontend Modal Component

```jsx
const TelegramConnectionModal = ({ isOpen, onClose, botUsername }) => {
  const [showAgain, setShowAgain] = useState(true);
  
  const handleConnect = () => {
    const botUrl = `https://t.me/${botUsername}?start=${generateConnectionToken()}`;
    window.open(botUrl, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="telegram-modal">
        <h3>Telegram bot bilan bog'laning</h3>
        <p>Qarz eslatmalarini Telegram orqali olish uchun botimiz bilan bog'laning</p>
        <button onClick={handleConnect}>Telegram botga o'tish</button>
      </div>
    </Modal>
  );
};
```

### 4. Debt Reminder Engine

```javascript
class DebtReminderEngine {
  static async getTomorrowDebts(userId) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return await Debt.find({
      userId,
      status: 'pending',
      debtDate: {
        $gte: startOfDay(tomorrow),
        $lte: endOfDay(tomorrow)
      }
    });
  }

  static async getTodayDebts(userId) {
    // Bugungi qarzlar
  }

  static async getWeekDebts(userId) {
    // Bir haftalik qarzlar
  }
}
```

## Data Models

### User Model Extension

```javascript
const userSchema = new mongoose.Schema({
  // ... mavjud maydonlar
  telegramId: {
    type: String,
    unique: true,
    sparse: true
  },
  telegramUsername: {
    type: String
  },
  telegramConnectedAt: {
    type: Date
  },
  telegramNotificationsEnabled: {
    type: Boolean,
    default: true
  },
  lastTelegramModalShown: {
    type: Date
  }
});
```

### TelegramSession Model

```javascript
const telegramSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  telegramId: {
    type: String,
    required: true,
    unique: true
  },
  sessionToken: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  connectedAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
```

## Error Handling

### Bot Error Handling

1. **Noma'lum foydalanuvchi**: "Avval qarzdaftar.uz saytida ro'yxatdan o'ting"
2. **Faol bo'lmagan hisob**: "Hisobingiz faol emas, admin bilan bog'laning"
3. **Obuna tugagan**: "Obuna muddatingiz tugagan, yangilang"
4. **Fayl yaratish xatoligi**: "Fayl yaratishda xatolik, qayta urinib ko'ring"
5. **Katta fayl**: "Fayl hajmi juda katta, admin bilan bog'laning"

### Frontend Error Handling

1. **Modal ochilmasa**: Console log va fallback UI
2. **Bot havolasi ishlamasa**: Qo'lda bot username ko'rsatish
3. **Connection timeout**: Qayta urinish tugmasi

## Testing Strategy

### Unit Tests

1. **FileGenerationService** - TXT va Excel fayl yaratish
2. **DebtReminderEngine** - Sana filtrlash va qarz topish
3. **TelegramBotHandler** - Buyruqlarni qayta ishlash
4. **Modal Component** - Render va interaction testlari

### Integration Tests

1. **Telegram API** - Bot buyruqlari va javoblar
2. **Database** - User va TelegramSession CRUD operatsiyalari
3. **File Upload** - Telegram orqali fayl yuborish
4. **Authentication** - Telegram ID va User bog'lanishi

### End-to-End Tests

1. **Full Flow**: Ro'yxatdan o'tish → Modal → Bot connection → Fayl olish
2. **Error Scenarios**: Noto'g'ri ma'lumotlar, xatoliklar
3. **Performance**: Katta qarzlar ro'yxati bilan ishlash

## Security Considerations

### Authentication

1. **Session Token**: Har bir bog'lanish uchun unique token
2. **Token Expiry**: 24 soatlik amal qilish muddati
3. **Rate Limiting**: Har bir foydalanuvchi uchun so'rovlar cheklovi

### Data Protection

1. **Sensitive Data**: Telefon raqamlari va qarz ma'lumotlari himoyasi
2. **File Cleanup**: Yuborilgan fayllarni avtomatik o'chirish
3. **Logging**: Xavfsizlik hodisalarini log qilish

### Bot Security

1. **Webhook Security**: HTTPS va token verification
2. **Command Validation**: Kiruvchi buyruqlarni tekshirish
3. **User Verification**: Har bir so'rov uchun foydalanuvchi tekshiruvi

## Performance Optimization

### Caching Strategy

1. **User Data**: Tez-tez ishlatiladigan foydalanuvchi ma'lumotlari
2. **Debt Queries**: Sana bo'yicha qarz so'rovlari
3. **File Templates**: Excel va TXT shablon fayllar

### Database Optimization

1. **Indexes**: telegramId, userId, debtDate maydonlari uchun
2. **Query Optimization**: Aggregate pipeline lar
3. **Connection Pooling**: MongoDB connection pool

### File Handling

1. **Streaming**: Katta fayllar uchun stream API
2. **Compression**: Fayl hajmini kamaytirish
3. **Temporary Storage**: Vaqtinchalik fayllar uchun cleanup