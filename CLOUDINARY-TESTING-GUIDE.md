# Cloudinary Integration Testing Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure these are set in your Railway dashboard:
- `CLOUDINARY_CLOUD_NAME=your_cloud_name`
- `CLOUDINARY_API_KEY=your_api_key`
- `CLOUDINARY_API_SECRET=your_api_secret`

### 2. Dependencies
✅ Cloudinary packages installed:
```bash
npm install cloudinary multer-storage-cloudinary
```

### 3. Code Updates
✅ Updated files:
- `backend/middleware/upload.ts` - Now uses Cloudinary storage
- `backend/routes/products.ts` - Handles Cloudinary URLs
- `js/api.js` - Properly handles Cloudinary URLs

## Testing Steps

### 1. Deploy to Railway
1. Push changes to your GitHub repository
2. Railway will automatically deploy
3. Check deployment logs for any errors

### 2. Test Image Upload
1. Go to your admin panel
2. Create a new product with a cover image
3. Submit the form
4. Check browser Network tab for successful upload

### 3. Verify Image Display
1. Go to your website homepage
2. Check if the new product appears with the uploaded image
3. Visit the product detail page
4. Verify image loads correctly

### 4. Test Different File Types
- Cover images: JPG, PNG, WebP
- Additional images: Multiple uploads
- Videos: MP4, MOV

## Expected Behavior

### ✅ Success Indicators
- Images upload without errors
- Product cards show uploaded images
- Image URLs are Cloudinary URLs (format: `https://res.cloudinary.com/...`)
- Images load quickly with good quality

### ❌ Common Issues

#### Images Not Showing
**Symptoms**: Products show placeholder images
**Solutions**:
1. Check Railway logs for upload errors
2. Verify Cloudinary credentials are correct
3. Check browser console for API errors

#### Upload Errors
**Symptoms**: 500 errors when creating products
**Solutions**:
1. Check Cloudinary environment variables
2. Verify account has sufficient credits
3. Check file size limits (50MB max)

#### Broken Image Links
**Symptoms**: Images show as broken on frontend
**Solutions**:
1. Verify `getImageUrl()` function handles Cloudinary URLs
2. Check CORS settings for Cloudinary domains
3. Ensure images are set to public in Cloudinary

## Debug Commands

### Check Railway Logs
```bash
# View recent logs
railway logs

# Follow logs in real-time
railway logs --follow
```

### Test Cloudinary Connection
Add this temporary route to test Cloudinary:
```typescript
// Add to server.ts temporarily
app.get('/test-cloudinary', (req, res) => {
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    res.json({ 
      status: 'configured',
      cloudName: process.env.CLOUDINARY_CLOUD_NAME 
    });
  } else {
    res.status(500).json({ status: 'not configured' });
  }
});
```

### Test API Endpoint
```bash
curl https://hairelevationstudios-production.up.railway.app/test-cloudinary
```

## Cloudinary Console Checks

1. **Upload Success**: Check Cloudinary console for uploaded files
2. **Folder Structure**: Files should be in `hair-elevation-studios/products/`
3. **Public Access**: Verify images are publicly accessible
4. **Usage Stats**: Monitor storage and bandwidth usage

## Rollback Plan

If Cloudinary integration fails:
1. Revert to previous upload middleware
2. Keep placeholder images (already implemented)
3. Investigate specific error before retry

## Success Metrics

After successful implementation:
- ✅ 100% of new product images display correctly
- ✅ Image loading times under 2 seconds
- ✅ No broken image placeholders for new uploads
- ✅ Admin panel uploads work smoothly