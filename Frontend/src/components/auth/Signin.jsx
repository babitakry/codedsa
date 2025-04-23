import React from 'react';
import { Link } from 'react-router';

const Signin = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
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
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-500 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 rounded border border-gray-300 bg-gray-50 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600"
                                    required
                                />
                                Remember me
                            </label>
                            <Link to="#" className="text-indigo-600 hover:underline dark:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2.5 px-5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                            Sign in
                        </button>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{' '}
                            <Link to="/signup" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
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
