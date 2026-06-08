# Hair Elevation Studio — Migration Risk Assessment
**Phase:** PHASE_0 — Frontend Audit & Migration Planning
**Date:** 2026-05-22

---

## 1. Risk Summary

| Risk Level | Count | Description |
|---|---|---|
| 🔴 HIGH | 2 | Hardcoded API URL, 15 MB hero image |
| 🟡 MEDIUM | 8 | Cart localStorage, inline handlers, monolithic CSS, etc. |
| 🟢 LOW | 6 | Duplicate files, debug pages, stale data |
| ✅ NONE | 3 | Backend untouched, Cloudinary safe, auth safe |

---

## 2. High-Risk Items

### 2.1 Hardcoded API Base URL
**Risk Level:** 🔴 HIGH
**Location:** `js/api.js` line 2

```javascript
const API_BASE_URL = 'https://hairelevationstudios-production.up.railway.app';
```

**Impact:** Cannot switch between development/staging/production environments. Will break if Railway URL changes.

**Mitigation:**
- Use Next.js `NEXT_PUBLIC_API_URL` environment variable
- Provide fallback for local development
- Document the required env variable

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
```

---

### 2.2 15 MB Hero Image
**Risk Level:** 🔴 HIGH
**Location:** `threeladies.PNG` (root), `index.html` line 510

```css
.hero {
  background: url('../threeladies.PNG') center top / contain repeat-y;
}
```

**Impact:** 15 MB image causes:
- First Contentful Paint: ~2.5-4 seconds
- Largest Contentful Paint: ~3-5 seconds
- High bandwidth usage for mobile users
- Potential browser crash on low-memory devices

**Mitigation:**
- **Must optimize before migration**
- Convert to WebP/AVIF format
- Compress to < 500 KB
- Consider splitting into multiple smaller images
- Add `fetchpriority="high"` in Next.js `<Image>`

---

## 3. Medium-Risk Items

### 3.1 Cart localStorage Migration
**Risk Level:** 🟡 MEDIUM
**Location:** `js/main.js` lines 16-23, 93-111

```javascript
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
```

**Impact:** Cart data stored in `localStorage` with a specific schema. Migration to React Context must preserve:
- Cart item shape (`{ product, quantity, selectedSize }`)
- `localStorage` key name (`'cart'`)
- All cart operations (add, remove, update quantity, change size)

**Mitigation:**
- Create `CartContext` with identical data shape
- Sync Context ↔ localStorage on every change
- Document the localStorage schema
- Test cart persistence across page reloads

---

### 3.2 Inline `onclick` Handlers
**Risk Level:** 🟡 MEDIUM
**Location:** `index.html` lines 99, 109, 119, 129

```html
<div class="collection-card" onclick="window.location.href='bridal-crowns.html'">
```

**Impact:** Not React-compatible. Must be converted to:
- Next.js `<Link href="/collections/bridal-crowns">` for navigation
- `onClick` handler for programmatic navigation

**Mitigation:**
- Convert all `onclick` to `<Link>` components
- Ensure `e.stopPropagation()` behavior is preserved where needed

---

### 3.3 Monolithic CSS
**Risk Level:** 🟡 MEDIUM
**Location:** `css/styles.css` (~1400 lines)

**Impact:** Single file with no component scoping. Difficult to:
- Find specific styles
- Avoid style conflicts
- Implement CSS Modules or Tailwind

**Mitigation:**
- Use CSS Modules for component-scoped styles
- Extract design tokens to `constants/brand.ts`
- Consider Tailwind CSS for utility classes
- Keep global styles in `globals.css`

---

### 3.4 Inline Styles in JavaScript Templates
**Risk Level:** 🟡 MEDIUM
**Location:** `js/main.js` lines 146-148, 221-225

```javascript
const priceHTML = product.onSale && product.promoPrice ? `
    <div class="price-container">
        <span class="original-price" style="text-decoration: line-through; color: #999;">₵${product.price}</span>
        <span class="promo-price" style="color: #d32f2f; font-weight: bold;">₵${product.promoPrice}</span>
    </div>
` : ...
```

**Impact:** Inline styles bypass CSS architecture. In React, these should be className-based.

**Mitigation:**
- Create CSS classes for sale/promo price styles
- Use conditional className rendering in React

---

### 3.5 `!important` Overuse in CSS
**Risk Level:** 🟡 MEDIUM
**Location:** `css/styles.css` lines 454-477, 1341, 1398

```css
.price-container {
    display: flex !important;
    flex-direction: row !important;
    /* ... */
}
.cart-item-details h3 {
    color: #000000 !important;
}
```

**Impact:** Specificity wars make CSS harder to maintain. CSS Modules eliminate this naturally.

**Mitigation:**
- CSS Modules provide natural scoping — no `!important` needed
- Refactor to use proper specificity during component migration

---

### 3.6 Collection Filtering (Client-Side)
**Risk Level:** 🟡 MEDIUM
**Location:** `js/api.js` lines 51-56

```javascript
getProductsByCollection(collectionName) {
    return this.getAllProducts().then(products =>
        products.filter(product => product.collections && product.collections.includes(collectionName))
    );
}
```

**Impact:** Fetches ALL products on every collection page. Inefficient for large product catalogs.

**Mitigation:**
- Add backend endpoint: `GET /products?collection=xxx`
- Or use Next.js Server Components to filter server-side
- For now, acceptable for small catalog (< 50 products)

---

### 3.7 Checkout/Billing Simulation
**Risk Level:** 🟡 MEDIUM
**Location:** `js/main.js` lines 223-269

```javascript
// Simulate order placement
localStorage.removeItem('cart');
checkoutMessage.textContent = 'Order placed successfully! ...';
```

**Impact:** No actual order is created. Users think they've placed an order but nothing is recorded. This is a business logic gap, not a migration risk.

**Mitigation:**
- Document that checkout is a simulation
- Consider connecting to backend order endpoint in future phase
- Add disclaimer or "demo mode" indicator

---

### 3.8 Booking Form (No Backend)
**Risk Level:** 🟡 MEDIUM
**Location:** `js/main.js` lines 272-327, `book.html`

**Impact:** Booking form only shows a success message. No appointment is created in any system.

**Mitigation:**
- Document that booking is a simulation
- Consider connecting to backend in future phase
- Add WhatsApp link as alternative booking method (already present in nav)

---

## 4. Low-Risk Items

### 4.1 Duplicate Logo File
**Risk Level:** 🟢 LOW
**Location:** `test-logo.png` (338 KB, identical to `HESLOGO.PNG`)

**Mitigation:** Delete `test-logo.png`

### 4.2 Duplicate Backend Images
**Risk Level:** 🟢 LOW
**Location:** `backend/threeladies.PNG`, `backend/HESLOGO.PNG`

**Mitigation:** Remove from backend folder (not used by backend)

### 4.3 Debug Pages in Production
**Risk Level:** 🟢 LOW
**Location:** `debug-flow-product.html`, `debug-products.html`, `test-render-function.html`

**Mitigation:** Remove before/during migration

### 4.4 Stale `products.json`
**Risk Level:** 🟢 LOW
**Location:** `products.json` (6 placeholder products)

**Mitigation:** Keep for reference or remove. Not used in production.

### 4.5 Dead TypeScript Code
**Risk Level:** 🟢 LOW
**Location:** `ts/main.ts` (static product data, not connected to backend)

**Mitigation:** Remove or archive

### 4.6 Duplicate `<link rel="icon">` Tags
**Risk Level:** 🟢 LOW
**Location:** `cart.html` line 6-7, `checkout.html` line 6-7, `book.html` line 6-7, `about.html` line 6-7

```html
<link rel="icon" href="HESLOGO.PNG" type="image/png">
<link rel="icon" href="HESLOGO.PNG" type="image/png">  <!-- Duplicate -->
```

**Mitigation:** Remove duplicate lines

---

## 5. Danger Zones (Code Requiring Careful Refactoring)

### 5.1 `renderProducts()` — `js/main.js` lines 128-199

**Why dangerous:**
- Uses `innerHTML` with template strings (XSS risk)
- Attaches event listeners after DOM injection (fragile)
- Complex conditional logic for sale/promo prices
- Inline styles in template strings

**Migration approach:**
- Convert to React component with JSX
- Use proper event handlers (no `e.stopPropagation()` hacks)
- Extract price logic to separate component
- Move inline styles to CSS classes

### 5.2 `renderCart()` — `js/main.js` lines 202-284

**Why dangerous:**
- Complex template string with nested conditionals
- Size selector logic is complex (merge quantities, handle duplicates)
- Multiple event listener attachments after innerHTML
- Inline styles for promo prices

**Migration approach:**
- Break into sub-components: `CartItem`, `SizeSelector`, `CartSummary`
- Use React state for cart management
- Extract size change logic to custom hook

### 5.3 Checkout Payment Modals — `checkout.html` lines 185-293

**Why dangerous:**
- Three stacked modals with complex show/hide logic
- Modal state managed by CSS classes (`.modal` display toggling)
- No focus management
- No Escape key handler
- File upload preview logic mixed with modal logic

**Migration approach:**
- Use a modal library or build proper modal component
- Implement focus trap
- Add Escape key handler
- Separate file upload logic from modal state

### 5.4 `getImageUrl()` — `js/api.js` lines 34-49

**Why dangerous:**
- Three-way URL resolution must be preserved exactly
- Any change could break existing Cloudinary images
- Legacy `/uploads/` path handling must remain

**Migration approach:**
- Copy logic exactly to `services/api.ts`
- Add TypeScript types
- Add unit tests for all three URL formats

### 5.5 Button Styles — `css/styles.css` lines 45-81

**Why dangerous:**
- Complex gradient with 3 color stops
- Shimmer animation via `::before` pseudo-element
- Cubic-bezier transition
- Multiple shadow layers

**Migration approach:**
- Extract to CSS Module or Tailwind config
- Preserve exact gradient values
- Test hover animation matches original

### 5.6 Hero Section — `css/styles.css` lines 510-606

**Why dangerous:**
- Background image with gradient overlay
- Multiple pseudo-elements (`::before`)
- `background-attachment: scroll` (performance optimization)
- Fade-in animation on load
- `will-change` and GPU acceleration hints

**Migration approach:**
- Use Next.js `<Image>` with `fill` and `object-fit: cover`
- Use absolute positioned `<div>` for gradient overlay
- Port animation to CSS Module or Tailwind

---

## 6. Production Risk Matrix

| Risk | Likelihood | Impact | Priority | Mitigation |
|---|---|---|---|---|
| Broken product images | MEDIUM | HIGH | P1 | Test all `getImageUrl()` paths |
| Cart data loss | LOW | HIGH | P1 | Preserve localStorage schema |
| Broken navigation | LOW | MEDIUM | P2 | Verify all route mappings |
| SEO ranking drop | MEDIUM | MEDIUM | P2 | Add meta tags, sitemap, redirects |
| SW serving stale content | MEDIUM | LOW | P3 | Update cache version |
| Payment modals broken | LOW | MEDIUM | P2 | Test all 3 modals |
| Booking form broken | LOW | LOW | P3 | Port validation logic |
| 15 MB hero image | HIGH | HIGH | P0 | **Must optimize before migration** |
| Hardcoded API URL | HIGH | HIGH | P0 | **Must use env vars** |
| XSS via innerHTML | MEDIUM | MEDIUM | P2 | Convert to JSX |

---

## 7. Pre-Migration Checklist

### Must Fix Before Migration (P0)
- [ ] Optimize `threeladies.PNG` from 15 MB to < 500 KB
- [ ] Replace hardcoded `API_BASE_URL` with environment variable

### Should Fix During Migration (P1)
- [ ] Port `getImageUrl()` exactly to Next.js
- [ ] Implement cart Context with localStorage sync
- [ ] Convert `renderProducts()` to React components
- [ ] Convert `renderCart()` to React components
- [ ] Port checkout modals with proper ARIA

### Nice to Fix (P2)
- [ ] Remove debug pages from production
- [ ] Delete `test-logo.png` duplicate
- [ ] Remove `ts/main.ts` dead code
- [ ] Fix duplicate `<link rel="icon">` tags
- [ ] Add Open Graph tags
- [ ] Add form label `for` attributes
- [ ] Add hamburger `aria-label` and `aria-expanded`

### Future Considerations (P3)
- [ ] Add backend collection filter endpoint
- [ ] Connect checkout to backend order system
- [ ] Connect booking form to backend
- [ ] Add search/filter functionality
- [ ] Add product reviews/ratings
- [ ] Add wishlist functionality
