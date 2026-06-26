/**
 * @file ProductMeta.jsx
 * @path src/components/features/product/ProductMeta.jsx
 * @description Product meta information card. Displays rating reviews,
 * dynamic stock state, custom attributes configurations (dyes/sizes), quantity controls,
 * and cart/wishlist operations.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Star, Heart, ShoppingBag, Plus, Minus, Check } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ProductMeta({
  product,
  colors,
  selectedColor,
  onColorSelect,
  sizes,
  selectedSize,
  onSizeSelect,
  quantity,
  onQuantityChange,
  onAddToCart,
  added,
  favorited,
  onToggleWishlist
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="lg:col-span-6 space-y-6">
      
      {/* 3.1. Category & Product Title */}
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-earth-crimson dark:text-earth-amber">
          {product.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-earth-olive dark:text-earth-sand mt-2">
          {product.name}
        </h1>
      </div>

      {/* 3.2. Rating Reviews Summary */}
      <div className="flex items-center gap-2">
        <div className="flex text-earth-amber">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
              className={i < Math.floor(product.rating) ? 'text-earth-amber' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-earth-olive dark:text-earth-sand">
          {product.rating} / 5
        </span>
        <span className="text-xs text-earth-olive/50 dark:text-earth-sand/50">
          ({product.reviewsCount} verified customers)
        </span>
      </div>

      {/* 3.3. Pricing Display */}
      <div className="text-3xl font-display font-bold text-earth-crimson dark:text-earth-amber border-b border-earth-olive/10 pb-4">
        ${product.price.toFixed(2)}
      </div>

      {/* 3.4. Descriptive Text Copy */}
      <p className="text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed text-sm">
        {product.description}
      </p>

      {/* 3.5. Dynamic Attribute Configuration Panel */}
      <div className="space-y-4 pt-2">
        
        {/* Color / Dye Selection Row */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
            Fiber Dye / Color: <span className="text-earth-olive dark:text-earth-sand font-bold">{selectedColor}</span>
          </span>
          <div className="flex gap-3 mt-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onColorSelect(color.name)}
                className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-all ${color.class} ${
                  selectedColor === color.name
                    ? 'ring-2 ring-offset-2 ring-earth-crimson dark:ring-earth-amber scale-105'
                    : 'hover:scale-105'
                }`}
                title={color.name}
                aria-label={`Select color dye ${color.name}`}
              />
            ))}
          </div>
        </div>

        {/* Size Selection Row */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
            Size: <span className="text-earth-olive dark:text-earth-sand font-bold">{selectedSize}</span>
          </span>
          <div className="flex gap-3 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  selectedSize === size
                    ? 'bg-earth-olive text-white border-earth-olive dark:bg-earth-amber dark:text-earth-forest dark:border-earth-amber'
                    : 'bg-white/40 dark:bg-earth-charcoal/40 text-earth-olive dark:text-earth-sand border-earth-olive/20 hover:bg-earth-olive/5'
                }`}
              >
                {size === 'Large' ? 'Large (+$15)' : 'Standard'}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count / Quantity Incremeter */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
            Quantity
          </span>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center border border-earth-olive/20 rounded-lg overflow-hidden bg-white/40 dark:bg-earth-charcoal/40">
              <button
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
                aria-label="Decrease item count"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 py-1 text-sm font-semibold text-earth-olive dark:text-earth-sand min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="p-2.5 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
                aria-label="Increase item count"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3.6. Catalog Interactive Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        
        {/* Stock status check logic */}
        {product.inStock ? (
          <button
            onClick={onAddToCart}
            disabled={added}
            className={`flex-1 py-4 px-6 rounded-full font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/90 text-earth-beige dark:text-earth-forest'
            }`}
          >
            {added ? (
              <>
                <Check size={18} /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={18} /> Add to Cart
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            className="flex-1 py-4 px-6 rounded-full bg-earth-olive/10 text-earth-olive/45 font-bold cursor-not-allowed border border-earth-olive/10 flex items-center justify-center gap-2"
          >
            Out of Stock
          </button>
        )}

        {/* Favorite Wishlist Icon Button */}
        <button
          onClick={onToggleWishlist}
          className={`p-4 border rounded-full transition-all flex items-center justify-center ${
            favorited
              ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
              : 'border-earth-olive/20 text-earth-olive hover:bg-earth-olive/5 dark:text-earth-sand'
          }`}
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} fill={favorited ? "currentColor" : "none"} />
        </button>

      </div>

    </div>
  );
}
