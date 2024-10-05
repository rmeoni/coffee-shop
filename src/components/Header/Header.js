import React, { useState, useEffect } from 'react';
import './Header.css';
import coffeeLogo from '../../assets/images/logo.svg';
import hamburgerIcon from '../../assets/images/hamburguer-icon.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={isLoading ? 'loading' : ''}>
      <nav>
        <ul className={`desktop-menu ${isLoading ? 'loading' : ''}`}>
          <li className="loading-item"><a href="/"><img src={coffeeLogo} id="coffeeLogo" alt="Logo" /></a></li>
          <li className="loading-item"><a href="/">Inicio</a></li>
          <li className="loading-item"><a href="/about">Orígenes</a></li>
          <li className="loading-item"><a href="/coffee">Nuestro Café</a></li>
          <li className="loading-item"><a href="/shop">Tienda</a></li>
          <li className="loading-item"><a href="/contact">Contacto</a></li>
        </ul>
        <div className={`mobile-menu-icon ${isLoading ? 'loading' : ''}`} onClick={toggleMobileMenu}>
          <img src={hamburgerIcon} alt="Menu" />
        </div>
        <a href="/" id="coffeeLogoMobile"><img src={coffeeLogo} alt="Logo" className={isLoading ? 'loading' : ''} /></a>
        {isMobileMenuOpen && (
          <ul className="mobile-menu">
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Orígenes</a></li>
            <li><a href="/coffee">Nuestro Café</a></li>
            <li><a href="/shop">Tienda</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
