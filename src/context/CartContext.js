import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Cart Provider component to wrap the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [banner, setBanner] = useState({ message: null, type: 'info' });

  // Sync cart items to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  // Function to update the cart (add, update quantity, or remove items)
  const updateCart = (id, newQuantity, productTitle = null) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.some(item => item.id === id);

      if (newQuantity === 0) {
        if (itemExists) {
          setBanner({
            message: `${productTitle || 'Item'} was removed from your cart.`,
            type: 'info',
          });
        }
        return prevItems.filter(item => item.id !== id);
      } else {
        const updatedItems = itemExists
          ? prevItems.map(item =>
              item.id === id ? { ...item, quantity: newQuantity } : item
            )
          : [...prevItems, { id, quantity: newQuantity }];

        setBanner({
          message: `${productTitle || 'Item'} has been added to your cart.`,
          type: 'success',
        });

        return updatedItems;
      }
    });
  };

  const clearBannerMessage = () => setBanner({ message: null, type: 'info' });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        updateCart,
        banner,
        clearBannerMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
