import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation for routing
import './CartIcon.css'; // Add styles for the cart icon

const CartIcon = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  // Check if the current path is '/carrito'
  const isCartPage = location.pathname === '/carrito';
  // Check if the current path is '/checkout'
  const isCheckoutPage = location.pathname === '/checkout';

  // Show the cart icon only if the cart is hidden, there are items in the cart, and not on the checkout page
  if (cartItems.length === 0 || isCheckoutPage || isCartPage) return null;

  return (
    <Link to="/carrito">
      <div className="cart-icon">
        <img src="/images/cart-icon.svg" alt="Cart" />
        <span className="cart-item-count">{cartItems.length}</span>
      </div>
    </Link>
  );
};

export default CartIcon;
