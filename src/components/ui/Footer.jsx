import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-xs py-6 border-t border-blue-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section: Links */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Link to="/" className="hover:opacity-80 transition">Home</Link>
          <Link to="/about" className="hover:opacity-80 transition">About</Link>
          <Link to="/problems" className="hover:opacity-80 transition">Problem List</Link>
          <Link to="/profile" className="hover:opacity-80 transition">Profile</Link>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-white opacity-70">
          &copy; {new Date().getFullYear()} CodeDSA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
