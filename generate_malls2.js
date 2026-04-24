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
let extraCardsHtml = '';

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

// Split the malls into "Featured" (top 4) and "Extra" (the rest)
const featuredMalls = validMalls.slice(0, 4);
const extraMalls = validMalls.slice(4);

featuredMalls.forEach((mall, index) => {
    const activeClass = index === 0 ? 'active' : '';

    listHtml += `
                    <li class="mall-item ${activeClass}" data-hotel="${mall.keyName}" data-images="${mall.allImages}">
                        <h3 class="mall-name">${mall.displayName}</h3>
                        <div class="mall-action">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                            <span>عرض الصور</span>
                        </div>
                        <!-- Mobile Image -->
                        <img class="mall-mobile-img" src="${mall.coverImage}" alt="${mall.displayName}">
                        <div class="mall-item-content">
                            <h3 class="mall-name">${mall.displayName}</h3>
                            <div class="mall-action">
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

// Generate extra cards as Bento layout
const bentoClasses = ['bento-large', 'bento-tall', 'bento-wide', 'bento-small', 'bento-small'];
extraMalls.forEach((mall, index) => {
    const bClass = bentoClasses[index % bentoClasses.length];
    extraCardsHtml += `
            <div class="bento-card hidden-mall ${bClass}" data-hotel="${mall.keyName}" data-images="${mall.allImages}" style="opacity: 0; transform: translateY(30px); display: none;">
                <img src="${mall.coverImage}" alt="${mall.displayName}">
                <div class="bento-overlay"></div>
                <div class="bento-content">
                    <h3 class="bento-title" style="font-family: var(--font-ar);">${mall.displayName}</h3>
                    <div class="bento-explore">
                        عرض الصور
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>`;
});

const finalHtml = `
    <!-- Shopping Centers Section (Split-Screen Reveal) -->
    <section class="malls" id="malls">
        <div class="container">
            <!-- Full Header perfectly matching other sections -->
            <div class="section-header reveal">
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
                <div class="section-title-line">
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
                </div>
                <!-- Right Side: Image Showcase -->
                <div class="malls-showcase reveal" style="transition-delay: 0.3s">
${imagesHtml}
                </div>
            </div>
            
            <!-- Extra Malls Grid -->
            <div class="malls-extra-grid bento-grid" style="margin-top: 50px;">
${extraCardsHtml}
            </div>

            <!-- Actions -->
            <div class="malls-actions-container reveal" style="display: flex; justify-content: center; margin-top: 50px; gap: 15px;">
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
    </section>
`;

let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// First remove the existing malls section
const startTag = '<section class="malls" id="malls">';
const endTag = '    <!-- Fullscreen Lightbox Modal -->';

const startIndex = indexHtml.indexOf(startTag);
const endIndex = indexHtml.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    indexHtml = indexHtml.substring(0, startIndex) + indexHtml.substring(endIndex);
}

// Now insert the new one before the lightbox
const insertPos = indexHtml.indexOf(endTag);

if (insertPos !== -1) {
    indexHtml = indexHtml.substring(0, insertPos) + finalHtml + '\n' + indexHtml.substring(insertPos);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully rebuilt Malls section.");
} else {
    console.error("Could not find insertion point.");
}
