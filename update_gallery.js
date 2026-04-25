const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// 1. Add CSS Link
const cssInsert = '<link rel="stylesheet" href="styles/gallery.css?v=2">';
if (!indexHtml.includes('styles/gallery.css')) {
    indexHtml = indexHtml.replace('<link rel="stylesheet" href="styles/museums.css?v=2">', '<link rel="stylesheet" href="styles/museums.css?v=2">\n    ' + cssInsert);
}

fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);

let mainJs = fs.readFileSync(path.join(basePath, 'scripts', 'main.js'), 'utf8');

// 2. Add Gallery Logic
const galleryLogic = `
    // ==========================================
    // GALLERY TABS & LOAD MORE LOGIC
    // ==========================================
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const showMoreGalleryBtn = document.getElementById('showMoreGalleryBtn');
    let currentCity = 'moscow';
    let visibleCount = 12;

    function renderGallery() {
        let cityItems = Array.from(document.querySelectorAll(\`.gallery-item[data-city="\${currentCity}"]\`));
        
        galleryItems.forEach(item => {
            if (item.getAttribute('data-city') !== currentCity) {
                item.classList.add('hidden-gallery-item');
                item.classList.remove('revealed-gallery-item');
            }
        });

        cityItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.classList.remove('hidden-gallery-item');
                if (!item.classList.contains('revealed-gallery-item')) {
                    item.classList.add('revealed-gallery-item');
                }
            } else {
                item.classList.add('hidden-gallery-item');
                item.classList.remove('revealed-gallery-item');
            }
        });

        if (visibleCount >= cityItems.length) {
            showMoreGalleryBtn.style.display = 'none';
        } else {
            showMoreGalleryBtn.style.display = 'inline-flex';
        }
    }

    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                galleryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentCity = tab.getAttribute('data-target');
                visibleCount = 12; // reset
                renderGallery();
            });
        });

        showMoreGalleryBtn.addEventListener('click', () => {
            visibleCount += 12;
            renderGallery();
        });
        
        // Initial render
        // renderGallery(); // Handled by HTML classes initially
    }

    // Attach Gallery to Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Build current images array from the entire current city
            const cityItems = Array.from(document.querySelectorAll(\`.gallery-item[data-city="\${currentCity}"] img\`));
            window.currentImages = cityItems.map(img => img.src);
            
            // Find index of clicked item
            const clickedSrc = item.querySelector('img').src;
            window.currentImageIndex = window.currentImages.indexOf(clickedSrc);
            if (window.currentImageIndex === -1) window.currentImageIndex = 0;
            
            // Re-use lightbox UI
            const lightbox = document.getElementById('hotelLightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxTitle = document.getElementById('lightboxTitle');
            const lightboxCounter = document.getElementById('lightboxCounter');
            
            if (lightbox && lightboxImg) {
                lightboxImg.src = window.currentImages[window.currentImageIndex];
                lightboxTitle.textContent = currentCity === 'moscow' ? 'موسكو' : 'سانت بطرسبرغ';
                
                if (window.currentImages.length > 1) {
                    lightboxCounter.textContent = \`\${window.currentImageIndex + 1} / \${window.currentImages.length}\`;
                    lightboxCounter.style.display = 'block';
                } else {
                    lightboxCounter.style.display = 'none';
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

`;

// To ensure we don't duplicate, check if it's there
if (!mainJs.includes('GALLERY TABS & LOAD MORE LOGIC')) {
    mainJs = mainJs.replace(/\n\}\);\s*$/, '\n' + galleryLogic + '\n});\n');
    fs.writeFileSync(path.join(basePath, 'scripts', 'main.js'), mainJs);
}

console.log("Updated index.html and main.js for Gallery.");
