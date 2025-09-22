# Qarzdaftar (Qarz Boshqarish) Ilovasi Uchun MongoDB Migratsiya Rejasi

## 1. Joriy Tizim Tahlili

### 1.1 Umumiy Ko'rinish
Qarzdaftar ilovasi foydalanuvchilarga ularning qarzlarini kuzatish, tahlil qilish va boshqarishga yordam beradigan qarz boshqarish tizimidir. Hozirda ilova barcha ma'lumotlarni brauzer localStorage'ida saqlaydi. Bu yondashuvda bir nechta cheklovlar mavjud:
- Ma'lumotlar har bir brauzer/qurilmada izolyatsiya qilinadi
- Qurilmalar orasida ma'lumotlar sinxronlanmaydi
- Brauzer ma'lumotlarini tozalash orqali ma'lumotlar yo'qolish xavfi mavjud
- Zaxira nusxalash va tiklash imkoniyati yo'q
- Cheklangan masshtablanuvchanlik

### 1.2 Joriy Ma'lumotlar Saqlash Strukturasi
Ilova hozirda localStorage'dan foydalanib quyidagi ma'lumotlarni saqlaydi:
1. **Foydalanuvchi Autentifikatsiya Ma'lumotlari**:
   - JWT tokenlar
   - Foydalanuvchi profil ma'lumotlari

2. **Ilova Sozlamalari**:
   - Til afzalligi
   - Valyuta afzalligi
   - Mavzu sozlamalari

3. **Qarz Ma'lumotlari**:
   - Qarzdor nomi, miqdori, tavsif, telefon raqami, sanalar, holat bilan qarz yozuvlari
   - Barcha qarz ma'lumotlari foydalanuvchi seansiga mahalliy ravishda saqlanadi

### 1.3 Backend Implementatsiyasi
Backend Node.js va Express yordamida yaratilgan, MongoDB bilan Mongoose orqali integratsiya qilingan. Hozirda faqat quyidagilarni boshqaradi:
- Foydalanuvchi autentifikatsiyasi (ro'yxatdan o'tish, kirish)
- Foydalanuvchi profilini boshqarish
- Asosiy sog'liqni tekshirish

## 2. Taklif Etilayotgan MongoDB Ma'lumotlar Bazasi Strukturasi

### 2.1 Ma'lumotlar Bazasi Dizayni Prinsiplari
- Ma'lumotlarni mos keladigan joylarda normallashtirish redundansiya kamaytirish uchun
- So'rov ishlashini yaxshilash uchun normallashtirmaslik
- Tez-tez so'raladigan maydonlar uchun mos indekslardan foydalanish
- Ma'lumotlarni mos validatsiya sxemalarini amalga oshirish
- Ma'lumotlar mosligi va butunligini ta'minlash

### 2.2 To'plam Strukturasi

#### 2.2.1 Foydalanuvchilar To'plami
```javascript
// Joriy Foydalanuvchi Sxemasi (allaqachon amalga oshirilgan)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'standard', 'pro'],
    default: 'free'
  },
  avatarColor: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});
```

#### 2.2.2 Qarzlar To'plami
```javascript
const debtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  creditor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  countryCode: {
    type: String,
    default: '+998'
  },
  debtDate: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
    index: true
  },
  paidAt: {
    type: Date
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  }
}, {
  timestamps: true
});

// Umumiy so'rovlar uchun indekslar
debtSchema.index({ userId: 1, status: 1 });
debtSchema.index({ userId: 1, debtDate: 1 });
debtSchema.index({ userId: 1, createdAt: -1 });
```

#### 2.2.3 Foydalanuvchi Sozlamalari To'plami
```javascript
const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  language: {
    type: String,
    enum: ['uz', 'ru', 'en', 'tjk'],
    default: 'uz'
  },
  currency: {
    type: String,
    enum: ['UZS', 'USD', 'EUR', 'RUB', 'TJS'],
    default: 'UZS'
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  }
}, {
  timestamps: true
});
```

#### 2.2.4 Qarz Faoliyati Jurnallari To'plami (Ixtiyoriy, Kengaytirilgan Xususiyatlar Uchun)
```javascript
const debtActivitySchema = new mongoose.Schema({
  debtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debt',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['created', 'updated', 'deleted', 'status_changed', 'paid'],
    required: true
  },
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});
```

## 3. Migratsiya Amalga Oshirish Rejasi

### 3.1 1-Bosqich: Backend API Ishlab Chiqish

#### 3.1.1 Qarz Boshqarish API'lar
1. **Qarz Yaratish**
   - Endpoint: POST `/api/debts`
   - Funksionallik: Autentifikatsiya qilingan foydalanuvchi uchun yangi qarz yozuvini yaratish
   - So'rov Tana: creditor, amount, description, phone, countryCode, debtDate, currency
   - Javob: ID bilan yaratilgan qarz ob'ekti

2. **Foydalanuvchi Qarzlarini Olish**
   - Endpoint: GET `/api/debts`
   - Funksionallik: Autentifikatsiya qilingan foydalanuvchi uchun barcha qarzlarni olish, ixtiyoriy filtrlar bilan
   - So'rov Parametrlari: status, startDate, endDate, search
   - Javob: Qarz ob'ektlari massivi

3. **ID bo'yicha Qarzni Olish**
   - Endpoint: GET `/api/debts/:id`
   - Funksionallik: Autentifikatsiya qilingan foydalanuvchi uchun ID bo'yicha maxsus qarzni olish
   - Javob: Qarz ob'ekti

4. **Qarzni Yangilash**
   - Endpoint: PUT `/api/debts/:id`
   - Funksionallik: Autentifikatsiya qilingan foydalanuvchi uchun qarz tafsilotlarini yangilash
   - So'rov Tana: Yangilanadigan maydonlar
   - Javob: Yangilangan qarz ob'ekti

5. **Qarzni O'chirish**
   - Endpoint: DELETE `/api/debts/:id`
   - Funksionallik: Autentifikatsiya qilingan foydalanuvchi uchun qarzni o'chirish
   - Javob: Muvaffaqiyatni tasdiqlash

6. **Qarzni To'langan deb Belgilash**
   - Endpoint: PATCH `/api/debts/:id/pay`
   - Funksionallik: Qarz holatini 'to'langan' ga yangilash va paidAt vaqt belgisini o'rnatish
   - Javob: Yangilangan qarz ob'ekti

#### 3.1.2 Foydalanuvchi Sozlamalari API'lar
1. **Foydalanuvchi Sozlamalarini Olish**
   - Endpoint: GET `/api/settings`
   - Funksionallik: Foydalanuvchining ilova sozlamalarini olish
   - Javob: Sozlamalar ob'ekti

2. **Foydalanuvchi Sozlamalarini Yangilash**
   - Endpoint: PUT `/api/settings`
   - Funksionallik: Foydalanuvchining ilova sozlamalarini yangilash
   - So'rov Tana: language, currency, theme
   - Javob: Yangilangan sozlamalar ob'ekti

### 3.2 2-Bosqich: Frontend Integratsiyasi

#### 3.2.1 AuthContext Yangilash
AuthContextni backenddan foydalanuvchi sozlamalarini boshqarish uchun yangilash:
- Kirishda foydalanuvchi sozlamalarini olish
- Sozlamalarni yangilash funksiyasini taqdim etish
- Sozlamalarni kontekst holatida saqlash

#### 3.2.2 DebtContext Yaratish
Qarz boshqarish uchun yangi kontekst yaratish:
- Backend API orqali qarzlarni olish
- CRUD operatsiyalari uchun funksiyalarni taqdim etish
- Yuklanish va xatolik holatlarini boshqarish
- Real-time yangilanishlarni amalga oshirish

#### 3.2.3 Komponent Ma'lumotlar Manbalarini Yangilash
Barcha komponentlarni localStorage o'rniga MongoDB dan ma'lumot olish uchun yangilash:
- Debts.jsx: DebtContext orqali qarzlarni olish va boshqarish
- Settings.jsx: AuthContext orqali sozlamalarni olish va yangilash
- Dashboard.jsx: Backenddan umumiy ma'lumotlarni olish
- Analytics.jsx: Backenddan analitik ma'lumotlarni olish
- Reports.jsx: Backenddan hisobotlar yaratish

### 3.3 3-Bosqich: Ma'lumotlar Migratsiyasi

#### 3.3.1 Migratsiya Strategiyasi
1. **Mijoz-Tomon Migratsiya Utility**:
   - localStorage ma'lumotlarini eksport qilish utilitini yaratish
   - Mavjud ma'lumotlarni migratsiya qilish imkonini beruvchi opsiya
   - Yangilashdan keyin birinchi kirishda migratsiya jarayonini boshqarish

2. **Migratsiya Jarayoni**:
   - Foydalanuvchida mavjud localStorage ma'lumotlari borligini tekshirish
   - Agar mavjud bo'lsa, foydalanuvchiga ma'lumotlarni migratsiya qilishni taklif qilish
   - Mavjud ma'lumotlarni saqlash uchun backendga yuborish
   - Muvaffaqiyatli migratsiyadan keyin localStorage ni tozalash

#### 3.3.2 Migratsiya Endpoint
Ma'lumotlar migratsiyasi uchun maxsus endpoint yaratish:
- Endpoint: POST `/api/migrate`
- Autentifikatsiya talab qilinadi
- Qarz ob'ektlari massivini qabul qiladi
- Tekshiradi va MongoDB da saqlaydi
- Migratsiya holatini qaytaradi

### 3.4 4-Bosqich: Testlash va Validatsiya

#### 3.4.1 Unit Testlash
- Barcha yangi API endpointlarini testlash
- Ma'lumotlar validatsiyasi va xatoliklarni boshqarishni tekshirish
- Chekkaviy hollarni va xavfsizlik choralari testlash

#### 3.4.2 Integratsiya Testlash
- Frontend-backend integratsiyasini testlash
- Ma'lumotlar mosligini tekshirish
- Foydalanuvchi migratsiya jarayonini testlash

#### 3.4.3 Ishlash Testlash
- API javob vaqtlarini testlash
- Ma'lumotlar bazasi so'rov ishlashini tekshirish
- Bir vaqtda bir nechta foydalanuvchi senariylarini testlash

## 4. Xavfsizlik E'tiborlari

### 4.1 Autentifikatsiya va Avtorizatsiya
- Barcha qarz API'lar autentifikatsiya talab qiladi
- Foydalanuvchilar faqat o'z qarz ma'lumotlariga kirishlari mumkin
- Mos rolga asoslangan kirish nazoratini amalga oshirish

### 4.2 Ma'lumotlar Validatsiyasi
- Barcha kiruvchi ma'lumotlarni frontend va backendda tekshirish
- Zulimdan saqlanish uchun darajalarni cheklashni amalga oshirish
- Maxfiy ma'lumotlarni ochiq qilib yubormasdan mos xatoliklarni boshqarish

### 4.3 Ma'lumotlar Shifrlash
- Parollar allaqachon bcrypt yordamida xeshlanadi
- Maxfiy ma'lumotlarni xotirada shifrlashni hisobga olish
- Barcha API aloqalarida HTTPS dan foydalanish

## 5. Ishlashni Optimallashtirish

### 5.1 Ma'lumotlar Bazasi Indekslash
- Tez-tez so'raladigan maydonlar uchun indekslar yaratish
- Murakkab so'rovlar uchun murakkab indekslardan foydalanish
- Sekin so'rovlarni kuzatish va optimallashtirish

### 5.2 Keshlash Strategiyasi
- Tez-tez foydalaniladigan ma'lumotlar uchun keshlashni amalga oshirish
- Sessiya keshlash uchun Redis yoki shunga o'xshash vositalardan foydalanish
- Ma'lumotlar bazasi so'rovlari kamaytirish uchun sozlamalarni keshlash

### 5.3 Sahifalash
- Qarz ro'yxatlari uchun sahifalashni amalga oshirish
- Har bir so'rov bilan qaytariladigan yozuvlar sonini cheklash
- Samarali navigatsiya boshqaruvlarini taqdim etish

## 6. Chiqish Rejasi

### 6.1 Ishlab Chiqish Muhandisligi
1. MongoDB ma'lumotlar bazasini sozlash
2. Backend API'larini amalga oshirish
3. Frontend komponentlarini yangilash
4. Mahalliy testlash

### 6.2 Staging Muhandisligi
1. Staging serverga joylash
2. Batafsil testlash o'tkazish
3. Migratsiya jarayonini tekshirish
4. Ishlash testlash

### 6.3 Ishlab Chiqarishga Chiqish
1. Backend yangilanishlarini joylash
2. Frontend yangilanishlarini joylash
3. Tizim ishlashini kuzatish
4. Migratsiya uchun foydalanuvchi qo'llab-quvvatlash

## 7. Zaxira va Tiklash

### 7.1 Muntazam Zaxiralash
- Kunlik ma'lumotlar bazasi zaxirasini rejalashtirish
- Zaxira nusxalarini xavfsiz joyda saqlash
- Zaxira tiklash jarayonini testlash

### 7.2 Favqulodda Holatlar Uchun Tiklash
- Ma'lumotlar bazasi replikatsiyasini amalga oshirish
- Failover mexanizmlarini sozlash
- Tiklash protseduralarini hujjatlash

## 8. Kuzatish va Xizmat Ko'rsatish

### 8.1 Tizimni Kuzatish
- API javob vaqtlarini kuzatish
- Ma'lumotlar bazasi ishlashini kuzatish
- Muammolar uchun ogohlantirish sozlash

### 8.2 Xizmat Ko'rsatish Vazifalari
- Muntazam ma'lumotlar bazasi optimallashtirish
- Bog'liqliklarni yangilash
- Xavfsizlik auditlari

## 9. Xulosa

Qarzdaftar ilovasini MongoDB ga migratsiya qilish foydalanuvchi tajribasini sezilarli darajada yaxshilaydi:
- Qurilmalar orasida ma'lumotlar sinxronlanishini yoqish
- Yaxshiroq ma'lumotlar xavfsizligi va zaxira variantlarini taqdim etish
- Hisobotlar va analitika kabi ilg'or xususiyatlarga imkon berish
- Ilova masshtablanuvchanligini yaxshilash

Migratsiya foydalanuvchilarga uzilishni minimal darajada qisqartirish va butun jarayon davomida ma'lumotlar butunligini ta'minlash uchun bosqichma-bosqich amalga oshirilishi kerak.