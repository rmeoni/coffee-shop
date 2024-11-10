import React from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Cart.css';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cartItems, updateCart, isCartVisible, toggleCartVisibility } = useCart();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); // Import the t function

  // Don't display the cart if it's empty or if isCartVisible is false
  if (!isCartVisible || cartItems.length === 0) return null;

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className={`cart ${isDarkMode ? 'dark' : ''}`}>
      <div className="cart-wrapper">
        <h2>{t('cart.title')}</h2> {/* Translated "Carrito" */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-product">
                <p className="cart-item-header">{t('cart.item')}</p> {/* Translated "Artículo" */}
                <p>{item.title}</p>
              </div>
              <div className="cart-item-quantity-selector">
                <p className="cart-item-header">{t('cart.qty')}</p> {/* Translated "Qty" */}
                <button onClick={() => updateCart(item.id, Math.max(item.quantity - 1, 0))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
              </div>
              <div>
                <p className="cart-item-header">{t('cart.price')}</p> {/* Translated "Precio" */}
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div>
                <p className="cart-item-header">{t('cart.amount')}</p> {/* Translated "Monto" */}
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-checkout">
        <h3>{t('cart.total')}: ${total.toFixed(2)}</h3> {/* Translated "Total" */}
        <button onClick={toggleCartVisibility} className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`} style={{marginBottom: '12px'}} id="cart-secondary-button">
          {t('cart.close_cart')} {/* Translated "Cerrar Carrito" */}
        </button>
        <button className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}>{t('cart.complete_order')}</button> {/* Translated "Completar Orden" */}
      </div>
    </div>
  );
};

export default Cart;
