# Turbopack + Tailwind CSS v4 support
# Using --webpack flag for native binary compatibility with Tailwind CSS v4
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY .npmrc* ./
COPY postcss.config.cjs ./
RUN npm ci --include=optional

# Build the application with webpack (disable turbopack for native binary compatibility)
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build -- --webpack

# Production image
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=base --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000 HOSTNAME="0.0.0.0"

CMD ["dumb-init", "node", "server.js"]