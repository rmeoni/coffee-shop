import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../context/ProductContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../assets/styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const { allProducts } = useProductContext(); // Access all products from the context
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const product = allProducts.find(p => p.id === id); // Find the product from the context

  useEffect(() => {
    const loadImageWithDelay = () => {
      setTimeout(() => {
        if (product) {
          const img = new Image();
          img.src = product.imgSrc;
          img.onload = () => setIsLoading(false);
          img.onerror = () => setIsLoading(false);
        } else {
          setIsLoading(false); // Skip loading if product is not found
        }
      }, 2000);
    };

    loadImageWithDelay();
  }, [product]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

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

    setQuantity(1);
    navigate('/carrito'); // Navigate to the cart page after adding the item
  };

  if (!product) {
    return <h2>{t('coffeeProducts.not_found')}</h2>;
  }

  return (
    <>
      <Header />
      <section className={`product-details ${isDarkMode ? 'dark' : ''}`}>
        {isLoading ? (
          <div className="hero-loading">
            <div className="hero-loading-text">
              <Skeleton width="70%" height={200} />
              <Skeleton width="70%" height={48} style={{ marginTop: '20px' }} />
              <Skeleton width="200px" height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
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

              <div className="quantity-selector">
                <button onClick={handleDecrease} className="quantity-btn">-</button>
                <h3>{quantity}</h3>
                <button onClick={handleIncrease} className="quantity-btn">+</button>
              </div>

              <button
                className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                onClick={handleAddToCart}
              >
                {t('coffeeProducts.add_to_cart')}
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
