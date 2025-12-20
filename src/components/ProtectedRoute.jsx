import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // If internal user tries to access portal, it's fine (maybe?), but usually we redirect.
        // However, internal user might want to see the shop. 
        // But if portal user tries to access admin, that's forbidden.
        if (requiredRole === 'internal' && user.role !== 'internal') {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
