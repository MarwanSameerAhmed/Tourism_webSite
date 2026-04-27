const fs = require('fs');
let html = fs.readFileSync('d:/Tourism_webSite/index-en.html', 'utf8');

// ============================================================
// 1. FIX BROKEN IMAGE PATHS (translation broke folder names)
// ============================================================
// About section + Gallery section: "Discover Moscow" -> original "اكتشف موسكو"
html = html.replaceAll('assets/Discover Moscow/', 'assets/اكتشف موسكو/');

// Gallery section: "Discover St. Petersburg" -> original "اكتشف سانت بيتربرغ"  
html = html.replaceAll('assets/Discover St. Petersburg/', 'assets/اكتشف سانت بيتربرغ/');

// Metro section: "Explore Station" in paths -> original folder
html = html.replaceAll('assets/Explore Station/', 'assets/محطات الميترو/');

// Museums section: "Explore Museum" in paths -> original folder
html = html.replaceAll('assets/Explore Museum/', 'assets/المتاحف والاماكن اﻟﺘﺎرﻳﺨﻴﺔ/');

// Metro station paths - check if metro paths were broken
// The folder is "محطات الميترو" - check if it was translated in paths
html = html.replaceAll('assets/Metro Stations/', 'assets/محطات الميترو/');

console.log('1. Fixed broken image paths');

// ============================================================
// 2. FIX INLINE RTL STYLES (remove right-alignment overrides)
// ============================================================
// Remove all inline RTL margin/alignment overrides for LTR
html = html.replaceAll(
  'style="margin-left: auto !important; margin-right: 0 !important; justify-content: flex-start !important;"',
  ''
);
html = html.replaceAll(
  'style="margin-left: auto !important; margin-right: 0 !important; text-align: right !important;"',
  ''
);
html = html.replaceAll(
  'style="margin-left: auto; margin-right: 0;"',
  ''
);

console.log('2. Removed inline RTL style overrides');

// ============================================================
// 3. FIX MALLS SECTION - Still in Arabic
// ============================================================
html = html.replace('<span>وجهات التسوق</span>', '<span>Shopping Destinations</span>');
html = html.replace('المراكز التجارية\r\n                    <span class="section-title-en">Shopping Centers</span>',
  'Shopping Centres\r\n                    <span class="section-title-en">Premium Malls</span>');
html = html.replace('أفضل\r\n                    وأفخم وجهات التسوق العالمية لضمان تجربة لا مثيل لها',
  'The finest and most prestigious shopping destinations for an unparalleled experience');

console.log('3. Fixed malls section text');

// ============================================================  
// 4. FIX RESTAURANTS SECTION - marquee rows
// ============================================================
// Check if there's a "marquee-track right" class (second row)
const hasRightTrack = html.includes('marquee-track right');
console.log('4. Restaurants section has second marquee track:', hasRightTrack);

// ============================================================
// 5. FIX REMAINING ARABIC TEXT IN SECTIONS
// ============================================================

// Gardens subtitle that was partially translated
html = html.replace(
  /استكشف أجمل.*?Parks.*?Tourist Landmarks.*?تخطف الأنفاس/,
  'Explore the most beautiful parks and landmarks that take your breath away'
);

// Mall remaining subtitle
html = html.replace('أفضل وأفخم وجهات التسوق العالمية لضمان تجربة لا مثيل لها',
  'The finest and most prestigious shopping destinations for an unparalleled experience');

// Museums remaining text  
html = html.replace('رحلة عبر الزمن لDiscover More أسرار وحكايات التاريخ الروسي العريق',
  'A journey through time to discover the secrets and stories of Russia\'s rich history');

console.log('5. Fixed remaining Arabic text');

// ============================================================
// 6. CHECK AND FIX REMAINING ARABIC IN VISIBLE TEXT
// ============================================================
// Find any remaining Arabic text in section-subtitle, section-badge etc
const remaining = [];
const re = /(section-subtitle|section-badge|mall-name|garden-title|museum-title|activity-title)[^>]*>([^<]*[\u0600-\u06FF][^<]*)</g;
let match;
while ((match = re.exec(html)) !== null) {
  remaining.push(`${match[1]}: ${match[2].trim().substring(0, 50)}`);
}
if (remaining.length > 0) {
  console.log('6. Remaining Arabic in sections:');
  remaining.forEach(r => console.log('  - ' + r));
} else {
  console.log('6. No remaining Arabic in key sections!');
}

fs.writeFileSync('d:/Tourism_webSite/index-en.html', html, 'utf8');
console.log('\nAll fixes applied!');
