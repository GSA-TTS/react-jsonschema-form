# USWDS Theme - CSS Import Guide

**Status**: Essential for styling  
**Version**: 3.0  
**Updated**: November 2024

---

## Overview

The RJSF USWDS theme requires CSS styling for proper rendering. This guide explains how to import and use the compiled CSS in your applications.

**Key Points:**
- ✅ Centralized CSS in `src/styles/_overrides.scss`
- ✅ Compiled to `dist/uswds-overrides.css` during build
- ✅ Available via CDN for playground
- ✅ Distributed with npm package
- ✅ Supports customization via SCSS variables

---

## Quick Start

### For Application Development

In your main application entry point (`index.tsx`, `app.tsx`, or `_app.tsx`):

```typescript
// 1. Import USWDS base styles (from USWDS package)
import 'uswds/dist/css/uswds.min.css';

// 2. Import RJSF USWDS theme
import { Theme, Form } from '@rjsf/uswds';

// 3. Import the compiled CSS overrides
import '@rjsf/uswds/dist/uswds-overrides.css';

// Now use in your app
export default function MyForm() {
  return <Form schema={schema} theme={Theme} />;
}
```

### For Playground Testing

The playground automatically loads both stylesheets when the USWDS theme is selected:
1. Base USWDS: `//cdn.jsdelivr.net/npm/uswds/dist/css/uswds.min.css`
2. RJSF Overrides: `//cdn.jsdelivr.net/gh/rjsf-team/react-jsonschema-form@main/packages/uswds/dist/uswds-overrides.css`

---

## CSS Files Available

### Compiled CSS (Distribution)
- **Location**: `dist/uswds-overrides.css`
- **Contains**: Compiled CSS from `_overrides.scss`
- **Size**: ~10 KB (uncompressed), ~3 KB (gzipped)
- **Use**: Production applications
- **Generation**: Automatic during `npm run build`

### Source SCSS
- **Location**: `src/styles/_overrides.scss`
- **Contains**: SCSS with design tokens and variables
- **Size**: ~18 KB
- **Use**: Development and customization
- **Compilation**: Run `npm run build:scss` or `npx sass src/styles/_overrides.scss dist/uswds-overrides.css`

---

## Installation & Import Methods

### Method 1: Direct NPM Import (Recommended)

```typescript
// index.tsx or app.tsx
import '@rjsf/uswds/dist/uswds-overrides.css';
```

**Pros:**
- Works with bundlers (Webpack, Vite, etc.)
- Included in npm package
- No external CDN dependency
- Version-locked with theme

**Cons:**
- Requires bundler that can import CSS

### Method 2: Link Tag in HTML

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uswds@3/dist/css/uswds.min.css" />
  <link rel="stylesheet" href="node_modules/@rjsf/uswds/dist/uswds-overrides.css" />
</head>
```

**Pros:**
- Works without build tool
- Simple HTML approach
- Clear stylesheet hierarchy

**Cons:**
- Manual path management
- Requires CSS file in node_modules

### Method 3: CSS Bundler/Webpack

```javascript
// webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  ],
},
```

Then import:
```typescript
import '@rjsf/uswds/dist/uswds-overrides.css';
```

### Method 4: SCSS Import (Source)

If you're using SCSS in your project:

```scss
// styles.scss
@import '@rjsf/uswds/src/styles/_overrides.scss';
```

**Requirements:**
- SCSS compiler configured
- `sass` package installed
- Webpack/Vite configured for SCSS

---

## CSS Content Overview

The compiled CSS includes styling for:

### Form Components
- Text inputs, textareas, email, password, URL fields
- Select dropdowns and comboboxes
- Checkboxes and radio buttons
- Buttons (primary, secondary, outline, unstyled)
- Labels, hints, error messages

### Layout & Structure
- Form group spacing
- Array field containers and items
- Additional property fields
- Hidden field display
- Fieldsets and legends

### States & Interactions
- Focus states (WCAG AA compliant)
- Hover states
- Active/pressed states
- Disabled states
- Error/invalid states
- Read-only states

### Accessibility
- Minimum 44px touch targets (mobile)
- 2px focus outline
- Color contrast compliant
- Proper spacing for readability

### Responsive Design
- Mobile-first approach
- Tablet breakpoint (640px+)
- Desktop breakpoint (1024px+)
- Print styles

---

## Design Tokens (CSS Variables)

The SCSS file uses these customizable tokens:

### Colors
```scss
$uswds-primary-color: #005ea2;        // Primary action blue
$uswds-primary-dark: #004080;         // Hover state
$uswds-primary-darker: #002d5c;       // Active state
$uswds-secondary-color: #e31c3d;      // Error red
$uswds-secondary-dark: #b3132a;       // Dark red
$uswds-accent-cool: #07648d;          // Accent blue
$uswds-accent-warm: #c55811;          // Warning orange
$uswds-success-color: #07a41e;        // Success green
```

### Spacing (8px base unit)
```scss
$uswds-spacing-xs: 0.25rem;           // 4px
$uswds-spacing-sm: 0.5rem;            // 8px
$uswds-spacing-md: 1rem;              // 16px
$uswds-spacing-lg: 1.5rem;            // 24px
$uswds-spacing-xl: 2rem;              // 32px
$uswds-spacing-2xl: 3rem;             // 48px
```

### Typography
```scss
$uswds-font-family: 'Source Sans Pro', sans-serif;
$uswds-font-size-base: 1rem;          // 16px
$uswds-font-size-sm: 0.875rem;        // 14px
$uswds-font-size-lg: 1.125rem;        // 18px
$uswds-font-weight-normal: 400;
$uswds-font-weight-bold: 700;
```

### Accessibility
```scss
$uswds-focus-outline-width: 2px;
$uswds-focus-outline-offset: 2px;
$uswds-touch-target-min: 44px;        // Mobile minimum
```

---

## Customization Guide

### Option A: Override SCSS Variables

Create a custom SCSS file:

```scss
// custom-theme.scss

// Override variables BEFORE import
$uswds-primary-color: #003366;
$uswds-primary-dark: #002244;
$uswds-spacing-md: 1.5rem;
$uswds-font-size-base: 1.125rem;

// Then import the theme
@import '@rjsf/uswds/src/styles/_overrides.scss';

// Add custom overrides AFTER import
.usa-button {
  border-radius: 4px;  // Increase rounded corners
}
```

### Option B: CSS Variable Overrides

Override at runtime (if CSS variables are used):

```css
:root {
  --uswds-primary-color: #003366;
  --uswds-spacing-md: 1.5rem;
  --uswds-font-size-base: 1.125rem;
}
```

### Option C: Additional CSS

Add your own CSS after importing:

```typescript
import '@rjsf/uswds/dist/uswds-overrides.css';
import './custom-theme.css';
```

---

## Framework-Specific Setup

### React + Create React App

```typescript
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import USWDS styles
import 'uswds/dist/css/uswds.min.css';
import '@rjsf/uswds/dist/uswds-overrides.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### React + Vite

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Import USWDS styles
import 'uswds/dist/css/uswds.min.css';
import '@rjsf/uswds/dist/uswds-overrides.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Next.js

```typescript
// pages/_app.tsx
import type { AppProps } from 'next/app';

// Import USWDS styles
import 'uswds/dist/css/uswds.min.css';
import '@rjsf/uswds/dist/uswds-overrides.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Angular

```typescript
// styles.scss (global styles)
@import 'uswds/dist/css/uswds.min.css';
@import '@rjsf/uswds/dist/uswds-overrides.css';
```

Or in `angular.json`:
```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/uswds/dist/css/uswds.min.css",
              "node_modules/@rjsf/uswds/dist/uswds-overrides.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

### Svelte

```svelte
<!-- App.svelte -->
<script>
  import 'uswds/dist/css/uswds.min.css';
  import '@rjsf/uswds/dist/uswds-overrides.css';
  import Form from '@rjsf/uswds';
</script>

<Form {schema} />

<style>
  /* Global styles */
</style>
```

---

## Troubleshooting

### Issue: Styles Not Applied

**Symptoms:** Form renders but lacks styling (unstyled inputs, buttons, etc.)

**Solutions:**
1. Verify CSS is imported:
   ```typescript
   import '@rjsf/uswds/dist/uswds-overrides.css';
   ```

2. Check browser DevTools for CSS file loading
3. Verify both USWDS base AND overrides are imported
4. Check import is in entry point, not lazy-loaded

### Issue: CSS File Not Found

**Error:** `Module not found: '@rjsf/uswds/dist/uswds-overrides.css'`

**Solutions:**
1. Verify package is installed:
   ```bash
   npm ls @rjsf/uswds
   ```

2. Rebuild package:
   ```bash
   cd node_modules/@rjsf/uswds
   npm run build
   ```

3. Check file exists:
   ```bash
   ls node_modules/@rjsf/uswds/dist/uswds-overrides.css
   ```

### Issue: Array Buttons Not Styled

**Symptoms:** Add, remove, reorder buttons appear unstyled in nested arrays

**Cause:** CSS overrides not loaded

**Solution:** Ensure both stylesheets are imported:
```typescript
import 'uswds/dist/css/uswds.min.css';  // Base USWDS
import '@rjsf/uswds/dist/uswds-overrides.css';  // RJSF overrides
```

### Issue: Colors/Spacing Different Than Expected

**Symptoms:** Custom colors or spacing not applied

**Solution:** For source SCSS customization:
```scss
// custom.scss
$uswds-primary-color: #003366;  // BEFORE import

@import '@rjsf/uswds/src/styles/_overrides.scss';

// Custom additions AFTER import
.usa-button {
  padding: 12px 24px;
}
```

### Issue: Webpack/Build Error with SCSS

**Error:** `Module parse failed: Unexpected token`

**Solution:** Configure SCSS loader:
```javascript
// webpack.config.js
{
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
}
```

---

## CSS Class Reference

### Most Common Classes

```css
/* Form Structure */
.usa-form-group          /* Container for form field */
.usa-label               /* Field label */
.usa-hint                /* Hint/helper text */
.usa-error-message       /* Error message display */

/* Inputs & Controls */
.usa-input               /* Text input, email, password, URL */
.usa-textarea            /* Textarea element */
.usa-select              /* Select dropdown */
.usa-checkbox            /* Checkbox container */
.usa-radio               /* Radio button container */
.usa-button              /* Button styling */

/* States */
.usa-input[aria-invalid="true"]     /* Invalid/error state */
.usa-input:focus                    /* Focus state */
.usa-input:disabled                 /* Disabled state */

/* Layouts */
.usa-fieldset            /* Fieldset container */
.usa-legend              /* Legend styling */
.usa-checkbox-group      /* Checkbox group container */
.usa-radio-group         /* Radio button group container */
.array-field-item        /* Array item container */
```

---

## Performance Tips

### 1. Minification
CSS is minified automatically in production builds.

### 2. Gzipping
Enable gzip compression on your server:
```nginx
# nginx
gzip on;
gzip_types text/css;
```

### 3. Caching
Set long cache headers:
```
Cache-Control: public, max-age=31536000, immutable
```

### 4. Critical CSS
For above-the-fold optimization:
```html
<link rel="stylesheet" href="uswds-overrides.css" />
<link rel="preload" href="fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
```

### 5. Bundle Analysis
Check CSS size in your build:
```bash
npm run build
du -sh dist/uswds-overrides.css
```

---

## Build Process

### Development

During development, changes to SCSS are compiled automatically:

```bash
npm run build:scss
```

Watch mode (if available):
```bash
npm run build:scss -- --watch
```

### Production

CSS is compiled during the build process:

```bash
npm run build
```

This runs:
1. TypeScript compilation
2. SCSS compilation to CSS
3. Bundle generation (CJS, ESM, UMD)

---

## Browser Support

- ✅ Chrome/Edge: Latest 2 versions
- ✅ Firefox: Latest 2 versions
- ✅ Safari: Latest 2 versions
- ⚠️ IE11: Partial support (no CSS variables)

---

## CSS Features Used

- CSS Grid
- Flexbox
- CSS Media Queries
- CSS Transitions
- Pseudo-elements (::before, ::after)
- Pseudo-classes (:focus, :hover, :disabled, etc.)
- ARIA attribute selectors ([aria-invalid])
- CSS custom properties (in future versions)

---

## Common Customization Examples

### Example 1: Change Primary Color

```scss
// custom.scss
$uswds-primary-color: #003366;
$uswds-primary-dark: #002244;
$uswds-primary-darker: #001133;

@import '@rjsf/uswds/src/styles/_overrides.scss';
```

### Example 2: Increase Font Size

```scss
// custom.scss
$uswds-font-size-base: 1.125rem;    // 18px instead of 16px
$uswds-font-size-sm: 1rem;          // 16px instead of 14px
$uswds-font-size-lg: 1.25rem;       // 20px instead of 18px

@import '@rjsf/uswds/src/styles/_overrides.scss';
```

### Example 3: Larger Touch Targets

```scss
// custom.scss
$uswds-touch-target-min: 48px;      // 48px instead of 44px

@import '@rjsf/uswds/src/styles/_overrides.scss';
```

### Example 4: Increased Spacing

```scss
// custom.scss
$uswds-spacing-md: 1.5rem;          // 24px instead of 16px
$uswds-spacing-lg: 2.25rem;         // 36px instead of 24px
$uswds-spacing-xl: 3rem;            // 48px instead of 32px

@import '@rjsf/uswds/src/styles/_overrides.scss';
```

### Example 5: Custom Font

```scss
// custom.scss
$uswds-font-family: 'Roboto', sans-serif;

@import '@rjsf/uswds/src/styles/_overrides.scss';
```

---

## Files & Locations

```
packages/uswds/
├── src/
│   └── styles/
│       └── _overrides.scss          # Source SCSS file
├── dist/
│   └── uswds-overrides.css          # Compiled CSS (production)
├── lib/                              # TypeScript output
└── package.json
```

---

## Next Steps

1. **Import CSS** - Add import to your app's entry point
2. **Test Forms** - Render a form and verify styling
3. **Customize** (optional) - Override SCSS variables if needed
4. **Deploy** - Ensure CSS is included in production build
5. **Monitor** - Check browser DevTools to confirm CSS is loaded

---

## Additional Resources

- **COMPONENT_BEST_PRACTICES.md** - Development guidelines
- **IMPLEMENTATION_GUIDE.md** - Complete implementation workflow
- **CSS_CENTRALIZATION_SUMMARY.md** - Architecture overview
- **React-USWDS Docs** - https://trussworks.github.io/react-uswds/
- **USWDS Design System** - https://designsystem.digital.gov/

---

## Support & Issues

For CSS import issues or questions:

1. Check this guide's troubleshooting section
2. Review browser console for error messages
3. Verify CSS file is in correct location
4. Check that both base USWDS and overrides CSS are imported
5. Open an issue on GitHub with error details

---

**Last Updated:** November 2024  
**Version:** 3.0  
**Status:** Production Ready