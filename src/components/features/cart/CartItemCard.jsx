/**
 * @file CartItemCard.jsx
 * @path src/components/features/cart/CartItemCard.jsx
 * @description Single row element displaying cart product details,
 * image thumbnails, configurations (color, size), and incrementing buttons.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl gap-4">
      
      {/* 3.1. Image Thumbnail & Text descriptions */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover bg-earth-sand/20 border border-earth-olive/10"
        />
        <div>
          <h3 className="font-display font-bold text-base text-earth-olive dark:text-earth-sand leading-tight">
            {item.name}
          </h3>
          <p className="text-xs text-earth-olive/65 dark:text-earth-sand/65 mt-1">
            Color: {item.color} | Size: {item.size}
          </p>
          <p className="text-sm font-semibold text-earth-crimson dark:text-earth-amber mt-1 sm:hidden">
            ₹{item.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* 3.2. Actions Panel (Quantity, subtotal and delete) */}
      <div className="flex justify-between items-center w-full sm:w-auto sm:gap-8">
        
        {/* Incrementor container */}
        <div className="flex items-center border border-earth-olive/20 rounded-lg overflow-hidden bg-white/40 dark:bg-earth-charcoal/40">
          <button
            onClick={() => onUpdateQuantity(item.id, item.color, item.size, item.quantity - 1)}
            className="p-2 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
            aria-label="Decrease quantity"
          >
            <Minus size={12} />
          </button>
          
          <span className="px-3 text-xs font-semibold text-earth-olive dark:text-earth-sand text-center min-w-[24px]">
            {item.quantity}
          </span>
          
          <button
            onClick={() => onUpdateQuantity(item.id, item.color, item.size, item.quantity + 1)}
            className="p-2 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
            aria-label="Increase quantity"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Pricing calculations */}
        <span className="hidden sm:inline font-display font-semibold text-base text-earth-olive dark:text-earth-sand min-w-[70px] text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>

        {/* Delete Row Button */}
        <button
          onClick={() => onRemove(item.id, item.color, item.size)}
          className="p-2 text-earth-olive/60 hover:text-red-600 dark:text-earth-sand/60 dark:hover:text-red-400"
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}
