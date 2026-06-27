/**
 * @file Checkout.jsx
 * @path src/pages/Checkout.jsx
 * @description Checkout billing and payment validation page. Handles field validators,
 * aggregates totals, dispatches transaction entries to mock databases in localStorage,
 * and launches dynamic canvas-confetti success overlays.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

// Global contexts hooks for cart clearing and state mapping
import { useCart } from '../context/CartContext';

// Modular features components extracted from this page
import ShippingForm from '../components/features/checkout/ShippingForm';
import PaymentSelector from '../components/features/checkout/PaymentSelector';
import CheckoutSummary from '../components/features/checkout/CheckoutSummary';
import SuccessScreen from '../components/features/checkout/SuccessScreen';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Checkout() {
  /* --- ROUTING & GLOBAL STATES --- */
  const { cart, getSubtotal, clearCart } = useCart();

  /* --- STATE MANAGEMENT --- */
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

  /* ==========================================================================
     3. FINANCIAL COMPUTATIONS
     ========================================================================== */
  const subtotal = getSubtotal();
  const tax = subtotal * 0.05; // 5% flat eco tax
  const shipping = subtotal > 9433.00 ? 0 : 942.36; // Free shipping over ₹9,433.00
  const total = subtotal + tax + shipping;

  /* ==========================================================================
     4. HANDLERS & VALIDATIONS
     ========================================================================== */
  
  /**
   * Tracks customer input updates on text/number inputs.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Asserts validity of customer shipping inputs and card credentials structure.
   */
  const validate = () => {
    const tempErrors = {};
    if (!form.fullName) tempErrors.fullName = 'Full name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Valid email is required';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.city) tempErrors.city = 'City is required';
    if (!form.zip) tempErrors.zip = 'ZIP code is required';

    // Credit card patterns check when active
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

  /**
   * Processes the transaction, writes records to mock db, and triggers celebration confetti.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    
    // Simulate payment processor endpoint latency
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      
      const generatedId = 'SLJ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      
      // Save order to Mock History database in localStorage
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

      // Launch Confetti animation
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  /* ==========================================================================
     5. CONDITIONAL RENDER: SUCCESS SCREEN
     ========================================================================== */
  if (isSuccess) {
    return <SuccessScreen orderId={orderId} total={total} />;
  }

  /* ==========================================================================
     6. CONDITIONAL RENDER: EMPTY STATE
     ========================================================================== */
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

  /* ==========================================================================
     7. MAIN RENDER LOGIC
     ========================================================================== */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* 7.1. Return back to Shopping Cart link */}
      <Link
        to="/cart"
        className="flex items-center gap-2 text-sm text-earth-olive/70 hover:text-earth-crimson dark:text-earth-sand/70 dark:hover:text-earth-amber mb-8"
      >
        <ArrowLeft size={16} /> Return to Cart
      </Link>

      {/* 7.2. Checkout layout block */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form details inputs */}
        <div className="lg:col-span-8 space-y-6">
          
          <ShippingForm
            form={form}
            onInputChange={handleInputChange}
            errors={errors}
          />

          <PaymentSelector
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            form={form}
            onInputChange={handleInputChange}
            errors={errors}
            total={total}
          />

        </div>

        {/* Right Column: Order totals review summary card */}
        <div className="lg:col-span-4 space-y-4">
          <CheckoutSummary
            cart={cart}
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
            loading={loading}
          />
        </div>

      </form>

    </div>
  );
}
