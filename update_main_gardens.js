const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let mainJs = fs.readFileSync(path.join(basePath, 'scripts', 'main.js'), 'utf8');

// 1. Add Gardens to lightbox selector
mainJs = mainJs.replace(
    `const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card');`,
    `const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card, .garden-card');`
);

// 2. Add Gardens Show More logic before the final '});'
const gardensLogic = `
    // ==========================================
    // GARDENS SHOW MORE LOGIC
    // ==========================================
    const btnShowMoreGardens = document.getElementById('showMoreGardensBtn');
    const btnHideGardens = document.getElementById('hideGardensBtn');
    const hiddenGardens = document.querySelectorAll('.hidden-garden');
    const gardensSection = document.getElementById('gardens');

    if (btnShowMoreGardens && btnHideGardens && hiddenGardens.length > 0) {
        btnShowMoreGardens.addEventListener('click', () => {
            hiddenGardens.forEach((card) => {
                card.style.display = 'block';
                requestAnimationFrame(() => {
                    card.classList.remove('hidden-garden');
                    card.classList.add('revealed-garden');
                });
            });

            btnShowMoreGardens.style.display = 'none';
            btnHideGardens.style.display = 'inline-flex';
        });

        btnHideGardens.addEventListener('click', () => {
            if (gardensSection) {
                gardensSection.scrollIntoView({ behavior: 'smooth' });
            }

            Array.from(hiddenGardens).forEach((card) => {
                card.classList.remove('revealed-garden');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.add('hidden-garden');
                    card.style.opacity = '';
                    card.style.transform = '';
                }, 400);
            });

            setTimeout(() => {
                btnHideGardens.style.display = 'none';
                btnShowMoreGardens.style.display = 'inline-flex';
            }, 400);
        });
    }

});`;

mainJs = mainJs.replace(/\n\}\);\s*$/, gardensLogic + '\n');

fs.writeFileSync(path.join(basePath, 'scripts', 'main.js'), mainJs);
console.log("Updated main.js with Gardens logic.");
