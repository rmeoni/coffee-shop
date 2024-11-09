import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Cart Provider component to wrap the app
export const CartProvider = ({ children }) => {
  // Initialize cartItems state with data from localStorage or an empty array if none exists
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Initialize isCartVisible state from localStorage
  const [isCartVisible, setIsCartVisible] = useState(() => {
    const storedIsCartVisible = localStorage.getItem('isCartVisible');
    return storedIsCartVisible ? JSON.parse(storedIsCartVisible) : false;
  });

  // Sync cart items to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  // Sync isCartVisible to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isCartVisible', JSON.stringify(isCartVisible));
  }, [isCartVisible]);

  // Function to toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible(prev => {
      const newVisibility = !prev;
      localStorage.setItem('isCartVisible', JSON.stringify(newVisibility)); // Sync with localStorage immediately
      return newVisibility;
    });
  };

  // Function to update the cart (add, update quantity, or remove items)
  const updateCart = (id, newQuantity) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.some(item => item.id === id);

      // Set cart visibility to true if an item is added
      if (newQuantity > 0 && !itemExists) {
        setIsCartVisible(true);
      }

      if (newQuantity === 0) {
        return prevItems.filter(item => item.id !== id);
      } else {
        return itemExists
          ? prevItems.map(item =>
              item.id === id ? { ...item, quantity: newQuantity } : item
            )
          : [...prevItems, { id, quantity: newQuantity }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, updateCart, isCartVisible, setIsCartVisible, toggleCartVisibility }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
