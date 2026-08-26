"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const auth_1 = __importDefault(require("../middleware/auth"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.set('Cache-Control', 'public, max-age=300');
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Get featured products
router.get('/featured', async (req, res) => {
    try {
        const products = await Product_1.default.find({ featured: true });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Create product (protected)
router.post('/create', auth_1.default, upload_1.default.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]), async (req, res) => {
    try {
        const files = req.files;
        const productData = req.body;
        // Check if cover image is provided
        if (!files.coverImage || !files.coverImage[0]) {
            return res.status(400).json({ message: 'Cover image is required' });
        }
        // Parse collections if it's a JSON string
        if (productData.collections && typeof productData.collections === 'string') {
            try {
                productData.collections = JSON.parse(productData.collections);
            }
            catch (e) {
                // If parsing fails, treat as single value array
                productData.collections = [productData.collections];
            }
        }
        // Parse size if it's a JSON string
        if (productData.size && typeof productData.size === 'string') {
            try {
                productData.size = JSON.parse(productData.size);
            }
            catch (e) {
                // If parsing fails, treat as single value array
                productData.size = [productData.size];
            }
        }
        // Convert booleans
        productData.featured = productData.featured === 'true';
        productData.onSale = productData.onSale === 'true';
        // Convert prices to numbers
        productData.price = parseFloat(productData.price);
        if (isNaN(productData.price)) {
            return res.status(400).json({ message: 'Valid price is required' });
        }
        if (productData.promoPrice) {
            productData.promoPrice = parseFloat(productData.promoPrice);
        }
        // Handle Cloudinary uploaded files
        if (files.coverImage && files.coverImage[0]) {
            // For Cloudinary, the secure URL is in file.path
            productData.coverImage = files.coverImage[0].path;
        }
        if (files.additionalImages) {
            productData.additionalImages = files.additionalImages.map(file => file.path);
        }
        if (files.videos) {
            productData.videos = files.videos.map(file => file.path);
        }
        const product = new Product_1.default(productData);
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        console.error('Error creating product:', error);
        // Return more specific error message
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((e) => e.message);
            console.error('Validation errors:', validationErrors);
            return res.status(400).json({ message: 'Validation error', errors: validationErrors });
        }
        if (error.name === 'MongoServerError') {
            console.error('MongoDB error:', error.message);
            return res.status(500).json({ message: 'Database error: ' + error.message });
        }
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: error.message || 'Server error' });
    }
});
// Update product (protected)
router.put('/update/:id', auth_1.default, upload_1.default.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]), async (req, res) => {
    try {
        const files = req.files;
        const productData = req.body;
        // First, get the existing product to preserve file paths if no new files are uploaded
        const existingProduct = await Product_1.default.findById(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Parse collections if it's a JSON string
        if (productData.collections && typeof productData.collections === 'string') {
            try {
                productData.collections = JSON.parse(productData.collections);
            }
            catch (e) {
                // If parsing fails, treat as single value array
                productData.collections = [productData.collections];
            }
        }
        // Parse size if it's a JSON string
        if (productData.size && typeof productData.size === 'string') {
            try {
                productData.size = JSON.parse(productData.size);
            }
            catch (e) {
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
        if (files.coverImage && files.coverImage[0]) {
            productData.coverImage = files.coverImage[0].path;
        }
        else {
            productData.coverImage = existingProduct.coverImage;
        }
        if (files.additionalImages && files.additionalImages.length > 0) {
            productData.additionalImages = files.additionalImages.map(file => file.path);
        }
        else {
            productData.additionalImages = existingProduct.additionalImages;
        }
        if (files.videos && files.videos.length > 0) {
            productData.videos = files.videos.map(file => file.path);
        }
        else {
            productData.videos = existingProduct.videos;
        }
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete product (protected)
router.delete('/delete/:id', auth_1.default, async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Upload payment proof
router.post('/upload-payment-proof', upload_1.default.single('paymentProof'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({ url: req.file.path });
    }
    catch (error) {
        console.error('Error uploading payment proof:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
