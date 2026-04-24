const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Find malls section
const startTag = '<section class="malls" id="malls">';
const endTag = '    <!-- Activities and Adventures Section (Bento Grid) -->';

const startIndex = indexHtml.indexOf(startTag);
const endIndex = indexHtml.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    // Remove the malls section completely
    indexHtml = indexHtml.substring(0, startIndex) + indexHtml.substring(endIndex);
    fs.writeFileSync(path.join(basePath, 'index.html'), indexHtml);
    console.log("Removed old malls section.");
} else {
    console.log("Could not find malls section to remove.");
}
