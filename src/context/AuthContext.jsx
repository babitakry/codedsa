import { authEndpoints } from "@/services/api";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // check if token is present in localstorage or not
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("token");
        if (!tokenFromLocalStorage) {
            setIsAuthenticated(false);
            setLoading(false);
            navigate("/signin")
            return;
        }
    }, [isAuthenticated])

    useEffect(() => {
        // sabse pehle token ko frontend se uthayenge
        // isss token ko header ke authorization me bhejenge
        const token = localStorage.getItem("token");
        const verifyToken = async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: authEndpoints.VERIFY_TOKEN_API,
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                console.log("verify token response", res)
                if (res?.status == 200) {
                    setIsAuthenticated(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log("fasfdjkajdsfkasdf")
                setLoading(false);
                setIsAuthenticated(false);
                localStorage.removeItem("token");
            }

        }

        verifyToken();

    }, [])


    const login = (token)=>{
        if(!token)
            return ;
    
        localStorage.setItem("token",token);
        setIsAuthenticated(true);
        
    }

    const onLogout = ()=>{
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, onLogout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within AuthProvider");
    return context;
};