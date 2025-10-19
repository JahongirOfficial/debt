# Eski Qarzlarni Filialga Moslab Qo'yish

Loyihada filiallar qo'shilishidan oldin kiritilgan qarzlar avtomatik ko'rinmay qolishi mumkin. Bu muammoni hal qilish uchun migration scriptini ishga tushiring.

## 🔄 Avtomatik Hal Qilish

Server ishga tushganda avtomatik tekshiruv amalga oshiriladi va eski qarzlar asosiy filialga moslanadi.

## 🛠 Manual Migration

Agar avtomatik hal qilish ishlamasa, quyidagi buyruqlarni bajaring:

### 1. Backend papkasida migration ishga tushirish:
```bash
cd backend
npm run migrate:fix-old-debts
```

### 2. Yoki asosiy papkadan:
```bash
npm run migrate:fix-old-debts
```

### 3. To'liq migration (barcha foydalanuvchilar uchun):
```bash
cd backend
npm run migrate:branches
```

## 📊 Migration Nima Qiladi?

### 1. **Foydalanuvchilarni tekshirish**
- Barcha foydalanuvchilarni topadi
- Har bir foydalanuvchi uchun filial mavjudligini tekshiradi

### 2. **Asosiy filial yaratish**
- Agar foydalanuvchining filiali yo'q bo'lsa, "Asosiy filial" yaratadi
- Filial parametrlari:
  - Nomi: "Asosiy filial"
  - Tavsifi: "Sizning asosiy filialingiz"
  - Valyuta: UZS
  - Rang: Ko'k (#3B82F6)
  - Ikonka: building

### 3. **Qarzlarni ko'chirish**
- `branchId` maydoni bo'lmagan barcha qarzlarni topadi
- Ularni foydalanuvchining asosiy filialiga bog'laydi

### 4. **Faol filial o'rnatish**
- Foydalanuvchining `activeBranchId` ni yangilaydi
- Bu qarzlar to'g'ri ko'rinishi uchun kerak

## 🔍 Tekshirish

Migration muvaffaqiyatli o'tganini tekshirish uchun:

### 1. **Database da tekshirish:**
```javascript
// MongoDB shell da
db.debts.find({ branchId: { $exists: false } }).count()
// Natija 0 bo'lishi kerak
```

### 2. **Veb interfeys da tekshirish:**
- Tizimga kiring
- Qarzlar bo'limiga o'ting
- Barcha eski qarzlar ko'rinishi kerak

## ⚠️ Muhim Eslatmalar

### 1. **Backup oling**
Migration dan oldin ma'lumotlar bazasidan backup oling:
```bash
mongodump --db qarzdaftar --out backup_$(date +%Y%m%d)
```

### 2. **Test muhitda sinab ko'ring**
Production da ishga tushirishdan oldin test muhitda sinab ko'ring.

### 3. **Foydalanuvchilarni ogohlantiring**
Migration paytida tizim sekinroq ishlashi mumkin.

## 🐛 Muammolar va Yechimlar

### Muammo: "Cannot read property '_id' of null"
**Sabab:** Foydalanuvchi topilmadi
**Yechim:** 
```bash
# Foydalanuvchilar mavjudligini tekshiring
cd backend
node -e "
import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGODB_URI);
const users = await mongoose.model('User', {}).find({});
console.log('Users count:', users.length);
process.exit(0);
"
```

### Muammo: "Duplicate key error"
**Sabab:** Filial nomi takrorlangan
**Yechim:** Mavjud filiallar nomini o'zgartiring yoki o'chiring

### Muammo: Migration to'xtab qoldi
**Sabab:** Katta ma'lumotlar bazasi
**Yechim:** 
```bash
# Qismma-qism migration
cd backend
node -e "
// Faqat birinchi 100 ta foydalanuvchi uchun
const limit = 100;
// Migration kodini o'zgartiring
"
```

## 📈 Migration Statistikasi

Migration tugagandan keyin quyidagi ma'lumotlar ko'rsatiladi:

```
🎉 Migration completed successfully!
📊 Summary:
   - Created 15 default branches
   - Updated 15 users with active branch  
   - Migrated 234 debts to branches
   - Processed 15 users total
```

## 🔄 Qayta Migration

Agar migration qayta kerak bo'lsa:

### 1. **Filiallarni tozalash:**
```javascript
// Faqat test muhitda!
db.branches.deleteMany({ name: "Asosiy filial" });
db.users.updateMany({}, { $unset: { activeBranchId: 1 } });
db.debts.updateMany({}, { $unset: { branchId: 1 } });
```

### 2. **Migration qayta ishga tushirish:**
```bash
npm run migrate:fix-old-debts
```

## 📞 Yordam

Agar muammolar davom etsa:

1. **Loglarni tekshiring:** `backend/logs/` papkasida
2. **Console outputni saqlang:** Migration jarayonidagi barcha xabarlar
3. **Database holatini tekshiring:** Qaysi qadamda to'xtagan

---

**Eslatma:** Bu migration bir marta bajariladi va keyingi ishga tushirishlarda avtomatik o'tkazib yuboriladi.