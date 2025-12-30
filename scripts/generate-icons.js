// Script to generate PWA icons
// Run: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const generateSVG = (size) => {
  const rx = Math.round(size * 0.25); // 25% border radius
  const strokeWidth = Math.round(size * 0.07);
  const scale = size / 72;
  
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
  <rect width='${size}' height='${size}' rx='${rx}' fill='#f97316'/>
  <g transform='scale(${scale})'>
    <path stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='5' fill='none' d='M36 24c-4.97 0-9 2.685-9 6s4.03 6 9 6 9 2.685 9 6-4.03 6-9 6m0-24c3.33 0 6.24 1.206 7.797 3M36 24v-3m0 3v24m0 0v3m0-3c-3.33 0-6.24-1.206-7.797-3'/>
  </g>
</svg>`;
};

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for each size
sizes.forEach(size => {
  const svg = generateSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svg);
  console.log(`Generated ${filename}`);
});

console.log('\\nAll icons generated! Convert SVGs to PNGs using an online tool or sharp library.');
