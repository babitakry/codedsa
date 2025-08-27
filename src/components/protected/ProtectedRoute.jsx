import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({children}) => {
    const { isAuthenticated,loading } = useAuth();
    const navigate = useNavigate();

    console.log("authen",isAuthenticated)
    

    useEffect(()=>{
        if(!loading && !isAuthenticated)
            navigate("/signin");
    },[isAuthenticated])
    return children;
}

export default ProtectedRoute   