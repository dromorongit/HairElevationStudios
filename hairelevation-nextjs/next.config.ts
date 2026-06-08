import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["framer-motion"],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hairelevationstudios-production.up.railway.app",
        pathname: "/**",
      },
    ],
    // Enable modern image formats
    formats: ["image/avif", "image/webp"],
    // Optimize image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL
    minimumCacheTTL: 31536000, // 1 year
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://hairelevationstudios-production.up.railway.app",
  },

  // Output configuration for deployment
  output: "standalone",

  // Enable compression
  compress: true,

  // Power by header
  poweredByHeader: false,

  // React strict mode
  reactStrictMode: true,
};

export default nextConfig;
