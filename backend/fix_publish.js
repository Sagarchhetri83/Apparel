const prisma = require('./prisma');

async function fix() {
    try {
        await prisma.product.updateMany({
            data: { published: true }
        });
        console.log('All products set to PUBLISHED = true');

        const products = await prisma.product.findMany();
        console.log(JSON.stringify(products, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

fix();
