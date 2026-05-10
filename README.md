# Waleed Khalid - Portfolio

A modern, responsive portfolio website built with clean HTML5, CSS3, and JavaScript. Features a modular architecture for easy maintenance and customization.

## 🚀 Features

- **Modular Architecture**: Separate HTML, CSS, and JS files for each section
- **Dark/Light Theme**: Seamless theme switching with smooth transitions
- **Responsive Design**: Mobile-first approach with 4 breakpoint tiers
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management
- **Performance**: Hardware-accelerated animations and optimized loading
- **Modern UI**: Glassmorphism effects, smooth animations, and professional design

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file (loads sections dynamically)
├── index-template.html     # Template for build process
├── build.js               # Build script to combine sections
├── sections/              # Modular HTML sections
│   ├── hero.html
│   ├── about.html
│   ├── experience.html
│   ├── education.html
│   ├── skills.html
│   ├── projects.html
│   ├── contact.html
│   └── footer.html
├── style/                 # Modular CSS architecture
│   ├── style.css          # Main CSS import file
│   ├── base/
│   │   ├── variables.css  # Design tokens & CSS variables
│   │   ├── reset.css      # Modern CSS reset
│   │   └── global.css     # Global styles & backgrounds
│   ├── components/
│   │   ├── nav.css        # Navigation component
│   │   ├── buttons.css    # Button styles
│   │   ├── cards.css      # Card components
│   │   └── forms.css      # Form styling
│   ├── sections/
│   │   ├── hero.css       # Hero section styles
│   │   ├── about.css      # About section styles
│   │   ├── experience.css # Experience timeline
│   │   ├── skills.css     # Skills with progress bars
│   │   ├── projects.css   # Projects grid
│   │   ├── contact.css    # Contact form
│   │   ├── education.css  # Education cards
│   │   └── footer.css     # Footer navigation
│   ├── themes/
│   │   ├── dark.css       # Dark theme (default)
│   │   └── light.css      # Light theme overrides
│   ├── utils/
│   │   ├── animations.css # Keyframe animations
│   │   └── utilities.css  # Helper classes
│   └── responsive.css     # Media queries
├── scripts/
│   └── index.js           # Main JavaScript functionality
├── img/                  # Images and assets
└── README.md             # This file
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (for build script)
- Modern web browser
- Text editor (VS Code recommended)

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Sections load dynamically via JavaScript

### Production Build
For deployment to GitHub Pages or static hosting:

```bash
# Install dependencies (if needed)
npm install

# Run build script to combine all sections into single HTML file
node build.js

# The built file will be saved as index.html
```

## 🎨 Customization

### Colors
Edit `style/base/variables.css`:
```css
:root {
  --primary: #your-color;     /* Change primary brand color */
  --accent: #your-accent;     /* Change accent color */
}
```

### Content
Edit individual section files in `sections/`:
- `hero.html` - Hero section content
- `about.html` - About section
- `experience.html` - Work experience
- `projects.html` - Portfolio projects

### Styles
Each section has its own CSS file in `style/sections/` for easy customization.

## 🎭 Theme System

### Automatic Theme Detection
The site automatically detects user preferences and saves theme choice.

### Manual Theme Toggle
Click the sun/moon icon in the top-right corner to toggle themes.

### Theme Variables
All colors are defined as CSS variables for easy theming:
```css
/* Dark theme */
[data-theme="dark"] {
  --bg-primary: var(--gray-900);
  --text-primary: var(--white);
}

/* Light theme */
[data-theme="light"] {
  --bg-primary: var(--white);
  --text-primary: var(--gray-900);
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: > 1440px

### Mobile Features
- Touch-friendly navigation
- Optimized typography scaling
- Reduced animations for performance
- Swipe gestures support

## ♿ Accessibility

### Compliance
- WCAG 2.1 AA standards
- Proper semantic HTML
- Keyboard navigation
- Screen reader support

### Features
- Focus indicators on all interactive elements
- ARIA labels for screen readers
- Reduced motion support
- High contrast mode compatibility

## 🚀 Performance

### Optimizations
- CSS imports for efficient loading
- Hardware-accelerated animations
- Lazy loading for images
- Minified assets for production

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Build Process

### Development Mode
- Sections load dynamically via JavaScript
- Hot reload for CSS changes
- Source maps for debugging

### Production Mode
- All sections combined into single HTML file
- CSS minification
- Asset optimization
- Static file generation

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across devices
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Waleed Khalid**
- Email: akwaleed728@gmail.com
- LinkedIn: [linkedin.com/in/waleed-khalid](https://linkedin.com/in/waleed-khalid-073b04131)
- GitHub: [github.com/waleedkhalid1997](https://github.com/waleedkhalid1997)

---

**Built with ❤️ using modern web technologies**