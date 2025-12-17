// API Service for connecting to backend
const API_BASE_URL = 'https://hairelevationstudios-production.up.railway.app';

class APIService {
    async fetch(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
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

        return await response.json();
    }

    async getAllProducts() {
        return await this.fetch('/products');
    }

    async getFeaturedProducts() {
        return await this.fetch('/products/featured');
    }

    async getProductById(id) {
        return await this.fetch(`/products/${id}`);
    }

    getImageUrl(path) {
        if (!path) return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image';
        
        // Handle different URL formats
        if (path.startsWith('http')) {
            // Already a full URL (Cloudinary, AWS S3, etc.)
            return path;
        } else if (path.startsWith('/uploads/')) {
            // Legacy local upload path - these won't work on Railway
            // Return placeholder until you implement cloud storage
            return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Image+Unavailable';
        } else {
            // Relative path - construct full URL (for local development)
            return `${API_BASE_URL}${path}`;
        }
    }

    getProductsByCollection(collectionName) {
        // Since backend doesn't have collection filter, fetch all and filter
        return this.getAllProducts().then(products =>
            products.filter(product => product.collections && product.collections.includes(collectionName))
        );
    }
}

// Global instance
window.apiService = new APIService();