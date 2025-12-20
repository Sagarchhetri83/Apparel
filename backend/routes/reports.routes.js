const express = require('express');
const router = express.Router();
const sales = require('../data/sales');
const purchases = require('../data/purchases');

// GET /reports/sales
router.get('/sales', (req, res) => {
    // Group by product or customer logic here
    const totalSales = sales.reduce((acc, curr) => acc + (curr.amount_total || 0), 0);
    res.json({ success: true, data: { total_sales: totalSales, count: sales.length } });
});

// GET /reports/purchases
router.get('/purchases', (req, res) => {
    const totalPurchases = purchases.reduce((acc, curr) => acc + (curr.amount_total || 0), 0);
    res.json({ success: true, data: { total_purchases: totalPurchases, count: purchases.length } });
});

module.exports = router;
