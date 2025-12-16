import express, { Request, Response } from 'express';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Admin dashboard
router.get('/dashboard', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Admin Dashboard', admin: (req as any).admin });
});

export default router;