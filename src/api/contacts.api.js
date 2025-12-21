const API_URL = 'http://localhost:4001/contacts';

export const ContactService = {
    async getAll() {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    },

    async create(data) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
