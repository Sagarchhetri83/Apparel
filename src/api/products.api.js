const API_URL = 'http://localhost:4000/products';

export const ProductService = {
    async getAll(isAdmin = false) {
        const response = await fetch(API_URL);
        const result = await response.json();
        let products = result.data;
        if (!isAdmin) {
            products = products.filter(p => p.published);
        }
        return products;
    },

    async getById(id) {
        // In real app use /products/:id endpoint
        // Fallback fetching all for now or improved later
        const products = await this.getAll(true);
        return products.find(p => p.id === Number(id));
    },

    async create(data) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
