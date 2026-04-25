const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
const sourceDir = path.join(basePath, 'assets', 'محطات الميترو');

const folders = fs.readdirSync(sourceDir);
let itemsHtml = '';
let timelineHtml = '';
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
        coverImage: `assets/محطات الميترو/${folder}/${files[0]}`.replace(/\\/g, '/'),
        allImages: files.map(f => `assets/محطات الميترو/${folder}/${f}`.replace(/\\/g, '/')).join(',')
    });
});

validItems.forEach((item, index) => {
    const activeClass = index === 0 ? 'active' : '';
    
    timelineHtml += `
        <div class="metro-stop ${activeClass}" data-target="${index}">
            <div class="metro-dot"></div>
            <span class="metro-stop-name">${item.displayName.replace('محطة ', '')}</span>
        </div>`;

    itemsHtml += `
        <div class="metro-card ${activeClass} metro-item" data-index="${index}" data-hotel="${item.keyName}" data-images="${item.allImages}">
            <img src="${item.coverImage}" alt="${item.displayName}" class="metro-img" loading="lazy">
            <div class="metro-card-content">
                <h3 class="metro-title">${item.displayName}</h3>
                <div class="metro-explore">استكشف المحطة <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
            </div>
        </div>`;
});

const finalHtml = `
    <!-- Metro Stations Section -->
    <section class="metro-section" id="metro">
        <div class="container">
            <div class="section-header reveal section-header-right">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span>تحت الأرض</span>
                </div>
                <h2 class="section-title">
                    محطات الميترو
                    <span class="section-title-en">Metro Stations</span>
                </h2>
                <div class="section-title-line" style="margin-left: auto !important; margin-right: 0 !important; justify-content: flex-start !important;">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="section-subtitle" style="margin-left: auto !important; margin-right: 0 !important; text-align: right !important;">قصور تحت الأرض تعكس روعة الهندسة المعمارية الروسية</p>
            </div>
            
            <div class="metro-container reveal" style="transition-delay: 0.2s">
                <div class="metro-timeline">
                    <div class="metro-line"></div>
                    <div class="metro-line-progress"></div>
                    <div class="metro-stops">
${timelineHtml}
                    </div>
                </div>
                
                <div class="metro-cards-wrapper">
${itemsHtml}
                </div>
            </div>
        </div>
    </section>
`;

let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Insert after Gallery section
const galleryStart = indexHtml.indexOf('<section class="gallery-section" id="gallery">');
const nextSectionMatch = indexHtml.indexOf('<section', galleryStart + 10);

if (nextSectionMatch !== -1) {
    indexHtml = indexHtml.substring(0, nextSectionMatch) + finalHtml + '\n    ' + indexHtml.substring(nextSectionMatch);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully inserted Metro section.");
} else {
    // If it's the last section before footer
    const footerMatch = indexHtml.indexOf('<footer>');
    if (footerMatch !== -1) {
        indexHtml = indexHtml.substring(0, footerMatch) + finalHtml + '\n    ' + indexHtml.substring(footerMatch);
        fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
        console.log("Successfully inserted Metro section before footer.");
    }
}
