// src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import '../assets/styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  // Sync cart items to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  const allProducts = [
    { id: '1', imgSrc: '/images/product-image.svg', pricePerPound: '$9.96', title: 'Caja 30 Libras de Café Gourmet Molido', category: 'Molido', price: 299.00 },
    { id: '2', imgSrc: '/images/product-image.svg', pricePerPound: '$9.95', title: 'Caja 20 Libras de Café Gourmet Molido', category: 'Molido', price: 199.00 },
    { id: '3', imgSrc: '/images/product-image.svg', pricePerPound: '$9.99', title: 'Caja 10 Libras de Café Gourmet Molido', category: 'Molido', price: 99.00 },
    { id: '4', imgSrc: '/images/product-image.svg', pricePerPound: '$9.96', title: 'Caja 30 Libras de Café Gourmet Grano', category: 'Grano', price: 299.00 },
    { id: '5', imgSrc: '/images/product-image.svg', pricePerPound: '$9.95', title: 'Caja 20 Libras de Café Gourmet Grano', category: 'Grano', price: 199.00 },
    { id: '6', imgSrc: '/images/product-image.svg', pricePerPound: '$9.99', title: 'Caja 10 Libras de Café Gourmet Grano', category: 'Grano', price: 99.00 },
    { id: '7', imgSrc: '/images/product-image-2.svg', pricePerPound: '', title: 'Cuchara + Clip de Madera 2 en 1', category: 'Accesorios', price: 9.99 },
  ];

  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleIncrease = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1);
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    setQuantity(1); // Reset quantity to 1
  };

  return (
    <>
      <Header />
      <section className={`product-details ${isDarkMode ? 'dark' : ''}`}>
        {isLoading ? (
          <div className="hero-loading">
            <div className="hero-loading-text">
              <Skeleton width="70%" height={200} />
              <Skeleton width="70%" height={48} style={{ marginTop: '20px' }} />
              <Skeleton width="40%" height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
            </div>
            <div className="hero-loading-image">
              <Skeleton circle width={452} height={452} />
            </div>
          </div>
        ) : (
          <>
            <div className="hero-text">
              <h1 id="product-details-title">{product.title}</h1>
              <h2>${product.price.toFixed(2)}</h2>

              {/* Counter for selecting quantity */}
              <div className="quantity-selector">
                <button onClick={handleDecrease} className="quantity-btn">-</button>
                <h3>{quantity}</h3>
                <button onClick={handleIncrease} className="quantity-btn">+</button>
              </div>

              {/* Add to Cart button */}
              <button
                className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className="hero-image" id="product-details-image">
              <img src={product.imgSrc} alt={product.title} />
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
