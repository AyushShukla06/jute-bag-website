/**
 * @file Cart.jsx
 * @path src/pages/Cart.jsx
 * @description Shopping Cart page. Pulls active products from global CartContext,
 * computes price offsets, eco taxes, promo codes and outputs modular lists and summary components.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Leaf } from 'lucide-react';

// Global context hooks containing state parameters
import { useCart } from '../context/CartContext';

// Modular feature components extracted from this page
import CartItemCard from '../components/features/cart/CartItemCard';
import CartSummary from '../components/features/cart/CartSummary';
import PromoForm from '../components/features/cart/PromoForm';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Cart() {
  /* --- GLOBAL CART STATES & DISPATCHES --- */
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();

  /* --- LOCAL COUPON CODES STATES --- */
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // decimal fraction (e.g. 0.20)
  const [promoError, setPromoError] = useState('');

  /* ==========================================================================
     3. FINANCIAL CALCULATIONS
     ========================================================================== */
  const subtotal = getSubtotal();
  const discountAmount = subtotal * promoDiscount;
  const taxableSubtotal = subtotal - discountAmount;
  
  // 5% eco tax for offset audits
  const ecoTax = taxableSubtotal * 0.05;
  
  // Free shipping thresholds check (orders over ₹9,433.00)
  const shipping = subtotal > 9433.00 || subtotal === 0 ? 0 : 942.36;
  const total = taxableSubtotal + ecoTax + shipping;

  /* ==========================================================================
     4. HANDLERS & CALLBACKS
     ========================================================================== */
  
  /**
   * Evaluates custom promotional discount inputs.
   */
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EARTH20') {
      setPromoDiscount(0.2); // 20% discount
      setAppliedPromo('EARTH20');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "EARTH20".');
    }
  };

  /**
   * Resets active promo code states back to zero.
   */
  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setAppliedPromo('');
    setPromoCode('');
  };

  /* ==========================================================================
     5. CONDITIONAL RENDER: EMPTY STATE
     ========================================================================== */
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6 transition-colors duration-300">
        
        {/* Large shopping bag icon container */}
        <div className="inline-flex p-6 bg-earth-olive/10 dark:bg-earth-sand/5 text-earth-olive dark:text-earth-amber rounded-full">
          <ShoppingBag size={48} />
        </div>
        
        <h2 className="text-3xl font-bold text-earth-olive dark:text-earth-sand">
          Your cart is empty
        </h2>
        
        <p className="text-earth-olive/60 dark:text-earth-sand/65 max-w-sm mx-auto text-sm">
          Bring sustainability into your life by selecting from our premium organic jute bags.
        </p>
        
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/90 text-earth-beige dark:text-earth-forest rounded-full font-bold transition-all shadow-md"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  /* ==========================================================================
     6. MAIN RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      <h1 className="text-3xl font-bold text-earth-olive dark:text-earth-sand mb-8">
        Your Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 6.1. Left Column: List of items & eco impact banners */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Loop over catalog selections */}
          {cart.map((item) => (
            <CartItemCard
              key={`${item.id}-${item.color}-${item.size}`}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          {/* Sustainable metrics offset alert panel */}
          <div className="p-4 bg-earth-olive/10 dark:bg-earth-sand/5 border border-earth-olive/10 rounded-xl flex items-center gap-3 text-xs text-earth-olive dark:text-earth-sand">
            <Leaf size={18} className="text-green-600 flex-shrink-0" />
            <span>
              <strong>Sustainable packaging check: </strong> 
              This shipment prevents approximately <strong>{cart.reduce((sum, item) => sum + (item.impact.plasticSaved * item.quantity), 0)}</strong> plastic bags from ending up in landfills.
            </span>
          </div>

        </div>

        {/* 6.2. Right Column: Summary cost sheets & promo form controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Checkout cost breakdowns block */}
          <CartSummary
            subtotal={subtotal}
            appliedPromo={appliedPromo}
            discountAmount={discountAmount}
            ecoTax={ecoTax}
            shipping={shipping}
            total={total}
          />

          {/* Promo code application block */}
          <PromoForm
            appliedPromo={appliedPromo}
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
            promoError={promoError}
          />

        </div>

      </div>
    </div>
  );
}
