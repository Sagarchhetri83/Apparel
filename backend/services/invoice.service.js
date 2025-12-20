const invoices = require('../data/invoices');
const sales = require('../data/sales');
const { generateId } = require('../utils/id');

const InvoiceService = {
    createFromSale: (saleId) => {
        const sale = sales.find(s => s.id === Number(saleId));
        if (!sale) throw new Error('Sale Order not found');

        const newInvoice = {
            id: generateId(invoices),
            invoice_date: new Date().toISOString(),
            due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // +15 days default
            customer_id: sale.customer_id,
            origin: sale.name,
            amount_total: sale.amount_total,
            lines: sale.lines,
            status: 'posted', // Draft -> Posted
            payment_state: 'not_paid'
        };

        invoices.push(newInvoice);
        return newInvoice;
    }
};

module.exports = InvoiceService;
