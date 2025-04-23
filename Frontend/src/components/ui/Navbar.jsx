import React from 'react';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 ">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-2">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold text-teal-600 dark:text-teal-400">Flowbite</span>
        </a>

        {/* Navigation Links and Profile Button */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-8 font-medium">
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:text-teal-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:text-teal-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 hover:text-teal-600">
                Problem List
              </a>
            </li>
          </ul>

          {/* Profile Icon Button */}
          <button
            type="button"
            className="flex text-sm bg-teal-600 rounded-full focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-500"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="user"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
