import React from 'react';
import { Link } from 'react-router';
import CodeBite from '../../assets/CodeBite.png';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-primary shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={CodeBite} className="h-9 w-9 rounded-full" alt="Logo" />
          <span className="text-2xl font-bold text-amber-100">Codebite</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-white font-medium">
            <li>
              <Link to="/" className="hover:text-amber-300 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-300 transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/problems" className="hover:text-amber-300 transition duration-200">
                Problem List
              </Link>
            </li>
          </ul>

          {/* Profile Icon */}
          <Link to="/profile" className="relative">
            <img
              className="w-9 h-9 rounded-full border-2 border-amber-100 hover:scale-105 transition-transform"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="user"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
