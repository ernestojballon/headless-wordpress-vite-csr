import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen size={32} className="text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">My WordPress Blog</h1>
            <p className="text-sm text-gray-600 italic">Just another WordPress site</p>
          </div>
        </Link>
      </div>
      <nav className="bg-gray-800">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link to="/" className="text-white hover:text-gray-300 py-3 inline-block">Home</Link>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;