import express, { Request, Response } from 'express';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Admin dashboard
router.get('/dashboard', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hair Elevation Studios - Admin Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            * { box-sizing: border-box; }
            body {
                font-family: 'Poppins', sans-serif;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            .dashboard {
                max-width: 1400px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                text-align: center;
                position: relative;
            }
            .header h1 {
                margin: 0;
                font-size: 2.5rem;
                font-weight: 700;
            }
            .header .subtitle {
                margin: 0.5rem 0 0 0;
                opacity: 0.9;
                font-weight: 300;
            }
            .logout-btn {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255,255,255,0.2);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            .logout-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: translateY(-2px);
            }
            .nav {
                display: flex;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }
            .nav-btn {
                flex: 1;
                padding: 15px 20px;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                color: #6c757d;
                transition: all 0.3s ease;
                position: relative;
            }
            .nav-btn:hover, .nav-btn.active {
                color: #667eea;
                background: rgba(102, 126, 234, 0.1);
            }
            .nav-btn.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: #667eea;
            }
            .content {
                padding: 2rem;
            }
            .section {
                display: none;
                animation: fadeIn 0.3s ease-in;
            }
            .section.active {
                display: block;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .products-section {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 2rem;
            }
            .product-form, .product-list {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid #e9ecef;
            }
            .form-group {
                margin-bottom: 1.2rem;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: #333;
            }
            .form-group input, .form-group select, .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #e1e5e9;
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.3s ease;
                background: white;
            }
            .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            .form-group textarea {
                resize: vertical;
                min-height: 80px;
            }
            .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .checkbox-group label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-weight: normal;
            }
            .checkbox-group input[type="checkbox"] {
                width: auto;
                margin: 0;
            }
            .btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            .btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
            }
            .btn-secondary {
                background: #6c757d;
                color: white;
            }
            .btn-secondary:hover {
                background: #5a6268;
            }
            .product-list h3 {
                margin-top: 0;
                color: #333;
                font-size: 1.5rem;
            }
            .product-item {
                background: white;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .product-info h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            .product-info p {
                margin: 0;
                color: #6c757d;
                font-size: 14px;
            }
            .product-actions {
                display: flex;
                gap: 0.5rem;
            }
            .btn-sm {
                padding: 6px 12px;
                font-size: 12px;
            }
            .btn-edit {
                background: #28a745;
                color: white;
            }
            .btn-delete {
                background: #dc3545;
                color: white;
            }
            .collections-section {
                text-align: center;
                padding: 3rem;
            }
            .collections-section h2 {
                color: #333;
                margin-bottom: 1rem;
            }
            .collections-section p {
                color: #6c757d;
                font-size: 18px;
            }
            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .stat-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
            }
            .stat-card h3 {
                margin: 0 0 0.5rem 0;
                font-size: 2rem;
            }
            .stat-card p {
                margin: 0;
                opacity: 0.9;
            }
            @media (max-width: 768px) {
                .products-section {
                    grid-template-columns: 1fr;
                }
                .nav {
                    flex-direction: column;
                }
                .header h1 {
                    font-size: 2rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="dashboard">
            <div class="header">
                <h1>Hair Elevation Studios</h1>
                <p class="subtitle">Admin Dashboard</p>
                <button class="logout-btn" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            <div class="nav">
                <button class="nav-btn active" data-section="overview">
                    <i class="fas fa-chart-line"></i> Overview
                </button>
                <button class="nav-btn" data-section="products">
                    <i class="fas fa-box"></i> Products
                </button>
                <button class="nav-btn" data-section="collections">
                    <i class="fas fa-star"></i> Collections
                </button>
            </div>
            <div class="content">
                <div id="overview" class="section active">
                    <div class="stats">
                        <div class="stat-card">
                            <h3 id="totalProducts">--</h3>
                            <p>Total Products</p>
                        </div>
                        <div class="stat-card">
                            <h3 id="featuredProducts">--</h3>
                            <p>Featured Products</p>
                        </div>
                        <div class="stat-card">
                            <h3 id="totalCollections">--</h3>
                            <p>Collections</p>
                        </div>
                    </div>
                    <p>Welcome to your admin dashboard. Use the navigation above to manage your products and collections.</p>
                </div>
                <div id="products" class="section">
                    <div class="products-section">
                        <div class="product-form">
                            <h3><i class="fas fa-plus"></i> Add New Product</h3>
                            <form id="productForm" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="name">Product Name</label>
                                    <input type="text" id="name" name="name" required>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea id="description" name="description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price (GHS)</label>
                                    <input type="number" id="price" name="price" step="0.01" required>
                                </div>
                                <div class="form-group">
                                    <label>Collections</label>
                                    <div class="checkbox-group">
                                        <label><input type="checkbox" name="collections" value="The Bridal Crowns"> The Bridal Crowns</label>
                                        <label><input type="checkbox" name="collections" value="The Everyday Crown"> The Everyday Crown</label>
                                        <label><input type="checkbox" name="collections" value="The Queen's Curls"> The Queen's Curls</label>
                                        <label><input type="checkbox" name="collections" value="The Signature Pixies"> The Signature Pixies</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="featured">
                                        <input type="checkbox" id="featured" name="featured"> Featured Product
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label for="coverImage">Cover Image</label>
                                    <input type="file" id="coverImage" name="coverImage" accept="image/*" required>
                                </div>
                                <div class="form-group">
                                    <label for="additionalImages">Additional Images</label>
                                    <input type="file" id="additionalImages" name="additionalImages" accept="image/*" multiple>
                                </div>
                                <div class="form-group">
                                    <label for="videos">Video</label>
                                    <input type="file" id="videos" name="videos" accept="video/*">
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Add Product
                                </button>
                            </form>
                        </div>
                        <div class="product-list">
                            <h3><i class="fas fa-list"></i> Product List</h3>
                            <div id="productList">
                                <p>Loading products...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="collections" class="section">
                    <div class="collections-section">
                        <h2><i class="fas fa-star"></i> Featured Collections</h2>
                        <p>Manage your product collections and featured items.</p>
                        <p>This feature is coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
        <script>
            const token = localStorage.getItem('token');
            const navBtns = document.querySelectorAll('.nav-btn');
            const sections = document.querySelectorAll('.section');

            function showSection(sectionId) {
                sections.forEach(section => section.classList.remove('active'));
                navBtns.forEach(btn => btn.classList.remove('active'));
                document.getElementById(sectionId).classList.add('active');
                document.querySelector(\`[data-section="\${sectionId}"]\`).classList.add('active');
            }

            navBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const section = btn.dataset.section;
                    showSection(section);
                    if (section === 'products') loadProducts();
                });
            });

            function logout() {
                localStorage.removeItem('token');
                window.location.href = '/';
            }

            async function loadProducts() {
                try {
                    const response = await fetch('/products', {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                    const products = await response.json();
                    displayProducts(products);
                    updateStats(products);
                } catch (error) {
                    document.getElementById('productList').innerHTML = '<p>Error loading products</p>';
                }
            }

            function displayProducts(products) {
                const productList = document.getElementById('productList');
                if (products.length === 0) {
                    productList.innerHTML = '<p>No products found</p>';
                    return;
                }
                productList.innerHTML = products.map(product => \`
                    <div class="product-item">
                        <div class="product-info">
                            <h4>\${product.name}</h4>
                            <p>$\${product.price} • \${product.collections.join(', ')}</p>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-sm btn-edit" onclick="editProduct('\${product._id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-delete" onclick="deleteProduct('\${product._id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                \`).join('');
            }

            function updateStats(products) {
                document.getElementById('totalProducts').textContent = products.length;
                document.getElementById('featuredProducts').textContent = products.filter(p => p.featured).length;
                const collections = new Set(products.flatMap(p => p.collections));
                document.getElementById('totalCollections').textContent = collections.size;
            }

            document.getElementById('productForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                // Handle collections checkboxes
                const collections = [];
                document.querySelectorAll('input[name="collections"]:checked').forEach(checkbox => {
                    collections.push(checkbox.value);
                });
                formData.set('collections', JSON.stringify(collections));

                // Convert featured checkbox to boolean
                formData.set('featured', formData.has('featured') ? 'true' : 'false');

                try {
                    const response = await fetch('/products/create', {
                        method: 'POST',
                        headers: {
                            'Authorization': \`Bearer \${token}\`
                        },
                        body: formData
                    });
                    if (response.ok) {
                        alert('Product added successfully!');
                        e.target.reset();
                        loadProducts();
                    } else {
                        const error = await response.json();
                        alert('Error adding product: ' + (error.message || 'Unknown error'));
                    }
                } catch (error) {
                    alert('Error adding product: ' + error.message);
                }
            });

            async function deleteProduct(id) {
                if (!confirm('Are you sure you want to delete this product?')) return;
                try {
                    const response = await fetch(\`/products/delete/\${id}\`, {
                        method: 'DELETE',
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                    if (response.ok) {
                        loadProducts();
                    } else {
                        alert('Error deleting product');
                    }
                } catch (error) {
                    alert('Error deleting product');
                }
            }

            function editProduct(id) {
                alert('Edit functionality coming soon...');
            }

            // Load initial data
            loadProducts();
        </script>
    </body>
    </html>
  `);
});

export default router;