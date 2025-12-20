const express = require('express');
const router = express.Router();
const paymentTerms = require('../data/paymentTerms');
const { generateId } = require('../utils/id');

// GET /payment-terms
router.get('/', (req, res) => {
    res.json({ success: true, data: paymentTerms });
});

// POST /payment-terms
router.post('/', (req, res) => {
    const newTerm = {
        id: generateId(paymentTerms),
        ...req.body,
        active: req.body.active !== undefined ? req.body.active : true
    };
    paymentTerms.push(newTerm);
    res.status(201).json({ success: true, data: newTerm });
});

// PATCH /payment-terms/:id
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = paymentTerms.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Term not found' });

    paymentTerms[index] = { ...paymentTerms[index], ...req.body };
    res.json({ success: true, data: paymentTerms[index] });
});

module.exports = router;
