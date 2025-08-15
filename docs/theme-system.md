# Theme System Documentation

## Overview

The MedPortal application features a comprehensive dynamic theme system that supports both light and dark modes with medical-professional color schemes. The system is built using CSS custom properties, Zustand state management, and provides seamless theme switching without page reloads.

## Architecture

### Core Components

1. **Theme Styles** (`src/assets/styles/_themes.scss`)
2. **Theme Store** (`src/store/themeStore.ts`)
3. **Theme Initialization** (`src/App.tsx`)
4. **UI Controls** (Header, Profile components)

## Theme Definitions

### Light Theme (Default)
The light theme uses a clean, professional medical color palette:

```scss
:root {
  --primary-color: #007BBA;        // Medical blue
  --secondary-color: #38B2AC;      // Teal
  --accent-color: #6DBE45;         // Health green
  --background-color: #F7F9FA;     // Light gray background
  --surface-color: #FFFFFF;        // White surfaces
  --text-primary: #2E2E2E;         // Dark text
  --text-secondary: #6B7280;       // Gray text
  --text-muted: #9CA3AF;           // Muted text
}
```

### Dark Theme
The dark theme provides a professional medical interface optimized for low-light environments:

```scss
[data-theme="dark"] {
  --primary-color: #2E86AB;        // Deep medical blue
  --secondary-color: #4ECDC4;      // Soft teal
  --accent-color: #7FB069;         // Muted sage green
  --background-color: #0A1628;     // Deep navy
  --surface-color: #1A2332;        // Dark blue-gray
  --text-primary: #F0F4F8;         // Soft white
  --text-secondary: #B8C5D1;       // Light blue-gray
  --text-muted: #6B7A8A;           // Muted blue-gray
}
```

## State Management

### Theme Store (`themeStore.ts`)

The theme system uses Zustand for state management with the following features:

#### State Interface
```typescript
interface ThemeState {
  theme: Theme;                    // 'light' | 'dark'
  isDarkMode: boolean;            // Computed boolean
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}
```

#### Key Functions

**`setTheme(theme: Theme)`**
- Sets the theme and applies it to the document
- Updates the `data-theme` attribute on `document.documentElement`
- Persists the choice to localStorage

**`toggleTheme()`**
- Switches between light and dark themes
- Provides instant theme switching

**`initializeTheme()`**
- Called on app startup
- Detects system preference if no saved theme
- Applies the appropriate theme

### Persistence

Themes are automatically persisted using Zustand's persist middleware:

```typescript
persist(
  // ... store definition
  {
    name: 'theme-storage',
    partialize: (state) => ({
      theme: state.theme
    }),
  }
)
```

## Usage

### Basic Theme Hook

```typescript
import { useTheme } from '../store/themeStore';

const MyComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};
```

### Theme Class Hook

For components that need conditional styling:

```typescript
import { useThemeClass } from '../store/themeStore';

const MyComponent = () => {
  const { themeClass, getThemeClass } = useThemeClass();
  
  const buttonClass = getThemeClass('light-button', 'dark-button');
  
  return <button className={buttonClass}>Click me</button>;
};
```

### CSS Custom Properties

Components automatically inherit theme colors through CSS custom properties:

```scss
.my-component {
  background-color: var(--surface-color);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

## UI Controls

### Header Dropdown
The main theme toggle is located in the header dropdown menu:
- Icon changes based on current theme (sun/moon)
- Text updates dynamically
- Accessible with proper ARIA labels

### Profile Settings
Additional theme control in the profile settings page:
- Toggle button with visual feedback
- Integrated with the main theme system

## System Integration

### App Initialization

Theme initialization happens in the main App component:

```typescript
function App() {
  const { initializeTheme } = useTheme();
  
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  
  // ... rest of app
}
```

### System Preference Detection

The system automatically detects user's OS theme preference:

```typescript
const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }
  return 'light';
};
```

## Component-Specific Theming

### Specialized Theme Variables

The system includes specialized variables for different UI sections:

#### Side Panel
```scss
--side-panel-bg: linear-gradient(180deg, #007bbf 0%, #005a8b 50%, #009688 100%);
--side-panel-text: white;
--side-panel-button-bg: rgba(255, 255, 255, 0.1);
```

#### Header
```scss
--header-bg: linear-gradient(135deg, #007bbf 0%, #009688 100%);
--header-text: white;
--header-shadow: 0 0.125rem 0.5rem rgba(0, 123, 191, 0.2);
```

#### Medical Alerts
```scss
--alert-warning: #DC4C64;    // Medical red
--alert-success: #10B981;    // Medical green
--alert-info: #3B82F6;       // Medical blue
```

## Utility Classes

Pre-defined utility classes for common theme-aware styling:

```scss
.theme-surface {
  background-color: var(--surface-color);
  color: var(--text-primary);
}

.theme-background {
  background-color: var(--background-color);
  color: var(--text-primary);
}

.theme-border {
  border-color: var(--border-color);
}

.theme-shadow {
  box-shadow: 0 1px 3px var(--shadow-color);
}
```

## Best Practices

### 1. Use CSS Custom Properties
Always use CSS custom properties instead of hardcoded colors:

```scss
// ✅ Good
.component {
  background-color: var(--surface-color);
  color: var(--text-primary);
}

// ❌ Avoid
.component {
  background-color: #ffffff;
  color: #000000;
}
```

### 2. Leverage Theme Hooks
Use the provided hooks for theme-aware logic:

```typescript
// ✅ Good
const { isDarkMode } = useTheme();
const iconColor = isDarkMode ? '#F0F4F8' : '#2E2E2E';

// ❌ Avoid
const iconColor = document.documentElement.getAttribute('data-theme') === 'dark' 
  ? '#F0F4F8' 
  : '#2E2E2E';
```

### 3. Test Both Themes
Always test components in both light and dark themes to ensure proper contrast and readability.

### 4. Semantic Color Usage
Use semantic color variables for their intended purpose:
- `--text-primary` for main text content
- `--text-secondary` for supporting text
- `--text-muted` for less important text
- `--alert-*` colors for status messages

## Accessibility

The theme system includes accessibility considerations:

- High contrast ratios in both themes
- Proper ARIA labels on theme toggle buttons
- System preference detection and respect
- Smooth transitions without causing motion sensitivity issues

## Performance

- CSS custom properties provide instant theme switching
- No JavaScript-based style recalculation
- Minimal bundle size impact
- Efficient state management with Zustand

## Future Enhancements

Potential improvements to consider:

1. **Additional Themes**: Support for high-contrast or colorblind-friendly themes
2. **Component-Level Themes**: Allow individual components to override theme colors
3. **Theme Scheduling**: Automatic theme switching based on time of day
4. **Custom Theme Builder**: Allow users to create custom color schemes