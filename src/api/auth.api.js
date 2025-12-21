const API_URL = 'http://localhost:4001/auth';

export const AuthService = {
    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            return result.data; // { token, user }
        }
        throw new Error(result.message);
    },

    async signup(data) {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        throw new Error(result.message);
    },

    async getProfile(token) {
        const response = await fetch(`${API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        throw new Error(result.message);
    }
};
