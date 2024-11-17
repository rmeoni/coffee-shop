import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [banner, setBanner] = useState({ message: null, type: null });

  useEffect(() => {
    // Get the timestamp of when the "This site is a demo" banner was last shown
    const lastShown = localStorage.getItem('bannerLastShown');
    const bannerClosed = localStorage.getItem('bannerClosed');
    const now = new Date().getTime();

    // Check if 24 hours have passed and the banner hasn't been closed
    if ((!lastShown || now - lastShown > 24 * 60 * 60 * 1000) && !bannerClosed) {
      setBanner({ message: t('banner.default_message'), type: 'info' });
      // Store the current timestamp in localStorage to track when the banner was last shown
      localStorage.setItem('bannerLastShown', now.toString());
    }

    // Handle cart persistence in localStorage
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems, t]);

  const updateCart = (id, newQuantity, price, title) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some((item) => item.id === id);

      let updatedItems;
      if (newQuantity === 0) {
        updatedItems = prevItems.filter((item) => item.id !== id);
        setBanner({ message: t('banner.item_removed'), type: 'error' });
      } else {
        if (itemExists) {
          updatedItems = prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
          setBanner({ message: t('banner.item_updated'), type: 'success' });
        } else {
          updatedItems = [
            ...prevItems,
            { id, quantity: newQuantity, price, title },
          ];
          setBanner({ message: t('banner.item_added'), type: 'success' });
        }
      }

      return updatedItems;
    });
  };

  const clearBannerMessage = () => {
    setBanner({ message: null, type: null });
    // Mark the banner as closed in localStorage
    localStorage.setItem('bannerClosed', 'true');
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart, banner, clearBannerMessage }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
