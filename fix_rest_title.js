const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

const targetStr = `<div class="section-title-line">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="section-subtitle">تشكيلة من أروع المطاعم والمقاهي لتجربة تذوق استثنائية</p>`;

const replacementStr = `<div class="section-title-line" style="margin-left: auto !important; margin-right: 0 !important; justify-content: flex-start !important;">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="section-subtitle" style="margin-left: auto !important; margin-right: 0 !important; text-align: right !important;">تشكيلة من أروع المطاعم والمقاهي لتجربة تذوق استثنائية</p>`;

if (indexHtml.includes(targetStr)) {
    indexHtml = indexHtml.replace(targetStr, replacementStr);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Restaurants title fixed.");
} else {
    // If exact match fails, use regex
    const regex = /<div class="section-title-line">\s*<span><\/span>\s*<span><\/span>\s*<span><\/span>\s*<\/div>\s*<p class="section-subtitle">تشكيلة من أروع المطاعم والمقاهي لتجربة تذوق استثنائية<\/p>/;
    indexHtml = indexHtml.replace(regex, replacementStr);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Restaurants title fixed with regex.");
}
