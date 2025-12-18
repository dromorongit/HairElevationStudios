// Performance optimization and lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Preload critical images
    function preloadImage(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }

    // Optimize hero image loading
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Add loading optimization class
        heroSection.classList.add('hero-optimized');
        
        // Preload hero image with better compression
        const heroImg = new Image();
        heroImg.onload = function() {
            heroSection.classList.add('hero-loaded');
        };
        heroImg.src = 'threeladies.PNG';
    }

    // Optimize non-critical images with lazy loading
    const productImages = document.querySelectorAll('.product-card img, .collection-card img');
    productImages.forEach(img => {
        if (!img.hasAttribute('data-src')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                
                // Log image load times
                const imageEntries = performance.getEntriesByType('resource')
                    .filter(entry => entry.initiatorType === 'img');
                console.log('Images loaded:', imageEntries.length);
            }, 0);
        });
    }

    // CSS-based image optimization
    function optimizeImages() {
        // Add loading="lazy" to all images that don't have it
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            if (!img.closest('.hero') && !img.closest('header')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    optimizeImages();

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optimize CSS animations
    function optimizeAnimations() {
        const animatedElements = document.querySelectorAll('.btn, .product-card, .collection-card');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform';
        });
    }

    optimizeAnimations();

    // Preload critical resources
    function preloadCriticalResources() {
        // Preload next likely pages
        const criticalPages = ['collections.html', 'services.html'];
        criticalPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources();
});

// CSS for lazy loading and performance optimizations
const performanceStyles = `
    /* Lazy loading styles */
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    /* Hero optimization */
    .hero-optimized {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
    }
    
    .hero-loaded {
        animation: fadeInHero 0.5s ease-in;
    }
    
    @keyframes fadeInHero {
        from { opacity: 0.8; }
        to { opacity: 1; }
    }
    
    /* Optimize animations */
    .btn, .product-card, .collection-card {
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject performance styles
const styleSheet = document.createElement('style');
styleSheet.textContent = performanceStyles;
document.head.appendChild(styleSheet);