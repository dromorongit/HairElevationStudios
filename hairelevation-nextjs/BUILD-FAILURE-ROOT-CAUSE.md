# Build Failure Root Cause Analysis

## Primary Root Cause: Missing `@tailwindcss/postcss` Dependency Declaration

### The Smoking Gun

In `package.json` (lines 17-26):
```json
"devDependencies": {
  "postcss": "^8",
  "tailwindcss": "^4",
  "@types/node": "^20",
  ...
}
```

In `package-lock.json` (lines 16-26), the lockfile shows:
```json
"devDependencies": {
  "@tailwindcss/postcss": "^4",   // <-- THIS IS MISSING FROM package.json
  "@types/node": "^20",
  ...
}
```

### Why This Causes the Build Failure

1. **Dirty install on development machine**: The local development environment has `@tailwindcss/postcss` installed (lockfile exists), but clean Railway builds will not install it because it's not declared in `package.json`.

2. **PostCSS configuration mismatch**: `postcss.config.cjs` calls `tailwindcss()` directly, but for Tailwind v4:
   - The `@tailwindcss/postcss` package contains the PostCSS plugin
   - It loads the native `@tailwindcss/oxide` engine
   - Without this package, PostCSS cannot resolve the native binaries

3. **Error cascade**:
   - `Cannot find module 'unknown'` → PostCSS fails to find the tailwindcss plugin
   - `Can't resolve '../lightningcss.<platform>.node'` → LightningCSS native binary resolution fails
   - `@tailwindcss/oxide` errors → Native engine cannot load without proper plugin initialization

## Secondary Root Cause: Invalid Next.js Configuration

In `next.config.ts` (line 7):
```ts
turbo: false,  // NOT VALID IN NEXT.JS 16
```

This configuration option:
- Was valid in Next.js 14 and early 15
- Was removed in Next.js 16 (Turbopack is now always used)
- May cause Next.js to ignore the experimental config entirely
- Forces Turbopack usage in production builds where PostCSS compatibility is problematic

## Tertiary Root Cause: Platform Binary Fallback Issues

The package-lock.json includes both glibc and musl binaries:
- `@tailwindcss/oxide-linux-x64-gnu` (glibc)
- `@tailwindcss/oxide-linux-x64-musl` (musl)

Railway uses `node:20-slim` which is glibc-based. However:
- If `npm ci --omit=optional` or similar flags are used, optional dependencies are skipped
- The build may then fall back to WASM version (oxide-wasm32-wasi) which has additional dependencies

## Error Flow Diagram

```
Railway Build (npm ci)
    ↓
Missing @tailwindcss/postcss (not in package.json)
    ↓
postcss.config.cjs cannot resolve tailwindcss plugin
    ↓
Cannot find module 'unknown' (generic error from PostCSS)
    ↓
Native @tailwindcss/oxide binary fails to load
    ↓
lightningcss native binary resolution fails
    ↓
Build crashes with module resolution errors
```

## Node.js Version Mismatch Risk

The Dockerfile uses `node:20-slim` which meets the `>=20` requirement for `@tailwindcss/oxide`, but:
- If Railway's default Node version differs from 20.x, native binaries may fail
- Railway's default Node.js version (as of early 2026) may be Node 22.x or 24.x
- Native binaries built for Node 20 ABI may not load correctly on newer versions