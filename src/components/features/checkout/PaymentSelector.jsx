/**
 * @file PaymentSelector.jsx
 * @path src/components/features/checkout/PaymentSelector.jsx
 * @description Payment method toggle options supporting credit card validation forms,
 * PayPal sandbox descriptions, or Cash on Delivery UPI warnings.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React from 'react';
import { CreditCard } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function PaymentSelector({
  paymentMethod,
  onPaymentMethodChange,
  form,
  onInputChange,
  errors,
  total
}) {
  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-6">
      
      <h2 className="font-display font-bold text-xl text-earth-olive dark:text-earth-sand">
        Payment Method
      </h2>

      {/* 3.1. Selection Grid */}
      <div className="grid grid-cols-3 gap-4">
        
        {/* Credit Card option */}
        <button
          type="button"
          onClick={() => onPaymentMethodChange('card')}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
            paymentMethod === 'card'
              ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
              : 'border-earth-olive/25 text-earth-olive dark:text-earth-sand'
          }`}
        >
          <CreditCard size={20} />
          <span className="text-xs font-bold uppercase">Card</span>
        </button>
        
        {/* PayPal option */}
        <button
          type="button"
          onClick={() => onPaymentMethodChange('paypal')}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
            paymentMethod === 'paypal'
              ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
              : 'border-earth-olive/25 text-earth-olive dark:text-earth-sand'
          }`}
        >
          <span className="text-sm font-extrabold italic">PayPal</span>
          <span className="text-xs font-bold uppercase">PayPal</span>
        </button>

        {/* Cash on Delivery option */}
        <button
          type="button"
          onClick={() => onPaymentMethodChange('cod')}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
            paymentMethod === 'cod'
              ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
              : 'border-earth-olive/25 text-earth-olive dark:text-earth-sand'
          }`}
        >
          <span className="text-sm font-extrabold uppercase">COD</span>
          <span className="text-xs font-bold uppercase">Delivery</span>
        </button>

      </div>

      {/* 3.2. Conditional Form/Descriptions blocks */}
      
      {/* Credit Card Input Form Fields */}
      {paymentMethod === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-earth-olive/10 animate-fade-in">
          
          {/* Card Number Input */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="xxxx xxxx xxxx xxxx"
              value={form.cardNumber}
              onChange={onInputChange}
              maxLength="19"
              className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
            />
            {errors.cardNumber && <p className="text-xs text-red-500 font-semibold">{errors.cardNumber}</p>}
          </div>

          {/* Expiration Date Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Expiry Date</label>
            <input
              type="text"
              name="cardExpiry"
              placeholder="MM/YY"
              value={form.cardExpiry}
              onChange={onInputChange}
              maxLength="5"
              className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
            />
            {errors.cardExpiry && <p className="text-xs text-red-500 font-semibold">{errors.cardExpiry}</p>}
          </div>

          {/* Card Security Code Input (CVC) */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">CVC</label>
            <input
              type="password"
              name="cardCvc"
              placeholder="•••"
              value={form.cardCvc}
              onChange={onInputChange}
              maxLength="3"
              className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
            />
            {errors.cardCvc && <p className="text-xs text-red-500 font-semibold">{errors.cardCvc}</p>}
          </div>

        </div>
      )}

      {/* PayPal visual helper description */}
      {paymentMethod === 'paypal' && (
        <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 pt-4 border-t border-earth-olive/10 text-center animate-fade-in">
          You will be redirected to PayPal secure sandbox to authorize payment upon clicking Place Order.
        </p>
      )}

      {/* Cash on Delivery visual helper description */}
      {paymentMethod === 'cod' && (
        <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 pt-4 border-t border-earth-olive/10 text-center animate-fade-in">
          Cash on Delivery: Payment of <strong>${total.toFixed(2)}</strong> due in cash or UPI upon delivery at your address.
        </p>
      )}

    </div>
  );
}
