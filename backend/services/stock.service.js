const products = require('../data/products');

const StockService = {
    updateStock: (productId, quantity, operation) => {
        const product = products.find(p => p.id === Number(productId));
        if (!product) throw new Error('Product not found');

        if (operation === 'increase') {
            product.current_stock += quantity;
        } else if (operation === 'decrease') {
            if (product.current_stock < quantity) {
                throw new Error(`Insufficient stock for product ${product.product_name}`);
            }
            product.current_stock -= quantity;
        }
        return product;
    },

    checkAvailability: (productId, quantity) => {
        const product = products.find(p => p.id === Number(productId));
        if (!product) return false;
        return product.current_stock >= quantity;
    }
};

module.exports = StockService;
