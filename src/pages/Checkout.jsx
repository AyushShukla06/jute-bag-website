import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getSubtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'India',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  const subtotal = getSubtotal();
  const tax = subtotal * 0.05;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!form.fullName) tempErrors.fullName = 'Full name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Valid email is required';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.city) tempErrors.city = 'City is required';
    if (!form.zip) tempErrors.zip = 'ZIP code is required';

    if (paymentMethod === 'card') {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length !== 16) {
        tempErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!form.cardExpiry || !/^\d{2}\/\d{2}$/.test(form.cardExpiry)) {
        tempErrors.cardExpiry = 'Expiry must be in MM/YY format';
      }
      if (!form.cardCvc || form.cardCvc.length !== 3) {
        tempErrors.cardCvc = 'CVC must be 3 digits';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      const generatedId = 'SLJ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      
      // Save order to Mock History in localStorage so it reflects in User Dashboard
      const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const newOrder = {
        orderId: generatedId,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        total: total,
        status: 'Processing',
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          price: item.price
        }))
      };
      localStorage.setItem('mockOrders', JSON.stringify([newOrder, ...existingOrders]));

      clearCart();

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  // Success Screen
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 transition-colors duration-300">
        <div className="inline-flex p-4 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 rounded-full">
          <CheckCircle2 size={56} />
        </div>
        
        <h1 className="text-3xl font-bold text-earth-olive dark:text-earth-sand">
          Purchase Successful!
        </h1>
        <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 max-w-md mx-auto">
          Thank you for choosing eco-luxury. Your order is confirmed, and we're preparing your hand-woven jute bags.
        </p>

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

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/dashboard"
            className="flex-1 py-3 px-6 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full text-sm"
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

  // Empty cart redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-earth-olive dark:text-earth-sand">Your bag is empty for checkout.</h2>
        <Link to="/shop" className="inline-block bg-earth-olive text-white px-6 py-2.5 rounded-full text-sm font-semibold">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Return link */}
      <Link
        to="/cart"
        className="flex items-center gap-2 text-sm text-earth-olive/70 hover:text-earth-crimson dark:text-earth-sand/70 dark:hover:text-earth-amber mb-8"
      >
        <ArrowLeft size={16} /> Return to Cart
      </Link>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Fields Form */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-6">
            
            <h2 className="font-display font-bold text-xl text-earth-olive dark:text-earth-sand">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                />
                {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                />
                {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                />
                {errors.address && <p className="text-xs text-red-500 font-semibold">{errors.address}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                />
                {errors.city && <p className="text-xs text-red-500 font-semibold">{errors.city}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                />
                {errors.zip && <p className="text-xs text-red-500 font-semibold">{errors.zip}</p>}
              </div>

            </div>

          </div>

          {/* Payment Method Selector */}
          <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-6">
            <h2 className="font-display font-bold text-xl text-earth-olive dark:text-earth-sand">
              Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
                    : 'border-earth-olive/25 text-earth-olive dark:text-earth-sand'
                }`}
              >
                <CreditCard size={20} />
                <span className="text-xs font-bold uppercase">Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-earth-crimson bg-earth-crimson/5 text-earth-crimson dark:border-earth-amber dark:bg-earth-amber/5 dark:text-earth-amber'
                    : 'border-earth-olive/25 text-earth-olive dark:text-earth-sand'
                }`}
              >
                <span className="text-sm font-extrabold italic">Paypal</span>
                <span className="text-xs font-bold uppercase">Paypal</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
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

            {/* Credit Card Fields Subform */}
            {paymentMethod === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-earth-olive/10">
                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    maxLength="19"
                    className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                  />
                  {errors.cardNumber && <p className="text-xs text-red-500 font-semibold">{errors.cardNumber}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={handleInputChange}
                    maxLength="5"
                    className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                  />
                  {errors.cardExpiry && <p className="text-xs text-red-500 font-semibold">{errors.cardExpiry}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-olive/60 dark:text-earth-sand/65">CVC</label>
                  <input
                    type="password"
                    name="cardCvc"
                    placeholder="•••"
                    value={form.cardCvc}
                    onChange={handleInputChange}
                    maxLength="3"
                    className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/20 dark:border-earth-sand/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber text-earth-olive dark:text-earth-sand"
                  />
                  {errors.cardCvc && <p className="text-xs text-red-500 font-semibold">{errors.cardCvc}</p>}
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 pt-4 border-t border-earth-olive/10 text-center">
                You will be redirected to PayPal secure sandbox to authorize payment upon clicking Place Order.
              </p>
            )}

            {paymentMethod === 'cod' && (
              <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 pt-4 border-t border-earth-olive/10 text-center">
                Cash on Delivery: Payment of <strong>${total.toFixed(2)}</strong> due in cash or UPI upon delivery at your address.
              </p>
            )}

          </div>

        </div>

        {/* Right: Summary Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 bg-white/60 dark:bg-earth-charcoal/40 border border-earth-olive/10 dark:border-earth-sand/10 rounded-xl space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-lg text-earth-olive dark:text-earth-sand">
              Review Bag Items
            </h3>

            {/* Cart Preview list */}
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

            <div className="border-t border-earth-olive/10 pt-3 flex justify-between items-center text-base font-bold text-earth-olive dark:text-earth-sand">
              <span>Total</span>
              <span className="text-lg text-earth-crimson dark:text-earth-amber">${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/95 text-earth-beige dark:text-earth-forest font-bold rounded-full shadow-md flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white dark:border-earth-forest border-t-transparent rounded-full animate-spin" />
              ) : (
                'Place Order'
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[10px] text-earth-olive/60 dark:text-earth-sand/65 text-center mt-2">
              <ShieldCheck size={14} className="text-green-600" /> Secure 256-bit SSL transaction verified.
            </p>

          </div>
        </div>

      </form>

    </div>
  );
}
