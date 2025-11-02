import React, { useState } from 'react';
import { Link } from 'react-router';
import CodeBite from '../../assets/CodeBite.png';
import { useAuth } from '@/context/AuthContext';
import { User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={CodeBite} className="h-9 w-9 rounded-full" alt="Logo" />
          <span className="text-2xl font-bold text-black">CodeDSA</span>
        </Link>

        {/* Desktop Links */}
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

        {/* Right side: profile + mobile menu toggle */}
        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          {isAuthenticated ? (
            <Link to="/profile" className="relative">
              <img
                className="w-9 h-9 rounded-full border-2 border-amber-100 hover:scale-105 transition-transform"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user"
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              <User className="w-5 h-5 text-gray-700" />
            </Link>
          )}

          {/* Hamburger button (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-amber-100 hover:text-amber-300 focus:outline-none"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary px-6 pb-4">
          <ul className="flex flex-col gap-4 text-white font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-300 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-300 transition duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/problems"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-300 transition duration-200"
              >
                Problem List
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
