import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Header.css';
import coffeeLogoLight from '../../assets/images/logo.svg';
import coffeeLogoDark from '../../assets/images/logo-dark.svg';
import hamburgerIconLight from '../../assets/images/hamburguer-icon.svg';
import hamburgerIconDark from '../../assets/images/hamburguer-icon-dark.svg';
import closeIconLight from '../../assets/images/icon-close.svg';
import closeIconDark from '../../assets/images/icon-close-dark.svg';
import iconToggleDarkMode from '../../assets/images/icon-toggle-dark-mode.svg';
import iconToggleLightMode from '../../assets/images/icon-toggle-light-mode.svg';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logo = isDarkMode ? coffeeLogoDark : coffeeLogoLight;
  const toggleIcon = isDarkMode ? iconToggleLightMode : iconToggleDarkMode;
  const hamburgerIcon = isDarkMode ? hamburgerIconDark : hamburgerIconLight;
  const closeIcon = isDarkMode ? closeIconDark : closeIconLight;

  return (
    <header className={`${isDarkMode ? 'dark' : ''}`}>
      <nav>
        <div className="desktop-menu">
          <section className="logo-section">
            <a href="/">
              {isLoading ? (
                <Skeleton circle={true} height={140} width={140} />
              ) : (
                <img src={logo} id="coffeeLogo" alt="Logo" />
              )}
            </a>
          </section>
          <section className="menu-section">
            <ul>
              {isLoading ? (
                <>
                  <li><Skeleton height={32} width={80} /></li>
                  <li><Skeleton height={32} width={80} /></li>
                  <li><Skeleton height={32} width={128} /></li>
                  <li><Skeleton height={32} width={80} /></li>
                  <li><Skeleton height={32} width={128} /></li>
                  <li><Skeleton height={32} width={115} /></li>
                </>
              ) : (
                <>
                  <li><a href="/">Inicio</a></li>
                  <li><a href="/origenes">Orígenes</a></li>
                  <li><a href="/nuestro-cafe">Nuestro Café</a></li>
                  <li><a href="/tienda">Tienda</a></li>
                  <li><a href="/compra1educa1">Compra1educa1</a></li>
                  <li>
                    <img
                      src={toggleIcon}
                      alt="Toggle Dark Mode"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDarkMode();
                      }}
                      style={{ cursor: 'pointer', height: '36px' }}
                    />
                  </li>
                </>
              )}
            </ul>
          </section>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isLoading ? (
            <Skeleton height={28} width={34} />
          ) : (
            <img src={isMobileMenuOpen ? closeIcon : hamburgerIcon} alt="Menu" />
          )}
        </div>
        <a href="/" id="coffeeLogoMobile">
          {isLoading ? (
            <Skeleton circle={true} height={128} width={128} />
          ) : (
            <img src={logo} alt="Logo" />
          )}
        </a>
        {isMobileMenuOpen && (
          <ul className={`mobile-menu ${isDarkMode ? 'dark' : ''}`}>
            {isLoading ? (
              <>
                <li><Skeleton width={80} /></li>
                <li><Skeleton width={80} /></li>
                <li><Skeleton width={80} /></li>
                <li><Skeleton width={80} /></li>
                <li><Skeleton width={80} /></li>
                <li><Skeleton circle={true} height={20} width={20} /></li>
              </>
            ) : (
              <>
                <li><a href="/">Inicio</a></li>
                <li><a href="/origenes">Orígenes</a></li>
                <li><a href="/nuestro-cafe">Nuestro Café</a></li>
                <li><a href="/tienda">Tienda</a></li>
                <li><a href="/compra1educa1">Compra1educa1</a></li>
                <li>
                    <img
                      src={toggleIcon}
                      alt="Toggle Dark Mode"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDarkMode();
                      }}
                      style={{ cursor: 'pointer', height: '36px' }}
                    />
                  </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
