import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Leaf, Tag } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // decimal discount
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const discountAmount = subtotal * promoDiscount;
  const taxableSubtotal = subtotal - discountAmount;
  const ecoTax = taxableSubtotal * 0.05; // 5% eco tax
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = taxableSubtotal + ecoTax + shipping;

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

  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setAppliedPromo('');
    setPromoCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6 transition-colors duration-300">
        <div className="inline-flex p-6 bg-earth-olive/10 dark:bg-earth-sand/5 text-earth-olive dark:text-earth-amber rounded-full">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-earth-olive dark:text-earth-sand">Your cart is empty</h2>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-earth-olive dark:text-earth-sand mb-8">
        Your Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.id}-${item.color}-${item.size}`}
              className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl gap-4"
            >
              
              {/* Product Info Section */}
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
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Action and pricing panel */}
              <div className="flex justify-between items-center w-full sm:w-auto sm:gap-8">
                
                {/* Quantity Editor */}
                <div className="flex items-center border border-earth-olive/20 rounded-lg overflow-hidden bg-white/40 dark:bg-earth-charcoal/40">
                  <button
                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                    className="p-2 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 text-xs font-semibold text-earth-olive dark:text-earth-sand text-center min-w-[24px]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                    className="p-2 hover:bg-earth-olive/5 dark:hover:bg-white/5 text-earth-olive dark:text-earth-sand"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Subtotal Price display */}
                <span className="hidden sm:inline font-display font-semibold text-base text-earth-olive dark:text-earth-sand min-w-[70px] text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id, item.color, item.size)}
                  className="p-2 text-earth-olive/60 hover:text-red-600 dark:text-earth-sand/60 dark:hover:text-red-400"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          ))}

          {/* Eco Banner */}
          <div className="p-4 bg-earth-olive/10 dark:bg-earth-sand/5 border border-earth-olive/10 rounded-xl flex items-center gap-3 text-xs text-earth-olive dark:text-earth-sand">
            <Leaf size={18} className="text-green-600 flex-shrink-0" />
            <span>
              <strong>Sustainable packaging check:</strong> This shipment prevents approximately <strong>{cart.reduce((s,i) => s + (i.impact.plasticSaved * i.quantity), 0)}</strong> plastic bags from ending up in landfill over their lifespan.
            </span>
          </div>

        </div>

        {/* Right: Summary panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-lg text-earth-olive dark:text-earth-sand">
              Order Summary
            </h3>
            
            <div className="space-y-2 text-sm text-earth-olive/80 dark:text-earth-sand/80 border-b border-earth-olive/10 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-earth-olive dark:text-earth-sand">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span className="flex items-center gap-1"><Tag size={12} /> Promo (-20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Eco Tax (5%)</span>
                <span>${ecoTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-bold uppercase text-xs">Free</span> : `$${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-bold text-earth-olive dark:text-earth-sand pt-2">
              <span>Total</span>
              <span className="text-xl text-earth-crimson dark:text-earth-amber">${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full mt-4 py-4 px-6 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/90 text-earth-beige dark:text-earth-forest rounded-full font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>

          {/* Promo code form */}
          <div className="p-5 bg-white/40 dark:bg-earth-charcoal/30 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/60">
              Apply Promo Code
            </span>
            {appliedPromo ? (
              <div className="flex justify-between items-center mt-2 px-3 py-2 bg-green-600/10 text-green-700 dark:text-green-400 rounded-lg text-sm">
                <span className="font-semibold">Code: {appliedPromo} Applied</span>
                <button onClick={handleRemovePromo} className="text-xs underline font-bold uppercase">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="e.g. EARTH20"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg text-sm text-earth-olive dark:text-earth-sand uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-earth-olive/10 text-earth-olive hover:bg-earth-olive hover:text-white dark:bg-earth-amber/15 dark:text-earth-amber dark:hover:bg-earth-amber dark:hover:text-earth-forest rounded-lg text-xs font-bold transition-all"
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && <p className="text-xs text-red-500 font-semibold mt-2">{promoError}</p>}
          </div>

        </div>

      </div>
    </div>
  );
}
