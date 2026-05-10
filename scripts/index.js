/**
 * Portfolio JavaScript - Modern Interactive Features
 * Handles theme switching, navigation, animations, and user interactions
 */

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.loadSections();
    this.cacheElements();
    this.bindEvents();
    this.initializeFeatures();
    this.handleInitialLoad();
  }

  // Load HTML sections dynamically (skip if already loaded via build)
  async loadSections() {
    // Check if sections are already loaded (static build)
    const heroSection = document.querySelector('#home.hero');
    if (heroSection && heroSection.innerHTML.trim()) {
      console.log('Sections already loaded via static build, skipping dynamic loading');
      return;
    }

    const sections = [
      { id: 'hero-section', file: 'sections/hero.html' },
      { id: 'about-section', file: 'sections/about.html' },
      { id: 'experience-section', file: 'sections/experience.html' },
      { id: 'education-section', file: 'sections/education.html' },
      { id: 'skills-section', file: 'sections/skills.html' },
      { id: 'projects-section', file: 'sections/projects.html' },
      { id: 'contact-section', file: 'sections/contact.html' },
      { id: 'footer-section', file: 'sections/footer.html' }
    ];

    const loadPromises = sections.map(async ({ id, file }) => {
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const html = await response.text();

        const placeholder = document.getElementById(id);
        if (placeholder) {
          placeholder.innerHTML = html;
        }
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
        // Fallback: show error message
        const placeholder = document.getElementById(id);
        if (placeholder) {
          placeholder.innerHTML = `<div class="section-error">Failed to load content. Please refresh the page.</div>`;
        }
      }
    });

    await Promise.all(loadPromises);

    // Re-cache elements after loading sections
    this.cacheElements();
  }

  cacheElements() {
    // Core elements
    this.body = document.body;
    this.main = document.querySelector('main');

    // Navigation
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navOverlay = document.querySelector('.nav-overlay');
    this.navMobileMenu = document.querySelector('.nav-mobile-menu');

    // Theme
    this.themeToggle = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'dark';

    // Scroll
    this.scrollProgress = document.querySelector('.scroll-progress-bar');
    this.scrollTop = document.getElementById('scrollTop');

    // Loading
    this.loadingOverlay = document.querySelector('.loading-overlay');

    // Sections for intersection observer
    this.sections = document.querySelectorAll('section[id]');
    this.animateElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .bounce-in');
  }

  bindEvents() {
    // Navigation
    this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Theme
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());

    // Scroll
    window.addEventListener('scroll', () => this.handleScroll());

    // Scroll to top button
    this.scrollTop?.addEventListener('click', () => this.scrollToTop());

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator?.addEventListener('click', () => this.scrollToSection());

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));

    // Window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  initializeFeatures() {
    // Set initial theme
    this.setTheme(this.currentTheme);

    // Initialize scroll progress
    this.updateScrollProgress();

    // Initialize intersection observer for animations
    this.initIntersectionObserver();

    // Initialize theme toggle button
    this.updateThemeToggleIcon();

    // Set current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }

  handleInitialLoad() {
    // Hide loading overlay after initial load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loadingOverlay?.classList.add('hidden');
      }, 500);
    });

    // Trigger initial animations
    setTimeout(() => {
      this.triggerInitialAnimations();
    }, 100);
  }

  // ==================== THEME MANAGEMENT ====================

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  setTheme(theme) {
    // Remove existing theme classes
    this.body.classList.remove('light-theme', 'dark-theme');

    // Add new theme class
    this.body.classList.add(`${theme}-theme`);

    // Also set data attribute for CSS variables
    this.body.setAttribute('data-theme', theme);

    this.currentTheme = theme;
    this.updateThemeToggleIcon();

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    }

    // Force a reflow to ensure theme changes take effect
    this.body.offsetHeight;
  }

  updateThemeToggleIcon() {
    if (!this.themeToggle) return;

    const icon = this.themeToggle.querySelector('i');
    if (icon) {
      icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Update aria-label
    this.themeToggle.setAttribute('aria-label',
      `Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} theme`);
  }

  // ==================== NAVIGATION ====================

  toggleMobileMenu() {
    const isActive = this.navToggle?.classList.contains('active');

    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.navToggle?.classList.add('active');
    this.navOverlay?.classList.add('active');
    this.navMobileMenu?.classList.add('active');
    this.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.navToggle?.classList.remove('active');
    this.navOverlay?.classList.remove('active');
    this.navMobileMenu?.classList.remove('active');
    this.body.style.overflow = '';
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    this.scrollToSection(targetId);
    this.closeMobileMenu();
    this.updateActiveNavLink(targetId);
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const offsetTop = section.offsetTop - 80; // Account for navbar height

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  updateActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      const linkId = link.getAttribute('href').substring(1);
      link.classList.toggle('active', linkId === activeId);
    });
  }

  // ==================== SCROLL HANDLING ====================

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // Update scroll progress
    this.updateScrollProgress(scrollPercent);

    // Update navbar
    this.updateNavbar(scrollTop);

    // Update scroll to top button
    this.updateScrollTopButton(scrollTop);

    // Update active navigation
    this.updateActiveSection(scrollTop);
  }

  updateScrollProgress(percent = 0) {
    if (this.scrollProgress) {
      this.scrollProgress.style.width = `${percent}%`;
    }
  }

  updateNavbar(scrollTop) {
    if (!this.navbar) return;

    if (scrollTop > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  updateScrollTopButton(scrollTop) {
    if (!this.scrollTop) return;

    if (scrollTop > 300) {
      this.scrollTop.classList.add('visible');
    } else {
      this.scrollTop.classList.remove('visible');
    }
  }

  updateActiveSection(scrollTop) {
    const scrollPosition = scrollTop + 100;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.updateActiveNavLink(sectionId);
      }
    });
  }

  // ==================== ANIMATIONS ====================

  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.animateElements.forEach(element => {
      observer.observe(element);
    });

    // Observe sections for stagger animations
    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  triggerInitialAnimations() {
    // Add initial animation classes
    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('fade-in-up');
      }, index * 200);
    });
  }

  // ==================== FORM HANDLING ====================

  async handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageEl = document.getElementById('formMessage');

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      this.showFormMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!this.isValidEmail(data.email)) {
      this.showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

    try {
      // Simulate form submission (replace with actual API call)
      await this.submitContactForm(data);

      // Show success
      this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();

    } catch (error) {
      this.showFormMessage('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }
  }

  showFormMessage(message, type) {
    const messageEl = document.getElementById('formMessage');
    if (!messageEl) return;

    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';

    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 5000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async submitContactForm(data) {
    // Simulate API call - replace with actual implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', data);
        resolve({ success: true });
      }, 2000);
    });
  }

  // ==================== RESPONSIVE HANDLING ====================

  handleResize() {
    // Close mobile menu on resize if open
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  // ==================== SCROLL TO TOP ====================

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const targetSectionId = scrollIndicator?.getAttribute('data-scroll-to');

    if (targetSectionId) {
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }

  // ==================== UTILITIES ====================

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Global functions for HTML onclick handlers
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Console welcome message
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    Welcome to Waleed's Portfolio!           ║
║                                                              ║
║  🚀 Full Stack Developer | Modern Web Technologies          ║
║                                                              ║
║  ✨ Features:                                                ║
║     • Clean, Modern Design                                   ║
║     • Dark/Light Theme Support                               ║
║     • Smooth Animations                                       ║
║     • Mobile-Responsive                                       ║
║     • Accessibility-First                                    ║
║                                                              ║
║  🛠️ Tech Stack: React, Node.js, PHP, AWS, Docker             ║
╚══════════════════════════════════════════════════════════════╝
`);