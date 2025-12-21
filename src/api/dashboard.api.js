const API_URL = 'http://localhost:4001/dashboard';

export const DashboardService = {
    async getSummary(token) {
        const response = await fetch(`${API_URL}/summary`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        throw new Error(result.message || 'Failed to fetch dashboard data');
    }
};
