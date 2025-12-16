const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Static file serving for admin interface
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Hair Elevation Admin Demo API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    adminInterface: '/',
    demoMode: true,
    note: 'Running in demo mode without database connection'
  });
});

// Demo API endpoints (mock data)
app.get('/api/auth/test', (req, res) => {
  res.json({
    success: true,
    message: 'Demo API is working',
    note: 'This is a demo without database connection'
  });
});

app.get('/api/products', (req, res) => {
  // Mock product data for demo
  const mockProducts = [
    {
      _id: '1',
      name: 'Elegant Bridal Crown',
      price: 299.99,
      description: 'Beautiful bridal crown for special occasions',
      size: 'medium',
      collections: ['bridal-crowns'],
      inStock: true,
      featured: true,
      stockQuantity: 15,
      coverImage: 'https://via.placeholder.com/60x60?text=Bridal',
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Everyday Comfort Crown',
      price: 149.99,
      description: 'Comfortable crown for daily wear',
      size: 'small',
      collections: ['everyday-crown'],
      inStock: true,
      featured: false,
      stockQuantity: 8,
      coverImage: 'https://via.placeholder.com/60x60?text=Everyday',
      updatedAt: new Date().toISOString()
    },
    {
      _id: '3',
      name: "Queen's Curls Collection",
      price: 199.99,
      description: 'Beautiful curls for any style',
      size: 'large',
      collections: ['queens-curls'],
      inStock: false,
      featured: true,
      stockQuantity: 0,
      coverImage: 'https://via.placeholder.com/60x60?text=Curlys',
      updatedAt: new Date().toISOString()
    }
  ];

  res.json({
    success: true,
    data: {
      products: mockProducts,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProducts: mockProducts.length,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
  });
});

app.get('/api/products/featured/list', (req, res) => {
  const mockFeaturedProducts = [
    {
      _id: '1',
      name: 'Elegant Bridal Crown',
      price: 299.99,
      coverImage: 'https://via.placeholder.com/80x80?text=Bridal'
    },
    {
      _id: '3',
      name: "Queen's Curls Collection",
      price: 199.99,
      coverImage: 'https://via.placeholder.com/80x80?text=Curlys'
    }
  ];

  res.json({
    success: true,
    data: {
      products: mockFeaturedProducts
    }
  });
});

app.get('/api/upload/files', (req, res) => {
  res.json({
    success: true,
    data: {
      images: [
        {
          filename: 'demo-image-1.jpg',
          url: 'https://via.placeholder.com/200x150?text=Demo+Image+1',
          size: 102400
        },
        {
          filename: 'demo-image-2.jpg',
          url: 'https://via.placeholder.com/200x150?text=Demo+Image+2',
          size: 204800
        }
      ],
      videos: [
        {
          filename: 'demo-video.mp4',
          url: 'https://via.placeholder.com/200x150?text=Demo+Video',
          size: 1048576
        }
      ]
    }
  });
});

// POST endpoints for demo (just return success)
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    data: {
      token: 'demo-token-12345',
      admin: {
        _id: 'demo-admin-1',
        username: 'demo-admin',
        email: 'demo@hairelevation.com'
      }
    },
    message: 'Demo login successful'
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    success: true,
    data: {
      token: 'demo-token-12345',
      admin: {
        _id: 'demo-admin-1',
        username: req.body.username,
        email: req.body.email
      }
    },
    message: 'Demo registration successful'
  });
});

app.post('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    data: {
      admin: {
        _id: 'demo-admin-1',
        username: 'demo-admin',
        email: 'demo@hairelevation.com'
      }
    }
  });
});

app.post('/api/products', (req, res) => {
  res.json({
    success: true,
    message: 'Demo product created successfully'
  });
});

app.put('/api/products/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Demo product updated successfully'
  });
});

app.delete('/api/products/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Demo product deleted successfully'
  });
});

app.post('/api/upload/single', (req, res) => {
  res.json({
    success: true,
    data: {
      url: 'https://via.placeholder.com/400x300?text=Uploaded+File'
    },
    message: 'Demo file uploaded successfully'
  });
});

// Default route - Serve admin interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// API info endpoint
app.get('/api-info', (req, res) => {
  res.json({
    message: 'Hair Elevation Studios Admin API (Demo Mode)',
    version: '1.0.0-demo',
    mode: 'demo',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      upload: '/api/upload',
      admin: '/'
    },
    note: 'Running in demo mode with mock data - no database connection required'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Demo route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Demo Error:', error.message);
  res.status(500).json({
    success: false,
    message: 'Demo server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hair Elevation Admin Demo Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📱 Admin interface: http://localhost:${PORT}/`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`ℹ️  API Info: http://localhost:${PORT}/api-info`);
  console.log('');
  console.log('🎯 DEMO MODE - Running without database connection');
  console.log('🔐 Use any username/password to login in demo mode');
  console.log('📦 Mock data will be displayed for all operations');
  console.log('');
  console.log('✨ The admin system has been beautifully redesigned with modern UI!');
});

module.exports = app;