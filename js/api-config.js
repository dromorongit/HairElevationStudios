// API Configuration for Frontend
const API_CONFIG = {
    // For development, use localhost
    // For production, update this to your deployed backend URL
    BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://your-railway-app.railway.app/api',
    
    // Collection mapping
    COLLECTIONS: {
        'bridal-crowns': {
            name: 'The Bridal Crowns',
            image: 'bridalcrowns.jpg',
            link: 'bridal-crowns.html'
        },
        'everyday-crown': {
            name: 'The Everyday Crown',
            image: 'everydaycrown.jpg',
            link: 'everyday-crown.html'
        },
        'queens-curls': {
            name: 'The Queen\'s Curls',
            image: 'queenscurls.jpg',
            link: 'queens-curls.html'
        },
        'signature-pixies': {
            name: 'The Signature Pixies',
            image: 'signaturepixies.jpg',
            link: 'signature-pixies.html'
        }
    },

    // Helper method to get full image URL
    getImageUrl: function(imagePath) {
        if (!imagePath) return 'https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image';
        
        // If it's already a full URL, return as is
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        // If it's a relative path from backend uploads, prepend backend URL
        if (imagePath.startsWith('/uploads/')) {
            return window.location.hostname === 'localhost' 
                ? `http://localhost:5000${imagePath}`
                : `https://your-railway-app.railway.app${imagePath}`;
        }
        
        // For relative paths in the frontend folder, use as is
        return imagePath;
    }
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;