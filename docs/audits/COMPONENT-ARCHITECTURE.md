# Hair Elevation Studio — Component Architecture

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — Component Architecture Defined  

---

## Overview

This document defines the component architecture for the Hair Elevation Studio frontend migration to Next.js + TypeScript. It establishes the component hierarchy, naming conventions, folder structure, and development patterns to ensure a scalable, maintainable, and consistent codebase.

---

## 1. Component Hierarchy

Following Atomic Design principles adapted for Next.js application structure:

```
Atoms (src/components/ui/)
  ├── Button.tsx
  ├── Input.tsx
  ├── Textarea.tsx
  ├── Select.tsx
  ├── Checkbox.tsx
  ├── Radio.tsx
  ├── Badge.tsx
  ├── Icon.tsx
  ├── Avatar.tsx
  ├── LoadingSpinner.tsx
  └── ...

Molecules (src/components/shared/ & src/components/ui/)
  ├── SearchBar.tsx
  ├── ProductCard.tsx
  ├── QuantityControls.tsx
  ├── PriceDisplay.tsx
  ├── FormField.tsx
  ├── LinkButton.tsx
  ├── SocialLinks.tsx
  ├── CartItem.tsx
  ├── SizeSelector.tsx
  └── ...

Organisms (src/components/shared/ & src/sections/)
  ├── Header.tsx
  ├── Footer.tsx
  ├── Navigation.tsx
  ├── MobileNav.tsx
  ├── MobileHorizontalNav.tsx
  ├── WhatsAppFloat.tsx
  ├── ProductGrid.tsx
  ├── CollectionGrid.tsx
  ├── ServiceGrid.tsx
  ├── FeaturedProducts.tsx
  ├── CollectionsPreview.tsx
  ├── ServicesPreview.tsx
  ├── WhatsAppChannelBanner.tsx
  ├── Hero.tsx
  ├── CheckoutForm.tsx
  ├── OrderSummary.tsx
  ├── PaymentModals.tsx
  ├── BookingForm.tsx
  └── ...

Templates (src/sections/ & src/app/(marketing)/[route]/)
  ├── ProductTemplate.tsx
  ├── CollectionTemplate.tsx
  ├── CartTemplate.tsx
  ├── CheckoutTemplate.tsx
  ├── BookingTemplate.tsx
  └── ...

Pages (src/app/(marketing)/[route]/page.tsx)
  ├── page.tsx (Homepage)
  ├── about/page.tsx
  ├── services/page.tsx
  ├── contact/page.tsx
  ├── book/page.tsx
  ├── products/page.tsx
  ├── products/[id]/page.tsx
  ├── collections/page.tsx
  ├── collections/[slug]/page.tsx
  └── ...
```

### Key Distinctions:
- **Atoms:** Primitive, reusable UI elements that can't be broken down further
- **Molecules:** Simple groups of atoms working together as a unit
- **Organisms:** Complex UI sections composed of molecules and/or atoms
- **Templates:** Page-level layouts that dictate content structure
- **Pages:** Specific implementations of templates with real content

---

## 2. Folder Structure

### Final Frontend Folder Structure:
```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with global providers
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles (Tailwind base)
│   ├── (marketing)/      # Public routes (URLs unaffected)
│   │   ├── layout.tsx    # Marketing layout (header, footer, etc.)
│   │   ├── page.tsx      # Homepage (if not in root)
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── book/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx          # All products page
│   │   │   └── [id]/             # Dynamic product route
│   │   │       └── page.tsx
│   │   └── collections/
│   │       ├── page.tsx          # All collections overview
│   │       └── [slug]/           # Dynamic collection route
│   │           └── page.tsx
│   └── (dashboard)/      # Protected routes (admin - future phase)
│       └── layout.tsx
├── components/           # Reusable components
│   ├── ui/               # Atoms and simple molecules
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   ├── Badge.tsx
│   │   ├── Icon.tsx
│   │   ├── Avatar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ...
│   ├── shared/           # Application-specific molecules and organisms
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileNav.tsx
│   │   ├── MobileHorizontalNav.tsx
│   │   ├── WhatsAppFloat.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CollectionCard.tsx
│   │   ├── CollectionGrid.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── QuantityControls.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── FormField.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── LinkButton.tsx
│   │   ├── AvatarWithFallback.tsx
│   │   ├── CartItem.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── PaymentModals.tsx
│   │   ├── BookingForm.tsx
│   │   └── ...
│   └── sections/         # Page-level templates and complex sections
│       ├── Hero.tsx
│       ├── CollectionsPreview.tsx
│       ├── FeaturedProducts.tsx
│       ├── ServicesPreview.tsx
│       ├── WhatsAppChannelBanner.tsx
│       ├── ProductTemplate.tsx
│       ├── CollectionTemplate.tsx
│       ├── CartTemplate.tsx
│       ├── CheckoutTemplate.tsx
│       └── BookingTemplate.tsx
├── services/             # API service and business logic
│   ├── api.ts            # Centralized API service
│   ├── productService.ts # Product-specific business logic
│   ├── cartService.ts    # Cart-specific business logic
│   └── ...
├── hooks/                # Custom React hooks
│   ├── useCart.ts
│   ├── useProduct.ts
│   ├── useCollection.ts
│   ├── useModal.ts
│   ├── useMediaQuery.ts
│   ├── useReducedMotion.ts
│   ├── useForm.ts
│   └── ...
├── lib/                  # Utilities and helpers
│   ├── utils.ts          # General utility functions
│   ├── constants.ts      # Application-wide constants
│   ├── format.ts         # Formatting utilities (currency, dates)
│   ├── validation.ts     # Validation utilities
│   ├── seo.ts            # SEO utilities
│   └── ...
├── types/                # TypeScript type definitions
│   ├── api/              # API-specific types
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   └── index.ts
│   ├── ui/               # UI-specific types (props, etc.)
│   │   ├── button.ts
│   │   ├── input.ts
│   │   └── index.ts
│   ├── index.ts          # Barrel exports for all types
│   └── ...
├── styles/               # Global styles and CSS helpers
│   └── globals.css       # Tailwind base styles (imported in layout.tsx)
├── constants/            # Application constants
│   ├── brand.ts          # Design tokens (from audit)
│   ├── routes.ts         # Route path constants
│   ├── api.ts            # API endpoint constants
│   ├── navItems.ts       # Navigation items configuration
│   ├── footerContent.ts  # Footer content configuration
│   └── ...
├── utils/                # Utility functions
│   ├── format.ts         # Moved to lib/format.ts for consistency
│   ├── validation.ts     # Moved to lib/validation.ts for consistency
│   └── ...               # (Kept for backward compatibility during migration)
└── animations/           # Framer Motion variants
    ├── presets.ts        # Reusable animation variants
    ├── button.ts         # Button-specific animations
    ├── card.ts           # Card-specific animations
    ├── modal.ts          # Modal-specific animations
    └── ...
```

---

## 3. Naming Conventions

### 3.1 File Naming
- **Components:** PascalCase with `.tsx` extension (e.g., `ProductCard.tsx`)
- **Hooks:** camelCase with `use` prefix and `.ts` extension (e.g., `useCart.ts`)
- **Utilities:** camelCase with `.ts` extension (e.g., `formatCurrency.ts`)
- **Constants:** UPPER_SNAKE_CASE with `.ts` extension (e.g., `BREAKPOINTS.ts`)
- **Types:** PascalCase with `.ts` extension (e.g., `ProductTypes.ts`)
- **Styles:** kebab-case for CSS files (e.g., `globals.css`)
- **Tests:** Same name as file with `.test.ts` or `.spec.ts` suffix (e.g., `ProductCard.test.ts`)

### 3.2 Component Naming
- **Be Descriptive:** Names should clearly indicate purpose (e.g., `ProductCard` not `Card`)
- **Avoid Generic Names:** Unless the component is truly generic (e.g., `Button` is acceptable)
- **Context Matters:** `NavigationItem` is better than `ListItem` in a navigation context
- **Prefix for Clarity:** Use prefixes when helpful (e.g., `IconButton`, `LinkButton`)
- **Consistency:** Use the same name for the same concept across the codebase

### 3.3 Prop Naming
- **camelCase:** All prop names use camelCase (e.g., `onClick`, `isOpen`)
- **Boolean Props:** Use positive naming (e.g., `isVisible`, `isLoading`, `hasError`)
- **Event Handlers:** Prefix with `on` (e.g., `onClick`, `onChange`, `onSubmit`)
- **Callback Props:** Use `on` prefix for callbacks (e.g., `onSave`, `onDelete`)
- **Children Prop:** Explicitly type children when needed (`children?: React.ReactNode`)
- **Avoid Conflicts:** Don't override standard HTML/CSS prop names unless intentional

### 3.4 Hook Naming
- **use Prefix:** All custom hooks must start with `use` (e.g., `useCart`, `useFetch`)
- **Return Values:** Return arrays or objects with clear, descriptive names
- **State Hooks:** Use `[state, setState]` convention (e.g., `[count, setCount]`)
- **Effect Hooks:** Clear naming of what the effect does (e.g., `useDocumentTitle`)

### 3.5 Constant Naming
- **UPPER_SNAKE_CASE:** All constants use uppercase with underscores (e.g., `MAX_CART_ITEMS`)
- **Semantic Names:** Names should clearly indicate what the constant represents
- **Group Related:** Use common prefixes for related constants (e.g., `BREAKPOINT_`, `API_`)
- **Export as Named:** Export constants as named exports for clarity

### 3.6 Type Naming
- **Interfaces:** PascalCase with `I` prefix optional (e.g., `IProduct` or `Product`)
- **Types:** PascalCase (e.g., `ProductType`, `CartItem`)
- **Enums:** PascalCase (e.g., `CollectionName`, `PaymentMethod`)
- **Generic Types:** Use descriptive names for type parameters (e.g., `T`, `U`, `K`, `V` for simple cases; `Item`, `Key`, `Value` for complex)
- **Utility Types:** Clear names indicating purpose (e.g., `Nullable<T>`, `PickNotNull<T>`)

---

## 4. Development Patterns

### 4.1 Component Creation Guidelines
1. **Single Responsibility:** Each component should have one clear purpose
2. **Composability:** Build complex UIs by composing simpler components
3. **Reusability:** Design components to be reusable across different contexts
4. **Encapsulation:** Component should manage its own state and behavior
5. **Explicit Contracts:** Define clear props interface with JSDoc comments
6. **Performance:** Use `React.memo()` for components that render frequently with same props
7. **Accessibility:** Build with accessibility in mind from the start
8. **Testing:** Components should be easy to test in isolation

### 4.2 Props Patterns
- **Destructuring:** Destructure props in function signature for clarity
- **Default Values:** Provide sensible defaults for optional props
- **Type Safety:** Always type props with TypeScript interfaces
- **Spread Caution:** Avoid spreading unknown props (`{...props}`) unless necessary
- **Event Handlers:** Pass down event handlers as props rather than state lifting when possible
- **Children:** Explicitly accept and type `children` prop when component wraps content
- **ClassName:** Accept `className` prop for extension (follows `cn()` utility pattern)

### 4.3 State Management in Components
- **Local State:** Use `useState()` for component-scoped state
- **Complex State:** Use `useReducer()` for complex state logic
- **Derived State:** Calculate during render when possible, avoid duplication
- **State Lifting:** Lift state to closest common ancestor when needed
- **Immutability:** Never mutate state directly; always use setter functions
- **Object/Array State:** Use spread operator or immer-like patterns for updates

### 4.4 Side Effects and Data Fetching
- **Data Fetching:** Prefer Server Components for data fetching when possible
- **Client Data Fetching:** Use `useEffect()` with proper cleanup for client-side fetching
- **Loading States:** Always show loading state during data fetching
- **Error States:** Always handle and display errors gracefully
- **Empty States:** Show meaningful empty state when data is empty
- **Stale-While-Revalidate:** Show cached data while fetching fresh data in background
- **AbortController:** Use for canceling requests when component unmounts or props change

### 4.5 Styling Components
- **Tailwind First:** Style components primarily with Tailwind utility classes
- **Component Variants:** Use `cva()` (class variance authority) or `tw-merge()` for variant APIs
- **Conditional Classes:** Use `clsx()` or `tw-merge()` for conditional class application
- **Responsive Design:** Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- **Dark Mode:** Implement using Tailwind's dark mode class (when needed)
- **CSS Escape:** Use `@apply` sparingly in CSS for complex reusable patterns
- **CSS Modules:** Avoid; use Tailwind for styling instead
- **Inline Styles:** Avoid; use Tailwind or CSS classes instead

### 4.6 Performance Considerations
- **Memoization:** Use `React.memo()` for components that render frequently
- **Callback Memoization:** Use `useCallback()` for functions passed as props
- **Memoized Values:** Use `useMemo()` for expensive calculations
- **Virtual Scrolling:** Implement for long lists (product grids, etc.)
- **Image Optimization:** Always use Next.js Image component
- **Lazy Loading:** Use `next/dynamic` for non-critical components
- **Code Splitting:** Leverage Next.js route-based code splitting
- **Bundle Budget:** Monitor component impact on bundle size

### 4.7 Accessibility (a11y)
- **Semantic HTML:** Use appropriate HTML elements (button, nav, header, etc.)
- **Keyboard Navigable:** All interactive elements must be keyboard accessible
- **Focus Management:** Manage focus for modals, dropdowns, and dynamic content
- **ARIA Attributes:** Use ARIA labels, roles, and states when native HTML insufficient
- **Label Association:** Properly associate labels with form controls
- **Color Contrast:** Ensure text meets WCAG contrast ratios
- **Visible Focus:** Ensure visible focus indicators for keyboard users
- **Skip Links:** Provide skip to content link for keyboard users
- **Language:** Set appropriate `lang` attribute on HTML element
- **Responsive:** Ensure usability at all screen sizes

### 4.8 Error Handling
- **Error Boundaries:** Implement error boundaries for graceful error recovery
- **User-Friendly Messages:** Show helpful error messages to users
- **Logging:** Log errors to service for debugging (in development)
- **Fallback UI:** Show fallback UI when components fail to load
- **Retry Mechanisms:** Provide retry options for recoverable errors
- **Network Errors:** Handle offline and network error states gracefully

### 4.9 Testing Guidelines
- **Unit Tests:** Test components in isolation with various prop combinations
- **Snapshot Tests:** Use for component output when appropriate (with caution)
- **Interaction Tests:** Test user interactions and state changes
- **Mocking:** Mock API calls, hooks, and external dependencies
- **Accessibility Tests:** Use axe-core or similar for accessibility testing
- **Visual Regression:** Consider Storybook + Chromatic for visual testing
- **Test Coverage:** Aim for high coverage on complex logic and utilities

---

## 5. Specific Component Guidelines

### 5.1 Button Component (`src/components/ui/Button.tsx`)
- **Variants:** primary, secondary, outline, ghost, link
- **Sizes:** sm, md, lg, xl
- **States:** default, hover, focus, active, disabled, loading
- **Props:** children, variant, size, onClick, disabled, loading, type, href
- **Loading State:** Show spinner inside button when loading prop is true
- **Icon Support:** Optional icon prop for icon-only or icon-with-text buttons
- **Full Width:** block prop for full-width buttons
- **Accessibility:** Proper button semantics, handle Enter/Space keys

### 5.2 Input Component (`src/components/ui/Input.tsx`)
- **Types:** text, password, email, tel, url, number, search
- **Sizes:** sm, md, lg
- **States:** default, focus, error, disabled, readOnly
- **Props:** type, value, onChange, placeholder, label, disabled, readOnly, error
- **Label Association:** Proper htmlFor and id association
- **Error Display:** Show error message below input when error prop provided
- **Icon Support:** Optional prefix and suffix icons
- **Accessibility:** Proper labeling, describe error states with aria-invalid

### 5.3 ProductCard Component (`src/components/shared/ProductCard.tsx`)
- **Data:** Receives product object with required fields
- **Actions:** Add to cart, view details, wishlist (future)
- **States:** default, hover, loading, outOfStock, onSale
- **Layout:** Image, badges, name, price, quantity controls, add to cart button
- **Responsive:** Stacks vertically on mobile, horizontal on desktop
- **Image:** Uses Next.js Image component with proper sizing
- **Badges:** Sale badge (top-left), out of stock badge (top-right)
- **Price:** Shows original and promo price when onSale
- **Quantity:** +/- buttons with quantity display
- **Click Handling:** Whole card clickable to product detail (except buttons)
- **Accessibility:** Proper alt text, keyboard navigable controls

### 5.4 Header Component (`src/components/shared/Header.tsx`)
- **Structure:** Logo, hamburger menu, navigation, cart icon with badge
- **States:** default, scrolled, open (mobile menu)
- **Behavior:** Sticky positioning, background change on scroll
- **Mobile:** Hamburger menu triggers full-screen overlay navigation
- **Desktop:** Horizontal navigation with CTA button
- **Cart Badge:** Shows item count from cart context
- **Logo:** Links to homepage
- **Search:** Search bar in desktop navigation (future)
- **Accessibility:** Proper labels, ARIA controls for hamburger menu

### 5.5 Footer Component (`src/components/shared/Footer.tsx`)
- **Structure:** 3-column grid: Contact, Social Icons, WhatsApp Channel
- **Background:** Gradient background from design system
- **Contact:** Address, phone, email, hours
- **Social:** Instagram, TikTok, WhatsApp icons with links
- **WhatsApp:** Channel promotion with button
- **Bottom Bar:** Copyright, developer credits, policy links
- **Responsive:** Stacks columns on mobile, side-by-side on desktop
- **Accessibility:** Proper heading structure, link contrast, focus management

### 5.6 Modal System (`src/components/shared/Modal.tsx`)
- **Base:** Reusable modal backdrop and container
- **Variants:** MobileMoneyModal, BankModal, PaymentProofModal
- **Portal:** Uses ReactDOM.createPortal for proper z-index
- **Focus Trap:** Traps focus inside modal when open
- **Esc Key:** Closes modal on Escape key press
- **Backdrop Click:** Optional backdrop click to close
- **Animation:** Framer Motion for enter/exit animations
- **Size:** Responsive sizing (fullscreen on mobile, centered on desktop)
- **Accessibility:** Proper role, label, focus management, return focus on close

### 5.7 Form Components
- **FormField:** Reusable label + input/select/textarea + error message
- **Validation:** Built-in validation with yup or custom validation functions
- **Submission:** Handles loading, success, error states
- **Reset:** Resets form after successful submission
- **Accessibility:** Proper labeling, error association, screen reader announcements

---

## 6. Code Organization Patterns

### 6.1 Barrel Exports
- **Use Judiciously:** Only when it improves import readability
- **Component Barrels:** Export all components from a folder (e.g., `src/components/ui/index.ts`)
- **Hook Barrels:** Export all hooks from hooks folder
- **Utility Barrels:** Export all utilities from lib folder
- **Avoid Deep Barrels:** Don't create barrels for barrels (e.g., `src/components/ui/button/index.ts`)
- **Explicit is Better:** Prefer explicit imports when barrel would be unclear

### 6.2 File Organization Within Folders
- **Alphabetical:** Organize files alphabetically within folders when no clear hierarchy
- **By Type:** Group similar types together (e.g., all button variants together)
- **By Feature:** Group by feature when components are tightly coupled (e.g., all cart components)
- **Index Files:** Use index.ts for public exports, keep implementation details private
- **Private Components:** Prefix with `_` for components not meant for external use (rarely needed)

### 6.3 Import Organization
1. **React & Next.js:** `import React from 'react'`, `import { useState } from 'react'`, `import Link from 'next/link'`
2. **Third-Party:** Alphabetical by package name (e.g., `import clsx from 'clsx'`)
3. **Internal:** Alphabetical by path (e.g., `import { Button } from '@/components/ui/Button'`)
4. **Styles:** Import CSS at top of file if needed (rare with Tailwind)
5. **Type Imports:** Use `type` import for TypeScript-only imports when possible
6. **Blank Lines:** Separate each group with a blank line
7. **Within Groups:** Alphabetical by default

### 6.4 Comments and Documentation
- **JSDoc:** Use JSDoc for all exported functions and components
- **Component Docs:** Describe purpose, props, usage examples
- **Complex Logic:** Comment why, not what
- **TODO Comments:** Use `// TODO:` for future work, include ticket/reference if possible
- **FIXME Comments:** Use `// FIXME:` for known issues that need fixing
- **HACK Comments:** Use `// HACK:` for temporary solutions
- **NOTE Comments:** Use `// NOTE:` for important information
- **File Headers:** Optional file description at top for complex files

---

## 7. Migration-Specific Guidelines

### 7.1 Component Migration Approach
1. **Visual Match:** Component must match original HTML/CSS/JS exactly in appearance
2. **Behavioral Match:** All interactions, animations, and functionality must be preserved
3. **Performance Match:** Component should not introduce performance regressions
4. **Accessibility Match:** Component must be at least as accessible as original
5. **Incremental:** Migrate one component at a time, test thoroughly
6. **Storybook:** Consider using Storybook for component development and testing
7. **Regression Testing:** Use visual regression testing to ensure pixel-perfect match

### 7.2 Handling Existing Patterns
- **Inline Styles:** Convert to Tailwind classes or CSS classes
- **Inline Event Handlers:** Convert to proper React event handlers (onClick, etc.)
- **Duplicated Markup:** Extract to reusable components
- **Global CSS:** Migrate to Tailwind config or component styles
- **JavaScript Templates:** Convert to JSX with proper component structure
- **localStorage:** Migrate to Context API with storage synchronization
- **CSS Animations:** Convert to Framer Motion variants
- **Media Queries:** Convert to Tailwind responsive prefixes or useMediaQuery hook

### 7.3 Third-Party Library Integration
- **Evaluation:** Assess bundle size, maintenance, and necessity before adding
- **Lazy Loading:** Use `next/dynamic` for non-critical libraries
- **SSG Compatibility:** Ensure libraries work with Server Components or use `useEffect()`
- **Type Definitions:** Prefer libraries with built-in TypeScript definitions
- **Peer Dependencies:** Check for and install required peer dependencies
- **Version Pinning:** Use exact versions in package.json for reproducibility
- **Security:** Regularly audit dependencies for vulnerabilities

---

## 8. Scalability and Maintainability

### 8.1 Preventing Prop Drilling
- **Context API:** Use for state that needs to be accessed by deeply nested components
- **Component Composition:** Pass JSX as children rather than passing data down deeply
- **Custom Hooks:** Extract complex logic into reusable hooks
- **State Colocation:** Keep state close to where it's used
- **Global State:** Reserve for truly global state (cart, user auth, theme)

### 8.2 Managing Complexity
- **File Size:** Aim for components under 200 lines; split if larger
- **Prop Count:** Aim for fewer than 7 props; use options object for more
- **Nesting Depth:** Avoid deeply nested component hierarchies
- **Circular Dependencies:** Use dependency-cruiser or similar to prevent circular imports
- **Dead Code:** Regularly remove unused components, hooks, utilities
- **Duplicate Code:** Extract duplicated logic to utilities or hooks

### 8.3 Future-Proofing
- **Extensibility:** Design components to be easily extended with new variants
- **Backwards Compatibility:** Avoid breaking changes in public components
- **Deprecation:** Use JSDoc `@deprecated` for components to be removed
- **Versioning:** Consider semantic versioning for internal packages (if monorepo)
- **Documentation:** Keep component documentation up to date
- **Design Tokens:** Use constants/brand.ts for values that may change (colors, spacing)

---

## 9. Conclusion

This component architecture provides a solid foundation for building a scalable, maintainable, and consistent frontend for Hair Elevation Studio. By following these guidelines, the development team can:

- Build reusable components that reduce duplication
- Maintain consistency across the entire application
- Scale the codebase as the product grows
- Onboard new developers quickly with clear conventions
- Ensure high quality through testability and accessibility
- Migrate incrementally from the existing site with confidence

The architecture balances structure with flexibility, providing enough guidance to prevent chaos while allowing for innovation and adaptation to specific component needs.

---
*This component architecture is locked and must be followed during Phase 1 frontend migration.*