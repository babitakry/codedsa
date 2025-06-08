import React from 'react';
import { Link } from 'react-router';
import CodeBite from '../../assets/CodeBite.png'

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-indigo-600 z-50 sticky top-0 w-full">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={CodeBite} className="h-8 rounded-full" alt="Logo" />
          <span className="text-2xl font-semibold text-amber-100">Codebite</span>
        </Link>

        {/* Navigation Links and Profile Button */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-8 font-medium">
            <li>
              <Link to="/" className=" py-2 px-3 text-white hover:text-indigo-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="py-2 px-3 text-white hover:text-indigo-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/problems" className="py-2 px-3 text-white hover:text-indigo-400">
                Problem List
              </Link>
            </li>
          </ul>

          {/* Profile Icon Button */}
          <Link
            to = "/profile"
            className="flex text-sm bg-amber-100 rounded-full focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-300"
          >
            <img
              className="w-8 h-8 rounded-full"
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
