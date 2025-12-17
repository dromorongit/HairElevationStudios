# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY . ./

# Copy frontend files from parent directory into backend directory during build
RUN mkdir -p css js images && \
    cp -r /app/../css/* ./css/ 2>/dev/null || echo "No css files to copy" && \
    cp -r /app/../js/* ./js/ 2>/dev/null || echo "No js files to copy" && \
    cp /app/../*.html ./. 2>/dev/null || echo "No html files to copy" && \
    cp /app/../*.png ./. 2>/dev/null || echo "No png files to copy" && \
    cp /app/../*.jpg ./. 2>/dev/null || echo "No jpg files to copy" && \
    cp /app/../*.json ./. 2>/dev/null || echo "No json files to copy"

# Build the TypeScript backend
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy frontend files (now available in builder stage)
COPY --from=builder /app/*.html ./
COPY --from=builder /app/css ./css
COPY --from=builder /app/js ./js
COPY --from=builder /app/*.png ./
COPY --from=builder /app/*.jpg ./
COPY --from=builder /app/*.json ./

# Create uploads directory
RUN mkdir -p uploads

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "dist/server.js"]