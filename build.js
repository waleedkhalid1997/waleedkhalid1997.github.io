#!/usr/bin/env node

/**
 * Build Script - Combines modular HTML sections into production-ready index.html
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

class PortfolioBuilder {
  constructor() {
    this.sectionsDir = path.join(__dirname, 'sections');
    this.outputFile = path.join(__dirname, 'index.html');
    this.templateFile = path.join(__dirname, 'index-template.html');
  }

  async build() {
    console.log('🚀 Building Portfolio...');

    try {
      // Read the template
      let template = fs.readFileSync(this.templateFile, 'utf8');

      // Define sections to load
      const sections = [
        { placeholder: 'HERO_SECTION', file: 'hero.html' },
        { placeholder: 'ABOUT_SECTION', file: 'about.html' },
        { placeholder: 'EXPERIENCE_SECTION', file: 'experience.html' },
        { placeholder: 'EDUCATION_SECTION', file: 'education.html' },
        { placeholder: 'SKILLS_SECTION', file: 'skills.html' },
        { placeholder: 'PROJECTS_SECTION', file: 'projects.html' },
        { placeholder: 'CONTACT_SECTION', file: 'contact.html' },
        { placeholder: 'FOOTER_SECTION', file: 'footer.html' }
      ];

      // Load and replace each section
      for (const section of sections) {
        const sectionPath = path.join(this.sectionsDir, section.file);
        if (fs.existsSync(sectionPath)) {
          const sectionContent = fs.readFileSync(sectionPath, 'utf8');
          template = template.replace(`<!-- ${section.placeholder} -->`, sectionContent);
          console.log(`✅ Loaded ${section.file}`);
        } else {
          console.warn(`⚠️  Section file not found: ${section.file}`);
          template = template.replace(`<!-- ${section.placeholder} -->`, '<!-- Section not found -->');
        }
      }

      // Write the final HTML file
      fs.writeFileSync(this.outputFile, template, 'utf8');

      console.log('🎉 Build completed successfully!');
      console.log(`📁 Output: ${this.outputFile}`);

      // Get file size
      const stats = fs.statSync(this.outputFile);
      console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }
}

// Create template file (the main HTML structure without sections)
const templateContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#1a365d">

    <!-- Primary Meta Tags -->
    <title>Waleed Khalid | Full Stack Developer | Portfolio</title>
    <meta name="title" content="Waleed Khalid | Full Stack Developer - React, Node.js, PHP, AWS">
    <meta name="description" content="Experienced Full Stack Developer specializing in React, Node.js, PHP, AWS, and DevOps. Explore my portfolio of scalable web applications, e-commerce platforms, and enterprise solutions.">
    <meta name="keywords" content="Full Stack Developer, Web Developer, React, Node.js, PHP, Laravel, AWS, Docker, E-commerce, Web Designer, Pakistan">
    <meta name="author" content="Waleed Khalid">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://waleedkhalid1997.github.io">
    <meta property="og:title" content="Waleed Khalid | Full Stack Developer">
    <meta property="og:description" content="Experienced Full Stack Developer with 5+ years of experience building scalable web applications and e-commerce platforms.">
    <meta property="og:image" content="https://waleedkhalid1997.github.io/img/me.png">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Waleed Khalid | Full Stack Developer">
    <meta name="twitter:description" content="Experienced Full Stack Developer. Check out my work and projects.">
    <meta name="twitter:image" content="https://waleedkhalid1997.github.io/img/me.png">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="style/style.css">
</head>

<body>
    <!-- Loading Screen -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading Experience...</p>
    </div>

    <!-- Scroll Progress -->
    <div class="scroll-progress">
        <div class="scroll-progress-bar" id="scrollProgressBar"></div>
    </div>

    <!-- Theme Toggle -->
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <i class="fas fa-moon"></i>
    </button>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <span class="nav-logo">WK</span>
            </div>

            <ul class="nav-menu" id="navMenu">
                <li><a href="#home" class="nav-link active" data-section="home">Home</a></li>
                <li><a href="#about" class="nav-link" data-section="about">About</a></li>
                <li><a href="#experience" class="nav-link" data-section="experience">Experience</a></li>
                <li><a href="#education" class="nav-link" data-section="education">Education</a></li>
                <li><a href="#skills" class="nav-link" data-section="skills">Skills</a></li>
                <li><a href="#projects" class="nav-link" data-section="projects">Projects</a></li>
                <li><a href="#contact" class="nav-link" data-section="contact">Contact</a></li>
            </ul>

            <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <div class="nav-overlay" id="navOverlay"></div>
        <div class="nav-mobile-menu" id="navMobileMenu">
            <a href="#home" class="nav-link" data-section="home">Home</a>
            <a href="#about" class="nav-link" data-section="about">About</a>
            <a href="#experience" class="nav-link" data-section="experience">Experience</a>
            <a href="#education" class="nav-link" data-section="education">Education</a>
            <a href="#skills" class="nav-link" data-section="skills">Skills</a>
            <a href="#projects" class="nav-link" data-section="projects">Projects</a>
            <a href="#contact" class="nav-link" data-section="contact">Contact</a>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <!-- HERO_SECTION -->
        <!-- ABOUT_SECTION -->
        <!-- EXPERIENCE_SECTION -->
        <!-- EDUCATION_SECTION -->
        <!-- SKILLS_SECTION -->
        <!-- PROJECTS_SECTION -->
        <!-- CONTACT_SECTION -->
    </main>

    <!-- FOOTER_SECTION -->

    <!-- Scroll to Top Button -->
    <button class="scroll-top" id="scrollTop" aria-label="Scroll to top">
        <i class="fas fa-arrow-up"></i>
    </button>

    <!-- Scripts -->
    <script src="scripts/index.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index-template.html'), templateContent);

// Run the build
const builder = new PortfolioBuilder();
builder.build();