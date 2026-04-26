const fs = require('fs');

const indexFile = 'd:/Tourism_webSite/index.html';
const generatedFile = 'd:/Tourism_webSite/scratch_metro.html';

let html = fs.readFileSync(indexFile, 'utf8');
const generatedHtml = fs.readFileSync(generatedFile, 'utf8');

const lines = html.split('\n');

// Replace lines 4110 to 4207 (0-indexed, so lines 4111 to 4208)
const before = lines.slice(0, 4110).join('\n');
const after = lines.slice(4208).join('\n');

const newHtml = before + '\n' + generatedHtml + '\n' + after;

fs.writeFileSync(indexFile, newHtml, 'utf8');
console.log('Replaced successfully!');
