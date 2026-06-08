# Turbopack + Tailwind CSS v4 support
# Install dependencies only when needed
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies - separate layer for better caching
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
# Force cache bust when postcss config changes
COPY postcss.config.cjs ./
RUN npm ci

# Rebuild the source code when needed
FROM base AS builder
WORKDIR /app
# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source files (this layer changes when source changes)
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN apk add --no-cache dumb-init
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output - Next.js 16 places server.js in the root
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000 HOSTNAME="0.0.0.0"

CMD ["dumb-init", "node", "server.js"]