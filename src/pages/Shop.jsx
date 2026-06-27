/**
 * @file Shop.jsx
 * @path src/pages/Shop.jsx
 * @description Catalog page with advanced filter parameters, sorting order configurations,
 * and search querying logic. Coordinates sidebar selections and mobile filters overlay.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

// Product data source and reusable showcase card
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

// Modular features components extracted from this view
import ShopSidebar from '../components/features/shop/ShopSidebar';
import MobileFiltersModal from '../components/features/shop/MobileFiltersModal';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Shop() {
  /* --- ROUTING SEARCH PARAMS HOOK --- */
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  /* --- STATE MANAGEMENT --- */
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(15100);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Derive category state directly from query parameters to avoid sync state effects
  const selectedCategory = categoryParam || 'All';

  /* --- CATALOG FILTER LISTS --- */
  const categories = [
    'All', 
    'Tote Bags', 
    'Luxury Handbags', 
    'Travel Bags', 
    'Clutch & Pouches', 
    'Utility Bags', 
    'Specialty Bags'
  ];

  /* ==========================================================================
     3. FILTERING & SORTING LOGIC
     ========================================================================== */
  
  // 3.1. Main filter chain (checks text match, category matching and price bounds)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // 3.2. Order sorting algorithm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default: Featured (inherent sequence)
  });

  /* ==========================================================================
     4. HANDLERS & CALLBACKS
     ========================================================================== */
  
  /**
   * Resets all search querying inputs, price boundaries and sorting parameters back to defaults.
   */
  const handleResetFilters = () => {
    setSearchQuery('');
    setMaxPrice(15100);
    setSortBy('featured');
    setSearchParams({});
  };

  /**
   * Toggles category selection and synchronizes standard URL params.
   */
  const handleCategorySelect = (category) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  /* ==========================================================================
     5. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* 5.1. Search bar & sorting header row */}
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

        {/* Sorting selection and mobile trigger controls */}
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-earth-olive/5 border border-earth-olive/15 dark:border-earth-sand/15 rounded-xl text-sm text-earth-olive dark:text-earth-sand"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          
          {/* Dropdown Selector */}
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

      {/* 5.2. Core Layout Grid: Sidebar (Desktop) + Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filter Panel */}
        <ShopSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          onResetFilters={handleResetFilters}
        />

        {/* Product Listing Main Column */}
        <main className="lg:col-span-3">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // Fallback Empty State when zero matches exist
            <div className="text-center py-20 bg-earth-olive/5 rounded-2xl border border-dashed border-earth-olive/20">
              <span className="text-4xl" role="img" aria-label="eco leaf">🍃</span>
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

      {/* 5.3. Slide-out filter modal overlay (Visible on mobile/tablets only) */}
      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        maxPrice={maxPrice}
        onPriceChange={setMaxPrice}
        onResetFilters={handleResetFilters}
      />

    </div>
  );
}
