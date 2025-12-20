const express = require('express');
const router = express.Router();
const payments = require('../data/payments');
const invoices = require('../data/invoices');
const PaymentTermService = require('../services/paymentTerm.service');
const { generateId } = require('../utils/id');

// POST /payments/invoice/:invoiceId
router.post('/invoice/:invoiceId', (req, res) => {
    const invoiceId = Number(req.params.invoiceId);
    const invoice = invoices.find(i => i.id === invoiceId);

    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    if (invoice.payment_state === 'paid') return res.status(400).json({ success: false, message: 'Already paid' });

    // Payment Terms Check
    // Assuming invoice has payment_term_id, let's look it up.
    // We need to add payment_term_id to invoice creation logic if not present.
    // For now, let's pass term details or look up default.

    // Simplified: Payload can contain payment date
    const paymentDate = req.body.date || new Date().toISOString();

    // Checking discount if applicable (Assuming term ID 2 for example, or passed in body)
    // const discountInfo = PaymentTermService.calculateDiscount(termId, invoice.invoice_date, paymentDate, invoice.amount_total, 0);

    const newPayment = {
        id: generateId(payments),
        invoice_id: invoiceId,
        amount: req.body.amount || invoice.amount_total,
        date: paymentDate,
        type: 'inbound'
    };
    payments.push(newPayment);

    invoice.payment_state = 'paid';

    res.status(201).json({ success: true, data: newPayment, invoiceStatus: 'paid' });
});

module.exports = router;
