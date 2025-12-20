const express = require('express');
const router = express.Router();
const offers = require('../data/offers');
const { generateId } = require('../utils/id');

// GET /offers
router.get('/', (req, res) => {
    res.json({ success: true, data: offers });
});

// POST /offers
router.post('/', (req, res) => {
    const newOffer = {
        id: generateId(offers),
        ...req.body
    };
    offers.push(newOffer);
    res.status(201).json({ success: true, data: newOffer });
});

module.exports = router;
