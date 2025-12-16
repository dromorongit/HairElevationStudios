#!/usr/bin/env node

/**
 * Quick test to verify the middleware fix
 */

const path = require('path');

console.log('🔧 Testing middleware imports...\n');

// Test importing auth middleware
try {
    const { auth } = require('./middleware/auth');
    console.log('✅ Auth middleware imported successfully');
    console.log('   Type:', typeof auth);
} catch (error) {
    console.error('❌ Auth middleware import failed:', error.message);
}

// Test importing error handler
try {
    const errorHandler = require('./middleware/errorHandler');
    console.log('✅ Error handler imported successfully');
    console.log('   Type:', typeof errorHandler);
} catch (error) {
    console.error('❌ Error handler import failed:', error.message);
}

// Test importing routes
try {
    const authRoutes = require('./routes/auth');
    console.log('✅ Auth routes imported successfully');
    console.log('   Type:', typeof authRoutes);
} catch (error) {
    console.error('❌ Auth routes import failed:', error.message);
}

try {
    const productRoutes = require('./routes/products');
    console.log('✅ Product routes imported successfully');
    console.log('   Type:', typeof productRoutes);
} catch (error) {
    console.error('❌ Product routes import failed:', error.message);
}

try {
    const uploadRoutes = require('./routes/upload');
    console.log('✅ Upload routes imported successfully');
    console.log('   Type:', typeof uploadRoutes);
} catch (error) {
    console.error('❌ Upload routes import failed:', error.message);
}

console.log('\n🎉 Middleware test completed!');