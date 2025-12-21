const prisma = require('../prisma');

const DashboardService = {
    /**
     * Get aggregate metrics for the dashboard
     */
    async getSummary() {
        // 1. Total Sales: Sum of total from PAID invoices
        const totalSalesAgg = await prisma.invoice.aggregate({
            _sum: {
                total: true
            },
            where: {
                status: 'PAID'
            }
        });
        const totalSales = totalSalesAgg._sum.total || 0;

        // 2. Open Invoices: Count of invoices NOT paid
        const openInvoices = await prisma.invoice.count({
            where: {
                status: {
                    not: 'PAID'
                }
            }
        });

        // 3. Active Customers: Count of users with role 'customer'
        const activeCustomers = await prisma.user.count({
            where: {
                role: 'customer'
            }
        });

        // 4. Recent Sales: Last 5 orders
        const recentSales = await prisma.saleOrder.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 5. Low Stock Products: Count of products with stock < 10
        const lowStockCount = await prisma.product.count({
            where: {
                stock: {
                    lt: 10
                },
                published: true
            }
        });

        // 6. Invoice Stats: Counts for chart
        const paidInvoices = await prisma.invoice.count({ where: { status: 'PAID' } });
        const pendingInvoices = await prisma.invoice.count({ where: { status: 'PENDING' } });
        const overdueInvoices = await prisma.invoice.count({ where: { status: 'OVERDUE' } });

        return {
            totalSales,
            openInvoices,
            activeCustomers,
            recentSales,
            lowStockCount,
            invoiceStats: {
                paid: paidInvoices,
                pending: pendingInvoices,
                overdue: overdueInvoices
            },
            // Derived Metrics
            avgOrderValue: paidInvoices > 0 ? Math.round(totalSales / paidInvoices) : 0,
            paymentSuccessRate: (paidInvoices + pendingInvoices + overdueInvoices) > 0
                ? Math.round((paidInvoices / (paidInvoices + pendingInvoices + overdueInvoices)) * 100)
                : 100,
            topCategory: await this.getTopCategory()
        };
    },

    async getTopCategory() {
        try {
            // Raw query to get top category by quantity sold
            const result = await prisma.$queryRaw`
                SELECT p.product_category as category, SUM(i.quantity) as total_sold
                FROM "SaleOrderItem" i
                JOIN "Product" p ON i."productId" = p.id
                GROUP BY p.product_category
                ORDER BY total_sold DESC
                LIMIT 1
            `;

            if (result && result.length > 0) {
                // Convert BigInt to Number if necessary (Prisma returns BigInt for sum)
                return {
                    category: result[0].category,
                    count: Number(result[0].total_sold)
                };
            }
            return { category: 'N/A', count: 0 };
        } catch (e) {
            console.error("Error fetching top category:", e);
            return { category: 'N/A', count: 0 };
        }
    }
};

module.exports = DashboardService;
