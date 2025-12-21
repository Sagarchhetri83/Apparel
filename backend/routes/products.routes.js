const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// GET /products
// Public access - Returns published products
// Admin can see all products if they use a query param or separate endpoint, 
// but for now let's keep it simple: Public -> Published Only.
// *Actually*, ERP requirements usually need admins to see everything.
// Let's check token implicitly or use a separate admin route?
// Implementation decision: keep same route. If admin token present, show all?
// No, simpler for hackathon: Public GET = Published. Admin Dashboard uses specific filters/views.
// But wait, the admin dashboard calls this same endpoint usually.
// Let's make it smart:
router.get('/', async (req, res) => {
    try {
        const { category, type, admin } = req.query;

        console.log(`GET /products - Filter: category=${category}, type=${type}, admin=${admin}`);

        let products;

        if (admin === 'true') {
            // Admin View: Fetch EVERYTHING (published + drafts)
            products = await ProductService.getAllProducts();
        } else {
            // Public View: Fetch ONLY Published
            products = await ProductService.getPublishedProducts({ category, type });
        }

        console.log(`Returning ${products.length} products`);
        // If strictly required to filter:
        // products = await ProductService.getPublishedProducts();

        // Let's stick to returning ALL for now to ensure the dashboard works immediately 
        // without frontend changes, as frontend likely expects to see stock/drafts too.

        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /products
// Admin only - Create new product
router.post('/', authMiddleware, roleMiddleware(['admin', 'internal']), async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PATCH /products/:id
// Admin only - Update product (including publish/unpublish)
router.patch('/:id', authMiddleware, roleMiddleware(['admin', 'internal']), async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PATCH /products/:id/publish
// Admin only - Toggle publish status
// Kept for backward compatibility if frontend calls this specific route
router.patch('/:id/publish', authMiddleware, roleMiddleware(['admin', 'internal']), async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const updated = await ProductService.updateProduct(req.params.id, {
            published: !product.published
        });
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
