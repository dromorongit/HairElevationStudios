# Railway Deployment Fixes

## Summary of Changes Applied

All fixes identified in the deployment audit have been applied to resolve build failures for Railway deployment.

## Fixes Applied

### 1. Added Missing `@tailwindcss/postcss` Dependency (package.json)

**File**: `package.json`

**Change**: Added `@tailwindcss/postcss` to devDependencies

```json
"devDependencies": {
  "@tailwindcss/postcss": "^4",
  ...
}
```

**Status**: ✅ Complete

---

### 2. Added Missing `postcss-import` Dependency (package.json)

**File**: `package.json`

**Change**: Added `postcss-import` to devDependencies for PostCSS compatibility

```json
"devDependencies": {
  "postcss-import": "^16",
  ...
}
```

**Status**: ✅ Complete

---

### 3. Fixed PostCSS Configuration (postcss.config.cjs)

**File**: `postcss.config.cjs`

**Before**:
```js
const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");
module.exports = { plugins: [postcssImport(), tailwindcss()] };
```

**After**:
```js
module.exports = {
  plugins: {
    "postcss-import": {},
    "@tailwindcss/postcss": {},
  },
};
```

**Status**: ✅ Complete

---

### 4. Removed Invalid `turbo: false` Configuration (next.config.ts)

**File**: `next.config.ts`

**Change**: Removed `turbo: false` from experimental config (not valid in Next.js 16)

**Status**: ✅ Complete

---

### 5. Added Node.js Engine Requirements (package.json)

**File**: `package.json`

**Change**: Added engines field to ensure compatibility

```json
"engines": {
  "node": ">=18"
}
```

**Status**: ✅ Complete

---

### 6. Created `.npmrc` for Optional Dependencies

**File**: `.npmrc`

**Content**:
```
optional=true
legacy-peer-deps=true
```

**Status**: ✅ Complete

---

### 7. Updated Dockerfile for Optional Dependencies

**File**: `Dockerfile`

**Change**: Added `--include=optional` flag to npm ci and added `--webpack` flag to build

```dockerfile
RUN npm ci --include=optional
RUN npm run build -- --webpack
```

**Status**: ✅ Complete

---

## Build Configuration Notes

The build uses webpack instead of Turbopack via the `--webpack` CLI flag:
- `npm run build -- --webpack` for development
- Dockerfile updated to use `npm run build -- --webpack`

This ensures compatibility with native binaries required by Tailwind CSS v4 (`@tailwindcss/oxide`, `lightningcss`), which Turbopack in Next.js 16 currently has limited support for.