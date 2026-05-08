// ============================================
// Modern Professional Portfolio JavaScript
// Enhanced with Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // Navigation Setup
    // ============================================

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ============================================
    // Smooth Scrolling & Navigation
    // ============================================

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active state
                updateActiveLink();
            }
        });
    });

    // ============================================
    // Active Link Highlighting on Scroll
    // ============================================

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // Navbar Scroll Effects
    // ============================================

    let lastScrollTop = 0;
    let scrollThrottle;

    window.addEventListener('scroll', function() {
        clearTimeout(scrollThrottle);
        scrollThrottle = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class for styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active link
            updateActiveLink();

            // Trigger skill bar animations
            animateVisibleSkillBars();

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 10);
    });

    // ============================================
    // Skill Bar Animations
    // ============================================

    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    function animateVisibleSkillBars() {
        if (!skillsSection || skillsAnimated) return;

        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillsTop < windowHeight) {
            skillsAnimated = true;
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }, index * 100);
            });
        }
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animateElements = document.querySelectorAll(
        '.fade-in, .slide-up, .slide-down, .project-card, .skill-category, .stat, .contact-item'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // Contact Form Handling
    // ============================================

    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Here you would typically send data to your backend
            console.log('Form submitted:', data);

            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                contactForm.reset();

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }

            // Optional: Send to backend
            // sendFormToBackend(data);
        });
    }

    // ============================================
    // Parallax Effect on Hero
    // ============================================

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
            }
        });
    }

    // ============================================
    // Lazy Loading Images
    // ============================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Load image
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Scroll to Top Button (Optional)
    // ============================================

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
    });

    // ============================================
    // Initialize
    // ============================================

    // Set initial active link
    updateActiveLink();

    // Add entry animations on page load
    document.querySelectorAll('.animate-fadeInUp, .animate-zoomIn').forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 150);
    });

    // ============================================
    // Enhanced Features
    // ============================================

    // Loading Animation - Hide immediately for instant loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        // Hide immediately instead of waiting
        loadingOverlay.classList.add('hidden');
    }

    // Scroll Progress Indicator
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrollPercent + '%';
        });
    }

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Enhanced Cursor Effects
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorTrail = document.getElementById('cursorTrail');

    if (cursorGlow && cursorTrail) {
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorGlow.style.left = mouseX - 10 + 'px';
            cursorGlow.style.top = mouseY - 10 + 'px';
        });

        function updateTrail() {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;

            cursorTrail.style.left = trailX - 4 + 'px';
            cursorTrail.style.top = trailY - 4 + 'px';

            requestAnimationFrame(updateTrail);
        }
        updateTrail();
    }

    // Enhanced Skill Bar Animations
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width || '0%';
                        bar.style.setProperty('--skill-width', width);
                        bar.style.animation = 'skillFill 2s ease-out forwards';
                    }, index * 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });

    // Magnetic Hover Effects
    document.querySelectorAll('.btn, .social-link, .project-card, .skill-category').forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });

    // Parallax Effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');

        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Enhanced Button Ripple Effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.offsetX - 10) + 'px';
            ripple.style.top = (e.offsetY - 10) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Scroll-triggered Stagger Animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `slideInStagger 0.8s ease forwards`;
                        child.style.opacity = '1';
                    }, index * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skills-grid, .projects-grid, .education-grid').forEach(grid => {
        staggerObserver.observe(grid);
    });

    // Dynamic Background Color Changes
    const sections = document.querySelectorAll('section');
    const body = document.body;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                body.setAttribute('data-current-section', sectionId);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Enhanced Form Validation with Visual Feedback
    const contactFormEl = document.querySelector('.contact-form');
    if (contactFormEl) {
        const inputs = contactFormEl.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.boxShadow = '0 0 0 3px rgba(184, 134, 11, 0.2)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.boxShadow = 'none';
            });

            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.style.borderColor = 'var(--accent)';
                } else {
                    this.style.borderColor = 'var(--glass-border)';
                }
            });
        });
    }

    // Floating Action Button Functionality
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Performance Optimization - Debounced Scroll Events
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

    // Enhanced Scroll Performance
    const debouncedScroll = debounce(() => {
        // Update scroll progress
        if (scrollProgressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrollPercent + '%';
        }

        // Update navbar scroll state
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Keyboard Navigation Enhancements
    document.addEventListener('keydown', (e) => {
        // Scroll to top with Home key
        if (e.key === 'Home') {
            e.preventDefault();
            scrollToTop();
        }

        // Enhanced tab navigation
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement) {
                focusedElement.style.outline = '2px solid var(--accent)';
                focusedElement.style.outlineOffset = '2px';
            }
        }
    });

    // Accessibility Improvements
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Dynamic Theme Switching (Light/Dark)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray-100);
        transition: all 0.3s ease;
    `;

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });

    document.body.appendChild(themeToggle);

    // Console Welcome Message
    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                    Welcome to Waleed's Portfolio!           ║
    ║                                                              ║
    ║  🚀 Full-Stack Developer | Software Engineer | Tech Enthusiast ║
    ║                                                              ║
    ║  ✨ Features:                                                ║
    ║     • Advanced Animations & Graphics                        ║
    ║     • Professional Dark Theme                               ║
    ║     • Interactive Elements                                  ║
    ║     • Responsive Design                                     ║
    ║     • Performance Optimized                                 ║
    ║                                                              ║
    ║  🎯 Technologies: PHP, Node.js, React, Angular, AWS, Docker ║
    ╚══════════════════════════════════════════════════════════════╝
    `);

});