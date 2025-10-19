# PWA (Progressive Web App) Setup

Qarzdaftar loyihasi endi PWA sifatida ishlaydi! Bu quyidagi imkoniyatlarni beradi:

## 🚀 PWA Xususiyatlari

### ✅ Tayyor xususiyatlar:
- **Offline ishlash** - Internet yo'q bo'lganda ham asosiy funksiyalar ishlaydi
- **App kabi o'rnatish** - Telefon va kompyuterga oddiy ilova kabi o'rnatish mumkin
- **Tez yuklash** - Cache tizimi orqali tezroq yuklash
- **Push notifications** - Xabarlar yuborish imkoniyati
- **Background sync** - Offline holatda qilingan o'zgarishlar avtomatik sinxronlanadi
- **Responsive design** - Barcha qurilmalarda mukammal ko'rinish

### 📱 Qo'llab-quvvatlanadigan platformalar:
- **Android** - Chrome, Firefox, Edge
- **iOS** - Safari (iOS 11.3+)
- **Desktop** - Chrome, Firefox, Edge, Safari

## 🛠 Texnik Ma'lumotlar

### Fayllar tuzilishi:
```
public/
├── manifest.json          # PWA manifest fayli
├── sw.js                 # Service Worker
├── offline.html          # Offline sahifa
├── browserconfig.xml     # Windows tiles
└── icons/               # PWA ikonkalari
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png

src/
├── components/
│   └── PWAInstallPrompt.jsx  # O'rnatish taklifi
└── utils/
    └── pwaUtils.js          # PWA utility funksiyalar
```

### Service Worker strategiyalari:
- **API so'rovlar**: Network First (internetdan, keyin cache)
- **Static fayllar**: Cache First (cache dan, keyin internet)
- **HTML sahifalar**: Network First (internetdan, keyin cache)

## 📋 O'rnatish va Ishlatish

### 1. Loyihani build qilish:
```bash
npm run build:pwa
```

### 2. PWA ni test qilish:
```bash
npm run preview:pwa
```

### 3. Production da deploy qilish:
```bash
npm run build
# Build fayllarini serverga yuklash
```

## 🎨 Ikonkalar

PWA uchun quyidagi o'lchamlarda ikonkalar kerak:

### Majburiy ikonkalar:
- `icon-192x192.png` - Android home screen
- `icon-512x512.png` - Android splash screen

### Qo'shimcha ikonkalar:
- `icon-72x72.png` - Small devices
- `icon-96x96.png` - Medium devices  
- `icon-128x128.png` - Large devices
- `icon-144x144.png` - Windows tiles
- `icon-152x152.png` - iOS devices
- `icon-384x384.png` - Large screens

### Ikonka yaratish:
1. 512x512 px asosiy ikonka yarating
2. Har bir o'lcham uchun alohida fayl yarating
3. `public/icons/` papkasiga joylashtiring

## 🔧 Sozlash

### Manifest.json sozlamalari:
```json
{
  "name": "Qarzdaftar - Qarz Kuzatuv Tizimi",
  "short_name": "Qarzdaftar",
  "theme_color": "#f97316",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```

### Service Worker cache strategiyasi:
```javascript
// Network First - API uchun
// Cache First - Static files uchun
// Offline fallback - HTML uchun
```

## 📱 Foydalanuvchi Tajribasi

### Android da o'rnatish:
1. Chrome brauzerida saytni oching
2. "Add to Home Screen" tugmasini bosing
3. Ilovani tasdiqlang

### iOS da o'rnatish:
1. Safari brauzerida saytni oching
2. "Share" tugmasini bosing
3. "Add to Home Screen" ni tanlang

### Desktop da o'rnatish:
1. Chrome/Edge da saytni oching
2. Address bar da "Install" tugmasini bosing
3. Ilovani tasdiqlang

## 🔍 Debug va Test

### PWA tekshirish:
1. Chrome DevTools > Application > Manifest
2. Lighthouse > PWA audit
3. Service Worker > Network tab

### Offline test:
1. DevTools > Network > Offline
2. Sahifani yangilang
3. Offline sahifa ko'rinishini tekshiring

## 🚀 Performance

### Cache strategiyasi:
- **Static files**: 30 kun cache
- **API responses**: 1 kun cache  
- **HTML pages**: 1 soat cache

### Bundle optimizatsiya:
- Code splitting
- Tree shaking
- Minification
- Gzip compression

## 🔐 Xavfsizlik

### HTTPS talab:
- PWA faqat HTTPS da ishlaydi
- Development da localhost istisno

### CSP (Content Security Policy):
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">
```

## 📊 Analytics

### PWA metrics:
- Install rate
- Engagement time
- Offline usage
- Cache hit rate

### Tracking events:
```javascript
// PWA install
gtag('event', 'pwa_install');

// Offline usage  
gtag('event', 'offline_usage');
```

## 🆘 Troubleshooting

### Keng tarqalgan muammolar:

1. **Service Worker ishlamayapti**:
   - HTTPS tekshiring
   - Console errors ko'ring
   - Cache ni tozalang

2. **Manifest xatolik**:
   - JSON syntax tekshiring
   - Icon paths tekshiring
   - MIME types tekshiring

3. **Install prompt ko'rinmayapti**:
   - PWA criteria tekshiring
   - Lighthouse audit qiling
   - Browser compatibility tekshiring

### Debug commands:
```bash
# Service Worker status
navigator.serviceWorker.getRegistrations()

# Cache contents  
caches.keys()

# Manifest validation
chrome://flags/#enable-desktop-pwas
```

## 📚 Qo'shimcha Resurslar

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Lighthouse PWA Audit](https://web.dev/lighthouse-pwa/)

---

**Eslatma**: PWA to'liq ishlashi uchun barcha ikonkalar va HTTPS kerak!