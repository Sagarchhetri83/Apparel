const API_URL = 'http://localhost:4000/coupons';

export const CouponService = {
    async getAll() {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    },

    async apply(code, contactId) {
        const response = await fetch(`${API_URL}/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, contactId })
        });
        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        throw new Error(result.message);
    },

    async generate(data) {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
