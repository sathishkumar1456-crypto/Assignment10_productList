import React from 'react';
import SearchSuggestions from './SearchSuggestions';

const Sidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  showSuggestions,
  setShowSuggestions,
  searchSuggestions,
  allProducts,
  onResetFilters
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
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          🔍 Filters
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
            <SearchSuggestions
              showSuggestions={showSuggestions}
              searchSuggestions={searchSuggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
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
          onClick={onResetFilters}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;