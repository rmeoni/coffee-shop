import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import './Footer.css';
import coffeeLogoLight from '../../assets/images/logo.svg';
import coffeeLogoDark from '../../assets/images/logo-dark.svg';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();  // Initialize useTranslation hook
  const logo = isDarkMode ? coffeeLogoDark : coffeeLogoLight;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="footer-container">
        {isLoading ? (
          <div className="footer-columns">
            <div className="footer-logo footer-column">
              <Skeleton circle width={150} height={150} />
            </div>
            <div className='footer-column'>
              <Skeleton width={100} height={20} style={{ marginBottom: '16px' }} />
              <Skeleton count={4} width={160} height={20} style={{ margin: '8px 0' }} />
            </div>
            <div className='footer-column'>
              <Skeleton width={100} height={20} style={{ marginBottom: '16px' }} />
              <Skeleton count={4} width={160} height={20} style={{ margin: '8px 0' }} />
            </div>
            <div className='footer-column'>
              <Skeleton width={100} height={20} style={{ marginBottom: '16px' }} />
              <Skeleton count={2} width={160} height={20} style={{ margin: '8px 0' }} />
            </div>
            <div className='footer-column'>
              <Skeleton width={100} height={20} style={{ marginBottom: '16px' }} />
              <Skeleton count={3} width={160} height={20} style={{ margin: '8px 0' }} />
            </div>
          </div>
        ) : (
          <div className="footer-columns">
            <div className="footer-logo footer-column">
              <img src={logo} alt={t('footer.logoAlt')} />
            </div>
            <div className="footer-column">
              <h3>{t('footer.company')}</h3>
              <ul>
                <li>{t('footer.policy')}</li>
                <li>{t('footer.origins')}</li>
                <li>{t('footer.ourCoffee')}</li>
                <li>{t('footer.store')}</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>{t('footer.help')}</h3>
              <ul>
                <li>{t('footer.faq')}</li>
                <li>{t('footer.distributors')}</li>
                <li>{t('footer.buyEducate')}</li>
                <li>{t('footer.environment')}</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>{t('footer.socialMedia')}</h3>
              <ul>
                <li>{t('footer.instagram')}</li>
                <li>{t('footer.facebook')}</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>{t('footer.contact')}</h3>
              <ul>
                <li>{t('footer.email')}</li>
                <li>{t('footer.website')}</li>
                <li>{t('footer.phone')}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
