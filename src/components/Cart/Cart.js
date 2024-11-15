import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Cart.css';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cartItems, updateCart, isCartVisible, toggleCartVisibility } = useCart();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); // Import the t function

  // State to manage the display of the "under development" message
  const [orderMessage, setOrderMessage] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Function to handle the Complete Order button click
  const handleCompleteOrder = () => {
    setOrderMessage(t('cart.order_under_development')); // Set the message from the translation
  };

  // Disable scroll when cart is open on mobile
  useEffect(() => {
    const handleScrollLock = () => {
      if (isCartVisible && window.innerWidth <= 820) {
        document.body.style.overflow = 'hidden'; // Disable body scroll
      } else {
        document.body.style.overflow = 'auto'; // Re-enable body scroll when cart is closed
      }
    };

    handleScrollLock(); // Run the scroll lock logic on mount

    // Add resize listener to handle screen width change
    window.addEventListener('resize', handleScrollLock);

    // Clean up the event listener on component unmount or visibility change
    return () => {
      window.removeEventListener('resize', handleScrollLock);
      document.body.style.overflow = 'auto'; // Ensure scroll is re-enabled if cart is closed
    };
  }, [isCartVisible]); // Only re-run when isCartVisible changes

  // Only render the cart if it is visible and not empty
  if (!isCartVisible || cartItems.length === 0) {
    return null;
  }

  return (
    <div className={`cart ${isDarkMode ? 'dark' : ''}`}>
      <div className="cart-wrapper">
        {orderMessage && (
          <div className="order-message">
            <p>{orderMessage}</p>
          </div>
        )}
        <h2>{t('cart.title')}</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-product">
                <p className="cart-item-header">{t('cart.item')}</p>
                <p>{item.title}</p>
              </div>
              <div className="cart-item-quantity-selector">
                <p className="cart-item-header">{t('cart.qty')}</p>
                <button onClick={() => updateCart(item.id, Math.max(item.quantity - 1, 0))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
              </div>
              <div>
                <p className="cart-item-header">{t('cart.price')}</p>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div>
                <p className="cart-item-header">{t('cart.amount')}</p>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-checkout">
        <h3>{t('cart.total')}: ${total.toFixed(2)}</h3>
        <button onClick={toggleCartVisibility} className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`} style={{ marginBottom: '12px' }} id="cart-secondary-button">
          {t('cart.close_cart')}
        </button>
        <button onClick={handleCompleteOrder} className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}>
          {t('cart.complete_order')}
        </button>
      </div>
    </div>
  );
};

export default Cart;
