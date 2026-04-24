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

folders.forEach((folder, index) => {
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
    
    const displayName = displayNames[keyName] || folder;
    const coverImage = `assets/المراكز اﻟﺘﺠﺎرﻳﺔ Shopping centres/${folder}/${files[0]}`.replace(/\\/g, '/');
    const allImages = files.map(f => `assets/المراكز اﻟﺘﺠﺎرﻳﺔ Shopping centres/${folder}/${f}`.replace(/\\/g, '/')).join(',');
    
    const activeClass = index === 0 ? 'active' : '';
    const hiddenClass = index >= 4 ? 'hidden-mall' : ''; // Hide items after the first 4 for the "Show More"

    listHtml += `
                    <li class="mall-item ${activeClass} ${hiddenClass}" data-hotel="${keyName}" data-images="${allImages}">
                        <h3 class="mall-name">${displayName}</h3>
                        <div class="mall-action">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                            <span>عرض الصور</span>
                        </div>
                        <!-- Mobile Image -->
                        <img class="mall-mobile-img" src="${coverImage}" alt="${displayName}">
                        <div class="mall-item-content">
                            <h3 class="mall-name">${displayName}</h3>
                            <div class="mall-action">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                                <span>عرض الصور</span>
                            </div>
                        </div>
                    </li>`;

    imagesHtml += `
                <div class="mall-image ${activeClass}" id="mall-img-${keyName}">
                    <img src="${coverImage}" alt="${displayName}">
                </div>`;
});

const finalHtml = `
    <!-- Shopping Centers Section (Split-Screen Reveal) -->
    <section class="malls" id="malls">
        <div class="container">
            <div class="section-header reveal">
                <div class="section-badge">
                    <span class="badge-dot"></span>
                    <span class="badge-text">وجهات التسوق</span>
                </div>
                <h2 class="section-title">المراكز التجارية</h2>
            </div>
            
            <div class="malls-split">
                <!-- Left Side: Typography -->
                <div class="malls-content reveal" style="transition-delay: 0.1s">
                    <ul class="malls-list">
${listHtml}
                    </ul>
                    <div class="malls-actions-btn reveal" style="transition-delay: 0.2s">
                        <button id="showMoreMallsBtn" class="hero-btn hero-btn-outline">
                            <span class="hero-btn-bg"></span>
                            <span class="hero-btn-text" id="mallsBtnText">عرض المزيد من المراكز</span>
                            <svg id="mallsBtnIcon" class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="transition: transform 0.3s ease;">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Right Side: Image Showcase -->
                <div class="malls-showcase reveal" style="transition-delay: 0.3s">
${imagesHtml}
                </div>
            </div>
        </div>
    </section>
`;

// Insert into index.html AFTER the activities section
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Find the end of activities section.
const insertMarker = '    <!-- Fullscreen Lightbox Modal -->';
const insertPos = indexHtml.indexOf(insertMarker);

if (insertPos !== -1) {
    indexHtml = indexHtml.substring(0, insertPos) + finalHtml + '\n' + indexHtml.substring(insertPos);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully inserted Malls section before Lightbox.");
} else {
    console.error("Could not find insertion point in index.html");
}
