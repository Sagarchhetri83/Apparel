const API_URL = 'http://localhost:4001';

export const SalesService = {
    // Get all sales (Admin)
    async getAll() {
        const token = localStorage.getItem('apparel_token');
        const response = await fetch(`${API_URL}/sales`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.success) return result.data;
        throw new Error(result.message);
    },

    // Authenticated checkout
    async checkout(items, token) {
        const response = await fetch(`${API_URL}/sales/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        return result.data;
    },

    // Process payment
    async payInvoice(invoiceId, amount, method, token) {
        const response = await fetch(`${API_URL}/payments/invoice/${invoiceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, method })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        return result.data;
    }
};
