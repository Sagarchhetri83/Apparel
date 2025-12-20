const express = require('express');
const router = express.Router();
const CouponService = require('../services/coupon.service');
const coupons = require('../data/coupons'); // Need direct access for push, or move push to service
const { generateId } = require('../utils/id');

// GET /coupons
router.get('/', (req, res) => {
    res.json({ success: true, data: coupons });
});

// POST /coupons/apply
router.post('/apply', (req, res) => {
    const { code, contactId } = req.body;

    try {
        const result = CouponService.validateAndApply(code, contactId);
        res.json({ success: true, data: result.coupon });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
});

// POST /coupons/generate
router.post('/generate', (req, res) => {
    const { offerId, quantity, validUntil, contactId } = req.body;

    // Logic: quantity per customer if customer selected? 
    // Requirement: "If customers selected (contactId), Generate coupons per customer"
    // Assuming contactId is SINGLE for now based on simplifying fields, or maybe array.
    // Let's assume contactId is optional single ID for simplicity or "no customer" = global.

    // If requirement implies multiple customers selection, that's complex UI. 
    // "Quantiy per customer" -> implies one customer.

    const count = quantity || 1;
    const generated = CouponService.generate(offerId, count, validUntil, contactId);

    generated.forEach(c => {
        c.id = generateId(coupons);
        coupons.push(c);
    });

    res.status(201).json({ success: true, count: generated.length, data: generated });
});

module.exports = router;
