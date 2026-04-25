const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// 1. Add CSS Link
const cssInsert = '<link rel="stylesheet" href="styles/metro.css?v=2">';
if (!indexHtml.includes('styles/metro.css')) {
    indexHtml = indexHtml.replace('<link rel="stylesheet" href="styles/gallery.css?v=2">', '<link rel="stylesheet" href="styles/gallery.css?v=2">\n    ' + cssInsert);
}

fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);

let mainJs = fs.readFileSync(path.join(basePath, 'scripts', 'main.js'), 'utf8');

// 2. Add Metro to Lightbox selector
mainJs = mainJs.replace(
    `const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card, .garden-card, .museum-item');`,
    `const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card, .garden-card, .museum-item, .metro-item');`
);

// 3. Add Metro Timeline Logic
const metroLogic = `
    // ==========================================
    // METRO TIMELINE LOGIC
    // ==========================================
    const metroStops = document.querySelectorAll('.metro-stop');
    const metroCards = document.querySelectorAll('.metro-card');
    const metroProgress = document.querySelector('.metro-line-progress');

    if (metroStops.length > 0 && metroCards.length > 0) {
        metroStops.forEach((stop, index) => {
            stop.addEventListener('click', () => {
                // Update stops
                metroStops.forEach(s => s.classList.remove('active'));
                stop.classList.add('active');

                // Update cards
                metroCards.forEach(c => c.classList.remove('active'));
                const targetCard = document.querySelector(\`.metro-card[data-index="\${index}"]\`);
                if (targetCard) {
                    targetCard.classList.add('active');
                }

                // Update progress line (if applicable)
                if (metroProgress) {
                    const percentage = (index / (metroStops.length - 1)) * 100;
                    metroProgress.style.width = \`\${percentage}%\`;
                }
            });
        });
    }

`;

// To ensure we don't duplicate
if (!mainJs.includes('METRO TIMELINE LOGIC')) {
    mainJs = mainJs.replace(/\n\}\);\s*$/, '\n' + metroLogic + '\n});\n');
    fs.writeFileSync(path.join(basePath, 'scripts', 'main.js'), mainJs);
}

console.log("Updated index.html and main.js for Metro.");
