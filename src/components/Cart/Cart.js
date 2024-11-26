import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Cart.css';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { cartItems, updateCart, clearBannerMessage } = useCart();
  const navigate = useNavigate(); // Initialize navigate function
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); // Import the t function
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Check if the cart is empty and close it if true
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/'); // Close the cart by navigating to the home page
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    // Simulate a loading effect
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000);

    // Cleanup timeout if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Clear the banner message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      clearBannerMessage();
    }, 5000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [clearBannerMessage]);

  const handleCompleteOrder = () => {
    localStorage.setItem('isInCheckoutFlow', 'true');
    navigate('/checkout'); // Navigate to the checkout page
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="checkout">
      <div className="checkout-section">
        <div className="checkout-summary">
          {isLoading ? (
            <Skeleton width={200} height={36} style={{ marginBottom: '28px' }} />
          ) : (
            <h2>{t('cart.title')}</h2>
          )}
          <div className="cart-wrapper" id="checkout-summary">
            <div className="cart-items">
              {isLoading ? (
                [...Array(cartItems.length)].map((_, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-product">
                      <p className="cart-item-header">
                        <Skeleton width={80} />
                      </p>
                      <p>
                        <Skeleton width={300} />
                      </p>
                    </div>
                    <div className="loading-cart-item-quantity-selector">
                      <p className="cart-item-header">
                        <Skeleton width={80} />
                      </p>
                      <Skeleton width={80} height={32} style={{ marginRight: '10px' }} />
                    </div>
                    <div>
                      <p className="cart-item-header">
                        <Skeleton width={80} />
                      </p>
                      <span>
                        <Skeleton width={50} />
                      </span>
                    </div>
                    <div>
                      <p className="cart-item-header">
                        <Skeleton width={80} />
                      </p>
                      <span>
                        <Skeleton width={50} />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-product">
                      <p className="cart-item-header">{t('cart.item')}</p>
                      <p>{item.title}</p>
                    </div>
                    <div className="cart-item-quantity-selector">
                      <p className="cart-item-header">{t('cart.qty')}</p>
                      <button onClick={() => updateCart(item.id, Math.max(item.quantity - 1, 0))}>
                        -
                      </button>
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-section" id="checkout-section-right">
        <div className="checkout-order-summary">
          {isLoading ? (
            <>
              <Skeleton width={200} height={20} />
              <Skeleton width={200} height={20} />
            </>
          ) : (
            <>
              <p>
                Subtotal ({cartItems.length} {t('checkout.items')}) ${total.toFixed(2)}
              </p>
            </>
          )}
        </div>
        <div className="checkout-submit">
          {isLoading ? (
            <Skeleton count={2} height={64} borderRadius={40} />
          ) : (
            <>
              <button
                className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}
                style={{ marginBottom: '12px' }}
                id="cart-secondary-btn"
                onClick={handleClose}
              >
                {t('cart.close_cart')}
              </button>

              <button
                onClick={handleCompleteOrder}
                className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                id="cart-primary-btn"
              >
                {t('cart.complete_order')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
