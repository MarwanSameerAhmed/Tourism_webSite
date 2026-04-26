const fs = require('fs');
const path = require('path');

const metroDir = 'd:/Tourism_webSite/assets/محطات الميترو';
const dirs = fs.readdirSync(metroDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort((a, b) => parseInt(a) - parseInt(b));

let stopsHtml = '';
let cardsHtml = '';
let dotsHtml = '';

dirs.forEach((dirName, index) => {
    const dirPath = path.join(metroDir, dirName);
    const files = fs.readdirSync(dirPath)
        .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'))
        .sort((a, b) => {
            if(a.includes('غلاف') || a.includes('cover')) return -1;
            if(b.includes('غلاف') || b.includes('cover')) return 1;
            return a.localeCompare(b, undefined, {numeric: true});
        });

    const stationName = dirName.split(' ').slice(1).join(' '); // Remove the number

    stopsHtml += `
                        <div class="metro-stop ${index === 0 ? 'active' : ''}" data-target="${index}">
                            <div class="metro-dot"></div>
                            <span class="metro-stop-name">${stationName}</span>
                        </div>`;

    const imagesStr = files.map(f => `assets/محطات الميترو/${dirName}/${f}`).join(',');
    const coverImage = files.find(f => f.includes('غلاف') || f.includes('cover')) || files[0] || '';

    cardsHtml += `
                    <div class="metro-card ${index === 0 ? 'active' : ''} metro-item" data-index="${index}" data-hotel="محطة ${stationName}"
                        data-images="${imagesStr}">
                        <img src="assets/محطات الميترو/${dirName}/${coverImage}"
                            alt="محطة ${stationName}" class="metro-img" loading="lazy">
                        <div class="metro-card-content">
                            <h3 class="metro-title">محطة ${stationName}</h3>
                            <div class="metro-explore">استكشف المحطة <svg viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg></div>
                        </div>
                    </div>`;

    dotsHtml += `
                <button class="metro-dot-nav ${index === 0 ? 'active' : ''}" data-index="${index}"></button>`;
});

const output = `<div class="metro-stops">${stopsHtml}
                    </div>
                </div>

                <div class="metro-cards-wrapper">${cardsHtml}
                </div>
            </div>

            <!-- Mobile Dots Navigation -->
            <div class="metro-dots-nav" id="metroDots">${dotsHtml}
            </div>`;

fs.writeFileSync('d:/Tourism_webSite/scratch_metro.html', output);
console.log('Done!');
