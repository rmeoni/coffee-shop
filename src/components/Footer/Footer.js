import React, { useState, useEffect } from 'react';
import './Footer.css';
import coffeeLogoLight from '../../assets/images/logo.svg';
import coffeeLogoDark from '../../assets/images/logo-dark.svg';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();
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
              <img src={logo} alt="Café Don Lucas" />
            </div>
            <div className="footer-column">
              <h3>Empresa</h3>
              <ul>
                <li>Política De Garantía</li>
                <li>Nuestros Orígenes</li>
                <li>Nuestro Café</li>
                <li>Tienda</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Ayuda</h3>
              <ul>
                <li>Preguntas Frecuentes</li>
                <li>Distribuidores</li>
                <li>Compra1educa1</li>
                <li>Medio Ambiente</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Redes Sociales</h3>
              <ul>
                <li>Instagram</li>
                <li>Facebook</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contacto</h3>
              <ul>
                <li>hola@cafedonlucas.com</li>
                <li>www.cafedonlucas.com</li>
                <li>+502 2458-1863</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
