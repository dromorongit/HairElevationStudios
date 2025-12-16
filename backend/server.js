const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const uploadRoutes = require('./routes/upload');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { auth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create subdirectories for different file types
const imageDir = path.join(uploadsDir, 'images');
const videoDir = path.join(uploadsDir, 'videos');

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Security middleware
app.use(helmet());
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploaded files
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Hair Elevation Admin API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    adminInterface: '/',
    apiEndpoints: {
      auth: '/api/auth',
      products: '/api/products',
      upload: '/api/upload'
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', auth, productRoutes);
app.use('/api/upload', auth, uploadRoutes);

// Default route - Serve admin interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// API info endpoint
app.get('/api-info', (req, res) => {
  res.json({
    message: 'Hair Elevation Studios Admin API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      upload: '/api/upload',
      admin: '/'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:YSMCTEoYlMQzHJapOMWOotnBuqIOYEyt@mongodb.railway.internal:27017';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add these options for better Railway compatibility
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    // Check for existing admins and provide setup instructions if none exist
    const Admin = require('./models/Admin');
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      console.log('No admin accounts found.');
      console.log('Please register your first admin account at: /admin');
      console.log('Use the "Create Admin Account" option to set up your admin credentials.');
    } else {
      console.log(`Found ${adminCount} existing admin account(s).`);
    }

  } catch (error) {
    console.error('Database connection error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`Admin interface available at: http://localhost:${PORT}/admin`);
      console.log(`API health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;