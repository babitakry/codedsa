import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="relative isolate px-6 lg:px-8 overflow-hidden font-sans">
            {/* Subtle LeetCode Teal & Amber Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#00b8a3]/8 dark:bg-[#00b8a3]/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-[#ffc01e]/6 dark:bg-[#ffc01e]/8 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="mx-auto max-w-3xl py-16 sm:py-24 md:py-32 text-center">
                {/* Announcement Pill */}
                <div className="mb-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-[#383838] bg-white/80 dark:bg-[#282828] shadow-xs">
                        <Sparkles size={13} className="text-[#00b8a3]" />
                        <span>A new way to practice and master DSA</span>
                        <Link to="/about" className="font-semibold text-[#00b8a3] hover:underline inline-flex items-center gap-0.5">
                            Learn more <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Main Hero Content */}
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
                    Master Coding Challenges with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b8a3] via-teal-400 to-[#ffc01e]">
                        CodeDSA
                    </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                    Solve curated problems, analyze time & space complexity, track submission stats, and get real-time AI assistance across all DSA topics.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Link 
                        to={isAuthenticated ? "/problems" : "/signup"} 
                        className="rounded-md bg-[#00b8a3] hover:bg-[#00a390] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition flex items-center gap-1.5"
                    >
                        <span>{isAuthenticated ? "Go to Problems" : "Get Started for Free"}</span>
                        <ArrowRight size={15} />
                    </Link>
                    <Link 
                        to="/problems" 
                        className="rounded-md border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] hover:bg-neutral-50 dark:hover:bg-[#333333] px-5 py-2.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition"
                    >
                        Explore Problems
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
