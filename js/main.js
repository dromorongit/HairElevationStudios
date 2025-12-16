"use strict";
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
// Product data
const products = [
    {
        id: 1,
        name: "Glueless Wig Model A",
        price: 500,
        image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+A",
        description: "Premium glueless wig with adjustable straps and natural hairline for comfortable all-day wear.",
        category: "bridal-crowns"
    },
    {
        id: 2,
        name: "Glueless Wig Model B",
        price: 650,
        image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+B",
        description: "Luxury glueless wig featuring high-density hair and secure fit for versatile styling.",
        category: "bridal-crowns"
    },
    {
        id: 3,
        name: "Glueless Wig Model C",
        price: 750,
        image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+C",
        description: "Elegant glueless wig with breathable cap and realistic scalp for a natural appearance.",
        category: "everyday-crown"
    },
    {
        id: 4,
        name: "Glueless Wig Model D",
        price: 800,
        image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+D",
        description: "Sophisticated glueless wig designed for durability and style, perfect for special occasions.",
        category: "everyday-crown"
    },
    {
        id: 5,
        name: "Glueless Wig Model E",
        price: 900,
        image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+E",
        description: "High-end glueless wig with premium materials and expert craftsmanship for ultimate comfort.",
        category: "queens-curls"
    },
    {
        id: 6,
        name: "Custom Wig",
        price: 1200,
        image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Custom+Wig",
        description: "Bespoke wig tailored to your specifications, including color, length, and style preferences.",
        category: "signature-pixies"
    }
];
// Collection data
const collections = [
    {
        name: "The Bridal Crowns",
        image: "bridalcrowns.jpg",
        link: "bridal-crowns.html"
    },
    {
        name: "The Everyday Crown",
        image: "everydaycrown.jpg",
        link: "everyday-crown.html"
    },
    {
        name: "The Queen's Curls",
        image: "queenscurls.jpg",
        link: "queens-curls.html"
    },
    {
        name: "The Signature Pixies",
        image: "signaturepixies.jpg",
        link: "signature-pixies.html"
    }
];
function renderProducts(products, container, limit) {
    const productsToShow = limit ? products.slice(0, limit) : products;
    container.innerHTML = productsToShow.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₵${product.price}</p>
      <div class="product-actions">
        <div class="quantity-controls">
          <button class="quantity-btn decrease" data-id="${product.id}">-</button>
          <span class="quantity" data-id="${product.id}">1</span>
          <button class="quantity-btn increase" data-id="${product.id}">+</button>
        </div>
        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
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
function renderCollections(collections, container) {
    container.innerHTML = collections.map(collection => `
    <div class="product-card">
      <a href="${collection.link}">
        <img src="${collection.image}" alt="${collection.name}">
        <h3>${collection.name}</h3>
      </a>
    </div>
  `).join('');
}
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartContainer || !cartTotal)
        return;
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
function renderProductDetail() {
    var _a;
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    if (!product) {
        document.getElementById('product-content').innerHTML = '<p>Product not found.</p>';
        return;
    }
    document.getElementById('product-content').innerHTML = `
    <div class="product-detail-content">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <div class="product-price">₵${product.price}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-detail-actions">
          <button class="btn add-to-cart-detail" data-id="${product.id}">Add to Cart</button>
          <a href="collections.html" class="btn">Back to Collections</a>
        </div>
      </div>
    </div>
  `;
    // Add event listener for Add to Cart button
    (_a = document.querySelector('.add-to-cart-detail')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count
    updateCartCount();
    // Featured products on home page
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        renderProducts(products, featuredContainer, 3);
    }
    // Collections or filtered products on collections page
    const collectionsContainer = document.getElementById('collections-products');
    if (collectionsContainer) {
        if (collectionsContainer.dataset.category) {
            const filteredProducts = products.filter(p => p.category === collectionsContainer.dataset.category);
            renderProducts(filteredProducts, collectionsContainer);
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
        renderProductDetail();
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
});
// Form validation for booking
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
