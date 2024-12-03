import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../context/ProductContext';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import '../assets/styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { cartItems, updateCart } = useCart(); // Use updateCart
  const { allProducts } = useProductContext(); // Access all products from the context
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const product = allProducts.find((p) => p.id === id);

  const breadcrumbs = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/tienda' },
    { name: 'Product', link: '' },
  ];


  useEffect(() => {
    const loadImageWithDelay = () => {
      setTimeout(() => {
        if (product) {
          const img = new Image();
          img.src = product.imgSrc;
          img.onload = () => setIsLoading(false);
          img.onerror = () => setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }, 2000);
    };

    loadImageWithDelay();
  }, [product]);

  const handleIncrease = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity of existing item
      updateCart(product.id, existingItem.quantity + quantity, product.price, product.title);
    } else {
      // Add new item to the cart
      updateCart(product.id, quantity, product.price, product.title);
    }

    setQuantity(1); // Reset the quantity selector
    navigate('/carrito'); // Navigate to the cart page after adding the item
  };

  if (!product) {
    return <h2>{t('coffeeProducts.not_found')}</h2>;
  }

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs}/>
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
              <h1 id="product-details-title">{t(`coffeeProducts.product${product.id}_title`)}</h1>
              <h2>${product.price.toFixed(2)}</h2>

              <div className="quantity-selector">
                <button onClick={handleDecrease} className="quantity-btn">
                  -
                </button>
                <h3>{quantity}</h3>
                <button onClick={handleIncrease} className="quantity-btn">
                  +
                </button>
              </div>

              <button
                className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                onClick={handleAddToCart}
              >
                {t('coffeeProducts.add_to_cart')}
              </button>
            </div>
            <div className="hero-image" id="product-details-image">
              <img src={product.imgSrc} alt={t(`coffeeProducts.product${product.id}_title`)} />
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
