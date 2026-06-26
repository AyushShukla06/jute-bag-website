/**
 * @file Navbar.jsx
 * @path src/components/layout/Navbar.jsx
 * @description Global sticky navigation header component with dark/light mode toggle,
 * responsive mobile sidebar drawer, and dynamic cart/wishlist count badges.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Heart, ShoppingBag, Menu, X, Leaf, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Global contexts for theme and user shopping states
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

/* ==========================================================================
   2. MAIN COMPONENT DEFINITION
   ========================================================================== */
export default function Navbar() {
  /* --- HOOKS & CONTEXT STATE --- */
  const { theme, toggleTheme } = useTheme();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  
  // Local state to control mobile navigation slider drawer
  const [isOpen, setIsOpen] = useState(false);

  /* --- COUNTERS --- */
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  /* --- HELPER CLASSES & CONFIG --- */
  // Active page styling mapper for React Router NavLinks
  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
      isActive
        ? 'text-earth-crimson dark:text-earth-amber font-semibold border-b-2 border-earth-crimson dark:border-earth-amber'
        : 'text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber'
    }`;

  // Nav item list for clean iteration
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ];

  /* ==========================================================================
     3. RENDER LOGIC
     ========================================================================== */
  return (
    <header className="sticky top-0 z-40 bg-earth-cream/80 dark:bg-earth-forest/80 backdrop-blur-md border-b border-earth-olive/10 dark:border-earth-sand/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-earth-olive text-earth-beige p-2 rounded-full dark:bg-earth-amber dark:text-earth-forest transition-colors duration-300">
              <Leaf size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tighter text-earth-olive dark:text-earth-sand">
              SOULA<span className="text-earth-crimson dark:text-earth-amber font-light">JUTE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* User & Shop Actions Panel (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Dark/Light Mode Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber rounded-full hover:bg-earth-olive/5 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist Link with dynamic badge */}
            <Link
              to="/dashboard?tab=wishlist"
              className="p-2 text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber rounded-full hover:bg-earth-olive/5 dark:hover:bg-white/5 relative transition-all duration-200"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-earth-crimson text-white dark:bg-earth-amber dark:text-earth-forest text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart Link with dynamic items counter badge */}
            <Link
              to="/cart"
              className="p-2 text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber rounded-full hover:bg-earth-olive/5 dark:hover:bg-white/5 relative transition-all duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-earth-olive text-earth-cream dark:bg-earth-crimson dark:text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Profile Link to User Dashboard */}
            <Link
              to="/dashboard"
              className="p-2 text-earth-olive hover:text-earth-crimson dark:text-earth-sand dark:hover:text-earth-amber rounded-full hover:bg-earth-olive/5 dark:hover:bg-white/5 transition-all duration-200"
              aria-label="User Dashboard"
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button & Action Badges */}
          <div className="flex items-center gap-2 md:hidden">
            
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-earth-olive dark:text-earth-sand"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Shopping Cart Link & Counter (Mobile) */}
            <Link to="/cart" className="p-2 text-earth-olive dark:text-earth-sand relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-earth-olive text-white dark:bg-earth-crimson text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Mobile Menu Drawer Trigger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-earth-olive dark:text-earth-sand hover:bg-earth-olive/5 dark:hover:bg-white/5 rounded-md"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Slideout Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-earth-olive/10 dark:border-earth-sand/10 bg-earth-cream dark:bg-earth-forest transition-colors duration-300"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-all ${
                      isActive
                        ? 'bg-earth-olive/10 text-earth-crimson dark:text-earth-amber font-semibold'
                        : 'text-earth-olive hover:bg-earth-olive/5 dark:text-earth-sand dark:hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Bottom quick links (Mobile Wishlist & Profile Dashboard) */}
              <div className="border-t border-earth-olive/10 dark:border-earth-sand/10 my-3 pt-3 flex justify-around">
                <Link
                  to="/dashboard?tab=wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm text-earth-olive dark:text-earth-sand"
                >
                  <Heart size={18} />
                  Wishlist ({wishlistCount})
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm text-earth-olive dark:text-earth-sand"
                >
                  <User size={18} />
                  Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
