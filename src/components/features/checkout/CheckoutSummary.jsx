/**
 * @file CheckoutSummary.jsx
 * @path src/components/features/checkout/CheckoutSummary.jsx
 * @description Costs totals breakdown column, including items in-cart visual summaries,
 * taxes audits, and grand total. Contains the submit trigger button.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { ShieldCheck } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function CheckoutSummary({
  cart,
  subtotal,
  tax,
  shipping,
  total,
  loading
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-4 shadow-sm">
      
      <h3 className="font-display font-bold text-lg text-earth-olive dark:text-earth-sand">
        Review Bag Items
      </h3>

      {/* 3.1. List of items in current checkout session */}
      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between items-center text-xs">
            <span className="truncate max-w-[200px] text-earth-olive dark:text-earth-sand">
              {item.name} <span className="text-[10px] text-gray-500">x{item.quantity}</span>
            </span>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* 3.2. Cost Summary calculations */}
      <div className="border-t border-earth-olive/10 pt-4 text-sm text-earth-olive/80 dark:text-earth-sand/80 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Eco Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="border-t border-earth-olive/10 pt-3 flex justify-between items-center text-base font-bold text-earth-olive dark:text-earth-sand">
        <span>Total</span>
        <span className="text-lg text-earth-crimson dark:text-earth-amber">${total.toFixed(2)}</span>
      </div>

      {/* 3.3. Submit Trigger Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full shadow-md flex items-center justify-center gap-2 mt-4 transition-all"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white dark:border-earth-forest border-t-transparent rounded-full animate-spin" />
        ) : (
          'Place Order'
        )}
      </button>

      {/* SSL security check labels */}
      <p className="flex items-center justify-center gap-1.5 text-[10px] text-earth-olive/60 dark:text-earth-sand/65 text-center mt-2">
        <ShieldCheck size={14} className="text-green-600" /> Secure 256-bit SSL transaction verified.
      </p>

    </div>
  );
}
