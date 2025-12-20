const express = require('express');
const router = express.Router();
const sales = require('../data/sales');
const { generateId } = require('../utils/id');
const InvoiceService = require('../services/invoice.service');
const CouponService = require('../services/coupon.service');

const AUTOMATIC_INVOICING = true;

// GET /sales
router.get('/', (req, res) => {
    res.json({ success: true, data: sales });
});

// POST /sales
router.post('/', (req, res) => {
    const newSale = {
        id: generateId(sales),
        name: `SO${String(generateId(sales)).padStart(3, '0')}`,
        date: new Date().toISOString(),
        state: 'sale', // confirmed immediately for portal
        ...req.body
    };

    // Handle Coupon usage
    if (req.body.coupon_code) {
        try {
            CouponService.markAsUsed(req.body.coupon_code);
            newSale.coupon_code = req.body.coupon_code;
        } catch (e) {
            console.error("Coupon mark used failed", e);
        }
    }

    sales.push(newSale); // Push simplified

    if (AUTOMATIC_INVOICING) {
        try {
            InvoiceService.createFromSale(newSale.id);
        } catch (e) {
            console.error("Auto Invoice Failed:", e);
        }
    }

    res.status(201).json({ success: true, data: newSale });
});

// GET /sales/customer/:contactId
router.get('/customer/:contactId', (req, res) => {
    const contactId = Number(req.params.contactId);
    const customerSales = sales.filter(s => s.customer_id === contactId);
    res.json({ success: true, data: customerSales });
});

module.exports = router;
