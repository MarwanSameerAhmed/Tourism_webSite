const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// 1. Add CSS Link
const cssInsert = '<link rel="stylesheet" href="styles/museums.css?v=2">';
if (!indexHtml.includes('styles/museums.css')) {
    indexHtml = indexHtml.replace('<link rel="stylesheet" href="styles/gardens.css?v=2">', '<link rel="stylesheet" href="styles/gardens.css?v=2">\n    ' + cssInsert);
}

fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);

let mainJs = fs.readFileSync(path.join(basePath, 'scripts', 'main.js'), 'utf8');

// 2. Add Museum to Lightbox selector
mainJs = mainJs.replace(
    `const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card, .garden-card');`,
    `const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card, .garden-card, .museum-item');`
);

// 3. Add Accordion Mobile Logic
const accordionLogic = `
    // ==========================================
    // MUSEUMS ACCORDION LOGIC (Mobile Support)
    // ==========================================
    const museumItems = document.querySelectorAll('.museum-item');
    if (museumItems.length > 0) {
        museumItems.forEach(item => {
            // Only necessary for touch devices where hover is sticky
            item.addEventListener('click', function(e) {
                // If it's not active, make it active and prevent lightbox immediately
                // to allow the user to see the content first.
                if (!this.classList.contains('active') && window.innerWidth <= 992) {
                    museumItems.forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                }
            });
            // Desktop hover is handled via pure CSS (:hover)
        });
    }

`;

mainJs = mainJs.replace(/\n\}\);\s*$/, '\n' + accordionLogic + '\n});\n');

fs.writeFileSync(path.join(basePath, 'scripts', 'main.js'), mainJs);
console.log("Updated index.html and main.js for Museums.");
