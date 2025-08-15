# Theme System Quick Reference

## Quick Start

### 1. Using Theme in Components

```typescript
import { useTheme, useThemeClass } from '../store/themeStore';

const MyComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { themeClass } = useThemeClass();
  
  return (
    <div className={`my-component ${themeClass}`}>
      <button onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};
```

### 2. CSS Custom Properties

```scss
.my-component {
  background-color: var(--surface-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px var(--shadow-color);
}
```

## Available Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `useTheme()` | Main theme operations | `{ theme, isDarkMode, setTheme, toggleTheme, initializeTheme }` |
| `useThemeClass()` | Theme-aware CSS classes | `{ isDarkMode, themeClass, getThemeClass }` |

## CSS Variables Reference

### Core Colors
```scss
--primary-color          // Main brand color
--secondary-color        // Secondary brand color  
--accent-color          // Accent/highlight color
--background-color      // Page background
--surface-color         // Card/surface background
```

### Text Colors
```scss
--text-primary          // Main text color
--text-secondary        // Secondary text color
--text-muted           // Muted/disabled text
```

### UI Elements
```scss
--border-color         // Border color
--shadow-color         // Box shadow color
--card-background      // Card background
```

### Alert Colors
```scss
--alert-warning        // Warning/error color
--alert-success        // Success color
--alert-info          // Info color
```

### Medical Theme
```scss
--medical-primary      // Medical blue
--medical-secondary    // Medical teal
--medical-accent       // Medical green
--medical-emergency    // Medical red
```

## Theme Values

### Light Theme
- Background: `#F7F9FA` (Light gray)
- Surface: `#FFFFFF` (White)
- Primary Text: `#2E2E2E` (Dark gray)
- Primary Color: `#007BBA` (Medical blue)

### Dark Theme
- Background: `#0A1628` (Deep navy)
- Surface: `#1A2332` (Dark blue-gray)
- Primary Text: `#F0F4F8` (Soft white)
- Primary Color: `#2E86AB` (Deep medical blue)

## Common Patterns

### Conditional Styling
```typescript
const { getThemeClass } = useThemeClass();
const buttonClass = getThemeClass('btn-light', 'btn-dark');
```

### Theme-Aware Icons
```typescript
const { isDarkMode } = useTheme();
return isDarkMode ? <FaSun /> : <FaMoon />;
```

### Dynamic Styles
```typescript
const { isDarkMode } = useTheme();
const dynamicStyle = {
  opacity: isDarkMode ? 0.8 : 1,
  transition: 'opacity 0.2s ease'
};
```

## Utility Classes

```scss
.theme-surface    // Surface background + primary text
.theme-background // Page background + primary text  
.theme-border     // Theme-aware border
.theme-shadow     // Theme-aware shadow
```

## Best Practices

✅ **Do:**
- Use CSS custom properties for colors
- Test in both light and dark themes
- Use semantic color variables
- Leverage provided hooks

❌ **Don't:**
- Hardcode color values
- Manipulate DOM directly for theming
- Ignore accessibility contrast ratios
- Override theme variables unnecessarily

## Troubleshooting

### Theme not applying?
1. Check if `initializeTheme()` is called in App.tsx
2. Verify CSS custom properties are used
3. Ensure component is wrapped in theme provider

### Colors not updating?
1. Use `var(--color-name)` instead of hardcoded values
2. Check if CSS is properly imported
3. Verify theme store is properly connected

### Performance issues?
1. Avoid inline styles with theme values
2. Use CSS custom properties for better performance
3. Minimize theme-dependent JavaScript calculations