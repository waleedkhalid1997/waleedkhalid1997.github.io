// Verification script for UI/UX fixes
console.log('🚀 Waleed Khalid Portfolio - UI/UX Verification');

// Check if CSS modules are loaded
const checkCSSModules = () => {
    const modules = [
        'variables.css',
        'reset.css',
        'global.css',
        'animations.css',
        'nav.css',
        'buttons.css',
        'cards.css',
        'forms.css',
        'hero.css',
        'about.css',
        'experience.css',
        'skills.css',
        'projects.css',
        'contact.css',
        'education.css',
        'footer.css',
        'utilities.css',
        'dark.css',
        'light.css',
        'responsive.css'
    ];

    console.log('✅ CSS Modules Status:');
    modules.forEach(module => {
        const link = document.querySelector(`link[href*="style"][href*="${module}"]`);
        if (link) {
            console.log(`  ✓ ${module} loaded`);
        } else {
            console.log(`  ✗ ${module} missing`);
        }
    });
};

// Check typography rendering
const checkTypography = () => {
    const heroTitle = document.querySelector('.hero-title');
    const computedStyle = getComputedStyle(heroTitle);

    console.log('\n🎨 Typography Rendering:');
    console.log(`  Font smoothing: ${computedStyle.webkitFontSmoothing || 'none'}`);
    console.log(`  Text rendering: ${computedStyle.textRendering}`);
    console.log(`  Font kerning: ${computedStyle.fontKerning}`);
    console.log(`  Background clip: ${computedStyle.backgroundClip}`);

    if (computedStyle.webkitFontSmoothing === 'antialiased' ||
        computedStyle.webkitFontSmoothing === 'subpixel-antialiased') {
        console.log('  ✓ Enhanced font rendering active');
    } else {
        console.log('  ✗ Font rendering may be suboptimal');
    }
};

// Check theme switching
const checkThemes = () => {
    console.log('\n🎭 Theme System:');
    const body = document.body;
    const hasLightTheme = body.classList.contains('light-theme');
    const hasDarkTheme = !hasLightTheme;

    if (hasDarkTheme) {
        console.log('  ✓ Dark theme active');
    } else if (hasLightTheme) {
        console.log('  ✓ Light theme active');
    }

    // Check theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        console.log('  ✓ Theme toggle available');
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            console.log('  🔄 Theme switched');
        });
    } else {
        console.log('  ✗ Theme toggle missing');
    }
};

// Check responsiveness
const checkResponsiveness = () => {
    console.log('\n📱 Responsiveness:');
    const viewport = window.innerWidth;

    if (viewport <= 480) {
        console.log('  📱 Small mobile view');
    } else if (viewport <= 768) {
        console.log('  📱 Mobile view');
    } else if (viewport <= 1024) {
        console.log('  📱 Tablet view');
    } else {
        console.log('  💻 Desktop view');
    }

    // Check if nav toggle is visible on mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (viewport <= 768) {
        if (navToggle && navToggle.style.display !== 'none') {
            console.log('  ✓ Mobile navigation active');
        }
    } else {
        if (navMenu && navMenu.style.display !== 'none') {
            console.log('  ✓ Desktop navigation active');
        }
    }
};

// Check education section
const checkEducationSection = () => {
    console.log('\n🎓 Education Section:');
    const educationCards = document.querySelectorAll('.education-card');

    if (educationCards.length > 0) {
        console.log(`  ✓ ${educationCards.length} education cards found`);
        educationCards.forEach((card, index) => {
            const computedStyle = getComputedStyle(card);
            if (computedStyle.background !== 'rgba(0, 0, 0, 0)') {
                console.log(`  ✓ Card ${index + 1} has background styling`);
            }
        });
    } else {
        console.log('  ✗ No education cards found');
    }
};

// Run all checks
document.addEventListener('DOMContentLoaded', () => {
    console.log('='.repeat(50));
    console.log('🎯 PORTFOLIO VERIFICATION STARTED');
    console.log('='.repeat(50));

    checkCSSModules();
    checkTypography();
    checkThemes();
    checkResponsiveness();
    checkEducationSection();

    console.log('='.repeat(50));
    console.log('✨ VERIFICATION COMPLETE');
    console.log('='.repeat(50));
});

// Additional performance checks
window.addEventListener('load', () => {
    console.log('\n⚡ Performance Metrics:');
    console.log(`  Page load time: ${performance.now().toFixed(2)}ms`);

    // Check for CSS transitions
    const elements = document.querySelectorAll('*');
    let transitionCount = 0;
    elements.forEach(el => {
        if (getComputedStyle(el).transition !== 'all 0s ease 0s') {
            transitionCount++;
        }
    });
    console.log(`  CSS transitions: ${transitionCount} elements`);

    // Check for animations
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    console.log(`  Animated elements: ${animatedElements.length}`);
});