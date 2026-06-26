/**
 * @file Footer.jsx
 * @path src/components/layout/Footer.jsx
 * @description Global footer containing value proposition banners, navigation links,
 * legal information, and newsletter subscription form.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Send, Sparkles, Shield, RefreshCw } from 'lucide-react';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Footer() {
  /* --- STATE MANAGEMENT --- */
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  /* --- EVENT HANDLERS --- */
  /**
   * Validates email string and simulates user newsletter registration.
   */
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <footer className="bg-earth-cream border-t border-earth-olive/15 dark:bg-earth-forest dark:border-earth-sand/15 transition-colors duration-300">
      
      {/* 3.1. Features & Value Propositions Banners */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 border-b border-earth-olive/10 dark:border-earth-sand/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Quality pillar */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-earth-olive/10 dark:bg-earth-sand/10 p-3 rounded-full text-earth-olive dark:text-earth-amber">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-display font-semibold text-lg text-earth-olive dark:text-earth-sand">Premium Quality</h4>
              <p className="text-sm text-earth-olive/70 dark:text-earth-sand/70">Woven with elite high-density golden jute fibers.</p>
            </div>
          </div>

          {/* Sustainability pillar */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-earth-olive/10 dark:bg-earth-sand/10 p-3 rounded-full text-earth-olive dark:text-earth-amber">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-display font-semibold text-lg text-earth-olive dark:text-earth-sand">100% Sustainable</h4>
              <p className="text-sm text-earth-olive/70 dark:text-earth-sand/70">Naturally grown, carbon-neutral and biodegradable.</p>
            </div>
          </div>

          {/* Artisan support pillar */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-earth-olive/10 dark:bg-earth-sand/10 p-3 rounded-full text-earth-olive dark:text-earth-amber">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-display font-semibold text-lg text-earth-olive dark:text-earth-sand">Artisanal Support</h4>
              <p className="text-sm text-earth-olive/70 dark:text-earth-sand/70">Empowering and funding traditional weavers in India.</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3.2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Bio Section */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-earth-olive text-earth-beige p-2 rounded-full dark:bg-earth-amber dark:text-earth-forest transition-colors duration-300">
                <Leaf size={16} />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tighter text-earth-olive dark:text-earth-sand">
                SOULA<span className="text-earth-crimson dark:text-earth-amber font-light">JUTE</span>
              </span>
            </Link>
            <p className="text-sm text-earth-olive/80 dark:text-earth-sand/80 leading-relaxed">
              Redefining luxury bags with the world's strongest natural fiber. Creating hand-woven alternatives that nurture both community and earth.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            
            {/* Category Collection Links */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
                Shop Collection
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/shop?category=Tote Bags" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Totes</Link>
                </li>
                <li>
                  <Link to="/shop?category=Luxury Handbags" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Handbags</Link>
                </li>
                <li>
                  <Link to="/shop?category=Travel Bags" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Duffels & Travel</Link>
                </li>
                <li>
                  <Link to="/shop?category=Clutch & Pouches" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Pouches & Clutches</Link>
                </li>
              </ul>
            </div>

            {/* Corporate Info & FAQs */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Our Story</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Contact Us</Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">FAQs</Link>
                </li>
                <li>
                  <a href="https://pakka.com" target="_blank" rel="noopener noreferrer" className="text-sm text-earth-olive/85 hover:text-earth-crimson dark:text-earth-sand/85 dark:hover:text-earth-amber">Pakka.com Reference</a>
                </li>
              </ul>
            </div>

          </div>

          {/* Newsletter Form Panel */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-earth-crimson dark:text-earth-amber mb-4">
              Join the Green Circle
            </h3>
            <p className="text-xs text-earth-olive/70 dark:text-earth-sand/70 mb-4">
              Subscribe to unlock early access, seasonal launches, and eco-impact statistics.
            </p>
            {subscribed ? (
              <div className="bg-earth-olive/15 dark:bg-earth-olive/30 p-4 rounded border border-earth-olive/20 text-center">
                <span className="text-sm font-semibold text-earth-olive dark:text-earth-amber">
                  Thank you for subscribing! 🌱
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-earth-charcoal border border-earth-olive/30 dark:border-earth-sand/30 rounded-l px-3 py-2.5 text-sm text-earth-olive dark:text-earth-sand focus:outline-none focus:border-earth-crimson dark:focus:border-earth-amber"
                  />
                  <button
                    type="submit"
                    className="bg-earth-olive hover:bg-earth-darkolive dark:bg-earth-amber dark:hover:bg-earth-amber/80 text-earth-beige dark:text-earth-forest px-4 rounded-r transition-colors flex items-center justify-center"
                    aria-label="Subscribe Button"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
              </form>
            )}
          </div>

        </div>

        {/* 3.3. Legal Bar & Copyright */}
        <div className="mt-16 pt-8 border-t border-earth-olive/10 dark:border-earth-sand/10 flex flex-col sm:flex-row justify-between items-center text-xs text-earth-olive/60 dark:text-earth-sand/65">
          <p>© {new Date().getFullYear()} SOULAJUTE. Crafted for absolute premium sustainability.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
