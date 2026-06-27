/**
 * @file MobileFiltersModal.jsx
 * @path src/components/features/shop/MobileFiltersModal.jsx
 * @description Mobile slideout modal overlay containing the category list,
 * price slider, and reset button. Uses Framer Motion for premium slide transitions.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function MobileFiltersModal({
  isOpen,
  onClose,
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 3.1. Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black"
          />
          
          {/* 3.2. Filter Slideout Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-earth-cream dark:bg-earth-forest p-6 flex flex-col justify-between overflow-y-auto transition-colors duration-300"
          >
            <div className="space-y-8">
              
              {/* Header: Title and Close button */}
              <div className="flex justify-between items-center border-b border-earth-olive/10 pb-4">
                <h2 className="font-display font-extrabold text-lg text-earth-olive dark:text-earth-sand">Filters</h2>
                <button onClick={onClose} aria-label="Close Filter Modal">
                  <X size={20} />
                </button>
              </div>

              {/* Category filtration links */}
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        onCategorySelect(category);
                        onClose();
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

              {/* Price range selector slider */}
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-3">
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
                  <div className="flex justify-between text-xs text-earth-olive/75 dark:text-earth-sand/75">
                    <span>₹1,800</span>
                    <span>Max: ₹{maxPrice}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Reset control at the bottom */}
            <div className="pt-8">
              <button
                onClick={() => {
                  onResetFilters();
                  onClose();
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
  );
}
