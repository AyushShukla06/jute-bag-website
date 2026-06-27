/**
 * @file ProductCard.jsx
 * @path src/components/ui/ProductCard.jsx
 * @description Reusable product showcase card. Displays category, rating, price, 
 * dynamic hover-based secondary images, stock badge, quick cart addition, and wishlist toggle.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Global hooks for item cart and wishlist management
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ProductCard({ product }) {
  /* --- HOOKS & CONTEXT STATES --- */
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  /* --- LOCAL COMPONENT STATES --- */
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* --- WISHLIST CHECKER --- */
  const favorited = isInWishlist(product.id);

  /* --- EVENT HANDLERS --- */
  /**
   * Triggers cart addition for 1 unit and displays a short confirmation check.
   */
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  /**
   * Toggles product in/out of the user's local wishlist.
   */
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      {/* 3.1. Floating Action Badges: Wishlist Heart */}
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-10 p-2 bg-white/95 dark:bg-earth-charcoal/95 rounded-full shadow-sm text-earth-olive dark:text-earth-sand hover:text-earth-crimson dark:hover:text-earth-amber hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Toggle Wishlist"
      >
        <Heart
          size={18}
          fill={favorited ? "#a3243c" : "none"}
          className={favorited ? "text-earth-crimson dark:text-earth-amber" : ""}
        />
      </button>

      {/* 3.2. Promotional / Special Tag (New, Hot, Limited, etc.) */}
      {product.tag && (
        <span className="absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-earth-olive text-earth-beige dark:bg-earth-amber dark:text-earth-forest shadow-sm">
          {product.tag}
        </span>
      )}

      {/* 3.3. Interactive Product Image Container */}
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-[4/5] bg-earth-sand/20">
        <img
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-105"
        />
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-earth-forest/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white dark:text-earth-amber font-display font-extrabold uppercase tracking-widest text-sm py-2 px-4 border border-white/20">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* 3.4. Info Details Panel */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Product Category Header */}
        <span className="text-[11px] uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60 mb-1">
          {product.category}
        </span>
        
        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-display font-bold text-lg text-earth-olive dark:text-earth-sand leading-tight mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Dynamic Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-earth-amber">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "text-earth-amber" : "text-gray-300 dark:text-earth-olive"}
              />
            ))}
          </div>
          <span className="text-xs text-earth-olive/50 dark:text-earth-sand/55">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Footer Panel: Price and Add-To-Cart actions */}
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-earth-olive/5 dark:border-earth-sand/5">
          
          <span className="font-display font-bold text-xl text-earth-crimson dark:text-earth-amber">
            ₹{product.price.toFixed(2)}
          </span>

          {/* Quick Add Cart Action */}
          {product.inStock ? (
            <button
              onClick={handleQuickAdd}
              disabled={added}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/80 text-earth-cream dark:text-earth-forest'
              }`}
              aria-label="Add to cart"
            >
              {added ? <Check size={16} /> : <ShoppingCart size={16} />}
            </button>
          ) : (
            <button
              disabled
              className="p-2.5 rounded-full bg-earth-olive/10 text-earth-olive/40 cursor-not-allowed dark:bg-earth-sand/5 dark:text-earth-sand/20"
              aria-label="Out of stock"
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>

      </div>
    </motion.div>
  );
}
