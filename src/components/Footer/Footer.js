import React from 'react';
import './Footer.css';
import coffeeLogoLight from '../../assets/images/logo.svg';
import coffeeLogoDark from '../../assets/images/logo-dark.svg';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

const Footer = () => {
  const { isDarkMode } = useTheme(); // Use context values
  // Choose the logo based on the dark mode state from context
  const logo = isDarkMode ? coffeeLogoDark : coffeeLogoLight;
  return (
    <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="footer-container">
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
      </div>
    </footer>
  );
};

export default Footer;
