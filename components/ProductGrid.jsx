import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ filteredProducts, allProducts, selectedCategory, searchQuery, onAddToCart, onResetFilters }) => {
  return (
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
          {selectedCategory !== 'All' && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{selectedCategory}</span>
          )}
          {searchQuery && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Search: {searchQuery}</span>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
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
            onClick={onResetFilters}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;