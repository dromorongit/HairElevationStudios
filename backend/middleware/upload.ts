import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import path from 'path';

// Check if Cloudinary is properly configured
const isCloudinaryConfigured = (): boolean => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  // Check if credentials exist and are not placeholder values
  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }
  if (cloudName === 'your_cloudinary_cloud_name' || 
      apiKey === 'your_cloudinary_api_key' || 
      apiSecret === 'your_cloudinary_api_secret') {
    return false;
  }
  return true;
};

// Configure Cloudinary only if credentials are properly provided
if (isCloudinaryConfigured()) {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary configured successfully');
  } catch (error) {
    console.error('Failed to configure Cloudinary:', error);
  }
} else {
  console.log('Cloudinary not configured, using local storage fallback');
}

// Storage configuration - use local storage if Cloudinary is not configured
let storage: any;

if (isCloudinaryConfigured()) {
  try {
    // Cloudinary storage configuration
    storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: 'hair-elevation-studios/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi', 'webm'],
        resource_type: 'auto' as any, // Auto-detect file type
        transformation: [
          { width: 800, height: 600, crop: 'limit', quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      } as any
    });
  } catch (error) {
    console.error('Failed to create Cloudinary storage, falling back to local:', error);
    // Fall back to local storage if Cloudinary storage creation fails
    storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
  }
} else {
  // Local storage fallback
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
});

export default upload;