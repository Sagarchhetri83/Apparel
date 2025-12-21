const prisma = require("./prisma");

async function main() {
    try {
        const product = await prisma.product.create({
            data: {
                name: "Test Shirt",
                stock: 50,
                price: 1200,
                published: true
            }
        });
        console.log("Successfully created product:", product);
    } catch (error) {
        console.error("Error creating product:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
