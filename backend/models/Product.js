const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Product specifications
  size: {
    type: String,
    required: [true, 'Product size is required'],
    enum: ['small', 'medium', 'large']
  },
  length: {
    type: String,
    trim: true
  },
  texture: {
    type: String,
    trim: true
  },
  lace: {
    type: String,
    trim: true
  },
  density: {
    type: String,
    trim: true
  },
  quality: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },

  // Collections - products can belong to multiple collections
  collections: [{
    type: String,
    enum: ['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies']
  }],

  // Images and videos
  coverImage: {
    type: String,
    required: [true, 'Cover image is required']
  },
  additionalImages: [{
    url: String,
    alt: String
  }],
  videoUrl: {
    type: String
  },

  // Inventory management
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0
  },

  // Featured product for homepage
  featured: {
    type: Boolean,
    default: false
  },

  // SEO and metadata
  slug: {
    type: String,
    unique: true,
    sparse: true
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  this.updatedAt = Date.now();
  next();
});

// Update timestamp on update
productSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

module.exports = mongoose.model('Product', productSchema);