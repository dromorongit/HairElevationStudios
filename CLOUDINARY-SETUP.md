# Cloudinary Setup for Image Storage

## Why Cloudinary?
- Easy integration with existing multer setup
- Free tier: 25GB storage, 25GB bandwidth/month
- Automatic image optimization and CDN
- Persistent storage that survives deployments

## Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for free account
3. Note your Cloud Name, API Key, and API Secret from dashboard

## Step 2: Install Cloudinary Package
```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

## Step 3: Update Environment Variables
Add to your Railway environment variables:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 4: Update Upload Middleware
Replace `backend/middleware/upload.ts` with:

```typescript
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import path from 'path';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'hair-elevation-studios',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  } as any
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export default upload;
```

## Step 5: Update API Service for Cloudinary URLs
Update `js/api.js` to handle Cloudinary URLs:

```javascript
getImageUrl(path) {
    if (!path) return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image';
    
    // Handle different URL formats
    if (path.startsWith('http')) {
        // Already a full URL (Cloudinary, etc.)
        return path;
    } else if (path.startsWith('/uploads/')) {
        // Legacy local upload path - convert to placeholder
        return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Image+Unavailable';
    } else {
        // Relative path - construct full URL
        return `${API_BASE_URL}${path}`;
    }
}
```

## Step 6: Test the Integration
1. Deploy changes to Railway
2. Add new environment variables in Railway dashboard
3. Upload a test image through admin panel
4. Check if image appears on product cards

## Benefits of Cloudinary
- ✅ Images persist across deployments
- ✅ Automatic image optimization
- ✅ CDN for fast loading
- ✅ Multiple format support
- ✅ Easy to implement
- ✅ Free tier available

## Migration Notes
- Existing products with broken image paths will show placeholders
- New uploads will use Cloudinary
- Consider adding a migration script later to re-upload existing images