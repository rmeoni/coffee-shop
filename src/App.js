import React, { useEffect } from 'react';
import GlobalStyle from './assets/styles/globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoffeePage from './pages/CoffeePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import BlogPage from './pages/BlogPage';
import CharityPage from './pages/CharityPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import { ProductProvider } from './context/ProductContext'; // Import the ProductProvider
import CartIcon from './components/CartIcon/CartIcon'; // Import the CartIcon component
import Banner from './components/Banner/Banner';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './i18n';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Banner />
      <CartIcon /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/origenes" element={<AboutPage />} />
        <Route path="/nuestro-cafe" element={<CoffeePage />} />
        <Route path="/tienda" element={<ShopPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/compra1educa1" element={<CharityPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <ProductProvider> 
          <AppContent />
        </ProductProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
