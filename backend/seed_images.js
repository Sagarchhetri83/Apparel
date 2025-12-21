const prisma = require('./prisma');

const IMAGES = {
    shirt: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    ],
    tshirt: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620799140408-ed5341cdb481?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    pants: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    ],
    dress: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
    ]
};

async function addImages() {
    try {
        const products = await prisma.product.findMany();
        console.log(`Updating ${products.length} products with images...`);

        for (const p of products) {
            let type = p.product_type ? p.product_type.toLowerCase() : 'shirt';
            if (!IMAGES[type]) type = 'shirt';

            const randomImage = IMAGES[type][Math.floor(Math.random() * IMAGES[type].length)];

            await prisma.product.update({
                where: { id: p.id },
                data: { image: randomImage }
            });
        }
        console.log('Done! Images added.');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

addImages();
