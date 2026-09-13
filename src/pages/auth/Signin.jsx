import { useAuth } from '@/context/AuthContext';
import { authEndpoints } from '@/services/api';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSigning, setIsSigning] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (e) => {
        setIsSigning(true);
        e.preventDefault();

        try {
            const response = await axios({
                method: "POST",
                url: authEndpoints.LOGIN_API,
                data: {
                    username: username,
                    password: password
                }
            });
            login(response.data?.token);
            navigate("/");
        } catch (err) {
            console.error(err.response);
            setError(err?.response?.data?.detail || "Invalid credentials");
            if (err.response?.status === 404) {
                navigate("/signup");
            }
        }
        setIsSigning(false);
    };

    return (
        <div className="bg-neutral-50 dark:bg-[#1a1a1a] min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-8 font-sans text-neutral-800 dark:text-neutral-200 transition-colors">
            <div className="w-full max-w-sm bg-white dark:bg-[#282828] rounded-xl border border-neutral-200 dark:border-[#383838] shadow-xs">
                <div className="p-6 sm:p-8 space-y-6">
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 text-center tracking-tight">
                        Sign in to <span className="text-[#00b8a3]">CodeDSA</span>
                    </h1>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                Username
                            </label>
                            <input
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                Password
                            </label>
                            <input
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-xs text-red-500">
                                {error}
                            </div>
                        )}
                        <button
                            disabled={isSigning}
                            type="submit"
                            className="w-full py-2 px-4 text-xs sm:text-sm font-semibold text-white bg-[#00b8a3] hover:bg-[#00a390] rounded-md transition cursor-pointer shadow-xs disabled:opacity-50"
                        >
                            {isSigning ? "Signing In..." : "Sign In"}
                        </button>
                        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 pt-1">
                            Don’t have an account yet?{' '}
                            <Link to="/signup" className="font-medium text-[#00b8a3] hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
