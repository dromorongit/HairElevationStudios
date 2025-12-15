// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger') as HTMLElement;
const navList = document.querySelector('.nav-list') as HTMLElement;

if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
}

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

// Cart management
function getCart(): CartItem[] {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId: number): void {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push({ product, quantity: 1 });
    }
  }
  saveCart(cart);
  alert('Product added to cart!');
}

function removeFromCart(productId: number): void {
  const cart = getCart().filter(item => item.product.id !== productId);
  saveCart(cart);
  renderCart();
}

function getCartTotal(): number {
  return getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
}

// Product data
const products: Product[] = [
  {
    id: 1,
    name: "Glueless Wig Model A",
    price: 500,
    image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+A",
    description: "Premium glueless wig with adjustable straps and natural hairline for comfortable all-day wear."
  },
  {
    id: 2,
    name: "Glueless Wig Model B",
    price: 650,
    image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+B",
    description: "Luxury glueless wig featuring high-density hair and secure fit for versatile styling."
  },
  {
    id: 3,
    name: "Glueless Wig Model C",
    price: 750,
    image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+C",
    description: "Elegant glueless wig with breathable cap and realistic scalp for a natural appearance."
  },
  {
    id: 4,
    name: "Glueless Wig Model D",
    price: 800,
    image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+D",
    description: "Sophisticated glueless wig designed for durability and style, perfect for special occasions."
  },
  {
    id: 5,
    name: "Glueless Wig Model E",
    price: 900,
    image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Glueless+Wig+E",
    description: "High-end glueless wig with premium materials and expert craftsmanship for ultimate comfort."
  },
  {
    id: 6,
    name: "Custom Wig",
    price: 1200,
    image: "https://via.placeholder.com/300x400/3B2A23/F5EFE6?text=Custom+Wig",
    description: "Bespoke wig tailored to your specifications, including color, length, and style preferences."
  }
];

function renderProducts(products: Product[], container: HTMLElement, limit?: number): void {
  const productsToShow = limit ? products.slice(0, limit) : products;
  container.innerHTML = productsToShow.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₵${product.price}</p>
      <div class="product-actions">
        <a href="product.html?id=${product.id}" class="btn">View Details</a>
        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');

  // Add event listeners for Add to Cart buttons
  container.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt((e.target as HTMLElement).dataset.id!);
      addToCart(productId);
    });
  });
}

function renderCart(): void {
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
        <p>₵${item.product.price} x ${item.quantity}</p>
        <p>Subtotal: ₵${item.product.price * item.quantity}</p>
      </div>
      <button class="btn remove-from-cart" data-id="${item.product.id}">Remove</button>
    </div>
  `).join('');

  cartTotal.textContent = `₵${getCartTotal()}`;

  // Add event listeners for Remove buttons
  cartContainer.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt((e.target as HTMLElement).dataset.id!);
      removeFromCart(productId);
    });
  });
}

function renderProductDetail(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')!);
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.getElementById('product-content')!.innerHTML = '<p>Product not found.</p>';
    return;
  }

  document.getElementById('product-content')!.innerHTML = `
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
  document.querySelector('.add-to-cart-detail')?.addEventListener('click', (e) => {
    const productId = parseInt((e.target as HTMLElement).dataset.id!);
    addToCart(productId);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Featured products on home page
  const featuredContainer = document.getElementById('featured-products');
  if (featuredContainer) {
    renderProducts(products, featuredContainer, 3);
  }

  // All products on collections page
  const collectionsContainer = document.getElementById('collections-products');
  if (collectionsContainer) {
    renderProducts(products, collectionsContainer);
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
  const checkoutForm = document.getElementById('checkout-form') as HTMLFormElement;
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
      const name = (document.getElementById('shipping-name') as HTMLInputElement).value;
      const email = (document.getElementById('shipping-email') as HTMLInputElement).value;
      const phone = (document.getElementById('shipping-phone') as HTMLInputElement).value;
      const address = (document.getElementById('shipping-address') as HTMLTextAreaElement).value;
      const city = (document.getElementById('shipping-city') as HTMLInputElement).value;
      const payment = (document.getElementById('payment-method') as HTMLSelectElement).value;

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
const bookingForm = document.getElementById('booking-form') as HTMLFormElement;
const formMessage = document.getElementById('form-message') as HTMLElement;

if (bookingForm && formMessage) {
  bookingForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const fullName = (document.getElementById('full-name') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const service = (document.getElementById('service') as HTMLSelectElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const time = (document.getElementById('time') as HTMLInputElement).value;

    let isValid = true;
    let message = '';

    if (!fullName) {
      isValid = false;
      message += 'Full Name is required.<br>';
    }

    if (!phone) {
      isValid = false;
      message += 'Phone Number is required.<br>';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
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
      message = 'Thank you! Your appointment request has been submitted. We will contact you soon.';
      formMessage.style.color = 'green';
      bookingForm.reset();
    } else {
      formMessage.style.color = 'red';
    }

    formMessage.innerHTML = message;
  });
}