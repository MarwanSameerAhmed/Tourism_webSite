const fs = require('fs');
const indexFile = 'd:/Tourism_webSite/index.html';
let html = fs.readFileSync(indexFile, 'utf8');

const target = `                    <div class="about-cta">
                        <a href="https://wa.me/79996026856?text=السلام%20عليكم%2C%20أرغب%20في%20الاستفسار%20عن%20خدمات%20وجهة"
                            target="_blank" class="hero-btn hero-btn-primary" style="padding: 12px 30px;">
                            <span class="hero-btn-bg"></span>
                            <span class="hero-btn-text">تواصل معنا</span>
                            <svg class="hero-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2"
                                style="transform: rotate(0deg); margin-right: 8px;">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </a>
                    </div>`;

const replacement = `                    <div class="about-cta">
                        <a href="https://wa.me/79996026856?text=السلام%20عليكم%2C%20أرغب%20في%20الاستفسار%20عن%20خدمات%20وجهة"
                            target="_blank" class="hero-btn hero-btn-primary" style="padding: 12px 30px;">
                            <span class="hero-btn-bg"></span>
                            <span class="hero-btn-text">تواصل معنا</span>
                            <svg class="hero-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2"
                                style="transform: rotate(0deg); margin-right: 8px;">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </a>
                        <a href="assets/events_wejha.pdf" target="_blank" class="hero-btn hero-btn-secondary" style="padding: 12px 30px;" download>
                            <span class="hero-btn-text">تحميل الفعاليات</span>
                            <svg class="hero-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(0deg); margin-right: 8px;">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>
                        <a href="assets/services_wejha.pdf" target="_blank" class="hero-btn hero-btn-secondary" style="padding: 12px 30px;" download>
                            <span class="hero-btn-text">دليل الخدمات</span>
                            <svg class="hero-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(0deg); margin-right: 8px;">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>
                    </div>`;

if(html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync(indexFile, html, 'utf8');
    console.log('Replaced successfully');
} else {
    console.log('Target not found. Doing loose replacement...');
    // Replace by finding the about-cta start and end
    const startIdx = html.indexOf('<div class="about-cta">');
    const endIdx = html.indexOf('</div>', startIdx + 50) + 6;
    html = html.substring(0, startIdx) + replacement + html.substring(endIdx);
    fs.writeFileSync(indexFile, html, 'utf8');
    console.log('Replaced via substring');
}
