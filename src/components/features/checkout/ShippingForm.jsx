/**
 * @file ShippingForm.jsx
 * @path src/components/features/checkout/ShippingForm.jsx
 * @description Standardized input form fields collection for capturing customer
 * billing/shipping details during checkout.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function ShippingForm({
  form,
  onInputChange,
  errors
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-6">
      
      <h2 className="font-display font-bold text-xl text-earth-olive dark:text-earth-sand">
        Shipping Address
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name Input */}
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
          />
          {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>}
        </div>

        {/* Email Address Input */}
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
          />
          {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
        </div>

        {/* Street Address Input */}
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Street Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
          />
          {errors.address && <p className="text-xs text-red-500 font-semibold">{errors.address}</p>}
        </div>

        {/* City Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
          />
          {errors.city && <p className="text-xs text-red-500 font-semibold">{errors.city}</p>}
        </div>

        {/* ZIP Code Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">ZIP / Postal Code</label>
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={onInputChange}
            className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
          />
          {errors.zip && <p className="text-xs text-red-500 font-semibold">{errors.zip}</p>}
        </div>

      </div>

    </div>
  );
}
