const prisma = require('./prisma');

async function checkTypes() {
    const products = await prisma.product.findMany({
        select: { product_type: true, published: true }
    });
    console.log('Product Types in DB:', products);
}

checkTypes();
