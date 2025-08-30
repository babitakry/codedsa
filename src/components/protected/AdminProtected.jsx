import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AdminProtectedRoute = ({children}) => {
    const { isAuthenticated,loading, isAdmin } = useAuth();
    const navigate = useNavigate();

    console.log("authen",isAuthenticated)
    

    useEffect(()=>{
        if(!loading && (!isAuthenticated || !isAdmin))
            navigate("/");
    },[isAuthenticated])
    return children;
}

export default AdminProtectedRoute   