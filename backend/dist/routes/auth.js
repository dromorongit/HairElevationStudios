"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const router = express_1.default.Router();
// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingAdmin = await Admin_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = new Admin_1.default({ username, email, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin_1.default.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
