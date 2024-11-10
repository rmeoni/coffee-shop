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
import languageIconLight from '../../assets/images/language.svg';
import languageIconDark from '../../assets/images/language-dark.svg';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Save the language in localStorage
  };

  const logo = isDarkMode ? coffeeLogoDark : coffeeLogoLight;
  const toggleIcon = isDarkMode ? iconToggleLightMode : iconToggleDarkMode;
  const hamburgerIcon = isDarkMode ? hamburgerIconDark : hamburgerIconLight;
  const closeIcon = isDarkMode ? closeIconDark : closeIconLight;
  const languageIcon = isDarkMode ? languageIconDark : languageIconLight;

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
                  <li><a href="/">{t('header.home')}</a></li>
                  <li><a href="/origenes">{t('header.origins')}</a></li>
                  <li><a href="/nuestro-cafe">{t('header.our_coffee')}</a></li>
                  <li><a href="/tienda">{t('header.shop')}</a></li>
                  <li><a href="/compra1educa1">{t('header.charity')}</a></li>
                  <li className="language-selector">
                    <span>
                      {t('header.language')}
                      <img src={languageIcon} style={{ width: '30', height: '30' }} id="language-icon" alt="Language Icon" />
                    </span>
                    <ul className="language-options">
                      <li onClick={() => handleLanguageChange("es")}>{t('header.spanish')}</li>
                      <li onClick={() => handleLanguageChange("en")}>{t('header.english')}</li>
                    </ul>
                  </li>
                  <li>
                    <img
                      src={toggleIcon}
                      alt={t('header.toggle_dark_mode')}
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
                <li><a href="/">{t('header.home')}</a></li>
                <li><a href="/origenes">{t('header.origins')}</a></li>
                <li><a href="/nuestro-cafe">{t('header.our_coffee')}</a></li>
                <li><a href="/tienda">{t('header.shop')}</a></li>
                <li><a href="/compra1educa1">{t('header.charity')}</a></li>
                <li className="language-selector">
                  <span>
                    {t('header.language')}
                    <img src={languageIcon} style={{ width: '30', height: '30' }} id="language-icon" alt="Language Icon" />
                  </span>
                  <ul className="language-options">
                    <li onClick={() => handleLanguageChange("es")}>{t('header.spanish')}</li>
                    <li onClick={() => handleLanguageChange("en")}>{t('header.english')}</li>
                  </ul>
                </li>
                <li>
                  <img
                    src={toggleIcon}
                    alt={t('header.toggle_dark_mode')}
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
