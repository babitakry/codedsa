import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1a1a1a] text-neutral-500 dark:text-neutral-400 text-xs py-6 border-t border-neutral-200 dark:border-[#282828] transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section: Links */}
        <div className="flex flex-wrap gap-5 justify-center md:justify-start">
          <Link to="/" className="hover:text-neutral-900 dark:hover:text-white transition">Home</Link>
          <Link to="/about" className="hover:text-neutral-900 dark:hover:text-white transition">About</Link>
          <Link to="/problems" className="hover:text-neutral-900 dark:hover:text-white transition">Problems</Link>
          <Link to="/profile" className="hover:text-neutral-900 dark:hover:text-white transition">Profile</Link>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-xs">
          &copy; {new Date().getFullYear()} CodeDSA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
