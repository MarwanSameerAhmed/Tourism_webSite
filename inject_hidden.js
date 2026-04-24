const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// We know there are 21 bento-cards.
// We want to add ' hidden-activity' to class="bento-card ..." for index >= 6

let bentoCount = 0;
html = html.replace(/class="bento-card /g, (match) => {
    bentoCount++;
    if (bentoCount > 6) {
        return 'class="bento-card hidden-activity ';
    }
    return match;
});

// Now inject the show more button after the bento-grid ends
const endGridStr = '            </div>\n        </div>\n    </section>';
const actionsHtml = `            </div>
            <div class="activities-actions reveal">
                <button id="activitiesShowMoreBtn" class="primary-btn">
                    <span>عرض جميع الفعاليات</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                        <path d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
            </div>
        </div>
    </section>`;

html = html.replace(endGridStr, actionsHtml);

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html for hidden activities');
