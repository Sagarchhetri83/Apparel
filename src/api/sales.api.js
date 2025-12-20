const API_URL = 'http://localhost:4000/sales';

export const SalesService = {
    async createOrder(orderData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const result = await response.json();
        return result.data;
    },

    async getMyOrders(contactId) {
        const response = await fetch(`${API_URL}/customer/${contactId}`);
        const result = await response.json();
        return result.data;
    },

    async getAll() {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    }
};
