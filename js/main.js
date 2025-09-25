/**
 * RESPONSIVE PORTFOLIO JAVASCRIPT
 * Author: Reyon Rai
 * Version: 2.1 - Fixed Legacy Issues
 */

// ===================================
// LEGACY JQUERY FUNCTIONALITY - PRESERVED EXACTLY
// ===================================
(function ($) {
    "use strict";

    // Spinner - EXACTLY as original
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs - EXACTLY as original
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Navbar on scrolling - EXACTLY as original
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling on the navbar links - EXACTLY as original
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
        }
    });

    // Back to top button - EXACTLY as original
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

    // Typed Initiate - EXACTLY as original
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

    // Modal Video - EXACTLY as original
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

    // Facts counter - EXACTLY as original
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // Skills - EXACTLY as original
    if ($.fn.waypoint) {
        $('.skill').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, { offset: '80%' });
    }

    // Portfolio isotope and filter - EXACTLY as original
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

    // Testimonials carousel - EXACTLY as original
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
// LEGACY DOM CONTENT LOADED - EXACTLY AS ORIGINAL
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('#loader');

    // EXACTLY as original - 3500ms timing preserved
    function removeLoader() {
        setTimeout(() => {
            if (loader) {
                loader.style.display = 'none';
            }
        }, 3500);
    }

    removeLoader();
});

// ===================================
// ADDITIONAL RESPONSIVE ENHANCEMENTS - NON-INTRUSIVE
// ===================================
(function() {
    'use strict';

    // ===================================
    // UTILITY FUNCTIONS
    // ===================================

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
    // RESPONSIVE MOBILE MENU ENHANCEMENT
    // ===================================

    function initMobileMenuEnhancements() {
        // Close mobile menu when clicking on a link (enhancement only)
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navbarCollapse = document.querySelector('#navbarCollapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = window.bootstrap ? bootstrap.Collapse.getInstance(navbarCollapse) : null;
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });

        // Handle resize to close mobile menu on desktop
        const handleResize = debounce(() => {
            if (window.innerWidth >= 992) {
                const navbarCollapse = document.querySelector('#navbarCollapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = window.bootstrap ? bootstrap.Collapse.getInstance(navbarCollapse) : null;
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        }, 250);

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 100);
        });
    }

    // ===================================
    // ENHANCED FORM HANDLING
    // ===================================

    function initFormEnhancements() {
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

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================

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
    // FALLBACK PROGRESS BAR ANIMATION
    // ===================================

    function initProgressBarFallback() {
        // Only if waypoints is not available
        if (typeof jQuery === 'undefined' || !jQuery.fn.waypoint) {
            const skillSection = document.querySelector('#skill');
            
            if (!skillSection) return;

            // Use Intersection Observer if available
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
                // Manual scroll detection fallback
                const fallbackCheck = throttle(() => {
                    const rect = skillSection.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight * 0.8;
                    
                    if (isVisible) {
                        animateProgressBars();
                        window.removeEventListener('scroll', fallbackCheck);
                    }
                }, 100);
                
                window.addEventListener('scroll', fallbackCheck);
                fallbackCheck();
            }
        }
    }

    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.style.width || (bar.getAttribute('aria-valuenow') + '%');
            
            bar.style.width = '0%';
            bar.style.transition = 'width 3s ease-in-out';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // ===================================
    // SMOOTH SCROLLING FALLBACK
    // ===================================

    function initSmoothScrollingFallback() {
        // Only add for non-navbar links if jQuery version doesn't handle them
        const nonNavbarLinks = document.querySelectorAll('a[href^="#"]:not(.navbar-nav a):not(.nav-link)');
        
        nonNavbarLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 45;
                    
                    // Check if jQuery animate is available and use it, otherwise use vanilla
                    if (typeof jQuery !== 'undefined' && jQuery.fn.animate) {
                        jQuery('html, body').animate({
                            scrollTop: targetPosition
                        }, 1500, 'easeInOutExpo');
                    } else {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===================================
    // INITIALIZATION
    // ===================================

    function initEnhancements() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEnhancements);
            return;
        }

        // Initialize non-intrusive enhancements
        initMobileMenuEnhancements();
        initFormEnhancements();
        initProgressBarFallback();
        initSmoothScrollingFallback();

        console.log('Portfolio enhancements initialized!');
    }

    // ===================================
    // ERROR HANDLING
    // ===================================

    window.addEventListener('error', function(e) {
        console.warn('Portfolio Enhancement Error:', e.error);
    });

    window.addEventListener('unhandledrejection', function(e) {
        console.warn('Portfolio Enhancement Promise Rejection:', e.reason);
        e.preventDefault();
    });

    // ===================================
    // GLOBAL EXPORTS
    // ===================================

    window.PortfolioEnhanced = {
        showNotification,
        animateProgressBars,
        debounce,
        throttle
    };

    // Start enhancements
    initEnhancements();

})();
