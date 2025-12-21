const prisma = require('./prisma');

async function check() {
    try {
        const count = await prisma.product.count();
        console.log('Total Products in DB:', count);

        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        console.log('Last 5 Products:', products);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
