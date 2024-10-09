import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>Proudly powered by WordPress</p>
        <p>&copy; {new Date().getFullYear()} My WordPress Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;