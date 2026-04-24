const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find all restaurant cards
const cardRegex = /<div class="restaurant-card"/g;
let match;
let cards = [];

while ((match = cardRegex.exec(html)) !== null) {
    cards.push(match.index);
}

console.log(`Found ${cards.length} restaurant cards`);

if (cards.length > 6) {
    // Add 'hidden-restaurant' to cards from index 6 onwards
    // Working backwards to not mess up indices
    for (let i = cards.length - 1; i >= 6; i--) {
        const start = cards[i];
        const replaceTarget = '<div class="restaurant-card"';
        const replacement = '<div class="restaurant-card hidden-restaurant"';
        html = html.substring(0, start) + replacement + html.substring(start + replaceTarget.length);
    }
    
    fs.writeFileSync('index.html', html);
    console.log(`Added 'hidden-restaurant' to ${cards.length - 6} cards.`);
}
