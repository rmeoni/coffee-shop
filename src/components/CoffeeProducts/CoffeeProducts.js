import React, { useState, useEffect } from 'react';
import './CoffeeProducts.css';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';

const CoffeeProducts = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('Molido');

  const allProducts = [
    { id: '1', imgSrc: '/images/product-image.svg', pricePerPound: '$9.96', title: t('coffeeProducts.product1_title'), category: 'Molido', price: '$299.00' },
    { id: '2', imgSrc: '/images/product-image.svg', pricePerPound: '$9.95', title: t('coffeeProducts.product2_title'), category: 'Molido', price: '$199.00' },
    { id: '3', imgSrc: '/images/product-image.svg', pricePerPound: '$9.99', title: t('coffeeProducts.product3_title'), category: 'Molido', price: '$99.00' },
    { id: '4', imgSrc: '/images/product-image.svg', pricePerPound: '$9.96', title: t('coffeeProducts.product4_title'), category: 'Grano', price: '$299.00' },
    { id: '5', imgSrc: '/images/product-image.svg', pricePerPound: '$9.95', title: t('coffeeProducts.product5_title'), category: 'Grano', price: '$199.00' },
    { id: '6', imgSrc: '/images/product-image.svg', pricePerPound: '$9.99', title: t('coffeeProducts.product6_title'), category: 'Grano', price: '$99.00' },
    { id: '7', imgSrc: '/images/product-image-2.svg', pricePerPound: '', title: t('coffeeProducts.product7_title'), category: 'Accesorios', price: '$9.99' },
  ];

  const filteredProducts = allProducts.filter(product => product.category === category);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Delay for 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount or when category changes
  }, [category]);

  const handleButtonClick = (category) => {
    setCategory(category);
    setIsLoading(true); // Set loading to true when category changes
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className={`coffee-products ${isLoading ? 'loading' : ''}`}>
      <div style={{ marginTop: '116px', marginBottom: '76px' }}>
        {isLoading ? (
          <Skeleton width={248} height={70} />
        ) : (
          <h1>{t('coffeeProducts.shop')}</h1>
        )}
      </div>

      <div className={`buttons ${isDarkMode ? 'dark' : ''}`}>
        {isLoading ? (
          <div className="skeleton-container">
            <Skeleton width={147} height={64} style={{ borderRadius: '50px' }} />
            <Skeleton width={147} height={64} style={{ borderRadius: '50px' }} />
            <Skeleton width={223} height={64} style={{ borderRadius: '50px' }} />
          </div>
        ) : (
          <>
            <button className={category === 'Molido' ? 'active' : ''} onClick={() => handleButtonClick('Molido')}>
              {t('coffeeProducts.ground')}
            </button>
            <button className={category === 'Grano' ? 'active' : ''} onClick={() => handleButtonClick('Grano')}>
              {t('coffeeProducts.bean')}
            </button>
            <button className={category === 'Accesorios' ? 'active' : ''} onClick={() => handleButtonClick('Accesorios')}>
              {t('coffeeProducts.accessories')}
            </button>
          </>
        )}
      </div>

      <div className="products">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="product">
              <Skeleton circle />
              <Skeleton width={452} height={140} style={{ marginTop: '40px' }} />
              <Skeleton width={200} height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
            </div>
          ))
        ) : (
          filteredProducts.map((product, index) => (
            <div key={index} className="product">
              <img src={product.imgSrc} alt={product.title} className="product-img" />
              <p className={`price-per-pound ${isDarkMode ? 'dark' : ''}`}>{t('coffeeProducts.save')}</p>
              <h2>{product.title}</h2>
              <p className="price">{product.price}</p>
              <button className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} onClick={() => handleViewDetails(product.id)} style={{ cursor: 'pointer'}}>
                {t('coffeeProducts.view_details')}
              </button>
            </div>
          ))
        )}
      </div>

      <p className="note">
        <strong>{t('coffeeProducts.limited_offer')}</strong>
        <br />
        <strong>{t('coffeeProducts.bonus')}</strong>
        <br />
        <strong>{t('coffeeProducts.guarantee')}</strong>
      </p>
    </section>
  );
};

export default CoffeeProducts;
