/**
 * @file CartSummary.jsx
 * @path src/components/features/cart/CartSummary.jsx
 * @description Cost breakdown panel displaying subtotal, discount, eco tax,
 * and shipping details. Connects directly to the checkout flow.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function CartSummary({
  subtotal,
  appliedPromo,
  discountAmount,
  ecoTax,
  shipping,
  total
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-4 shadow-sm">
      <h3 className="font-display font-bold text-lg text-earth-olive dark:text-earth-sand">
        Order Summary
      </h3>
      
      {/* 3.1. Pricing Itemizations */}
      <div className="space-y-2 text-sm text-earth-olive/80 dark:text-earth-sand/80 border-b border-earth-olive/10 pb-4">
        
        {/* Raw Subtotal */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-earth-olive dark:text-earth-sand">${subtotal.toFixed(2)}</span>
        </div>
        
        {/* Coupon Discount Deductions */}
        {appliedPromo && (
          <div className="flex justify-between text-green-600 font-semibold animate-fade-in">
            <span className="flex items-center gap-1"><Tag size={12} /> Promo (-20%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        {/* Eco Tax calculations */}
        <div className="flex justify-between">
          <span>Eco Tax (5%)</span>
          <span>${ecoTax.toFixed(2)}</span>
        </div>
        
        {/* Shipping check logic */}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-bold uppercase text-xs">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

      </div>

      {/* 3.2. Grand Total */}
      <div className="flex justify-between items-center text-lg font-bold text-earth-olive dark:text-earth-sand pt-2">
        <span>Total</span>
        <span className="text-xl text-earth-crimson dark:text-earth-amber">${total.toFixed(2)}</span>
      </div>

      {/* 3.3. Call-To-Action Link to Checkout */}
      <Link
        to="/checkout"
        className="w-full mt-4 py-4 px-6 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/90 text-earth-beige dark:text-earth-forest rounded-full font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
      >
        Proceed to Checkout <ArrowRight size={18} />
      </Link>

    </div>
  );
}
