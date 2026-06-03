import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (id, color, size) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.color === color && item.size === size)
    ));
  };

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

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

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

export const useCart = () => useContext(CartContext);
