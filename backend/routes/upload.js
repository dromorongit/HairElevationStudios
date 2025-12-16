const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(uploadPath, 'images'));
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, path.join(uploadPath, 'videos'));
    } else {
      cb(new Error('Only image and video files are allowed'), false);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow images and videos only
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
    files: 10 // Maximum 10 files at once
  }
});

// @desc    Upload single file
// @route   POST /api/upload/single
// @access  Private
router.post('/single', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = `/uploads/${req.file.mimetype.startsWith('image/') ? 'images' : 'videos'}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    console.error('Single file upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading file'
    });
  }
});

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedFiles = req.files.map(file => {
      const fileUrl = `/uploads/${file.mimetype.startsWith('image/') ? 'images' : 'videos'}/${file.filename}`;
      
      return {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl
      };
    });

    res.status(200).json({
      success: true,
      message: `${req.files.length} files uploaded successfully`,
      data: {
        files: uploadedFiles,
        count: uploadedFiles.length
      }
    });
  } catch (error) {
    console.error('Multiple file upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading files'
    });
  }
});

// @desc    Upload product images (cover + additional)
// @route   POST /api/upload/product-images
// @access  Private
router.post('/product-images', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), (req, res) => {
  try {
    const result = {
      coverImage: null,
      additionalImages: []
    };

    // Handle cover image
    if (req.files.coverImage && req.files.coverImage[0]) {
      const coverFile = req.files.coverImage[0];
      result.coverImage = {
        filename: coverFile.filename,
        originalName: coverFile.originalname,
        mimetype: coverFile.mimetype,
        size: coverFile.size,
        url: `/uploads/images/${coverFile.filename}`
      };
    }

    // Handle additional images
    if (req.files.additionalImages) {
      result.additionalImages = req.files.additionalImages.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: `/uploads/images/${file.filename}`
      }));
    }

    res.status(200).json({
      success: true,
      message: 'Product images uploaded successfully',
      data: result
    });
  } catch (error) {
    console.error('Product images upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading product images'
    });
  }
});

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private
router.delete('/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Determine file type by checking both directories
    const imagePath = path.join(__dirname, '../uploads/images', filename);
    const videoPath = path.join(__dirname, '../uploads/videos', filename);
    
    let filePath = null;
    let fileType = null;
    
    if (fs.existsSync(imagePath)) {
      filePath = imagePath;
      fileType = 'image';
    } else if (fs.existsSync(videoPath)) {
      filePath = videoPath;
      fileType = 'video';
    }
    
    if (!filePath) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    
    res.status(200).json({
      success: true,
      message: `${fileType} file deleted successfully`
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting file'
    });
  }
});

// @desc    Get all uploaded files info
// @route   GET /api/upload/files
// @access  Private
router.get('/files', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const result = {
      images: [],
      videos: []
    };
    
    // Get image files
    const imagesDir = path.join(uploadsDir, 'images');
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir);
      result.images = imageFiles.map(filename => ({
        filename,
        url: `/uploads/images/${filename}`,
        size: fs.statSync(path.join(imagesDir, filename)).size
      }));
    }
    
    // Get video files
    const videosDir = path.join(uploadsDir, 'videos');
    if (fs.existsSync(videosDir)) {
      const videoFiles = fs.readdirSync(videosDir);
      result.videos = videoFiles.map(filename => ({
        filename,
        url: `/uploads/videos/${filename}`,
        size: fs.statSync(path.join(videosDir, filename)).size
      }));
    }
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting files'
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size allowed is 10MB'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field'
      });
    }
  }
  
  if (error.message === 'Only image and video files are allowed') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
});

module.exports = router;