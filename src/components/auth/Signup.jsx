import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authEndpoints } from '@/services/api';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignuping, setIsSignuping] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const register = async (e) => {
        setIsSignuping(true);
        e.preventDefault();
        console.log("Username = ", username)
        console.log("Email = ", email)
        console.log("Password = ", password)

        // connect with backend
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
            console.log(response);

        } catch (err) {
            console.log(err.response)
            setError(err?.response?.data?.detail);
            if (err.response.status == 409) {
                // Redirect to Sign in page
                navigate("/signin")

            }

        }
        setIsSignuping(false);

    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Create a new account
                    </h1>

                    <form onSubmit={register} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Username
                            </label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm Password
                            </label>
                            <input

                                type="password"
                                id="confirm-password"
                                placeholder="••••••••"
                                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                required
                            />
                        </div>
                        {/* <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-500 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 rounded border border-gray-300 bg-gray-50 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600"
                                    required
                                />
                                I agree to the terms and conditions
                            </label>
                        </div> */}
                        <div className='w-full flex justify-center'>
                            <button
                                type="submit"
                                className="w-full py-2.5 px-5 text-sm text-center font-medium text-white bg-primary rounded-lg hover:bg-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link to="/signin" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
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
