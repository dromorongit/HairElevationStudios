# Railway Deployment Compatibility Audit

## Environment Stack
| Component | Configured Version | Notes |
|-----------|-------------------|-------|
| Node.js (Dockerfile) | `node:20-slim` | Debian-based, glibc, x64 architecture |
| npm | 10.x (inferred) | lockfileVersion 3 compatible |
| Next.js | 16.2.6 | Uses webpack (turbo: false) |
| React | 19.2.4 | Compatible with Next.js 16 |
| Tailwind CSS | ^4 | Requires PostCSS plugin for v4 |

## Configuration Files Analysis

### package.json
```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "framer-motion": "^12.40.0"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "postcss": "^8",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "postcss-import": "^16"  // Present in package-lock.json but may be missing from manifest
  }
}
```

**Critical Finding**: `@tailwindcss/postcss` is **MISSING FROM package.json** but present in `package-lock.json` (lines 17, 1597-1610). This causes:
- Inconsistent installation behavior between environments
- Missing dependency in clean installs (like Railway builds)
- PostCSS plugin cannot load properly without the declared dependency

### postcss.config.cjs
```js
module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
  ],
};
```

**Issue**: Uses `tailwindcss()` directly instead of `@tailwindcss/postcss`. For Tailwind CSS v4:
- The `tailwindcss` package is a stub that re-exports `@tailwindcss/postcss`
- However, the native `@tailwindcss/oxide` engine is loaded differently
- Missing proper PostCSS plugin initialization for v4

### next.config.ts
```ts
experimental: {
  turbo: false,  // Attempting to disable Turbopack
}
```

**Issue**: `turbo: false` is **not a valid Next.js 16 configuration option**. In Next.js 16:
- Turbopack is the default bundler
- The option to disable it was removed
- Production builds may still attempt Turbopack which has PostCSS compatibility issues

### railway.json
```json
{
  "build": { "builder": "dockerfile" },
  "deploy": { "startCommand": "node server.js" }
}
```

Uses Dockerfile builder. No explicit Node.js version constraint via engines field.

### Dockerfile
```dockerfile
FROM node:20-slim  # Linux x64 glibc
```

Target platform is correct for `@tailwindcss/oxide-linux-x64-gnu` and `lightningcss-linux-x64-gnu`.

## Native Dependency Audit

### @tailwindcss/oxide
| Platform | Required Binary | Status in package-lock.json |
|----------|---------------|---------------------------|
| linux-x64-glibc | @tailwindcss/oxide-linux-x64-gnu | Present (lines 1493-1512) |
| linux-x64-musl | @tailwindcss/oxide-linux-x64-musl | Present (lines 1513-1532) |
| **Node requirement** | `>=20` | Met by node:20-slim |

### lightningcss
| Platform | Required Binary | Status in package-lock.json |
|----------|---------------|---------------------------|
| linux-x64-glibc | lightningcss-linux-x64-gnu | Present (lines 4919-4941) |
| linux-x64-musl | lightningcss-linux-x64-musl | Present (lines 4943-4965) |
| **Node requirement** | `>=12.0.0` | Met by node:20-slim |

## Compatibility Matrix

| Combination | Status | Notes |
|-------------|--------|-------|
| Next.js 16 + Tailwind v4 | ⚠️ Risky | Turbopack native binary resolution issues |
| Tailwind v4 + PostCSS 8 | ✅ Compatible | Tailwind CSS v4 requires PostCSS 8 |
| @tailwindcss/oxide + node:20 | ✅ Compatible | Node 20+ required, node:20-slim meets requirement |
| lightningcss + node:20 | ✅ Compatible | All platforms have binaries |

## Railway Build Environment Analysis

Railway's default Node.js version for `node:20-slim`:
- Debian-based Linux
- glibc (not musl)
- x64 architecture

Expected binaries to load:
1. `@tailwindcss/oxide-linux-x64-gnu`
2. `lightningcss-linux-x64-gnu`

Both are present in package-lock.json but require:
- Clean npm install with `--omit=optional` not set
- Optional dependencies must be installed (default behavior)