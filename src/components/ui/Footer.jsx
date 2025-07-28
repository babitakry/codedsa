import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-xs py-6 border-t border-blue-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section: Links */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Link to="/help" className="hover:opacity-80 transition">Help Center</Link>
          <Link to="/jobs" className="hover:opacity-80 transition">Jobs</Link>
          <Link to="/bug-bounty" className="hover:opacity-80 transition">Bug Bounty</Link>
          <Link to="/students" className="hover:opacity-80 transition">Students</Link>
          <Link to="/terms" className="hover:opacity-80 transition">Terms</Link>
          <Link to="/privacy" className="hover:opacity-80 transition">Privacy Policy</Link>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-white opacity-70">
          &copy; {new Date().getFullYear()} LeetCode Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
