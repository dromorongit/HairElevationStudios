# Hair Elevation Studio — Component Inventory
**Phase:** PHASE_0 — Frontend Audit & Migration Planning
**Date:** 2026-05-22

---

## Overview

This document catalogs all reusable UI structures identified in the Hair Elevation Studio frontend. Each entry includes the current implementation details and recommended React component mapping for the upcoming Next.js migration.

---

## 1. Layout Components

### 1.1 Header
| Property | Value |
|---|---|
| **CSS Class** | `.header` |
| **Pages** | All 13 HTML pages |
| **Structure** | Logo + Header-top (logo + hamburger + cart) + Mobile nav + Desktop nav + CTA |
| **Key Styles** | `background: rgba(59, 42, 35, 0.95)`, `backdrop-filter: blur(10px)`, `position: sticky` |
| **React Component** | `components/layout/Header.tsx` |
| **Sub-components** | `Logo`, `CartIcon`, `Hamburger`, `Navigation`, `MobileNav`, `CTAButton` |

### 1.2 Footer
| Property | Value |
|---|---|
| **CSS Class** | `.footer` |
| **Pages** | All 13 HTML pages |
| **Structure** | 3-column grid: Contact Us | Follow Us | WhatsApp Channel + Bottom bar |
| **Key Styles** | `background: linear-gradient(135deg, #3B2A23, #2A1F1A)`, gold top border |
| **React Component** | `components/layout/Footer.tsx` |
| **Sub-components** | `FooterContact`, `SocialIcons`, `WhatsAppChannelBanner`, `DeveloperCredits` |

### 1.3 Navigation (Desktop)
| Property | Value |
|---|---|
| **CSS Class** | `.nav`, `.nav-list` |
| **Pages** | All 13 HTML pages |
| **Structure** | `<ul>` with 6-7 `<li>` links + CTA button |
| **Key Styles** | Flex row, gap: 30px, underline animation on hover |
| **React Component** | `components/layout/Navigation.tsx` |

### 1.4 Navigation (Mobile / Hamburger)
| Property | Value |
|---|---|
| **CSS Class** | `.nav-list.full`, `.hamburger` |
| **Pages** | All 13 HTML pages |
| **Structure** | Fixed full-screen overlay, flex column, centered links |
| **Key Styles** | `position: fixed`, `left: -100%` → `left: 0` on active |
| **React Component** | `components/layout/MobileNav.tsx` |
| **State** | `isOpen: boolean` |

### 1.5 Navigation (Mobile Horizontal Bar)
| Property | Value |
|---|---|
| **CSS Class** | `.nav-list.horizontal`, `.mobile-nav-container` |
| **Pages** | All 13 HTML pages |
| **Structure** | Horizontal scrollable bar with 4 key links |
| **Key Styles** | `overflow-x: auto`, `-webkit-overflow-scrolling: touch` |
| **React Component** | `components/layout/MobileHorizontalNav.tsx` |

### 1.6 WhatsApp Float Button
| Property | Value |
|---|---|
| **CSS Class** | `.whatsapp-float` |
| **Pages** | All 13 HTML pages |
| **Structure** | Fixed position, circular gradient button, WhatsApp SVG |
| **Key Styles** | `position: fixed`, `bottom: 30px`, `right: 30px`, pulse animation |
| **React Component** | `components/layout/WhatsAppFloat.tsx` |

---

## 2. Product Components

### 2.1 ProductCard
| Property | Value |
|---|---|
| **CSS Class** | `.product-card` |
| **Pages** | `index.html` (featured), collection pages |
| **Structure** | Image + sale/out-of-stock badges + name + price + quantity controls + add-to-cart button |
| **Key Styles** | White bg, border-radius: 16px, box-shadow, hover lift + image zoom |
| **React Component** | `components/product/ProductCard.tsx` |
| **Props** | `product: Product`, `onAddToCart: (id, qty) => void` |
| **Event Handlers** | Quantity +/- click, Add to Cart click, Card click → product detail |

### 2.2 ProductGrid
| Property | Value |
|---|---|
| **CSS Class** | `.product-grid` |
| **Pages** | `index.html`, collection pages |
| **Structure** | CSS Grid container for ProductCard components |
| **Key Styles** | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap: 30px |
| **React Component** | `components/product/ProductGrid.tsx` |
| **Props** | `products: Product[]`, `limit?: number` |

### 2.3 ProductDetail
| Property | Value |
|---|---|
| **CSS Class** | `.product-detail` |
| **Pages** | `product.html` |
| **Structure** | Dynamic content loaded via `#product-content` |
| **Key Styles** | Container with product image + info side-by-side |
| **React Component** | `app/products/[id]/page.tsx` |
| **Data Fetching** | Server component: `fetch(/products/${id})` |

### 2.4 QuantityControls
| Property | Value |
|---|---|
| **CSS Class** | `.quantity-controls`, `.quantity-btn`, `.quantity` |
| **Pages** | Product cards, cart items |
| **Structure** | `-` button + quantity span + `+` button |
| **Key Styles** | Flex center, gap: 10px, 30×30px buttons |
| **React Component** | `components/product/QuantityControls.tsx` |
| **Props** | `value: number`, `onChange: (delta) => void` |

---

## 3. Collection Components

### 3.1 CollectionCard
| Property | Value |
|---|---|
| **CSS Class** | `.collection-card` |
| **Pages** | `index.html`, `collections.html` |
| **Structure** | Image container + content (h2 + p + optional button) |
| **Key Styles** | White bg, border-radius: 20px, gold top border, hover lift + image zoom |
| **React Component** | `components/collection/CollectionCard.tsx` |
| **Props** | `title: string`, `description: string`, `image: string`, `href: string` |
| **Note** | In `index.html`, uses `onclick="window.location.href=..."` — must convert to `<Link>` |

### 3.2 CollectionGrid
| Property | Value |
|---|---|
| **CSS Class** | `.collections-grid` |
| **Pages** | `index.html`, `collections.html` |
| **Structure** | CSS Grid of CollectionCard components |
| **Key Styles** | `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`, gap: 40px |
| **React Component** | `components/collection/CollectionGrid.tsx` |

---

## 4. Service Components

### 4.1 ServiceCard
| Property | Value |
|---|---|
| **CSS Class** | `.service-card` |
| **Pages** | `index.html` (preview), `services.html` |
| **Structure** | h3 + p + optional button |
| **Key Styles** | White bg with opacity, backdrop-filter, border |
| **React Component** | `components/service/ServiceCard.tsx` |
| **Props** | `title: string`, `description: string`, `buttonText?: string`, `buttonHref?: string` |

### 4.2 ServiceGrid
| Property | Value |
|---|---|
| **CSS Class** | `.services-grid` |
| **Pages** | `index.html`, `services.html` |
| **Structure** | CSS Grid of ServiceCard components |
| **Key Styles** | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` |
| **React Component** | `components/service/ServiceGrid.tsx` |

---

## 5. Cart Components

### 5.1 CartItem
| Property | Value |
|---|---|
| **CSS Class** | `.cart-item` |
| **Pages** | `cart.html` |
| **Structure** | Image + details (name, price, size selector, quantity controls) + remove button |
| **Key Styles** | Flex row, white bg, border-radius: 10px |
| **React Component** | `components/cart/CartItem.tsx` |
| **Props** | `item: CartItem`, `index: number`, `onUpdateQuantity`, `onRemove`, `onSizeChange` |

### 5.2 CartSummary
| Property | Value |
|---|---|
| **CSS Class** | `.cart-summary` |
| **Pages** | `cart.html` |
| **Structure** | Total price + "Proceed to Checkout" button |
| **Key Styles** | White bg, border-radius: 15px, centered text |
| **React Component** | `components/cart/CartSummary.tsx` |
| **Props** | `total: number`, `onCheckout: () => void` |

### 5.3 SizeSelector
| Property | Value |
|---|---|
| **CSS Class** | `.cart-size-selection`, `.size-selector` |
| **Pages** | `cart.html` (conditional) |
| **Structure** | Label + `<select>` with size options |
| **Key Styles** | Inline within cart item |
| **React Component** | `components/cart/SizeSelector.tsx` |
| **Props** | `sizes: string[]`, `value: string`, `onChange: (size) => void` |

---

## 6. Checkout Components

### 6.1 CheckoutForm
| Property | Value |
|---|---|
| **CSS Class** | `.checkout-form`, `.form-group` |
| **Pages** | `checkout.html` |
| **Structure** | Shipping form (name, email, phone, address, city, notes) + Payment form (method select) + submit |
| **Key Styles** | White bg form groups, gold focus border |
| **React Component** | `components/checkout/CheckoutForm.tsx` |
| **Form Fields** | `shipping-name`, `shipping-email`, `shipping-phone`, `shipping-address`, `shipping-city`, `additional-notes`, `payment-method` |

### 6.2 OrderSummary
| Property | Value |
|---|---|
| **CSS Class** | `.order-summary` |
| **Pages** | `checkout.html` |
| **Structure** | Order items list + total |
| **Key Styles** | White bg card |
| **React Component** | `components/checkout/OrderSummary.tsx` |

### 6.3 PaymentModal (Base)
| Property | Value |
|---|---|
| **CSS Class** | `.modal`, `.modal-content` |
| **Pages** | `checkout.html` |
| **Structure** | Overlay + content (header + body + footer) |
| **Key Styles** | Fixed overlay, centered card, backdrop blur |
| **React Component** | `components/ui/Modal.tsx` |
| **Props** | `isOpen: boolean`, `onClose: () => void`, `title: string`, `children` |

### 6.4 MobileMoneyModal
| Property | Value |
|---|---|
| **CSS Class** | `#mobile-money-modal` |
| **Pages** | `checkout.html` |
| **Structure** | Payment details (number, merchant ID, account name) + steps + warning |
| **React Component** | `components/checkout/MobileMoneyModal.tsx` |

### 6.5 BankModal
| Property | Value |
|---|---|
| **CSS Class** | `#bank-payment-modal` |
| **Pages** | `checkout.html` |
| **Structure** | Bank details (EcoBank, account number, account name) + steps + warning |
| **React Component** | `components/checkout/BankModal.tsx` |

### 6.6 PaymentProofModal
| Property | Value |
|---|---|
| **CSS Class** | `#payment-proof-modal` |
| **Pages** | `checkout.html` |
| **Structure** | File upload area + image preview + submit button |
| **React Component** | `components/checkout/PaymentProofModal.tsx` |

---

## 7. Booking Components

### 7.1 BookingForm
| Property | Value |
|---|---|
| **CSS Class** | `#booking-form`, `.form-group` |
| **Pages** | `book.html` |
| **Structure** | Name, phone, service select, date, time, notes + submit |
| **Key Styles** | Centered white card on gradient background |
| **React Component** | `components/booking/BookingForm.tsx` |
| **Validation** | Name required, phone 10-digit regex, service required, date required, time required |

---

## 8. Shared UI Components

### 8.1 Button
| Property | Value |
|---|---|
| **CSS Class** | `.btn` |
| **Pages** | All pages |
| **Variants** | `.btn` (primary), `.collection-btn`, `.whatsapp-channel-btn`, `.whatsapp-channel-btn-footer` |
| **Key Styles** | Gradient `#C8A97E → #B8956A → #A67C52`, pill shape, shimmer hover, scale on hover |
| **React Component** | `components/shared/Button.tsx` |
| **Props** | `children`, `variant?: 'primary' | 'secondary' | 'whatsapp'`, `onClick?`, `href?`, `type?: 'button' | 'submit' | 'reset'` |

### 8.2 Badge
| Property | Value |
|---|---|
| **CSS Classes** | `.sale-badge`, `.out-of-stock-badge` |
| **Pages** | Product cards |
| **Key Styles** | Absolute position, red bg, white text, pill shape |
| **React Component** | `components/shared/Badge.tsx` |
| **Props** | `type: 'sale' | 'out-of-stock'` |

### 8.3 SocialIcons
| Property | Value |
|---|---|
| **CSS Class** | `.social-icons` |
| **Pages** | Footer of all pages, contact page |
| **Icons** | Instagram, TikTok, WhatsApp (inline SVGs) |
| **React Component** | `components/shared/SocialIcons.tsx` |

### 8.4 LoadingSpinner
| Property | Value |
|---|---|
| **CSS Class** | `.loading` |
| **Pages** | Used in `js/main.js` `showLoading()` |
| **React Component** | `components/shared/LoadingSpinner.tsx` |

### 8.5 ErrorMessage
| Property | Value |
|---|---|
| **CSS Class** | Inline styles in `showError()` |
| **Pages** | Used in `js/main.js` `showError()` |
| **React Component** | `components/shared/ErrorMessage.tsx` |

### 8.6 PriceDisplay
| Property | Value |
|---|---|
| **CSS Class** | `.price-container`, `.original-price`, `.promo-price` |
| **Pages** | Product cards, cart items |
| **Key Styles** | Centered flex, strikethrough for original, red for promo |
| **React Component** | `components/shared/PriceDisplay.tsx` |
| **Props** | `price: number`, `promoPrice?: number`, `onSale?: boolean` |

---

## 9. Section Components

### 9.1 Hero
| Property | Value |
|---|---|
| **CSS Class** | `.hero`, `.hero-content` |
| **Pages** | `index.html` |
| **Structure** | Background image + gradient overlay + h1 + p + CTA button |
| **Key Styles** | `background: url(threeladies.PNG)`, gradient overlay, fadeInUp animation |
| **React Component** | `sections/Hero.tsx` |

### 9.2 CollectionsPreview
| Property | Value |
|---|---|
| **CSS Class** | `.collections` (on homepage) |
| **Pages** | `index.html` |
| **Structure** | h2 + intro text + 4 collection cards |
| **React Component** | `sections/CollectionsPreview.tsx` |

### 9.3 FeaturedProducts
| Property | Value |
|---|---|
| **CSS Class** | `.featured`, `#featured-products` |
| **Pages** | `index.html` |
| **Structure** | h2 + product grid (dynamically loaded from `/products/featured`) |
| **React Component** | `sections/FeaturedProducts.tsx` |

### 9.4 ServicesPreview
| Property | Value |
|---|---|
| **CSS Class** | `.services-preview` |
| **Pages** | `index.html` |
| **Structure** | h2 + 3 service cards |
| **React Component** | `sections/ServicesPreview.tsx` |

### 9.5 WhatsAppChannelBanner
| Property | Value |
|---|---|
| **CSS Class** | `.whatsapp-channel-section` |
| **Pages** | `contact.html` |
| **Structure** | Green gradient banner + h2 + button |
| **React Component** | `sections/WhatsAppChannelBanner.tsx` |

---

## 10. Component Reusability Matrix

| Component | Reuse Count | Pages | Priority for Migration |
|---|---|---|---|
| Header | 13 | All | 🔴 Critical |
| Footer | 13 | All | 🔴 Critical |
| Navigation | 13 | All | 🔴 Critical |
| WhatsAppFloat | 13 | All | 🔴 Critical |
| SocialIcons | 13 | All | 🟡 High |
| Button | 13+ | All | 🔴 Critical |
| ProductCard | 5 | Home + 4 collections | 🟡 High |
| ProductGrid | 5 | Home + 4 collections | 🟡 High |
| CollectionCard | 2 | Home + collections | 🟡 High |
| CollectionGrid | 2 | Home + collections | 🟡 High |
| ServiceCard | 2 | Home + services | 🟢 Medium |
| ServiceGrid | 2 | Home + services | 🟢 Medium |
| CartItem | 1 | Cart | 🟡 High |
| CartSummary | 1 | Cart | 🟡 High |
| CheckoutForm | 1 | Checkout | 🟡 High |
| PaymentModal | 3 | Checkout | 🟡 High |
| BookingForm | 1 | Book | 🟢 Medium |
| Badge | 1 | Product cards | 🟢 Medium |
| QuantityControls | 2 | Product + Cart | 🟡 High |
| PriceDisplay | 2 | Product + Cart | 🟡 High |
| Hero | 1 | Home | 🟢 Medium |
| LoadingSpinner | 1 | Utility | 🟢 Medium |
| ErrorMessage | 1 | Utility | 🟢 Medium |

---

## 11. Duplication Summary

| Duplicated Element | Count | Locations | Waste |
|---|---|---|---|
| Header HTML | 13× | Every HTML page | ~80 lines × 12 = ~960 lines |
| Footer HTML | 13× | Every HTML page | ~40 lines × 12 = ~480 lines |
| Navigation HTML | 13× | Every HTML page | ~25 lines × 12 = ~300 lines |
| Cart SVG icon | 13× | Every HTML page | ~8 lines × 12 = ~96 lines |
| Instagram SVG | 13× | Every HTML page | ~5 lines × 12 = ~60 lines |
| TikTok SVG | 13× | Every HTML page | ~5 lines × 12 = ~60 lines |
| WhatsApp SVG (footer) | 13× | Every HTML page | ~5 lines × 12 = ~60 lines |
| WhatsApp SVG (float) | 13× | Every HTML page | ~5 lines × 12 = ~60 lines |
| `<script>` includes | 13× | Every HTML page | ~3 lines × 12 = ~36 lines |
| Google Fonts `<link>` | 13× | Every HTML page | ~4 lines × 12 = ~48 lines |
| **Total duplicated HTML** | | | **~2,200 lines** |

In Next.js, this duplication is eliminated through shared `layout.tsx` and component imports.
