import React, { useState, useEffect } from 'react';
import './CoffeeProducts.css';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../../context/ProductContext';

const CoffeeProducts = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { category, setCategory, filteredProducts } = useProductContext(); // Removed allProducts and useMemo
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Start loading on category change

    const timer = setTimeout(() => {
      if (filteredProducts.length === 0) {
        setIsLoading(false);
        return;
      }

      // Load images for the selected category
      const loadImagePromises = filteredProducts.map(product => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = product.imgSrc;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(loadImagePromises).then(() => {
        setIsLoading(false);
      });
    }, 2000); // 2-second delay before checking image load status

    // Cleanup timer on unmount or category change
    return () => clearTimeout(timer);
  }, [filteredProducts]);

  const handleButtonClick = (category) => {
    setCategory(category);
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className={`coffee-products ${isLoading ? 'loading' : ''}`}>
      <div className="shop-title-loading" style={{ marginTop: '116px', marginBottom: '76px' }}>
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
              <img src={product.imgSrc} alt={t(`coffeeProducts.product${index + 1}_title`)} className="product-img" />
              <p className={`price-per-pound ${isDarkMode ? 'dark' : ''}`}>{t('coffeeProducts.save')}</p>
              <h2>{t(`coffeeProducts.product${index + 1}_title`)}</h2>
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
