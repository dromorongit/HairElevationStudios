"use strict";

// Load API configuration and service
// These need to be loaded before main.js
// <script src="js/api-config.js"></script>
// <script src="js/api-service.js"></script>

// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const fullNavList = document.querySelector('.nav-list.full');
if (hamburger && fullNavList) {
    hamburger.addEventListener('click', () => {
        fullNavList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Global variables for API data
let products = [];
let collections = [];
let isLoading = false;

// Show loading indicator
function showLoading(container) {
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 40px;"><div class="loading"></div><p>Loading products...</p></div>';
    }
}

// Show error message
function showError(container, message = 'Failed to load products. Please try again later.') {
    if (container) {
        container.innerHTML = `<div style="text-align: center; padding: 40px; color: #dc3545;"><i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i><p>${message}</p></div>`;
    }
}

// Cart management
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ product, quantity });
        }
    }
    
    saveCart(cart);
    updateCartCount();
    alert(`${quantity} item(s) added to cart!`);
}

function removeFromCart(productId) {
    const cart = getCart().filter(item => item.product.id !== productId);
    saveCart(cart);
    updateCartCount();
    renderCart();
}

function getCartTotal() {
    return getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
    const count = getCartCount();
    const countEls = document.querySelectorAll('.cart-count');
    countEls.forEach(countEl => {
        countEl.textContent = count.toString();
        countEl.style.display = count > 0 ? 'block' : 'none';
    });
}

// Load data from API
async function loadData() {
    if (isLoading) return;
    isLoading = true;

    try {
        // Load products and collections in parallel
        const [productsData, collectionsData] = await Promise.all([
            window.apiService.getProducts(),
            window.apiService.getCollections()
        ]);

        // Transform products for frontend compatibility
        products = productsData.map(product => window.apiService.transformProduct(product));
        collections = collectionsData;

        console.log('Data loaded successfully:', { products: products.length, collections: collections.length });
    } catch (error) {
        console.error('Failed to load data:', error);
        
        // Fallback to empty arrays if API fails
        products = [];
        collections = Object.entries(window.API_CONFIG.COLLECTIONS).map(([key, value]) => ({
            ...value,
            key,
            productCount: 0
        }));
        
        // Show error on the page
        const featuredContainer = document.getElementById('featured-products');
        const collectionsContainer = document.getElementById('collections-products');
        
        if (featuredContainer) {
            showError(featuredContainer, 'Failed to load featured products. Please check your connection.');
        }
        
        if (collectionsContainer && !collectionsContainer.dataset.category) {
            showError(collectionsContainer, 'Failed to load collections. Please check your connection.');
        }
    } finally {
        isLoading = false;
    }
}

// Render products function
function renderProducts(productsToShow, container, limit) {
    if (!container) return;

    const products = limit ? productsToShow.slice(0, limit) : productsToShow;
    
    if (products.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px;"><p>No products found.</p></div>';
        return;
    }

    container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image'">
      <h3>${product.name}</h3>
      <p>₵${product.price}</p>
      ${!product.inStock ? '<div class="out-of-stock-badge">Out of Stock</div>' : ''}
      <div class="quantity-controls">
        <button class="quantity-btn decrease" data-id="${product.id}">-</button>
        <span class="quantity" data-id="${product.id}">1</span>
        <button class="quantity-btn increase" data-id="${product.id}">+</button>
      </div>
      <div class="product-actions">
        <button class="btn add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <a href="product.html?id=${product.id}" class="btn">View Details</a>
      </div>
    </div>
  `).join('');

    // Add event listeners for quantity buttons on cards
    container.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const quantitySpan = container.querySelector(`.quantity[data-id="${productId}"]`);
            let qty = parseInt(quantitySpan.textContent);
            qty += 1;
            quantitySpan.textContent = qty.toString();
        });
    });

    container.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const quantitySpan = container.querySelector(`.quantity[data-id="${productId}"]`);
            let qty = parseInt(quantitySpan.textContent);
            if (qty > 1) {
                qty -= 1;
                quantitySpan.textContent = qty.toString();
            }
        });
    });

    // Add event listeners for Add to Cart buttons
    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(e.target.dataset.id);
            const quantitySpan = container.querySelector(`.quantity[data-id="${productId}"]`);
            const quantity = parseInt(quantitySpan.textContent);
            addToCart(productId, quantity);
        });
    });
}

// Render collections function
function renderCollections(collectionsToShow, container) {
    if (!container) return;

    container.innerHTML = collectionsToShow.map(collection => `
    <div class="product-card">
      <a href="${collection.link}">
        <img src="${collection.image}" alt="${collection.name}">
        <h3>${collection.name}</h3>
        <p class="collection-count">${collection.productCount} products</p>
      </a>
    </div>
  `).join('');
}

// Render cart function
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer || !cartTotal) return;

    const cart = getCart();
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '₵0';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}">
      <div class="cart-item-details">
        <h3>${item.product.name}</h3>
        <div class="quantity-controls">
          <button class="quantity-btn decrease" data-id="${item.product.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.product.id}">+</button>
        </div>
        <p>₵${item.product.price} each</p>
        <p>Subtotal: ₵${item.product.price * item.quantity}</p>
      </div>
      <button class="btn remove-from-cart" data-id="${item.product.id}">Remove</button>
    </div>
  `).join('');

    cartTotal.textContent = `₵${getCartTotal()}`;

    // Add event listeners for Remove buttons
    cartContainer.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });

    // Add event listeners for quantity buttons
    cartContainer.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const cart = getCart();
            const item = cart.find(item => item.product.id === productId);
            if (item) {
                item.quantity += 1;
                saveCart(cart);
                updateCartCount();
                renderCart();
            }
        });
    });

    cartContainer.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const cart = getCart();
            const item = cart.find(item => item.product.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    saveCart(cart);
                    updateCartCount();
                    renderCart();
                } else {
                    removeFromCart(productId);
                }
            }
        });
    });
}

// Render product detail function
async function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productContent = document.getElementById('product-content');
    
    if (!productId || !productContent) return;

    try {
        showLoading(productContent);
        
        // Get product from our loaded products array first
        let product = products.find(p => p.id === productId);
        
        // If not found in cache, fetch from API
        if (!product) {
            const productData = await window.apiService.getProduct(productId);
            product = window.apiService.transformProduct(productData);
        }

        if (!product) {
            productContent.innerHTML = '<p>Product not found.</p>';
            return;
        }

        productContent.innerHTML = `
        <div class="product-detail-content">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x500/3B2A23/F5EFE6?text=No+Image'">
            ${product.additionalImages && product.additionalImages.length > 0 ? `
              <div class="additional-images">
                ${product.additionalImages.map(img => `
                  <img src="${window.API_CONFIG.getImageUrl(img.url)}" alt="${product.name}" onclick="document.querySelector('.product-image img').src = this.src">
                `).join('')}
              </div>
            ` : ''}
            ${product.videoUrl ? `
              <div class="product-video">
                <video src="${product.videoUrl}" controls style="width: 100%; margin-top: 10px; border-radius: 8px;"></video>
              </div>
            ` : ''}
          </div>
          <div class="product-info">
            <h1>${product.name}</h1>
            <div class="product-price">₵${product.price}</div>
            ${!product.inStock ? '<div class="out-of-stock-notice">This item is currently out of stock</div>' : ''}
            <div class="product-specs">
              <h3>Specifications</h3>
              <ul>
                ${product.size ? `<li><strong>Size:</strong> ${product.size}</li>` : ''}
                ${product.length ? `<li><strong>Length:</strong> ${product.length}</li>` : ''}
                ${product.texture ? `<li><strong>Texture:</strong> ${product.texture}</li>` : ''}
                ${product.lace ? `<li><strong>Lace:</strong> ${product.lace}</li>` : ''}
                ${product.density ? `<li><strong>Density:</strong> ${product.density}</li>` : ''}
                ${product.quality ? `<li><strong>Quality:</strong> ${product.quality}</li>` : ''}
                ${product.color ? `<li><strong>Color:</strong> ${product.color}</li>` : ''}
              </ul>
            </div>
            <div class="product-description">${product.description}</div>
            <div class="product-detail-actions">
              <button class="btn add-to-cart-detail" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                  ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <a href="collections.html" class="btn">Back to Collections</a>
            </div>
          </div>
        </div>
      `;

        // Add event listener for Add to Cart button
        const addToCartBtn = document.querySelector('.add-to-cart-detail');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            });
        }
    } catch (error) {
        console.error('Error loading product detail:', error);
        productContent.innerHTML = '<p>Failed to load product details. Please try again later.</p>';
    }
}

// Main initialization function
async function initializePage() {
    // Update cart count
    updateCartCount();

    // Load data if not already loaded
    if (products.length === 0) {
        await loadData();
    }

    // Featured products on home page
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        try {
            showLoading(featuredContainer);
            const featuredProducts = await window.apiService.getFeaturedProducts(3);
            const transformedFeatured = featuredProducts.map(product => window.apiService.transformProduct(product));
            renderProducts(transformedFeatured, featuredContainer, 3);
        } catch (error) {
            console.error('Error loading featured products:', error);
            showError(featuredContainer);
        }
    }

    // Collections or filtered products on collections page
    const collectionsContainer = document.getElementById('collections-products');
    if (collectionsContainer) {
        if (collectionsContainer.dataset.category) {
            try {
                showLoading(collectionsContainer);
                const categoryProducts = await window.apiService.getProductsByCollection(collectionsContainer.dataset.category);
                const transformedProducts = categoryProducts.map(product => window.apiService.transformProduct(product));
                renderProducts(transformedProducts, collectionsContainer);
            } catch (error) {
                console.error('Error loading collection products:', error);
                showError(collectionsContainer);
            }
        } else {
            renderCollections(collections, collectionsContainer);
        }
    }

    // Cart page
    if (document.getElementById('cart-items')) {
        renderCart();
    }

    // Product detail page
    if (document.getElementById('product-content')) {
        await renderProductDetail();
    }

    // Checkout page
    const checkoutForm = document.getElementById('checkout-form');
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const checkoutMessage = document.getElementById('checkout-message');
    
    if (checkoutForm && orderItems && orderTotal) {
        // Display order summary
        const cart = getCart();
        orderItems.innerHTML = cart.map(item => `
      <div class="order-item">
        <p>${item.product.name} x ${item.quantity} - ₵${item.product.price * item.quantity}</p>
      </div>
    `).join('');
        orderTotal.textContent = `₵${getCartTotal()}`;
        
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simple validation
            const name = document.getElementById('shipping-name').value;
            const email = document.getElementById('shipping-email').value;
            const phone = document.getElementById('shipping-phone').value;
            const address = document.getElementById('shipping-address').value;
            const city = document.getElementById('shipping-city').value;
            const payment = document.getElementById('payment-method').value;
            
            if (!name || !email || !phone || !address || !city || !payment) {
                if (checkoutMessage) {
                    checkoutMessage.textContent = 'Please fill in all required fields.';
                    checkoutMessage.style.color = 'red';
                }
                return;
            }
            
            // Simulate order placement
            localStorage.removeItem('cart');
            if (checkoutMessage) {
                checkoutMessage.textContent = 'Order placed successfully! You will receive a confirmation email shortly.';
                checkoutMessage.style.color = 'green';
            }
            checkoutForm.reset();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }
}

// Form validation for booking (existing functionality)
const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');
if (bookingForm && formMessage) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('full-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value.trim();
        
        let isValid = true;
        let message = '';
        
        if (!fullName) {
            isValid = false;
            message += 'Full Name is required.<br>';
        }
        if (!phone) {
            isValid = false;
            message += 'Phone Number is required.<br>';
        }
        else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            isValid = false;
            message += 'Please enter a valid phone number.<br>';
        }
        if (!service) {
            isValid = false;
            message += 'Service Type is required.<br>';
        }
        if (!date) {
            isValid = false;
            message += 'Preferred Date is required.<br>';
        }
        if (!time) {
            isValid = false;
            message += 'Preferred Time is required.<br>';
        }
        
        if (isValid) {
            // Format service name for better readability
            const serviceNames = {
                'custom-wig': 'Custom Wig Making',
                'revamp': 'Wig Revamp & Maintenance',
                'installation': 'Wig Installation & Sew-in'
            };
            const formattedService = serviceNames[service] || service;
            
            // Format the booking message
            const bookingMessage = `🏪 *BOOKING REQUEST - Hair Elevation Studio*%0A%0A` +
                `👤 *Name:* ${fullName}%0A` +
                `📱 *Phone:* ${phone}%0A` +
                `✂️ *Service:* ${formattedService}%0A` +
                `📅 *Preferred Date:* ${date}%0A` +
                `⏰ *Preferred Time:* ${time}%0A` +
                (notes ? `📝 *Additional Notes:* ${notes}%0A` : '') +
                `%0A---\n` +
                `Please confirm my appointment request. Thank you! 🙏`;
            
            // WhatsApp URL with pre-filled message
            const whatsappUrl = `https://wa.me/233534057109?text=${bookingMessage}`;
            
            // Show loading message
            formMessage.innerHTML = 'Opening WhatsApp to send your booking request...';
            formMessage.style.color = '#C8A97E';
            
            // Reset form after a short delay
            setTimeout(() => {
                bookingForm.reset();
                formMessage.innerHTML = 'WhatsApp opened! Your booking details have been sent. We will confirm your appointment shortly.';
                formMessage.style.color = 'green';
            }, 1000);
            
            // Open WhatsApp in new window/tab
            window.open(whatsappUrl, '_blank');
        }
        else {
            formMessage.style.color = 'red';
            formMessage.innerHTML = message;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Check if API files are loaded
    if (typeof window.API_CONFIG === 'undefined' || typeof window.apiService === 'undefined') {
        console.error('API configuration files not loaded. Please include api-config.js and api-service.js before main.js');
        return;
    }

    try {
        await initializePage();
    } catch (error) {
        console.error('Failed to initialize page:', error);
        
        // Show error message on page
        const main = document.querySelector('main') || document.body;
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'text-align: center; padding: 40px; color: #dc3545;';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i><h2>Unable to load content</h2><p>Please check your internet connection and refresh the page.</p>';
        main.appendChild(errorDiv);
    }
});

// Export functions for global access
window.renderProducts = renderProducts;
window.renderCollections = renderCollections;
window.renderCart = renderCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartCount = updateCartCount;
