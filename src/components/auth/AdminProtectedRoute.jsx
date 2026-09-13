import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AdminProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (!isAuthenticated || !isAdmin)) {
            navigate("/");
        }
    }, [isAuthenticated, isAdmin, loading, navigate]);

    return children;
};

export default AdminProtectedRoute;
