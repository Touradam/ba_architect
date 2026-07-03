// ==========================================
// MOTION PREFERENCES
// ==========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================
// GALLERY
// ==========================================

let currentImageIndex = 0;
const totalImages = 16;
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startDragX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let swipeVelocity = 0;
let lastTouchTime = 0;

function initGallery() {
    generateThumbnails();
    updateGalleryImage();
    setupKeyboardNavigation();
    setupPremiumSwipeNavigation();
    showSwipeHint();
}

function generateThumbnails() {
    const thumbnailContainer = document.getElementById('galleryThumbnails');
    for (let i = 0; i < totalImages; i++) {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'gallery-thumb';
        thumb.setAttribute('role', 'tab');
        thumb.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        thumb.setAttribute('aria-label', `Portfolio page ${i + 1}`);
        if (i === 0) thumb.classList.add('active');

        const img = document.createElement('img');
        img.src = `images/BA.A portfolio${i}.jpg`;
        img.alt = `Portfolio page ${i + 1} thumbnail`;
        img.loading = 'lazy';

        thumb.appendChild(img);
        thumb.onclick = () => goToImage(i);
        thumbnailContainer.appendChild(thumb);
    }
}

function showSwipeHint() {
    if (window.innerWidth <= 768 && !prefersReducedMotion) {
        const imageContainer = document.querySelector('.gallery-image-container');
        const hint = document.createElement('div');
        hint.className = 'swipe-hint show';
        hint.innerHTML = '<div class="swipe-indicator">Swipe to flip pages</div>';
        imageContainer.appendChild(hint);

        setTimeout(() => {
            hint.classList.remove('show');
            setTimeout(() => hint.remove(), 300);
        }, 3000);
    }
}

function goToImage(index) {
    const galleryImage = document.getElementById('galleryImage');
    const counter = document.querySelector('.gallery-counter');

    galleryImage.classList.remove('fade-transition');
    void galleryImage.offsetWidth;
    galleryImage.classList.add('fade-transition');

    if (counter) {
        counter.classList.add('pulse');
        setTimeout(() => counter.classList.remove('pulse'), 300);
    }

    currentImageIndex = index;
    updateGalleryImage();

    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function updateGalleryImage() {
    const galleryImage = document.getElementById('galleryImage');
    const currentPage = document.getElementById('currentPage');

    galleryImage.src = `images/BA.A portfolio${currentImageIndex}.jpg`;
    galleryImage.alt = `Portfolio page ${currentImageIndex + 1}`;
    currentPage.textContent = currentImageIndex + 1;

    const thumbnails = document.querySelectorAll('.gallery-thumb');
    thumbnails.forEach((thumb, index) => {
        const isActive = index === currentImageIndex;
        thumb.classList.toggle('active', isActive);
        thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    });

    preloadAdjacentImages();
}

function nextImage() {
    const nextIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    goToImage(nextIndex);
}

function previousImage() {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    goToImage(prevIndex);
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousImage();
        }
    });
}

function setupPremiumSwipeNavigation() {
    const container = document.querySelector('.gallery-image-container');
    let imageWrapper = document.querySelector('.gallery-image-wrapper');

    if (!container || !imageWrapper) return;

    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        startDragX = e.touches[0].clientX;
        touchStartX = e.touches[0].clientX;
        lastTouchTime = Date.now();
        prevTranslate = 0;
        imageWrapper.classList.add('dragging');
        animationID = requestAnimationFrame(animation);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const diff = currentX - startDragX;
        currentTranslate = diff;

        const timeDiff = Date.now() - lastTouchTime;
        swipeVelocity = diff / (timeDiff || 1);
        lastTouchTime = Date.now();

        let resistance = 1;
        if ((currentImageIndex === 0 && diff > 0) ||
            (currentImageIndex === totalImages - 1 && diff < 0)) {
            resistance = 0.3;
        }

        imageWrapper.style.transform = `translateX(${diff * resistance}px)`;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (!isDragging) return;

        isDragging = false;
        touchEndX = e.changedTouches[0].clientX;
        cancelAnimationFrame(animationID);
        imageWrapper.classList.remove('dragging');
        imageWrapper.classList.add('animating');

        const swipeThreshold = 50;
        const velocityThreshold = 0.5;
        const diff = touchStartX - touchEndX;
        const absDiff = Math.abs(diff);
        const absVelocity = Math.abs(swipeVelocity);

        if (absDiff > swipeThreshold || absVelocity > velocityThreshold) {
            if (diff > 0) nextImage();
            else previousImage();
        }

        setTimeout(() => {
            imageWrapper.style.transform = 'translateX(0)';
            setTimeout(() => imageWrapper.classList.remove('animating'), 500);
        }, 50);

        currentTranslate = 0;
        prevTranslate = 0;
        swipeVelocity = 0;
    }, { passive: true });

    let isMouseDown = false;

    container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startDragX = e.clientX;
        imageWrapper.classList.add('dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        const diff = e.clientX - startDragX;
        let resistance = 1;
        if ((currentImageIndex === 0 && diff > 0) ||
            (currentImageIndex === totalImages - 1 && diff < 0)) {
            resistance = 0.3;
        }

        imageWrapper.style.transform = `translateX(${diff * resistance}px)`;
    });

    container.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;

        isMouseDown = false;
        const diff = startDragX - e.clientX;
        imageWrapper.classList.remove('dragging');
        imageWrapper.classList.add('animating');

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else previousImage();
        }

        setTimeout(() => {
            imageWrapper.style.transform = 'translateX(0)';
            setTimeout(() => imageWrapper.classList.remove('animating'), 500);
        }, 50);
    });

    container.addEventListener('mouseleave', () => {
        if (isMouseDown) {
            isMouseDown = false;
            imageWrapper.classList.remove('dragging');
            imageWrapper.style.transform = 'translateX(0)';
        }
    });
}

function animation() {
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function preloadAdjacentImages() {
    const preloadNext = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    const preloadPrev = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;

    [preloadNext, preloadPrev].forEach((index) => {
        const img = new Image();
        img.src = `images/BA.A portfolio${index}.jpg`;
    });
}

// ==========================================
// NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            closeMobileNav();
        }
    });
});

const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function closeMobileNav() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    document.body.style.overflow = '';
}

function openMobileNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) closeMobileNav();
        else openMobileNav();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
            closeMobileNav();
            navToggle.focus();
        }
    });
}

window.addEventListener('scroll', () => {
    if (nav) {
        nav.classList.toggle('scrolled', window.pageYOffset > 100);
    }
}, { passive: true });

// ==========================================
// SCROLL REVEAL
// ==========================================

function initScrollReveal() {
    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
            el.classList.add('is-visible');
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        observer.observe(el);
    });
}

// ==========================================
// HERO SPOTLIGHT
// ==========================================

function initHeroSpotlight() {
    if (prefersReducedMotion || window.innerWidth < 901) return;

    const hero = document.querySelector('.hero');
    const spotlight = document.getElementById('heroSpotlight');
    if (!hero || !spotlight) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.left = `${x}px`;
        spotlight.style.top = `${y}px`;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0.3';
    });

    hero.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '0.6';
    });
}

// ==========================================
// FLOATING PARTICLES
// ==========================================

function initParticles() {
    if (prefersReducedMotion || window.innerWidth < 640) return;

    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        const count = Math.min(40, Math.floor(canvas.width / 30));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(196, 163, 90, ${p.opacity})`;
            ctx.fill();
        });

        animFrame = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animFrame);
        resize();
        createParticles();
        draw();
    }, { passive: true });
}

// ==========================================
// 3D TILT
// ==========================================

function initTilt() {
    if (prefersReducedMotion || window.innerWidth < 901) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// ==========================================
// HERO PARALLAX
// ==========================================

function initHeroParallax() {
    if (prefersReducedMotion) return;

    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 1.2);
        }
    }, { passive: true });
}

// ==========================================
// STATS COUNTER
// ==========================================

function animateCounter(element, target, duration = 2000) {
    if (prefersReducedMotion) return;

    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = `${target}+`;
            clearInterval(timer);
        } else {
            element.textContent = `${Math.floor(current)}+`;
        }
    }, 16);
}

function initStatsCounter() {
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.stat-number').forEach((stat) => {
                        const text = stat.textContent;
                        const target = parseInt(text, 10);
                        if (text.includes('+') && !Number.isNaN(target)) {
                            animateCounter(stat, target);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
}

// ==========================================
// PDF MODAL
// ==========================================

const modal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const portfolioPDF = 'BA.A portfolio.pdf';
const resumePDF = 'BA.A resume.pdf';

function viewPortfolio() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    pdfViewer.src = portfolioPDF;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    pdfViewer.src = '';
    document.body.style.overflow = '';
}

function downloadPortfolio() {
    const link = document.createElement('a');
    link.href = portfolioPDF;
    link.download = 'Aminata_Bah_Portfolio.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Aminata_Bah_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    initGallery();
    initScrollReveal();
    initHeroSpotlight();
    initParticles();
    initTilt();
    initHeroParallax();
    initStatsCounter();

    for (let i = 0; i < 5; i++) {
        const img = new Image();
        img.src = `images/BA.A portfolio${i}.jpg`;
    }

    if (!prefersReducedMotion) {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            document.body.style.opacity = '1';
        });
    }
});
