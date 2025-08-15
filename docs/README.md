# MedPortal Documentation

Welcome to the MedPortal documentation. This directory contains comprehensive guides for developers working on the MedPortal healthcare management application.

## 📚 Available Documentation

### Theme System
- **[Theme System Documentation](./theme-system.md)** - Complete guide to the dynamic theme system
- **[Theme Quick Reference](./theme-quick-reference.md)** - Quick reference for developers
- **[Theme Migration Guide](./theme-migration-guide.md)** - Guide for migrating existing components

### Authentication
- **[Authentication Data Model](./authentication-data-model.md)** - User authentication and data structure

## 🎨 Theme System Overview

The MedPortal application features a comprehensive dynamic theme system supporting both light and dark modes with medical-professional color schemes. The system provides:

- ✅ **Dynamic Theme Switching** - Instant switching between light and dark modes
- ✅ **System Preference Detection** - Automatically detects user's OS theme preference
- ✅ **Persistent Theme Storage** - Remembers user's theme choice across sessions
- ✅ **Medical Color Palette** - Professional healthcare-focused color schemes
- ✅ **Accessibility Compliant** - High contrast ratios and proper ARIA labels
- ✅ **Performance Optimized** - CSS custom properties for instant theme changes

### Quick Start with Themes

```typescript
// Import theme hooks
import { useTheme, useThemeClass } from '../store/themeStore';

const MyComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { themeClass } = useThemeClass();
  
  return (
    <div className={`my-component ${themeClass}`}>
      <button onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};
```

```scss
// Use CSS custom properties
.my-component {
  background-color: var(--surface-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

## 🚀 Getting Started

1. **For Theme Development**: Start with the [Theme System Documentation](./theme-system.md)
2. **For Quick Reference**: Use the [Theme Quick Reference](./theme-quick-reference.md)
3. **For Migration**: Follow the [Theme Migration Guide](./theme-migration-guide.md)
4. **For Authentication**: Review the [Authentication Data Model](./authentication-data-model.md)

## 🏗️ Project Structure

```
src/
├── assets/styles/
│   └── _themes.scss          # Theme definitions and CSS variables
├── store/
│   └── themeStore.ts         # Theme state management
├── components/
│   ├── Header.tsx            # Contains theme toggle UI
│   └── Profile.tsx           # Additional theme controls
└── App.tsx                   # Theme initialization
```

## 🎯 Key Features

### Dynamic Theming
- Light and dark theme support
- Medical-professional color schemes
- Instant theme switching without page reload
- System preference detection

### State Management
- Zustand-based theme store
- Persistent theme storage
- Theme initialization on app startup
- Utility hooks for components

### Developer Experience
- CSS custom properties for easy theming
- TypeScript support with proper types
- Comprehensive documentation
- Migration guides for existing components

## 📋 Development Guidelines

### Theme Best Practices
1. **Use CSS Custom Properties**: Always use `var(--color-name)` instead of hardcoded colors
2. **Test Both Themes**: Ensure components work in both light and dark modes
3. **Leverage Theme Hooks**: Use provided hooks for theme-aware logic
4. **Maintain Accessibility**: Ensure proper contrast ratios in both themes

### Code Standards
- Use semantic color variables for their intended purpose
- Add smooth transitions for theme changes
- Test accessibility with screen readers
- Follow the migration guide for existing components

## 🔧 Tools and Resources

### Development Tools
- **VS Code Extensions**: Color Highlight, CSS Peek, SCSS IntelliSense
- **Browser DevTools**: For testing contrast ratios and accessibility
- **Theme Toggle**: Available in header dropdown and profile settings

### Color Palette Reference

#### Light Theme
- Primary: `#007BBA` (Medical blue)
- Background: `#F7F9FA` (Light gray)
- Surface: `#FFFFFF` (White)
- Text: `#2E2E2E` (Dark gray)

#### Dark Theme
- Primary: `#2E86AB` (Deep medical blue)
- Background: `#0A1628` (Deep navy)
- Surface: `#1A2332` (Dark blue-gray)
- Text: `#F0F4F8` (Soft white)

## 🤝 Contributing

When contributing to the theme system:

1. Follow the established color palette
2. Test changes in both light and dark themes
3. Update documentation if adding new features
4. Ensure accessibility compliance
5. Use the migration guide for component updates

## 📞 Support

For questions or issues related to the theme system:

1. Check the relevant documentation first
2. Review existing component implementations
3. Test thoroughly in both themes
4. Follow the troubleshooting guides in the documentation

---

*This documentation is maintained alongside the codebase. Please keep it updated when making changes to the theme system.*