/* ===================================
   HEVELA - Main JavaScript
   Animations, interactions & effects
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // HERO CINEMATIC SLIDER LOGIC
    // ==========================================
    const heroBgContainer = document.getElementById('heroBg');
    if (heroBgContainer) {
        const heroImages = ["assets/hero/photo_10_2026-04-24_05-39-51.jpg", "assets/hero/photo_11_2026-04-24_05-39-51.jpg", "assets/hero/photo_12_2026-04-24_05-39-51.jpg", "assets/hero/photo_13_2026-04-24_05-39-51.jpg", "assets/hero/photo_14_2026-04-24_05-39-51.jpg", "assets/hero/photo_15_2026-04-24_05-39-51.jpg", "assets/hero/photo_16_2026-04-24_05-39-51.jpg", "assets/hero/photo_17_2026-04-24_05-39-51.jpg", "assets/hero/photo_18_2026-04-24_05-39-51.jpg", "assets/hero/photo_19_2026-04-24_05-39-51.jpg", "assets/hero/photo_1_2026-04-24_05-39-51.jpg", "assets/hero/photo_20_2026-04-24_05-39-51.jpg", "assets/hero/photo_21_2026-04-24_05-39-51.jpg", "assets/hero/photo_22_2026-04-24_05-39-51.jpg", "assets/hero/photo_23_2026-04-24_05-39-51.jpg", "assets/hero/photo_24_2026-04-24_05-39-51.jpg", "assets/hero/photo_25_2026-04-24_05-39-51.jpg", "assets/hero/photo_26_2026-04-24_05-39-51.jpg", "assets/hero/photo_27_2026-04-24_05-39-51.jpg", "assets/hero/photo_28_2026-04-24_05-39-51.jpg", "assets/hero/photo_29_2026-04-24_05-39-51.jpg", "assets/hero/photo_2_2026-04-24_05-39-51.jpg", "assets/hero/photo_30_2026-04-24_05-39-51.jpg", "assets/hero/photo_31_2026-04-24_05-39-51.jpg", "assets/hero/photo_32_2026-04-24_05-39-51.jpg", "assets/hero/photo_33_2026-04-24_05-39-51.jpg", "assets/hero/photo_34_2026-04-24_05-39-51.jpg", "assets/hero/photo_35_2026-04-24_05-39-51.jpg", "assets/hero/photo_36_2026-04-24_05-39-51.jpg", "assets/hero/photo_37_2026-04-24_05-39-51.jpg", "assets/hero/photo_38_2026-04-24_05-39-51.jpg", "assets/hero/photo_39_2026-04-24_05-39-51.jpg", "assets/hero/photo_3_2026-04-24_05-39-51.jpg", "assets/hero/photo_4_2026-04-24_05-39-51.jpg", "assets/hero/photo_5_2026-04-24_05-39-51.jpg", "assets/hero/photo_6_2026-04-24_05-39-51.jpg", "assets/hero/photo_7_2026-04-24_05-39-51.jpg", "assets/hero/photo_8_2026-04-24_05-39-51.jpg", "assets/hero/photo_9_2026-04-24_05-39-51.jpg"];
        let currentSlideIndex = 0;

        // Remove initially loaded image duplicate if any
        let currentImgElement = document.getElementById('currentHeroSlide');

        setInterval(() => {
            // Determine next slide
            currentSlideIndex = (currentSlideIndex + 1) % heroImages.length;
            const nextImgSrc = heroImages[currentSlideIndex];

            // Set current image as prev-slide
            if (currentImgElement) {
                currentImgElement.classList.remove('active-slide');
                currentImgElement.classList.add('prev-slide');
            }

            // Create new image
            const newImg = document.createElement('img');
            newImg.src = nextImgSrc;
            newImg.alt = "صورة الهيرو";
            newImg.className = "hero-bg-img";
            heroBgContainer.appendChild(newImg);

            // Force reflow
            newImg.offsetHeight;

            // Make new image active
            newImg.classList.add('active-slide');

            const oldImgElement = currentImgElement;
            currentImgElement = newImg;

            // Remove old image after transition completes (4 seconds)
            if (oldImgElement) {
                setTimeout(() => {
                    if (oldImgElement.parentNode) {
                        oldImgElement.parentNode.removeChild(oldImgElement);
                    }
                }, 10000);
            }

        }, 10000); // 10 seconds
    }


    // =============================
    //  PRELOADER
    // =============================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        }, 2200);
    });

    // Prevent scroll during preload
    document.body.style.overflow = 'hidden';

    // =============================
    //  CUSTOM CURSOR
    // =============================
    const cursorFollower = document.getElementById('cursorFollower');
    const cursorDot = document.getElementById('cursorDot');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
            }
        });

        // Smooth cursor follower with lerp
        function animateCursor() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            if (cursorFollower) {
                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .nav-link, .hero-btn, .lang-switch, .service-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // =============================
    //  NAVBAR
    // =============================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    let lastScrollY = 0;

    // Scroll effects
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/Show navbar on scroll direction
        if (currentScroll > lastScrollY && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScroll;
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');

            // Toggle body scroll
            if (navLinks.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close mobile menu on link click
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = 'auto';

            // Update active link
            navLinkItems.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // =============================
    //  PARALLAX SCROLL SYSTEM
    //  Only between Hero → Services
    // =============================
    const heroBg = document.getElementById('heroBg');
    const heroContent = document.querySelector('.hero-content');
    const heroScroll = document.getElementById('heroScroll');
    const heroSocial = document.getElementById('heroSocial');

    function handleParallax() {
        const scrolled = window.scrollY;
        const windowH = window.innerHeight;

        // Only run parallax within the hero scroll range
        if (scrolled < windowH * 1.2) {
            const progress = scrolled / windowH; // 0 = top, 1 = scrolled full viewport

            // Background moves SLOWER than scroll (classic parallax depth)
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + progress * 0.05})`;
            }

            // Content fades out & floats upward (cinematic exit)
            if (heroContent) {
                heroContent.style.opacity = Math.max(1 - progress * 1.8, 0);
                heroContent.style.transform = `translateY(${scrolled * -0.3}px)`;
            }

            // Scroll indicator fades early
            if (heroScroll) {
                heroScroll.style.opacity = Math.max(1 - progress * 3, 0);
            }

            // Social links fade
            if (heroSocial) {
                heroSocial.style.opacity = Math.max(1 - progress * 2.5, 0);
            }
        }

        // --- Offer Cards Image Parallax & Stacking Effect ---
        const offerCards = document.querySelectorAll('.offer-card');
        offerCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();

            // 1. Image Parallax removed to prevent cropping. Replaced with CSS hover scale.
            // 2. Cinematic Stacking (Scale down & dim when covered by next card)
            if (index < offerCards.length - 1) { // Don't do this to the very last card
                const nextCard = offerCards[index + 1];
                const nextRect = nextCard.getBoundingClientRect();

                // If the next card is coming up to cover this card
                if (nextRect.top < windowH) {
                    // Distance between this card's top and the next card's top
                    const distance = nextRect.top - rect.top;

                    // When distance is less than card height, it means it's starting to overlap
                    const overlapStart = rect.height + 50; // Add some buffer

                    if (distance < overlapStart && distance > 0) {
                        const overlapProgress = 1 - (distance / overlapStart); // 0 to 1

                        // Scale down slightly (from 1 to 0.95)
                        const scale = 1 - (overlapProgress * 0.05);
                        // Dim slightly (from 1 to 0.4 opacity, handled via filter brightness)
                        const brightness = 1 - (overlapProgress * 0.5);

                        card.style.transform = `scale(${scale})`;
                        card.style.filter = `brightness(${brightness})`;
                    } else if (distance <= 0) {
                        // Fully covered
                        card.style.transform = `scale(0.95)`;
                        card.style.filter = `brightness(0.5)`;
                    } else {
                        // Not covered yet
                        card.style.transform = `scale(1)`;
                        card.style.filter = `brightness(1)`;
                    }
                }
            }
        });

        requestAnimationFrame(handleParallax);
    }

    requestAnimationFrame(handleParallax);

    // =============================
    //  HERO PARTICLES
    // =============================
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const particleCount = 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 5;

            particle.style.setProperty('--size', size + 'px');
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.setProperty('--duration', duration + 's');
            particle.style.setProperty('--delay', delay + 's');
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            particle.style.opacity = Math.random() * 0.3 + 0.1;

            container.appendChild(particle);
        }
    }

    // =============================
    //  HERO ANIMATIONS
    // =============================
    function initHeroAnimations() {
        createParticles();
    }

    // =============================
    //  SMOOTH SCROLL
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================
    //  CINEMATIC REVEAL ON SCROLL
    // =============================

    // Standard reveals (non-services)
    const standardReveals = document.querySelectorAll('.reveal:not(.section-header):not(.service-card), .reveal-left, .reveal-right, .reveal-scale');

    const standardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove the class when it leaves the viewport so it can re-animate upon re-entry
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    standardReveals.forEach(el => standardObserver.observe(el));

    // --- Sequential Cinematic Reveal for Sections ---
    // Header appears first → then cards cascade one by one
    const sectionHeaders = document.querySelectorAll('.section-header.reveal');

    sectionHeaders.forEach(header => {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Step 1: Reveal header with cinematic animation
                    header.classList.add('visible');

                    // Step 2: Find cards inside this specific section
                    const section = header.closest('section');
                    if (section) {
                        const cards = section.querySelectorAll('.service-card.reveal');

                        // After header settles, cascade the cards
                        cards.forEach((card, i) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 400 + (i * 200)); // 400ms after header, then 200ms between each card
                        });
                    }

                    headerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -40px 0px'
        });

        headerObserver.observe(header);
    });

    // =============================
    //  ACTIVE NAV LINK ON SCROLL
    // =============================
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => sectionObserver.observe(section));

    // =============================
    //  TILT EFFECT ON HERO (Mouse Move)
    // =============================
    const hero = document.getElementById('home');

    if (hero && window.matchMedia('(hover: hover)').matches) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX / innerWidth - 0.5) * 12;
            const moveY = (clientY / innerHeight - 0.5) * 8;
            const scrollOffset = window.scrollY * 0.4;
            const progress = window.scrollY / innerHeight;

            if (heroBg) {
                heroBg.style.transform = `translate(${moveX}px, ${moveY + scrollOffset}px) scale(${1 + progress * 0.05})`;
            }
        });

        hero.addEventListener('mouseleave', () => {
            if (heroBg) {
                const scrolled = window.scrollY;
                const progress = scrolled / window.innerHeight;
                heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + progress * 0.05})`;
            }
        });
    }

    // =============================
    //  3D TILT ON SERVICE CARDS
    // =============================
    if (window.matchMedia('(hover: hover)').matches) {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;

                // Dynamic glow following cursor
                const glowX = (x / rect.width) * 100;
                const glowY = (y / rect.height) * 100;
                card.style.background = `
                    radial-gradient(circle at ${glowX}% ${glowY}%, rgba(15, 166, 142, 0.06) 0%, transparent 50%),
                    #ffffff
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.background = '';
            });
        });
    }

    // =============================
    //  RIPPLE EFFECT ON BUTTONS
    // =============================
    document.querySelectorAll('.hero-btn-primary, .nav-cta').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // =============================
    //  MAGNETIC BUTTON EFFECT
    // =============================
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.nav-cta, .hero-btn-primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ==========================================
    // 5. HOTELS, RESTAURANTS & ACTIVITIES LIGHTBOX LOGIC
    // ==========================================
    const hotelCards = document.querySelectorAll('.hotel-card, .restaurant-card, .bento-card');
    const lightbox = document.getElementById('hotelLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCurrent = document.getElementById('lightboxCurrent');
    const lightboxTotal = document.getElementById('lightboxTotal');
    const btnNext = document.getElementById('lightboxNext');
    const btnPrev = document.getElementById('lightboxPrev');
    const btnClose = document.getElementById('lightboxClose');

    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(imagesStr, hotelName, hotelNameEn) {
        currentImages = imagesStr.split(',');
        currentIndex = 0;
        lightboxTitle.textContent = hotelName;

        const lightboxSubtitle = document.getElementById('lightboxSubtitle');
        if (lightboxSubtitle) {
            lightboxSubtitle.textContent = hotelNameEn || '';
            lightboxSubtitle.style.display = hotelNameEn ? 'block' : 'none';
        }

        lightboxTotal.textContent = currentImages.length;

        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.classList.remove('loaded');
        }, 400); // wait for fade out
    }

    function updateLightboxImage() {
        lightboxImg.classList.remove('loaded');
        lightboxCurrent.textContent = currentIndex + 1;

        // Small delay to allow CSS transition to reset
        setTimeout(() => {
            lightboxImg.src = currentImages[currentIndex];
            lightboxImg.onload = () => {
                lightboxImg.classList.add('loaded');
            };
        }, 50);
    }

    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }

    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }

    // Attach Event Listeners to Cards
    hotelCards.forEach((card, index) => {
        // Hide cards beyond the first 4 (1 row on desktop)
        if (card.classList.contains('hotel-card') && index >= 4) {
            card.classList.add('hidden');
        }

        card.addEventListener('click', () => {
            const images = card.getAttribute('data-images');
            const hotel = card.getAttribute('data-hotel');
            const hotelEnElement = card.querySelector('.hotel-name-en');
            const hotelEn = hotelEnElement ? hotelEnElement.textContent : '';

            if (images && hotel) {
                openLightbox(images, hotel, hotelEn);
            }
        });
    });

    // Show More Button Logic
    const btnShowMore = document.getElementById('showMoreHotels');
    if (btnShowMore) {
        btnShowMore.addEventListener('click', () => {
            hotelCards.forEach(card => {
                card.classList.remove('hidden');
            });
            btnShowMore.style.display = 'none'; // hide button after showing all

            // Trigger standard observer for newly revealed cards if needed
            const newReveals = document.querySelectorAll('.hotel-card.reveal:not(.visible)');
            newReveals.forEach(el => standardObserver.observe(el));
        });
    }

    // Services Show More / Show Less Logic
    const btnShowMoreServices = document.getElementById('showMoreServices');
    const hiddenServices = document.querySelectorAll('.hidden-service');

    if (btnShowMoreServices) {
        let isExpanded = false;
        btnShowMoreServices.addEventListener('click', () => {
            const btnText = btnShowMoreServices.querySelector('.hero-btn-text');
            const btnIcon = btnShowMoreServices.querySelector('.hero-btn-icon');

            if (!isExpanded) {
                // Show services
                hiddenServices.forEach(card => {
                    card.style.display = 'block'; // Fixed: Must be block, not flex, to preserve card layout
                    setTimeout(() => {
                        card.classList.add('visible');
                        standardObserver.observe(card);
                    }, 50);
                });
                btnText.textContent = 'إخفاء الخدمات';
                btnIcon.style.transform = 'rotate(180deg)';
                isExpanded = true;
            } else {
                // Hide services
                hiddenServices.forEach(card => {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition before hiding
                });
                btnText.textContent = 'عرض جميع الخدمات';
                btnIcon.style.transform = 'rotate(0deg)';
                isExpanded = false;

                // Scroll back to the top of services section smoothly
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // ==========================================
    // ACTIVITIES SHOW MORE LOGIC
    // ==========================================
    const activitiesShowMoreBtn = document.getElementById('activitiesShowMoreBtn');
    const hiddenActivities = document.querySelectorAll('.bento-card.hidden-activity');

    if (activitiesShowMoreBtn && hiddenActivities.length > 0) {
        let isActivitiesExpanded = false;

        activitiesShowMoreBtn.addEventListener('click', () => {
            const btnText = activitiesShowMoreBtn.querySelector('span');
            const btnIcon = activitiesShowMoreBtn.querySelector('svg');

            if (!isActivitiesExpanded) {
                // Show hidden activities
                hiddenActivities.forEach((card, index) => {
                    card.style.display = 'block';
                    // Small delay to allow display:block to apply before animating opacity
                    setTimeout(() => {
                        card.classList.remove('hidden-activity');
                        standardObserver.observe(card); // Re-observe to trigger reveal
                    }, index * 100); // Staggered reveal
                });
                btnText.textContent = 'إخفاء الفعاليات';
                btnIcon.style.transform = 'rotate(180deg)';
                isActivitiesExpanded = true;
            } else {
                // Hide activities
                hiddenActivities.forEach((card) => {
                    card.classList.remove('active'); // Remove animation class
                    card.classList.add('hidden-activity');
                    standardObserver.unobserve(card);

                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition
                });
                btnText.textContent = 'عرض جميع الفعاليات';
                btnIcon.style.transform = 'rotate(0deg)';
                isActivitiesExpanded = false;

                // Scroll back to the top of activities section smoothly
                const activitiesSection = document.getElementById('activities');
                if (activitiesSection) {
                    activitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // Lightbox Controls
    if (btnNext) btnNext.addEventListener('click', nextImage);
    if (btnPrev) btnPrev.addEventListener('click', prevImage);
    if (btnClose) btnClose.addEventListener('click', closeLightbox);

    // Close on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-overlay') || e.target.classList.contains('lightbox-slider')) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    });

});
