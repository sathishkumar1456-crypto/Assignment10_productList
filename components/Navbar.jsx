import React from 'react';
import SearchSuggestions from './SearchSuggestions';

const Navbar = ({ 
  cartCount, 
  searchQuery, 
  setSearchQuery, 
  navbarSearchOpen, 
  setNavbarSearchOpen,
  MenuOpen,
  setMobileMenuOpen,
  showSuggestions,
  setShowSuggestions,
  searchSuggestions,
  allProducts
}) => {
  const handleNavbarSearch = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      const suggestions = allProducts
        .filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
    setShowSuggestions(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative w-10 h-10">
              <div className="text-white font-bold text-lg flex items-center justify-center"></div>
            </div>
            <div className="sm:block">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                NeoCart
              </h1>
              <p className="text-xs text-gray-500">Awesome Products</p>
            </div>
          </div>

          {/* Center - Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleNavbarSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <SearchSuggestions
                showSuggestions={showSuggestions}
                searchSuggestions={searchSuggestions}
                handleSuggestionClick={handleSuggestionClick}
              />
            </div>
          </div>

          {/* Right Side - Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">
              Contact
            </a>
            <div className="relative">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1 relative">
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setNavbarSearchOpen(!navbarSearchOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              🔍
            </button>
            <button className="relative text-gray-700 hover:text-blue-600">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!MenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {navbarSearchOpen && (
          <div className="md:hidden pb-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleNavbarSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchSuggestions
                showSuggestions={showSuggestions}
                searchSuggestions={searchSuggestions}
                handleSuggestionClick={handleSuggestionClick}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {MenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-4 px-4 space-y-3">
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">Home</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">About</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium py-2">Contact</a>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;