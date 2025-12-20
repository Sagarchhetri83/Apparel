const express = require('express');
const router = express.Router();
const products = require('../data/products');
const { generateId } = require('../utils/id');

// GET /products
router.get('/', (req, res) => {
    res.json({ success: true, data: products });
});

// POST /products
router.post('/', (req, res) => {
    const newProduct = {
        id: generateId(products),
        ...req.body,
        published: req.body.published !== undefined ? req.body.published : true
    };
    products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
});

// PATCH /products/:id
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    products[index] = { ...products[index], ...req.body };
    res.json({ success: true, data: products[index] });
});

// PATCH /products/:id/publish
router.patch('/:id/publish', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.published = !product.published;
    res.json({ success: true, data: product });
});

module.exports = router;
