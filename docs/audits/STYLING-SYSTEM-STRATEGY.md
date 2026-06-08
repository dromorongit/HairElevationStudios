# Hair Elevation Studio — Styling System Strategy

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — Styling System Strategy Defined  

---

## Overview

This document defines the styling system strategy for the Hair Elevation Studio frontend migration to Next.js + TypeScript. It covers Tailwind CSS configuration, theme extension, responsive breakpoints, reusable UI styling conventions, and migration approach from the existing monolithic CSS file.

---

## 1. Styling System Selection

### 1.1 Primary System: Tailwind CSS

**Decision:** Tailwind CSS is the primary styling system for the Hair Elevation Studio frontend migration.

**Justification:**
- **Utility-First Approach:** Prevents CSS duplication and encourages consistent styling patterns
- **No CSS Overhead:** Eliminates the need to name classes and manage CSS specificity
- **Responsive Design:** Excellent responsive utilities with mobile-first approach
- **Design System Integration:** Easy to implement brand colors, spacing, and breakpoints
- **Component Colocation:** Styles live next to components in JSX
- **Purging:** Automatic removal of unused CSS in production for minimal bundle size
- **Flexibility:** Can escape to custom CSS when needed for complex patterns

**Alternatives Considered:**
- **CSS Modules:** Rejected because it still requires CSS files and class name management
- **Styled Components:** Rejected because of runtime overhead and bundle size impact
- **Emotion:** Rejected because similar to Styled Components with runtime cost
- **Plain CSS/SCSS:** Rejected because it leads to duplication and scalability issues (as seen in current 1400-line styles.css)
- **Bootstrap/Material UI:** Rejected because they impose design constraints and are difficult to customize to match brand

---

## 2. Tailwind Configuration

### 2.1 Configuration File Structure
```
tailwind.config.ts
postcss.config.js
src/styles/globals.css
```

### 2.2 Tailwind Config (`tailwind.config.ts`)
```typescript
import type { Config } from 'tailwindcss'
import { BRAND } from '@/constants/brand'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from DESIGN-SYSTEM.md
        cream: BRAND.colors.cream,
        'cream-light': BRAND.colors.creamLight,
        'cream-mid': BRAND.colors.creamMid,
        dark: BRAND.colors.dark,
        'dark-deep': BRAND.colors.darkDeep,
        'off-white': BRAND.colors.offWhite,
        white: BRAND.colors.white,
        gold: BRAND.colors.gold,
        'gold-mid': BRAND.colors.goldMid,
        'gold-dark': BRAND.colors.goldDark,
        'sale-red': BRAND.colors.saleRed,
        'error-red': BRAND.colors.errorRed,
        'success-green': BRAND.colors.successGreen,
        'gray-text': BRAND.colors.grayText,
        'gray-light': BRAND.colors.grayLight,
        black: BRAND.colors.black,
        whatsapp: BRAND.colors.whatsapp,
        'whatsapp-mid': BRAND.colors.whatsappMid,
        'whatsapp-deep': BRAND.colors.whatsappDeep,
      },
      fontFamily: {
        display: BRAND.fonts.display,
        body: BRAND.fonts.body,
      },
      fontWeight: {
        light: BRAND.fontWeights.light,
        regular: BRAND.fontWeights.regular,
        medium: BRAND.fontWeights.medium,
        semibold: BRAND.fontWeights.semibold,
        bold: BRAND.fontWeights.bold,
        black: BRAND.fontWeights.black,
      },
      spacing: {
        // Custom spacing tokens
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': BRAND.shadows.card,
        'card-hover': BRAND.shadows.cardHover,
        'collection': BRAND.shadows.collection,
        'collection-hover': BRAND.shadows.collectionHover,
        'button': BRAND.shadows.button,
        'whatsapp': BRAND.shadows.whatsapp,
        'cart': BRAND.shadows.cart,
        'form': BRAND.shadows.form,
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-gentle': 'gentlePulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 0.5s linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        gentlePulse: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.08) translateY(-3px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}

export default config
```

### 2.3 PostCSS Config (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 2.4 Global Styles (`src/styles/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-body text-dark bg-gradient-to-br from-cream via-cream-mid to-cream-light min-h-screen;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-bold tracking-wide;
  }

  h1 {
    @apply text-3xl md:text-4xl lg:text-5xl;
  }

  h2 {
    @apply text-2xl md:text-3xl lg:text-4xl;
  }

  h3 {
    @apply text-xl md:text-2xl lg:text-3xl;
  }

  a {
    @apply text-gold hover:text-gold-dark transition-colors duration-300;
  }
}

/* Component styles */
@layer components {
  /* Container */
  .container {
    @apply max-w-[1200px] mx-auto px-5;
  }

  /* Section */
  .section {
    @apply py-20 md:py-24;
  }

  /* Card base */
  .card {
    @apply bg-white rounded-2xl shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2;
  }

  /* Button base */
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 font-semibold text-dark uppercase tracking-wider rounded-full bg-gradient-to-r from-gold via-gold-mid to-gold-dark shadow-button transition-all duration-400 hover:shadow-button-hover hover:-translate-y-1 hover:scale-105 relative overflow-hidden;
  }

  .btn::before {
    content: '';
    @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full;
    animation: shimmer 0.5s linear;
  }

  .btn:hover::before {
    animation: shimmer 0.5s linear;
  }

  .btn:disabled {
    @apply opacity-50 cursor-not-allowed hover:transform-none hover:scale-100;
  }

  /* Form group */
  .form-group {
    @apply mb-6;
  }

  .form-label {
    @apply block mb-2 font-medium text-dark;
  }

  .form-input {
    @apply w-full px-4 py-3 bg-off-white border-2 border-cream-mid rounded-lg font-body text-base transition-all duration-300 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 focus:bg-white;
  }

  .form-error {
    @apply mt-1 text-sm text-error-red;
  }

  /* Badge */
  .badge {
    @apply absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full;
  }

  .badge-sale {
    @apply bg-sale-red;
  }

  .badge-out-of-stock {
    @apply bg-error-red;
  }

  /* Price display */
  .price-container {
    @apply flex items-center justify-center gap-2;
  }

  .price-original {
    @apply text-gray-light line-through;
  }

  .price-promo {
    @apply text-sale-red font-bold;
  }

  /* Quantity controls */
  .quantity-controls {
    @apply flex items-center gap-2;
  }

  .quantity-btn {
    @apply w-8 h-8 flex items-center justify-center bg-cream-mid text-dark rounded-md font-semibold transition-colors duration-300 hover:bg-gold hover:text-white;
  }

  .quantity {
    @apply min-w-[2rem] text-center font-semibold;
  }
}

/* Utility classes */
@layer utilities {
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .text-shadow-lg {
    text-shadow: 0 6px 12px rgba(0, 0, 0, 0.9);
  }

  .gradient-overlay {
    background: linear-gradient(
      135deg,
      rgba(200, 169, 126, 0.4) 0%,
      rgba(200, 169, 126, 0.2) 100%
    );
  }

  .section-overlay {
    background: linear-gradient(
      135deg,
      rgba(200, 169, 126, 0.3) 0%,
      rgba(200, 169, 126, 0.1) 100%
    );
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. Responsive Breakpoints

### 3.1 Breakpoint Configuration
```typescript
// src/constants/brand.ts
export const BREAKPOINTS = {
  sm: '640px',   // Small tablets
  md: '769px',   // Tablets (matches original 769px breakpoint)
  lg: '1024px',  // Small desktops
  xl: '1280px',  // Large desktops
  '2xl': '1536px', // Extra large screens
} as const

export const SCREEN_SIZES = {
  mobile: `(max-width: ${BREAKPOINTS.md - 1})`,
  tablet: `(min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.lg - 1})`,
  desktop: `(min-width: ${BREAKPOINTS.lg})`,
} as const
```

### 3.2 Tailwind Breakpoint Usage
```typescript
// Tailwind's default breakpoints extended with custom ones
// sm: 640px
// md: 769px (custom, matches original)
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Usage examples:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Responsive grid */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
  {/* Responsive heading */}
</h1>
```

### 3.3 Custom Breakpoint Utilities
```typescript
// src/hooks/useMediaQuery.ts
import { useEffect, useState } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export function useMediaQuery(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${BREAKPOINTS[bp]})`)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [bp])

  return matches
}

// Usage:
const isDesktop = useMediaQuery('lg')
const isMobile = !useMediaQuery('md')
```

---

## 4. Reusable UI Styling Conventions

### 4.1 Button System
```typescript
// src/components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-gold via-gold-mid to-gold-dark text-dark shadow-button hover:shadow-button-hover hover:-translate-y-1 hover:scale-105',
        secondary: 'bg-white text-dark border-2 border-gold hover:bg-gold/10',
        outline: 'bg-transparent text-gold border-2 border-gold hover:bg-gold hover:text-dark',
        ghost: 'bg-transparent text-dark hover:bg-gold/10',
        link: 'bg-transparent text-gold underline hover:text-gold-dark p-0',
        whatsapp: 'bg-gradient-to-r from-whatsapp via-whatsapp-mid to-whatsapp-deep text-white shadow-whatsapp hover:shadow-lg',
      },
      size: {
        sm: 'px-4 py-2 text-sm rounded-full',
        md: 'px-6 py-3 text-base rounded-full',
        lg: 'px-8 py-4 text-lg rounded-full',
        xl: 'px-10 py-5 text-xl rounded-full',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({
  variant,
  size,
  fullWidth,
  isLoading,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner className="w-5 h-5" />
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
```

### 4.2 Card System
```typescript
// src/components/ui/Card.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const cardVariants = cva(
  'bg-white rounded-2xl shadow-card transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'hover:shadow-card-hover hover:-translate-y-2',
        collection: 'border-t-4 border-gold shadow-collection hover:shadow-collection-hover hover:-translate-y-3',
        service: 'bg-white/80 backdrop-blur-sm border border-gold/20',
        cart: 'bg-white rounded-xl shadow-cart',
        form: 'bg-white rounded-2xl shadow-form p-6 md:p-8',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ variant, padding, className, children, ...props }: CardProps) {
  return (
    <div className={twMerge(cardVariants({ variant, padding }), className)} {...props}>
      {children}
    </div>
  )
}
```

### 4.3 Form System
```typescript
// src/components/ui/FormField.tsx
import { twMerge } from 'tailwind-merge'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helpText?: string
}

export function FormField({
  label,
  error,
  helpText,
  className,
  id,
  ...props
}: FormFieldProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="form-group">
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <input
        id={inputId}
        className={twMerge(
          'form-input',
          error && 'border-error-red focus:border-error-red focus:ring-error-red/20',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p id={`${inputId}-help`} className="mt-1 text-sm text-gray-text">
          {helpText}
        </p>
      )}
    </div>
  )
}
```

### 4.4 Badge System
```typescript
// src/components/ui/Badge.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const badgeVariants = cva(
  'absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full',
  {
    variants: {
      variant: {
        sale: 'bg-sale-red',
        'out-of-stock': 'bg-error-red',
        'new': 'bg-success-green',
        'featured': 'bg-gold text-dark',
      },
      position: {
        'top-left': 'top-3 left-3',
        'top-right': 'top-3 right-3',
        'bottom-left': 'bottom-3 left-3',
        'bottom-right': 'bottom-3 right-3',
      },
    },
    defaultVariants: {
      variant: 'sale',
      position: 'top-left',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ variant, position, className, children, ...props }: BadgeProps) {
  return (
    <span className={twMerge(badgeVariants({ variant, position }), className)} {...props}>
      {children}
    </span>
  )
}
```

---

## 5. CSS Migration Strategy

### 5.1 Migration Approach
The existing `css/styles.css` (~1400 lines) will be migrated incrementally:

1. **Extract Design Tokens:** Move all colors, spacing, shadows to `src/constants/brand.ts`
2. **Configure Tailwind:** Set up Tailwind with brand tokens
3. **Create Global Styles:** Migrate base styles to `src/styles/globals.css`
4. **Create Component Styles:** Migrate component-specific styles to Tailwind classes
5. **Remove Old CSS:** Delete `css/styles.css` once migration is complete

### 5.2 CSS-to-Tailwind Mapping Examples

| Original CSS | Tailwind Equivalent |
|--------------|---------------------|
| `background: #F5EFE6` | `bg-cream` |
| `color: #3B2A23` | `text-dark` |
| `padding: 0 20px` | `px-5` |
| `max-width: 1200px` | `max-w-[1200px]` |
| `border-radius: 16px` | `rounded-2xl` |
| `box-shadow: 0 8px 25px rgba(59, 42, 35, 0.1)` | `shadow-card` |
| `display: flex` | `flex` |
| `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| `transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)` | `transition-all duration-400 ease-bounce-in` |

### 5.3 Handling Complex CSS Patterns

#### 5.3.1 Gradient Backgrounds
```css
/* Original */
background: linear-gradient(135deg, #C8A97E 0%, #B8956A 50%, #A67C52 100%);

/* Tailwind */
className="bg-gradient-to-r from-gold via-gold-mid to-gold-dark"
```

#### 5.3.2 Complex Shadows
```css
/* Original */
box-shadow: 0 6px 20px rgba(200, 169, 126, 0.4), 0 0 0 1px rgba(200, 169, 126, 0.2);

/* Tailwind (via config) */
className="shadow-button"
```

#### 5.3.3 Hover Effects with Transitions
```css
/* Original */
transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
transform: translateY(-3px) scale(1.05);

/* Tailwind */
className="transition-all duration-400 ease-bounce-in hover:-translate-y-1 hover:scale-105"
```

#### 5.3.4 Responsive Grids
```css
/* Original */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

/* Tailwind */
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7.5"
```

### 5.4 CSS Modules for Complex Patterns
When Tailwind utilities are insufficient, use CSS Modules:

```typescript
// src/components/shared/ProductCard.module.css
.card {
  @apply bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-300;
}

.card:hover {
  @apply shadow-card-hover -translate-y-2;
}

.imageContainer {
  @apply relative overflow-hidden aspect-[4/3];
}

.image {
  @apply w-full h-full object-cover transition-transform duration-400;
}

.card:hover .image {
  @apply scale-105;
}

.badge {
  @apply absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full bg-sale-red;
}

/* Usage in component */
import styles from './ProductCard.module.css'

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={product.coverImage} alt={product.name} fill className={styles.image} />
        {product.onSale && <Badge className={styles.badge}>SALE</Badge>}
      </div>
      {/* ... */}
    </div>
  )
}
```

---

## 6. Preventing Styling Inconsistency Risks

### 6.1 Design Token Enforcement
- **Single Source of Truth:** All colors, spacing, shadows defined in `src/constants/brand.ts`
- **No Hardcoded Values:** No hex colors or pixel values in component code
- **Token Usage:** Always use Tailwind classes or design token constants
- **Code Review:** Reviewers check for hardcoded values

### 6.2 Component Variant System
- **Class Variance Authority (CVA):** Use for components with multiple variants
- **Consistent API:** All variant components use same pattern
- **Type Safety:** Variants are type-safe with TypeScript
- **Documentation:** Variants documented in component JSDoc

### 6.3 Utility Class Consistency
- **Tailwind Merge:** Use `tailwind-merge` to handle class conflicts
- **clsx:** Use `clsx` for conditional class application
- **cn() Utility:** Create a `cn()` helper combining both:
  ```typescript
  // src/lib/utils.ts
  import { clsx, type ClassValue } from 'clsx'
  import { twMerge } from 'tailwind-merge'

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  ```

### 6.4 Responsive Design Standards
- **Mobile-First:** Always start with mobile styles, add responsive prefixes for larger screens
- **Consistent Breakpoints:** Use Tailwind's responsive prefixes consistently
- **Testing:** Test all components at all breakpoints
- **Documentation:** Document responsive behavior in component comments

### 6.5 Animation Standards
- **Framer Motion:** Use for complex animations
- **Tailwind Transitions:** Use for simple hover/focus states
- **Consistent Timing:** Use standard durations (300ms, 400ms, 500ms)
- **Easing Functions:** Use standard easing (ease, ease-in-out, cubic-bezier)
- **Reduced Motion:** Always respect `prefers-reduced-motion`

---

## 7. Dark Mode Strategy (Future)

### 7.1 Current Status
Dark mode is not required for initial migration but should be planned for future implementation.

### 7.2 Preparation
- **Tailwind Dark Mode:** Configure `darkMode: 'class'` in tailwind.config.ts
- **Color Tokens:** Design dark mode variants for all brand colors
- **Component Variants:** Add dark mode variants to component systems
- **User Preference:** Respect system preference with `prefers-color-scheme`

### 7.3 Implementation (Future)
```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',
  // ... rest of config
}

// Usage
<div className="bg-white dark:bg-dark">
  {/* Content */}
</div>
```

---

## 8. Print Styles

### 8.1 Print Optimization
```css
/* src/styles/globals.css */
@media print {
  @page {
    margin: 2cm;
    size: A4;
  }

  body {
    @apply text-black bg-white;
  }

  .no-print {
    display: none !important;
  }

  a {
    @apply text-black no-underline;
  }

  a[href]::after {
    content: ' (' attr(href) ')';
  }
}
```

### 8.2 Print-Specific Components
- **PrintButton:** Component to trigger browser print dialog
- **PrintLayout:** Alternative layout for print media
- **Invoice/Receipt:** Print-optimized invoice component (future)

---

## 9. Accessibility and Styling

### 9.1 Focus Styles
```css
/* src/styles/globals.css */
@layer base {
  *:focus-visible {
    @apply outline-none ring-2 ring-gold ring-offset-2;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    @apply outline-none ring-2 ring-gold ring-offset-2;
  }
}
```

### 9.2 High Contrast Support
```css
@media (prefers-contrast: high) {
  .btn {
    @apply border-2 border-dark;
  }

  .card {
    @apply border-2 border-dark;
  }
}
```

### 9.3 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 10. Performance Considerations

### 10.1 CSS Bundle Size
- **Tailwind Purging:** Automatic removal of unused classes in production
- **Critical CSS:** Inline critical CSS for above-the-fold content (Next.js handles this)
- **CSS Modules:** Use for component-specific styles to enable code splitting
- **Avoid @import:** Use Tailwind's `@apply` or component imports instead

### 10.2 Runtime Performance
- **No Runtime CSS-in-JS:** Avoid libraries like styled-components that add runtime overhead
- **Static CSS:** Generate static CSS at build time
- **Minimal JavaScript:** Keep JavaScript for styling to a minimum
- **GPU Acceleration:** Use `transform` and `opacity` for animations

### 10.3 Development Performance
- **Fast Refresh:** Tailwind works seamlessly with React Fast Refresh
- **IntelliSense:** Use Tailwind CSS IntelliSense plugin for VSCode
- **Class Sorting:** Use Prettier plugin for consistent class ordering

---

## 11. Migration Checklist

### 11.1 Pre-Migration Setup
- [ ] Install Tailwind CSS and dependencies
- [ ] Configure `tailwind.config.ts` with brand tokens
- [ ] Set up `postcss.config.js`
- [ ] Create `src/styles/globals.css` with base styles
- [ ] Install utility packages: `clsx`, `tailwind-merge`, `class-variance-authority`
- [ ] Configure VSCode settings for Tailwind IntelliSense

### 11.2 Component Migration
- [ ] Migrate Button component with variants
- [ ] Migrate Input/Form components
- [ ] Migrate Card components
- [ ] Migrate Badge component
- [ ] Migrate PriceDisplay component
- [ ] Migrate QuantityControls component
- [ ] Migrate Header component
- [ ] Migrate Footer component
- [ ] Migrate Navigation components
- [ ] Migrate ProductCard component
- [ ] Migrate CartItem component
- [ ] Migrate CheckoutForm component
- [ ] Migrate BookingForm component
- [ ] Migrate Modal components
- [ ] Migrate Hero section
- [ ] Migrate remaining sections

### 11.3 CSS Cleanup
- [ ] Remove all inline styles from migrated components
- [ ] Remove `!important` declarations (replaced by Tailwind specificity)
- [ ] Delete `css/styles.css` once all components migrated
- [ ] Remove `css/` directory if empty
- [ ] Verify no unused CSS remains

### 11.4 Testing
- [ ] Visual regression testing for all migrated components
- [ ] Responsive testing at all breakpoints
- [ ] Accessibility testing with screen readers
- [ ] Performance testing with Lighthouse
- [ ] Cross-browser testing

---

## 12. Conclusion

This styling system strategy provides a comprehensive approach to styling the Hair Elevation Studio frontend using Tailwind CSS. By following this strategy, the development team will achieve:

- **Consistency:** Uniform styling across all components
- **Maintainability:** Easy to update and extend styles
- **Performance:** Minimal CSS bundle size with automatic purging
- **Developer Experience:** Excellent tooling and autocompletion
- **Scalability:** Easy to add new components and styles
- **Accessibility:** Built-in support for accessibility features

The strategy balances structure with flexibility, providing enough guidance to prevent inconsistency while allowing for creative solutions to specific styling challenges. The migration from the existing monolithic CSS file is incremental and low-risk, with each component migration tested and verified before proceeding.

---
*This styling system strategy is locked and must be followed during Phase 1 frontend migration.*