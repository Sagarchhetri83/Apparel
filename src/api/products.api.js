
const API_URL = 'http://localhost:4001/products';

export const ProductService = {
    async getAll(params = {}) {
        // If params is true (legacy call from ProductList), convert to object
        if (params === true) {
            params = { admin: true };
        }

        const query = new URLSearchParams(params).toString();
        const url = query ? `${API_URL}?${query}` : API_URL;

        const response = await fetch(url);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to fetch products');
        }

        return result.data || [];
    },

    async getById(id) {
        // In real app use /products/:id endpoint
        // Fallback fetching all for now
        const products = await this.getAll({});
        return products.find(p => p.id === Number(id));
    },

    async create(data, token) {
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async update(id, data) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async togglePublish(id) {
        const response = await fetch(`${API_URL}/${id}/publish`, {
            method: 'PATCH'
        });
        return response.json();
    },

    async delete(id) {
        // TODO: Implement delete endpoint in backend
        return true;
    }
};
