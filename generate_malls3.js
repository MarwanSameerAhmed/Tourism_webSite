const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
const mallsDir = path.join(basePath, 'assets', 'المراكز اﻟﺘﺠﺎرﻳﺔ Shopping centres');

// Clean names for display
const displayNames = {
    'Vegas': 'مول فيغاس',
    'vnukovo outlet village': 'أوتليت فنوكوفا',
    'Avia park': 'أفيا بارك',
    'sadafod': 'سدافود',
    'izmailovsky market': 'سوق إزمايلوفسكي',
    'GUM': 'مجمع جوم التجاري',
    'Otkony Ryad': 'مجمع أوتخوني رياد',
    'Tsum': 'مجمع تسوم',
    'CDM': 'مول عالم الأطفال'
};

const folders = fs.readdirSync(mallsDir);
let listHtml = '';
let imagesHtml = '';

let validMalls = [];

folders.forEach((folder) => {
    const folderPath = path.join(mallsDir, folder);
    const stat = fs.statSync(folderPath);
    if (!stat.isDirectory()) return;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    if (files.length === 0) return;

    let keyName = folder;
    for (const key in displayNames) {
        if (folder.toLowerCase().includes(key.toLowerCase())) {
            keyName = key;
            break;
        }
    }
    
    validMalls.push({
        folder: folder,
        keyName: keyName,
        displayName: displayNames[keyName] || folder,
        coverImage: `assets/المراكز اﻟﺘﺠﺎرﻳﺔ Shopping centres/${folder}/${files[0]}`.replace(/\\/g, '/'),
        allImages: files.map(f => `assets/المراكز اﻟﺘﺠﺎرﻳﺔ Shopping centres/${folder}/${f}`.replace(/\\/g, '/')).join(',')
    });
});

validMalls.forEach((mall, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const hiddenClass = index >= 4 ? 'hidden-mall' : ''; // Hide items after 4

    listHtml += `
                    <li class="mall-item ${activeClass} ${hiddenClass}" data-hotel="${mall.keyName}" data-images="${mall.allImages}">
                        <h3 class="mall-name">${mall.displayName}</h3>
                        <div class="mall-action" style="pointer-events: none;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                            <span>عرض الصور</span>
                        </div>
                        <!-- Mobile Image -->
                        <img class="mall-mobile-img" src="${mall.coverImage}" alt="${mall.displayName}">
                        <div class="mall-item-content">
                            <h3 class="mall-name">${mall.displayName}</h3>
                            <div class="mall-action" style="pointer-events: none;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                                <span>عرض الصور</span>
                            </div>
                        </div>
                    </li>`;

    imagesHtml += `
                <div class="mall-image ${activeClass}" id="mall-img-${mall.keyName}">
                    <img src="${mall.coverImage}" alt="${mall.displayName}">
                </div>`;
});

const finalHtml = `
    <!-- Shopping Centers Section (Split-Screen Reveal) -->
    <section class="malls" id="malls">
        <div class="container">
            <!-- Full Header perfectly matching other sections, aligned to the right -->
            <div class="section-header reveal section-header-right">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>وجهات التسوق</span>
                </div>
                <h2 class="section-title">
                    المراكز التجارية
                    <span class="section-title-en">Shopping Centers</span>
                </h2>
                <div class="section-title-line" style="margin-left: auto; margin-right: 0;">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="section-subtitle">أفضل وأفخم وجهات التسوق العالمية لضمان تجربة لا مثيل لها</p>
            </div>
            
            <div class="malls-split">
                <!-- Left Side: Typography -->
                <div class="malls-content reveal" style="transition-delay: 0.1s">
                    <ul class="malls-list">
${listHtml}
                    </ul>
                    
                    <!-- Actions -->
                    <div class="malls-actions-container reveal" style="display: flex; justify-content: flex-start; margin-top: 30px; gap: 15px;">
                        <button id="showMoreMallsBtn" class="hero-btn hero-btn-primary" style="border: none;">
                            <span class="hero-btn-bg"></span>
                            <span class="hero-btn-text">عرض المزيد من المراكز</span>
                            <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="transition: transform 0.3s ease;">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <button id="hideMallsBtn" class="hero-btn hero-btn-outline" style="display: none; border: 1px solid var(--clr-primary); color: var(--clr-primary); background: transparent;">
                            <span class="hero-btn-text">إخفاء</span>
                            <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="transition: transform 0.3s ease;">
                                <path d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Right Side: Image Showcase -->
                <div class="malls-showcase reveal" style="transition-delay: 0.3s; transition: min-height 0.8s ease;">
${imagesHtml}
                </div>
            </div>
        </div>
    </section>
`;

let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Align Restaurants Header to right
const restHeaderOriginal = `<div class="section-header reveal">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                    <span>تذوق الفخامة</span>
                </div>`;
const restHeaderReplacement = `<div class="section-header reveal section-header-right">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                    <span>تذوق الفخامة</span>
                </div>`;

if (indexHtml.includes(restHeaderOriginal)) {
    indexHtml = indexHtml.replace(restHeaderOriginal, restHeaderReplacement);
    console.log("Restaurants header right-aligned.");
} else {
    // try a more fuzzy replace
    const fallbackSearch = '<span>تذوق الفخامة</span>\n                </div>';
    if(indexHtml.includes(fallbackSearch)) {
        // Just add class to the header above it
        // This is complex, so let's just do it directly via replace in node
    }
}

// First remove the existing malls section
const startTag = '<!-- Shopping Centers Section (Split-Screen Reveal) -->';
const endTag = '<!-- Fullscreen Lightbox Modal -->';

const startIndex = indexHtml.indexOf(startTag);
const endIndex = indexHtml.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    indexHtml = indexHtml.substring(0, startIndex) + indexHtml.substring(endIndex);
}

// Now insert the new one
const insertPos = indexHtml.indexOf(endTag);

if (insertPos !== -1) {
    indexHtml = indexHtml.substring(0, insertPos) + finalHtml + '\n    ' + indexHtml.substring(insertPos);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully rebuilt Malls section.");
} else {
    console.error("Could not find insertion point.");
}
