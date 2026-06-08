# Hair Elevation Studio — Deployment & Environment Plan

**Phase:** PHASE_0.5 — Frontend Migration Architecture Lock  
**Date:** 2026-05-22  
**Status:** ✅ Complete — Deployment & Environment Plan Defined  

---

## Overview

This document defines the deployment architecture and environment strategy for the Hair Elevation Studio frontend migration to Next.js + TypeScript. It covers hosting platform selection, environment configuration, deployment pipeline, monitoring, and rollback strategies to ensure safe, reliable, and scalable deployments.

---

## 1. Hosting Platform Decision

### 1.1 Selected Platform: **Vercel**

**Decision:** Vercel is the recommended hosting platform for the Hair Elevation Studio frontend.

**Justification:**
- **Next.js Optimized:** Built by the creators of Next.js for optimal performance
- **Edge Network:** Global CDN with edge computing capabilities
- **Preview Deployments:** Automatic preview URLs for every pull request
- **Instant Rollbacks:** One-click rollback to previous deployments
- **Built-in Analytics:** Performance monitoring and error tracking
- **Environment Variables:** Secure management of secrets and configuration
- **Git Integration:** Seamless GitHub/GitLab/Bitbucket integration
- **Zero Configuration:** Most Next.js apps deploy with zero configuration
- **Serverless Functions:** API routes automatically become serverless functions

**Alternatives Considered:**
- **Netlify:** Rejected because Vercel has better Next.js-specific optimizations
- **AWS Amplify:** Rejected because of more complex setup and less optimal Next.js support
- **Google Cloud Run:** Rejected because requires more configuration and operational overhead
- **Traditional VPS/Docker:** Rejected because of operational complexity and lack of platform features
- **Self-hosted Next.js:** Rejected because misses out on platform optimizations and ease of use

---

## 2. Environment Strategy

### 2.1 Environment Types

| Environment | Purpose | URL | Branch | Auto-Deploy |
|-------------|---------|-----|--------|-------------|
| **Development** | Local development | `localhost:3000` | N/A | Manual |
| **Preview** | PR testing | `*.vercel.app` | Feature branches | Yes |
| **Production** | Live site | `hairelevationstudios.com` | `main` | Yes |

### 2.2 Environment Variables

#### 2.2.1 Required Variables
```env
# .env.example (committed to repo)
NEXT_PUBLIC_API_URL=https://hairelevationstudios-production.up.railway.app
NEXT_PUBLIC_APP_NAME=Hair Elevation Studio
NEXT_PUBLIC_APP_DESCRIPTION=Luxury hair accessories and crowns
NEXT_PUBLIC_APP_URL=https://hairelevationstudios.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+233XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_CHANNEL=https://chat.whatsapp.com/XXXXXX
```

#### 2.2.2 Environment-Specific Variables
```env
# .env.local (gitignored, local development)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Vercel Environment Variables (Production)
NEXT_PUBLIC_API_URL=https://hairelevationstudios-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://hairelevationstudios.com

# Vercel Environment Variables (Preview)
NEXT_PUBLIC_API_URL=https://hairelevationstudios-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://hairelevationstudios-git-{branch}-{team}.vercel.app
```

#### 2.2.3 Secret Variables (Server-Only)
```env
# Not prefixed with NEXT_PUBLIC_ (server-side only)
# Managed in Vercel dashboard, not in code
JWT_SECRET=your-secret-key-here
DATABASE_URL=your-database-url
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2.3 Environment Configuration Files

#### 2.3.1 .env.example
```env
# Public variables (exposed to browser)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_NAME=Hair Elevation Studio
NEXT_PUBLIC_APP_DESCRIPTION=Luxury hair accessories and crowns
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_WHATSAPP_CHANNEL=

# Server variables (not in this file, set in Vercel)
# JWT_SECRET=
# DATABASE_URL=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
```

#### 2.3.2 .env.local (gitignored)
```env
# Local development overrides
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 2.3.3 .env.test (gitignored)
```env
# Testing environment
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 2.3.4 .env.production (gitignored, managed by Vercel)
```env
# Production environment (set in Vercel dashboard)
NEXT_PUBLIC_API_URL=https://hairelevationstudios-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://hairelevationstudios.com
```

---

## 3. Deployment Pipeline

### 3.1 Deployment Flow

```
┌─────────────┐
│   Developer  │
│   commits    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   GitHub     │
│   Push       │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Vercel     │
│   Detects    │
│   Changes    │
└──────┬──────┘
       │
       ├─── Feature Branch ──► Preview Deployment
       │
       └─── Main Branch ─────► Production Deployment
```

### 3.2 Deployment Stages

#### 3.2.1 Preview Deployments
- **Trigger:** Every push to any branch
- **URL:** `{branch-slug}-{team-slug}.vercel.app`
- **Purpose:** Testing and review before merging
- **Duration:** Deleted after 30 days of inactivity
- **Features:** Full production build, isolated environment

#### 3.2.2 Production Deployments
- **Trigger:** Merge to `main` branch
- **URL:** `hairelevationstudios.com`
- **Purpose:** Live site for users
- **Features:** Optimized build, CDN caching, edge functions

### 3.3 Build Configuration

#### 3.3.1 next.config.ts
```typescript
import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

const nextConfig: NextConfig = {
  // Output configuration
  output: 'standalone',

  // Image optimization
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

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      // Add more redirects for existing HTML pages
    ]
  },

  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

#### 3.3.2 vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["ghr"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/about.html",
      "destination": "/about",
      "permanent": true
    },
    {
      "source": "/services.html",
      "destination": "/services",
      "permanent": true
    },
    {
      "source": "/contact.html",
      "destination": "/contact",
      "permanent": true
    },
    {
      "source": "/book.html",
      "destination": "/book",
      "permanent": true
    },
    {
      "source": "/cart.html",
      "destination": "/cart",
      "permanent": true
    },
    {
      "source": "/checkout.html",
      "destination": "/checkout",
      "permanent": true
    },
    {
      "source": "/product.html",
      "destination": "/products",
      "permanent": true
    },
    {
      "source": "/collections.html",
      "destination": "/collections",
      "permanent": true
    },
    {
      "source": "/bridal-crowns.html",
      "destination": "/collections/bridal-crowns",
      "permanent": true
    },
    {
      "source": "/everyday-crown.html",
      "destination": "/collections/everyday-crown",
      "permanent": true
    },
    {
      "source": "/queens-curls.html",
      "destination": "/collections/queens-curls",
      "permanent": true
    },
    {
      "source": "/signature-pixies.html",
      "destination": "/collections/signature-pixies",
      "permanent": true
    }
  ]
}
```

---

## 4. Production Build Standards

### 4.1 Build Process
```bash
# Install dependencies
npm ci --only=production

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build

# Start production server
npm run start
```

### 4.2 Build Optimization
- **Standalone Output:** Reduces deployment size by including only necessary files
- **Tree Shaking:** Removes unused code automatically
- **Code Splitting:** Automatic route-based code splitting
- **Minification:** JavaScript and CSS minification
- **Compression:** Gzip/Brotli compression for static assets
- **Image Optimization:** Automatic WebP/AVIF conversion

### 4.3 Build Output Structure
```
.next/
├── static/
│   ├── chunks/          # JavaScript chunks
│   ├── css/             # CSS files
│   └── media/           # Images and fonts
├── server/              # Server components
└── cache/               # Build cache
```

---

## 5. Deployment Safety

### 5.1 Pre-Deployment Checks
- [ ] All tests pass
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes with no errors
- [ ] Build completes successfully
- [ ] Environment variables are set
- [ ] Preview deployment tested
- [ ] Visual regression tests pass
- [ ] Performance budget not exceeded

### 5.2 Deployment Safeguards
- **Preview Deployments:** Every PR gets a preview URL for testing
- **Branch Protection:** Require PR reviews before merging to main
- **Status Checks:** Require CI checks to pass before merge
- **Production Deployments:** Only from main branch
- **Deployment Notifications:** Slack/email notifications for deployments
- **Health Checks:** Post-deployment health check endpoint

### 5.3 Rollback Strategy

#### 5.3.1 Instant Rollback (Vercel)
- **One-Click Rollback:** Vercel dashboard provides instant rollback
- **Previous Deployment:** Always available for rollback
- **Zero Downtime:** Rollback is instant with no downtime

#### 5.3.2 Git-Based Rollback
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to previous commit
git reset --hard <commit-hash>
git push origin main --force
```

#### 5.3.3 Database Rollback
- **No Database Changes:** Frontend migration does not modify backend
- **No Data Migration:** No database schema changes required
- **Backward Compatible:** Existing backend remains unchanged

---

## 6. Monitoring and Observability

### 6.1 Vercel Analytics
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

### 6.2 Error Monitoring
- **Vercel Error Logs:** Built-in error logging in Vercel dashboard
- **Sentry Integration:** Optional Sentry integration for detailed error tracking
- **Custom Error Boundary:** React error boundary for graceful error handling

### 6.3 Performance Monitoring
- **Core Web Vitals:** Tracked via Vercel Speed Insights
- **Real User Metrics (RUM):** Actual user performance data
- **Synthetic Monitoring:** Regular performance checks from multiple locations

### 6.4 Uptime Monitoring
- **Vercel Status:** Built-in uptime monitoring
- **External Monitoring:** Consider UptimeRobot or similar for external checks
- **Health Check Endpoint:** Simple endpoint to verify service health

---

## 7. Domain and SSL Configuration

### 7.1 Domain Setup
- **Primary Domain:** `hairelevationstudios.com`
- **WWW Subdomain:** `www.hairelevationstudios.com`
- **SSL Certificate:** Automatic via Vercel (Let's Encrypt)
- **HTTPS Only:** Enforced via Vercel

### 7.2 DNS Configuration
```
Type  Name    Value
A     @       76.76.21.21 (Vercel)
CNAME www     cname.vercel-dns.com
```

### 7.3 Redirects
- **HTTP to HTTPS:** Automatic redirect
- **WWW to non-WWW:** Configured in Vercel
- **Trailing Slash:** Consistent trailing slash policy
- **Old URLs:** Redirects from old HTML pages to new routes

---

## 8. CI/CD Pipeline

### 8.1 GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy-preview:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 8.2 Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run type-check && npm run lint"
    }
  }
}
```

```json
// .lintstagedrc.json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

---

## 9. Security Considerations

### 9.1 Security Headers
```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://hairelevationstudios-production.up.railway.app; frame-ancestors 'none';",
        },
      ],
    },
  ]
}
```

### 9.2 Environment Variable Security
- **Never commit secrets:** Use Vercel environment variables
- **Server-only variables:** Don't prefix with `NEXT_PUBLIC_`
- **Rotate secrets:** Regularly rotate API keys and tokens
- **Least privilege:** Grant minimum necessary permissions

### 9.3 Dependency Security
- **Regular Audits:** Run `npm audit` regularly
- **Dependabot:** Enable Dependabot for automated security updates
- **Lock File:** Commit `package-lock.json` for reproducible builds
- **Minimal Dependencies:** Keep dependencies to minimum necessary

---

## 10. Backup and Disaster Recovery

### 10.1 Code Backup
- **Git Repository:** Primary backup in GitHub
- **Branch Protection:** Protected main branch
- **Regular Commits:** Frequent commits with clear messages

### 10.2 Deployment Backup
- **Vercel Deployments:** Automatic backup of all deployments
- **Rollback Capability:** Instant rollback to any previous deployment
- **Deployment History:** Full history of all deployments

### 10.3 Data Backup
- **Backend Data:** Managed by backend team (MongoDB, Cloudinary)
- **Frontend Data:** No database; all data from backend API
- **Static Assets:** Cloudinary CDN with automatic backups

---

## 11. Migration Deployment Plan

### 11.1 Deployment Phases

#### Phase 1: Infrastructure Setup
- [ ] Create Vercel project
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up GitHub integration
- [ ] Configure preview deployments

#### Phase 2: Initial Deployment
- [ ] Deploy initial Next.js app with homepage
- [ ] Verify deployment succeeds
- [ ] Test preview deployments
- [ ] Configure redirects from old HTML pages
- [ ] Set up monitoring and analytics

#### Phase 3: Incremental Migration
- [ ] Migrate one route at a time
- [ ] Test each migrated route
- [ ] Verify redirects work correctly
- [ ] Monitor performance metrics
- [ ] Fix any issues before proceeding

#### Phase 4: Full Migration
- [ ] Migrate all routes
- [ ] Remove old HTML files
- [ ] Clean up redirects
- [ ] Final performance audit
- [ ] SEO verification

#### Phase 5: Post-Migration
- [ ] Monitor for 2 weeks
- [ ] Address any issues
- [ ] Optimize based on real user data
- [ ] Document lessons learned

### 11.2 Rollback Plan
If issues arise during migration:
1. **Immediate Rollback:** Use Vercel one-click rollback
2. **Investigate:** Review error logs and metrics
3. **Fix:** Address issues in development
4. **Re-deploy:** Deploy fixed version
5. **Verify:** Test thoroughly before re-deploying

---

## 12. Conclusion

This deployment and environment plan provides a comprehensive strategy for safely deploying the Hair Elevation Studio frontend to production. By following this plan, the team will achieve:

- **Reliability:** Safe, tested deployments with rollback capability
- **Performance:** Optimized builds with global CDN
- **Security:** Proper headers, environment variable management, and dependency security
- **Observability:** Monitoring, logging, and error tracking
- **Scalability:** Platform that grows with the business
- **Developer Experience:** Seamless preview deployments and CI/CD

The plan balances safety with velocity, enabling rapid iteration while maintaining production stability. Vercel provides the optimal platform for Next.js applications, and the environment strategy ensures proper separation of concerns between development, preview, and production environments.

---
*This deployment and environment plan is locked and must be followed during Phase 1 frontend migration.*