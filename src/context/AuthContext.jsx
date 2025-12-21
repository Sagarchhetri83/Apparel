import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../api/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('apparel_token');
            const storedUser = localStorage.getItem('apparel_user');

            if (token && storedUser) {
                // Optionally verify token validity here by calling getProfile
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { token, user } = await AuthService.login(email, password);

            setUser(user);
            localStorage.setItem('apparel_token', token);
            localStorage.setItem('apparel_user', JSON.stringify(user));

            return user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('apparel_user');
        localStorage.removeItem('apparel_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
