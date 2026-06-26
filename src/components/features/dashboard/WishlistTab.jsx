/**
 * @file WishlistTab.jsx
 * @path src/components/features/dashboard/WishlistTab.jsx
 * @description Renders the wishlist product grid. Integrates ProductCard components
 * and includes quick removal handlers.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import ProductCard from '../../ui/ProductCard';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function WishlistTab({
  wishlist,
  onRemove
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="space-y-6">
      
      {/* 3.1. Tab Header Title */}
      <h2 className="text-xl font-bold text-earth-olive dark:text-earth-sand flex items-center gap-2">
        <Heart size={20} /> Your Wishlist
      </h2>

      {/* 3.2. Wishlist Grid list */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="relative">
              
              {/* Product Card */}
              <ProductCard product={product} />
              
              {/* Trash icon overlay for quick deletion */}
              <button
                onClick={() => onRemove(product)}
                className="absolute bottom-5 right-16 p-2.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors focus:outline-none"
                title="Remove from Wishlist"
                aria-label="Remove from Wishlist"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}
        </div>
      ) : (
        // Empty wishlist helper layout
        <div className="text-center py-16 bg-earth-olive/5 rounded-xl border border-dashed border-earth-olive/15">
          <span className="text-3xl" role="img" aria-label="red heart">❤️</span>
          <h4 className="font-bold mt-3 text-earth-olive dark:text-earth-sand">Your Wishlist is empty</h4>
          <p className="text-xs text-earth-olive/60 dark:text-earth-sand/65 mt-1 mb-4">Save items you like for later purchase.</p>
          <Link to="/shop" className="px-6 py-2 bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest text-xs font-bold rounded-full">
            Shop Collection
          </Link>
        </div>
      )}

    </div>
  );
}
