# Requirements Document

## Introduction

Qarzdaftarchada filiallarni boshqarish tizimi foydalanuvchilarga bir nechta filiallarni yaratish va har bir filial uchun alohida qarzlarni boshqarish imkonini beradi. Har bir filial o'zining mustaqil qarz ro'yxati, hisobotlari va analitikalariga ega bo'ladi. Tizim turli tariflar bo'yicha filiallar sonini cheklaydi va foydalanuvchilarga filiallar o'rtasida oson navigatsiya qilish imkonini beradi.

## Requirements

### Requirement 1

**User Story:** Foydalanuvchi sifatida, men bir nechta filiallarni yaratishni va boshqarishni xohlayman, shunda har bir filial uchun alohida biznes hisobini yuritishim mumkun bo'lsin.

#### Acceptance Criteria

1. WHEN foydalanuvchi filial yaratish tugmasini bosadi THEN tizim filial yaratish modalini ko'rsatishi SHART
2. WHEN foydalanuvchi filial nomini kiritadi va saqlash tugmasini bosadi THEN tizim yangi filialni yaratishi va filiallar ro'yxatiga qo'shishi SHART
3. WHEN foydalanuvchi filial nomini o'zgartirmoqchi bo'lsa THEN tizim filial tahrirlash imkonini berishi SHART
4. WHEN foydalanuvchi filialni o'chirmoqchi bo'lsa THEN tizim tasdiqlash so'rovi ko'rsatishi va tasdiqlangandan keyin filialni o'chirishi SHART
5. IF filialda qarzlar mavjud bo'lsa THEN tizim filialni o'chirishdan oldin ogohlantirish berishi SHART

### Requirement 2

**User Story:** Foydalanuvchi sifatida, men har bir filial uchun alohida qarzlarni qo'shish va boshqarishni xohlayman, shunda filiallar o'rtasida qarzlar aralashmasin.

#### Acceptance Criteria

1. WHEN foydalanuvchi biror filialga kiradi THEN tizim faqat shu filialga tegishli qarzlarni ko'rsatishi SHART
2. WHEN foydalanuvchi yangi qarz qo'shadi THEN qarz avtomatik ravishda joriy faol filialga biriktirilishi SHART
3. WHEN foydalanuvchi filiallar o'rtasida o'tadi THEN tizim har bir filial uchun alohida qarzlar ro'yxatini ko'rsatishi SHART
4. WHEN foydalanuvchi qarzni tahrirlaydi THEN o'zgarishlar faqat shu filialga ta'sir qilishi SHART
5. IF foydalanuvchi qarzni boshqa filialga ko'chirmoqchi bo'lsa THEN tizim qarzni ko'chirish funksiyasini taqdim etishi SHART

### Requirement 3

**User Story:** Foydalanuvchi sifatida, men har bir filial uchun alohida hisobotlar va analitikalarni ko'rishni xohlayman, shunda har bir filialning moliyaviy holatini alohida tahlil qilishim mumkun bo'lsin.

#### Acceptance Criteria

1. WHEN foydalanuvchi filial hisobotlari bo'limiga kiradi THEN tizim joriy filial uchun umumiy statistikalarni ko'rsatishi SHART
2. WHEN foydalanuvchi analitika sahifasini ochadi THEN tizim joriy filial uchun qarzlar dinamikasi, to'lovlar tarixi va boshqa analitik ma'lumotlarni ko'rsatishi SHART
3. WHEN foydalanuvchi hisobotni eksport qiladi THEN hisobotda faqat joriy filial ma'lumotlari bo'lishi SHART
4. WHEN foydalanuvchi barcha filiallar bo'yicha umumiy hisobotni ko'rmoqchi bo'lsa THEN tizim barcha filiallar statistikasini birlashtirib ko'rsatishi SHART
5. IF foydalanuvchi filiallar o'rtasida taqqoslash qilmoqchi bo'lsa THEN tizim filiallar taqqoslash sahifasini taqdim etishi SHART

### Requirement 4

**User Story:** Tizim administratori sifatida, men foydalanuvchilarning tarif rejalariga qarab filiallar sonini cheklashni xohlayman, shunda biznes modelimiz samarali ishlashi mumkun bo'lsin.

#### Acceptance Criteria

1. WHEN free tarif foydalanuvchisi 1-filialdan ortiq yaratmoqchi bo'lsa THEN tizim cheklov haqida xabar berishi va tarifni yangilashni taklif qilishi SHART
2. WHEN lite tarif foydalanuvchisi 2-filialdan ortiq yaratmoqchi bo'lsa THEN tizim cheklov haqida xabar berishi va tarifni yangilashni taklif qilishi SHART
3. WHEN standart tarif foydalanuvchisi 3-filialdan ortiq yaratmoqchi bo'lsa THEN tizim cheklov haqida xabar berishi va tarifni yangilashni taklif qilishi SHART
4. WHEN pro tarif foydalanuvchisi 5-filialdan ortiq yaratmoqchi bo'lsa THEN tizim cheklov haqida xabar berishi SHART
5. IF foydalanuvchi tarifini pasaytirsa va filiallar soni yangi cheklovdan oshsa THEN tizim ortiqcha filiallarni nofaol qilishi yoki o'chirishni so'rashi SHART

### Requirement 5

**User Story:** Foydalanuvchi sifatida, men filiallar o'rtasida oson navigatsiya qilishni xohlayman, shunda tez va qulay tarzda kerakli filialga o'tishim mumkun bo'lsin.

#### Acceptance Criteria

1. WHEN foydalanuvchi tizimga kiradi THEN tizim filiallar ro'yxatini ko'rsatishi va oxirgi faol filialni belgilashi SHART
2. WHEN foydalanuvchi filial tanlaydi THEN tizim tanlangan filialni faol qilishi va uning nomini interfeysta ko'rsatishi SHART
3. WHEN foydalanuvchi boshqa sahifaga o'tadi THEN tizim joriy faol filialni eslab qolishi SHART
4. WHEN foydalanuvchi filiallar o'rtasida tez o'tish uchun klaviatura tugmalarini ishlatsa THEN tizim tez o'tish funksiyasini taqdim etishi KERAK
5. IF foydalanuvchida faqat bitta filial bo'lsa THEN tizim filial tanlash interfeysi ko'rsatmasligi KERAK

### Requirement 6

**User Story:** Foydalanuvchi sifatida, men har bir filial uchun alohida sozlamalar va konfiguratsiyalarni o'rnatishni xohlayman, shunda har bir filial o'zining xususiyatlariga ega bo'lishi mumkun bo'lsin.

#### Acceptance Criteria

1. WHEN foydalanuvchi filial sozlamalari sahifasiga kiradi THEN tizim joriy filial uchun sozlamalar formasi ko'rsatishi SHART
2. WHEN foydalanuvchi filial uchun valyuta turini o'rnatadi THEN barcha qarzlar va hisobotlar shu valyutada ko'rsatilishi SHART
3. WHEN foydalanuvchi filial uchun eslatma sozlamalarini o'zgartiradi THEN eslatmalar faqat shu filial qarzlari uchun ishlashi SHART
4. WHEN foydalanuvchi filial uchun Telegram bot sozlamalarini o'rnatadi THEN bot faqat shu filial ma'lumotlarini yuborishi SHART
5. IF foydalanuvchi filial uchun maxsus shablon yaratsa THEN shablon faqat shu filialda ishlatilishi SHART