import React from 'react';
import './Footer.css';
import logo from '../../assets/images/logo.svg'; // Adjust the path to your logo image

const Footer = () => {
  return (
    <footer className="footer">
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
