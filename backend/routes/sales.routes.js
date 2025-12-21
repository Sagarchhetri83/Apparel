const express = require('express');
const router = express.Router();
const SalesService = require('../services/sales.service');
const authMiddleware = require('../middlewares/auth.middleware');

// GET /sales
// Admin only - Get all sales
router.get('/', authMiddleware, async (req, res) => {
    try {
        const sales = await SalesService.getAll();
        res.json({ success: true, data: sales });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /sales/checkout
// Authenticated Customer - Create order
router.post('/checkout', authMiddleware, async (req, res) => {
    try {
        const { items } = req.body;
        // JWT payload has userId, not id
        console.log('Checkout User Payload:', req.user);
        const userId = req.user.userId || req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        const result = await SalesService.createSaleOrder(userId, items);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error('Checkout Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
