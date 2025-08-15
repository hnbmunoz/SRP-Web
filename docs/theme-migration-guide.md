# Theme Migration Guide

## Overview

This guide helps developers migrate existing components to use the dynamic theme system. Follow these steps to ensure your components work seamlessly with both light and dark themes.

## Migration Checklist

### 1. Replace Hardcoded Colors

**Before:**
```scss
.my-component {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e5e7eb;
}
```

**After:**
```scss
.my-component {
  background-color: var(--surface-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

### 2. Update Component Logic

**Before:**
```typescript
const MyComponent = () => {
  return (
    <div className="my-component">
      <button style={{ backgroundColor: '#007BBA' }}>
        Click me
      </button>
    </div>
  );
};
```

**After:**
```typescript
import { useTheme } from '../store/themeStore';

const MyComponent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="my-component">
      <button className="themed-button">
        Click me
      </button>
    </div>
  );
};
```

### 3. Add Theme Hooks

Import and use theme hooks where needed:

```typescript
import { useTheme, useThemeClass } from '../store/themeStore';

const MyComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { themeClass, getThemeClass } = useThemeClass();
  
  // Use theme-aware logic
  const iconColor = isDarkMode ? 'white' : 'black';
  const containerClass = getThemeClass('light-container', 'dark-container');
  
  return (
    <div className={`my-component ${themeClass}`}>
      {/* Component content */}
    </div>
  );
};
```

## Common Migration Patterns

### Pattern 1: Static Colors to CSS Variables

**Before:**
```scss
.card {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.button-primary {
  background: #007BBA;
  color: white;
}

.text-muted {
  color: #666;
}
```

**After:**
```scss
.card {
  background: var(--surface-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px var(--shadow-color);
}

.button-primary {
  background: var(--primary-color);
  color: var(--surface-color);
}

.text-muted {
  color: var(--text-muted);
}
```

### Pattern 2: Conditional Styling

**Before:**
```typescript
const getButtonStyle = (variant: string) => {
  switch (variant) {
    case 'primary':
      return { backgroundColor: '#007BBA', color: 'white' };
    case 'secondary':
      return { backgroundColor: '#38B2AC', color: 'white' };
    default:
      return { backgroundColor: '#f5f5f5', color: '#333' };
  }
};
```

**After:**
```scss
.button {
  &.primary {
    background-color: var(--primary-color);
    color: var(--surface-color);
  }
  
  &.secondary {
    background-color: var(--secondary-color);
    color: var(--surface-color);
  }
  
  &.default {
    background-color: var(--surface-color);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }
}
```

### Pattern 3: Theme-Aware Icons

**Before:**
```typescript
const MyIcon = () => {
  return <FaIcon color="#007BBA" />;
};
```

**After:**
```typescript
import { useTheme } from '../store/themeStore';

const MyIcon = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <FaIcon 
      style={{ color: 'var(--primary-color)' }}
      // or conditionally:
      // color={isDarkMode ? '#2E86AB' : '#007BBA'}
    />
  );
};
```

## Color Mapping Reference

Use this table to map your existing colors to theme variables:

| Old Color | Light Theme | Dark Theme | CSS Variable |
|-----------|-------------|------------|--------------|
| `#ffffff` | `#FFFFFF` | `#1A2332` | `var(--surface-color)` |
| `#f7f9fa` | `#F7F9FA` | `#0A1628` | `var(--background-color)` |
| `#000000`, `#333` | `#2E2E2E` | `#F0F4F8` | `var(--text-primary)` |
| `#666`, `#777` | `#6B7280` | `#B8C5D1` | `var(--text-secondary)` |
| `#999`, `#aaa` | `#9CA3AF` | `#6B7A8A` | `var(--text-muted)` |
| `#007BBA` | `#007BBA` | `#2E86AB` | `var(--primary-color)` |
| `#38B2AC` | `#38B2AC` | `#4ECDC4` | `var(--secondary-color)` |
| `#6DBE45` | `#6DBE45` | `#7FB069` | `var(--accent-color)` |
| `#e5e7eb` | `#E5E7EB` | `#2D3748` | `var(--border-color)` |

## Step-by-Step Migration Process

### Step 1: Audit Current Colors
1. Search for hardcoded hex colors in your component files
2. List all color values used
3. Map them to appropriate theme variables

### Step 2: Update SCSS Files
1. Replace hardcoded colors with CSS custom properties
2. Test in both light and dark themes
3. Adjust colors if contrast is insufficient

### Step 3: Update TypeScript Files
1. Add theme hooks where needed
2. Replace inline styles with CSS classes
3. Update conditional logic to use theme state

### Step 4: Test and Validate
1. Test component in both themes
2. Check accessibility contrast ratios
3. Verify smooth theme transitions

## Example: Complete Component Migration

**Before (legacy component):**
```typescript
// MyCard.tsx
import React from 'react';
import './MyCard.scss';

interface Props {
  title: string;
  content: string;
}

const MyCard: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="my-card">
      <h3 style={{ color: '#007BBA' }}>{title}</h3>
      <p style={{ color: '#666' }}>{content}</p>
      <button style={{ 
        backgroundColor: '#007BBA', 
        color: 'white',
        border: 'none',
        padding: '8px 16px'
      }}>
        Action
      </button>
    </div>
  );
};

export default MyCard;
```

```scss
// MyCard.scss
.my-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**After (theme-aware component):**
```typescript
// MyCard.tsx
import React from 'react';
import { useThemeClass } from '../store/themeStore';
import styles from './MyCard.module.scss';

interface Props {
  title: string;
  content: string;
}

const MyCard: React.FC<Props> = ({ title, content }) => {
  const { themeClass } = useThemeClass();
  
  return (
    <div className={`${styles.myCard} ${styles[themeClass]}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      <button className={styles.actionButton}>
        Action
      </button>
    </div>
  );
};

export default MyCard;
```

```scss
// MyCard.module.scss
.myCard {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.title {
  color: var(--primary-color);
  margin: 0 0 8px 0;
}

.content {
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.actionButton {
  background-color: var(--primary-color);
  color: var(--surface-color);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Forgetting Transitions
**Problem:** Theme switches appear jarring
**Solution:** Add CSS transitions for smooth changes

```scss
.component {
  background-color: var(--surface-color);
  color: var(--text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

### Pitfall 2: Poor Contrast in Dark Theme
**Problem:** Text is hard to read in dark theme
**Solution:** Test with accessibility tools and adjust colors

### Pitfall 3: Inline Styles Override Theme
**Problem:** Inline styles prevent theme changes
**Solution:** Move styles to CSS with custom properties

### Pitfall 4: Missing Theme Initialization
**Problem:** Theme doesn't apply on first load
**Solution:** Ensure `initializeTheme()` is called in App.tsx

## Testing Your Migration

1. **Visual Testing:**
   - Switch between themes multiple times
   - Check all component states (hover, active, disabled)
   - Verify smooth transitions

2. **Accessibility Testing:**
   - Use browser dev tools to check contrast ratios
   - Test with screen readers
   - Verify keyboard navigation

3. **Performance Testing:**
   - Ensure theme switching is instant
   - Check for layout shifts
   - Monitor for memory leaks

## Migration Tools

### Search and Replace Patterns

Use these regex patterns to find hardcoded colors:

```regex
#[0-9a-fA-F]{3,6}           // Hex colors
rgb\([^)]+\)                // RGB colors
rgba\([^)]+\)               // RGBA colors
hsl\([^)]+\)                // HSL colors
```

### VS Code Extensions
- **Color Highlight** - Visualize colors in code
- **CSS Peek** - Navigate to CSS definitions
- **SCSS IntelliSense** - Better SCSS support

## Need Help?

If you encounter issues during migration:

1. Check the [Theme System Documentation](./theme-system.md)
2. Review the [Quick Reference Guide](./theme-quick-reference.md)
3. Look at existing migrated components for examples
4. Test thoroughly in both themes before committing changes