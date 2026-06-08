# Hair Elevation Studio — Frontend Audit Report
**Phase:** PHASE_0 — Frontend Audit & Migration Planning
**Date:** 2026-05-22
**Status:** ✅ Complete — Read-Only Audit (No Code Changes Made)

---

## 1. Project Structure Audit

### 1.1 Current File Organization

```
HairElevationStudios/
├── index.html                    # Homepage (hero, collections preview, featured products, services preview)
├── collections.html              # All collections overview page
├── about.html                    # About page
├── services.html                 # Services + price list page
├── book.html                     # Appointment booking form
├── contact.html                  # Contact & location page
├── product.html                  # Single product detail (dynamic via query param ?id=)
├── cart.html                     # Shopping cart page
├── checkout.html                 # Checkout with payment modals (Mobile Money + Bank)
├── bridal-crowns.html            # Collection: The Bridal Crowns
├── everyday-crown.html           # Collection: The Everyday Crown
├── queens-curls.html             # Collection: The Queen's Curls
├── signature-pixies.html         # Collection: The Signature Pixies
├── admin-demo.html               # Admin dashboard demo (standalone, separate design system)
├── debug-flow-product.html       # Debug: Flow product rendering test
├── debug-products.html           # Debug: Products API debug page
├── test-render-function.html     # Debug: renderProducts function test
├── css/
│   └── styles.css                # Single monolithic stylesheet (~1400 lines)
├── js/
│   ├── api.js                    # API service class (60 lines)
│   ├── main.js                   # Main application logic (~900 lines)
│   └── performance.js            # Performance optimizations (~160 lines)
├── ts/
│   └── main.ts                   # TypeScript prototype (static data, not used in production)
├── sw.js                         # Service Worker (caching strategy)
├── products.json                 # Static product data (6 products, placeholder images)
├── HESLOGO.PNG                   # Brand logo (338 KB)
├── threeladies.PNG               # Hero background image (15 MB — very large)
├── shopinner.jpg                 # Background image for body/sections (131 KB)
├── pricelist.jpg                 # Price list image for services page (125 KB)
├── bridalcrowns.jpg              # Collection card image (163 KB)
├── everydaycrown.jpg             # Collection card image (142 KB)
├── queenscurls.jpg               # Collection card image (188 KB)
├── signaturepixies.jpg           # Collection card image (130 KB)
├── test-logo.png                 # Duplicate of HESLOGO.PNG (338 KB)
├── backend/                      # Node.js/Express backend (untouched)
│   ├── server.ts
│   ├── routes/
│   │   ├── products.ts
│   │   ├── auth.ts
│   │   └── admin.ts
│   ├── models/
│   │   ├── Product.ts
│   │   └── Admin.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── upload.ts
│   └── package.json
├── CLOUDINARY-SETUP.md
├── CLOUDINARY-TESTING-GUIDE.md
├── PERFORMANCE-OPTIMIZATION.md
├── MONGODB-SETUP-GUIDE.md
├── PRODUCTION-CONFIGURATION.md
├── PRODUCT-UPDATE-SOLUTION.md
├── IMAGE-VIDEO-FIX-SOLUTION.md
├── AWS-S3-S
├── deploy-to-railway.sh
├── .htaccess
├── .gitignore
├── tsconfig.json
└── CNAME
```

### 1.2 Identified Patterns

| Pattern | Location | Notes |
|---|---|---|
| Header + Footer duplication | All 13 HTML pages | Identical header/footer markup in every page |
| Navigation duplication | All 13 HTML pages | Same `<nav>` block repeated |
| SVG icon duplication | All 13 HTML pages | Instagram, TikTok, WhatsApp SVGs repeated |
| WhatsApp float duplication | All 13 HTML pages | Identical floating button |
| Script tag duplication | All 13 HTML pages | Same `<script>` includes |
| CSS link duplication | All 13 HTML pages | Same `<link>` tags |
| Inline `onclick` handlers | `index.html` lines 99, 109, 119, 129 | Collection cards use inline JS navigation |
| Inline styles in JS | `js/main.js` lines 146-148, 221-225 | Price HTML uses inline `style` attributes |
| Inline `<style>` blocks | `services.html` lines 12-52, `test-render-function.html`, `debug-*.html` | Page-specific styles not in main CSS |
| Hardcoded API URL | `js/api.js` line 2 | `API_BASE_URL` hardcoded, not environment-driven |
| Duplicate logo file | `HESLOGO.PNG` + `test-logo.png` | Identical 338 KB files |

### 1.3 Technical Debt Summary

| Debt Item | Severity | Impact |
|---|---|---|
| Monolithic 1400-line CSS file | HIGH | Hard to maintain, no component scoping |
| Header/footer duplicated 13× | HIGH | Any change requires 13 file edits |
| No build process / bundling | HIGH | No minification, no tree-shaking |
| `threeladies.PNG` is 15 MB | HIGH | Severe page load impact |
| `HESLOGO.PNG` is 338 KB (×2) | MEDIUM | Duplicate large asset |
| Hardcoded API base URL | MEDIUM | Cannot switch environments |
| Inline `onclick` handlers | MEDIUM | Not React-friendly, no event delegation |
| Inline styles in JS templates | MEDIUM | Breaks CSS architecture |
| `ts/main.ts` is dead code | LOW | Static data, not connected to backend |
| Debug pages in production | LOW | `debug-*.html`, `test-*.html` should be removed |
| `products.json` is stale | LOW | 6 placeholder products, not synced with backend |
| No CSS variables / design tokens | MEDIUM | Colors repeated as hex values throughout |
| `!important` overuse in CSS | MEDIUM | `color: #000000 !important` in cart styles |
| Duplicate `\n` in `<title>` tags | LOW | `\n  <link rel="icon"...` in several pages |

---

## 2. UI Component Inventory

### 2.1 Reusable UI Sections (Future React Components)

| Component | Pages Used | Description |
|---|---|---|
| **Header** | All 13 pages | Logo, hamburger menu, navigation, cart icon with badge |
| **Footer** | All 13 pages | 3-column grid: Contact, Social Icons, WhatsApp Channel |
| **Navigation (Desktop)** | All 13 pages | Full horizontal nav with CTA button |
| **Navigation (Mobile/Hamburger)** | All 13 pages | Full-screen overlay menu triggered by hamburger |
| **Navigation (Mobile Horizontal)** | All 13 pages | Scrollable horizontal bar below logo |
| **CartIcon** | All 13 pages | Cart SVG + badge count |
| **WhatsAppFloat** | All 13 pages | Fixed floating WhatsApp button with pulse animation |
| **SocialIcons** | All 13 pages | Instagram, TikTok, WhatsApp SVG icons |
| **ProductCard** | `index.html`, collection pages | Image, name, price, sale badge, quantity controls, add-to-cart |
| **ProductGrid** | `index.html`, collection pages | CSS Grid of product cards |
| **CollectionCard** | `index.html`, `collections.html` | Image + content with hover animation |
| **CollectionGrid** | `index.html`, `collections.html` | CSS Grid of collection cards |
| **ServiceCard** | `index.html`, `services.html` | Service name, description, CTA button |
| **ServiceGrid** | `index.html`, `services.html` | CSS Grid of service cards |
| **BookingForm** | `book.html` | Full appointment booking form with validation |
| **CheckoutForm** | `checkout.html` | Shipping + payment form |
| **PaymentModal** | `checkout.html` | 3 modals: Mobile Money, Bank, Payment Proof Upload |
| **CartItem** | `cart.html` | Product image, details, quantity controls, remove button |
| **CartSummary** | `cart.html` | Total + checkout button |
| **Hero** | `index.html` | Full-width hero with background image + CTA |
| **WhatsAppChannelBanner** | `contact.html` | Green gradient banner with channel link |
| **LoadingSpinner** | `js/main.js` | Inline loading indicator |
| **ErrorMessage** | `js/main.js` | Inline error display |

### 2.2 Repeated UI Patterns

- **Button (`.btn`)**: Primary CTA with gradient, hover animation, shimmer effect
- **Button variants**: `.btn` (primary), `.collection-btn`, `.whatsapp-channel-btn`, `.whatsapp-channel-btn-footer`
- **Badge**: `.sale-badge` (red, top-left), `.out-of-stock-badge` (red, top-right)
- **Price display**: `.price-container` with `.original-price` + `.promo-price`
- **Quantity controls**: `.quantity-btn` (+/-) + `.quantity` span
- **Form group**: `.form-group` with `<label>` + input/select/textarea
- **Card pattern**: White background, border-radius, box-shadow, hover lift
- **Section divider**: `::before` pseudo-element with gold gradient line

### 2.3 Layout Structures

| Layout | CSS Class | Grid/Flex | Breakpoints |
|---|---|---|---|
| Page container | `.container` | Block + auto margins | max-width: 1200px |
| Header layout | `.header .container` | Flex column → row | 769px |
| Collections grid | `.collections-grid` | Grid auto-fit minmax(300px) | Responsive |
| Product grid | `.product-grid` | Grid auto-fit minmax(280px) | Responsive |
| Services grid | `.services-grid` | Grid auto-fit minmax(280px) | Responsive |
| Footer grid | `.footer-content` | Grid auto-fit minmax(250px) | Responsive |
| Contact grid | `.contact-content` | Grid 1fr 1fr | Collapses on mobile |
| Cart item | `.cart-item` | Flex row | Stacks on mobile |
| Checkout layout | `.checkout-content` | Grid (implied) | Two-column |

---

## 3. Design System Audit

### 3.1 Brand Colors (Extracted)

| Role | Hex Value | Usage |
|---|---|---|
| **Primary Cream** | `#F5EFE6` | Body text, nav text, icon fills, hero text |
| **Primary Dark** | `#3B2A23` | Header background, footer background, headings on white |
| **Gold / Primary Accent** | `#C8A97E` | Button gradient start, nav underline, borders, accents |
| **Gold Mid** | `#B8956A` | Button gradient mid, hover states |
| **Gold Dark** | `#A67C52` | Button gradient end |
| **Light Cream** | `#E8D5C4` | Body gradient mid, form borders |
| **Pale Cream** | `#F0E6D8` | Body gradient end |
| **Off-White** | `#FAF8F5` | Form input background |
| **White** | `#FFFFFF` | Card backgrounds, cart items |
| **Sale Red** | `#D32F2F` | Promo price, sale badge |
| **Error Red** | `#DC3545` | Out of stock badge, error messages |
| **Success Green** | `#28A745` | Success messages |
| **WhatsApp Green** | `#25D366` | WhatsApp float, channel buttons |
| **WhatsApp Green Dark** | `#20B954` | WhatsApp gradient mid |
| **WhatsApp Green Deep** | `#128C7E` | WhatsApp gradient end |
| **Gray Text** | `#666666` | Body text on white cards |
| **Light Gray** | `#999999` | Original/strikethrough price |
| **Black Text** | `#000000` | Cart item text, product card price |

### 3.2 Typography

| Element | Font Family | Weight | Size | Notes |
|---|---|---|---|---|
| Body text | `Roboto` | 300, 400, 500 | 1rem (16px) | Line-height: 1.6 |
| Headings (h1, h2, h3) | `Playfair Display` | 700 | h1: 2-3rem, h2: 1.8rem, h3: 1.3rem | Letter-spacing: 0.5px, text-shadow |
| Button text | `Roboto` | 600 | 0.95rem | Uppercase, letter-spacing: 0.8px |
| Nav links | `Roboto` | 500 | ~1rem | |
| Footer text | `Roboto` | 300-500 | 0.85-0.9rem | |
| Cart item text | `Roboto` | 500 | 1.1-1.2rem | |

**Font Loading Strategy:**
- Google Fonts: `Playfair Display` (400, 700) + `Roboto` (300, 400, 500)
- `preconnect` + `dns-prefetch` to `fonts.googleapis.com` and `fonts.gstatic.com`
- `display=swap` used
- No `font-display: optional` or `fallback` strategy

### 3.3 Spacing System

| Pattern | Value | Usage |
|---|---|---|
| Container padding | `0 20px` | Horizontal padding |
| Container max-width | `1200px` | Desktop |
| Section padding | `80px 0` | Vertical section spacing |
| Hero padding | `140px 0` | Hero section |
| Card gap (grid) | `30-40px` | Grid gaps |
| Card border-radius | `16-20px` | Cards, modals, forms |
| Button border-radius | `30px` (primary), `10px` (form) | Pill vs rounded |
| Form input padding | `15px` | Input fields |
| Form group margin | `25px` | Between form fields |
| Badge padding | `5px 10px` | Sale/out-of-stock badges |
| Badge border-radius | `15px` | Pill badges |

### 3.4 Shadows

| Shadow | Value | Usage |
|---|---|---|
| Card shadow | `0 8px 25px rgba(59, 42, 35, 0.1)` | Product/service cards |
| Card hover shadow | `0 12px 30px rgba(59, 42, 35, 0.15)` | Card hover state |
| Collection card shadow | `0 15px 35px rgba(59, 42, 35, 0.1)` | Collection cards |
| Button shadow | `0 6px 20px rgba(200, 169, 126, 0.4)` | Primary buttons |
| WhatsApp float shadow | `0 10px 30px rgba(37, 211, 102, 0.5)` | Floating button |
| Cart item shadow | `0 4px 8px rgba(59, 42, 35, 0.1)` | Cart items |

### 3.5 Transitions & Animations

| Animation | Duration | Easing | Usage |
|---|---|---|---|
| Button hover | `0.4s` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Button scale + lift |
| Card hover | `0.3-0.4s` | `ease` or `cubic-bezier(...)` | Card lift + shadow |
| Nav link underline | `0.3s` | `ease` | Underline width |
| Image zoom on hover | `0.3-0.4s` | `ease` | Collection/product images |
| WhatsApp pulse | `3s` | `ease-in-out` infinite | Floating button |
| Hero fade-in | `1s` | `ease-out` | Hero content on load |
| FadeInUp | `0.8-1s` | `ease-out` | General entrance |
| Shimmer on button | `0.5s` | — | Button `::before` sweep |

### 3.6 Responsive Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | `< 769px` | Hamburger menu, horizontal nav, 2-col grids, stacked layouts |
| Desktop | `≥ 769px` | Full horizontal nav, CTA visible, hamburger hidden |

**Note:** Only two breakpoints. No `sm` (640px) or `lg` (1024px) breakpoints. The 769px breakpoint is unusual — standard is 768px.

---

## 4. Asset Audit

### 4.1 Image Assets

| File | Size | Type | Used On | Notes |
|---|---|---|---|---|
| `HESLOGO.PNG` | 338 KB | Logo | All pages (header) | Not optimized; could be SVG or WebP |
| `test-logo.png` | 338 KB | Logo duplicate | Not used in production | **Duplicate of HESLOGO.PNG — should be deleted** |
| `threeladies.PNG` | **15 MB** | Hero background | `index.html` hero | **CRITICAL: Must be optimized. 15 MB is unacceptable for web.** |
| `shopinner.jpg` | 131 KB | Section background | Body background, services, booking, contact | Used as CSS `background-image` on multiple sections |
| `pricelist.jpg` | 125 KB | Price list | `services.html` | Could be optimized |
| `bridalcrowns.jpg` | 163 KB | Collection card | `index.html`, `collections.html` | |
| `everydaycrown.jpg` | 142 KB | Collection card | `index.html`, `collections.html` | |
| `queenscurls.jpg` | 188 KB | Collection card | `index.html`, `collections.html` | |
| `signaturepixies.jpg` | 130 KB | Collection card | `index.html`, `collections.html` | |
| `threeladies.PNG` (backend/) | 15 MB | Duplicate | Backend folder | **Duplicate — should be removed from backend** |
| `HESLOGO.PNG` (backend/) | 338 KB | Duplicate | Backend folder | **Duplicate — should be removed from backend** |

### 4.2 SVG Icons (Inline)

All SVG icons are **inline** (not external files), duplicated across every page:

| Icon | Pages | Count |
|---|---|---|
| Shopping Cart SVG | All 13 pages | 13 |
| Instagram SVG | All 13 pages | 13 |
| TikTok SVG | All 13 pages | 13 |
| WhatsApp SVG | All 13 pages | 13 (footer) + 13 (float) = 26 |
| **Total inline SVGs** | | **65** |

### 4.3 Fonts

| Font | Weights | Source | Loading |
|---|---|---|---|
| Playfair Display | 400, 700 | Google Fonts | `preconnect` + `dns-prefetch` |
| Roboto | 300, 400, 500 | Google Fonts | `preconnect` + `dns-prefetch` |

### 4.4 Unused / Stale Assets

| Asset | Status | Recommendation |
|---|---|---|
| `test-logo.png` | Unused | Delete — duplicate of `HESLOGO.PNG` |
| `products.json` | Stale (6 placeholder products) | Keep for reference, but not used in production |
| `ts/main.ts` | Dead code | Remove or archive |
| `debug-flow-product.html` | Debug page | Remove from production |
| `debug-products.html` | Debug page | Remove from production |
| `test-render-function.html` | Debug page | Remove from production |
| `admin-demo.html` | Demo page | Separate from main site; keep isolated |
| `backend/threeladies.PNG` | Duplicate | Remove from backend folder |
| `backend/HESLOGO.PNG` | Duplicate | Remove from backend folder |

### 4.5 Optimization Opportunities

1. **`threeladies.PNG` (15 MB → target < 500 KB)**: Convert to WebP/AVIF, compress, or replace with a lighter hero treatment
2. **`HESLOGO.PNG` (338 KB → target < 50 KB)**: Convert to SVG (logo is likely vector-friendly)
3. **Collection images**: Convert to WebP (~50% size reduction)
4. **Inline SVGs**: Extract to React components (automatic tree-shaking in Next.js)
5. **Google Fonts**: Add `&display=swap` (already present), consider `font-display: optional`
6. **CSS background images**: `shopinner.jpg` used as body background — consider lighter pattern or gradient-only fallback

---

## 5. Cloudinary Integration Audit

### 5.1 Current State

**Backend Cloudinary Setup** (`backend/middleware/upload.ts`):
- ✅ Cloudinary SDK installed (`cloudinary`, `multer-storage-cloudinary`)
- ✅ Graceful fallback to local storage if credentials not configured
- ✅ Folder: `hair-elevation-studios/products`
- ✅ Auto-format and quality optimization: `quality: 'auto:good'`, `fetch_format: 'auto'`
- ✅ Image transformation: `width: 800, height: 600, crop: 'limit'`
- ✅ Supports images + videos (`resource_type: 'auto'`)
- ✅ 50MB file size limit

**Frontend Cloudinary Handling** (`js/api.js` lines 34-49):
```javascript
getImageUrl(path) {
    if (!path) return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image';
    if (path.startsWith('http')) return path;        // Cloudinary URLs pass through
    if (path.startsWith('/uploads/')) return placeholder; // Legacy paths → placeholder
    return `${API_BASE_URL}${path}`;                 // Relative paths
}
```
- ✅ Cloudinary URLs (starting with `https://res.cloudinary.com/...`) pass through correctly
- ✅ Legacy `/uploads/` paths gracefully show placeholder
- ✅ Fallback `onerror` on `<img>` tags for broken images

### 5.2 Cloudinary URL Pattern

Expected format: `https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{filename}`

The frontend `getImageUrl()` correctly handles these as they start with `http`.

### 5.3 Environment Variables (Backend)

| Variable | Purpose | Status |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier | Required |
| `CLOUDINARY_API_KEY` | API authentication key | Required |
| `CLOUDINARY_API_SECRET` | API secret for signed uploads | Required |

### 5.4 Migration Safety for Cloudinary

| Risk | Level | Mitigation |
|---|---|---|
| Existing products with local `/uploads/` paths | MEDIUM | Already handled — shows placeholder. Migration script needed to re-upload. |
| Cloudinary credentials not set in new environment | LOW | Backend has graceful fallback to local storage |
| Image URL format change | NONE | Cloudinary returns full URLs; `getImageUrl()` passes them through |
| CDN caching of old images | LOW | Cloudinary CDN handles versioning automatically |

### 5.5 Cloudinary Safety Conclusion

✅ **All existing Cloudinary integrations are safe to migrate.** The frontend `getImageUrl()` function already handles Cloudinary URLs correctly. The backend upload middleware is already Cloudinary-ready. No changes to Cloudinary integration are needed during the Next.js migration.

---

## 6. API Integration Map

### 6.1 Frontend → Backend API Calls

| Endpoint | Method | Used On | Purpose | Auth Required |
|---|---|---|---|---|
| `/products` | GET | `index.html`, collection pages, `product.html` | Fetch all products | No |
| `/products/featured` | GET | `index.html` | Fetch featured products | No |
| `/products/:id` | GET | `product.html` | Fetch single product | No |
| `/products/create` | POST | Admin panel | Create product | Yes (JWT) |
| `/products/update/:id` | PUT | Admin panel | Update product | Yes (JWT) |
| `/products/delete/:id` | DELETE | Admin panel | Delete product | Yes (JWT) |
| `/products/upload-payment-proof` | POST | `checkout.html` | Upload payment proof image | No |
| `/auth/register` | POST | Admin login | Register admin | No |
| `/auth/login` | POST | Admin login | Login admin | No |
| `/admin/dashboard` | GET | Admin panel | Admin dashboard HTML | Yes (JWT) |

### 6.2 API Service (`js/api.js`)

```javascript
API_BASE_URL = 'https://hairelevationstudios-production.up.railway.app'
```

**Methods:**
- `fetch(endpoint, options)` — Generic fetch wrapper
- `getAllProducts()` → `GET /products`
- `getFeaturedProducts()` → `GET /products/featured`
- `getProductById(id)` → `GET /products/:id`
- `getImageUrl(path)` — URL resolution (Cloudinary, relative, placeholder)
- `getProductsByCollection(name)` — Client-side filter of all products

### 6.3 Request/Response Structures

**Product Object (from backend `Product.ts` model):**
```typescript
{
  _id: string;
  name: string;
  description?: string;
  length?: string;
  lace?: string;
  density?: string;
  texture?: string;
  quality?: string;
  price: number;
  color?: string;
  size?: ['Small' | 'Medium' | 'Large'];
  onSale: boolean;
  promoPrice?: number;
  featured: boolean;
  collections: ['The Bridal Crowns' | 'The Everyday Crown' | "The Queen's Curls" | 'The Signature Pixies'];
  coverImage: string;       // Cloudinary URL or path
  additionalImages: string[];
  videos: string[];
  stock: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Frontend uses:** `_id`, `name`, `price`, `coverImage`, `onSale`, `promoPrice`, `inStock`, `collections`, `size`

### 6.4 Authentication

- **Method:** JWT (JSON Web Token)
- **Header:** `Authorization: Bearer <token>`
- **Middleware:** `backend/middleware/auth.ts` — validates JWT from `Authorization` header
- **Frontend:** No authentication logic in public pages. Admin panel handles auth separately.
- **Token expiry:** 1 hour (set in `auth.ts` line 47)

### 6.5 Error Handling

| Location | Pattern | Gaps |
|---|---|---|
| `js/api.js` | Throws `Error` on non-OK response | No retry, no timeout, no user-friendly message |
| `js/main.js` | `showError()` function exists but rarely called | No global error boundary |
| `js/main.js` | `try/catch` on `renderProductDetail()` | Only on product detail page |
| Checkout | Alert on success, no error handling | No network error feedback |

---

## 7. JavaScript Logic Audit

### 7.1 Cart Logic (`js/main.js`)

| Function | Lines | Purpose |
|---|---|---|
| `getCart()` | 16-19 | Read cart from `localStorage` |
| `saveCart(cart)` | 21-23 | Save cart to `localStorage` |
| `addToCart(id, qty, size)` | 25-41 | Add/increment item in cart |
| `removeFromCart(id, size)` | 43-48 | Remove item from cart |
| `updateCartItemQuantity(id, change, size)` | 50-68 | Increment/decrement quantity |
| `updateCartItemSize(index, newSize)` | 70-91 | Change size selection for cart item |
| `getCartTotal()` | 93-98 | Calculate cart total (handles promo prices) |
| `getCartCount()` | 100-102 | Count total items |
| `updateCartCount()` | 104-111 | Update badge count in DOM |
| `renderCart()` | 202-284 | Render cart items HTML + event listeners |
| `showLoading(container)` | 114-118 | Show loading indicator |
| `showError(container, msg)` | 120-125 | Show error message |

**Cart Data Shape:**
```javascript
{
  product: { _id, name, price, promoPrice, onSale, coverImage, size },
  quantity: number,
  selectedSize: string | null
}
```

### 7.2 Product Rendering Logic (`js/main.js`)

| Function | Lines | Purpose |
|---|---|---|
| `renderProducts(products, container, limit)` | 128-199 | Render product cards with sale badges, prices, quantity controls |
| `renderProductDetail()` | 287-340 | Render single product page from API |

**Key behaviors:**
- Sale badge shown when `product.onSale === true`
- Promo price shown when `product.onSale && product.promoPrice`
- `onerror` handler on images for fallback
- Quantity controls with +/- buttons
- Event listeners attached after innerHTML injection

### 7.3 Booking Form Logic (`js/main.js` lines 272-327)

- Client-side validation only (no API call)
- Validates: name, phone (10-digit regex), service, date, time
- Shows success/error message in `#form-message`
- **No actual booking submission to backend**

### 7.4 Checkout Logic (`js/main.js` lines 223-269)

- Reads cart from `localStorage`
- Displays order summary
- Form validation (all fields required)
- **Simulates order placement** — clears cart, shows success message, redirects after 3s
- **No actual payment processing or order submission to backend**

### 7.5 Navigation Logic (`js/main.js` lines 5-13)

- Hamburger toggle: toggles `.active` class on nav list and hamburger
- Mobile horizontal nav: always visible on mobile (no toggle)

### 7.6 Performance Logic (`js/performance.js`)

- IntersectionObserver for lazy loading `img[data-src]`
- Preloads `threeladies.PNG` for hero
- Adds `loading="lazy"` to non-hero images
- Prefetches `collections.html` and `services.html`
- Injects additional CSS via `<style>` tag
- Adds `will-change: transform` to animated elements
- Respects `prefers-reduced-motion`

### 7.7 Fragile DOM Patterns

| Pattern | Risk | Location |
|---|---|---|
| `innerHTML` with template strings | XSS risk if product names contain HTML | `renderProducts()`, `renderCart()` |
| `querySelector` after `innerHTML` | Fragile — depends on exact HTML structure | Quantity button listeners |
| `e.stopPropagation()` on buttons | Can break parent click handlers | Add-to-cart buttons on product cards |
| `onclick="window.location.href=..."` | Inline JS, not React-friendly | Collection cards in `index.html` |
| `onerror="this.src=..."` | Inline JS on images | Product card images |
| No input sanitization | XSS risk in booking/checkout forms | Form message `innerHTML` |

### 7.8 Logic Suitable for React Hooks/Components

| Current Pattern | React Equivalent |
|---|---|
| `getCart()` / `saveCart()` | `useCart()` hook with Context or Zustand |
| `updateCartCount()` | Derived state from cart context |
| `renderProducts()` | `<ProductCard>` + `<ProductGrid>` components |
| `renderCart()` | `<CartPage>` component |
| `renderProductDetail()` | `[id]/page.tsx` with `params` |
| `showLoading()` / `showError()` | Suspense + Error Boundary |
| `addToCart()` / `removeFromCart()` | Cart context actions |
| Booking form validation | React Hook Form + Zod |
| Hamburger toggle | `useState` + conditional rendering |
| `getImageUrl()` | Utility function / image component |

---

## 8. Responsive Design Audit

### 8.1 Breakpoints

| Breakpoint | CSS Rule | Behavior |
|---|---|---|
| Mobile | `max-width: 768px` | Hamburger menu, horizontal nav, 2-col grids |
| Desktop | `min-width: 769px` | Full nav, CTA button, hamburger hidden |

### 8.2 Mobile Behavior

| Element | Mobile | Desktop |
|---|---|---|
| Navigation | Hamburger → full-screen overlay | Horizontal bar |
| Mobile nav bar | Horizontal scrollable bar below logo | Hidden |
| Cart icon | In header-right + in hamburger menu | In nav bar |
| Collections grid | 2 columns | 4 columns (auto-fit) |
| Product grid | 2 columns | 3+ columns (auto-fit) |
| Services grid | 1 column | 3 columns |
| Contact grid | 1 column (implied) | 2 columns |
| Cart items | Stacked (flex-wrap) | Horizontal row |
| Button sizes | Smaller (padding: 8px 12px) | Full size (padding: 14px 28px) |
| Logo size | max-height: 50px | max-height: 80px |

### 8.3 Identified Issues

| Issue | Severity | Details |
|---|---|---|
| Only 2 breakpoints | MEDIUM | No `sm` (640px) or `lg` (1024px) fine-tuning |
| 769px breakpoint | LOW | Unusual value; standard is 768px. May cause 1px flicker. |
| Horizontal nav overflow | MEDIUM | `overflow-x: auto` on mobile nav — works but no visual scroll indicator |
| Cart item layout on mobile | MEDIUM | Flex layout may overflow on very small screens; no explicit mobile cart styles |
| `threeladies.PNG` on mobile | HIGH | 15 MB hero image loads on all devices |
| No `prefers-reduced-motion` for layout | LOW | Only in `performance.js` injected CSS |
| Touch target sizes | MEDIUM | Hamburger spans may be < 44px touch target |

---

## 9. SEO Audit

### 9.1 Meta Tags

| Page | Title | Description | Status |
|---|---|---|---|
| `index.html` | "Hair Elevation Studio - Premium Wigs" | ✅ Present, well-written | Good |
| `collections.html` | "Collections - Hair Elevation Studio" | ✅ Present | Good |
| `about.html` | "About - Hair Elevation Studio" | ✅ Present | Good |
| `services.html` | "Services - Hair Elevation Studio" | ✅ Present | Good |
| `book.html` | "Book Appointment - Hair Elevation Studio" | ✅ Present | Good |
| `contact.html` | "Contact & Location - Hair Elevation Studio" | ✅ Present | Good |
| `product.html` | "Product Details - Hair Elevation Studio" | ⚠️ Generic | Could be dynamic |
| `cart.html` | "Cart - Hair Elevation Studio" | ✅ Present | Good |
| `checkout.html` | "Checkout - Hair Elevation Studio" | ✅ Present | Good |
| Collection pages | "The [Name] - Hair Elevation Studio" | ✅ Present | Good |

### 9.2 Missing SEO Elements

| Element | Status | Impact |
|---|---|---|
| Open Graph tags (`og:title`, `og:description`, `og:image`) | ❌ Missing | Poor social media sharing |
| Twitter Card tags | ❌ Missing | Poor Twitter sharing |
| Canonical URLs | ❌ Missing | Duplicate content risk |
| Structured Data / Schema.org | ❌ Missing | No rich snippets |
| `lang` attribute | ✅ `lang="en"` | Good |
| `charset` | ✅ `UTF-8` | Good |
| `viewport` | ✅ Present | Good |
| Heading hierarchy | ⚠️ Inconsistent | `h1` used on most pages, but `index.html` has `h1` in hero + `h2` in sections — OK |
| Image `alt` text | ✅ Present on most images | Good |
| `robots.txt` | ❌ Not found | Should be added |
| `sitemap.xml` | ❌ Not found | Should be added |
| Dynamic page titles | ❌ Static | `product.html` title doesn't include product name |

### 9.3 SEO Improvement Opportunities

1. Add Open Graph tags to all pages (especially homepage and collection pages)
2. Add Twitter Card meta tags
3. Add canonical URLs
4. Add Schema.org structured data (Product, Organization, LocalBusiness)
5. Create `robots.txt` and `sitemap.xml`
6. Make `product.html` title dynamic (requires JS or server-side rendering)
7. Add `og:image` for each collection page using collection images
8. Add breadcrumb structured data

---

## 10. Performance Audit

### 10.1 Image Optimization

| Issue | Severity | Recommendation |
|---|---|---|
| `threeladies.PNG` = 15 MB | **CRITICAL** | Convert to WebP/AVIF, compress to < 500 KB |
| `HESLOGO.PNG` = 338 KB (×2) | HIGH | Convert to SVG or WebP, remove duplicate |
| Collection images not WebP | MEDIUM | Convert to WebP (~50% size reduction) |
| No `srcset` / `sizes` | MEDIUM | Serve different sizes for different viewports |
| No `fetchpriority` on hero image | LOW | Add `fetchpriority="high"` to hero image |
| `loading="lazy"` on non-critical images | ✅ Implemented | Good — in `performance.js` |

### 10.2 CSS Performance

| Issue | Severity | Recommendation |
|---|---|---|
| Single 1400-line CSS file | MEDIUM | Split into component modules in Next.js |
| No CSS minification | MEDIUM | Next.js handles this automatically |
| `!important` overuse | MEDIUM | Refactor to avoid specificity wars |
| Inline styles in JS templates | MEDIUM | Move to CSS classes |
| Injected CSS via JS | LOW | Move to main CSS file |

### 10.3 JavaScript Performance

| Issue | Severity | Recommendation |
|---|---|---|
| No code splitting | HIGH | Next.js handles this automatically |
| No tree shaking | HIGH | Next.js + ES modules handles this |
| `js/main.js` is 900 lines | MEDIUM | Split into modules (cart, products, forms) |
| No request caching | MEDIUM | Add SWR or React Query for API data |
| No debounce on search/filter | N/A | No search/filter currently |
| Console.log statements in production | LOW | Remove in production build |

### 10.4 Font Loading

| Issue | Severity | Recommendation |
|---|---|---|
| No `font-display: swap` fallback | LOW | Already using `display=swap` in URL |
| No local font fallback | LOW | Add system font fallbacks |
| Font files loaded from Google CDN | LOW | Consider self-hosting for privacy |

### 10.5 Caching

| Asset | Current | Recommendation |
|---|---|---|
| CSS | No cache headers | Add `Cache-Control` |
| JS | No cache headers | Add `Cache-Control` |
| Images | No cache headers | Add `Cache-Control` with long TTL |
| Service Worker | ✅ Present | Good — cache-first strategy |
| SW cache version | `v1.0.0` | Bump on each deploy |

### 10.6 Render-Blocking Resources

| Resource | Type | Impact |
|---|---|---|
| Google Fonts CSS | Render-blocking `<link>` | Medium — mitigated by `preconnect` |
| `css/styles.css` | Render-blocking `<link>` | Medium — could be `preload`ed |
| `js/api.js` | Blocking `<script>` in `<head>` | Low — small file |
| `js/main.js` | Blocking `<script>` in `<head>` | Medium — could be `defer` |
| `js/performance.js` | ✅ `defer` | Good |

### 10.7 Performance Score Estimate

| Category | Score | Notes |
|---|---|---|
| First Contentful Paint | ~2.5-4s | 15 MB hero image dominates |
| Largest Contentful Paint | ~3-5s | `threeladies.PNG` + font loading |
| Cumulative Layout Shift | Low | Layout is mostly stable |
| First Input Delay | Low | Minimal JS on load |

---

## 11. Accessibility Audit

### 11.1 What's Done Well

| Item | Status |
|---|---|
| `lang="en"` on `<html>` | ✅ |
| Semantic `<header>`, `<main>`, `<section>`, `<footer>` | ✅ |
| `alt` text on most images | ✅ |
| `aria-label` on cart links | ✅ |
| `aria-label` on social media links | ✅ |
| `required` on form inputs | ✅ |
| `type="email"` on email inputs | ✅ |
| `type="tel"` on phone inputs | ✅ |
| `prefers-reduced-motion` media query | ✅ (in `performance.js`) |

### 11.2 Accessibility Gaps

| Issue | Severity | WCAG | Recommendation |
|---|---|---|---|
| Hamburger button has no `aria-label` | MEDIUM | 4.1.2 | Add `aria-label="Toggle menu"` |
| Hamburger button has no `aria-expanded` | MEDIUM | 4.1.2 | Toggle `aria-expanded` on click |
| Hamburger button is `<div>`, not `<button>` | MEDIUM | 4.1.2 | Change to `<button>` element |
| Form labels missing `for` attributes | MEDIUM | 3.3.2 | Add `for="input-id"` to all labels |
| No skip navigation link | MEDIUM | 2.4.1 | Add "Skip to main content" link |
| Modal dialogs lack ARIA | HIGH | 4.1.2 | Add `role="dialog"`, `aria-modal="true"`, focus trap |
| No focus management for modals | HIGH | 2.1.2 | Trap focus inside modal, return on close |
| No focus visible styles | MEDIUM | 2.4.7 | Add `:focus-visible` styles |
| Close modal buttons are `<span>` | MEDIUM | 4.1.2 | Change to `<button>` |
| Color contrast on some text | LOW | 1.4.3 | `#666` on white may be borderline at small sizes |
| No `autocomplete` on forms | LOW | 1.3.5 | Add `autocomplete` attributes |
| Cart icon on mobile missing `aria-label` | LOW | 4.1.2 | Add `aria-label` |
| No `role="navigation"` on `<nav>` | LOW | — | `<nav>` is implicit, but explicit is better |
| No `role="banner"` / `role="contentinfo"` | LOW | — | Implicit from `<header>` / `<footer>` |

### 11.3 Keyboard Navigation

| Feature | Status | Notes |
|---|---|---|
| Tab navigation through links | ✅ Works | Standard `<a>` elements |
| Tab navigation through forms | ✅ Works | Standard form elements |
| Hamburger toggle | ⚠️ Works but not a `<button>` | Needs keyboard handler on `<div>` |
| Modal close via Escape | ❌ Missing | No Escape key handler |
| Modal close via Enter | ❌ Missing | No Enter key handler on close button |
| Focus trap in modals | ❌ Missing | Tab can escape modal |
| Quantity buttons in cart | ✅ Works | Standard `<button>` elements |

---

## 12. Migration Risk Assessment

### 12.1 Risk Matrix

| Risk Area | Risk Level | Description | Mitigation |
|---|---|---|---|
| **API base URL hardcoded** | 🔴 HIGH | `API_BASE_URL` in `js/api.js` is hardcoded to Railway URL | Use Next.js `NEXT_PUBLIC_API_URL` env variable |
| **Cart localStorage migration** | 🟡 MEDIUM | Cart stored in `localStorage` — needs React Context or Zustand | Implement cart context with localStorage sync |
| **Dynamic product rendering** | 🟡 MEDIUM | `renderProducts()` uses template strings + `innerHTML` | Convert to React components with proper JSX |
| **Inline `onclick` handlers** | 🟡 MEDIUM | Collection cards in `index.html` use `onclick` | Convert to Next.js `<Link>` or `onClick` handlers |
| **Admin panel separation** | 🟢 LOW | Admin is separate Express route with own HTML/CSS | Keep as-is or migrate separately |
| **Cloudinary URL handling** | 🟢 LOW | Already works correctly | No changes needed |
| **Backend API contracts** | 🟢 LOW | Backend stays untouched | Verify all endpoints still work |
| **Booking form (no backend)** | 🟡 MEDIUM | Form only shows success message, no API call | Keep same behavior or connect to backend later |
| **Checkout (no backend)** | 🟡 MEDIUM | Order is simulated, no API call | Keep same behavior or connect to backend later |
| **Service Worker** | 🟡 MEDIUM | SW caches old paths; needs update on migration | Update cache manifest, bump version |
| **Debug pages in production** | 🟢 LOW | `debug-*.html`, `test-*.html` | Remove before/during migration |
| **`ts/main.ts` dead code** | 🟢 LOW | Not used in production | Remove |
| **`products.json` stale data** | 🟢 LOW | Not used in production | Keep for reference or remove |
| **Duplicate logo files** | 🟢 LOW | `test-logo.png` = `HESLOGO.PNG` | Delete `test-logo.png` |
| **15 MB hero image** | 🔴 HIGH | Will break performance in Next.js too | Must be optimized before migration |
| **Monolithic CSS** | 🟡 MEDIUM | 1400-line file needs component scoping | Next.js CSS Modules or Tailwind |
| **No TypeScript types for products** | 🟡 MEDIUM | Product shape only documented, not typed | Define `Product` interface in `src/types/` |
| **`!important` in CSS** | 🟡 MEDIUM | Specificity issues in Next.js CSS Modules | Refactor during component migration |

### 12.2 Danger Zones (Code That Needs Careful Refactoring)

1. **`js/main.js` `renderProducts()` (lines 128-199)**: Uses `innerHTML` with template strings, attaches event listeners after injection. Must be converted to React components with proper event handling.

2. **`js/main.js` `renderCart()` (lines 202-284)**: Complex template string with nested conditionals for size selection, promo prices, and quantity controls. High complexity.

3. **`checkout.html` payment modals (lines 185-293)**: Three stacked modals with complex show/hide logic. Needs careful React state management.

4. **`js/api.js` `getImageUrl()` (lines 34-49)**: Three-way URL resolution. Must be preserved exactly to avoid breaking existing Cloudinary images.

5. **`css/styles.css` `.btn` styles (lines 45-81)**: Complex gradient, shadow, hover animation, shimmer effect. Must be preserved exactly.

6. **`css/styles.css` hero section (lines 510-606)**: Background image with gradient overlay, animations, pseudo-elements. Complex to port.

### 12.3 Production Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Broken product images after migration | MEDIUM | HIGH | Test all `getImageUrl()` paths before deploy |
| Cart data loss during migration | LOW | HIGH | Document localStorage key, preserve in new cart context |
| Broken navigation links | LOW | MEDIUM | Verify all `.html` → Next.js route mapping |
| SEO ranking drop | MEDIUM | MEDIUM | Add meta tags, sitemap, redirects |
| Service Worker serving stale content | MEDIUM | LOW | Update SW cache version |
| Payment modals broken | LOW | MEDIUM | Test all 3 modals + close behavior |
| Booking form validation lost | LOW | LOW | Port validation logic exactly |

---

## 13. Recommended Next.js + TypeScript Architecture

### 13.1 Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (header, footer, metadata)
│   ├── page.tsx                # Homepage (/)
│   ├── globals.css             # Global styles (CSS Modules or Tailwind)
│   ├── collections/
│   │   ├── page.tsx            # /collections
│   │   ├── bridal-crowns/
│   │   │   └── page.tsx        # /collections/bridal-crowns
│   │   ├── everyday-crown/
│   │   │   └── page.tsx        # /collections/everyday-crown
│   │   ├── queens-curls/
│   │   │   └── page.tsx        # /collections/queens-curls
│   │   └── signature-pixies/
│   │       └── page.tsx        # /collections/signature-pixies
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        # /products/[id]
│   ├── cart/
│   │   └── page.tsx            # /cart
│   ├── checkout/
│   │   └── page.tsx            # /checkout
│   ├── book/
│   │   └── page.tsx            # /book
│   ├── about/
│   │   └── page.tsx            # /about
│   ├── services/
│   │   └── page.tsx            # /services
│   ├── contact/
│   │   └── page.tsx            # /contact
│   └── api/                    # Next.js API routes (if needed as proxy)
│       └── products/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileNav.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   └── QuantityControls.tsx
│   ├── collection/
│   │   ├── CollectionCard.tsx
│   │   └── CollectionGrid.tsx
│   ├── service/
│   │   ├── ServiceCard.tsx
│   │   └── ServiceGrid.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── SizeSelector.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── MobileMoneyModal.tsx
│   │   ├── BankModal.tsx
│   │   └── PaymentProofModal.tsx
│   ├── booking/
│   │   └── BookingForm.tsx
│   ├── shared/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── SocialIcons.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   └── ui/
│       ├── Modal.tsx
│       └── FormGroup.tsx
├── sections/
│   ├── Hero.tsx
│   ├── CollectionsPreview.tsx
│   ├── FeaturedProducts.tsx
│   ├── ServicesPreview.tsx
│   └── WhatsAppChannelBanner.tsx
├── services/
│   └── api.ts                  # API client (replaces js/api.js)
├── hooks/
│   ├── useCart.ts              # Cart state management
│   ├── useProducts.ts          # Product data fetching
│   └── useModal.ts             # Modal state management
├── lib/
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # App constants (API URL, etc.)
├── types/
│   ├── product.ts              # Product interface
│   ├── cart.ts                 # Cart types
│   └── api.ts                  # API response types
├── styles/
│   └── globals.css             # Global CSS (extracted from styles.css)
└── constants/
    └── brand.ts                # Brand colors, fonts, spacing as JS constants
```

### 13.2 Key Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| CSS approach | CSS Modules or Tailwind CSS | Component-scoped styles, no global conflicts |
| State management | React Context + `useReducer` for cart | Simple, no extra dependencies |
| Data fetching | Native `fetch` in Server Components | No extra library needed for simple cases |
| Image optimization | Next.js `<Image>` component | Automatic WebP, lazy loading, placeholder |
| Form handling | React Hook Form + Zod | Type-safe validation |
| Cart persistence | `localStorage` + React Context | Preserves existing behavior |
| API client | Fetch wrapper in `services/api.ts` | Replaces `js/api.js` |
| Environment variables | `NEXT_PUBLIC_API_URL` | Next.js convention for client-side env vars |

### 13.3 Route Mapping (HTML → Next.js)

| Current URL | Next.js Route | Notes |
|---|---|---|
| `index.html` | `/` | Homepage |
| `collections.html` | `/collections` | |
| `bridal-crowns.html` | `/collections/bridal-crowns` | |
| `everyday-crown.html` | `/collections/everyday-crown` | |
| `queens-curls.html` | `/collections/queens-curls` | |
| `signature-pixies.html` | `/collections/signature-pixies` | |
| `product.html?id=xxx` | `/products/[id]` | Dynamic route |
| `cart.html` | `/cart` | |
| `checkout.html` | `/checkout` | |
| `book.html` | `/book` | |
| `about.html` | `/about` | |
| `services.html` | `/services` | |
| `contact.html` | `/contact` | |
| `admin-demo.html` | (separate) | Keep as standalone or `/admin` |

---

## 14. Safe Migration Roadmap

### Phase 1: Project Setup (No Frontend Changes)
- [ ] Initialize Next.js 14+ with TypeScript
- [ ] Configure `next.config.js` (images, redirects, env vars)
- [ ] Set up `NEXT_PUBLIC_API_URL` environment variable
- [ ] Create directory structure per §13.1
- [ ] Set up ESLint + Prettier

### Phase 2: Shared Components (Low Risk)
- [ ] Extract `Button` component (preserve exact gradient, shadow, hover)
- [ ] Extract `Badge` component (sale, out-of-stock)
- [ ] Extract `SocialIcons` component
- [ ] Extract `QuantityControls` component
- [ ] Create `brand.ts` constants file

### Phase 3: Layout Components (Medium Risk)
- [ ] Port `Header` component (hamburger, nav, cart icon)
- [ ] Port `Footer` component (3-column grid)
- [ ] Port `WhatsAppFloat` component
- [ ] Port `Navigation` (desktop + mobile)
- [ ] Create root `layout.tsx`

### Phase 4: Pages (Progressive Migration)
- [ ] Migrate `about.html` → `/about` (simplest page)
- [ ] Migrate `contact.html` → `/contact`
- [ ] Migrate `services.html` → `/services`
- [ ] Migrate `book.html` → `/book` (form validation)
- [ ] Migrate `collections.html` → `/collections`
- [ ] Migrate collection pages → `/collections/*`
- [ ] Migrate `product.html` → `/products/[id]`
- [ ] Migrate `cart.html` → `/cart` (with cart context)
- [ ] Migrate `checkout.html` → `/checkout` (modals last)
- [ ] Migrate `index.html` → `/` (hero + featured + collections preview)

### Phase 5: API & State (Medium Risk)
- [ ] Create `services/api.ts` (port `js/api.js`)
- [ ] Create `hooks/useCart.ts` (port cart logic)
- [ ] Create `hooks/useProducts.ts`
- [ ] Wire up all pages to real API

### Phase 6: Assets & Performance (High Priority)
- [ ] Optimize `threeladies.PNG` (15 MB → < 500 KB)
- [ ] Convert `HESLOGO.PNG` to SVG
- [ ] Convert collection images to WebP
- [ ] Delete `test-logo.png` duplicate
- [ ] Remove debug pages from production
- [ ] Update service worker cache manifest

### Phase 7: SEO & Accessibility (Parallel)
- [ ] Add Open Graph tags to `layout.tsx`
- [ ] Add Twitter Card tags
- [ ] Add canonical URLs
- [ ] Add Schema.org structured data
- [ ] Fix form label `for` attributes
- [ ] Add hamburger `aria-label` + `aria-expanded`
- [ ] Add modal ARIA attributes + focus trap
- [ ] Add skip navigation link
- [ ] Add `:focus-visible` styles

### Phase 8: Testing & Deploy
- [ ] Test all pages on mobile (320px, 375px, 768px)
- [ ] Test all pages on desktop (1024px, 1440px)
- [ ] Test cart flow (add → view → update → remove → checkout)
- [ ] Test product detail → add to cart
- [ ] Test booking form validation
- [ ] Test checkout modals
- [ ] Verify Cloudinary images load
- [ ] Verify API calls succeed
- [ ] Run Lighthouse audit
- [ ] Deploy to staging
- [ ] Deploy to production with redirects from old `.html` URLs

---

## 15. Success Criteria Checklist

- [x] All existing frontend functionality is fully understood
- [x] No backend functionality is altered (backend untouched)
- [x] All Cloudinary integrations are documented and protected
- [x] All reusable UI patterns are identified (22 component candidates)
- [x] A safe and scalable migration strategy is produced (8-phase roadmap)
- [ ] No production functionality is broken (pending migration execution)
- [ ] The project is fully prepared for a controlled Next.js + TypeScript migration

---

*This report is a read-only audit. No code has been modified. All findings are documented for planning purposes only.*
