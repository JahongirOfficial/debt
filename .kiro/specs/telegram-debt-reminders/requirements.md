# Requirements Document

## Introduction

Qarzdaftar ilovasiga Telegram bot integratsiyasi orqali qarz eslatmalari tizimini qo'shish. Bu tizim biznes egalari va do'kon egalariga ertaga qarzini qaytarishi kerak bo'lgan mijozlar ro'yxatini Telegram orqali olish imkonini beradi. Fayl TXT va Excel formatlarida yuboriladi va telefon qilish uchun mo'ljallangan.

## Requirements

### Requirement 1

**User Story:** Biznes egasi sifatida, men Telegram botga /start buyrug'ini yuborish orqali o'z ID'imni botga tanitsam, bot mening qarzlarim orasidan ertaga qaytarish muddati kelgan qarzlar ro'yxatini fayl ko'rinishida olishim kerak.

#### Acceptance Criteria

1. WHEN foydalanuvchi Telegram botga /start buyrug'ini yuborsa THEN bot foydalanuvchining Telegram ID'sini saqlashi va qarzdaftar tizimidagi foydalanuvchi bilan bog'lashi KERAK
2. WHEN foydalanuvchi botdan qarz eslatmalari so'rasa THEN bot foydalanuvchining qarzlari orasidan ertaga muddati tugaydigan qarzlarni topishi KERAK
3. WHEN ertaga muddati tugaydigan qarzlar mavjud bo'lsa THEN bot TXT va Excel formatlarida fayllar yaratib yuborishi KERAK
4. WHEN hech qanday qarz topilmasa THEN bot "Ertaga muddati tugaydigan qarzlar yo'q" xabarini yuborishi KERAK

### Requirement 2

**User Story:** Qarzdaftar ilovasidan foydalanuvchi sifatida, men tizimga kirganimda agar mening Telegram ID'im bog'lanmagan bo'lsa, 5 soniyadan keyin menga Telegram bot bilan bog'lanish haqida modal oynasi ko'rsatilishi kerak.

#### Acceptance Criteria

1. WHEN foydalanuvchi tizimga kirsa va uning Telegram ID'si mavjud bo'lmasa THEN 5 soniya kutgandan keyin modal oynasi ochilishi KERAK
2. WHEN modal oynasi ochilsa THEN unda Telegram bot bilan bog'lanish haqida ma'lumot va botga o'tish uchun maxsus havola bo'lishi KERAK
3. WHEN foydalanuvchi havolani bossa THEN yangi oynada Telegram bot ochilishi KERAK
4. WHEN foydalanuvchi modalni yopsa THEN modal bir kun davomida qayta ko'rsatilmasligi KERAK

### Requirement 3

**User Story:** Tizim administratori sifatida, men Telegram bot orqali yuborilgan fayllar to'g'ri formatda va kerakli ma'lumotlarni o'z ichiga olishini ta'minlashim kerak.

#### Acceptance Criteria

1. WHEN TXT fayl yaratilsa THEN unda har bir qarz uchun kreditor nomi, telefon raqami, qarz miqdori va valyuta ko'rsatilishi KERAK
2. WHEN Excel fayl yaratilsa THEN unda ustunlar: Kreditor, Telefon, Miqdor, Valyuta, Qarz sanasi bo'lishi KERAK
3. WHEN fayllar yuborilsa THEN ular foydalanuvchining hozirgi vaqt zonasiga mos ravishda nomlangan bo'lishi KERAK
4. WHEN fayl hajmi 50MB dan oshsa THEN bot xatolik xabarini yuborishi KERAK

### Requirement 4

**User Story:** Foydalanuvchi sifatida, men Telegram bot orqali qo'shimcha buyruqlar yordamida o'z qarzlarim haqida turli ma'lumotlar olishim kerak.

#### Acceptance Criteria

1. WHEN foydalanuvchi /help buyrug'ini yuborsa THEN bot barcha mavjud buyruqlar ro'yxatini yuborishi KERAK
2. WHEN foydalanuvchi /stats buyrug'ini yuborsa THEN bot umumiy qarzlar statistikasini yuborishi KERAK
3. WHEN foydalanuvchi /today buyrug'ini yuborsa THEN bot bugun muddati tugaydigan qarzlar ro'yxatini yuborishi KERAK
4. WHEN foydalanuvchi /week buyrug'ini yuborsa THEN bot bir hafta ichida muddati tugaydigan qarzlar ro'yxatini yuborishi KERAK

### Requirement 5

**User Story:** Tizim xavfsizligi uchun, faqat ro'yxatdan o'tgan va tasdiqlangan foydalanuvchilar Telegram bot orqali ma'lumot olishga ruxsat berilishi kerak.

#### Acceptance Criteria

1. WHEN noma'lum Telegram ID dan so'rov kelsa THEN bot "Avval qarzdaftar.uz saytida ro'yxatdan o'ting" xabarini yuborishi KERAK
2. WHEN foydalanuvchi hisobi faol bo'lmasa THEN bot "Hisobingiz faol emas" xabarini yuborishi KERAK
3. WHEN foydalanuvchi obuna muddati tugagan bo'lsa THEN bot "Obuna muddati tugagan" xabarini yuborishi KERAK
4. WHEN bot xatolik yuz bersa THEN xatolik haqida log yozilishi va foydalanuvchiga umumiy xabar yuborilishi KERAK