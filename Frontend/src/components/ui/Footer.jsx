import React from 'react';

const Footer = () => {
  return (
    <div className="bg-indigo-600 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/problems" className="hover:text-indigo-400">Problems</a>
              </li>
              <li>
                <a href="/discuss" className="hover:text-indigo-400">Discuss</a>
              </li>
              <li>
                <a href="/premium" className="hover:text-indigo-400">Premium</a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="hover:text-indigo-400">About</a>
              </li>
              <li>
                <a href="/help" className="hover:text-indigo-400">Help</a>
              </li>
              <li>
                <a href="/careers" className="hover:text-indigo-400">Careers</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-indigo-400">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">Facebook</a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">Twitter</a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} LeetCode Clone. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
