# Deployment Fix Plan

## Priority 1: Fix Missing Dependency Declaration (CRITICAL)

### Change: Add `@tailwindcss/postcss` to `package.json`

**File**: `hairelevation-nextjs/package.json`

**Before**:
```json
"devDependencies": {
  "postcss": "^8",
  "tailwindcss": "^4",
  ...
}
```

**After**:
```json
"devDependencies": {
  "postcss": "^8",
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  ...
}
```

**Justification**: The package is required by Tailwind CSS v4 but is missing from the manifest. This is the primary cause of the "Cannot find module" and native binary resolution failures.

## Priority 2: Fix Next.js Configuration (HIGH)

### Change: Remove invalid `turbo: false` and use proper PostCSS configuration

**File**: `hairelevation-nextjs/next.config.ts`

**Before**:
```ts
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
    turbo: false,  // Invalid in Next.js 16
  },
  ...
}
```

**After**:
```ts
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  ...
}
```

**Justification**: The `turbo: false` option was removed in Next.js 16. Turbopack is now the default and cannot be disabled. The configuration file should rely on proper PostCSS plugin configuration instead.

## Priority 3: Fix PostCSS Configuration (HIGH)

### Change: Use correct Tailwind CSS v4 PostCSS plugin import

**File**: `hairelevation-nextjs/postcss.config.cjs`

**Before**:
```js
const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
  ],
};
```

**After (Option A - Recommended for Tailwind v4)**:
```js
const postcssImport = require("postcss-import");
const tailwindcss = require("@tailwindcss/postcss");

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
  ],
};
```

**Alternative (Option B - Using tailwindcss with v4)**:
```js
const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss,
  ],
};
```

**Justification**: Tailwind CSS v4 requires the `@tailwindcss/postcss` package for PostCSS integration. Using the explicit package ensures proper loading of native binaries.

## Priority 4: Add Explicit Node.js Version Constraint (MEDIUM)

### Change: Add engines field to `package.json`

**File**: `hairelevation-nextjs/package.json`

**Add to root**:
```json
"engines": {
  "node": "20.x"
}
```

**Justification**: Ensures Railway uses a compatible Node.js version that matches the native binary expectations.

## Priority 5: Add `.npmrc` for Optional Dependencies (MEDIUM)

### Change: Create `.npmrc` to ensure optional dependencies are installed

**File**: `hairelevation-nextjs/.npmrc`

```
optional=true
legacy-peer-deps=true
```

**Justification**: Prevents Railway or other CI environments from skipping optional native dependencies.

## Priority 6: Update Dockerfile for Reliability (LOW)

### Change: Add build arguments and npm configuration

**File**: `hairelevation-nextjs/Dockerfile`

**Before**:
```dockerfile
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./
COPY postcss.config.cjs ./
RUN npm ci
```

**After**:
```dockerfile
FROM node:20-slim AS base
WORKDIR /app

# Ensure native binaries are installed
COPY package*.json ./
COPY .npmrc* ./
RUN npm ci --include=optional

COPY . .
RUN npm run build
```

**Justification**: Explicitly includes optional dependencies to ensure native binaries are available.

## Verification Steps

After applying fixes:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` to regenerate lockfile
3. Verify `@tailwindcss/postcss` appears in both `package.json` and `package-lock.json`
4. Run `npm run build` locally to confirm build works
5. Deploy to Railway and monitor build logs