/**
 * @file PromoForm.jsx
 * @path src/components/features/cart/PromoForm.jsx
 * @description Promotional code input subform. Enables users to write coupon codes
 * (e.g. EARTH20) and shows active application tags or validation errors.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function PromoForm({
  appliedPromo,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  onRemovePromo,
  promoError
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="p-5 bg-white/40 dark:bg-earth-charcoal/30 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl">
      <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
        Apply Promo Code
      </span>
      
      {/* 3.1. Coupon state toggle */}
      {appliedPromo ? (
        // Coupon code successfully applied
        <div className="flex justify-between items-center mt-2 px-3 py-2 bg-green-600/10 text-green-700 dark:text-green-400 rounded-lg text-sm animate-fade-in">
          <span className="font-semibold">Code: {appliedPromo} Applied</span>
          <button onClick={onRemovePromo} className="text-xs underline font-bold uppercase hover:text-red-500">
            Remove
          </button>
        </div>
      ) : (
        // Closed/Unapplied state form
        <form onSubmit={onApplyPromo} className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="e.g. EARTH20"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand uppercase focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-earth-olive/10 text-earth-olive hover:bg-earth-olive hover:text-white dark:bg-earth-amber/15 dark:text-earth-amber dark:hover:bg-earth-amber dark:hover:text-earth-forest rounded-lg text-xs font-bold transition-all"
          >
            Apply
          </button>
        </form>
      )}

      {/* 3.2. Error notifications */}
      {promoError && (
        <p className="text-xs text-red-500 font-semibold mt-2 animate-pulse">
          {promoError}
        </p>
      )}

    </div>
  );
}
