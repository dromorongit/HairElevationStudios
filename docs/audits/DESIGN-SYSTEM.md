# Hair Elevation Studio — Design System Extraction
**Phase:** PHASE_0 — Frontend Audit & Migration Planning
**Date:** 2026-05-22

---

## 1. Brand Colors

### 1.1 Primary Palette

```css
/* Neutral / Brand Foundation */
--color-cream:          #F5EFE6;   /* Primary text, icon fills, hero text */
--color-cream-light:    #F0E6D8;   /* Body gradient end */
--color-cream-mid:      #E8D5C4;   /* Body gradient mid, form borders */
--color-dark:           #3B2A23;   /* Header/footer bg, headings on white */
--color-dark-deep:      #2A1E18;   /* Footer gradient end */
--color-off-white:      #FAF8F5;   /* Form input background */
--color-white:          #FFFFFF;   /* Card backgrounds */

/* Gold Accent System */
--color-gold:           #C8A97E;   /* Primary accent, button gradient start */
--color-gold-mid:       #B8956A;   /* Button gradient mid, hover states */
--color-gold-dark:      #A67C52;   /* Button gradient end */

/* Semantic Colors */
--color-sale-red:       #D32F2F;   /* Promo price, sale badge */
--color-error-red:      #DC3545;   /* Out of stock, error messages */
--color-success-green:  #28A745;   /* Success messages */
--color-gray-text:      #666666;   /* Body text on white cards */
--color-gray-light:     #999999;   /* Strikethrough price */
--color-black:          #000000;   /* Cart text, product prices */

/* WhatsApp Brand */
--color-whatsapp:       #25D366;   /* WhatsApp float, channel buttons */
--color-whatsapp-mid:   #20B954;   /* WhatsApp gradient mid */
--color-whatsapp-deep:  #128C7E;   /* WhatsApp gradient end */
```

### 1.2 Color Usage Map

| Color | Hex | Where Used |
|---|---|---|
| Cream | `#F5EFE6` | Body text, nav text, icon fills, hero text, logo filter (inverted) |
| Dark | `#3B2A23` | Header bg, footer bg, headings on white, form labels |
| Gold | `#C8A97E` | Button gradient, nav underline, borders, cart count bg, developer name |
| Gold Mid | `#B8956A` | Button gradient mid, hover states |
| Gold Dark | `#A67C52` | Button gradient end |
| Cream Mid | `#E8D5C4` | Body gradient, form borders |
| Sale Red | `#D32F2F` | Promo price text, sale badge bg |
| Error Red | `#DC3545` | Out of stock badge |
| WhatsApp Green | `#25D366` | WhatsApp float, channel buttons |
| White | `#FFFFFF` | Card backgrounds, cart items, form cards |

---

## 2. Typography

### 2.1 Font Families

```css
/* Display / Headings */
font-family: 'Playfair Display', Georgia, serif;

/* Body / UI */
font-family: 'Roboto', 'Segoe UI', sans-serif;
```

### 2.2 Type Scale

| Element | Font Family | Weight | Size | Line Height | Letter Spacing | Text Shadow |
|---|---|---|---|---|---|---|
| `h1` (page title) | Playfair Display | 700 | 2rem | — | 0.5px | — |
| `h1` (hero) | Playfair Display | 900 | 3rem | — | — | `0 6px 12px rgba(0,0,0,0.9)` |
| `h2` (section) | Playfair Display | 700 | 1.8rem | — | 0.5px | `0 2px 4px rgba(0,0,0,0.5)` |
| `h3` (card title) | Playfair Display | 700 | 1.3rem | — | — | — |
| Body text | Roboto | 300/400/500 | 1rem | 1.6 | — | — |
| Button text | Roboto | 600 | 0.95rem | — | 0.8px | — |
| Nav links | Roboto | 500 | ~1rem | — | — | — |
| Footer text | Roboto | 300/500 | 0.85-0.9rem | — | — | — |
| Cart item text | Roboto | 500 | 1.1-1.2rem | — | — | — |

### 2.3 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
```

- Weights loaded: Playfair Display (400, 700), Roboto (300, 400, 500)
- `display=swap` used
- `preconnect` + `dns-prefetch` for performance

---

## 3. Spacing System

### 3.1 Spacing Tokens (Derived)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Badge padding, small gaps |
| `space-3` | 12px | — |
| `space-4` | 16px | Input padding mobile |
| `space-5` | 20px | Container padding, card padding mobile |
| `space-6` | 24px | — |
| `space-8` | 32px | Section padding mobile, card gaps |
| `space-10` | 40px | Grid gaps, section padding |
| `space-12` | 48px | Section padding desktop |
| `space-16` | 64px | Hero padding |
| `space-20` | 80px | Hero padding desktop |

### 3.2 Layout Constants

| Constant | Value |
|---|---|
| Container max-width | 1200px |
| Container horizontal padding | 20px |
| Section vertical padding | 80px |
| Hero vertical padding | 140px |
| Grid gap (products/services) | 30px |
| Grid gap (collections) | 40px |
| Card border-radius | 16-20px |
| Button border-radius (primary) | 30px (pill) |
| Button border-radius (form) | 10px |
| Badge border-radius | 15px (pill) |

---

## 4. Shadows

```css
/* Card shadow (default) */
--shadow-card: 0 8px 25px rgba(59, 42, 35, 0.1);

/* Card shadow (hover) */
--shadow-card-hover: 0 12px 30px rgba(59, 42, 35, 0.15);

/* Collection card shadow */
--shadow-collection: 0 15px 35px rgba(59, 42, 35, 0.1);

/* Collection card hover */
--shadow-collection-hover: 0 25px 50px rgba(59, 42, 35, 0.15);

/* Button shadow */
--shadow-button: 0 6px 20px rgba(200, 169, 126, 0.4);

/* WhatsApp float shadow */
--shadow-whatsapp: 0 10px 30px rgba(37, 211, 102, 0.5);

/* Cart item shadow */
--shadow-cart: 0 4px 8px rgba(59, 42, 35, 0.1);

/* Form card shadow */
--shadow-form: 0 10px 30px rgba(59, 42, 35, 0.1);
```

---

## 5. Border Radius

| Element | Radius |
|---|---|
| Product/Service cards | 16px |
| Collection cards | 20px |
| Form card / Modal | 20px |
| Cart items | 10px |
| Cart summary | 15px |
| Primary buttons | 30px (pill) |
| Form inputs | 10px |
| Quantity buttons | 5px |
| Badges | 15px (pill) |
| WhatsApp float | 50% (circle) |
| Map placeholder | 15px |
| Price list image | 12px |

---

## 6. Transitions & Animations

### 6.1 Transition Presets

| Name | Duration | Easing | Usage |
|---|---|---|---|
| `transition-fast` | 0.3s | `ease` | Nav underline, icon hover |
| `transition-normal` | 0.4s | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Button hover, card hover |
| `transition-slow` | 0.5s | — | Button shimmer sweep |
| `transition-hero` | 1s | `ease-out` | Hero fade-in |

### 6.2 Animation Keyframes

```css
/* Hero content entrance */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide from left */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Slide from right */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

/* WhatsApp float pulse */
@keyframes gentlePulse {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.08) translateY(-3px); }
}

/* Hero loaded fade */
@keyframes fadeInHero {
  from { opacity: 0.8; }
  to { opacity: 1; }
}

/* Developer name entrance */
/* Uses fadeInUp with 0.3s delay */
```

### 6.3 Hover Effects

| Element | Hover Effect |
|---|---|
| `.btn` | `translateY(-3px) scale(1.05)`, shadow intensifies, shimmer sweep |
| `.product-card` | `translateY(-8px)`, shadow intensifies, image `scale(1.05)` |
| `.collection-card` | `translateY(-10px) scale(1.02)`, image `scale(1.1)` |
| `.service-card` | `translateY(-8px)`, shadow intensifies |
| `.nav-list a::after` | Underline width `0 → 100%` |
| `.whatsapp-float a` | `scale(1.15) rotate(8deg)`, shadow intensifies |
| `.social-icons a` | `scale(1.1)` |
| `.developer-name` | Color shift + underline sweep |
| `.quantity-btn` | Background → gold, text → white |

---

## 7. Responsive Breakpoints

```css
/* Mobile: default styles apply */
/* No explicit mobile base — mobile is the default */

/* Desktop */
@media (min-width: 769px) {
  /* Header: row layout, hamburger hidden, mobile-nav hidden */
  /* Nav: horizontal bar, CTA visible */
  /* Collections: 4 columns */
  /* Products: 3+ columns */
  /* Services: 3 columns */
}

/* Mobile overrides */
@media (max-width: 768px) {
  /* Header: column layout */
  /* Nav: hamburger + full-screen overlay */
  /* Mobile nav: horizontal scroll bar visible */
  /* Collections: 2 columns */
  /* Products: 2 columns */
  /* Services: 1 column */
  /* Contact: 1 column */
  /* Cart: stacked layout */
  /* Buttons: smaller padding */
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile (default) | < 769px | Hamburger menu, horizontal nav, 2-col grids |
| Desktop | ≥ 769px | Full nav, CTA, 3-4 col grids |

---

## 8. Button System

### 8.1 Primary Button (`.btn`)

```css
display: inline-block;
padding: 14px 28px;
background: linear-gradient(135deg, #C8A97E 0%, #B8956A 50%, #A67C52 100%);
color: #3B2A23;
border: none;
border-radius: 30px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.8px;
box-shadow: 0 6px 20px rgba(200, 169, 126, 0.4), 0 0 0 1px rgba(200, 169, 126, 0.2);
transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
font-size: 0.95rem;
position: relative;
overflow: hidden;
```

**Hover state:**
```css
transform: translateY(-3px) scale(1.05);
box-shadow: 0 8px 25px rgba(200, 169, 126, 0.5), 0 0 0 2px rgba(200, 169, 126, 0.4);
/* + shimmer sweep via ::before pseudo-element */
```

### 8.2 Button Variants

| Variant | Class | Background | Text Color | Border |
|---|---|---|---|---|
| Primary | `.btn` | Gold gradient | `#3B2A23` | None |
| Collection | `.btn.collection-btn` | Gold gradient | `#3B2A23` | None |
| WhatsApp Channel | `.btn.whatsapp-channel-btn` | White | `#25D366` | 2px white |
| WhatsApp Channel Footer | `.btn.whatsapp-channel-btn-footer` | Green gradient | White | 2px green |
| Payment Confirm | `#payment-instructions-confirm` | Gold gradient | `#3B2A23` | None |

---

## 9. Form System

### 9.1 Form Group

```css
.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #3B2A23;
  font-size: 1rem;
}

input, select, textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #E8D5C4;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #FAF8F5;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #C8A97E;
  box-shadow: 0 0 0 3px rgba(200, 169, 126, 0.1);
  background: #fff;
}
```

### 9.2 Form Fields Used

| Field | Type | Page | Validation |
|---|---|---|---|
| Full Name | `text` | Book, Checkout | Required |
| Phone | `tel` | Book, Checkout | Required, 10-digit regex (book) |
| Email | `email` | Checkout | — |
| Service Type | `select` | Book | Required |
| Preferred Date | `date` | Book | Required |
| Preferred Time | `time` | Book | Required |
| Additional Notes | `textarea` | Book, Checkout | Optional |
| Address | `textarea` | Checkout | Required |
| City | `text` | Checkout | Required |
| Payment Method | `select` | Checkout | Required (Mobile Money / Bank) |
| Size | `select` | Cart (conditional) | Optional |

---

## 10. Card System

### 10.1 Base Card Pattern

All cards share this pattern:
- White background (`#FFFFFF`)
- Border-radius: 16-20px
- Box-shadow: `0 8px 25px rgba(59, 42, 35, 0.1)`
- Border: `1px solid rgba(200, 169, 126, 0.15)`
- Hover: `translateY(-8px)` + shadow intensifies
- Transition: `all 0.3s ease` or `cubic-bezier(...)`

### 10.2 Card Types

| Card Type | Border-Radius | Special Features |
|---|---|---|
| Product card | 16px | Image zoom on hover, sale/stock badges |
| Collection card | 20px | Gold top border, image zoom, content underline |
| Service card | 16px | Semi-transparent white, backdrop-filter |
| Cart item | 10px | Flex row layout |
| Form card | 20px | White on gradient background |
| Contact/Location card | 20px | White on gradient background |

---

## 11. Gradient System

| Gradient | Direction | Colors | Usage |
|---|---|---|---|
| Body background | 135deg | `#F5EFE6 → #E8D5C4 → #F0E6D8` | Page background |
| Button gradient | 135deg | `#C8A97E → #B8956A → #A67C52` | Primary buttons |
| Header background | — | `rgba(59, 42, 35, 0.95)` | Sticky header |
| Footer background | 135deg | `#3B2A23 → #2A1E18` | Footer |
| WhatsApp float | 135deg | `#25D366 → #20B954 → #128C7E` | Floating button |
| WhatsApp channel | 135deg | `#25D366 → #20B954` | Channel banner |
| Hero overlay | — | `rgba(200, 169, 126, 0.4)` | Hero section |
| Section overlay | — | `rgba(200, 169, 126, 0.3)` | Services, booking, contact |
| Developer name hover | — | `0 0 8px rgba(200, 169, 126, 0.3)` | Text glow |

---

## 12. Design Tokens for Next.js

```typescript
// src/constants/brand.ts
export const BRAND = {
  colors: {
    cream: '#F5EFE6',
    creamLight: '#F0E6D8',
    creamMid: '#E8D5C4',
    dark: '#3B2A23',
    darkDeep: '#2A1E18',
    offWhite: '#FAF8F5',
    white: '#FFFFFF',
    gold: '#C8A97E',
    goldMid: '#B8956A',
    goldDark: '#A67C52',
    saleRed: '#D32F2F',
    errorRed: '#DC3545',
    successGreen: '#28A745',
    grayText: '#666666',
    grayLight: '#999999',
    black: '#000000',
    whatsapp: '#25D366',
    whatsappMid: '#20B954',
    whatsappDeep: '#128C7E',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'Roboto', 'Segoe UI', sans-serif",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '80px',
  },
  breakpoints: {
    mobile: '768px',
    desktop: '769px',
  },
  borderRadius: {
    sm: '5px',
    md: '10px',
    lg: '16px',
    xl: '20px',
    pill: '30px',
    circle: '50%',
  },
  shadows: {
    card: '0 8px 25px rgba(59, 42, 35, 0.1)',
    cardHover: '0 12px 30px rgba(59, 42, 35, 0.15)',
    button: '0 6px 20px rgba(200, 169, 126, 0.4)',
    whatsapp: '0 10px 30px rgba(37, 211, 102, 0.5)',
  },
  transitions: {
    fast: '0.3s ease',
    normal: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;
```
