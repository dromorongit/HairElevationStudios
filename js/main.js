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

function addToCart(productId, quantity = 1, selectedSize = null) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product._id === productId && item.selectedSize === selectedSize);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const product = products.find(p => p._id === productId);
        if (product) {
            cart.push({ product, quantity, selectedSize });
        }
    }

    saveCart(cart);
    updateCartCount();
    alert(`${quantity} item(s) added to cart!`);
}

function removeFromCart(productId, selectedSize = null) {
    const cart = getCart().filter(item => !(item.product._id === productId && item.selectedSize === selectedSize));
    saveCart(cart);
    updateCartCount();
    renderCart();
}

function updateCartItemQuantity(productId, change, selectedSize = null) {
    const cart = getCart();
    const item = cart.find(item => item.product._id === productId && item.selectedSize === selectedSize);

    if (item) {
        item.quantity += change;

        // Remove item if quantity becomes 0 or negative
        if (item.quantity <= 0) {
            const updatedCart = cart.filter(item => !(item.product._id === productId && item.selectedSize === selectedSize));
            saveCart(updatedCart);
        } else {
            saveCart(cart);
        }

        updateCartCount();
        renderCart();
    }
}

function updateCartItemSize(index, newSize) {
    const cart = getCart();
    if (cart[index] && newSize) {
        // Remove the old item
        const oldItem = cart.splice(index, 1)[0];

        // Check if an item with the same product and new size already exists
        const existingItem = cart.find(item => item.product._id === oldItem.product._id && item.selectedSize === newSize);

        if (existingItem) {
            // Merge quantities
            existingItem.quantity += oldItem.quantity;
        } else {
            // Add the item with new size
            cart.splice(index, 0, { ...oldItem, selectedSize: newSize });
        }

        saveCart(cart);
        updateCartCount();
        renderCart();
    }
}

function getCartTotal() {
    return getCart().reduce((total, item) => {
        const price = item.product.onSale && item.product.promoPrice ? item.product.promoPrice : item.product.price;
        return total + (price * item.quantity);
    }, 0);
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
      ${!product.inStock ? '<div class="out-of-stock-badge">Out of Stock</div>' : ''}
      ${product.onSale ? '<div class="sale-badge">Sale</div>' : ''}
      <h3>${product.name}</h3>
      ${product.onSale && product.promoPrice ? `
        <p class="price-container">
          <span class="original-price" style="text-decoration: line-through; color: #999;">₵${product.price}</span>
          <span class="promo-price" style="color: #d32f2f; font-weight: bold;">₵${product.promoPrice}</span>
        </p>
      ` : `<p>₵${product.price}</p>`}
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

    cartContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${window.apiService.getImageUrl(item.product.coverImage)}" alt="${item.product.name}">
      <div class="cart-item-details">
        <h3>${item.product.name}</h3>
        ${item.product.onSale && item.product.promoPrice ? `
          <p class="cart-item-price" style="color: #d32f2f; font-weight: bold;">
            <span style="text-decoration: line-through; color: #999;">₵${item.product.price} each</span><br>
            ₵${item.product.promoPrice} each
          </p>
        ` : `<p>₵${item.product.price} each</p>`}
        ${item.selectedSize ? `<p><strong>Size:</strong> ${item.selectedSize}</p>` : ''}
        ${item.product.size && item.product.size.length > 1 && !item.selectedSize ? `
          <div class="cart-size-selection">
            <label><strong>Select Size:</strong></label>
            <select class="size-selector" data-index="${index}">
              <option value="">Choose size</option>
              ${item.product.size.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        <div class="quantity-controls">
          <button class="quantity-btn decrease-cart" data-id="${item.product._id}" data-size="${item.selectedSize || ''}">-</button>
          <span class="quantity cart-quantity" data-id="${item.product._id}" data-size="${item.selectedSize || ''}">${item.quantity}</span>
          <button class="quantity-btn increase-cart" data-id="${item.product._id}" data-size="${item.selectedSize || ''}">+</button>
        </div>
        <p>Subtotal: ₵${(item.product.onSale && item.product.promoPrice ? item.product.promoPrice : item.product.price) * item.quantity}</p>
      </div>
      <button class="btn remove-from-cart" data-id="${item.product._id}" data-size="${item.selectedSize || ''}">Remove</button>
    </div>
  `).join('');

    cartTotal.textContent = `₵${getCartTotal()}`;

    // Add event listeners for Remove buttons
    cartContainer.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const selectedSize = e.target.dataset.size;
            removeFromCart(productId, selectedSize);
        });
    });

    // Add event listeners for cart quantity controls
    cartContainer.querySelectorAll('.increase-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const selectedSize = e.target.dataset.size;
            updateCartItemQuantity(productId, 1, selectedSize);
        });
    });

    cartContainer.querySelectorAll('.decrease-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const selectedSize = e.target.dataset.size;
            updateCartItemQuantity(productId, -1, selectedSize);
        });
    });

    // Add event listeners for size selectors
    cartContainer.querySelectorAll('.size-selector').forEach(selector => {
        selector.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const newSize = e.target.value;
            updateCartItemSize(index, newSize);
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
            <div class="product-price">
              ${product.onSale && product.promoPrice ? `
                <span class="original-price" style="text-decoration: line-through; color: #999; font-size: 18px;">₵${product.price}</span>
                <span class="promo-price" style="color: #d32f2f; font-size: 24px; font-weight: bold;">₵${product.promoPrice}</span>
              ` : `<span>₵${product.price}</span>`}
            </div>
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
            ${product.size && product.size.length > 0 ? `
              <div class="product-size-selection">
                <h3>Select Size</h3>
                <div class="size-options">
                  ${product.size.map(sizeOption => `
                    <label class="size-option">
                      <input type="radio" name="product-size" value="${sizeOption}" ${product.size.length === 1 ? 'checked' : ''}>
                      <span>${sizeOption}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            ` : ''}
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

                // Get selected size if product has sizes
                let selectedSize = null;
                const sizeRadio = document.querySelector('input[name="product-size"]:checked');
                if (sizeRadio) {
                    selectedSize = sizeRadio.value;
                }

                addToCart(productId, 1, selectedSize);
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
        // Display order summary with images
        const cart = getCart();
        orderItems.innerHTML = cart.map(item => `
      <div class="order-item">
        <img src="${window.apiService.getImageUrl(item.product.coverImage)}" alt="${item.product.name}" class="order-item-image" onerror="this.src='https://via.placeholder.com/60x60/3B2A23/F5EFE6?text=No+Image'">
        <div class="order-item-details">
          <p class="order-item-name">${item.product.name}${item.selectedSize ? ` (${item.selectedSize})` : ''}</p>
          <p>Qty: ${item.quantity} × ${item.product.onSale && item.product.promoPrice ? `₵${item.product.promoPrice} (was ₵${item.product.price})` : `₵${item.product.price}`}</p>
          <p class="order-item-price">₵${(item.product.onSale && item.product.promoPrice ? item.product.promoPrice : item.product.price) * item.quantity}</p>
        </div>
      </div>
    `).join('');
        orderTotal.textContent = `₵${getCartTotal()}`;

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validation
            const name = document.getElementById('shipping-name').value;
            const email = document.getElementById('shipping-email').value;
            const phone = document.getElementById('shipping-phone').value;
            const address = document.getElementById('shipping-address').value;
            const city = document.getElementById('shipping-city').value;
            const payment = document.getElementById('payment-method').value;
            const notes = document.getElementById('additional-notes').value;

            // Required fields (email is now optional)
            if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !payment) {
                if (checkoutMessage) {
                    checkoutMessage.textContent = 'Please fill in all required fields (Name, Phone, Address, City, Payment Method).';
                    checkoutMessage.style.color = 'red';
                }
                return;
            }

            // Validate payment method
            if (payment !== 'mobile' && payment !== 'bank') {
                if (checkoutMessage) {
                    checkoutMessage.textContent = 'Please select a valid payment method.';
                    checkoutMessage.style.color = 'red';
                }
                return;
            }

            // Store order data temporarily
            window.currentOrderData = {
                name,
                email,
                phone,
                address,
                city,
                payment,
                notes: notes || '',
                items: cart.map(item => ({
                    productId: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.onSale && item.product.promoPrice ? item.product.promoPrice : item.product.price,
                    originalPrice: item.product.price,
                    onSale: item.product.onSale,
                    coverImage: item.product.coverImage,
                    selectedSize: item.selectedSize
                })),
                total: getCartTotal()
            };

            // Show appropriate payment instructions modal
            if (payment === 'mobile') {
                showMobileMoneyModal();
            } else if (payment === 'bank') {
                showBankPaymentModal();
            }
        });

        // Modal functionality
        const mobileMoneyModal = document.getElementById('mobile-money-modal');
        const bankPaymentModal = document.getElementById('bank-payment-modal');
        const paymentProofModal = document.getElementById('payment-proof-modal');
        const closeModals = document.querySelectorAll('.close-modal');

        // Close modal functionality
        closeModals.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                mobileMoneyModal.style.display = 'none';
                bankPaymentModal.style.display = 'none';
                paymentProofModal.style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === mobileMoneyModal) {
                mobileMoneyModal.style.display = 'none';
            }
            if (event.target === bankPaymentModal) {
                bankPaymentModal.style.display = 'none';
            }
            if (event.target === paymentProofModal) {
                paymentProofModal.style.display = 'none';
            }
        });

        // Modal event handlers
        const paymentConfirmBtn = document.getElementById('payment-instructions-confirm');
        if (paymentConfirmBtn) {
            paymentConfirmBtn.addEventListener('click', () => {
                mobileMoneyModal.style.display = 'none';
                // Show payment proof upload modal
                showPaymentProofModal();
            });
        }

        const bankPaymentConfirmBtn = document.getElementById('bank-payment-instructions-confirm');
        if (bankPaymentConfirmBtn) {
            bankPaymentConfirmBtn.addEventListener('click', () => {
                bankPaymentModal.style.display = 'none';
                // Show payment proof upload modal
                showPaymentProofModal();
            });
        }

        // Payment proof upload functionality
        const paymentProofInput = document.getElementById('payment-proof-input');
        const uploadLabel = document.querySelector('.file-upload-label');
        const uploadedImagePreview = document.getElementById('uploaded-image-preview');
        const previewImage = document.getElementById('preview-image');
        const removeImageBtn = document.getElementById('remove-image');
        const uploadPaymentProofBtn = document.getElementById('upload-payment-proof');

        let uploadedImageFile = null;

        // File upload handling
        if (paymentProofInput && uploadLabel) {
            // File change handling
            paymentProofInput.addEventListener('change', (e) => {
                // Small delay to ensure file is loaded on mobile devices
                setTimeout(() => {
                    handleFileUpload(e.target.files[0]);
                }, 100);
            });

            // Drag and drop functionality
            uploadLabel.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadLabel.style.borderColor = '#B8956A';
                uploadLabel.style.background = 'rgba(200, 169, 126, 0.15)';
            });

            uploadLabel.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadLabel.style.borderColor = '#C8A97E';
                uploadLabel.style.background = 'rgba(200, 169, 126, 0.05)';
            });

            uploadLabel.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadLabel.style.borderColor = '#C8A97E';
                uploadLabel.style.background = 'rgba(200, 169, 126, 0.05)';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFileUpload(files[0]);
                }
            });
        }

        // Remove uploaded image
        if (removeImageBtn) {
            removeImageBtn.addEventListener('click', () => {
                if (previewImage.src) {
                    URL.revokeObjectURL(previewImage.src);
                }
                previewImage.src = '';
                uploadedImageFile = null;
                uploadedImagePreview.style.display = 'none';
                uploadLabel.style.display = 'flex';
                paymentProofInput.value = '';
            });
        }

        // Place order with payment proof
        if (uploadPaymentProofBtn) {
            uploadPaymentProofBtn.addEventListener('click', () => {
                if (!uploadedImageFile) {
                    alert('Please upload a payment proof image before placing your order.');
                    return;
                }

                // Process the order with payment proof
                processOrderWithPaymentProof();
            });
        }

        // File upload handler
        function handleFileUpload(file) {
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB.');
                return;
            }

            uploadedImageFile = file;

            // Show preview using object URL for better performance
            const objectUrl = URL.createObjectURL(file);
            previewImage.src = objectUrl;
            uploadLabel.style.display = 'none';
            uploadedImagePreview.style.display = 'block';
        }

        // Show Mobile Money Modal
        function showMobileMoneyModal() {
            if (mobileMoneyModal) {
                mobileMoneyModal.style.display = 'block';
            }
        }

        // Show Bank Payment Modal
        function showBankPaymentModal() {
            if (bankPaymentModal) {
                bankPaymentModal.style.display = 'block';
            }
        }

        // Show Payment Proof Modal
        function showPaymentProofModal() {
            if (paymentProofModal) {
                paymentProofModal.style.display = 'block';
            }
        }

        // Enhanced WhatsApp opening function with multiple fallbacks
        function openWhatsApp(message) {
            const phoneNumber = '233534057109';
            const encodedMessage = encodeURIComponent(message);
            
            // Check if mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            let whatsappUrl;
            
            if (isMobile) {
                // Mobile WhatsApp deep link - opens WhatsApp app directly
                whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
                
                // Try to open WhatsApp app
                window.location.href = whatsappUrl;
                
                // Fallback: also try web version
                setTimeout(() => {
                    const webUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                    window.open(webUrl, '_blank');
                }, 1000);
            } else {
                // Desktop - use WhatsApp Web
                whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
                
                // Double-check with direct navigation
                setTimeout(() => {
                    window.location.href = whatsappUrl;
                }, 500);
            }
        }

        // Process order with payment proof
        function processOrderWithPaymentProof() {
            const orderData = window.currentOrderData;
            if (!orderData) return;

            // Upload the image to server
            const formData = new FormData();
            formData.append('paymentProof', uploadedImageFile);
            fetch('https://hairelevationstudios-production.up.railway.app/products/upload-payment-proof', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
                return response.json();
            })
            .then(data => {
                const paymentProofUrl = data.url;
                
                // Create WhatsApp message
                const whatsappMessage = createWhatsAppMessage(orderData, paymentProofUrl);
                
                // Open WhatsApp with multiple fallback methods
                openWhatsApp(whatsappMessage);

                // Clear cart and show success message
                localStorage.removeItem('cart');
                paymentProofModal.style.display = 'none';

                if (checkoutMessage) {
                    checkoutMessage.innerHTML = `
                        <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; border: 1px solid #c3e6cb;">
                            <strong>✅ Order submitted successfully!</strong><br>
                            WhatsApp should open automatically with your order details.
                            If it doesn't open, please click the WhatsApp button below to complete the payment confirmation.
                            <div style="margin-top: 10px;">
                                <a href="https://wa.me/233534057109?text=${encodeURIComponent(whatsappMessage)}"
                                   target="_blank"
                                   style="display: inline-block; background: #25D366; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                                    📱 Open WhatsApp
                                </a>
                            </div>
                        </div>
                    `;
                    checkoutMessage.style.color = 'green';
                }

                checkoutForm.reset();
                // Don't auto-redirect so user can complete WhatsApp if needed
                // setTimeout(() => {
                //     window.location.href = 'index.html';
                // }, 5000);
            })
            .catch(error => {
                console.error('Error uploading payment proof:', error);
                alert('Error uploading payment proof. Please try again.');
            });
        }

        // Create WhatsApp message
        function createWhatsAppMessage(orderData, paymentProofUrl) {
            const date = new Date().toLocaleDateString('en-GB');
            const time = new Date().toLocaleTimeString('en-GB');

            let message = `🛍️ *NEW ORDER - Hair Elevation Studio*\n\n`;
            message += `📅 *Date:* ${date} at ${time}\n`;
            message += `👤 *Customer:* ${orderData.name}\n`;

            if (orderData.email) {
                message += `📧 *Email:* ${orderData.email}\n`;
            }

            message += `📱 *Phone:* ${orderData.phone}\n`;
            message += `📍 *Address:* ${orderData.address}, ${orderData.city}\n\n`;

            message += `🛒 *ORDER ITEMS:*\n`;
            orderData.items.forEach((item, index) => {
                const sizeInfo = item.selectedSize ? ` (${item.selectedSize})` : '';
                const priceInfo = item.onSale ? `₵${item.price} (was ₵${item.originalPrice})` : `₵${item.price}`;
                message += `${index + 1}. ${item.name}${sizeInfo} x${item.quantity} - ${priceInfo}
`;
            });

            message += `\n💰 *TOTAL: ₵${orderData.total}*\n`;
            const paymentMethodText = orderData.payment === 'mobile' ? 'Mobile Money' : 'Bank Transfer';
            message += `💳 *Payment Method:* ${paymentMethodText}\n`;

            if (orderData.notes.trim()) {
                message += `\n📝 *Additional Notes:* ${orderData.notes.trim()}\n`;
            }

            message += `\n📸 *Payment Proof:* ${paymentProofUrl}\n`;
            message += `✅ *Status:* Payment confirmation required\n\n`;
            message += `Please confirm this order and payment.`;

            return message;
        }
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