const express = require('express');
const router = express.Router();
const SalesService = require('../services/sales.service');
const authMiddleware = require('../middlewares/auth.middleware');

// POST /payments/invoice/:invoiceId
// Authenticated Customer - Pay for invoice
router.post('/invoice/:invoiceId', authMiddleware, async (req, res) => {
    try {
        const invoiceId = parseInt(req.params.invoiceId);
        const { amount, method } = req.body;

        const payment = await SalesService.processPayment(invoiceId, amount, method);
        res.json({ success: true, data: payment });
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
