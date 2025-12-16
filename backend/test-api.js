#!/usr/bin/env node

/**
 * Simple API Test Script for Hair Elevation Studios Admin System
 * This script tests the basic functionality of the API endpoints
 */

const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';
let authToken = null;

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

// Make API request
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${data.message || 'Unknown error'}`);
        }

        return data;
    } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
    }
}

// Test authentication
async function testAuth() {
    log('\n🔐 Testing Authentication...', 'cyan');
    
    try {
        // Test login
        const loginData = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });

        if (loginData.success) {
            authToken = loginData.data.token;
            logSuccess('Login successful');
            logInfo(`Admin: ${loginData.data.admin.username}`);
            return true;
        } else {
            logError('Login failed');
            return false;
        }
    } catch (error) {
        logError(`Authentication failed: ${error.message}`);
        return false;
    }
}

// Test health endpoint
async function testHealth() {
    log('\n🏥 Testing Health Endpoint...', 'cyan');
    
    try {
        const response = await fetch('http://localhost:5000/health');
        const data = await response.json();
        
        if (response.ok && data.status === 'OK') {
            logSuccess('Server is healthy');
            logInfo(`Environment: ${data.environment}`);
            return true;
        } else {
            logError('Server health check failed');
            return false;
        }
    } catch (error) {
        logError(`Health check failed: ${error.message}`);
        logWarning('Make sure the server is running on port 5000');
        return false;
    }
}

// Test products endpoints
async function testProducts() {
    log('\n📦 Testing Products API...', 'cyan');
    
    if (!authToken) {
        logError('No authentication token available');
        return false;
    }

    try {
        // Test get all products
        const productsData = await apiRequest('/products?limit=5');
        if (productsData.success) {
            logSuccess(`Retrieved ${productsData.data.products.length} products`);
        }

        // Test create product
        const newProduct = {
            name: 'Test Wig Model',
            price: 299.99,
            description: 'A test product for API validation',
            size: 'medium',
            collections: ['everyday-crown'],
            coverImage: 'https://via.placeholder.com/300x400',
            inStock: true,
            featured: false,
            stockQuantity: 10
        };

        const createData = await apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(newProduct)
        });

        if (createData.success) {
            logSuccess('Product created successfully');
            const productId = createData.data.product._id;

            // Test update product
            const updateData = await apiRequest(`/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify({ price: 319.99 })
            });

            if (updateData.success) {
                logSuccess('Product updated successfully');
            }

            // Test delete product
            const deleteData = await apiRequest(`/products/${productId}`, {
                method: 'DELETE'
            });

            if (deleteData.success) {
                logSuccess('Product deleted successfully');
            }
        }

        return true;
    } catch (error) {
        logError(`Products test failed: ${error.message}`);
        return false;
    }
}

// Test featured products
async function testFeatured() {
    log('\n⭐ Testing Featured Products...', 'cyan');
    
    if (!authToken) {
        logError('No authentication token available');
        return false;
    }

    try {
        const featuredData = await apiRequest('/products/featured/list?limit=3');
        if (featuredData.success) {
            logSuccess(`Retrieved ${featuredData.data.products.length} featured products`);
            return true;
        }
        return false;
    } catch (error) {
        logError(`Featured products test failed: ${error.message}`);
        return false;
    }
}

// Test collections
async function testCollections() {
    log('\n🏷️  Testing Collections...', 'cyan');
    
    if (!authToken) {
        logError('No authentication token available');
        return false;
    }

    const collections = ['bridal-crowns', 'everyday-crown', 'queens-curls', 'signature-pixies'];
    let successCount = 0;

    for (const collection of collections) {
        try {
            const collectionData = await apiRequest(`/products/collection/${collection}`);
            if (collectionData.success) {
                successCount++;
                logSuccess(`${collection}: ${collectionData.data.count} products`);
            }
        } catch (error) {
            logWarning(`${collection}: ${error.message}`);
        }
    }

    return successCount === collections.length;
}

// Main test runner
async function runTests() {
    log('🚀 Starting API Tests for Hair Elevation Studios Admin System', 'bright');
    log('=' .repeat(60), 'magenta');

    const results = [];

    // Test server health
    results.push(await testHealth());

    // Test authentication
    results.push(await testAuth());

    if (authToken) {
        // Test core functionality
        results.push(await testProducts());
        results.push(await testFeatured());
        results.push(await testCollections());
    }

    // Summary
    log('\n📊 Test Summary', 'cyan');
    log('=' .repeat(60), 'magenta');
    
    const passedTests = results.filter(result => result).length;
    const totalTests = results.length;
    
    if (passedTests === totalTests) {
        logSuccess(`All tests passed! (${passedTests}/${totalTests})`);
        log('\n🎉 System is ready for use!', 'green');
        log('\nNext steps:', 'cyan');
        log('1. Start the backend: cd backend && npm run dev', 'blue');
        log('2. Open admin interface: http://localhost:5000/admin', 'blue');
        log('3. Login with: admin / admin123', 'blue');
        log('4. Update frontend API config in js/api-config.js', 'blue');
    } else {
        logWarning(`Some tests failed (${passedTests}/${totalTests})`, 'yellow');
        log('\nTroubleshooting:', 'cyan');
        log('1. Make sure MongoDB is running', 'blue');
        log('2. Check that the backend server is started', 'blue');
        log('3. Verify environment variables in backend/.env', 'blue');
    }

    process.exit(passedTests === totalTests ? 0 : 1);
}

// Check if node-fetch is available
try {
    require('node-fetch');
} catch (error) {
    logError('node-fetch is required for this test script');
    logInfo('Install it with: npm install node-fetch');
    process.exit(1);
}

// Run tests
runTests().catch(error => {
    logError(`Test runner failed: ${error.message}`);
    process.exit(1);
});