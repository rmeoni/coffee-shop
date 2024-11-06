// src/components/CoffeeProducts.js
import React, { useState, useEffect } from 'react';
import './CoffeeProducts.css';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Skeleton from 'react-loading-skeleton'; // Import Skeleton for loading placeholders
import 'react-loading-skeleton/dist/skeleton.css'; // Import the skeleton styles

const CoffeeProducts = () => {
  const { isDarkMode } = useTheme(); // Use context value
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [isLoading, setIsLoading] = useState(true); // Set loading state
  const [category, setCategory] = useState('Molido');

  // All product items
  const allProducts = [
    { id: '1', imgSrc: '/images/product-image.svg', pricePerPound: '$9.96', title: 'Caja 30 Libras de Café Gourmet Molido', category: 'Molido', price: '$299.00' },
    { id: '2', imgSrc: '/images/product-image.svg', pricePerPound: '$9.95', title: 'Caja 20 Libras de Café Gourmet Molido', category: 'Molido', price: '$199.00', },
    { id: '3', imgSrc: '/images/product-image.svg', pricePerPound: '$9.99', title: 'Caja 10 Libras de Café Gourmet Molido', category: 'Molido', price: '$99.00', },
    { id: '4', imgSrc: '/images/product-image.svg', pricePerPound: '$9.96', title: 'Caja 30 Libras de Café Gourmet Grano', category: 'Grano', price: '$299.00', },
    { id: '5', imgSrc: '/images/product-image.svg', pricePerPound: '$9.95', title: 'Caja 20 Libras de Café Gourmet Grano', category: 'Grano', price: '$199.00', },
    { id: '6', imgSrc: '/images/product-image.svg', pricePerPound: '$9.99', title: 'Caja 10 Libras de Café Gourmet Grano', category: 'Grano', price: '$99.00', },
    { id: '7', imgSrc: '/images/product-image-2.svg', pricePerPound: '', title: 'Cuchara + Clip de Madera 2 en 1', category: 'Accesorios', price: '$9.99', },
  ];

  // Filter products based on the selected category
  const filteredProducts = allProducts.filter(product => product.category === category);

  // Simulate the loading effect when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds loading time
    return () => clearTimeout(timer);
  }, [category]); // Reload loading state when category changes

  // Handle category button click with simulated loading
  const handleButtonClick = (category) => {
    setCategory(category);
  };

  // Handle product detail view navigation
  const handleViewDetails = (id) => {
    navigate(`/product/${id}`); // Navigate to the product detail page using product ID
  };

  return (
    <section className={`coffee-products ${isLoading ? 'loading' : ''}`}>
      {/* Title section */}
      <div style={{ marginTop: '116px', marginBottom: '76px' }}>
        {isLoading ? (
          <Skeleton width={248} height={70} />
        ) : (
          <h1>Tienda</h1>
        )}
      </div>

      {/* Category buttons */}
      <div className={`buttons ${isDarkMode ? 'dark' : ''}`}>
        {isLoading ? (
          <div className="skeleton-container">
            <Skeleton width={147} height={64} style={{ borderRadius: '50px' }}/>
            <Skeleton width={147} height={64} style={{ borderRadius: '50px' }} />
            <Skeleton width={223} height={64} style={{ borderRadius: '50px' }} />
          </div>
        ) : (
          <>
            <button className={category === 'Molido' ? 'active' : ''} onClick={() => handleButtonClick('Molido')}>Molido</button>
            <button className={category === 'Grano' ? 'active' : ''} onClick={() => handleButtonClick('Grano')}>Grano</button>
            <button className={category === 'Accesorios' ? 'active' : ''} onClick={() => handleButtonClick('Accesorios')}>Accesorios</button>
          </>
        )}
      </div>

      {/* Products grid */}
      <div className="products">
        {isLoading ? (
          // Show skeletons when loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="product">
              <Skeleton circle />
              <Skeleton width={452} height={140} style={{ marginTop: '40px' }} />
              <Skeleton width={200} height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
            </div>
          ))
        ) : (
          // Show actual products when not loading
          filteredProducts.map((product, index) => (
            <div key={index} className="product">
              <img src={product.imgSrc} alt={product.title} className="product-img" />
              <p className={`price-per-pound ${isDarkMode ? 'dark' : ''}`}>Ahorra 10%</p>
              <h2>{product.title}</h2>
              <p className="price">{product.price}</p>
              <button className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} onClick={() => handleViewDetails(product.id)} style={{ cursor: 'pointer'}}>Ver Detalles</button>
            </div>
          ))
        )}
      </div>

      {/* Note */}
      <p className="note"><strong>*SOLO POR TIEMPO LIMITADO:</strong> 2x1 en tu primer pedido + descuentos por volumen + 2 cuchara clip de madera
      <br></br><strong>*BONO:</strong> Comienza a ganar puntos desde tu primer pedido con nuestro Programa de Lealtad</p>
    </section>
  );
};

export default CoffeeProducts;
