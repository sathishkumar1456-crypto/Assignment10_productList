import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';

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

  // Filter products based on category, price range, and search query
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  const handleAddToCart = (productId) => {
    setCartCount(cartCount + 1);
    console.log(`Product ${productId} added to cart`);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 300]);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        navbarSearchOpen={navbarSearchOpen}
        setNavbarSearchOpen={setNavbarSearchOpen}
        MenuOpen={MenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        searchSuggestions={searchSuggestions}
        allProducts={allProducts}
      />

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
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              searchSuggestions={searchSuggestions}
              allProducts={allProducts}
              onResetFilters={handleResetFilters}
            />

            <ProductGrid
              filteredProducts={filteredProducts}
              allProducts={allProducts}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onAddToCart={handleAddToCart}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
