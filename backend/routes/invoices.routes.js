const express = require('express');
const router = express.Router();
const invoices = require('../data/invoices');
const InvoiceService = require('../services/invoice.service');
const StockService = require('../services/stock.service');

// GET /invoices
router.get('/', (req, res) => {
    res.json({ success: true, data: invoices });
});


// POST /invoices/from-sale/:saleId
router.post('/from-sale/:saleId', (req, res) => {
    try {
        const newInvoice = InvoiceService.createFromSale(req.params.saleId);

        // Decrease Stock (Simplified: stock decrease on invoice creation/posting)
        // Ideally this happens on Delivery Order, but for this Hackathon: on Invoice/Sale
        // Choosing here: if sale didn't decrease it, or maybe sale confirmed decreases it.
        // Let's assume Sale Confirmation -> Stock Decrease. 
        // IF NOT done in sales, do it here.
        // Let's implement stock decrease on SALE CONFIRMATION instead (standard Odoo flow is Delivery, but simplified: Sale).
        // So here we validly just create invoice.

        res.status(201).json({ success: true, data: newInvoice });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
});

// GET /invoices/customer/:contactId
router.get('/customer/:contactId', (req, res) => {
    const contactId = Number(req.params.contactId);
    const customerInvoices = invoices.filter(i => i.customer_id === contactId);
    res.json({ success: true, data: customerInvoices });
});

module.exports = router;
