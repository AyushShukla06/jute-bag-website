/**
 * @file ShopSidebar.jsx
 * @path src/components/features/shop/ShopSidebar.jsx
 * @description Desktop sidebar filtering panel for the Shop catalog page.
 * Provides controls for product category selection, pricing range adjustments, and clear/reset parameters.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { RotateCcw } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ShopSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  maxPrice,
  onPriceChange,
  onResetFilters
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <aside className="hidden lg:block space-y-8 pr-4">
      
      {/* 3.1. Category List Filtration */}
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
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

      {/* 3.2. Price Range Slider */}
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
          Price Range
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min="1800"
            max="15100"
            value={maxPrice}
            onChange={(e) => onPriceChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-earth-olive/20 dark:bg-earth-sand/20 rounded-lg appearance-none cursor-pointer accent-earth-olive dark:accent-earth-amber"
          />
          <div className="flex justify-between text-xs text-earth-olive/70 dark:text-earth-sand/70">
            <span>₹1,800</span>
            <span>Max: ₹{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* 3.3. Clear / Reset Filters Action Button */}
      <button
        onClick={onResetFilters}
        className="flex items-center gap-2 px-4 py-2 border border-earth-olive/30 dark:border-earth-sand/30 hover:bg-earth-olive/5 dark:hover:bg-white/5 rounded-lg text-xs font-semibold text-earth-olive dark:text-earth-sand transition-colors w-full justify-center"
      >
        <RotateCcw size={14} /> Clear Filters
      </button>

    </aside>
  );
}
