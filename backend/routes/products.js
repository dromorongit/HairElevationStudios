const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Product = require('../models/Product');

const router = express.Router();

// @desc    Get all products with filtering and pagination
// @route   GET /api/products
// @access  Private
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('collection').optional().isIn(['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies']),
  query('featured').optional().isBoolean(),
  query('inStock').optional().isBoolean(),
  query('search').optional().isLength({ min: 1 }).withMessage('Search query cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    
    if (req.query.collection) {
      filter.collections = req.query.collection;
    }
    
    if (req.query.featured !== undefined) {
      filter.featured = req.query.featured === 'true';
    }
    
    if (req.query.inStock !== undefined) {
      filter.inStock = req.query.inStock === 'true';
    }
    
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Get products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting products'
    });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting product'
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private
router.post('/', [
  body('name').notEmpty().withMessage('Product name is required').isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('description').notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('size').isIn(['small', 'medium', 'large']).withMessage('Size must be small, medium, or large'),
  body('collections').isArray().withMessage('Collections must be an array'),
  body('collections.*').isIn(['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies']).withMessage('Invalid collection'),
  body('coverImage').notEmpty().withMessage('Cover image is required'),
  body('inStock').optional().isBoolean(),
  body('stockQuantity').optional().isInt({ min: 0 }),
  body('featured').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const productData = {
      ...req.body,
      stockQuantity: req.body.stockQuantity || 0
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with this slug already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error creating product'
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
router.put('/:id', [
  body('name').optional().isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('price').optional().isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('size').optional().isIn(['small', 'medium', 'large']).withMessage('Size must be small, medium, or large'),
  body('collections').optional().isArray().withMessage('Collections must be an array'),
  body('collections.*').optional().isIn(['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies']).withMessage('Invalid collection'),
  body('inStock').optional().isBoolean(),
  body('stockQuantity').optional().isInt({ min: 0 }),
  body('featured').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update product error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with this slug already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error updating product'
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting product'
    });
  }
});

// @desc    Get featured products for homepage
// @route   GET /api/products/featured
// @access  Private
router.get('/featured/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    
    const featuredProducts = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { products: featuredProducts }
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting featured products'
    });
  }
});

// @desc    Get products by collection
// @route   GET /api/products/collection/:collection
// @access  Private
router.get('/collection/:collection', [
  // Validation for collection parameter
], async (req, res) => {
  try {
    const { collection } = req.params;
    
    if (!['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies'].includes(collection)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid collection'
      });
    }

    const products = await Product.find({ 
      collections: collection 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { 
        products,
        collection,
        count: products.length 
      }
    });
  } catch (error) {
    console.error('Get collection products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting collection products'
    });
  }
});

module.exports = router;