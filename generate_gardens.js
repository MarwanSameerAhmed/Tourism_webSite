const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
const sourceDir = path.join(basePath, 'assets', 'gardens and tourist attractions');

const folders = fs.readdirSync(sourceDir);
let cardsHtml = '';
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
        displayName: folder, // We might want to trim english words? Or keep as is.
        coverImage: `assets/gardens and tourist attractions/${folder}/${files[0]}`.replace(/\\/g, '/'),
        allImages: files.map(f => `assets/gardens and tourist attractions/${folder}/${f}`.replace(/\\/g, '/')).join(',')
    });
});

validItems.forEach((item, index) => {
    // Determine class for asymmetric grid
    let gridClass = 'garden-card--standard';
    if (index === 0) gridClass = 'garden-card--large'; // 1st item big
    else if (index === 1 || index === 4) gridClass = 'garden-card--wide';
    else if (index === 2) gridClass = 'garden-card--tall';

    // Hide items beyond index 4 (show first 5)
    const hiddenClass = index > 4 ? 'hidden-garden' : '';

    cardsHtml += `
                <div class="garden-card ${gridClass} ${hiddenClass}" data-hotel="${item.keyName}" data-images="${item.allImages}">
                    <img src="${item.coverImage}" alt="${item.displayName}" class="garden-img" loading="lazy">
                    <div class="garden-overlay"></div>
                    <div class="garden-content">
                        <div class="garden-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <h3 class="garden-title">${item.displayName}</h3>
                    </div>
                </div>`;
});

const finalHtml = `
    <!-- Gardens & Tourist Attractions Section -->
    <section class="gardens-section" id="gardens">
        <div class="container">
            <!-- Full Header perfectly matching other sections -->
            <div class="section-header reveal">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    <span>طبيعة خلابة</span>
                </div>
                <h2 class="section-title">
                    الحدائق والمعالم السياحية
                    <span class="section-title-en">Parks & Landmarks</span>
                </h2>
                <div class="section-title-line">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="section-subtitle">استكشف أجمل الحدائق والمعالم السياحية التي تخطف الأنفاس</p>
            </div>
            
            <div class="gardens-grid reveal" style="transition-delay: 0.2s">
${cardsHtml}
            </div>

            <!-- Actions -->
            <div class="gardens-actions-container reveal" style="transition-delay: 0.4s">
                <button id="showMoreGardensBtn" class="hero-btn hero-btn-primary" style="border: none;">
                    <span class="hero-btn-bg"></span>
                    <span class="hero-btn-text">عرض كافة المعالم</span>
                    <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="transition: transform 0.3s ease;">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <button id="hideGardensBtn" class="hero-btn hero-btn-primary" style="display: none; border: none;">
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

// Insert the new section after Hero or somewhere appropriate.
// Let's insert it before the Malls section.
const insertTag = '<section class="malls" id="malls">';
const insertIndex = indexHtml.indexOf(insertTag);

if (insertIndex !== -1) {
    indexHtml = indexHtml.substring(0, insertIndex) + finalHtml + '\n    ' + indexHtml.substring(insertIndex);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully inserted Gardens section.");
} else {
    console.error("Could not find insertion point.");
}
