import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Cart.css';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cartItems, updateCart } = useCart();
  const navigate = useNavigate(); // Initialize navigate function
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); // Import the t function
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Function to handle the Complete Order button click
  const handleCompleteOrder = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className={`cart ${isDarkMode ? 'dark' : ''}`}>
      <div className="cart-wrapper">
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
        <h3>{t('cart.subtotal')}: ${total.toFixed(2)}</h3>
        <Link to="/tienda">
          <button className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`} style={{ marginBottom: '12px' }} id="cart-secondary-btn">
            {t('cart.close_cart')}
          </button>
        </Link>
        <button onClick={handleCompleteOrder} className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} id="cart-primary-btn">
          {t('cart.complete_order')}
        </button>
      </div>
    </div>
  );
};

export default Cart;
