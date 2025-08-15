# Landing Page Component

A comprehensive, responsive, and interactive landing page component built for healthcare applications. This component is designed to be easily transferrable to other React applications.

## Features

- **Responsive Design**: Fully responsive across all device sizes
- **Interactive Elements**: Hover effects, animations, and smooth scrolling
- **Modular Architecture**: Separate components for easy customization
- **Healthcare Branding**: Optimized for medical/healthcare applications
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Lazy loading and optimized animations

## Components Structure

```
landing-page/
├── LandingPage.tsx                 # Main landing page component
├── LandingPage.module.scss         # Global styles and utilities
├── README.md                       # This documentation
└── components/
    ├── HeroSection/
    │   ├── HeroSection.tsx         # Hero section with CTA
    │   └── HeroSection.module.scss # Hero section styles
    ├── FeaturesSection/
    │   ├── FeaturesSection.tsx     # Features showcase
    │   └── FeaturesSection.module.scss # Features styles
    └── CallToActionSection/
        ├── CallToActionSection.tsx # Final CTA and email signup
        └── CallToActionSection.module.scss # CTA styles
```

## Installation & Usage

### 1. Copy the entire `landing-page` folder to your React project

```bash
cp -r src/components/landing-page /path/to/your/project/src/components/
```

### 2. Install required dependencies

```bash
npm install react-router-dom
```

### 3. Set up theme variables

Create or update your SCSS theme file with these variables:

```scss
// _themes.scss
$primary: #007BBA;
$secondary: #38B2AC;
$accent: #6DBE45;
$background: #F7F9FA;
$text-primary: #2E2E2E;
$text-secondary: #6B7280;
$alert-warning: #DC4C64;
```

### 4. Add routing

Add the landing page route to your main App component:

```tsx
import LandingPage from './components/landing-page/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        {/* Your other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

### 5. Customize content

Update the content in each component to match your application:

- **HeroSection**: Update title, subtitle, and statistics
- **FeaturesSection**: Modify features array with your app's features
- **CallToActionSection**: Customize CTA text and form handling

## Customization

### Theme Colors

Update the SCSS variables in your theme file to match your brand colors:

```scss
$primary: #your-primary-color;
$secondary: #your-secondary-color;
$accent: #your-accent-color;
```

### Content

Each component has clearly marked content sections that can be easily customized:

1. **Hero Section**: 
   - Title and subtitle text
   - Statistics (healthcare providers, uptime, etc.)
   - Call-to-action buttons

2. **Features Section**:
   - Features array in `FeaturesSection.tsx`
   - Icons, titles, descriptions, and benefits
   - Statistics section

3. **Call-to-Action Section**:
   - CTA text and messaging
   - Email form handling
   - Trust indicators
   - Testimonial content

### Styling

All styles use SCSS modules for scoped styling. Key customization points:

- **Colors**: Update theme variables
- **Typography**: Modify font sizes in component styles
- **Spacing**: Adjust padding/margin values
- **Animations**: Customize animation durations and effects

## Features Included

### Hero Section
- Animated hero with floating elements
- Interactive buttons with hover effects
- Statistics display
- Responsive design with mobile optimization

### Features Section
- Grid layout with hover animations
- Feature cards with icons and benefits
- Statistics section
- Scroll-triggered animations

### Call-to-Action Section
- Email signup form with validation
- Interactive buttons
- Social proof testimonial
- Trust indicators
- Background animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Reduced motion preferences respected
- Proper ARIA labels and roles

## Performance Features

- CSS animations with `will-change` optimization
- Lazy loading for images
- Optimized bundle size with tree shaking
- Minimal re-renders with React best practices

## Dependencies

- React 18+
- React Router DOM 6+
- SCSS/Sass support
- Modern browser with CSS Grid and Flexbox support

## SEO Optimization

This landing page includes comprehensive SEO optimization features. For detailed information about SEO implementation and best practices, see:

- **[SEO Optimization Guide](../../../docs/landing-page-seo-optimization.md)** - Comprehensive SEO documentation covering technical SEO, content optimization, performance, and monitoring
- **[SEO Implementation Guide](../../../docs/seo-implementation-guide.md)** - Step-by-step implementation instructions with code examples

### SEO Features Included

- **Dynamic Meta Tags**: Customizable title, description, and keywords
- **Structured Data**: JSON-LD schemas for Organization, Software Application, and FAQ
- **Open Graph Tags**: Optimized social media sharing
- **Performance Optimization**: Core Web Vitals optimization
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Mobile Optimization**: Responsive design with mobile-first approach

### SEO-Enhanced Components

- **[`LandingPageWithSEO.tsx`](./LandingPageWithSEO.tsx)** - Enhanced landing page with SEO optimization
- **[`SEOHead`](../SEO/SEOHead.tsx)** - Reusable SEO component for dynamic meta tags
- **Structured Data Schemas** - Pre-configured schemas for healthcare applications

### Quick SEO Implementation

```tsx
import LandingPageWithSEO from './components/landing-page/LandingPageWithSEO';

// Use the SEO-optimized version
<Route path="/" element={<LandingPageWithSEO />} />

// Or with variants for different landing pages
<Route path="/demo" element={<LandingPageWithSEO variant="demo" />} />
```

## License

This component is designed to be freely used and modified for your projects.

## Support

For customization help or issues, refer to the inline comments in each component file. For SEO-related questions, consult the comprehensive SEO documentation in the [`docs/`](../../../docs/) directory.