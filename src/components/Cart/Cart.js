import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Cart.css';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { cartItems, updateCart, setBanner, clearBannerMessage } = useCart();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }
  }, [cartItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearBannerMessage();
    }, 5000);

    return () => clearTimeout(timer);
  }, [clearBannerMessage]);

  const handleCompleteOrder = () => {
    if (isCartEmpty) {
      setBanner({ message: t('cart.cart_empty_error'), type: 'error' });
      return
    } else {
      localStorage.setItem('isInCheckoutFlow', 'true');
      navigate('/checkout');
    }
  };

  const handleClose = () => {
    navigate('/tienda');
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
                !isCartEmpty ? (
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
                ) : (
                  <div>
                    <p>{t('cart.cart_empty')}</p>
                  </div>
                )
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
