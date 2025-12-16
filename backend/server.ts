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
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
        <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; }
            h2 { text-align: center; color: #333; }
            input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
            button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 5px 0; }
            button:hover { background: #0056b3; }
            .error { color: red; text-align: center; margin-top: 10px; }
            .success { color: green; text-align: center; margin-top: 10px; }
            .toggle { text-align: center; margin-top: 10px; }
            .toggle button { background: none; color: #007bff; border: none; cursor: pointer; text-decoration: underline; }
            .toggle button:hover { background: none; color: #0056b3; }
            .hidden { display: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div id="loginSection">
                <h2>Admin Login</h2>
                <form id="loginForm">
                    <input type="email" id="loginEmail" placeholder="Email" required>
                    <input type="password" id="loginPassword" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
                <div id="loginError" class="error"></div>
                <div class="toggle">
                    <button id="showRegister">Need to register?</button>
                </div>
            </div>
            <div id="registerSection" class="hidden">
                <h2>Admin Register</h2>
                <form id="registerForm">
                    <input type="text" id="username" placeholder="Username" required>
                    <input type="email" id="registerEmail" placeholder="Email" required>
                    <input type="password" id="registerPassword" placeholder="Password" required>
                    <button type="submit">Register</button>
                </form>
                <div id="registerError" class="error"></div>
                <div id="registerSuccess" class="success"></div>
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

            showRegister.addEventListener('click', () => {
                loginSection.classList.add('hidden');
                registerSection.classList.remove('hidden');
            });

            showLogin.addEventListener('click', () => {
                registerSection.classList.add('hidden');
                loginSection.classList.remove('hidden');
            });

            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                try {
                    const response = await fetch('/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem('token', data.token);
                        window.location.href = '/admin/dashboard';
                    } else {
                        document.getElementById('loginError').textContent = data.message;
                    }
                } catch (error) {
                    document.getElementById('loginError').textContent = 'Login failed';
                }
            });

            document.getElementById('registerForm').addEventListener('submit', async (e) => {
                e.preventDefault();
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
                        document.getElementById('registerSuccess').textContent = 'Registration successful! You can now login.';
                        document.getElementById('registerError').textContent = '';
                        setTimeout(() => {
                            registerSection.classList.add('hidden');
                            loginSection.classList.remove('hidden');
                        }, 2000);
                    } else {
                        document.getElementById('registerError').textContent = data.message;
                        document.getElementById('registerSuccess').textContent = '';
                    }
                } catch (error) {
                    document.getElementById('registerError').textContent = 'Registration failed';
                    document.getElementById('registerSuccess').textContent = '';
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