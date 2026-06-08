# Hair Elevation Studio — TypeScript Standards

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — TypeScript Standards Defined  

---

## Overview

This document defines the TypeScript standards for the Hair Elevation Studio frontend migration to Next.js + TypeScript. It covers strict mode policy, typing conventions, interface/type organization, API response typing strategy, and naming conventions to ensure type safety, maintainability, and developer productivity.

---

## 1. Strict Mode Policy

### 1.1 Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "useUnknownInCatchVariables": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 1.2 Strict Mode Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| `strict: true` | Enables all strict type-checking options | **Required** |
| `noImplicitAny` | Raises error on expressions/declarations with implied `any` type | **Required** |
| `strictNullChecks` | `null` and `undefined` have their own types | **Required** |
| `strictFunctionTypes` | Check parameters in function types bivariantly | **Required** |
| `strictBindCallApply` | Check `bind`, `call`, and `apply` methods | **Required** |
| `strictPropertyInitialization` | Check for class properties initialization | **Required** |
| `noImplicitThis` | Raise error on `this` expressions with implied `any` type | **Required** |
| `alwaysStrict` | Parse in strict mode and emit `"use strict"` | **Required** |
| `noUnusedLocals` | Report errors on unused local variables | **Required** |
| `noUnusedParameters` | Report errors on unused parameters | **Required** |
| `noImplicitReturns` | Report error when not all code paths return a value | **Required** |
| `noFallthroughCasesInSwitch` | Report errors for fallthrough cases in switch statements | **Required** |
| `noUncheckedIndexedAccess` | Include `undefined` in index signature results | **Required** |
| `noImplicitOverride` | Require `override` keyword for overridden methods | **Required** |
| `noPropertyAccessFromIndexSignature` | Require dot notation for index signatures | **Required** |
| `exactOptionalPropertyTypes` | Differentiate between optional and `undefined` | **Required** |
| `useUnknownInCatchVariables` | Use `unknown` for catch clause variables | **Required** |

### 1.3 Exceptions
- **Test Files:** `noUnusedLocals` and `noUnusedParameters` may be relaxed in test files
- **Third-Party Types:** May need `// @ts-ignore` for untyped third-party libraries (document with comment)
- **Dynamic Code:** May need `any` for truly dynamic scenarios (document with comment and ticket)

---

## 2. Typing Conventions

### 2.1 Interfaces vs Types

| Use Case | Recommendation | Example |
|----------|----------------|---------|
| Object shapes | `interface` | `interface Product { ... }` |
| Union/Intersection types | `type` | `type Status = 'active' \| 'inactive'` |
| Function signatures | `type` | `type Handler = (event: Event) => void` |
| Mapped types | `type` | `type Readonly<T> = { readonly [K in keyof T]: T[K] }` |
| Tuple types | `type` | `type Point = [number, number]` |
| Conditional types | `type` | `type NonNullable<T> = T extends null \| undefined ? never : T` |

**Rule of Thumb:** Use `interface` for object shapes that might be extended or implemented; use `type` for everything else.

### 2.2 Interface Declaration Style
```typescript
// ✅ Good: Interface for object shape
interface Product {
  _id: string
  name: string
  price: number
  onSale: boolean
  coverImage: string
}

// ✅ Good: Interface with optional properties
interface ProductFilters {
  collection?: string
  featured?: boolean
  minPrice?: number
  maxPrice?: number
}

// ✅ Good: Interface extending another
interface ProductWithDetails extends Product {
  description: string
  additionalImages: string[]
}

// ❌ Bad: Using type for simple object shape
type Product = {
  _id: string
  name: string
  price: number
}
```

### 2.3 Type Declaration Style
```typescript
// ✅ Good: Type for union
type CollectionName = 'The Bridal Crowns' | 'The Everyday Crown' | "The Queen's Curls" | 'The Signature Pixies'

// ✅ Good: Type for function
type ProductCallback = (product: Product) => void

// ✅ Good: Type for tuple
type Coordinates = [number, number]

// ✅ Good: Type for mapped type
type ReadonlyProduct = Readonly<Product>

// ❌ Bad: Using interface for union
interface CollectionName {
  kind: 'bridal-crowns' | 'everyday-crown' | 'queens-curls' | 'signature-pixies'
}
```

### 2.4 Optional vs Required Properties
```typescript
// ✅ Good: Explicit optional with ?
interface Product {
  _id: string          // Required
  name: string         // Required
  description?: string // Optional
  promoPrice?: number  // Optional
}

// ✅ Good: Explicit undefined
interface Product {
  description: string | undefined
}

// ❌ Bad: Implicit any
interface Product {
  description: any
}

// ❌ Bad: Non-null assertion without justification
interface Product {
  description!: string
}
```

### 2.5 Avoiding `any`
```typescript
// ❌ Bad: Using any
function processData(data: any) {
  return data.map((item: any) => item.name)
}

// ✅ Good: Using unknown with type guard
function processData(data: unknown) {
  if (Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null && 'name' in item)) {
    return data.map(item => (item as { name: string }).name)
  }
  throw new Error('Invalid data format')
}

// ✅ Good: Using generics
function processData<T extends { name: string }>(data: T[]): string[] {
  return data.map(item => item.name)
}

// ✅ Good: Using specific type
function processData(data: Product[]): string[] {
  return data.map(item => item.name)
}
```

### 2.6 Type Assertions
```typescript
// ✅ Good: Type assertion when you know more than TypeScript
const element = document.getElementById('root') as HTMLElement

// ✅ Good: Type assertion with non-null assertion (when you're certain)
const value = data.value!

// ✅ Good: Type assertion with const assertion
const routes = ['/', '/about', '/services'] as const
type Route = typeof routes[number] // '/'

// ❌ Bad: Overusing type assertions
const value = data as any

// ❌ Bad: Type assertion without justification
const value = data as Product
```

---

## 3. Interface/Type Organization

### 3.1 Directory Structure
```
src/types/
├── api/                    # API-related types
│   ├── product.ts          # Product types
│   ├── cart.ts             # Cart types
│   ├── auth.ts             # Auth types
│   ├── order.ts            # Order types (future)
│   └── index.ts            # Barrel exports
├── ui/                     # UI-related types
│   ├── button.ts           # Button props
│   ├── input.ts            # Input props
│   ├── modal.ts            # Modal props
│   └── index.ts            # Barrel exports
├── hooks/                  # Hook-related types
│   ├── useCart.ts          # Cart hook types
│   └── index.ts            # Barrel exports
├── utils/                  # Utility types
│   ├── format.ts           # Format utility types
│   └── index.ts            # Barrel exports
└── index.ts                # Main barrel export
```

### 3.2 Barrel Exports
```typescript
// src/types/api/index.ts
export * from './product'
export * from './cart'
export * from './auth'

// src/types/index.ts
export * from './api'
export * from './ui'
export * from './hooks'
export * from './utils'
```

### 3.3 File Organization Within Types
- **One Type Per File:** Each file focuses on a single domain or component
- **Alphabetical Order:** Types within files organized alphabetically
- **Grouped by Purpose:** Related types grouped together with comments
- **Exported Types:** All public types exported from their module
- **Internal Types:** Non-exported types for internal use only

### 3.4 Example: Product Types File
```typescript
// src/types/api/product.ts

/**
 * Product collection names
 */
export type CollectionName =
  | 'The Bridal Crowns'
  | 'The Everyday Crown'
  | "The Queen's Curls"
  | 'The Signature Pixies'

/**
 * Product size options
 */
export type ProductSize = 'Small' | 'Medium' | 'Large'

/**
 * Product model from backend
 */
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
  size?: ProductSize
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

/**
 * Product creation input (excludes auto-generated fields)
 */
export type CreateProductInput = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>

/**
 * Product update input (partial update)
 */
export type UpdateProductInput = Partial<Omit<Product, '_id' | 'createdAt' | 'updatedAt'>>

/**
 * Product filter options
 */
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

---

## 4. API Response Typing Strategy

### 4.1 Response Type Patterns
```typescript
// Single object response
interface GetProductResponse {
  product: Product
}

// Array response
interface GetProductsResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
}

// Error response
interface ApiErrorResponse {
  error: string
  message: string
  details?: Record<string, string[]>
}

// Success response with message
interface SuccessResponse {
  message: string
  data?: unknown
}
```

### 4.2 Typed API Methods
```typescript
// src/services/productService.ts
import { apiService } from '@/lib/api'
import type { Product, ProductFilters, CreateProductInput, UpdateProductInput } from '@/types/api'

export const productService = {
  /**
   * Fetch all products with optional filters
   */
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams()
    if (filters?.collection) params.append('collection', filters.collection)
    if (filters?.featured) params.append('featured', 'true')
    if (filters?.onSale) params.append('onSale', 'true')
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    if (filters?.search) params.append('search', filters.search)

    const queryString = params.toString()
    return apiService.get<Product[]>(`/products${queryString ? `?${queryString}` : ''}`)
  },

  /**
   * Fetch featured products
   */
  async getFeatured(): Promise<Product[]> {
    return apiService.get<Product[]>('/products/featured')
  },

  /**
   * Fetch single product by ID
   */
  async getById(id: string): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`)
  },

  /**
   * Create new product (admin only)
   */
  async create(data: CreateProductInput): Promise<Product> {
    return apiService.post<Product>('/products/create', data)
  },

  /**
   * Update existing product (admin only)
   */
  async update(id: string, data: UpdateProductInput): Promise<Product> {
    return apiService.put<Product>(`/products/update/${id}`, data)
  },

  /**
   * Delete product (admin only)
   */
  async delete(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`/products/delete/${id}`)
  },
}
```

### 4.3 Type Guards
```typescript
// src/types/utils/typeGuards.ts

/**
 * Type guard for Product
 */
export function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_id' in value &&
    'name' in value &&
    'price' in value &&
    typeof (value as Product)._id === 'string' &&
    typeof (value as Product).name === 'string' &&
    typeof (value as Product).price === 'number'
  )
}

/**
 * Type guard for ApiError
 */
export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError
}

/**
 * Type guard for array of Products
 */
export function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct)
}
```

### 4.4 Discriminated Unions
```typescript
// src/types/api/result.ts

/**
 * Result type for operations that can succeed or fail
 */
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Create success result
 */
export function success<T>(data: T): Result<T, never> {
  return { success: true, data }
}

/**
 * Create failure result
 */
export function failure<E>(error: E): Result<never, E> {
  return { success: false, error }
}

// Usage
async function fetchProduct(id: string): Promise<Result<Product, ApiError>> {
  try {
    const product = await productService.getById(id)
    return success(product)
  } catch (error) {
    if (error instanceof ApiError) {
      return failure(error)
    }
    return failure(new Error('Unknown error'))
  }
}
```

---

## 5. Naming Conventions

### 5.1 General Rules
- **camelCase:** Variables, functions, methods, properties, parameters
- **PascalCase:** Classes, interfaces, types, enums, components
- **UPPER_SNAKE_CASE:** Constants, enum values
- **kebab-case:** File names (except components), URLs, CSS classes

### 5.2 Interface Naming
```typescript
// ✅ Good: PascalCase, descriptive
interface ProductCardProps { ... }
interface CartState { ... }
interface ApiResponse<T> { ... }

// ❌ Bad: Generic names
interface Props { ... }
interface Data { ... }
interface Response { ... }
```

### 5.3 Type Naming
```typescript
// ✅ Good: PascalCase, descriptive
type ProductStatus = 'active' | 'inactive'
type CartItem = { product: Product; quantity: number }
type ApiHandler = (req: Request) => Promise<Response>

// ❌ Bad: Generic names
type Status = 'active' | 'inactive'
type Item = { product: Product; quantity: number }
type Handler = (req: Request) => Promise<Response>
```

### 5.4 Generic Type Parameters
```typescript
// ✅ Good: Descriptive single letters for simple cases
function identity<T>(arg: T): T { return arg }
function first<T>(arr: T[]): T | undefined { return arr[0] }

// ✅ Good: Descriptive names for complex cases
function createApiResponse<TData, TError = Error>(data: TData, error?: TError) { ... }
function mapArray<TItem, TResult>(arr: TItem[], fn: (item: TItem) => TResult): TResult[] { ... }

// ❌ Bad: Non-descriptive or overly complex
function createResponse<A, B, C>(a: A, b?: B, c?: C) { ... }
```

### 5.5 Boolean Naming
```typescript
// ✅ Good: Positive, descriptive
const isVisible = true
const hasError = false
const canSubmit = true
const shouldRender = false
const isLoading = true

// ❌ Bad: Negative or ambiguous
const notHidden = true
const errorExists = false
const submitAllowed = true
const renderFlag = false
const loading = true
```

### 5.6 Function Naming
```typescript
// ✅ Good: Verb-first, descriptive
function getProductById(id: string): Product { ... }
function calculateCartTotal(items: CartItem[]): number { ... }
function validateEmail(email: string): boolean { ... }
function formatCurrency(amount: number): string { ... }

// ❌ Bad: Noun or ambiguous
function product(id: string): Product { ... }
function cartTotal(items: CartItem[]): number { ... }
function email(email: string): boolean { ... }
function currency(amount: number): string { ... }
```

### 5.7 Event Handler Naming
```typescript
// ✅ Good: on + EventName
const onClick = () => { ... }
const onChange = (e: ChangeEvent) => { ... }
const onSubmit = (e: FormEvent) => { ... }
const onMouseEnter = () => { ... }

// ❌ Bad: Non-standard naming
const handleClick = () => { ... }
const changeHandler = (e: ChangeEvent) => { ... }
const submit = (e: FormEvent) => { ... }
```

---

## 6. Type Safety Best Practices

### 6.1 Avoid Type Assertions
```typescript
// ❌ Bad: Unnecessary type assertion
const product = data as Product

// ✅ Good: Type guard
if (isProduct(data)) {
  const product = data // Type narrowed to Product
}

// ✅ Good: Type guard with early return
if (!isProduct(data)) {
  throw new Error('Invalid product data')
}
const product = data // Type narrowed to Product
```

### 6.2 Use `unknown` for Untrusted Data
```typescript
// ❌ Bad: Using any for untrusted data
function parseJSON(json: string): any {
  return JSON.parse(json)
}

// ✅ Good: Using unknown for untrusted data
function parseJSON(json: string): unknown {
  return JSON.parse(json)
}

// ✅ Good: Type guard for parsed data
function parseProduct(json: string): Product {
  const data = JSON.parse(json)
  if (isProduct(data)) {
    return data
  }
  throw new Error('Invalid product JSON')
}
```

### 6.3 Discriminated Unions for State
```typescript
// ✅ Good: Discriminated union for async state
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// Usage
function ProductLoader({ id }: { id: string }) {
  const [state, setState] = useState<AsyncState<Product>>({ status: 'idle' })

  useEffect(() => {
    setState({ status: 'loading' })
    productService.getById(id)
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error }))
  }, [id])

  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>
    case 'loading':
      return <LoadingSpinner />
    case 'success':
      return <ProductCard product={state.data} />
    case 'error':
      return <ErrorMessage error={state.error} />
  }
}
```

### 6.4 Readonly for Immutability
```typescript
// ✅ Good: Readonly for immutable data
interface Product {
  readonly _id: string
  name: string
  price: number
}

// ✅ Good: Readonly array
const products: readonly Product[] = []

// ✅ Good: Readonly utility type
type ReadonlyProduct = Readonly<Product>
type ReadonlyArray<T> = Readonly<T[]>

// ❌ Bad: Mutable when should be immutable
interface Product {
  _id: string
  name: string
  price: number
}
```

### 6.5 Exact Types for API Responses
```typescript
// ✅ Good: Exact type for API response
interface GetProductResponse {
  product: Product
}

// ❌ Bad: Loose type allows extra properties
interface GetProductResponse {
  product: Product
  [key: string]: unknown
}

// ✅ Good: Use exact type with utility
type Exact<T, Shape> = T extends Shape ? (Exclude<keyof T, keyof Shape> extends never ? T : never) : never
type GetProductResponseExact = Exact<{ product: Product; extra: string }, { product: Product }> // Error
```

---

## 7. Component Typing

### 7.1 Props Typing
```typescript
// ✅ Good: Explicit props interface
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  className,
}: ButtonProps) {
  // Component implementation
}

// ✅ Good: Extending HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  // Component implementation
}
```

### 7.2 Children Typing
```typescript
// ✅ Good: Explicit children type
interface CardProps {
  children: React.ReactNode
  title?: string
}

// ✅ Good: Render prop pattern
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

// ✅ Good: Component as children
interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}
```

### 7.3 Event Handler Typing
```typescript
// ✅ Good: Typed event handlers
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// ✅ Good: Form event handlers
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// ✅ Good: Custom event handlers
interface ProductCardProps {
  onAddToCart: (productId: string, quantity: number) => void
  onViewDetails: (productId: string) => void
}
```

### 7.4 Ref Typing
```typescript
// ✅ Good: Forwarded ref with proper typing
interface InputRefProps {
  forwardedRef?: React.Ref<HTMLInputElement>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...props} />
        {error && <span>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

---

## 8. Hook Typing

### 8.1 Custom Hook Typing
```typescript
// ✅ Good: Typed custom hook
interface UseCartReturn {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product, quantity: number, size?: ProductSize) => void
  removeItem: (productId: string, size?: ProductSize) => void
  updateQuantity: (productId: string, quantity: number, size?: ProductSize) => void
  clearCart: () => void
}

export function useCart(): UseCartReturn {
  // Hook implementation
}

// ✅ Good: Generic custom hook
interface UseAsyncReturn<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  execute: () => Promise<T>
}

export function useAsync<T>(asyncFunction: () => Promise<T>): UseAsyncReturn<T> {
  // Hook implementation
}
```

### 8.2 Hook Return Types
```typescript
// ✅ Good: Return object with named properties
interface UseMediaQueryReturn {
  matches: boolean
  media: string
}

// ✅ Good: Tuple return for state-like hooks
type UseToggleReturn = [boolean, (value?: boolean) => void]

// ✅ Good: Discriminated union for state hooks
type UseAsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
```

---

## 9. Utility Types

### 9.1 Common Utility Types
```typescript
// src/types/utils/index.ts

/**
 * Make all properties optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties required
 */
export type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties readonly
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * Pick specific properties from T
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * Omit specific properties from T
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Extract union members assignable to U
 */
export type Extract<T, U> = T extends U ? T : never

/**
 * Exclude union members assignable to U
 */
export type Exclude<T, U> = T extends U ? never : T

/**
 * Non-nullable type
 */
export type NonNullable<T> = T extends null | undefined ? never : T

/**
 * Function return type
 */
export type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never

/**
 * Function parameters type
 */
export type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
```

### 9.2 Custom Utility Types
```typescript
// src/types/utils/index.ts

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Value of union type
 */
export type ValueOf<T> = T[keyof T]

/**
 * Nullable type
 */
export type Nullable<T> = T | null

/**
 * Maybe type (null or undefined)
 */
export type Maybe<T> = T | null | undefined
```

---

## 10. ESLint Configuration for TypeScript

### 10.1 ESLint Config
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // React rules
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-state': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],

    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Accessibility rules
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-tabindex': 'error',
    'jsx-a11y/no-noninteractive-to-interactive-role': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',

    // Import rules
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'warn',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
}
```

---

## 11. Prettier Configuration

### 11.1 Prettier Config
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "singleAttributePerLine": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 11.2 Prettier Ignore
```
# .prettierignore
node_modules
.next
out
dist
build
coverage
*.min.js
*.min.css
public
```

---

## 12. TypeScript Best Practices

### 12.1 General Principles
1. **Type Everything:** Avoid `any` at all costs
2. **Prefer Interfaces:** Use `interface` for object shapes
3. **Use Type Inference:** Let TypeScript infer types when obvious
4. **Avoid Type Assertions:** Use type guards instead
5. **Use Discriminated Unions:** For state and variant types
6. **Prefer Readonly:** For immutable data
7. **Use Generics:** For reusable, type-safe code
8. **Document Complex Types:** Use JSDoc for complex type definitions

### 12.2 Common Patterns

#### 12.2.1 Type Guards
```typescript
function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_id' in value &&
    'name' in value &&
    'price' in value
  )
}
```

#### 12.2.2 Discriminated Unions
```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error }
```

#### 12.2.3 Mapped Types
```typescript
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type Partial<T> = { [K in keyof T]?: T[K] }
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

#### 12.2.4 Conditional Types
```typescript
type NonNullable<T> = T extends null | undefined ? never : T
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
```

#### 12.2.5 Template Literal Types
```typescript
type EventName = `on${Capitalize<string>}`
type ClickEvent = 'onClick'
type MouseEnterEvent = 'onMouseEnter'

type ApiEndpoint = `/api/${string}`
type ProductEndpoint = '/api/products'
type UserEndpoint = '/api/users'
```

---

## 13. Conclusion

These TypeScript standards provide a comprehensive foundation for type-safe, maintainable, and developer-friendly code in the Hair Elevation Studio frontend. By following these standards, the development team will:

- **Catch Errors Early:** TypeScript catches bugs at compile time
- **Improve DX:** Excellent autocompletion and IntelliSense
- **Enable Refactoring:** Confidence when making large-scale changes
- **Document Code:** Types serve as inline documentation
- **Ensure Consistency:** Standardized patterns across the codebase
- **Scale Team:** Easier onboarding and collaboration

The strict mode policy ensures maximum type safety, while the conventions provide clear guidance for common scenarios. These standards are designed to be practical and enforceable, balancing safety with developer productivity.

---
*These TypeScript standards are locked and must be followed during Phase 1 frontend migration.*