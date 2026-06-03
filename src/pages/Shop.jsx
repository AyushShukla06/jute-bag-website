import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [maxPrice, setMaxPrice] = useState(160);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category filter with search query param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const categories = ['All', 'Tote Bags', 'Luxury Handbags', 'Travel Bags', 'Clutch & Pouches', 'Utility Bags', 'Specialty Bags'];

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default Featured (natural order)
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(160);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        
        {/* Search Input bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-3.5 text-earth-olive/50 dark:text-earth-sand/50" size={18} />
          <input
            type="text"
            placeholder="Search premium bags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/15 dark:border-earth-sand/15 rounded-xl text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber"
          />
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-earth-olive/5 border border-earth-olive/15 dark:border-earth-sand/15 rounded-xl text-sm text-earth-olive dark:text-earth-sand"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-earth-olive/60 dark:text-earth-sand/65" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/15 dark:border-earth-sand/15 rounded-xl px-3 py-2.5 text-sm text-earth-olive dark:text-earth-sand focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4">
          
          {/* Category List */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`block w-full text-left py-1 text-sm transition-colors ${
                    selectedCategory === category
                      ? 'text-earth-crimson dark:text-earth-amber font-semibold'
                      : 'text-earth-olive/80 hover:text-earth-crimson dark:text-earth-sand/80 dark:hover:text-earth-amber'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
              Price Range
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min="20"
                max="160"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-earth-olive/20 dark:bg-earth-sand/20 rounded-lg appearance-none cursor-pointer accent-earth-olive dark:accent-earth-amber"
              />
              <div className="flex justify-between text-xs text-earth-olive/70 dark:text-earth-sand/70">
                <span>$20</span>
                <span>Max: ${maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2 border border-earth-olive/30 dark:border-earth-sand/30 hover:bg-earth-olive/5 dark:hover:bg-white/5 rounded-lg text-xs font-semibold text-earth-olive dark:text-earth-sand transition-colors w-full justify-center"
          >
            <RotateCcw size={14} /> Clear Filters
          </button>

        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-earth-olive/5 rounded-2xl border border-dashed border-earth-olive/20">
              <span className="text-4xl">🍃</span>
              <h3 className="text-xl font-bold text-earth-olive dark:text-earth-sand mt-4">
                No Products Found
              </h3>
              <p className="text-sm text-earth-olive/60 dark:text-earth-sand/65 mt-2 mb-6">
                Try widening your price range or adjusting your keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest rounded-full text-xs font-bold transition-all hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filters Slide-out Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Filter Content Card */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-earth-cream dark:bg-earth-forest p-6 flex flex-col justify-between overflow-y-auto transition-colors duration-300"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-earth-olive/10 pb-4">
                  <h2 className="font-display font-extrabold text-lg text-earth-olive dark:text-earth-sand">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-3">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          handleCategorySelect(category);
                          setShowMobileFilters(false);
                        }}
                        className={`block w-full text-left py-1.5 text-sm ${
                          selectedCategory === category
                            ? 'text-earth-crimson dark:text-earth-amber font-semibold'
                            : 'text-earth-olive/80 dark:text-earth-sand/80'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="20"
                      max="160"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-earth-olive/20 dark:bg-earth-sand/20 rounded-lg appearance-none cursor-pointer accent-earth-olive dark:accent-earth-amber"
                    />
                    <div className="flex justify-between text-xs text-earth-olive/75 dark:text-earth-sand/75">
                      <span>$20</span>
                      <span>Max: ${maxPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom control */}
              <div className="pt-8">
                <button
                  onClick={() => {
                    handleResetFilters();
                    setShowMobileFilters(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 border border-earth-olive/30 dark:border-earth-sand/30 hover:bg-earth-olive/5 rounded-xl text-xs font-semibold text-earth-olive dark:text-earth-sand transition-colors w-full justify-center"
                >
                  <RotateCcw size={14} /> Reset Filters
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
