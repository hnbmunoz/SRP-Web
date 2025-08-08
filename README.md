# baseLayout

A comprehensive React-based healthcare application template with modern UI components, authentication system, and responsive design. Built with TypeScript, Vite, and a robust component architecture.

## 🚀 Features

- **Healthcare-Focused Design**: Optimized UI components and theming for medical applications
- **Authentication System**: Complete auth flow with login, signup, and protected routes
- **Responsive Design**: Mobile-first approach with SCSS modules and Bootstrap integration
- **Component Library**: Extensive collection of reusable custom components
- **Landing Page**: Professional landing page with hero section, features, and call-to-action
- **State Management**: Zustand for lightweight and efficient state management
- **Storybook Integration**: Component development and testing environment
- **TypeScript**: Full type safety and enhanced developer experience
- **Modern Tooling**: Vite for fast development and optimized builds

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.3** - Fast build tool and dev server

### UI & Styling
- **Bootstrap 5.3.7** - Responsive framework
- **React Bootstrap 2.10.10** - Bootstrap components for React
- **SCSS/Sass** - Advanced CSS preprocessing
- **Styled Components 6.1.19** - CSS-in-JS styling

### State & Routing
- **Zustand 5.0.6** - Lightweight state management
- **React Router DOM 7.6.3** - Client-side routing

### Icons & Assets
- **React Icons 5.5.0** - Popular icon library
- **Heroicons React 2.2.0** - Beautiful hand-crafted SVG icons
- **React Bootstrap Icons 1.11.6** - Bootstrap icon components

### Development Tools
- **Storybook 8.6.14** - Component development environment
- **ESLint 9.30.1** - Code linting and formatting
- **TypeScript ESLint 8.35.1** - TypeScript-specific linting rules

## 📁 Project Structure

```
baseLayout/
├── public/                          # Static assets
│   ├── medical-logo.svg            # Healthcare branding
│   └── vite.svg                    # Vite logo
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Main App component
│   ├── index.css                   # Global styles
│   ├── assets/                     # Asset files
│   │   └── styles/                 # SCSS styling system
│   │       ├── _fonts.scss         # Font definitions
│   │       ├── _themes.scss        # Theme variables
│   │       └── icons.scss          # Icon styles
│   ├── components/                 # React components
│   │   ├── AuthDemo.tsx            # Authentication demonstration
│   │   ├── Dashboard.tsx           # Main dashboard component
│   │   ├── Header.tsx              # Application header
│   │   ├── Login.tsx               # Login form component
│   │   ├── Signup.tsx              # User registration form
│   │   ├── Profile.tsx             # User profile management
│   │   ├── NotFound.tsx            # 404 error page
│   │   ├── Forbidden.tsx           # 403 access denied page
│   │   ├── LoadingDemo.tsx         # Loading states demo
│   │   ├── custom-component/       # Reusable custom components
│   │   │   ├── Loading.tsx         # Loading spinner
│   │   │   ├── FormField/          # Form input component
│   │   │   ├── Tooltip/            # Tooltip component with Storybook
│   │   │   ├── SidePanel/          # Collapsible side panel
│   │   │   ├── NavigationAccordion/ # Accordion navigation
│   │   │   └── ProfileSection/     # User profile section
│   │   ├── custom-hooks/           # Custom React hooks
│   │   │   └── useDebounceHook.tsx # Debounce utility hook
│   │   ├── custom-templates/       # Template components
│   │   │   ├── MedicalIconMapper.tsx    # Medical icon mapping
│   │   │   └── AlternativeIconMapper.tsx # Alternative icons
│   │   ├── landing-page/           # Complete landing page system
│   │   │   ├── LandingPage.tsx     # Main landing page
│   │   │   ├── README.md           # Landing page documentation
│   │   │   └── components/         # Landing page sections
│   │   │       ├── HeroSection/    # Hero banner with CTA
│   │   │       ├── FeaturesSection/ # Features showcase
│   │   │       └── CallToActionSection/ # Email signup CTA
│   │   └── reserve-components/     # Backup/alternative components
│   │       └── LoadingSpinner.tsx  # Alternative loading component
│   ├── contexts/                   # React contexts
│   │   └── SidePanelContext.tsx    # Side panel state management
│   ├── routes/                     # Routing configuration
│   │   ├── PrivateRoutes.tsx       # Protected route wrapper
│   │   └── PublicRoutes.tsx        # Public route wrapper
│   ├── store/                      # Zustand state stores
│   │   ├── authStore.ts            # Authentication state
│   │   └── pageStore.ts            # Page/navigation state
│   └── utils/                      # Utility functions
│       ├── encryptedStorage.ts     # Secure storage utilities
│       └── encryption.ts           # Data encryption helpers
├── docs/                           # Documentation
│   └── authentication-data-model.md # Auth system documentation
├── .storybook/                     # Storybook configuration
├── LOADING_SCREEN_GUIDE.md         # Loading component guide
└── document.md                     # Company naming brainstorm
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd baseLayout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open automatically in your browser at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with auto-open browser
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally
- `npm run storybook` - Start Storybook development server on port 6006
- `npm run build-storybook` - Build static Storybook for deployment

## 🎨 Component Library

### Custom Components

#### Form Components
- **FormField** - Reusable form input with validation and styling
- **Tooltip** - Interactive tooltip with hover and click triggers

#### Navigation Components
- **SidePanel** - Collapsible sidebar with toggle functionality
- **NavigationAccordion** - Expandable navigation menu
- **Header** - Application header with branding and navigation

#### UI Components
- **Loading** - Animated loading spinner
- **LoadingOverlay** - Full-screen loading overlay
- **ProfileSection** - User profile display and management

#### Page Components
- **Dashboard** - Main application dashboard
- **Landing Page** - Complete marketing landing page with:
  - Hero section with statistics and CTAs
  - Features section with benefits showcase
  - Call-to-action section with email signup

### Authentication System

Complete authentication flow including:
- User registration and login forms
- Protected and public route handling
- Zustand-based state management
- Encrypted local storage for sensitive data
- Demo authentication component for testing

## 🎨 Theming & Styling

### SCSS Theme System
The application uses a comprehensive SCSS theming system with variables for:
- Primary, secondary, and accent colors optimized for healthcare
- Typography scales and font definitions
- Spacing and layout utilities
- Component-specific styling with CSS modules

### Key Theme Variables
```scss
$primary: #007BBA;      // Healthcare blue
$secondary: #38B2AC;    // Teal accent
$accent: #6DBE45;       // Green highlight
$background: #F7F9FA;   // Light background
$text-primary: #2E2E2E; // Dark text
$text-secondary: #6B7280; // Muted text
```

## 📚 Storybook Integration

This project includes Storybook for component development and testing:

### Running Storybook
```bash
npm run storybook
```
Access Storybook at `http://localhost:6006`

### Building Storybook
```bash
npm run build-storybook
```
Creates a static build in the `storybook-static` directory.

### Available Stories
- FormField component with various states and validations
- Tooltip component with different triggers and positions
- Landing page components (Hero, Features, CTA sections)

## 🔒 Security Features

- **Encrypted Storage**: Sensitive data encryption for local storage
- **Route Protection**: Private route guards for authenticated content
- **Type Safety**: Full TypeScript coverage for enhanced security
- **Input Validation**: Form validation and sanitization

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- Mobile-first approach with Bootstrap grid system
- SCSS breakpoints for custom responsive behavior
- Touch-friendly interface elements
- Optimized for healthcare professionals on various devices

## 🚀 Deployment

### Production Build
```bash
npm run build
```
Creates optimized production build in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is designed to be freely used and modified for your healthcare applications.

## 🆘 Support

- Check component documentation in individual README files
- Review Storybook stories for component usage examples
- Refer to inline code comments for implementation details
- See `docs/` directory for additional documentation

## 🔄 Recent Updates

- Added comprehensive landing page system with healthcare focus
- Implemented Zustand state management for authentication
- Enhanced component library with Storybook integration
- Added SCSS theming system with healthcare-optimized colors
- Implemented encrypted storage utilities for sensitive data
- Added responsive design with mobile-first approach
