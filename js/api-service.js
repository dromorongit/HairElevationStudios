// API Service for Frontend
class APIService {
    constructor() {
        this.baseURL = window.API_CONFIG.BASE_URL;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Generic fetch method with error handling
    async fetch(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Get cache key for endpoint and params
    getCacheKey(endpoint, params = {}) {
        const paramString = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');
        return `${endpoint}?${paramString}`;
    }

    // Get data with caching
    async get(endpoint, params = {}, useCache = true) {
        const cacheKey = this.getCacheKey(endpoint, params);
        
        if (useCache && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        const paramString = new URLSearchParams(params).toString();
        const url = paramString ? `${endpoint}?${paramString}` : endpoint;
        
        try {
            const data = await this.fetch(url);
            
            if (useCache) {
                this.cache.set(cacheKey, {
                    data: data,
                    timestamp: Date.now()
                });
            }
            
            return data;
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            
            // Return cached data if available, even if expired
            if (this.cache.has(cacheKey)) {
                console.log('Using expired cache due to network error');
                return this.cache.get(cacheKey).data;
            }
            
            throw error;
        }
    }

    // Get all products
    async getProducts(filters = {}) {
        const defaultFilters = { limit: 100, ...filters };
        const data = await this.get('/products', defaultFilters);
        return data.data.products;
    }

    // Get products by collection
    async getProductsByCollection(collection) {
        const data = await this.get(`/products/collection/${collection}`);
        return data.data.products;
    }

    // Get featured products
    async getFeaturedProducts(limit = 3) {
        const data = await this.get('/products/featured/list', { limit });
        return data.data.products;
    }

    // Get single product
    async getProduct(id) {
        const data = await this.get(`/products/${id}`);
        return data.data.product;
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Clear specific cache entry
    clearCacheEntry(endpoint, params = {}) {
        const cacheKey = this.getCacheKey(endpoint, params);
        this.cache.delete(cacheKey);
    }

    // Transform product data for frontend compatibility
    transformProduct(product) {
        return {
            id: product._id,
            name: product.name,
            price: product.price,
            image: window.API_CONFIG.getImageUrl(product.coverImage),
            description: product.description,
            category: product.collections[0] || '', // Use first collection as primary category
            collections: product.collections,
            size: product.size,
            length: product.length,
            texture: product.texture,
            lace: product.lace,
            density: product.density,
            quality: product.quality,
            color: product.color,
            inStock: product.inStock,
            stockQuantity: product.stockQuantity,
            featured: product.featured,
            additionalImages: product.additionalImages || [],
            videoUrl: product.videoUrl ? window.API_CONFIG.getImageUrl(product.videoUrl) : null,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    // Get collections data
    async getCollections() {
        const collections = [];
        
        for (const [key, value] of Object.entries(window.API_CONFIG.COLLECTIONS)) {
            try {
                const products = await this.getProductsByCollection(key);
                collections.push({
                    ...value,
                    key,
                    productCount: products.length
                });
            } catch (error) {
                console.warn(`Failed to load products for collection ${key}:`, error);
                collections.push({
                    ...value,
                    key,
                    productCount: 0
                });
            }
        }
        
        return collections;
    }

    // Search products
    async searchProducts(query) {
        return await this.get('/products', { search: query });
    }

    // Get products with filters
    async getFilteredProducts(filters = {}) {
        return await this.get('/products', filters);
    }
}

// Create global instance
window.apiService = new APIService();

// Export for use in other files
window.APIService = APIService;