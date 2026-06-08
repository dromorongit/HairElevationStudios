# Hair Elevation Studio — Performance & SEO Strategy

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — Performance & SEO Strategy Defined  

---

## Overview

This document defines the performance optimization and SEO strategy for the Hair Elevation Studio frontend migration to Next.js + TypeScript. It covers Core Web Vitals targets, image optimization, lazy loading, bundle optimization, metadata management, structured data, and accessibility standards to ensure excellent user experience and search engine visibility.

---

## 1. Performance Architecture

### 1.1 Core Web Vitals Targets

| Metric | Target | Current (Est.) | Migration Goal |
|--------|--------|----------------|----------------|
| **Largest Contentful Paint (LCP)** | < 2.5s | ~3-5s (15MB hero) | < 2.0s |
| **First Input Delay (FID)** | < 100ms | ~150ms | < 50ms |
| **Cumulative Layout Shift (CLS)** | < 0.1 | ~0.15 | < 0.05 |
| **First Contentful Paint (FCP)** | < 1.8s | ~2.5s | < 1.5s |
| **Time to Interactive (TTI)** | < 3.8s | ~4.5s | < 3.0s |
| **Total Blocking Time (TBT)** | < 300ms | ~400ms | < 200ms |

### 1.2 Performance Budget

| Resource | Budget | Rationale |
|----------|--------|-----------|
| **Total JavaScript** | < 300KB (gzipped) | Keep initial load fast |
| **Total CSS** | < 50KB (gzipped) | Tailwind purging should keep this small |
| **Largest Image** | < 200KB | Optimized hero image |
| **Fonts** | < 100KB | Subset fonts if needed |
| **Third-Party Scripts** | < 50KB | Minimize external dependencies |

### 1.3 Performance Monitoring

#### 1.3.1 Built-in Next.js Metrics
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

#### 1.3.2 Web Vitals Tracking
```typescript
// src/lib/webVitals.ts
export function reportWebVitals(metric: any) {
  // Send to analytics
  if (typeof window !== 'undefined') {
    const body = JSON.stringify(metric)
    (navigator.sendBeacon && navigator.sendBeacon('/api/analytics', body)) ||
      fetch('/api/analytics', { body, method: 'POST', keepalive: true })
  }
}

// src/app/layout.tsx
import { reportWebVitals } from '@/lib/webVitals'

export default function RootLayout({ children }) {
  useEffect(() => {
    reportWebVitals
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

---

## 2. Image Optimization Strategy

### 2.1 Next.js Image Component
All images must use the Next.js `<Image>` component for automatic optimization:

```typescript
// ✅ Good: Using Next.js Image
import Image from 'next/image'

<Image
  src={product.coverImage}
  alt={product.name}
  width={400}
  height={400}
  className="rounded-lg"
/>

// ✅ Good: With priority for LCP images
<Image
  src={heroImage}
  alt="Hair Elevation Studio"
  fill
  priority
  className="object-cover"
/>

// ✅ Good: With placeholder
<Image
  src={product.coverImage}
  alt={product.name}
  width={400}
  height={400}
  placeholder="blur"
  blurDataURL={product.blurDataURL}
/>
```

### 2.2 Cloudinary Configuration
```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
}
```

### 2.3 Image Loading Strategies

| Strategy | Use Case | Implementation |
|----------|----------|----------------|
| **Priority** | LCP images (hero, above-fold) | `priority` prop |
| **Lazy Loading** | Below-fold images | Default behavior or `loading="lazy"` |
| **Blur Placeholder** | Product images | `placeholder="blur"` with `blurDataURL` |
| **Color Placeholder** | When blur not available | `placeholder="empty"` with background color |
| **Responsive Images** | Different screen sizes | `sizes` prop with `srcset` |

### 2.4 Image Component Wrapper
```typescript
// src/components/shared/ProductImage.tsx
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface ProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function ProductImage({
  src,
  alt,
  width = 400,
  height = 400,
  className,
  priority = false,
  sizes,
}: ProductImageProps) {
  return (
    <Image
      src={src || '/placeholder.jpg'}
      alt={alt}
      width={width}
      height={height}
      className={twMerge('object-cover', className)}
      priority={priority}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/placeholder.jpg'
      }}
    />
  )
}
```

### 2.5 Image Optimization Checklist
- [ ] All images use Next.js `<Image>` component
- [ ] LCP images have `priority` prop
- [ ] Below-fold images use lazy loading
- [ ] Product images use blur placeholders
- [ ] Cloudinary domain configured in `next.config.ts`
- [ ] Image sizes optimized (hero < 200KB, products < 100KB)
- [ ] WebP/AVIF formats enabled
- [ ] Responsive `sizes` attribute configured
- [ ] Alt text present on all images
- [ ] Fallback for broken images

---

## 3. Lazy Loading Strategy

### 3.1 Route-Based Code Splitting
Next.js provides automatic route-based code splitting. Each page is a separate bundle loaded on demand.

### 3.2 Component-Level Lazy Loading
```typescript
// src/components/shared/HeavyComponent.tsx
import dynamic from 'next/dynamic'

// Lazy load non-critical components
export const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable SSR for client-only components
})

// Lazy load with suspense
export const LazyComponent = dynamic(() => import('./LazyComponent'), {
  suspense: true,
})
```

### 3.3 Image Lazy Loading
```typescript
// Built into Next.js Image component
<Image
  src={imageSrc}
  alt={alt}
  width={400}
  height={400}
  loading="lazy" // Explicit lazy loading
/>
```

### 3.4 Intersection Observer for Custom Lazy Loading
```typescript
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(element)
      }
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}
```

---

## 4. Bundle Optimization Strategy

### 4.1 Bundle Analysis
```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Analyze bundle
npm run build
npm run analyze
```

### 4.2 Dynamic Imports
```typescript
// Lazy load heavy libraries
const HeavyLibrary = dynamic(() => import('heavy-library'), { ssr: false })

// Lazy load modals
const PaymentModal = dynamic(() => import('@/components/shared/PaymentModal'), {
  loading: () => <LoadingSpinner />,
})
```

### 4.3 Tree Shaking
- Use ES modules (`import`/`export`)
- Avoid `require()` and CommonJS
- Use named exports when possible
- Avoid side effects in modules

### 4.4 External Dependencies Audit
- Regularly audit dependencies for size
- Prefer lightweight alternatives
- Use `bundlephobia.com` to check package size
- Consider alternatives for large libraries

---

## 5. Font Optimization Strategy

### 5.1 Next.js Font Optimization
```typescript
// src/app/layout.tsx
import { Playfair_Display, Roboto } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className={playfair.className}>{children}</body>
    </html>
  )
}
```

### 5.2 Font Loading Best Practices
- Use `display: swap` for immediate text rendering
- Preload critical fonts
- Subset fonts to only needed characters
- Use variable fonts when possible
- Provide fallback fonts

---

## 6. Caching Strategy

### 6.1 Next.js Caching
```typescript
// Revalidate every 5 minutes
async function getFeaturedProducts() {
  const res = await fetch('https://api.example.com/products/featured', {
    next: { revalidate: 300 },
  })
  return res.json()
}

// Revalidate on tag
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { tags: ['products'] },
  })
  return res.json()
}
```

### 6.2 Static Generation
```typescript
// Generate static pages at build time
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products').then(r => r.json())
  return products.map((product: Product) => ({ id: product._id }))
}

// Generate static metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  return {
    title: product.name,
    description: product.description,
  }
}
```

---

## 7. SEO Architecture

### 7.1 Metadata Management

#### 7.1.1 Root Layout Metadata
```typescript
// src/app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Hair Elevation Studio | Luxury Hair Accessories',
    template: '%s | Hair Elevation Studio',
  },
  description: 'Premium hair accessories, crowns, and wigs for every occasion. Discover luxury hair solutions at Hair Elevation Studio.',
  keywords: ['hair accessories', 'crowns', 'wigs', 'hair studio', 'luxury hair'],
  authors: [{ name: 'Hair Elevation Studio' }],
  creator: 'Hair Elevation Studio',
  publisher: 'Hair Elevation Studio',
  metadataBase: new URL('https://hairelevationstudios.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://hairelevationstudios.com',
    siteName: 'Hair Elevation Studio',
    title: 'Hair Elevation Studio | Luxury Hair Accessories',
    description: 'Premium hair accessories, crowns, and wigs for every occasion.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hair Elevation Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hairelevation',
    creator: '@hairelevation',
    title: 'Hair Elevation Studio | Luxury Hair Accessories',
    description: 'Premium hair accessories, crowns, and wigs for every occasion.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}
```

#### 7.1.2 Dynamic Page Metadata
```typescript
// src/app/products/[id]/page.tsx
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.name,
    description: product.description || `Shop ${product.name} at Hair Elevation Studio`,
    openGraph: {
      title: product.name,
      description: product.description || `Shop ${product.name}`,
      images: [product.coverImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description || `Shop ${product.name}`,
      images: [product.coverImage],
    },
  }
}
```

### 7.2 Open Graph Strategy

#### 7.2.1 Dynamic OG Images
```typescript
// src/app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Hair Elevation Studio'
    const description = searchParams.get('description') || ''

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #F5EFE6 0%, #E8D5C4 100%)',
            fontSize: 48,
            fontWeight: 700,
            color: '#3B2A23',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 20 }}>Hair Elevation Studio</div>
          <div style={{ fontSize: 64, textAlign: 'center', maxWidth: 800 }}>{title}</div>
          {description && (
            <div style={{ fontSize: 32, marginTop: 20, opacity: 0.8 }}>{description}</div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 })
  }
}
```

#### 7.2.2 OG Image Usage
```typescript
// In metadata
openGraph: {
  images: [
    {
      url: '/api/og?title=Product+Name&description=Product+description',
      width: 1200,
      height: 630,
      alt: 'Product Name',
    },
  ],
}
```

### 7.3 Sitemap Strategy

#### 7.3.1 Dynamic Sitemap
```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hairelevationstudios.com'

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/book`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/collections`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/products`, priority: 0.9, changeFrequency: 'daily' as const },
  ]

  // Dynamic product pages
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`).then(r => r.json())
  const productPages = products.map((product: Product) => ({
    url: `${baseUrl}/products/${product._id}`,
    lastModified: product.updatedAt,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  // Dynamic collection pages
  const collections = ['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies']
  const collectionPages = collections.map(slug => ({
    url: `${baseUrl}/collections/${slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticPages, ...productPages, ...collectionPages]
}
```

#### 7.3.2 Robots.txt
```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://hairelevationstudios.com/sitemap.xml',
  }
}
```

### 7.4 Structured Data (Schema.org)

#### 7.4.1 Organization Schema
```typescript
// src/components/seo/OrganizationSchema.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hair Elevation Studio',
    url: 'https://hairelevationstudios.com',
    logo: 'https://hairelevationstudios.com/logo.png',
    description: 'Premium hair accessories, crowns, and wigs for every occasion.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+233-XX-XXX-XXXX',
      contactType: 'customer service',
    },
    sameAs: [
      'https://instagram.com/hairelevation',
      'https://tiktok.com/@hairelevation',
      'https://wa.me/233XXXXXXXXX',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

#### 7.4.2 Product Schema
```typescript
// src/components/seo/ProductSchema.tsx
interface ProductSchemaProps {
  product: Product
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.coverImage,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GHS',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    brand: {
      '@type': 'Brand',
      name: 'Hair Elevation Studio',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

#### 7.4.3 LocalBusiness Schema
```typescript
// src/components/seo/LocalBusinessSchema.tsx
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hair Elevation Studio',
    image: 'https://hairelevationstudios.com/logo.png',
    '@id': 'https://hairelevationstudios.com',
    url: 'https://hairelevationstudios.com',
    telephone: '+233-XX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.6037,
      longitude: -0.1870,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## 8. Semantic HTML Standards

### 8.1 HTML Structure
```typescript
// ✅ Good: Semantic HTML structure
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <p>Content...</p>
  </article>
</main>

<aside>
  {/* Sidebar content */}
</aside>

<footer>
  {/* Footer content */}
</footer>
```

### 8.2 Heading Hierarchy
- **One H1 per page:** The main page title
- **H2 for sections:** Major content sections
- **H3 for subsections:** Sub-sections within H2
- **H4-H6 for deeper nesting:** Rarely needed
- **No skipping levels:** Don't jump from H2 to H4

### 8.3 Landmark Roles
```typescript
// Use semantic HTML elements
<header>     // Site header
<nav>        // Navigation
<main>       // Main content
<article>    // Self-contained content
<aside>      // Sidebar content
<section>    // Thematic grouping
<footer>     // Site footer
```

---

## 9. Accessibility and Performance

### 9.1 Accessibility Standards
- **WCAG 2.1 AA Compliance:** Target compliance level
- **Keyboard Navigation:** All interactive elements accessible via keyboard
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators:** Visible focus states for all interactive elements
- **Skip Links:** Skip to main content link for keyboard users
- **Reduced Motion:** Respect `prefers-reduced-motion` media query

### 9.2 Performance and Accessibility
- **Lazy Loading:** Images lazy loaded but with proper alt text
- **Animation:** Respect reduced motion preferences
- **Font Loading:** Use `font-display: swap` to prevent invisible text
- **Focus Management:** Manage focus for modals and dynamic content
- **Error Handling:** Clear error messages with suggestions

---

## 10. Migration Performance Checklist

### 10.1 Pre-Migration
- [ ] Set up performance monitoring (Vercel Analytics, Speed Insights)
- [ ] Configure Web Vitals tracking
- [ ] Set up bundle analysis
- [ ] Establish performance baselines from current site
- [ ] Configure image optimization in next.config.ts

### 10.2 During Migration
- [ ] All images use Next.js Image component
- [ ] LCP images have `priority` prop
- [ ] Below-fold images use lazy loading
- [ ] Blur placeholders for product images
- [ ] Dynamic imports for heavy components
- [ ] Font optimization with next/font
- [ ] Metadata implemented for all pages
- [ ] Structured data added to key pages
- [ ] Sitemap generated
- [ ] robots.txt configured

### 10.3 Post-Migration
- [ ] Run Lighthouse audit on all pages
- [ ] Verify Core Web Vitals meet targets
- [ ] Test on slow 3G network
- [ ] Test on mobile devices
- [ ] Verify SEO with Google Search Console
- [ ] Test structured data with Rich Results Test
- [ ] Monitor real user metrics (RUM)
- [ ] Set up performance alerts

---

## 11. Conclusion

This performance and SEO strategy ensures the Hair Elevation Studio frontend will achieve excellent Core Web Vitals scores, optimal search engine visibility, and a superior user experience. By leveraging Next.js built-in optimizations and following these guidelines, the migrated site will be:

- **Fast:** Sub-2.5s LCP, sub-100ms FID, sub-0.1 CLS
- **Discoverable:** Proper metadata, structured data, and sitemap
- **Accessible:** WCAG 2.1 AA compliant
- **User-Friendly:** Smooth animations, responsive design, fast interactions

The strategy balances performance with functionality, ensuring the site is both fast and feature-rich. Regular monitoring and optimization will maintain performance standards as the site evolves.

---
*This performance and SEO strategy is locked and must be followed during Phase 1 frontend migration.*