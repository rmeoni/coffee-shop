import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartIcon.css'; // Add styles for the cart icon

const CartIcon = () => {
  const { cartItems, isCartVisible, toggleCartVisibility } = useCart();

  // Show the cart icon only if the cart is hidden and there are items in the cart
  if (isCartVisible || cartItems.length === 0) return null;

  return (
    <div className="cart-icon" onClick={toggleCartVisibility}>
      <img src="/images/cart-icon.svg" alt="Cart" />
      <span className="cart-item-count">{cartItems.length}</span>
    </div>
  );
};

export default CartIcon;
