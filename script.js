// ==========================================
// GALLERY FUNCTIONALITY - PREMIUM EXPERIENCE
// ==========================================

let currentImageIndex = 0;
const totalImages = 32;
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startDragX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let swipeVelocity = 0;
let lastTouchTime = 0;

// Initialize gallery
function initGallery() {
    generateThumbnails();
    updateGalleryImage();
    setupKeyboardNavigation();
    setupPremiumSwipeNavigation();
    showSwipeHint();
}

// Generate thumbnail grid
function generateThumbnails() {
    const thumbnailContainer = document.getElementById('galleryThumbnails');
    for (let i = 0; i < totalImages; i++) {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumb';
        if (i === 0) thumb.classList.add('active');
        
        const img = document.createElement('img');
        img.src = `images/BA.A portfolio${i}.jpg`;
        img.alt = `Portfolio page ${i + 1}`;
        img.loading = 'lazy';
        
        thumb.appendChild(img);
        thumb.onclick = () => goToImage(i);
        thumbnailContainer.appendChild(thumb);
    }
}

// Show swipe hint on first load (mobile only)
function showSwipeHint() {
    if (window.innerWidth <= 768) {
        const imageContainer = document.querySelector('.gallery-image-container');
        const hint = document.createElement('div');
        hint.className = 'swipe-hint show';
        hint.innerHTML = '<div class="swipe-indicator">👆 Swipe to flip pages</div>';
        imageContainer.appendChild(hint);
        
        setTimeout(() => {
            hint.classList.remove('show');
            setTimeout(() => hint.remove(), 300);
        }, 3000);
    }
}

// Navigate to specific image with premium animation
function goToImage(index, direction = 'next') {
    const galleryImage = document.getElementById('galleryImage');
    const counter = document.querySelector('.gallery-counter');
    
    // Add transition class
    galleryImage.classList.remove('fade-transition');
    void galleryImage.offsetWidth; // Force reflow
    galleryImage.classList.add('fade-transition');
    
    // Pulse counter
    counter.classList.add('pulse');
    setTimeout(() => counter.classList.remove('pulse'), 300);
    
    currentImageIndex = index;
    updateGalleryImage();
    
    // Haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// Update main gallery image
function updateGalleryImage() {
    const galleryImage = document.getElementById('galleryImage');
    const currentPage = document.getElementById('currentPage');
    
    galleryImage.src = `images/BA.A portfolio${currentImageIndex}.jpg`;
    galleryImage.alt = `Portfolio page ${currentImageIndex + 1}`;
    currentPage.textContent = currentImageIndex + 1;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
            // Smooth scroll thumbnail into view
            thumb.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        } else {
            thumb.classList.remove('active');
        }
    });
    
    // Preload adjacent images
    preloadAdjacentImages();
}

// Next image with direction
function nextImage() {
    const nextIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    goToImage(nextIndex, 'next');
}

// Previous image with direction
function previousImage() {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    goToImage(prevIndex, 'prev');
}

// Keyboard navigation
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

// Premium Touch/Swipe navigation
function setupPremiumSwipeNavigation() {
    const imageContainer = document.querySelector('.gallery-image-container');
    const wrapper = document.querySelector('.gallery-image-wrapper');
    
    if (!imageContainer || !wrapper) {
        // If wrapper doesn't exist, create it
        const galleryImage = document.getElementById('galleryImage');
        const newWrapper = document.createElement('div');
        newWrapper.className = 'gallery-image-wrapper';
        galleryImage.parentNode.insertBefore(newWrapper, galleryImage);
        newWrapper.appendChild(galleryImage);
    }
    
    const container = document.querySelector('.gallery-image-container');
    const imageWrapper = document.querySelector('.gallery-image-wrapper');
    
    // Touch start
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        startDragX = e.touches[0].clientX;
        touchStartX = e.touches[0].clientX;
        lastTouchTime = Date.now();
        prevTranslate = 0;
        
        imageWrapper.classList.add('dragging');
        animationID = requestAnimationFrame(animation);
    }, { passive: true });
    
    // Touch move
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = currentX - startDragX;
        currentTranslate = diff;
        
        // Calculate velocity for momentum
        const timeDiff = Date.now() - lastTouchTime;
        swipeVelocity = diff / (timeDiff || 1);
        lastTouchTime = Date.now();
        
        // Apply resistance at boundaries
        let resistance = 1;
        if ((currentImageIndex === 0 && diff > 0) || 
            (currentImageIndex === totalImages - 1 && diff < 0)) {
            resistance = 0.3;
        }
        
        imageWrapper.style.transform = `translateX(${diff * resistance}px)`;
    }, { passive: true });
    
    // Touch end
    container.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        touchEndX = e.changedTouches[0].clientX;
        
        cancelAnimationFrame(animationID);
        imageWrapper.classList.remove('dragging');
        imageWrapper.classList.add('animating');
        
        // Determine swipe with velocity consideration
        const swipeThreshold = 50;
        const velocityThreshold = 0.5;
        const diff = touchStartX - touchEndX;
        const absDiff = Math.abs(diff);
        const absVelocity = Math.abs(swipeVelocity);
        
        // Strong swipe or velocity-based swipe
        if (absDiff > swipeThreshold || absVelocity > velocityThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                previousImage();
            }
        }
        
        // Reset transform with elastic animation
        setTimeout(() => {
            imageWrapper.style.transform = 'translateX(0)';
            setTimeout(() => {
                imageWrapper.classList.remove('animating');
            }, 500);
        }, 50);
        
        // Reset values
        currentTranslate = 0;
        prevTranslate = 0;
        swipeVelocity = 0;
    }, { passive: true });
    
    // Mouse events for desktop drag
    let isMouseDown = false;
    
    container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startDragX = e.clientX;
        imageWrapper.classList.add('dragging');
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        
        const currentX = e.clientX;
        const diff = currentX - startDragX;
        
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
        const endX = e.clientX;
        const diff = startDragX - endX;
        
        imageWrapper.classList.remove('dragging');
        imageWrapper.classList.add('animating');
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextImage();
            } else {
                previousImage();
            }
        }
        
        setTimeout(() => {
            imageWrapper.style.transform = 'translateX(0)';
            setTimeout(() => {
                imageWrapper.classList.remove('animating');
            }, 500);
        }, 50);
    });
    
    container.addEventListener('mouseleave', () => {
        if (isMouseDown) {
            isMouseDown = false;
            const imageWrapper = document.querySelector('.gallery-image-wrapper');
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

// Preload adjacent images for instant transitions
function preloadAdjacentImages() {
    const preloadNext = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    const preloadPrev = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    
    [preloadNext, preloadPrev].forEach(index => {
        const img = new Image();
        img.src = `images/BA.A portfolio${index}.jpg`;
    });
}

// Initialize gallery when page loads
window.addEventListener('load', () => {
    initGallery();
    // Preload first few images
    for (let i = 0; i < 5; i++) {
        const img = new Image();
        img.src = `images/BA.A portfolio${i}.jpg`;
    }
});

// ==========================================
// SMOOTH SCROLLING & NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ==========================================
// NAVIGATION BACKGROUND ON SCROLL
// ==========================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// PDF MODAL FUNCTIONS
// ==========================================

const modal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const portfolioPDF = 'BA.A portfolio.pdf';
const resumePDF = 'BA.A resume.pdf';

function viewPortfolio() {
    modal.classList.add('active');
    pdfViewer.src = portfolioPDF;
    document.body.style.overflow = 'hidden';
    
    // Track view (optional analytics)
    console.log('Portfolio viewed');
}

function closeModal() {
    modal.classList.remove('active');
    pdfViewer.src = '';
    document.body.style.overflow = 'auto';
}

function downloadPortfolio() {
    const link = document.createElement('a');
    link.href = portfolioPDF;
    link.download = 'Aminata_Bah_Portfolio.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download (optional analytics)
    console.log('Portfolio downloaded');
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Aminata_Bah_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download (optional analytics)
    console.log('Resume downloaded');
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CURSOR EFFECT (Optional enhancement)
// ==========================================

const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 10px;
        height: 10px;
        border: 2px solid #0a0a0a;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
        display: none; /* Disabled by default, enable for desktop enhancement */
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
};

// Uncomment to enable custom cursor on desktop
// if (window.innerWidth > 768) {
//     createCursorEffect();
// }

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================

const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const target = parseInt(text);
                // Only animate if it's a number with +, skip years like "2026"
                if (text.includes('+') && !isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// CONSOLE SIGNATURE
// ==========================================

console.log('%c Architecture Portfolio ', 'background: #0a0a0a; color: #ffffff; padding: 8px 16px; font-size: 14px; font-weight: bold;');
console.log('%c Designed with precision and elegance ', 'color: #666; font-size: 12px; font-style: italic;');

