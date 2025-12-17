// Main JavaScript for frontend
let products = [];
let isLoading = false;

// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const fullNavList = document.querySelector('.nav-list.full');
if (hamburger && fullNavList) {
    hamburger.addEventListener('click', () => {
        fullNavList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
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
    const existingItem = cart.find(item => item.product._id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const product = products.find(p => p._id === productId);
        if (product) {
            cart.push({ product, quantity });
        }
    }

    saveCart(cart);
    updateCartCount();
    alert(`${quantity} item(s) added to cart!`);
}

function removeFromCart(productId) {
    const cart = getCart().filter(item => item.product._id !== productId);
    saveCart(cart);
    updateCartCount();
    renderCart();
}

function updateCartItemQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.product._id === productId);
    
    if (item) {
        item.quantity += change;
        
        // Remove item if quantity becomes 0 or negative
        if (item.quantity <= 0) {
            const updatedCart = cart.filter(item => item.product._id !== productId);
            saveCart(updatedCart);
        } else {
            saveCart(cart);
        }
        
        updateCartCount();
        renderCart();
    }
}

function getCartTotal() {
    return getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
    const count = getCartCount();
    const countEls = document.querySelectorAll('.cart-count, #cart-count');
    countEls.forEach(countEl => {
        countEl.textContent = count.toString();
        countEl.style.display = count > 0 ? 'block' : 'none';
    });
}

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

// Render products
function renderProducts(productsToShow, container, limit) {
    if (!container) return;

    const products = limit ? productsToShow.slice(0, limit) : productsToShow;

    if (products.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px;"><p>No products found.</p></div>';
        return;
    }

    container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${window.apiService.getImageUrl(product.coverImage)}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=No+Image'">
      <h3>${product.name}</h3>
      <p>₵${product.price}</p>
      <div class="quantity-controls">
        <button class="quantity-btn decrease" data-id="${product._id}">-</button>
        <span class="quantity" data-id="${product._id}">1</span>
        <button class="quantity-btn increase" data-id="${product._id}">+</button>
      </div>
      <div class="product-actions">
        <button class="btn add-to-cart" data-id="${product._id}">Add to Cart</button>
        <a href="product.html?id=${product._id}" class="btn">View Details</a>
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
            const productId = e.target.dataset.id;
            const quantitySpan = container.querySelector(`.quantity[data-id="${productId}"]`);
            const quantity = parseInt(quantitySpan.textContent);
            addToCart(productId, quantity);
        });
    });
}

// Render cart
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
      <img src="${window.apiService.getImageUrl(item.product.coverImage)}" alt="${item.product.name}">
      <div class="cart-item-details">
        <h3>${item.product.name}</h3>
        <p>₵${item.product.price} each</p>
        <div class="quantity-controls">
          <button class="quantity-btn decrease-cart" data-id="${item.product._id}">-</button>
          <span class="quantity cart-quantity" data-id="${item.product._id}">${item.quantity}</span>
          <button class="quantity-btn increase-cart" data-id="${item.product._id}">+</button>
        </div>
        <p>Subtotal: ₵${item.product.price * item.quantity}</p>
      </div>
      <button class="btn remove-from-cart" data-id="${item.product._id}">Remove</button>
    </div>
  `).join('');

    cartTotal.textContent = `₵${getCartTotal()}`;

    // Add event listeners for Remove buttons
    cartContainer.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });

    // Add event listeners for cart quantity controls
    cartContainer.querySelectorAll('.increase-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            updateCartItemQuantity(productId, 1);
        });
    });

    cartContainer.querySelectorAll('.decrease-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            updateCartItemQuantity(productId, -1);
        });
    });
}

// Render product detail
async function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productContent = document.getElementById('product-content');

    if (!productId || !productContent) return;

    try {
        showLoading(productContent);

        const product = await window.apiService.getProductById(productId);

        if (!product) {
            productContent.innerHTML = '<p>Product not found.</p>';
            return;
        }

        productContent.innerHTML = `
        <div class="product-detail-content">
          <div class="product-image">
            <img src="${window.apiService.getImageUrl(product.coverImage)}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x500/3B2A23/F5EFE6?text=No+Image'">
            ${product.additionalImages && product.additionalImages.length > 0 ? `
              <div class="additional-images">
                ${product.additionalImages.map(img => `
                  <img src="${window.apiService.getImageUrl(img)}" alt="${product.name}" onclick="document.querySelector('.product-image img').src = this.src">
                `).join('')}
              </div>
            ` : ''}
            ${product.videos && product.videos.length > 0 ? `
              <div class="product-video">
                ${product.videos.map(video => `
                  <video src="${window.apiService.getImageUrl(video)}" controls style="width: 100%; margin-top: 10px; border-radius: 8px;"></video>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div class="product-info">
            <h1>${product.name}</h1>
            <div class="product-price">₵${product.price}</div>
            <div class="product-specs">
              <h3>Specifications</h3>
              <ul>
                ${product.size ? `<li><strong>Size:</strong> ${Array.isArray(product.size) ? product.size.join(', ') : product.size}</li>` : ''}
                ${product.length ? `<li><strong>Length:</strong> ${product.length}</li>` : ''}
                ${product.texture ? `<li><strong>Texture:</strong> ${product.texture}</li>` : ''}
                ${product.lace ? `<li><strong>Lace:</strong> ${product.lace}</li>` : ''}
                ${product.density ? `<li><strong>Density:</strong> ${product.density}</li>` : ''}
                ${product.quality ? `<li><strong>Quality:</strong> ${product.quality}</li>` : ''}
                ${product.color ? `<li><strong>Color:</strong> ${product.color}</li>` : ''}
              </ul>
            </div>
            <div class="product-description">${product.description || ''}</div>
            <div class="product-detail-actions">
              <button class="btn add-to-cart-detail" data-id="${product._id}">Add to Cart</button>
              <a href="collections.html" class="btn">Back to Collections</a>
            </div>
          </div>
        </div>
      `;

        // Add event listener for Add to Cart button
        const addToCartBtn = document.querySelector('.add-to-cart-detail');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                addToCart(productId);
            });
        }
    } catch (error) {
        console.error('Error loading product detail:', error);
        productContent.innerHTML = '<p>Failed to load product details. Please try again later.</p>';
    }
}

// Load data
async function loadData() {
    if (isLoading) return;
    isLoading = true;

    try {
        // Load all products
        products = await window.apiService.getAllProducts();
        console.log('Products loaded:', products.length);
    } catch (error) {
        console.error('Failed to load products:', error);
        products = [];
    } finally {
        isLoading = false;
    }
}

// Initialize page
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
            const featuredProducts = await window.apiService.getFeaturedProducts();
            renderProducts(featuredProducts, featuredContainer, 3);
        } catch (error) {
            console.error('Error loading featured products:', error);
            showError(featuredContainer);
        }
    }

    // Collection pages
    const collectionMappings = {
        'bridal-crowns': 'The Bridal Crowns',
        'everyday-crown': 'The Everyday Crown',
        'queens-curls': 'The Queen\'s Curls',
        'signature-pixies': 'The Signature Pixies'
    };

    for (const [page, collectionName] of Object.entries(collectionMappings)) {
        if (window.location.pathname.includes(`${page}.html`)) {
            const container = document.getElementById('collections-products') || document.getElementById('products-container');
            if (container) {
                try {
                    showLoading(container);
                    const collectionProducts = await window.apiService.getProductsByCollection(collectionName);
                    renderProducts(collectionProducts, container);
                } catch (error) {
                    console.error(`Error loading ${collectionName} products:`, error);
                    showError(container);
                }
            }
            break;
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
            const notes = document.getElementById('additional-notes').value; // Optional field

            // Only require essential fields (notes is optional)
            if (!name || !email || !phone || !address || !city || !payment) {
                if (checkoutMessage) {
                    checkoutMessage.textContent = 'Please fill in all required fields.';
                    checkoutMessage.style.color = 'red';
                }
                return;
            }

            // Validate payment method (only mobile money now)
            if (payment !== 'mobile') {
                if (checkoutMessage) {
                    checkoutMessage.textContent = 'Please select a valid payment method.';
                    checkoutMessage.style.color = 'red';
                }
                return;
            }

            // Prepare order data including notes
            const orderData = {
                name,
                email,
                phone,
                address,
                city,
                payment,
                notes: notes || '', // Include notes if provided
                items: cart.map(item => ({
                    productId: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                total: getCartTotal()
            };

            // Log order data (in real app, this would be sent to backend)
            console.log('Order submitted:', orderData);

            // Simulate order placement
            localStorage.removeItem('cart');
            if (checkoutMessage) {
                let successMessage = 'Order placed successfully! You will receive a confirmation email shortly.';
                if (notes.trim()) {
                    successMessage += ` Your notes: "${notes.trim()}" have been noted for processing.`;
                }
                checkoutMessage.textContent = successMessage;
                checkoutMessage.style.color = 'green';
            }
            checkoutForm.reset();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Check if API is loaded
    if (typeof window.apiService === 'undefined') {
        console.error('API service not loaded. Please include api.js before main.js');
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