import React from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateCart, isCartVisible, toggleCartVisibility } = useCart();
  const { isDarkMode } = useTheme();

  // Don't display the cart if it's empty or if isCartVisible is false
  if (!isCartVisible || cartItems.length === 0) return null;

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className={`cart ${isDarkMode ? 'dark' : ''}`}>
      <div className="cart-wrapper">
        <h2>Carrito</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-product">
                <p className="cart-item-header">Artículo</p>
                <p>{item.title}</p>
              </div>
              <div className="cart-item-quantity-selector">
                <p className="cart-item-header">Qty</p>
                <button onClick={() => updateCart(item.id, Math.max(item.quantity - 1, 0))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
              </div>
              <div>
                <p className="cart-item-header">Precio</p>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div>
                <p className="cart-item-header">Monto</p>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-checkout">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={toggleCartVisibility} className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`} style={{marginBottom: '12px'}}>
          Cerrar Carrito
        </button>
        <button className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}>Completar Orden</button>
      </div>
    </div>
  );
};

export default Cart;
