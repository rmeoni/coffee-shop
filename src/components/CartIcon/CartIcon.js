import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom'; // Import useLocation for routing
import './CartIcon.css'; // Add styles for the cart icon

const CartIcon = () => {
  const { cartItems, isCartVisible, toggleCartVisibility } = useCart();
  const location = useLocation();

  // Check if the current path is '/checkout'
  const isCheckoutPage = location.pathname === '/checkout';

  // Show the cart icon only if the cart is hidden, there are items in the cart, and not on the checkout page
  if (isCartVisible || cartItems.length === 0 || isCheckoutPage) return null;

  return (
    <div className="cart-icon" onClick={toggleCartVisibility}>
      <img src="/images/cart-icon.svg" alt="Cart" />
      <span className="cart-item-count">{cartItems.length}</span>
    </div>
  );
};

export default CartIcon;
