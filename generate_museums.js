const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
const sourceDir = path.join(basePath, 'assets', 'المتاحف والاماكن اﻟﺘﺎرﻳﺨﻴﺔ');

const folders = fs.readdirSync(sourceDir);
let itemsHtml = '';
let validItems = [];

folders.forEach((folder) => {
    const folderPath = path.join(sourceDir, folder);
    const stat = fs.statSync(folderPath);
    if (!stat.isDirectory()) return;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    if (files.length === 0) return;

    validItems.push({
        folder: folder,
        keyName: folder,
        displayName: folder,
        coverImage: `assets/المتاحف والاماكن اﻟﺘﺎرﻳﺨﻴﺔ/${folder}/${files[0]}`.replace(/\\/g, '/'),
        allImages: files.map(f => `assets/المتاحف والاماكن اﻟﺘﺎرﻳﺨﻴﺔ/${folder}/${f}`.replace(/\\/g, '/')).join(',')
    });
});

validItems.forEach((item, index) => {
    const activeClass = index === 0 ? 'active' : '';
    
    itemsHtml += `
                <div class="museum-item ${activeClass}" data-hotel="${item.keyName}" data-images="${item.allImages}">
                    <img src="${item.coverImage}" alt="${item.displayName}" class="museum-img" loading="lazy">
                    <div class="museum-overlay"></div>
                    <div class="museum-content">
                        <div class="museum-number">0${index + 1}</div>
                        <h3 class="museum-title">${item.displayName}</h3>
                        <div class="museum-explore">
                            <span>اكتشف المتحف</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                    </div>
                </div>`;
});

const finalHtml = `
    <!-- Museums & Historical Places Section -->
    <section class="museums-section" id="museums">
        <div class="container">
            <!-- Header matching site style -->
            <div class="section-header reveal section-header-right">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19V5a2 2 0 012-2h13.4a1 1 0 01.76 1.64L19 6l1.16 1.36a1 1 0 01-.76 1.64H6v10h14v2H4z" />
                    </svg>
                    <span>تاريخ وحضارة</span>
                </div>
                <h2 class="section-title">
                    المتاحف والأماكن التاريخية
                    <span class="section-title-en">Museums & History</span>
                </h2>
                <div class="section-title-line" style="margin-left: auto !important; margin-right: 0 !important; justify-content: flex-start !important;">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="section-subtitle" style="margin-left: auto !important; margin-right: 0 !important; text-align: right !important;">رحلة عبر الزمن لاكتشاف أسرار وحكايات التاريخ الروسي العريق</p>
            </div>
            
            <div class="museums-accordion reveal" style="transition-delay: 0.2s">
${itemsHtml}
            </div>
        </div>
    </section>
`;

let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Insert the new section after Gardens section.
const insertTag = '<!-- Restaurants Section -->';
const insertIndex = indexHtml.indexOf(insertTag);

if (insertIndex !== -1) {
    indexHtml = indexHtml.substring(0, insertIndex) + finalHtml + '\n    ' + indexHtml.substring(insertIndex);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully inserted Museums section.");
} else {
    console.error("Could not find insertion point.");
}
