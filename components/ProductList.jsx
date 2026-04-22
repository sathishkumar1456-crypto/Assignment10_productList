import React, { useState } from 'react';

const ProductList = () => {
  // Sample product data
  const allProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 79.99, image: 'https://i.pinimg.com/736x/ba/e7/85/bae78594bec550c138b1af92a2f57642.jpg' },
    { id: 2, name: 'Running Shoes', category: 'Sports', price: 89.99, image: 'https://i.pinimg.com/736x/73/57/e6/7357e6a62ff4ff45eb0aef2715197e06.jpg' },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 199.99, image: 'https://i.pinimg.com/736x/28/76/a9/2876a91b83e4b5eb25c46bafebcf37b8.jpg' },
    { id: 4, name: 'Yoga Mat', category: 'Sports', price: 29.99, image: 'https://i.pinimg.com/736x/c2/45/c4/c245c42f57177566373d34554eec1405.jpg' },
    { id: 5, name: 'Coffee Maker', category: 'Home', price: 59.99, image: 'https://i.pinimg.com/1200x/fd/f3/a3/fdf3a38be8928c96c93d36ad61d1280a.jpg' },
    { id: 6, name: 'Desk Lamp', category: 'Home', price: 39.99, image: 'https://i.pinimg.com/736x/15/d5/d7/15d5d7ef83afe8e36b1081fcd070f9ab.jpg' },
    { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 49.99, image: 'https://i.pinimg.com/736x/eb/1e/ba/eb1ebaa50340547c4043459920f4ac23.jpg' },
    { id: 8, name: 'Water Bottle', category: 'Sports', price: 24.99, image: 'https://i.pinimg.com/736x/3a/0d/97/3a0d9776bd2ba7e9d604ab9ab8d617b0.jpg' },
    { id: 9, name: 'Gaming Mouse', category: 'Electronics', price: 59.99, image: 'https://i.pinimg.com/736x/bb/31/c2/bb31c26fcffdf72b62c5895e96d42b7a.jpg' },
    { id: 10, name: 'Resistance Bands', category: 'Sports', price: 19.99, image: 'https://i.pinimg.com/736x/9f/1c/cd/9f1ccd8e85489ec82e5d9b89d877f633.jpg' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [MenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarSearchOpen, setNavbarSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];

  // Handle navbar search input
  const handleNavbarSearch = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      const suggestions = allProducts
        .filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
    setShowSuggestions(false);
  };

  // Filter products based on category, price range, and search query
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative w-10 h-10">
                {/* Logo Design */}

                <div className="text-white font-bold text-lg flex items-center justify-center">


                </div>
              </div>
              <div className=" sm:block">
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


                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {searchSuggestions.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.name)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition flex items-center gap-3 group"
                      >

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category} • ${product.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Nav Items */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Home */}
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">

                Home
              </a>

              {/* About */}
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">

                About
              </a>

              {/* Contact */}
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">

                Contact
              </a>

              {/* Cart */}
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
              {/* Profile */}
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105">
                Sign In
              </button>
            </div>

            {/*  Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/*  Search Button */}
              <button
                onClick={() => setNavbarSearchOpen(!navbarSearchOpen)}
                className="text-gray-700 hover:text-blue-600"
              >

              </button>

              {/* Cart Button */}
              <button className="relative text-gray-700 hover:text-blue-600">

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!MenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >

              </button>
            </div>
          </div>

          {/* Search Bar */}
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


                {/*  Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {searchSuggestions.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.name)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition flex items-center gap-3 group"
                      >

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category} • ${product.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/*  Menu */}
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

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
              Our Products
            </h1>
            <p className="text-lg text-gray-600">Browse our premium collection and find what you love</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">

                  Filters
                </h2>

                {/* Search in Sidebar */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Search Products</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => handleNavbarSearch(e.target.value)}
                      onFocus={() => searchQuery && setShowSuggestions(true)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setShowSuggestions(false);
                        }}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Category</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label key={category} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition">
                          {category}
                        </span>
                        <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded group-hover:bg-blue-100">
                          {allProducts.filter(p => category === 'All' || p.category === category).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Price Range</h3>
                  <div className="space-y-4">
                    {/* Min Price */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-gray-600 font-medium">Minimum</label>
                        <span className="text-sm font-bold text-blue-600">${priceRange[0]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const newMin = Math.min(Number(e.target.value), priceRange[1]);
                          setPriceRange([newMin, priceRange[1]]);
                        }}
                        className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Max Price */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-gray-600 font-medium">Maximum</label>
                        <span className="text-sm font-bold text-blue-600">${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const newMax = Math.max(Number(e.target.value), priceRange[0]);
                          setPriceRange([priceRange[0], newMax]);
                        }}
                        className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Price Range Display */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 text-center border border-blue-200">
                      <p className="text-sm font-semibold text-gray-900">
                        ${priceRange[0]} - ${priceRange[1]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 100]);
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Info */}
              <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow p-4 border border-gray-200">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-gray-900 text-lg">{filteredProducts.length}</span> of{' '}
                    <span className="font-bold text-gray-900 text-lg">{allProducts.length}</span> products
                  </p>
                </div>
                <div className="text-sm text-gray-500 flex gap-2">
                  {selectedCategory !== 'All' && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{selectedCategory}</span>}
                  {searchQuery && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Search: {searchQuery}</span>}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-200 hover:border-blue-400"
                    >
                      {/* Product Image */}
                      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 m-2 rounded-full text-xs font-bold">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Category Badge */}
                        <span className="text-xs font-bold text-blue-600 uppercase mb-2 bg-blue-50 px-2 py-1 rounded-full w-fit">
                          {product.category}
                        </span>

                        {/* Product Name */}
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <p className="text-3xl font-extrabold text-gray-900 mb-4">
                          ${product.price.toFixed(2)}
                        </p>

                        {/* Add to Cart Button */}
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                        >

                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl text-gray-600 font-semibold">No products found</p>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, 100]);
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;