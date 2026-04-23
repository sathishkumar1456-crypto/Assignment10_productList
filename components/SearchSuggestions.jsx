import React from 'react';

const SearchSuggestions = ({ showSuggestions, searchSuggestions, handleSuggestionClick }) => {
  if (!showSuggestions || searchSuggestions.length === 0) {
    return null;
  }

  return (
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
  );
};

export default SearchSuggestions;