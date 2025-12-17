#!/bin/bash

echo "🚀 Deploying Hair Elevation Studios to Railway..."

# Navigate to backend directory
cd backend

# Build the TypeScript backend
echo "📦 Building TypeScript backend..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🔄 To deploy to Railway, you need to:"
echo "1. Commit these changes to your Git repository"
echo "2. Railway will automatically detect the changes and redeploy"
echo "3. Or manually trigger a deployment from the Railway dashboard"

echo ""
echo "📋 Changes made:"
echo "- ✅ Updated Dockerfile to include frontend files"
echo "- ✅ Updated server configuration for static file serving"
echo "- ✅ Fixed image and video display issues"

echo ""
echo "🌐 Your website should now display images and videos correctly after deployment!"
echo "📍 Website URL: https://hairelevationstudios-production.up.railway.app/"