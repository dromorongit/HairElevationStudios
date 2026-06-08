# Hair Elevation Studio — API Layer Strategy

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — API Layer Strategy Defined  

---

## Overview

This document defines the API layer strategy for the Hair Elevation Studio frontend migration to Next.js + TypeScript. It covers API service structure, abstraction, error handling, typing, and environment management to ensure a robust, maintainable, and type-safe data fetching layer.

---

## 1. API Service Structure

### 1.1 Centralized API Service
**File:** `src/lib/api.ts`

```typescript
// src/lib/api.ts
import type { Product, CartItem } from '@/types/api'

/**
 * API Service Configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    message
    this.name = 'ApiError'
  }
}

/**
 * Core API service class
 */
class APIService {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  /**
   * Internal fetch method with error handling
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      // Handle HTTP errors
      if (!response.ok) {
        let errorData: unknown
        try {
          errorData = await response.json()
        } catch {
          errorData = await response.text()
        }

        throw new ApiError(
          response.status,
          response.statusText,
          errorData
        )
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      // Network errors or fetch failures
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        0,
        'Network error: Failed to fetch',
        error
      )
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, { method: 'GET', ...options })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    })
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, { method: 'DELETE', ...options })
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    })
  }
}

/**
 * Singleton API service instance
 */
export const apiService = new APIService()

/**
 * Product-specific API methods
 */
export const productAPI = {
  getAllProducts: () => apiService.get<Product[]>('/products'),
  getFeaturedProducts: () => apiService.get<Product[]>('/products/featured'),
  getProductById: (id: string) => apiService.get<Product>(`/products/${id}`),
  getProductsByCollection: (collectionName: string) => 
    apiService.get<Product[]>('/products').then(products =>
      products.filter(product => 
        product.collections && 
        product.collections.includes(collectionName)
      )
    ),
  createProduct: (data: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiService.post<Product>('/products/create', data),
  updateProduct: (id: string, data: Partial<Product>) => 
    apiService.put<Product>(`/products/update/${id}`, data),
  deleteProduct: (id: string) => 
    apiService.delete<{ message: string }>(`/products/delete/${id}`),
  uploadPaymentProof: (formData: FormData) => 
    apiService.post<{ url: string }>('/products/upload-payment-proof', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**
 * Authentication API methods
 */
export const authAPI = {
  login: (username: string, password: string) => 
    apiService.post<{ token: string; message: string }>('/auth/login', { username, password }),
  register: (username: string, password: string, email: string) => 
    apiService.post<{ message: string }>('/auth/register', { username, password, email })
}
```

### 1.2 Service Organization
- **Singleton Pattern:** Single instance of `APIService` to ensure consistent configuration
- **Resource-Specific Services:** Separate objects for different resources (`productAPI`, `authAPI`)
- **Extensible Design:** Easy to add new services for other resources (orders, users, etc.)
- **Base URL Configuration:** Centralized in one place with environment variable fallback

### 1.3 Request/Response Handling
- **Automatic JSON Parsing:** Requests automatically stringify JSON, responses automatically parse JSON
- **Error Transformation:** HTTP errors transformed into typed `ApiError` instances
- **Network Error Handling:** Catch-all for fetch failures and network issues
- **Empty Response Handling:** Special handling for 204 No Content responses
- **Type Safety:** Generic methods ensure correct typing of responses

---

## 2. API Abstraction Strategy

### 2.1 Thin Wrapper Approach
The API layer is designed as a thin wrapper around `fetch()` to:
- Minimize abstraction overhead
- Preserve flexibility for advanced use cases
- Avoid unnecessary dependencies
- Maintain direct control over HTTP semantics

### 2.2 Advanced Features
Despite being a thin wrapper, the API service includes:
- **Timeout Support:** Via `AbortController` in options
- **Retry Logic:** Optional retry mechanism for transient failures
- **Request Cancellation:** Automatic cleanup on unmount or prop changes
- **Progress Tracking:** Optional upload/download progress events
- **Cache Control:** Manual cache control headers when needed

### 2.3 Extension Points
The service is designed to be extended with:
- **Interceptors:** Request/response interceptors for auth, logging, etc.
- **Middleware:** Custom middleware for specific endpoints
- **Adapters:** Different adapters for different API versions or mocks
- **Mocking:** Easy mocking for testing and development

---

## 3. Error Handling Strategy

### 3.1 Error Types
```typescript
// src/lib/api.ts (continued)
interface ApiErrorInfo {
  status: number
  message: string
  data?: unknown
  timestamp: string
  endpoint?: string
  method?: string
}

class ApiError extends Error {
  public readonly status: number
  public readonly data: unknown
  public readonly timestamp: string
  public readonly endpoint?: string
  public readonly method?: string

  constructor(
    status: number,
    message: string,
    data?: unknown,
    options: { endpoint?: string; method?: string } = {}
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.timestamp = new Date().toISOString()
    this.endpoint = options.endpoint
    this.method = options.method
    
    // Maintains proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
```

### 3.2 Error Handling Patterns
1. **Service-Level Errors:** API service throws `ApiError` for all HTTP and network errors
2. **Component-Level Handling:** Components catch errors and convert to user-friendly messages
3. **Boundary-Level Handling:** Error boundaries catch unexpected errors for graceful degradation
4. **Logging:** Errors logged to external service in production (via Vercel or custom logger)
5. **User Feedback:** Toast notifications or inline error messages for recoverable errors

### 3.3 Error Recovery Strategies
- **Retry Mechanism:** Automatic retry for idempotent requests (GET, PUT, DELETE) on network errors
- **User Retry Option:** UI provides retry button for failed operations
- **Fallback Data:** Show cached or default data when API fails
- **Graceful Degradation:** Disable non-essential features when API is unavailable
- **Offline Queue:** Queue mutations for when connection is restored (future enhancement)

### 3.4 Error Classification
| Error Type | Status Range | Handling Strategy |
|------------|--------------|-------------------|
| Client Errors | 400-499 | Show user-friendly message, don't retry |
| Server Errors | 500-599 | Retry with exponential backoff |
| Network Errors | 0 | Retry with exponential backoff |
| Timeout Errors | - | Retry once with longer timeout |
| Aborted Errors | - | No retry (intentional cancellation) |

---

## 4. API Typing Strategy

### 4.1 Type Organization
```
src/types/
├── api/
│   ├── product.ts        # Product-related types
│   ├── cart.ts           # Cart-related types
│   ├── auth.ts           # Authentication-related types
│   ├── order.ts          # Order-related types (future)
│   └── index.ts          # Barrel exports
├── ui/                   # UI-specific types (props, state)
│   ├── button.ts
│   ├── input.ts
│   └── index.ts
└── index.ts              # Barrel exports for all types
```

### 4.2 Product Types (from backend contract)
```typescript
// src/types/api/product.ts
export interface Product {
  _id: string
  name: string
  description?: string
  length?: string
  lace?: string
  density?: string
  texture?: string
  quality?: string
  price: number
  color?: string
  size?: 'Small' | 'Medium' | 'Large'
  onSale: boolean
  promoPrice?: number
  featured: boolean
  collections: CollectionName[]
  coverImage: string
  additionalImages: string[]
  videos: string[]
  stock: number
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

export type CollectionName =
  | 'The Bridal Crowns'
  | 'The Everyday Crown'
  | "The Queen's Curls"
  | 'The Signature Pixies'

export interface ProductFilters {
  collection?: CollectionName
  featured?: boolean
  onSale?: boolean
  inStock?: boolean
  minPrice?: number
  maxPrice?: number
  search?: string
}
```

### 4.3 Cart Types
```typescript
// src/types/api/cart.ts
export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: 'Small' | 'Medium' | 'Large'
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY' | 'UPDATE_SIZE' | 'CLEAR_CART'
  payload?: any
}
```

### 4.4 Authentication Types
```typescript
// src/types/api/auth.ts
export interface AuthResponse {
  token: string
  message: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  email: string
}
```

### 4.5 Request/Response Typing
```typescript
// Example of typed API usage in components
async function loadProduct(id: string) {
  try {
    const product: Product = await productAPI.getProductById(id)
    return product
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle specific error cases
      if (error.status === 404) {
        throw new Error('Product not found')
      }
    }
    throw error
  }
}
```

### 4.6 Type Safety Practices
- **Exact Types:** Use exact types when possible to prevent excess property errors
- **Readonly Types:** Mark API response types as readonly when appropriate
- **Nullable Fields:** Explicitly mark fields that can be null or undefined
- **Discriminated Unions:** Use for API responses with different shapes based on status
- **Utility Types:** Leverage TypeScript utility types (Pick, Omit, Partial, Required)

---

## 5. Environment Variable Management

### 5.1 Configuration Files
```
.env.example          # Committed template with required variables
.env.local            # Local development (gitignored)
.env.production       # Production (managed by Vercel)
.env.preview          # Preview deployments (managed by Vercel)
```

### 5.2 Required Variables
```env
# .env.example
NEXT_PUBLIC_API_URL=https://hairelevationstudios-production.up.railway.app
NEXT_PUBLIC_APP_NAME=Hair Elevation Studio
NEXT_PUBLIC_APP_DESCRIPTION=Luxury hair accessories and crowns
```

### 5.3 Variable Usage
```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Validate required variables at build time
if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn('NEXT_PUBLIC_API_URL is not set, falling back to localhost')
}
```

### 5.4 Client-Side Only Variables
- **Prefix:** All client-side environment variables must use `NEXT_PUBLIC_` prefix
- **Exposure:** These variables are exposed to the browser, so never store secrets
- **Validation:** Validate format and values where appropriate
- **Fallbacks:** Provide sensible fallbacks for development

### 5.5 Server-Side Variables (Future)
For future backend integration or server-only features:
- **Prefix:** No prefix or `SERVER_` prefix
- **Location:** Used only in Server Components or API routes
- **Security:** Can store secrets like API keys, database credentials
- **Management:** Handled by Vercel environment variables

### 5.6 Runtime Configuration
```typescript
// src/lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Hair Elevation Studio',
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '',
  features: {
    enableReviews: process.env.NEXT_PUBLIC_ENABLE_REVIEWS === 'true',
    enableWishlist: process.env.NEXT_PUBLIC_ENABLE_WISHLIST === 'true',
    enableCompare: process.env.NEXT_PUBLIC_ENABLE_COMPARE === 'true',
  },
  pagination: {
    defaultPageSize: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE) || 12,
  },
} as const
```

---

## 6. Caching and Revalidation Strategy

### 6.1 Built-in Next.js Caching
Leverage Next.js App Router caching mechanisms:
- **Automatic GET Caching:** GET requests are automatically cached
- **Cache Tagging:** Use `next/cache` for manual cache control
- **Revalidation:** Time-based or on-demand revalidation
- **Fetch Options:** Control caching behavior per request

### 6.2 API Service Caching Enhancements
```typescript
// Enhanced fetch method with caching options
private async fetch<T>(
  endpoint: string,
  options: RequestInit = {},
  cacheOptions: { 
    next?: { revalidate?: number | false; tags?: string[] } 
  } = {}
): Promise<T> {
  // Convert cacheOptions to fetch options
  const fetchOptions: RequestInit = {
    ...options,
    next: cacheOptions.next
  }

  // ... rest of fetch logic
}

// Usage examples:
// Revalidate every 5 minutes
const featuredProducts = await productAPI.getFeaturedProducts(undefined, {
  next: { revalidate: 300 }
})

// Revalidate on tag change
const product = await productAPI.getProductById(id, undefined, {
  next: { tags: [`product-${id}`] }
})
```

### 6.3 Client-Side Caching (When Needed)
For cases where client-side caching is beneficial:
- **React Query/TanStack Query:** Consider for complex caching needs
- **SWR:** Alternative for simple client-side caching
- **Custom Cache:** Simple Map-based cache with TTL for specific use cases
- **localStorage:** For persisting data like cart (already handled separately)

### 6.4 Cache Invalidation Strategies
- **Time-Based:** Automatic revalidation after set time
- **Event-Based:** Revalidate on specific actions (product update, etc.)
- **Manual:** Manual revalidation via API routes or revalidateTag
- **Smart Invalidation:** Combine time and event-based for optimal performance

---

## 7. Request/Response Interceptors

### 7.1 Request Interceptors
```typescript
// Example request interceptor for auth
class APIServiceWithAuth extends APIService {
  private authToken: string | null = null

  setAuthToken(token: string | null) {
    this.authToken = token
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers(options.headers ?? {})
    
    // Add auth token if available
    if (this.authToken) {
      headers.set('Authorization', `Bearer ${this.authToken}`)
    }

    // Add common headers
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    return super.fetch<T>(endpoint, {
      ...options,
      headers
    })
  }
}
```

### 7.2 Response Interceptors
```typescript
// Example response interceptor for logging
class APIServiceWithLogging extends APIService {
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const startTime = performance.now()
    
    try {
      const result = await super.fetch<T>(endpoint, options)
      const endTime = performance.now()
      
      // Log successful request
      console.log(`API Request: ${endpoint} - ${endTime - startTime}ms`)
      
      return result
    } catch (error) {
      const endTime = performance.now()
      
      // Log failed request
      console.error(`API Error: ${endpoint} - ${endTime - startTime}ms`, error)
      
      throw error
    }
  }
}
```

### 7.3 Practical Implementation
For Hair Elevation Studio, the basic API service is sufficient initially. Interceptors can be added as needed:
- **Authentication:** When admin features are implemented
- **Logging:** For debugging and monitoring
- **Retry Logic:** For transient network issues
- **Request Queuing:** For offline support

---

## 8. Testing Strategy

### 8.1 Unit Testing the API Service
```typescript
// src/lib/api.test.ts
import { apiService } from './api'
import { Product } from '@/types/api'

describe('API Service', () => {
  beforeEach(() => {
    // Mock fetch API
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('get', () => {
    it('should make GET request with correct parameters', async () => {
      const mockData: Product = { /* mock product */ }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      })

      const result = await apiService.get<Product>('/test')
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'GET' })
      )
      expect(result).toEqual(mockData)
    })
  })

  describe('error handling', () => {
    it('should throw ApiError on HTTP error', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Not found' })
      })

      await expect(apiService.get('/nonexistent')).rejects.toThrow(ApiError)
    })

    it('should throw ApiError on network error', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
      
      await expect(apiService.get('/test')).rejects.toThrow(ApiError)
    })
  })
})
```

### 8.2 Integration Testing
- **Mock Service Worker (MSW):** Mock API endpoints for integration tests
- **End-to-End Testing:** Cypress tests that interact with real API (staging environment)
- **Contract Testing:** Ensure API responses match TypeScript types

### 8.3 Testing Best Practices
- **Mock External Dependencies:** Never hit real API in unit tests
- **Test Error Cases:** Ensure proper error handling for all scenarios
- **Test Edge Cases:** Empty responses, malformed data, timeouts
- **Test Loading States:** Verify loading and error UI states
- **Test Cache Behavior:** When using caching features

---

## 9. Performance Considerations

### 9.1 Bundle Size
- **Minimal Dependencies:** API service uses only built-in `fetch()` - zero dependencies
- **Tree-Shaking:** ES modules allow unused functions to be removed
- **Code Splitting:** Dynamic imports for non-critical API services

### 9.2 Request Optimization
- **Connection Reuse:** Modern browsers reuse HTTP connections automatically
- **Request Batching:** Consider batching multiple GET requests when beneficial
- **Payload Minimization:** Only request needed fields (when backend supports it)
- **Compression:** Rely on server-side gzip/brotli compression

### 9.3 Memory Management
- **AbortController:** Properly abort requests to prevent memory leaks
- **Event Listener Cleanup:** Remove any event listeners created
- **Data Transformation:** Transform data immediately to avoid storing raw responses

### 9.4 Monitoring and Metrics
- **Request Timing:** Track API request duration for performance monitoring
- **Error Rates:** Monitor API error rates for alerting
- **Usage Patterns:** Track which endpoints are called most frequently
- **Payload Sizes:** Monitor request/response sizes for optimization opportunities

---

## 10. Migration Strategy

### 10.1 Incremental Migration
- **Parallel Operation:** New API service coexists with existing `js/api.js`
- **Route-by-Route Migration:** Migrate API usage as each route is migrated to Next.js
- **Feature Flags:** Use feature flags to switch between old and new API service
- **Backward Compatibility:** Ensure new service maintains same interface where possible

### 10.2 Handling Existing API Usage
During migration, existing code in `js/api.js` and `js/main.js` will continue to work:
- **No Breaking Changes:** Existing API contract remains unchanged
- **Gradual Migration:** Migrate components to use new API service one at a time
- **Consistent Behavior:** New service replicates exact behavior of `getImageUrl()` and other helpers

### 10.3 Migration Steps
1. **Create new API service** in `src/lib/api.ts`
2. **Migrate data fetching** in Server Components to use new service
3. **Migrate client-side data fetching** in Client Components to use new service
4. **Update hooks** to use new service
5. **Remove old API usage** as components are migrated
6. **Delete `js/api.js`** once all migration is complete

### 10.4 Risk Mitigation
- **Behavioral Parity:** New service must match existing `js/api.js` behavior exactly
- **Error Handling:** Preserve same error handling patterns
- **URL Resolution:** Maintain exact `getImageUrl()` logic
- **Backward Compatibility:** Ensure no breaking changes to existing functionality
- **Testing:** Comprehensive test suite to prevent regressions

---

## 11. Conclusion

This API layer strategy provides a robust, type-safe, and maintainable foundation for data fetching in the Hair Elevation Studio Next.js application. By following this strategy, the development team will achieve:

- **Type Safety:** Full TypeScript support from API to UI
- **Consistency:** Standardized approach to data fetching across the application
- **Maintainability:** Clear separation of concerns and extensible design
- **Performance:** Efficient requests with proper error handling and caching options
- **Developer Experience:** Excellent DX with autocompletion, error prevention, and debugging
- **Migration Safety:** Incremental migration path with minimal risk

The API service is designed to be simple yet powerful, providing just enough abstraction to improve developer experience without sacrificing performance or flexibility. As the application grows, the strategy can be extended with advanced features like caching, retry logic, and request queuing.

---
*This API layer strategy is locked and must be followed during Phase 1 frontend migration.*