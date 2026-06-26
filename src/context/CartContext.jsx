/* eslint-disable react-refresh/only-export-components */
/**
 * @file CartContext.jsx
 * @path src/context/CartContext.jsx
 * @description Global shopping cart state manager. Exports providers, hooks,
 * and dispatchers for items addition, quantity updates, cost subtotals audit,
 * and localStorage cache synchronization.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { createContext, useState, useEffect, useContext } from 'react';

/* ==========================================================================
   2. CONTEXT DECLARATION & PROVIDER
   ========================================================================== */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* --- STATE INITIALIZATION --- */
  // Initial state lazy load checked from localStorage database
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state modifications into local cache
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /* ==========================================================================
     3. STATE MUTATOR CALLBACKS (DISPATCHERS)
     ========================================================================== */
  
  /**
   * Adds a product to the cart. If product + color + size matches an existing
   * item, increments its quantity. Otherwise, appends the new product line.
   */
  const addToCart = (product, quantity = 1, selectedColor = 'Natural', selectedSize = 'Standard') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.color === selectedColor && 
        item.size === selectedSize
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      }

      return [...prev, { ...product, quantity, color: selectedColor, size: selectedSize }];
    });
  };

  /**
   * Deletes a specific product row matching ID, color, and size.
   */
  const removeFromCart = (id, color, size) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.color === color && item.size === size)
    ));
  };

  /**
   * Updates count quantity parameter for a specific product row.
   * If value drops to 0, automatically deletes the line item.
   */
  const updateQuantity = (id, color, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, color, size);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.id === id && item.color === color && item.size === size)
        ? { ...item, quantity }
        : item
    ));
  };

  /**
   * Clears all items in current cart session.
   */
  const clearCart = () => {
    setCart([]);
  };

  /* ==========================================================================
     4. AUDITING CALCULATORS (SELECTORS)
     ========================================================================== */
  
  /**
   * Multiplies quantity by base price and sums total.
   */
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Sums quantities of all line items.
   */
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  /* ==========================================================================
     5. PROVIDER RENDER
     ========================================================================== */
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getSubtotal, 
      getCartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

/* ==========================================================================
   6. CUSTOM HOOK EXPORT
   ========================================================================== */
export const useCart = () => useContext(CartContext);
