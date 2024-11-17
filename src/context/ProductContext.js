import React, { createContext, useState, useContext, useMemo } from 'react';

// Create Product Context
const ProductContext = createContext();

// ProductProvider component to wrap the app
export const ProductProvider = ({ children }) => {
  const [category, setCategory] = useState('Molido');

  const allProducts = useMemo(() => [
    { id: '1', imgSrc: '/images/product-image.png', pricePerPound: '$9.96', title: 'Box of 30 Pounds of Gourmet Ground Coffee', category: 'Molido', price: '$299.00' },
    { id: '2', imgSrc: '/images/product-image.png', pricePerPound: '$9.95', title: 'Box of 20 Pounds of Gourmet Ground Coffee', category: 'Molido', price: '$199.00' },
    { id: '3', imgSrc: '/images/product-image.png', pricePerPound: '$9.99', title: 'Box of 10 Pounds of Gourmet Ground Coffee', category: 'Molido', price: '$99.00' },
    { id: '4', imgSrc: '/images/product-image.png', pricePerPound: '$9.96', title: 'Box of 30 Pounds of Gourmet Whole Bean Coffee', category: 'Grano', price: '$299.00' },
    { id: '5', imgSrc: '/images/product-image.png', pricePerPound: '$9.95', title: 'Box of 20 Pounds of Gourmet Whole Bean Coffee', category: 'Grano', price: '$199.00' },
    { id: '6', imgSrc: '/images/product-image.png', pricePerPound: '$9.99', title: 'Box of 10 Pounds of Gourmet Whole Bean Coffee', category: 'Grano', price: '$99.00' },
    { id: '7', imgSrc: '/images/product-image-2.png', pricePerPound: '', title: 'Accessories 1', category: 'Accesorios', price: '$9.99' },
  ], []);

  const filteredProducts = useMemo(() => allProducts.filter(product => product.category === category), [allProducts, category]);

  return (
    <ProductContext.Provider value={{ category, setCategory, filteredProducts, allProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useProductContext = () => useContext(ProductContext);
