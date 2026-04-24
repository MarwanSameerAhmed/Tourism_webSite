const fs = require('fs');
const path = require('path');

const basePath = 'd:/Tourism_webSite';
let indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');

// Right-align Restaurants Header
const restHeaderStart = indexHtml.indexOf('<h2 class="section-title">', indexHtml.indexOf('class="restaurants"'));
// Actually, let's just find the section header of restaurants and malls and add style="text-align: right; align-items: flex-start;"
// Or add a class `text-right` to them.

// Let's rewrite generate_malls3.js to generate the new structure.
