import express, { Request, Response } from 'express';
import Product from '../models/Product';
import authMiddleware from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured products
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ featured: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (protected)
router.post('/create', authMiddleware, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const productData = req.body;

    // Parse collections if it's a JSON string
    if (productData.collections && typeof productData.collections === 'string') {
      try {
        productData.collections = JSON.parse(productData.collections);
      } catch (e) {
        // If parsing fails, treat as single value array
        productData.collections = [productData.collections];
      }
    }

    // Parse size if it's a JSON string
    if (productData.size && typeof productData.size === 'string') {
      try {
        productData.size = JSON.parse(productData.size);
      } catch (e) {
        // If parsing fails, treat as single value array
        productData.size = [productData.size];
      }
    }

    // Convert booleans
    productData.featured = productData.featured === 'true';
    productData.onSale = productData.onSale === 'true';

    // Convert prices to numbers
    productData.price = parseFloat(productData.price);
    if (productData.promoPrice) {
      productData.promoPrice = parseFloat(productData.promoPrice);
    }

    if (files.coverImage) {
      productData.coverImage = files.coverImage[0].path;
    }
    if (files.additionalImages) {
      productData.additionalImages = files.additionalImages.map(file => file.path);
    }
    if (files.videos) {
      productData.videos = files.videos.map(file => file.path);
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (protected)
router.put('/update/:id', authMiddleware, upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const productData = req.body;

    // First, get the existing product to preserve file paths if no new files are uploaded
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Parse collections if it's a JSON string
    if (productData.collections && typeof productData.collections === 'string') {
      try {
        productData.collections = JSON.parse(productData.collections);
      } catch (e) {
        // If parsing fails, treat as single value array
        productData.collections = [productData.collections];
      }
    }

    // Parse size if it's a JSON string
    if (productData.size && typeof productData.size === 'string') {
      try {
        productData.size = JSON.parse(productData.size);
      } catch (e) {
        // If parsing fails, treat as single value array
        productData.size = [productData.size];
      }
    }

    // Convert booleans
    productData.featured = productData.featured === 'true';
    productData.onSale = productData.onSale === 'true';

    // Convert prices to numbers
    productData.price = parseFloat(productData.price);
    if (productData.promoPrice) {
      productData.promoPrice = parseFloat(productData.promoPrice);
    }

    // Only update file paths if new files are uploaded, otherwise preserve existing ones
    if (files.coverImage) {
      productData.coverImage = files.coverImage[0].path;
    } else {
      productData.coverImage = existingProduct.coverImage;
    }
    
    if (files.additionalImages) {
      productData.additionalImages = files.additionalImages.map(file => file.path);
    } else {
      productData.additionalImages = existingProduct.additionalImages;
    }
    
    if (files.videos) {
      productData.videos = files.videos.map(file => file.path);
    } else {
      productData.videos = existingProduct.videos;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (protected)
router.delete('/delete/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;