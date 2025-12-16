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
        <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
            .dashboard { max-width: 1200px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .nav { display: flex; justify-content: space-around; margin-bottom: 2rem; }
            .nav a { padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; }
            .nav a:hover { background: #0056b3; }
            .section { margin-bottom: 2rem; }
            h2 { color: #555; }
            .logout { text-align: center; margin-top: 2rem; }
        </style>
    </head>
    <body>
        <div class="dashboard">
            <h1>Hair Elevation Studios - Admin Dashboard</h1>
            <div class="nav">
                <a href="#products">Products Management</a>
                <a href="#collections">Featured Collections</a>
                <a href="#logout">Logout</a>
            </div>
            <div class="section">
                <h2 id="products">Products Management</h2>
                <p>Manage your hair products inventory.</p>
                <a href="/products">View All Products (API)</a>
            </div>
            <div class="section">
                <h2 id="collections">Featured Collections</h2>
                <p>Manage featured product collections.</p>
            </div>
            <div class="logout">
                <button onclick="logout()">Logout</button>
            </div>
        </div>
        <script>
            function logout() {
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        </script>
    </body>
    </html>
  `);
});

export default router;