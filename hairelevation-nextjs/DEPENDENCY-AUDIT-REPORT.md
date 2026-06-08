# Dependency Audit Report

## Audit Date: 2026-06-08

## Current Dependencies (package.json)

### Production Dependencies
| Package | Version | Notes |
|---------|---------|-------|
| next | 16.2.6 | Latest stable |
| react | 19.2.4 | Compatible with Next.js 16 |
| react-dom | 19.2.4 | Compatible with Next.js 16 |
| framer-motion | ^12.40.0 | UI animations |

### Development Dependencies
| Package | Version | Notes |
|---------|---------|-------|
| postcss | ^8 | Required for Tailwind CSS v4 |
| tailwindcss | ^4 | CSS framework |
| @tailwindcss/postcss | ^4 | **NEW - Required PostCSS plugin for Tailwind v4** |
| postcss-import | ^16 | **NEW - Required for CSS imports** |
| @types/node | ^20 | Node.js types |
| @types/react | ^19 | React types |
| @types/react-dom | ^19 | React DOM types |
| eslint | ^9 | Linting |
| eslint-config-next | 16.2.6 | Next.js ESLint config |
| typescript | ^5 | TypeScript support |

## Native Optional Dependencies (package-lock.json)

### @tailwindcss/oxide
| Platform | Binary | Status |
|----------|--------|--------|
| win32-x64-msvc | @tailwindcss/oxide-win32-x64-msvc | ✅ Installed |
| linux-x64-gnu | @tailwindcss/oxide-linux-x64-gnu | ✅ Present in lockfile |
| linux-x64-musl | @tailwindcss/oxide-linux-x64-musl | ✅ Present in lockfile |

**Node Requirement**: >=20 (met by node:20-slim, compatible with >=18)

### lightningcss
| Platform | Binary | Status |
|----------|--------|--------|
| win32-x64-msvc | lightningcss-win32-x64-msvc | ✅ Installed |
| linux-x64-gnu | lightningcss-linux-x64-gnu | ✅ Present in lockfile |
| linux-x64-musl | lightningcss-linux-x64-musl | ✅ Present in lockfile |

**Node Requirement**: >=12.0.0 (met by node:20-slim)

## Missing Dependencies (Previously)

| Package | Issue | Resolution |
|---------|-------|------------|
| @tailwindcss/postcss | Was missing from package.json | ✅ Added |
| postcss-import | Was missing from package.json | ✅ Added |

## Compatibility Matrix

| Combination | Status | Notes |
|-------------|--------|-------|
| Next.js 16 + Tailwind v4 + webpack | ✅ Compatible | Using --webpack flag |
| Tailwind v4 + PostCSS 8 | ✅ Compatible | Standard combination |
| @tailwindcss/oxide + node:20 | ✅ Compatible | Node 20+ required |
| lightningcss + node:20 | ✅ Compatible | All platforms available |

## Security Vulnerabilities

```
2 moderate severity vulnerabilities
```

Recommended action: Run `npm audit fix` before deployment. These are not critical blocking issues.

## Audit Summary

- **Total dependencies**: 368 packages
- **Optional native binaries**: All required platforms present
- **Missing declarations**: None (previously fixed)
- **Ready for Railway deployment**: ✅ Yes