# Hair Elevation Studio — Frontend Migration Architecture Lock

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — Architecture Decisions Locked  

---

## Table of Contents
1. [Overview](#overview)
2. [Locked Architecture Decisions](#locked-architecture-decisions)
3. [Migration Conventions](#migration-conventions)
4. [Technical Strategy](#technical-strategy)
5. [Cross-Reference to Deliverables](#cross-reference-to-deliverables)
6. [Success Criteria](#success-criteria)

---

## Overview

This document establishes and locks the complete frontend engineering architecture, coding standards, migration conventions, and technical strategy for the Hair Elevation Studio migration from vanilla HTML/CSS/JS to Next.js + TypeScript. All decisions in this phase are final and must be adhered to during Phase 1 frontend migration and beyond.

**Critical Rule:** No frontend rebuilding, refactoring, or feature enhancements may begin until this architecture is fully locked and documented.

---

## Locked Architecture Decisions

### 1. Framework Architecture
- **Router:** Next.js **App Router** (selected over Pages Router)
  - *Justification:* App Router provides superior data fetching, layout nesting, and server/client component model aligned with modern React practices
- **Server/Client Strategy:** 
  - Server Components by default for data fetching and static content
  - Client Components only for interactivity, state, and effects
  - Explicit `"use client"` boundary where needed
- **Layout Architecture:** 
  - Root layout in `src/app/layout.tsx` for global providers and metadata
  - Route-specific layouts where needed (e.g., admin layout)
- **Route Organization:** 
  - `src/app/` for all routes
  - `src/app/(marketing)/` for public pages (home, about, services, etc.)
  - `src/app/(dashboard)/` for protected routes (admin)
  - `src/app/products/[id]/` for dynamic product routes
  - `src/app/collections/[slug]/` for collection routes

### 2. TypeScript Standards
- **Strict Mode:** `strict: true` in `tsconfig.json` with all strict flags enabled
- **Typing Conventions:**
  - Interfaces for object shapes (`interface Product { ... }`)
  - Types for unions/aliases (`type CollectionName = '...' | '...'`)
  - Avoid `any`; use `unknown` with type guards when necessary
  - Generic types for reusable components and hooks
- **Organization:**
  - `src/types/` for global types and interfaces
  - `src/lib/types/` for domain-specific types
  - Component-specific types alongside components when not reusable
- **Naming:** 
  - PascalCase for types and interfaces
  - camelCase for variables and functions
  - UPPER_SNAKE_CASE for constants

### 3. Styling Architecture
- **Primary System:** **Tailwind CSS** (selected over CSS Modules or plain CSS)
  - *Justification:* Utility-first approach prevents CSS duplication, enables rapid UI development, and integrates well with component-based architecture
- **Theme Structure:**
  - Custom theme in `tailwind.config.ts` extending brand colors, spacing, breakpoints
  - Semantic class names via `@layer components` for reusable patterns
- **Breakpoints:** 
  - Mobile-first approach
  - Custom breakpoints aligned with audit: `sm: 640px`, `md: 769px`, `lg: 1024px`, `xl: 1280px`
  - Note: Maintained 769px breakpoint from existing design for backward compatibility during transition
- **Responsive Standards:** 
  - Mobile-first utility classes (e.g., `text-base md:text-lg`)
  - Complex responsive objects in variants when needed
- **UI Styling Conventions:**
  - All styling via Tailwind utilities or component classes
  - No custom CSS in JavaScript templates
  - Global styles limited to `src/app/globals.css`

### 4. Component Architecture
- **Strategy:** Atomic Design principles adapted for Next.js
  - Atoms: Basic UI elements (Button, Input, Icon, Badge)
  - Molecules: Simple groups (SearchBar, ProductCard, QuantityControls)
  - Organisms: Complex UI sections (Header, Footer, ProductGrid, Cart)
  - Templates: Page layouts (ProductTemplate, CollectionTemplate)
  - Pages: Route-specific implementations
- **Hierarchy:**
  - `src/components/ui/` - Reusable, primitive UI atoms/molecules
  - `src/components/shared/` - Application-specific molecules/organisms
  - `src/sections/` - Page-level organisms/templates
  - `src/app/(marketing)/components/` - Page-specific components
- **Naming Conventions:**
  - PascalCase for component filenames and component names
  - Descriptive names indicating purpose (e.g., `ProductCard.tsx`, not `Card.tsx`)
  - Index files only for barrel exports when beneficial
- **Folder Structure:**
  ```
  src/components/
  ├── ui/           # Atoms and simple molecules
  │   ├── Button.tsx
  │   ├── Input.tsx
  │   ├── Badge.tsx
  │   └── ...
  ├── shared/       # Application-specific molecules and organisms
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   ├── ProductCard.tsx
  │   ├── CartItem.tsx
  │   └── ...
  └── sections/     # Page-level templates and complex sections
      ├── Hero.tsx
      ├── CollectionsPreview.tsx
      ├── FeaturedProducts.tsx
      └── ...
  ```

### 5. API Layer Architecture
- **Service Structure:** Centralized API service in `src/lib/api.ts`
  - Singleton instance with base URL from environment variable
  - Typed request/response functions
  - Automatic JSON parsing and error handling
- **Abstraction Strategy:**
  - Thin wrapper around `fetch()` with automatic error transformation
  - No external dependencies (axios) to minimize bundle size
  - Request interception for auth headers (when needed)
- **Fetch Policy:** 
  - `fetch()` with explicit error handling
  - Timeout and retry logic implemented at service level
  - AbortController support for request cancellation
- **Error Handling:**
  - Consistent error shapes thrown by API service
  - Error boundaries in React components for UI fallback
  - Toast notifications for user-facing errors
- **API Typing:**
  - Generated types from backend contracts where possible
  - Manual TypeScript interfaces for frontend-specific shapes
  - `src/types/api/` for API-specific types
- **Environment Management:**
  - `NEXT_PUBLIC_API_URL` in `.env.local` and Vercel environment variables
  - Fallback to `http://localhost:5000` for development
  - Strict validation of required environment variables at build time

### 6. State Management Strategy
- **Approach:** **React Context API** for global state (selected over Zustand)
  - *Justification:* Built-in, sufficient complexity for cart/user state, no additional bundle size
- **Global State Boundaries:**
  - `CartContext`: Shopping cart items, quantities, sizes
  - `UserContext`: Authentication state (admin only, for future phases)
  - `ThemeContext`: Theme preferences (light/dark, for future phases)
  - `ModalContext`: Global modal state (for future complex modals)
- **Local State:** 
  - `useState()` and `useReducer()` for component-scoped state
  - Form state managed with `useState()` or lightweight form libraries
- **State Synchronization:**
  - Cart context synchronized with `localStorage` for persistence
  - Middleware to sync context changes to storage
  - Hydration on app load from storage

### 7. Cloudinary & Media Strategy
- **Image Optimization:** **Next.js Image** component with Cloudinary integration
  - Automatic WebP/AVIF conversion and responsive sizing
  - Priority loading for hero and above-the-fold images
  - Placeholder blur-up effect (`blurDataURL`)
- **Domain Configuration:**
  - `remotePatterns` in `next.config.ts` for `res.cloudinary.com` and placeholder domains
  - Security: Only allow specific domains and paths
- **Responsive Handling:**
  - `next/image` automatic `srcset` generation
  - Custom breakpoints for art direction when needed
  - `sizes` attribute based on layout containers
- **Lazy Loading:** 
  - Native lazy loading via `loading="lazy"` on images below fold
  - Intersection Observer for custom lazy-loaded components
- **Transformation Preservation:**
  - Backend Cloudinary transformations preserved (800x600 limit, auto quality/format)
  - Frontend does not apply additional transformations that conflict with backend
  - URL passthrough logic maintained exactly as in current `getImageUrl()`

### 8. Animation Strategy
- **Library:** **Framer Motion** (selected for performance and ease of use)
  - *Justification:* Production-ready, small bundle impact, declarative API, server-safe
- **Motion Standards:**
  - `motion` components for animated elements
  - Variants defined in `src/animations/` for reusable animations
  - Reduced motion respect via `useReducedMotion` hook
- **Luxury UX Direction:**
  - Subtle, purposeful animations that enhance rather than distract
  - Hover states, entrance/exit animations, and feedback animations
  - No animation that impacts accessibility or performance negatively
- **Preservation:** 
  - All existing CSS animations and transitions ported to Framer Motion equivalents
  - Keyframe animations converted to motion variants
  - Performance testing to ensure 60fps animations

### 9. SEO Architecture
- **Metadata Management:** 
  - `generateMetadata()` in route segments for dynamic metadata
  - `metadata` object for static route metadata
  - Centralized `src/lib/seo.ts` for SEO utilities and defaults
- **Open Graph Strategy:**
  - Consistent OG images for product pages, collections, and homepage
  - Dynamic OG titles and descriptions from content
  - `og:image` using optimized product images via Next.js Image
- **Sitemap Strategy:**
  - Automatic sitemap generation via `next-sitemap` package
  - Dynamic routes included (products, collections)
  - Priority and changefreq based on content type
- **Semantic HTML Standards:**
  - Proper heading hierarchy (h1-h6) in all components
  - Semantic elements (`<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
  - ARIA labels and roles where native semantics insufficient
- **Structured Data:**
  - JSON-LD for Product, Organization, and LocalBusiness schema types
  - Implemented in relevant route segments
  - Testing via Google Rich Results Test

### 10. Performance Architecture
- **Optimization Standards:**
  - Automatic code splitting via Next.js routing
  - Dynamic imports with `next/dynamic` for non-critical components
  - Image optimization via Next.js Image (already covered)
  - Font optimization via `next/font` for Google Fonts
- **Lazy Loading Policies:**
  - Route-based lazy loading (inherent in Next.js)
  - Component-level lazy loading for heavy components (modals, complex charts)
  - Image lazy loading as specified in Cloudinary strategy
- **Bundle Optimization:**
  - Bundle analyzer in CI to monitor size
  - Tree-shaking enabled by default
  - External dependencies audited for size impact
- **Font Optimization:**
  - `next/font` for self-hosting Google Fonts (Playfair Display, Roboto)
  - Preloading of critical font weights
  - Fallback fonts defined to prevent layout shift
- **Render Optimization:**
  - `requestIdleCallback` for non-essential work
  - `useTransition` for urgent updates
  - Server Components to reduce client-side JavaScript

### 11. Accessibility Standards
- **Conventions:**
  - WCAG 2.1 AA compliance target
  - Semantic HTML as foundation
  - Keyboard navigable interactive elements
  - Focus management for modals and dynamic content
- **ARIA Usage:**
  - ARIA labels for icon buttons and unclear controls
  - ARIA live regions for dynamic announcements
  - ARIA expanded/controls for disclosure widgets
  - Role attributes only when necessary
- **Keyboard Navigation:**
  - Logical tab order in all components
  - Escape key to close modals and dropdowns
  - Arrow key navigation in menus and carousels
  - Enter/Space key activation for buttons
- **Semantic Structure:**
  - Landmark roles via HTML5 elements
  - Proper list markup for navigation and product lists
  - Heading levels outline document structure correctly

### 12. Project Structure
- **Final Frontend Folder Structure:**
  ```
  src/
  ├── app/                  # Next.js App Router
  │   ├── layout.tsx        # Root layout
  │   ├── page.tsx          # Homepage
  │   ├── globals.css       # Global styles
  │   ├── (marketing)/      # Public routes
  │   │   ├── layout.tsx    # Marketing layout
  │   │   ├── page.tsx      # Homepage (if not in root)
  │   │   ├── about/
  │   │   ├── services/
  │   │   ├── contact/
  │   │   ├── book/
  │   │   ├── products/
  │   │   │   └── [id]/
  │   │   └── collections/
  │   │       └── [slug]/
  │   └── (dashboard)/      # Protected routes (future)
  │       └── layout.tsx
  ├── components/           # Reusable components
  │   ├── ui/               # Atoms and simple molecules
  │   ├── shared/           # Application-specific molecules/organisms
  │   └── sections/         # Page-level templates
  ├── services/             # API service and business logic
  │   ├── api.ts            # Centralized API service
  │   └── ...               # Other service files
  ├── hooks/                # Custom React hooks
  │   ├── useCart.ts
  │   ├── useModal.ts
  │   └── ...
  ├── lib/                  # Utilities and helpers
  │   ├── utils.ts
  │   ├── constants.ts
  │   └── ...
  ├── types/                # TypeScript type definitions
  │   ├── api/              # API-specific types
  │   └── index.ts          # Barrel exports
  ├── styles/               # Global styles and CSS helpers
  │   └── globals.css       # Tailwind base styles
  ├── constants/            # Application constants
  │   ├── brand.ts          # Design tokens (from audit)
  │   ├── routes.ts         # Route path constants
  │   └── ...
  ├── utils/                # Utility functions
  │   ├── format.ts
  │   ├── validation.ts
  │   └── ...
  └── animations/           # Framer Motion variants
      ├── presets.ts
      └── ...
  ```
- **Naming Conventions:**
  - kebab-case for folders and files
  - PascalCase for component filenames and component names
  - camelCase for utility functions and variables
  - UPPER_SNAKE_CASE for constants
- **Import Organization:**
  - ES modules syntax (`import`/`export`)
  - Grouped imports: 1) React/Next.js, 2) Third-party, 3) Internal
  - Alphabetical within groups
  - No relative paths beyond 3 levels; use alias imports where beneficial
- **Scalability Structure:**
  - Feature-based colocation where beneficial (components, hooks, styles together)
  - Layered architecture preventing circular dependencies
  - Clear separation of concerns: UI, state, data, routing

### 13. Code Quality Standards
- **ESLint Configuration:**
  - `eslint:recommended` + `@next/eslint-plugin-next` + `@typescript-eslint/parser`
  - Custom rules for:
    - No `console.log` in production
    - Proper error handling (no empty catch blocks)
    - Explicit dependency arrays in hooks
    - No `any` type without explicit justification
    - Prefer `const` over `let`
    - JSX accessibility rules (`jsx-a11y/recommended`)
- **Prettier Formatting:**
  - Consistent code formatting on save
  - Integration with ESLint to prevent conflicts
  - Configuration in `.prettierrc`
- **Consistency Standards:**
  - Barrel exports (`index.ts`) only when improving readability
  - Default exports for components, named exports for utilities
  - File headers with description when complex
  - JSDoc for public APIs and complex functions
- **File Naming:**
  - Descriptive names indicating purpose
  - No abbreviations unless universally understood (e.g., `btn`, `img`)
  - Test files named `{filename}.test.ts` or `{filename}.spec.ts`
- **Commit & Documentation:**
  - Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.)
  - PR templates requiring description and testing notes
  - Code comments for why, not what
  - README with setup and development instructions

### 14. Deployment Architecture
- **Recommended Platform:** **Vercel** (selected for Next.js optimization)
  - *Justification:* Seamless Next.js integration, automatic optimizations, preview deployments, edge network
- **Environment Strategy:**
  - Three environments: Development, Preview, Production
  - Environment variables managed via Vercel dashboard
  - `.env.example` for required variables (committed)
  - `.env.local` for local development (gitignored)
- **Production Build Standards:**
  - `next build` and `next start` for production
  - Analytics enabled for performance monitoring
  - Error reporting via Vercel's built-in Sentry integration
  - Cache control headers configured for static assets
- **Deployment Safety:**
  - Preview deployments for every PR
  - Production deployments require main branch merge
  - Automatic branch previews for testing
  - Rollback capability via Vercel's deployment history
  - Post-deployment validation via health check endpoints

---

## Migration Conventions

### 1. Migration Approach
- **Incremental by Route:** Migrate one page/route at a time
- **Strangler Pattern:** New Next.js routes coexist with existing HTML pages during transition
- **Shared Assets:** 
  - Images served from Cloudinary (unchanged)
  - Logo and brand assets migrated to Next.js public directory
  - CSS variables extracted to Tailwind config
- **Route Mapping:**
  - `/` → `src/app/page.tsx` (or `/(marketing)/page.tsx`)
  - `/about.html` → `src/app/(marketing)/about/page.tsx`
  - `/services.html` → `src/app/(marketing)/services/page.tsx`
  - And so on for all existing pages
  - Preserve exact URL structure to maintain SEO and existing links

### 2. Coding Conventions During Migration
- **File Creation:** All new files in `src/` directory
- **No Modification:** Existing HTML/CSS/JS files remain untouched during migration
- **Component Extraction:** 
  - Identical visual and behavioral match to original
  - Component props mirror data used in original implementation
  - Event handlers replicate original functionality
- **State Migration:**
  - `localStorage` cart state migrated to Context API with storage sync
  - Form state managed in component state until backend integration
- **Styling Migration:**
  - Tailwind utility classes replicate original CSS exactly
  - Complex animations ported to Framer Motion with identical timing
  - Responsive behavior matched to original breakpoints

### 3. Technical Standards Enforcement
- **Pre-commit Hooks:** 
  - lint-staged to run ESLint and Prettier on staged files
  - Type checking via `typescript --noEmit` in pre-commit
- **CI/CD Pipeline:**
  - Type checking, linting, and building on every PR
  - Preview deployment on every PR for visual testing
  - Production deployment only on main branch after approval
- **Documentation:**
  - JSDoc/Typedoc for all public APIs
  - Architecture decision records (ADRs) for significant choices
  - Component library documentation with Storybook (future phase)

---

## Technical Strategy

### 1. Risk Mitigation
- **Zero Downtime:** Existing site remains fully operational during migration
- **Feature Parity:** Each migrated route must match original functionality exactly
- **Performance Benchmarks:** 
  - LCP, FID, CLS must meet or exceed original optimized values
  - Bundle size monitored to prevent regression
- **Browser Support:** 
  - Target: Last 2 versions of Chrome, Firefox, Safari, Edge
  - Polyfills only for critical features (fetch, Promise, etc.)
  - Graceful degradation for non-essential features

### 2. Validation Checkpoints
- **Visual Regression:** 
  - Percy or Storybook shots for component-level comparison
  - Manual QA for page-level layout and interaction
- **Functional Testing:**
  - Cypress for critical user flows (product browsing, cart, checkout)
  - Unit tests for utilities and hooks
  - Integration tests for API service and state management
- **Performance Audits:**
  - Lighthouse CI in PRs to prevent performance regression
  - Web Vitals monitoring in production
  - Bundle size alerts in CI

### 3. Rollback Strategy
- **Git-based:** Revert PR to undo migration changes
- **Environment-based:** Vercel instant rollback to previous deployment
- **Database:** No backend changes, so no data migration concerns
- **Asset Safety:** Cloudinary and public assets preserved; migration only adds new files

### 4. Success Metrics
- **Completion:** All public routes migrated and verified
- **Performance:** Core Web Vitals in "Good" range per Google thresholds
- **Accessibility:** Automated axe-core scans pass with no violations
- **SEO:** All pages indexable, meta tags present, structured data valid
- **Code Quality:** ESLint and Prettier pass with zero errors
- **Type Safety:** No TypeScript errors in `tsc --noEmit`

---

## Cross-Reference to Deliverables

This architecture document references and consolidates decisions from the following detailed deliverables:

1. **STACK-DECISIONS.md** - Detailed justification for framework, language, styling, animation, state management, and deployment choices
2. **COMPONENT-ARCHITECTURE.md** - Deep dive into component hierarchy, naming conventions, and folder structure
3. **API-LAYER-STRATEGY.md** - API service design, error handling, typing, and environment management specifics
4. **STYLING-SYSTEM-STRATEGY.md** - Tailwind configuration, theme extension, responsive breakpoints, and UI conventions
5. **TYPESCRIPT-STANDARDS.md** - Strict mode rules, typing conventions, organization, and naming standards
6. **PERFORMANCE-AND-SEO-STRATEGY.md** - Performance optimization, lazy loading, bundle management, metadata, and structured data
7. **DEPLOYMENT-AND-ENVIRONMENT-PLAN.md** - Vercel setup, environment strategy, deployment safety, and monitoring

Each deliverable provides the granular details that support the high-level decisions locked in this document.

---

## Success Criteria

✅ All frontend architectural decisions are finalized before migration begins  
✅ The project has a fully documented engineering blueprint  
✅ A scalable and maintainable frontend architecture is defined  
✅ No backend systems are altered  
✅ Cloudinary integrations remain protected  
✅ The migration path is clearly structured and safe  
✅ Frontend standards are consistent and future-proof  
✅ The project is fully prepared for Phase 1 frontend migration  

---

*This document is considered locked and immutable. Any changes to these architectural decisions require a new RFC process and explicit approval from stakeholders.*