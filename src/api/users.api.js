const API_URL = 'http://localhost:4001/users';

export const UserService = {
    async getAll() {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    },

    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        throw new Error(result.message);
    },

    async signup(data) {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async getProfile(id) {
        // TODO: Implement get profile in backend
        return null;
    }
};
