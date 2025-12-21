const prisma = require('../prisma');

const SalesService = {
    /**
     * Create a Sale Order and automatically generate an invoice.
     * @param {number} userId 
     * @param {Array<{productId: number, quantity: number}>} items 
     */
    async createSaleOrder(userId, items) {
        return await prisma.$transaction(async (tx) => {
            // 1. Calculate Total & Verify Stock
            let total = 0;
            const saleOrderItems = [];

            for (const item of items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });
                if (!product) throw new Error(`Product ${item.productId} not found`);

                // Optional: Check stock constraint here, or allow backorder
                // if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

                const lineTotal = product.price * item.quantity;
                total += lineTotal;

                saleOrderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: product.price
                });
            }

            // 2. Create SaleOrder
            const saleOrder = await tx.saleOrder.create({
                data: {
                    userId,
                    status: 'CONFIRMED',
                    total,
                    items: {
                        create: saleOrderItems
                    }
                },
                include: { items: true }
            });

            // 3. Auto-Create Invoice (ERP Rule: Automatic Invoicing = True)
            const invoice = await tx.invoice.create({
                data: {
                    saleId: saleOrder.id,
                    total,
                    status: 'PENDING'
                }
            });

            return { saleOrder, invoice };
        });
    },

    /**
     * Get all sale orders
     */
    async getAll() {
        return await prisma.saleOrder.findMany({
            include: {
                user: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    },

    /**
     * Process payment for an invoice and update stock.
     * @param {number} invoiceId 
     * @param {number} amount 
     * @param {string} method 
     */
    async processPayment(invoiceId, amount, method) {
        return await prisma.$transaction(async (tx) => {
            const invoice = await tx.invoice.findUnique({
                where: { id: invoiceId },
                include: { sale: { include: { items: true } } }
            });

            if (!invoice) throw new Error('Invoice not found');
            if (invoice.status === 'PAID') throw new Error('Invoice already paid');

            // 1. Record Payment
            const payment = await tx.payment.create({
                data: {
                    invoiceId,
                    amount,
                    method
                }
            });

            // 2. Update Invoice Status
            // Check if full payment (simple logic: assume full payment for now)
            await tx.invoice.update({
                where: { id: invoiceId },
                data: { status: 'PAID' }
            });

            // 3. Update Product Stock (Inventory Move)
            for (const item of invoice.sale.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            // 4. Update Sale Order Status
            await tx.saleOrder.update({
                where: { id: invoice.saleId },
                data: { status: 'DONE' }
            });

            return payment;
        });
    }
};

module.exports = SalesService;
