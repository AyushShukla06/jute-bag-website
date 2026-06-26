/**
 * @file SuccessScreen.jsx
 * @path src/components/features/checkout/SuccessScreen.jsx
 * @description Confetti confirmation details screen shown upon successful transaction submission.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Truck } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function SuccessScreen({
  orderId,
  total
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 transition-colors duration-300">
      
      {/* 3.1. Success check bubble */}
      <div className="inline-flex p-4 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 rounded-full">
        <CheckCircle2 size={56} />
      </div>
      
      <h1 className="text-3xl font-bold text-earth-olive dark:text-earth-sand">
        Purchase Successful!
      </h1>
      
      <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 max-w-md mx-auto">
        Thank you for choosing eco-luxury. Your order is confirmed, and we're preparing your hand-woven jute bags.
      </p>

      {/* 3.2. Order metadata card */}
      <div className="bg-white/60 dark:bg-earth-charcoal/40 p-6 rounded-xl border border-earth-olive/10 dark:border-earth-sand/10 text-left space-y-4">
        
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">
          <span>Order ID</span>
          <span>Est. Delivery</span>
        </div>
        
        <div className="flex justify-between font-bold text-earth-olive dark:text-earth-sand">
          <span>{orderId}</span>
          <span className="flex items-center gap-1"><Truck size={14} /> 4-6 Business Days</span>
        </div>
        
        <div className="border-t border-earth-olive/10 pt-3 flex justify-between text-sm">
          <span>Amount Charged</span>
          <span className="font-bold text-earth-crimson dark:text-earth-amber">${total.toFixed(2)}</span>
        </div>

      </div>

      {/* 3.3. Navigation quick action links */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          to="/dashboard"
          className="flex-1 py-3 px-6 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full text-sm shadow-md"
        >
          Track in Dashboard
        </Link>
        <Link
          to="/shop"
          className="flex-1 py-3 px-6 border border-earth-olive/30 text-earth-olive dark:text-earth-sand hover:bg-earth-olive/5 font-semibold rounded-full text-sm"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  );
}
