/* eslint-disable react-refresh/only-export-components */
/**
 * @file WishlistContext.jsx
 * @path src/context/WishlistContext.jsx
 * @description Global wishlist states managers. Keeps lists of favorited products,
 * includes addition/removal toggles and status checks, and syncs databases with localStorage caches.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { createContext, useState, useEffect, useContext } from 'react';

/* ==========================================================================
   2. CONTEXT DECLARATION & PROVIDER
   ========================================================================== */
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  /* --- STATE INITIALIZATION --- */
  // Initial state check from localStorage databases
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state modifications into local cache
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  /* ==========================================================================
     3. STATE MUTATOR CALLBACKS (DISPATCHERS)
     ========================================================================== */
  
  /**
   * Toggles product in/out of the user's wishlist array list.
   */
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        // Remove product if already exists
        return prev.filter(item => item.id !== product.id);
      }
      // Otherwise append product
      return [...prev, product];
    });
  };

  /**
   * Checks if specific product IDs currently exist in wishlist.
   */
  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  /* ==========================================================================
     4. PROVIDER RENDER
     ========================================================================== */
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

/* ==========================================================================
   5. CUSTOM HOOK EXPORT
   ========================================================================== */
export const useWishlist = () => useContext(WishlistContext);
