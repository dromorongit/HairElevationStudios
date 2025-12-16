// Admin JavaScript - Hair Elevation Studios
class AdminSystem {
    constructor() {
        this.apiBase = '/api';
        this.currentUser = null;
        this.token = localStorage.getItem('adminToken');
        this.currentPage = 1;
        this.currentLimit = 10;
        this.products = [];
        this.featuredProducts = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        await this.loadDashboardStats();
    }

    setupEventListeners() {
        // Authentication
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        document.getElementById('deleteAccountBtn').addEventListener('click', () => this.handleDeleteAccount());

        // Auth mode toggle
        document.getElementById('loginTab').addEventListener('click', () => this.switchAuthMode('login'));
        document.getElementById('signupTab').addEventListener('click', () => this.switchAuthMode('signup'));

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Sidebar toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => this.toggleSidebar());

        // Product management
        document.getElementById('addProductBtn').addEventListener('click', () => this.openProductModal());
        document.getElementById('saveProductBtn').addEventListener('click', () => this.saveProduct());
        document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Filters
        document.getElementById('productSearch').addEventListener('input', (e) => this.debounce(() => this.loadProducts(), 500)(e));
        document.getElementById('collectionFilter').addEventListener('change', () => this.loadProducts());
        document.getElementById('stockFilter').addEventListener('change', () => this.loadProducts());

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabSwitch(e));
        });

        // File uploads
        document.getElementById('coverImageInput').addEventListener('change', (e) => this.handleImageUpload(e, 'cover'));
        document.getElementById('additionalImagesInput').addEventListener('change', (e) => this.handleImageUpload(e, 'additional'));
        document.getElementById('productVideoInput').addEventListener('change', (e) => this.handleVideoUpload(e));

        // Upload modal
        document.getElementById('uploadMediaBtn').addEventListener('click', () => this.openUploadModal());
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));
        this.setupDragAndDrop();

        // Inventory filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleInventoryFilter(e));
        });

        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
    }

    checkAuthStatus() {
        if (this.token) {
            this.validateToken().then(valid => {
                if (valid) {
                    this.showAdminInterface();
                } else {
                    this.showLoginModal();
                }
            });
        } else {
            this.showLoginModal();
        }
    }

    async validateToken() {
        try {
            const response = await fetch(`${this.apiBase}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                this.currentUser = data.data.admin;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    showLoginModal() {
        document.getElementById('loginModal').style.display = 'flex';
        document.getElementById('adminInterface').style.display = 'none';
    }

    showAdminInterface() {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('adminInterface').style.display = 'flex';
        document.getElementById('adminName').textContent = this.currentUser.username;
    }

    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch(`${this.apiBase}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.token = result.data.token;
                this.currentUser = result.data.admin;
                localStorage.setItem('adminToken', this.token);
                this.showAdminInterface();
                await this.loadDashboardStats();
                this.showSuccessMessage('Login successful!');
            } else {
                this.showErrorMessage('loginError', result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showErrorMessage('loginError', 'Network error. Please try again.');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        // Validate password confirmation
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            this.showErrorMessage('signupError', 'Passwords do not match');
            return;
        }
        
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        try {
            const response = await fetch(`${this.apiBase}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.token = result.data.token;
                this.currentUser = result.data.admin;
                localStorage.setItem('adminToken', this.token);
                this.showAdminInterface();
                await this.loadDashboardStats();
                this.showSuccessMessage('Admin account created successfully!');
            } else {
                this.showErrorMessage('signupError', result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showErrorMessage('signupError', 'Network error. Please try again.');
        }
    }

    switchAuthMode(mode) {
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const authTitle = document.getElementById('authTitle');
        const loginError = document.getElementById('loginError');
        const signupError = document.getElementById('signupError');
        const signupSuccess = document.getElementById('signupSuccess');

        // Clear messages
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
        if (signupSuccess) signupSuccess.textContent = '';

        if (mode === 'signup') {
            loginTab.classList.remove('active');
            signupTab.classList.add('active');
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            authTitle.textContent = 'Create Admin Account';
        } else {
            signupTab.classList.remove('active');
            loginTab.classList.add('active');
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            authTitle.textContent = 'Admin Login';
        }
    }

    handleLogout() {
        localStorage.removeItem('adminToken');
        this.token = null;
        this.currentUser = null;
        this.showLoginModal();
        this.showSuccessMessage('Logged out successfully!');
    }

    async handleDeleteAccount() {
        const confirmation = prompt(
            '⚠️ DANGER: This will permanently delete your admin account and all associated data!\n\n' +
            'Type "DELETE" to confirm account deletion:'
        );
        
        if (confirmation !== 'DELETE') {
            this.showErrorMessage('Account deletion cancelled.');
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/auth/account`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                // Clear local storage and show login modal
                localStorage.removeItem('adminToken');
                this.token = null;
                this.currentUser = null;
                this.showLoginModal();
                this.showSuccessMessage('Admin account deleted successfully. You can now create a new account.');
            } else {
                this.showErrorMessage('Failed to delete account: ' + result.message);
            }
        } catch (error) {
            console.error('Delete account error:', error);
            this.showErrorMessage('Network error. Please try again.');
        }
    }

    async loadDashboardStats() {
        try {
            const response = await fetch(`${this.apiBase}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const products = data.data.products;
                
                document.getElementById('totalProducts').textContent = products.length;
                document.getElementById('featuredProducts').textContent = products.filter(p => p.featured).length;
                document.getElementById('inStockProducts').textContent = products.filter(p => p.inStock).length;
                document.getElementById('outOfStockProducts').textContent = products.filter(p => !p.inStock).length;
            }
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        }
    }

    handleNavigation(e) {
        e.preventDefault();
        const section = e.target.closest('.nav-link').dataset // Update active nav item.section;
        
       
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        e.target.closest('.nav-item').classList.add('active');
        
        // Show selected section
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        
        // Load section data
        this.loadSectionData(section);
    }

    async loadSectionData(section) {
        switch (section) {
            case 'products':
                await this.loadProducts();
                break;
            case 'collections':
                await this.loadCollections();
                break;
            case 'featured':
                await this.loadFeaturedProducts();
                break;
            case 'inventory':
                await this.loadInventory();
                break;
            case 'media':
                await this.loadMediaLibrary();
                break;
        }
    }

    async loadProducts(page = 1) {
        try {
            this.currentPage = page;
            const params = new URLSearchParams({
                page: this.currentPage,
                limit: this.currentLimit
            });

            // Add filters
            const search = document.getElementById('productSearch').value;
            const collection = document.getElementById('collectionFilter').value;
            const stock = document.getElementById('stockFilter').value;

            if (search) params.append('search', search);
            if (collection) params.append('collection', collection);
            if (stock) params.append('inStock', stock);

            const response = await fetch(`${this.apiBase}/products?${params}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.products = data.data.products;
                this.renderProductsTable();
                this.renderPagination(data.data.pagination);
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.showErrorMessage('Failed to load products');
        }
    }

    renderProductsTable() {
        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';

        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.coverImage}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'"></td>
                <td>
                    <div>
                        <strong>${product.name}</strong>
                        <br>
                        <small class="text-muted">${product.description.substring(0, 50)}...</small>
                    </div>
                </td>
                <td>₵${product.price}</td>
                <td><span class="badge badge-info">${product.size}</span></td>
                <td>${product.collections.map(c => `<span class="badge badge-info">${c}</span>`).join(' ')}</td>
                <td>${product.inStock ? '<span class="badge badge-success">In Stock</span>' : '<span class="badge badge-danger">Out of Stock</span>'}</td>
                <td>${product.featured ? '<span class="badge badge-warning">Featured</span>' : ''}</td>
                <td>
                    <button class="btn btn-small btn-primary" onclick="adminSystem.editProduct('${product._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-danger" onclick="adminSystem.deleteProduct('${product._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPagination(pagination) {
        const paginationContainer = document.getElementById('productsPagination');
        if (!paginationContainer) return;

        let html = '';
        
        if (pagination.hasPrevPage) {
            html += `<button onclick="adminSystem.loadProducts(${pagination.currentPage - 1})">Previous</button>`;
        }
        
        for (let i = 1; i <= pagination.totalPages; i++) {
            const activeClass = i === pagination.currentPage ? 'active' : '';
            html += `<button class="${activeClass}" onclick="adminSystem.loadProducts(${i})">${i}</button>`;
        }
        
        if (pagination.hasNextPage) {
            html += `<button onclick="adminSystem.loadProducts(${pagination.currentPage + 1})">Next</button>`;
        }
        
        paginationContainer.innerHTML = html;
    }

    async loadCollections() {
        try {
            const response = await fetch(`${this.apiBase}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const products = data.data.products;
                
                // Count products per collection
                const collectionCounts = {
                    'bridal-crowns': products.filter(p => p.collections.includes('bridal-crowns')).length,
                    'everyday-crown': products.filter(p => p.collections.includes('everyday-crown')).length,
                    'queens-curls': products.filter(p => p.collections.includes('queens-curls')).length,
                    'signature-pixies': products.filter(p => p.collections.includes('signature-pixies')).length
                };

                // Update collection cards
                document.querySelectorAll('.collection-card').forEach(card => {
                    const collection = card.dataset.collection;
                    const countElement = card.querySelector('.product-count');
                    if (countElement) {
                        countElement.textContent = `${collectionCounts[collection] || 0} products`;
                    }
                });
            }
        } catch (error) {
            console.error('Error loading collections:', error);
        }
    }

    async loadFeaturedProducts() {
        try {
            const response = await fetch(`${this.apiBase}/products/featured/list?limit=10`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.featuredProducts = data.data.products;
                this.renderFeaturedProducts();
            }
        } catch (error) {
            console.error('Error loading featured products:', error);
        }
    }

    renderFeaturedProducts() {
        const container = document.getElementById('featuredProductsGrid');
        if (!container) return;

        container.innerHTML = '';

        this.featuredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML = `
                <img src="${product.coverImage}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div class="stat-content">
                    <h3>${product.name}</h3>
                    <p>₵${product.price}</p>
                    <button class="btn btn-small btn-danger" onclick="adminSystem.removeFeatured('${product._id}')">
                        Remove from Featured
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    async loadInventory() {
        try {
            const response = await fetch(`${this.apiBase}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.products = data.data.products;
                this.renderInventoryTable();
            }
        } catch (error) {
            console.error('Error loading inventory:', error);
        }
    }

    renderInventoryTable() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.products.forEach(product => {
            const statusClass = product.inStock ? 'badge-success' : 'badge-danger';
            const statusText = product.inStock ? 'In Stock' : 'Out of Stock';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${product.coverImage}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <strong>${product.name}</strong>
                            <br>
                            <small class="text-muted">${product.size}</small>
                        </div>
                    </div>
                </td>
                <td>${product._id.substring(0, 8)}...</td>
                <td>${product.stockQuantity}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>${new Date(product.updatedAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-small btn-primary" onclick="adminSystem.updateStock('${product._id}')">
                        <i class="fas fa-edit"></i> Update
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async loadMediaLibrary() {
        try {
            const response = await fetch(`${this.apiBase}/upload/files`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.renderMediaGrid(data.data);
            }
        } catch (error) {
            console.error('Error loading media library:', error);
        }
    }

    renderMediaGrid(mediaData) {
        const container = document.getElementById('mediaGrid');
        if (!container) return;

        container.innerHTML = '';

        // Render images
        mediaData.images.forEach(image => {
            const item = document.createElement('div');
            item.className = 'media-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.filename}">
                <div class="media-item-info">
                    <div class="media-item-name">${image.filename}</div>
                    <div class="media-item-size">${this.formatFileSize(image.size)}</div>
                </div>
                <div class="media-item-actions">
                    <button class="btn-icon btn-danger" onclick="adminSystem.deleteMedia('${image.filename}', 'image')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });

        // Render videos
        mediaData.videos.forEach(video => {
            const item = document.createElement('div');
            item.className = 'media-item';
            item.innerHTML = `
                <video src="${video.url}" style="width: 100%; height: 150px; object-fit: cover;" muted></video>
                <div class="media-item-info">
                    <div class="media-item-name">${video.filename}</div>
                    <div class="media-item-size">${this.formatFileSize(video.size)}</div>
                </div>
                <div class="media-item-actions">
                    <button class="btn-icon btn-danger" onclick="adminSystem.deleteMedia('${video.filename}', 'video')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    }

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('productModalTitle');
        const form = document.getElementById('productForm');
        
        if (productId) {
            title.textContent = 'Edit Product';
            this.loadProductForEdit(productId);
        } else {
            title.textContent = 'Add New Product';
            form.reset();
            this.clearImagePreviews();
        }
        
        modal.style.display = 'flex';
        this.activeTab = 'basic';
        this.switchTab('basic');
    }

    async loadProductForEdit(productId) {
        try {
            const response = await fetch(`${this.apiBase}/products/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const product = data.data.product;
                this.populateProductForm(product);
            }
        } catch (error) {
            console.error('Error loading product:', error);
        }
    }

    populateProductForm(product) {
        document.getElementById('productId').value = product._id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productSize').value = product.size;
        document.getElementById('productLength').value = product.length || '';
        document.getElementById('productTexture').value = product.texture || '';
        document.getElementById('productLace').value = product.lace || '';
        document.getElementById('productDensity').value = product.density || '';
        document.getElementById('productQuality').value = product.quality || '';
        document.getElementById('productColor').value = product.color || '';
        document.getElementById('inStock').checked = product.inStock;
        document.getElementById('featured').checked = product.featured;
        document.getElementById('stockQuantity').value = product.stockQuantity;

        // Collections
        document.querySelectorAll('input[name="collections"]').forEach(checkbox => {
            checkbox.checked = product.collections.includes(checkbox.value);
        });

        // Show current images
        if (product.coverImage) {
            this.showImagePreview('cover', product.coverImage);
        }
        if (product.additionalImages && product.additionalImages.length > 0) {
            product.additionalImages.forEach(img => {
                this.showImagePreview('additional', img.url);
            });
        }
        if (product.videoUrl) {
            this.showVideoPreview(product.videoUrl);
        }
    }

    async saveProduct() {
        const form = document.getElementById('productForm');
        const formData = new FormData(form);
        const productId = document.getElementById('productId').value;

        // Build product data
        const data = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            description: formData.get('description'),
            size: formData.get('size'),
            length: formData.get('length'),
            texture: formData.get('texture'),
            lace: formData.get('lace'),
            density: formData.get('density'),
            quality: formData.get('quality'),
            color: formData.get('color'),
            inStock: formData.get('inStock') === 'on',
            featured: formData.get('featured') === 'on',
            stockQuantity: parseInt(formData.get('stockQuantity')) || 0,
            collections: Array.from(document.querySelectorAll('input[name="collections"]:checked')).map(cb => cb.value)
        };

        try {
            const url = productId ? `${this.apiBase}/products/${productId}` : `${this.apiBase}/products`;
            const method = productId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.closeModals();
                this.showSuccessMessage(productId ? 'Product updated successfully!' : 'Product created successfully!');
                await this.loadProducts();
                await this.loadDashboardStats();
            } else {
                this.showErrorMessage('Product save failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving product:', error);
            this.showErrorMessage('Network error. Please try again.');
        }
    }

    async deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`${this.apiBase}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccessMessage('Product deleted successfully!');
                await this.loadProducts();
                await this.loadDashboardStats();
            } else {
                this.showErrorMessage('Failed to delete product: ' + result.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            this.showErrorMessage('Network error. Please try again.');
        }
    }

    editProduct(productId) {
        this.openProductModal(productId);
    }

    async handleImageUpload(e, type) {
        const files = e.target.files;
        if (files.length === 0) return;

        for (let file of files) {
            if (!file.type.startsWith('image/')) {
                this.showErrorMessage('Please select only image files.');
                continue;
            }

            if (file.size > 10 * 1024 * 1024) {
                this.showErrorMessage('Image size must be less than 10MB.');
                continue;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch(`${this.apiBase}/upload/single`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    if (type === 'cover') {
                        this.showImagePreview('cover', result.data.url);
                        document.getElementById('productForm').querySelector('#coverImageInput').dataset.uploadedUrl = result.data.url;
                    } else {
                        this.showImagePreview('additional', result.data.url);
                    }
                } else {
                    this.showErrorMessage('Upload failed: ' + result.message);
                }
            } catch (error) {
                console.error('Upload error:', error);
                this.showErrorMessage('Upload failed. Please try again.');
            }
        }
    }

    async handleVideoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            this.showErrorMessage('Please select only video files.');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            this.showErrorMessage('Video size must be less than 50MB.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${this.apiBase}/upload/single`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showVideoPreview(result.data.url);
                document.getElementById('productForm').querySelector('#productVideoInput').dataset.uploadedUrl = result.data.url;
            } else {
                this.showErrorMessage('Upload failed: ' + result.message);
            }
        } catch (error) {
            console.error('Upload error:', error);
            this.showErrorMessage('Upload failed. Please try again.');
        }
    }

    showImagePreview(type, url) {
        if (type === 'cover') {
            const preview = document.getElementById('coverImagePreview');
            preview.innerHTML = `<img src="${url}" alt="Cover Image" style="max-width: 200px; max-height: 200px; border-radius: 8px;">`;
        } else {
            const preview = document.getElementById('additionalImagesPreview');
            const img = document.createElement('img');
            img.src = url;
            img.style.cssText = 'width: 150px; height: 150px; object-fit: cover; border-radius: 8px; margin: 5px;';
            preview.appendChild(img);
        }
    }

    showVideoPreview(url) {
        const preview = document.getElementById('videoPreview');
        preview.innerHTML = `<video src="${url}" controls style="max-width: 300px; max-height: 200px; border-radius: 8px;">`;
    }

    clearImagePreviews() {
        document.getElementById('coverImagePreview').innerHTML = '';
        document.getElementById('additionalImagesPreview').innerHTML = '';
        document.getElementById('videoPreview').innerHTML = '';
    }

    openUploadModal() {
        document.getElementById('uploadModal').style.display = 'flex';
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });
    }

    async handleFiles(files) {
        const progressContainer = document.getElementById('uploadProgress');
        const progressBar = progressContainer.querySelector('.progress-fill');
        const progressText = progressContainer.querySelector('.progress-text');
        
        progressContainer.style.display = 'block';
        
        for (let i = 0; i < files.length; i++) {
            const progress = ((i + 1) / files.length) * 100;
            progressBar.style.width = progress + '%';
            progressText.textContent = `Uploading ${i + 1} of ${files.length}...`;
            
            await this.uploadSingleFile(files[i]);
        }
        
        progressText.textContent = 'Upload complete!';
        setTimeout(() => {
            progressContainer.style.display = 'none';
            this.loadMediaLibrary();
        }, 1000);
    }

    async uploadSingleFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${this.apiBase}/upload/single`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            body: formData
        });

        return await response.json();
    }

    async handleFileUpload(e) {
        const files = e.target.files;
        if (files.length > 0) {
            await this.handleFiles(files);
        }
    }

    async deleteMedia(filename, type) {
        if (!confirm('Are you sure you want to delete this file?')) return;

        try {
            const response = await fetch(`${this.apiBase}/upload/${filename}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccessMessage('File deleted successfully!');
                this.loadMediaLibrary();
            } else {
                this.showErrorMessage('Failed to delete file: ' + result.message);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            this.showErrorMessage('Network error. Please try again.');
        }
    }

    handleTabSwitch(e) {
        const tabId = e.target.dataset.tab || e.target.dataset.uploadTab;
        this.switchTab(tabId);
    }

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"], [data-upload-tab="${tabId}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const activeContent = document.getElementById(`${tabId}-tab`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    handleInventoryFilter(e) {
        const filter = e.target.dataset.filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter products
        let filteredProducts = [...this.products];
        
        switch (filter) {
            case 'in-stock':
                filteredProducts = filteredProducts.filter(p => p.inStock);
                break;
            case 'out-of-stock':
                filteredProducts = filteredProducts.filter(p => !p.inStock);
                break;
            case 'low-stock':
                filteredProducts = filteredProducts.filter(p => p.stockQuantity < 5 && p.inStock);
                break;
        }
        
        this.renderFilteredInventory(filteredProducts);
    }

    renderFilteredInventory(products) {
        const tbody = document.getElementById('inventoryTableBody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const statusClass = product.inStock ? 'badge-success' : 'badge-danger';
            const statusText = product.inStock ? 'In Stock' : 'Out of Stock';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${product.coverImage}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <strong>${product.name}</strong>
                            <br>
                            <small class="text-muted">${product.size}</small>
                        </div>
                    </div>
                </td>
                <td>${product._id.substring(0, 8)}...</td>
                <td>${product.stockQuantity}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>${new Date(product.updatedAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-small btn-primary" onclick="adminSystem.updateStock('${product._id}')">
                        <i class="fas fa-edit"></i> Update
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async updateStock(productId) {
        const product = this.products.find(p => p._id === productId);
        if (!product) return;

        const newQuantity = prompt(`Update stock quantity for "${product.name}" (current: ${product.stockQuantity}):`);
        if (newQuantity === null) return;

        const quantity = parseInt(newQuantity);
        if (isNaN(quantity) || quantity < 0) {
            this.showErrorMessage('Please enter a valid quantity.');
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stockQuantity: quantity })
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccessMessage('Stock updated successfully!');
                this.loadInventory();
                this.loadDashboardStats();
            } else {
                this.showErrorMessage('Failed to update stock: ' + result.message);
            }
        } catch (error) {
            console.error('Error updating stock:', error);
            this.showErrorMessage('Network error. Please try again.');
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.clearImagePreviews();
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.admin-sidebar');
        sidebar.classList.toggle('show');
    }

    showErrorMessage(elementId, message) {
        console.error(message);
        
        // If elementId is provided, show error in specific element
        if (elementId) {
            const errorElement = document.getElementById(elementId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                return;
            }
        }
        
        // Fallback to alert if no specific element found
        alert('Error: ' + message);
    }

    showSuccessMessage(message) {
        console.log(message);
        
        // Check if there's a success element to display
        const successElement = document.getElementById('signupSuccess');
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
            return;
        }
        
        // Fallback to alert if no success element found
        alert('Success: ' + message);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize admin system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminSystem = new AdminSystem();
});