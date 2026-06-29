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

        // Skip stacking effect on mobile — it causes dark filter and sizing issues
        if (window.innerWidth > 992) {
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
        } else {
            // On mobile, clear any leftover inline styles
            offerCards.forEach(card => {
                card.style.transform = '';
                card.style.filter = '';
            });
        }

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
                // For elements inside tall sections (gallery, etc.), keep them visible permanently
                // to prevent disappearing when scrolling through many loaded images
                const parentSection = entry.target.closest('.gallery-section, .museums-section, .activities-modern');
                if (parentSection) {
                    entry.target.classList.add('once-revealed');
                }
            } else {
                // Only re-hide elements that are NOT inside tall/dynamic sections
                if (!entry.target.classList.contains('once-revealed')) {
                    entry.target.classList.remove('visible');
                }
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
    // Attach Lightbox to Hotels, Services, Restaurants, Malls, Activities, Gardens
    const allHotelCards = document.querySelectorAll('.hotel-card, .service-card, .restaurant-card, .mall-item, .activity-card, .garden-card, .museum-item, .metro-item');
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
    let hotelCardIndex = 0;
    allHotelCards.forEach((card) => {
        // Hide hotel cards beyond the first 4 (1 row on desktop)
        if (card.classList.contains('hotel-card')) {
            if (hotelCardIndex >= 4) {
                card.classList.add('hidden');
            }
            hotelCardIndex++;
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

    // Show More / Hide Hotels Button Logic
    const btnShowMore = document.getElementById('showMoreHotels');
    const btnHideHotels = document.getElementById('hideHotels');
    const hotelsSection = document.getElementById('hotels');
    const hiddenHotelCards = document.querySelectorAll('.hotel-card.hidden');

    if (btnShowMore) {
        btnShowMore.addEventListener('click', () => {
            hiddenHotelCards.forEach((card, index) => {
                card.classList.remove('hidden');
                card.classList.add('hotel-revealing');
                card.style.animationDelay = `${index * 0.08}s`;
            });
            btnShowMore.style.display = 'none';
            if (btnHideHotels) btnHideHotels.style.display = 'flex';
        });
    }

    if (btnHideHotels) {
        btnHideHotels.addEventListener('click', () => {
            // Scroll back to hotels section top
            if (hotelsSection) {
                hotelsSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Hide cards with reverse stagger
            Array.from(hiddenHotelCards).reverse().forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('hotel-revealing');
                    card.classList.add('hidden');
                    card.style.animationDelay = '';
                }, index * 60);
            });

            // Toggle buttons after all animations
            setTimeout(() => {
                btnHideHotels.style.display = 'none';
                btnShowMore.style.display = 'flex';
            }, hiddenHotelCards.length * 60 + 100);
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

    // ==========================================
    // RESTAURANTS SHOW MORE LOGIC
    // ==========================================
    const restaurantsShowMoreBtn = document.getElementById('restaurantsShowMoreBtn');
    const hiddenRestaurants = document.querySelectorAll('.restaurant-card.hidden-restaurant');

    if (restaurantsShowMoreBtn && hiddenRestaurants.length > 0) {
        let isRestaurantsExpanded = false;

        restaurantsShowMoreBtn.addEventListener('click', () => {
            const btnText = document.getElementById('restaurantsBtnText');
            const btnIcon = document.getElementById('restaurantsBtnIcon');

            if (!isRestaurantsExpanded) {
                // Show hidden restaurants
                hiddenRestaurants.forEach((card, index) => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('hidden-restaurant');
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, index * 20); // Fast staggered reveal
                });
                btnText.textContent = 'إخفاء المطاعم';
                btnIcon.style.transform = 'rotate(180deg)';
                isRestaurantsExpanded = true;
            } else {
                // Hide restaurants smoothly
                hiddenRestaurants.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';

                        setTimeout(() => {
                            card.classList.add('hidden-restaurant');
                            card.style.display = 'none';
                        }, 500); // Wait for transition
                    }, index * 20);
                });

                btnText.textContent = 'عرض المزيد من المطاعم';
                btnIcon.style.transform = 'rotate(0deg)';
                isRestaurantsExpanded = false;

                setTimeout(() => {
                    const restaurantsSection = document.getElementById('restaurants');
                    if (restaurantsSection) {
                        restaurantsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 400);
            }
        });
    }

    // ==========================================
    // MALLS SPLIT-SCREEN LOGIC
    // ==========================================
    const mallItems = document.querySelectorAll('.mall-item');
    const mallImages = document.querySelectorAll('.mall-image');

    // Malls Expanded Grid Logic
    const btnShowMoreMalls = document.getElementById('showMoreMallsBtn');
    const btnHideMalls = document.getElementById('hideMallsBtn');
    const hiddenMalls = document.querySelectorAll('.hidden-mall');
    const mallsSection = document.getElementById('malls');

    if (btnShowMoreMalls && btnHideMalls && hiddenMalls.length > 0) {
        btnShowMoreMalls.addEventListener('click', () => {
            hiddenMalls.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('hidden-mall');
                    card.classList.add('revealed-mall');
                }, index * 100); // Staggered reveal
            });

            // Toggle buttons
            btnShowMoreMalls.style.display = 'none';
            btnHideMalls.style.display = 'inline-flex';
        });

        btnHideMalls.addEventListener('click', () => {
            // Smoothly scroll back to the start of the section
            if (mallsSection) {
                mallsSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Animate exit in reverse
            Array.from(hiddenMalls).reverse().forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('revealed-mall');
                    card.classList.add('hidden-mall');
                }, index * 50); // Faster exit
            });

            // Toggle buttons after all animations
            setTimeout(() => {
                btnHideMalls.style.display = 'none';
                btnShowMoreMalls.style.display = 'inline-flex';
            }, hiddenMalls.length * 50 + 100);
        });
    }

    if (mallItems.length > 0) {
        mallItems.forEach(item => {
            // Use mouseenter for desktop, click for mobile
            const triggerEvent = window.innerWidth > 992 ? 'mouseenter' : 'click';

            item.addEventListener(triggerEvent, () => {
                const targetMall = item.getAttribute('data-hotel');

                // Only act if it's not already active
                if (!item.classList.contains('active')) {
                    // Deactivate all
                    mallItems.forEach(el => el.classList.remove('active'));
                    mallImages.forEach(el => el.classList.remove('active'));

                    // Activate current
                    item.classList.add('active');
                    const targetImage = document.getElementById(`mall-img-${targetMall}`);
                    if (targetImage) {
                        targetImage.classList.add('active');
                    }
                }
            });
        });
    }

    // ==========================================
    // ACTIVITIES EXPANDED GRID LOGIC
    // ==========================================
    const btnShowMoreActivities = document.getElementById('showMoreActivitiesBtn');
    const btnHideActivities = document.getElementById('hideActivitiesBtn');
    const hiddenActivitiesExpanded = document.querySelectorAll('.hidden-activity');
    const activitiesSection = document.getElementById('activities');

    if (btnShowMoreActivities && btnHideActivities && hiddenActivitiesExpanded.length > 0) {
        btnShowMoreActivities.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            hiddenActivitiesExpanded.forEach((card, index) => {
                card.style.display = '';
                card.classList.remove('hidden-activity');
                // Stagger the reveal for visual effect
                setTimeout(() => {
                    card.classList.add('revealed-activity');
                }, index * 50);
            });

            btnShowMoreActivities.style.display = 'none';
            btnHideActivities.style.display = 'inline-flex';
        });

        btnHideActivities.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (activitiesSection) {
                activitiesSection.scrollIntoView({ behavior: 'smooth' });
            }

            hiddenActivitiesExpanded.forEach((card) => {
                card.classList.remove('revealed-activity');
            });

            setTimeout(() => {
                hiddenActivitiesExpanded.forEach((card) => {
                    card.classList.add('hidden-activity');
                    card.style.display = '';
                });
                btnHideActivities.style.display = 'none';
                btnShowMoreActivities.style.display = 'inline-flex';
            }, 500);
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

    // ==========================================
    // GARDENS SHOW MORE LOGIC
    // ==========================================
    const btnShowMoreGardens = document.getElementById('showMoreGardensBtn');
    const btnHideGardens = document.getElementById('hideGardensBtn');
    const hiddenGardens = document.querySelectorAll('.hidden-garden');
    const gardensSection = document.getElementById('gardens');

    if (btnShowMoreGardens && btnHideGardens && hiddenGardens.length > 0) {
        btnShowMoreGardens.addEventListener('click', () => {
            hiddenGardens.forEach((card) => {
                card.style.display = 'block';
                requestAnimationFrame(() => {
                    card.classList.remove('hidden-garden');
                    card.classList.add('revealed-garden');
                });
            });

            btnShowMoreGardens.style.display = 'none';
            btnHideGardens.style.display = 'inline-flex';
        });

        btnHideGardens.addEventListener('click', () => {
            if (gardensSection) {
                gardensSection.scrollIntoView({ behavior: 'smooth' });
            }

            Array.from(hiddenGardens).forEach((card) => {
                card.classList.remove('revealed-garden');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.add('hidden-garden');
                    card.style.opacity = '';
                    card.style.transform = '';
                }, 400);
            });

            setTimeout(() => {
                btnHideGardens.style.display = 'none';
                btnShowMoreGardens.style.display = 'inline-flex';
            }, 400);
        });
    }


    // ==========================================
    // MUSEUMS ACCORDION LOGIC (Mobile Support)
    // ==========================================
    const museumItems = document.querySelectorAll('.museum-item');
    if (museumItems.length > 0) {
        museumItems.forEach(item => {
            item.addEventListener('click', function (e) {
                if (window.innerWidth <= 992) {
                    // On mobile: first click activates the card
                    if (!this.classList.contains('active')) {
                        museumItems.forEach(el => el.classList.remove('active'));
                        this.classList.add('active');
                        e.stopPropagation(); // Prevent lightbox from opening
                        return;
                    }
                    // If already active, check if the explore button was clicked
                    const exploreBtn = this.querySelector('.museum-explore');
                    if (exploreBtn && (e.target === exploreBtn || exploreBtn.contains(e.target))) {
                        // Allow lightbox to open (handled by the generic lightbox handler)
                    } else {
                        // Click on active card body - do nothing special
                        e.stopPropagation();
                    }
                }
            });
            // Desktop hover is handled via pure CSS (:hover)
        });
    }



    // ==========================================
    // GALLERY TABS & LOAD MORE LOGIC
    // ==========================================
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const showMoreGalleryBtn = document.getElementById('showMoreGalleryBtn');
    let currentCity = 'moscow';
    let visibleCount = 12;
    const GALLERY_LOAD_STEP = 16;

    function renderGallery() {
        let cityItems = Array.from(document.querySelectorAll(`.gallery-item[data-city="${currentCity}"]`));

        // Hide all items that don't belong to current city
        galleryItems.forEach(item => {
            if (item.getAttribute('data-city') !== currentCity) {
                item.classList.add('hidden-gallery-item');
                item.classList.remove('revealed-gallery-item');
            }
        });

        // Show/hide items of current city based on visibleCount
        cityItems.forEach((item, index) => {
            if (index < visibleCount) {
                if (item.classList.contains('hidden-gallery-item')) {
                    item.classList.remove('hidden-gallery-item');
                    // Stagger the reveal animation for newly shown items
                    item.style.animationDelay = `${(index % GALLERY_LOAD_STEP) * 0.04}s`;
                    item.classList.add('revealed-gallery-item');
                }
            } else {
                item.classList.add('hidden-gallery-item');
                item.classList.remove('revealed-gallery-item');
                item.style.animationDelay = '';
            }
        });

        // Show/hide button based on remaining items
        if (showMoreGalleryBtn) {
            if (visibleCount >= cityItems.length) {
                showMoreGalleryBtn.style.display = 'none';
            } else {
                showMoreGalleryBtn.style.display = 'inline-flex';
                // Update button text with remaining count
                const remaining = cityItems.length - visibleCount;
                const btnText = showMoreGalleryBtn.querySelector('.hero-btn-text');
                if (btnText) {
                    const isArabic = document.documentElement.lang === 'ar' || !document.documentElement.lang || document.querySelector('html[dir="rtl"]');
                    btnText.textContent = isArabic
                        ? `تحميل المزيد (${remaining})`
                        : `Load More (${remaining})`;
                }
            }
        }
    }

    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                galleryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentCity = tab.getAttribute('data-target');
                visibleCount = 12; // reset on tab switch
                renderGallery();
            });
        });

        if (showMoreGalleryBtn) {
            showMoreGalleryBtn.addEventListener('click', () => {
                visibleCount += GALLERY_LOAD_STEP;
                renderGallery();
            });
        }

        // Initial render
        renderGallery();
    }

    // Attach Gallery to Lightbox (reuse existing openLightbox)
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Build image list from all visible items in the current city
            const visibleCityImgs = Array.from(document.querySelectorAll(`.gallery-item[data-city="${currentCity}"]:not(.hidden-gallery-item) img`));
            const allSrcs = visibleCityImgs.map(img => img.src).join(',');
            const cityName = currentCity === 'moscow' ? 'موسكو' : 'سانت بطرسبرغ';

            // Find index of clicked item among visible items
            const clickedSrc = item.querySelector('img').src;
            const clickedIdx = visibleCityImgs.findIndex(img => img.src === clickedSrc);

            if (allSrcs) {
                openLightbox(allSrcs, cityName, '');
                if (clickedIdx >= 0) {
                    currentIndex = clickedIdx;
                    updateLightboxImage();
                }
            }
        });
    });


    // ==========================================
    // OFFERS MOBILE CAROUSEL + POPUP
    // ==========================================
    const offerCards = document.querySelectorAll('.offer-card');
    const offersDots = document.querySelectorAll('.offers-dot-nav');
    const offerPopup = document.getElementById('offerPopup');
    const offerPopupOverlay = document.getElementById('offerPopupOverlay');
    const offerPopupImage = document.getElementById('offerPopupImage');
    const offerPopupBody = document.getElementById('offerPopupBody');
    let currentOfferIndex = 0;
    let offersAutoplayInterval = null;

    function setupOffersMobileCarousel() {
        if (window.innerWidth > 992 || offerCards.length === 0) {
            // Desktop: remove mobile classes
            offerCards.forEach(card => {
                card.classList.remove('mobile-active');
                const mobileLabel = card.querySelector('.offer-mobile-label');
                if (mobileLabel) mobileLabel.remove();

                // Fix image styles for desktop/mobile
                const img = card.querySelector('.offer-image');
                if (img) {
                    img.style.objectFit = '';
                    img.style.filter = '';
                }
            });
            return;
        }

        // Add mobile labels to each card
        offerCards.forEach((card, idx) => {
            // Fix image styles for mobile carousel
            const img = card.querySelector('.offer-image');
            if (img) {
                img.style.objectFit = 'contain';
                img.style.filter = 'none';
            }

            // Skip if already has label
            if (card.querySelector('.offer-mobile-label')) return;

            const title = card.querySelector('.offer-title')?.textContent || '';
            const subtitle = card.querySelector('.offer-subtitle-en')?.textContent || '';

            const label = document.createElement('div');
            label.className = 'offer-mobile-label';
            label.innerHTML = `
                <div class="offer-mobile-title">${title}</div>
                <div class="offer-mobile-subtitle">${subtitle}</div>
                <div class="offer-mobile-tap">
                    <span>اضغط لعرض التفاصيل</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            `;
            card.appendChild(label);
        });

        switchToOfferCard(0);
        startOffersAutoplay();
    }

    function switchToOfferCard(index) {
        currentOfferIndex = index;

        offerCards.forEach(card => card.classList.remove('mobile-active'));
        if (offerCards[index]) offerCards[index].classList.add('mobile-active');

        offersDots.forEach(d => d.classList.remove('active'));
        if (offersDots[index]) offersDots[index].classList.add('active');
    }

    function startOffersAutoplay() {
        if (offersAutoplayInterval) clearInterval(offersAutoplayInterval);

        if (window.innerWidth <= 992 && offerCards.length > 1) {
            offersAutoplayInterval = setInterval(() => {
                const nextIndex = (currentOfferIndex + 1) % offerCards.length;
                switchToOfferCard(nextIndex);
            }, 5000);
        }
    }

    // Dots click
    offersDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index'));
            switchToOfferCard(idx);
            startOffersAutoplay();
        });
    });

    // Card click -> open popup
    offerCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            if (window.innerWidth > 992) return; // Desktop: no popup

            const img = card.querySelector('.offer-image');
            const title = card.querySelector('.offer-title')?.textContent || '';
            const subtitle = card.querySelector('.offer-subtitle-en')?.textContent || '';
            const details = card.querySelectorAll('.detail-item');
            const price = card.querySelector('.offer-price')?.innerHTML || '';
            const priceLabel = card.querySelector('.offer-price-label')?.textContent || '';

            // Fill popup image
            if (img && offerPopupImage) {
                offerPopupImage.innerHTML = `<div class="offer-popup-image"><img src="${img.src}" alt="${title}"></div>`;
            }

            // Fill popup body
            if (offerPopupBody) {
                let detailsHTML = '';
                details.forEach(d => {
                    const icon = d.querySelector('.detail-icon')?.innerHTML || '';
                    const text = d.querySelector('.detail-text')?.textContent || '';
                    detailsHTML += `<div class="offer-popup-detail">${icon}<span>${text}</span></div>`;
                });

                offerPopupBody.innerHTML = `
                    <div class="offer-popup-subtitle">${subtitle}</div>
                    <h3 class="offer-popup-title">${title}</h3>
                    <div class="offer-popup-details">${detailsHTML}</div>
                    <div class="offer-popup-footer">
                        <div>
                            <div class="offer-popup-price-label">${priceLabel}</div>
                            <div class="offer-popup-price">${price}</div>
                        </div>
                        <a href="https://wa.me/79996026856?text=السلام%20عليكم%2C%20أرغب%20في%20الاستفسار%20عن%20${encodeURIComponent(title)}" target="_blank" class="offer-popup-book">
                            احجز الآن
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                `;
            }

            // Show popup
            if (offerPopup) offerPopup.classList.add('active');
            if (offerPopupOverlay) offerPopupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Pause autoplay
            if (offersAutoplayInterval) clearInterval(offersAutoplayInterval);
        });
    });

    // Close popup
    function closeOfferPopup() {
        if (offerPopup) offerPopup.classList.remove('active');
        if (offerPopupOverlay) offerPopupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        startOffersAutoplay();
    }

    if (offerPopupOverlay) {
        offerPopupOverlay.addEventListener('click', closeOfferPopup);
    }

    // Swipe on popup handle to close
    if (offerPopup) {
        let popupTouchStartY = 0;
        offerPopup.addEventListener('touchstart', (e) => {
            popupTouchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        offerPopup.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenY - popupTouchStartY;
            if (diff > 80) closeOfferPopup(); // Swipe down to close
        }, { passive: true });
    }

    // Touch swipe on carousel
    const destStackContainer = document.querySelector('.dest-stack-container');
    if (destStackContainer) {
        let offerTouchStartX = 0;
        destStackContainer.addEventListener('touchstart', (e) => {
            offerTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        destStackContainer.addEventListener('touchend', (e) => {
            if (window.innerWidth > 992) return;
            const diff = offerTouchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    switchToOfferCard((currentOfferIndex + 1) % offerCards.length);
                } else {
                    switchToOfferCard((currentOfferIndex - 1 + offerCards.length) % offerCards.length);
                }
                startOffersAutoplay();
            }
        }, { passive: true });
    }

    // Initialize
    setupOffersMobileCarousel();
    window.addEventListener('resize', () => {
        setupOffersMobileCarousel();
        if (window.innerWidth > 992 && offersAutoplayInterval) {
            clearInterval(offersAutoplayInterval);
        }
    });


    // ==========================================
    // METRO TIMELINE LOGIC + MOBILE AUTO-CAROUSEL
    // ==========================================
    const metroStops = document.querySelectorAll('.metro-stop');
    const metroCards = document.querySelectorAll('.metro-card');
    const metroProgress = document.querySelector('.metro-line-progress');
    const metroDots = document.querySelectorAll('.metro-dot-nav');
    let currentMetroIndex = 0;
    let metroAutoplayInterval = null;

    function switchToMetroCard(index) {
        currentMetroIndex = index;

        // Update stops (desktop timeline)
        metroStops.forEach(s => s.classList.remove('active'));
        if (metroStops[index]) metroStops[index].classList.add('active');

        // Update cards
        metroCards.forEach(c => c.classList.remove('active'));
        const targetCard = document.querySelector(`.metro-card[data-index="${index}"]`);
        if (targetCard) targetCard.classList.add('active');

        // Update progress line
        if (metroProgress && metroStops.length > 1) {
            const percentage = (index / (metroStops.length - 1)) * 100;
            metroProgress.style.width = `${percentage}%`;
        }

        // Update mobile dots
        metroDots.forEach(d => d.classList.remove('active'));
        if (metroDots[index]) metroDots[index].classList.add('active');
    }

    // Desktop: timeline click
    if (metroStops.length > 0 && metroCards.length > 0) {
        metroStops.forEach((stop, index) => {
            stop.addEventListener('click', () => {
                switchToMetroCard(index);
            });
        });
    }

    // Mobile: dots click
    metroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-index'));
            switchToMetroCard(idx);
            // Reset autoplay timer on manual interaction
            startMetroAutoplay();
        });
    });

    // Auto-play for mobile
    function startMetroAutoplay() {
        if (metroAutoplayInterval) clearInterval(metroAutoplayInterval);

        if (window.innerWidth <= 768 && metroCards.length > 1) {
            metroAutoplayInterval = setInterval(() => {
                const nextIndex = (currentMetroIndex + 1) % metroCards.length;
                switchToMetroCard(nextIndex);
            }, 4000); // 4 seconds per slide
        }
    }

    // Touch swipe for metro cards on mobile
    const metroWrapper = document.querySelector('.metro-cards-wrapper');
    if (metroWrapper) {
        let touchStartX = 0;
        let touchEndX = 0;

        metroWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        metroWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // min swipe distance
                if (diff > 0) {
                    // Swipe left -> next (RTL: previous)
                    const nextIndex = (currentMetroIndex + 1) % metroCards.length;
                    switchToMetroCard(nextIndex);
                } else {
                    // Swipe right -> prev (RTL: next)
                    const prevIndex = (currentMetroIndex - 1 + metroCards.length) % metroCards.length;
                    switchToMetroCard(prevIndex);
                }
                startMetroAutoplay(); // Reset timer after swipe
            }
        }, { passive: true });
    }

    // Start autoplay on load and handle resize
    startMetroAutoplay();
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (metroAutoplayInterval) clearInterval(metroAutoplayInterval);
        } else {
            startMetroAutoplay();
        }
    });


});

document.addEventListener('DOMContentLoaded', function () {
    const videoBtn = document.getElementById('heroCtaSecondary');

    if (videoBtn) {
        videoBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // 1. استخراج معرف الفيديو (Video ID) بشكل ذكي ونظيف
            let href = this.getAttribute('href');
            let videoId = "";

            try {
                if (href.includes('shorts/')) {
                    // استخراج الآيدي من روابط Shorts
                    videoId = href.split('shorts/')[1].split(/[?&]/)[0];
                } else if (href.includes('v=')) {
                    // استخراج الآيدي من الروابط العادية watch?v=
                    videoId = href.split('v=')[1].split(/[?&]/)[0];
                } else if (href.includes('youtu.be/')) {
                    // استخراج الآيدي من الروابط المختصرة
                    videoId = href.split('youtu.be/')[1].split(/[?&]/)[0];
                } else {
                    // في حال كان الرابط نظيفاً أو بصيغة أخرى
                    videoId = href.split('/').pop().split(/[?&]/)[0];
                }
            } catch (err) {
                console.error("تعذر استخراج معرف الفيديو:", err);
                return;
            }

            // بناء رابط التضمين (Embed) الصافي تماماً لتجنب Error 153
            const finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

            // 2. إنشاء خلفية النافذة المنبثقة
            const overlay = document.createElement('div');
            overlay.className = 'video-overlay-wrapper';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            // 3. هيكل مشغل الفيديو (بأبعاد تناسب الهواتف والشاشات الكبيرة)
            overlay.innerHTML = `
                <div class="video-container" style="position: relative; width: 90%; max-width: 450px; aspect-ratio: 9/16; transform: scale(0.9); transition: transform 0.3s ease;">
                    <button id="closeVideoPopup" style="position: absolute; top: -50px; right: 0; background: none; border: none; color: #fff; font-size: 40px; cursor: pointer; line-height: 1; outline: none;">&times;</button>
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="${finalUrl}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen 
                        style="border-radius: 15px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); background: #000;">
                    </iframe>
                </div>
            `;

            document.body.appendChild(overlay);

            // تفعيل الأنيميشن للظهور
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlay.querySelector('.video-container').style.transform = 'scale(1)';
            }, 10);

            // 4. وظائف الإغلاق
            const closeVideo = () => {
                overlay.style.opacity = '0';
                overlay.querySelector('.video-container').style.transform = 'scale(0.9)';
                setTimeout(() => overlay.remove(), 300);
            };

            document.getElementById('closeVideoPopup').onclick = closeVideo;

            // إغلاق عند النقر خارج الفيديو
            overlay.onclick = (event) => {
                if (event.target === overlay) closeVideo();
            };

            // إغلاق عند الضغط على زر Esc
            document.onkeydown = (event) => {
                if (event.key === "Escape") closeVideo();
            };
        });
    }
});