const prisma = require('../prisma');

const ProductService = {
    /**
     * Get all published products (Public view)
     */
    /**
     * Get all published products (Public view)
     * Supports filtering by category and type
     */
    async getPublishedProducts(filters = {}) {
        const where = { published: true };

        if (filters.category) where.product_category = { equals: filters.category, mode: 'insensitive' };
        if (filters.type) where.product_type = { equals: filters.type, mode: 'insensitive' };

        console.log('Fetching published products with where:', JSON.stringify(where));

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        console.log(`Found ${products.length} products`);
        return products;
    },

    /**
     * Get all products (Admin view)
     */
    async getAllProducts() {
        return await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
    },

    /**
     * Get single product by ID
     */
    async getProductById(id) {
        return await prisma.product.findUnique({
            where: { id: Number(id) }
        });
    },

    /**
     * Create a new product
     */
    async createProduct(data) {
        return await prisma.product.create({
            data: {
                name: data.name,
                stock: Number(data.stock),
                price: parseFloat(data.price),
                published: data.published ?? true,
                product_category: data.product_category,
                product_type: data.product_type
            }
        });
    },

    /**
     * Update product details
     */
    async updateProduct(id, data) {
        // Handle optional type conversions safely
        const updateData = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.stock !== undefined) updateData.stock = Number(data.stock);
        if (data.price !== undefined) updateData.price = parseFloat(data.price);
        if (data.published !== undefined) updateData.published = data.published;
        if (data.product_category !== undefined) updateData.product_category = data.product_category;
        if (data.product_type !== undefined) updateData.product_type = data.product_type;

        return await prisma.product.update({
            where: { id: Number(id) },
            data: updateData
        });
    }
};

module.exports = ProductService;
