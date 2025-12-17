import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files (frontend) - Serve from project root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Specific route for logo to ensure it loads correctly
app.get('/HESLOGO.PNG', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HESLOGO.PNG'));
});

// Specific route for pricelist image
app.get('/pricelist.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pricelist.jpg'));
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Root route - Admin Login/Register Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hair Elevation Studios - Admin</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; }
            body {
                font-family: 'Poppins', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
            }
            .container {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                padding: 2.5rem;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                width: 100%;
                max-width: 400px;
                border: 1px solid rgba(255,255,255,0.2);
                position: relative;
                overflow: hidden;
            }
            .container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #667eea, #764ba2);
            }
            h2 {
                text-align: center;
                color: #333;
                margin-bottom: 1.5rem;
                font-weight: 600;
                font-size: 1.8rem;
            }
            .form-group {
                margin-bottom: 1.2rem;
                position: relative;
            }
            input {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #e1e5e9;
                border-radius: 10px;
                font-size: 16px;
                transition: all 0.3s ease;
                background: #f8f9fa;
            }
            input:focus {
                outline: none;
                border-color: #667eea;
                background: white;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            button {
                width: 100%;
                padding: 12px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                transition: all 0.3s ease;
                margin: 8px 0;
            }
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
            }
            button:active {
                transform: translateY(0);
            }
            .error {
                color: #e74c3c;
                text-align: center;
                margin-top: 10px;
                font-size: 14px;
                background: #fdf2f2;
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #fadbd8;
            }
            .success {
                color: #27ae60;
                text-align: center;
                margin-top: 10px;
                font-size: 14px;
                background: #d5f4e6;
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #a8e6cf;
            }
            .toggle {
                text-align: center;
                margin-top: 1.5rem;
            }
            .toggle button {
                background: none;
                color: #667eea;
                border: none;
                cursor: pointer;
                font-size: 14px;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
            }
            .toggle button:hover {
                color: #764ba2;
                text-decoration: underline;
            }
            .hidden { display: none; }
            .fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .logo {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            .logo img {
                max-height: 50px;
                max-width: 180px;
                width: auto;
                height: auto;
                object-fit: contain;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }
        </style>
    </head>
    <body>
        <div class="container fade-in">
            <div class="logo">
                <img src="/HESLOGO.PNG" alt="Hair Elevation Studios Logo" onerror="this.style.display='none'">
            </div>
            <div id="loginSection">
                <h2>Admin Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <input type="text" id="loginUsername" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="loginPassword" placeholder="Password" required>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <div id="loginError" class="error" style="display: none;"></div>
                <div class="toggle">
                    <button id="showRegister">Create New Account</button>
                </div>
            </div>
            <div id="registerSection" class="hidden">
                <h2>Create Account</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <input type="text" id="username" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="registerEmail" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="registerPassword" placeholder="Password" required>
                    </div>
                    <button type="submit">Create Account</button>
                </form>
                <div id="registerError" class="error" style="display: none;"></div>
                <div id="registerSuccess" class="success" style="display: none;"></div>
                <div class="toggle">
                    <button id="showLogin">Back to Login</button>
                </div>
            </div>
        </div>
        <script>
            const loginSection = document.getElementById('loginSection');
            const registerSection = document.getElementById('registerSection');
            const showRegister = document.getElementById('showRegister');
            const showLogin = document.getElementById('showLogin');
            const loginError = document.getElementById('loginError');
            const registerError = document.getElementById('registerError');
            const registerSuccess = document.getElementById('registerSuccess');

            function showError(element, message) {
                element.textContent = message;
                element.style.display = 'block';
            }

            function hideError(element) {
                element.style.display = 'none';
            }

            function showSuccess(element, message) {
                element.textContent = message;
                element.style.display = 'block';
            }

            function hideSuccess(element) {
                element.style.display = 'none';
            }

            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                loginSection.classList.add('hidden');
                registerSection.classList.remove('hidden');
                hideError(loginError);
                hideError(registerError);
                hideSuccess(registerSuccess);
            });

            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                registerSection.classList.add('hidden');
                loginSection.classList.remove('hidden');
                hideError(loginError);
                hideError(registerError);
                hideSuccess(registerSuccess);
            });

            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                hideError(loginError);
                const username = document.getElementById('loginUsername').value;
                const password = document.getElementById('loginPassword').value;
                try {
                    const response = await fetch('/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem('token', data.token);
                        window.location.href = '/admin/dashboard';
                    } else {
                        showError(loginError, data.message);
                    }
                } catch (error) {
                    showError(loginError, 'Login failed. Please try again.');
                }
            });

            document.getElementById('registerForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                hideError(registerError);
                hideSuccess(registerSuccess);
                const username = document.getElementById('username').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                try {
                    const response = await fetch('/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, email, password })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        showSuccess(registerSuccess, 'Account created successfully! Redirecting to login...');
                        setTimeout(() => {
                            registerSection.classList.add('hidden');
                            loginSection.classList.remove('hidden');
                            hideSuccess(registerSuccess);
                        }, 2000);
                    } else {
                        showError(registerError, data.message);
                    }
                } catch (error) {
                    showError(registerError, 'Registration failed. Please try again.');
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hairelevation')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});