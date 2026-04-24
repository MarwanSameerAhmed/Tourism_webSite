const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const classSequence = [
    'bento-large',
    'bento-wide',
    'bento-tall',
    'bento-small',
    'bento-wide',
    'bento-small'
];

let count = 0;
// Replace the class string of the first 6 .bento-card occurrences
html = html.replace(/class="bento-card(.*?)"/g, (match, p1) => {
    if (count < 6) {
        // Strip out existing bento sizing classes
        let newClasses = p1.replace(/bento-large|bento-wide|bento-tall|bento-small/g, '').trim();
        let targetClass = classSequence[count];
        count++;
        // Keep hidden-activity if it was there (it shouldn't be for the first 6, but just in case)
        return `class="bento-card ${targetClass} ${newClasses}"`.trim() + '"';
    }
    return match;
});

// Also fix the Hero content position by adding a class or inline style
// Let's add padding-top to .hero-content-inner
html = html.replace('<div class="hero-content-inner">', '<div class="hero-content-inner" style="padding-top: 10vh;">');

fs.writeFileSync('index.html', html);
console.log('Fixed bento classes and hero padding');
