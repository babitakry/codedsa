import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CodeBite from '@/assets/CodeBite.png';
import { useAuth } from '@/context/AuthContext';
import { User, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/about' },
    { name: 'Problems', path: '/problems' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-[#282828] text-neutral-800 dark:text-neutral-200 transition-colors font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-12">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={CodeBite} className="h-7 w-7 rounded-full" alt="Logo" />
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              CodeDSA
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-3 py-1.5 rounded-md transition ${
                      isActive
                        ? 'text-neutral-900 dark:text-white font-semibold'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Section: Theme Toggle & Profile/Auth */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] hover:border-[#00b8a3] transition text-neutral-700 dark:text-neutral-300"
              title="Profile"
            >
              <User className="h-4 w-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/signin"
                className="text-xs sm:text-sm font-medium px-3 py-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-md bg-[#00b8a3] hover:bg-[#00a390] text-white transition shadow-xs"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#282828] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-[#282828] bg-white dark:bg-[#1a1a1a] px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#282828] transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-neutral-200 dark:border-[#282828]">
            {isAuthenticated ? (
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#282828] transition"
              >
                <User size={16} /> Profile
              </Link>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium border border-neutral-200 dark:border-[#383838] rounded-md text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#282828] transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium bg-[#00b8a3] hover:bg-[#00a390] text-white rounded-md transition shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
