# Hair Elevation Studio — API Integration Map
**Phase:** PHASE_0 — Frontend Audit & Migration Planning
**Date:** 2026-05-22

---

## 1. API Service Overview

**Base URL:** `https://hairelevationstudios-production.up.railway.app`
**Service file:** `js/api.js` (60 lines)
**Global instance:** `window.apiService`

### Current Implementation

```javascript
const API_BASE_URL = 'https://hairelevationstudios-production.up.railway.app';

class APIService {
    async fetch(endpoint, options = {}) { ... }
    async getAllProducts() { ... }
    async getFeaturedProducts() { ... }
    async getProductById(id) { ... }
    getImageUrl(path) { ... }
    getProductsByCollection(collectionName) { ... }
}
```

---

## 2. Endpoint Map

### 2.1 Public Endpoints (No Auth)

| Method | Endpoint | Frontend Method | Used On | Purpose |
|---|---|---|---|---|
| `GET` | `/products` | `getAllProducts()` | Homepage, collections, cart, checkout | Fetch all products |
| `GET` | `/products/featured` | `getFeaturedProducts()` | Homepage (featured section) | Fetch featured products only |
| `GET` | `/products/:id` | `getProductById(id)` | Product detail page | Fetch single product |

### 2.2 Protected Endpoints (Admin Only)

| Method | Endpoint | Frontend Method | Used On | Purpose |
|---|---|---|---|---|
| `POST` | `/products/create` | — | Admin panel | Create new product |
| `PUT` | `/products/update/:id` | — | Admin panel | Update existing product |
| `DELETE` | `/products/delete/:id` | — | Admin panel | Delete product |
| `POST` | `/products/upload-payment-proof` | — | Checkout (payment proof) | Upload payment screenshot |
| `POST` | `/auth/register` | — | Admin login | Register admin user |
| `POST` | `/auth/login` | — | Admin login | Admin authentication |
| `GET` | `/admin/dashboard` | — | Admin panel | Dashboard HTML |

---

## 3. Request/Response Schemas

### 3.1 Product Object

```typescript
// Backend model: backend/models/Product.ts
interface Product {
  _id: string;                    // MongoDB ObjectId
  name: string;                   // Product name
  description?: string;           // Product description
  length?: string;                // Hair length
  lace?: string;                  // Lace type
  density?: string;               // Hair density
  texture?: string;               // Hair texture
  quality?: string;               // Hair quality
  price: number;                  // Regular price (Ghana Cedis)
  color?: string;                 // Hair color
  size?: ['Small' | 'Medium' | 'Large'];  // Available sizes
  onSale: boolean;                // Whether product is on sale
  promoPrice?: number;            // Sale price (if onSale is true)
  featured: boolean;              // Whether product is featured
  collections: string[];          // Collection names product belongs to
  coverImage: string;             // Main product image URL (Cloudinary)
  additionalImages: string[];     // Additional product images
  videos: string[];               // Product videos
  stock: number;                  // Stock quantity
  inStock: boolean;               // Whether product is in stock
  createdAt: Date;                // Auto-generated
  updatedAt: Date;                // Auto-generated
}
```

**Frontend uses only:** `_id`, `name`, `price`, `coverImage`, `onSale`, `promoPrice`, `inStock`, `collections`, `size`

### 3.2 Collections Enum

```typescript
type CollectionName =
  | 'The Bridal Crowns'
  | 'The Everyday Crown'
  | "The Queen's Curls"
  | 'The Signature Pixies';
```

### 3.3 Cart Item (Frontend Only)

```typescript
interface CartItem {
  product: Product;       // Full product object (stored in localStorage)
  quantity: number;       // Quantity in cart
  selectedSize?: string;  // Selected size (if product has multiple sizes)
}
```

### 3.4 Auth Response

```typescript
interface AuthResponse {
  token: string;          // JWT token
  message: string;        // "Login successful" or "Admin registered successfully"
}
```

### 3.5 Upload Response

```typescript
interface UploadResponse {
  url: string;            // Cloudinary URL of uploaded file
}
```

---

## 4. Frontend-Backend Communication Map

### 4.1 Homepage (`index.html`)

```
Page Load
  └─> GET /products/featured
       └─> renderProducts(products, #featured-products, 3)
            └─> For each product: ProductCard with image, name, price, add-to-cart
```

### 4.2 Collection Pages (`bridal-crowns.html`, etc.)

```
Page Load
  └─> GET /products
       └─> Client-side filter: products.filter(p => p.collections.includes(collectionName))
            └─> renderProducts(filteredProducts, #collections-products)
                 └─> For each product: ProductCard
```

**Note:** Collection filtering is done client-side because the backend does not have a collection filter endpoint. The frontend fetches ALL products and filters locally.

### 4.3 Product Detail (`product.html`)

```
Page Load (with ?id=xxx)
  └─> Parse URL param: productId
  └─> GET /products/:id
       └─> renderProductDetail(product)
            └─> Product image, name, description, price, add-to-cart
```

### 4.4 Cart (`cart.html`)

```
Page Load
  └─> Read cart from localStorage (no API call)
  └─> renderCart()
       └─> For each cart item: CartItem with product data from localStorage
```

**Note:** Cart data is stored entirely in `localStorage`. No API call is made to sync cart with backend.

### 4.5 Checkout (`checkout.html`)

```
Page Load
  └─> Read cart from localStorage
  └─> Display order summary (no API call)
  └─> Form submit
       └─> Validate form fields
       └─> POST /products/upload-payment-proof (if payment proof uploaded)
       └─> Clear localStorage cart
       └─> Show success message
       └─> Redirect to homepage after 3s
```

**Note:** Checkout is a simulation. No order is created in the database.

### 4.6 Booking (`book.html`)

```
Page Load
  └─> No API call
  └─> Form submit
       └─> Client-side validation only
       └─> Show success/error message
```

**Note:** Booking form does not submit to any backend endpoint.

---

## 5. Image URL Resolution

### 5.1 `getImageUrl()` Logic

```javascript
getImageUrl(path) {
    if (!path) return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image';
    
    if (path.startsWith('http')) {
        // Cloudinary URLs: https://res.cloudinary.com/... → pass through
        return path;
    } else if (path.startsWith('/uploads/')) {
        // Legacy local upload paths → placeholder
        return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Image+Unavailable';
    } else {
        // Relative paths → prepend API base URL
        return `${API_BASE_URL}${path}`;
    }
}
```

### 5.2 URL Format Decision Tree

```
path provided
    │
    ├── null/undefined → Placeholder image
    │
    ├── starts with "http" → Use as-is (Cloudinary, S3, etc.)
    │
    ├── starts with "/uploads/" → Placeholder (legacy, broken on Railway)
    │
    └── relative path → Prepend API_BASE_URL
```

### 5.3 Fallback Chain

1. `getImageUrl()` returns resolved URL
2. `<img onerror="this.src='https://via.placeholder.com/...'">` catches broken URLs
3. Both fall back to placeholder image with text "No Image" or "Image Unavailable"

---

## 6. Authentication Flow

### 6.1 Admin Authentication

```
POST /auth/login
  Body: { username, password }
  Response: { token, message }

// Token usage:
Authorization: Bearer <token>
```

### 6.2 JWT Configuration

```typescript
// backend/routes/auth.ts line 47
jwt.sign(
  { id: admin._id, username: admin.username },
  process.env.JWT_SECRET || 'default_secret',
  { expiresIn: '1h' }
)
```

- **Algorithm:** Default (HS256)
- **Expiry:** 1 hour
- **Payload:** `{ id, username }`
- **Fallback secret:** `'default_secret'` (should be overridden in production)

### 6.3 Auth Middleware

```typescript
// backend/middleware/auth.ts
// Extracts token from Authorization header
// Verifies with JWT_SECRET
// Attaches admin user to req object
```

---

## 7. Error Handling

### 7.1 API Service Error Handling

```javascript
async fetch(endpoint, options = {}) {
    const response = await fetch(url, { ... });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
```

**Gaps:**
- No timeout
- No retry logic
- No user-friendly error messages
- No network error handling (e.g., offline)
- No request cancellation

### 7.2 Frontend Error Handling

| Location | Pattern | Coverage |
|---|---|---|
| `renderProductDetail()` | `try/catch` | Product detail only |
| `showError()` function | Exists but rarely called | Not used in most pages |
| `renderProducts()` | No error handling | Silent failure |
| Checkout form | No network error handling | Only client validation |
| Booking form | No API call | N/A |

---

## 8. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (HTML/JS)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Header    │    │    Hero     │    │  Collections│     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                    │            │
│         ▼                  ▼                    ▼            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │Navigation   │    │Featured    │    │Collection  │     │
│  │             │    │Products    │    │Pages       │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                    │            │
│         └──────────────────┼────────────────────┘            │
│                            ▼                                 │
│                   ┌───────────────┐                          │
│                   │  APIService   │                          │
│                   │  (js/api.js)  │                          │
│                   └───────┬───────┘                          │
│                           │                                  │
│          ┌────────────────┼────────────────┐                 │
│          ▼                ▼                ▼                 │
│   ┌──────────┐      ┌──────────┐     ┌──────────┐           │
│   │/products │      │/products │     │/products │           │
│   │          │      │/featured │     │/:id      │           │
│   └──────────┘      └──────────┘     └──────────┘           │
│          │                │                  │               │
│          └────────────────┼──────────────────┘               │
│                           ▼                                  │
│              ┌──────────────────────┐                        │
│              │   BACKEND (Express)   │                        │
│              │  (Railway / Node.js)  │                        │
│              └──────────┬───────────┘                        │
│                         │                                    │
│          ┌──────────────┼──────────────┐                     │
│          ▼              ▼              ▼                     │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│   │ MongoDB  │    │Cloudinary│    │   JWT    │              │
│   │ (Products)│   │(Images)  │    │ (Auth)   │              │
│   └──────────┘    └──────────┘    └──────────┘              │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. API Migration Notes for Next.js

### 9.1 Environment Variable Migration

| Current | Next.js |
|---|---|
| Hardcoded in `js/api.js` | `NEXT_PUBLIC_API_URL` in `.env.local` |

```typescript
// src/lib/api.ts (Next.js version)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
```

### 9.2 Data Fetching Strategy

| Page Type | Strategy |
|---|---|
| Homepage (featured products) | Server Component: `fetch('/products/featured')` |
| Collection pages | Server Component: `fetch('/products')` + client-side filter |
| Product detail | Server Component: `fetch('/products/${id}')` |
| Cart | Client Component: `localStorage` + Context |
| Checkout | Client Component: `localStorage` + Context |

### 9.3 Caching Strategy

| Data | Cache Strategy |
|---|---|
| Featured products | Revalidate every 5 minutes (`next: { revalidate: 300 }`) |
| All products | Revalidate every 5 minutes |
| Single product | Revalidate every 5 minutes |
| Cart | No caching (localStorage) |

### 9.4 Image Handling Migration

| Current | Next.js |
|---|---|
| `getImageUrl()` in `js/api.js` | Next.js `<Image>` component with `loader` |
| Manual `onerror` fallback | Next.js `<Image>` built-in `onError` + `blurDataURL` |
| No image optimization | Next.js automatic WebP/AVIF conversion |

```typescript
// src/components/shared/ProductImage.tsx
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <Image
      src={src || '/placeholder.jpg'}
      alt={alt}
      width={400}
      height={400}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/placeholder.jpg';
      }}
    />
  );
}
```
