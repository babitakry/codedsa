import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authEndpoints } from '@/services/api';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignuping, setIsSignuping] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const register = async (e) => {
        setIsSignuping(true);
        e.preventDefault();

        try {
            const response = await axios({
                method: "POST",
                url: authEndpoints.SIGNUP_API,
                data: {
                    username: username,
                    email: email,
                    password: password
                }
            });
            if (response.status === 201) {
                navigate("/signin");
            }
        } catch (err) {
            console.error(err.response);
            setError(err?.response?.data?.detail || "Registration failed");
            if (err.response?.status === 409) {
                navigate("/signin");
            }
        }
        setIsSignuping(false);
    };

    return (
        <div className="bg-neutral-50 dark:bg-[#1a1a1a] min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-8 font-sans text-neutral-800 dark:text-neutral-200 transition-colors">
            <div className="w-full max-w-sm bg-white dark:bg-[#282828] rounded-xl border border-neutral-200 dark:border-[#383838] shadow-xs">
                <div className="p-6 sm:p-8 space-y-6">
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 text-center tracking-tight">
                        Create your <span className="text-[#00b8a3]">CodeDSA</span> account
                    </h1>

                    <form onSubmit={register} className="space-y-3.5">
                        <div>
                            <label htmlFor="username" className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                Username
                            </label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                                placeholder="name@domain.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
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
                            disabled={isSignuping}
                            type="submit"
                            className="w-full py-2 px-4 text-xs sm:text-sm font-semibold text-white bg-[#00b8a3] hover:bg-[#00a390] rounded-md transition cursor-pointer shadow-xs disabled:opacity-50 mt-2"
                        >
                            {isSignuping ? "Creating Account..." : "Create Account"}
                        </button>

                        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 pt-1">
                            Already have an account?{' '}
                            <Link to="/signin" className="font-medium text-[#00b8a3] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
