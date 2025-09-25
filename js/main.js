/**
 * RESPONSIVE PORTFOLIO JAVASCRIPT
 * Author: Reyon Rai
 * Version: 2.0 - Enhanced with legacy support
 */

// ===================================
// LEGACY JQUERY FUNCTIONALITY
// ===================================
(function ($) {
    "use strict";

    // Spinner (Legacy)
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs (Legacy)
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Navbar on scrolling (Legacy - Enhanced)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling on the navbar links (Legacy - Enhanced)
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }

            // Close mobile menu if open (Enhanced)
            const navbarCollapse = document.querySelector('#navbarCollapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });

    // Back to top button (Legacy)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Typed Initiate (Legacy)
    if ($('.typed-text-output').length == 1 && typeof Typed !== 'undefined') {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Modal Video (Legacy)
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    // Facts counter (Legacy)
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // Skills (Legacy - Enhanced with fallback)
    if ($.fn.waypoint) {
        $('.skill').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, { offset: '80%' });
    }

    // Portfolio isotope and filter (Legacy)
    if ($.fn.isotope) {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');
            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });
    }

    // Testimonials carousel (Legacy)
    if ($.fn.owlCarousel) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            items: 1,
            dots: true,
            loop: true,
        });
    }

})(jQuery);

// ===================================
// MODERN VANILLA JS FUNCTIONALITY
// ===================================
(function() {
    'use strict';

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

    /**
     * Debounce function to limit the rate at which a function can fire
     */
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Throttle function to limit function execution
     */
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    // ===================================
    // ENHANCED PRELOADER MANAGEMENT
    // ===================================

    /**
     * Handle preloader with legacy and modern support
     */
    function initEnhancedPreloader() {
        const loader = document.querySelector('#loader');
        
        if (!loader) return;

        // Legacy loader removal (maintaining original timing)
        function removeLoader() {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 3500); // Maintaining original 3.5s timing
        }

        // Modern loader with window load event
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (loader.style.display !== 'none') {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 300);
                }
            }, 1500);
        });

        // Execute legacy removal
        removeLoader();

        // Fallback safety net
        setTimeout(() => {
            if (loader && loader.style.display !== 'none') {
                loader.style.display = 'none';
            }
        }, 8000);
    }

    // ===================================
    // ENHANCED NAVIGATION
    // ===================================

    /**
     * Enhanced smooth scrolling (works alongside jQuery version)
     */
    function initEnhancedSmoothScrolling() {
        // Only add if jQuery version doesn't handle it
        const vanillaNavLinks = document.querySelectorAll('a[href^="#"]:not(.navbar-nav a)');
        
        vanillaNavLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 45;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Enhanced active navigation with legacy support
     */
    function initEnhancedActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const updateActiveLink = throttle(() => {
            let current = '';
            const scrollPosition = window.pageYOffset + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Update both jQuery and vanilla JS active states
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });

            // Also update jQuery active states if they exist
            if (typeof jQuery !== 'undefined') {
                jQuery('.navbar-nav .active').removeClass('active');
                jQuery(`.navbar-nav a[href="#${current}"]`).addClass('active');
            }
        }, 100);

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }

    // ===================================
    // ENHANCED SKILLS ANIMATION
    // ===================================

    /**
     * Enhanced progress bar animation with legacy fallback
     */
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            // Get width from style attribute or aria-valuenow (legacy support)
            const width = bar.style.width || (bar.getAttribute('aria-valuenow') + '%');
            
            bar.style.width = '0%';
            bar.style.transition = 'width 2s ease-in-out';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }

    /**
     * Enhanced skills section with Intersection Observer and Waypoints fallback
     */
    function initEnhancedSkillsAnimation() {
        const skillSection = document.querySelector('#skill');
        
        if (!skillSection) return;

        // Modern Intersection Observer approach
        if (window.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(skillSection);
        } else {
            // Fallback for older browsers (works with existing Waypoints)
            const fallbackCheck = () => {
                const rect = skillSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.8;
                
                if (isVisible) {
                    animateProgressBars();
                    window.removeEventListener('scroll', fallbackCheck);
                }
            };
            
            window.addEventListener('scroll', fallbackCheck);
            fallbackCheck(); // Check immediately
        }
    }

    // ===================================
    // RESPONSIVE ENHANCEMENTS
    // ===================================

    /**
     * Enhanced responsive handling
     */
    function initResponsiveEnhancements() {
        const handleResize = debounce(() => {
            // Handle navbar collapse on desktop
            const navbarCollapse = document.querySelector('#navbarCollapse');
            if (window.innerWidth >= 992 && navbarCollapse?.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }

            // Recalculate dynamic elements
            updateDynamicElements();
        }, 250);

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 100);
        });
    }

    /**
     * Update dynamic elements for responsive behavior
     */
    function updateDynamicElements() {
        const homeContainer = document.querySelector('.home-container');
        if (homeContainer) {
            if (window.innerWidth <= 768) {
                homeContainer.style.minHeight = 'auto';
            } else {
                homeContainer.style.minHeight = '100vh';
            }
        }
    }

    // ===================================
    // ENHANCED FORM HANDLING
    // ===================================

    /**
     * Enhanced contact form with better validation
     */
    function initEnhancedFormHandling() {
        const contactForms = document.querySelectorAll('.form, form');
        
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const submitBtn = this.querySelector('button[type="submit"]');
                
                if (!emailInput || !submitBtn) return;

                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailRegex.test(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }

                // Enhanced submission handling
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                
                setTimeout(() => {
                    showNotification('Thank you for your interest! We\'ll be in touch soon.', 'success');
                    emailInput.value = '';
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            });
        });
    }

    /**
     * Enhanced notification system
     */
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 18px; cursor: pointer;">&times;</button>
            </div>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            zIndex: '10000',
            maxWidth: '300px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        });

        document.body.appendChild(notification);

        setTimeout(() => notification.style.transform = 'translateX(0)', 10);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // ===================================
    // INTERSECTION OBSERVER ENHANCEMENTS
    // ===================================

    /**
     * Enhanced intersection observer for animations
     */
    function initEnhancedIntersectionObserver() {
        if (!window.IntersectionObserver) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('visible');
                    
                    // Special handling for different sections
                    if (entry.target.id === 'skill') {
                        setTimeout(() => animateProgressBars(), 200);
                    }
                }
            });
        }, observerOptions);

        // Observe sections and animated elements
        const elementsToObserve = document.querySelectorAll('section, .fadeInUp, .fadeIn');
        elementsToObserve.forEach(element => observer.observe(element));
    }

    // ===================================
    // INITIALIZATION
    // ===================================

    /**
     * Initialize enhanced animations
     */
    function initEnhancedAnimations() {
        const fadeElements = document.querySelectorAll('.fadeInUp, .fadeIn');
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease-out';
        });
    }

    /**
     * Main enhanced initialization
     */
    function initEnhanced() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEnhanced);
            return;
        }

        // Initialize enhanced features
        initEnhancedPreloader();
        initEnhancedSmoothScrolling();
        initEnhancedActiveNavigation();
        initEnhancedSkillsAnimation();
        initEnhancedFormHandling();
        initResponsiveEnhancements();
        initEnhancedIntersectionObserver();
        initEnhancedAnimations();

        updateDynamicElements();

        console.log('Enhanced portfolio features initialized!');
    }

    // ===================================
    // GLOBAL EXPORTS
    // ===================================

    window.PortfolioEnhanced = {
        showNotification,
        animateProgressBars,
        updateDynamicElements,
        debounce,
        throttle
    };

    // Start enhanced initialization
    initEnhanced();

})();

// ===================================
// LEGACY DOM CONTENT LOADED
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('#loader');

    // Legacy loader function (maintained for compatibility)
    function removeLoader() {
        setTimeout(() => {
            if (loader) {
                loader.style.display = 'none';
            }
        }, 3500);
    }

    // Only run legacy if loader exists and no enhanced version handled it
    if (loader && loader.style.display !== 'none') {
        removeLoader();
    }
});
