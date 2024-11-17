import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [banner, setBanner] = useState({ message: t('banner.default_message'), type: 'info' });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

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
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart, banner, clearBannerMessage }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
