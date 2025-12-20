const express = require('express');
const router = express.Router();
const purchases = require('../data/purchases');
const { generateId } = require('../utils/id');
const StockService = require('../services/stock.service');

// POST /purchases
router.post('/', (req, res) => {
    const newPurchase = {
        id: generateId(purchases),
        name: `PO${String(generateId(purchases)).padStart(3, '0')}`,
        date: new Date().toISOString(),
        state: 'draft',
        ...req.body
    };
    purchases.push(newPurchase);
    res.status(201).json({ success: true, data: newPurchase });
});

// POST /purchases/:id/confirm
router.post('/:id/confirm', (req, res) => {
    const id = Number(req.params.id);
    const purchase = purchases.find(p => p.id === id);
    if (!purchase) return res.status(404).json({ success: false, message: 'Purchase not found' });

    purchase.state = 'purchase';

    // Increase Stock (Simplified: immediate stock increase on confirmation)
    try {
        purchase.lines.forEach(line => {
            StockService.updateStock(line.product_id, line.quantity, 'increase');
        });
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
    }

    res.json({ success: true, data: purchase });
});

module.exports = router;
