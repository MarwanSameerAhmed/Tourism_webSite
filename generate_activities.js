const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
const activitiesDir = path.join(basePath, 'assets', 'events and adventures');

const folders = fs.readdirSync(activitiesDir);
let cardsHtml = '';

let validActivities = [];

folders.forEach((folder) => {
    const folderPath = path.join(activitiesDir, folder);
    const stat = fs.statSync(folderPath);
    if (!stat.isDirectory()) return;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    if (files.length === 0) return;

    validActivities.push({
        folder: folder,
        keyName: folder,
        displayName: folder,
        coverImage: `assets/events and adventures/${folder}/${files[0]}`.replace(/\\/g, '/'),
        allImages: files.map(f => `assets/events and adventures/${folder}/${f}`.replace(/\\/g, '/')).join(',')
    });
});

validActivities.forEach((activity, index) => {
    const hiddenClass = index >= 8 ? 'hidden-activity' : ''; // Show first 8

    cardsHtml += `
                <div class="activity-card ${hiddenClass}" data-hotel="${activity.keyName}" data-images="${activity.allImages}">
                    <img src="${activity.coverImage}" alt="${activity.displayName}" class="activity-img" loading="lazy">
                    <div class="activity-overlay"></div>
                    <div class="activity-content">
                        <h3 class="activity-title">${activity.displayName}</h3>
                        <div class="activity-explore">
                            <span>اكتشف المزيد</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>`;
});

const finalHtml = `
    <!-- Modern Activities Section -->
    <section class="activities-modern" id="activities">
        <div class="container">
            <!-- Full Header perfectly matching other sections, aligned to the right, light text -->
            <div class="section-header reveal section-header-right light-header">
                <div class="section-badge">
                    <svg class="section-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>تجارب لا تُنسى</span>
                </div>
                <h2 class="section-title">
                    الفعاليات والمغامرات
                    <span class="section-title-en">Events & Adventures</span>
                </h2>
                <div class="section-title-line" style="margin-left: auto; margin-right: 0;">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="section-subtitle">تشكيلة واسعة من الأنشطة المليئة بالحماس والمغامرات المصممة خصيصاً لك</p>
            </div>
            
            <div class="activities-grid reveal" style="transition-delay: 0.2s">
${cardsHtml}
            </div>

            <!-- Actions -->
            <div class="activities-actions-container reveal" style="transition-delay: 0.4s">
                <button id="showMoreActivitiesBtn" class="hero-btn hero-btn-primary" style="border: none;">
                    <span class="hero-btn-bg"></span>
                    <span class="hero-btn-text">عرض جميع الفعاليات</span>
                    <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="transition: transform 0.3s ease;">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <button id="hideActivitiesBtn" class="hero-btn hero-btn-outline" style="display: none; border: 1px solid rgba(255,255,255,0.5); color: #fff; background: transparent;">
                    <span class="hero-btn-text">إخفاء الفعاليات</span>
                    <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="transition: transform 0.3s ease;">
                        <path d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
`;

let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Insert the new one after Malls and before Lightbox
const mallsTag = '<section class="malls" id="malls">';
const lightboxTag = '<!-- Fullscreen Lightbox Modal -->';

const mallsIndex = indexHtml.indexOf(mallsTag);
const lightboxIndex = indexHtml.indexOf(lightboxTag);

if (mallsIndex !== -1 && lightboxIndex !== -1) {
    // Check if activities already exists, if so, we would replace it. 
    // Since we know we deleted it previously, we just insert before lightbox.
    indexHtml = indexHtml.substring(0, lightboxIndex) + finalHtml + '\n    ' + indexHtml.substring(lightboxIndex);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Successfully inserted Modern Activities section.");
} else {
    console.error("Could not find insertion point.");
}
