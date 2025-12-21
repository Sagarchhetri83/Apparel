const prisma = require('./prisma');

async function check() {
    try {
        const products = await prisma.product.findMany({});
        console.log('ALL PRODUCTS IN DB:');
        console.table(products.map(p => ({
            id: p.id,
            name: p.name,
            published: p.published,
            category: p.product_category,
            type: p.product_type
        })));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
