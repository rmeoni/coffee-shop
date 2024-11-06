import React from 'react';
import './Supporting1.css';
import icon1Light from '../../assets/images/icon-1.svg';
import icon1Dark from '../../assets/images/icon-1-dark.svg';
import icon2Light from '../../assets/images/icon-2.svg';
import icon2Dark from '../../assets/images/icon-2-dark.svg';
import icon3Light from '../../assets/images/icon-3.svg';
import icon3Dark from '../../assets/images/icon-3-dark.svg';

import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook


const Supporting1 = () => {
  const { isDarkMode } = useTheme(); // Use context value
    // Choose the icon based on the dark mode state from context
    const icon1 = isDarkMode ? icon1Dark : icon1Light;
    const icon2 = isDarkMode ? icon2Dark : icon2Light;
    const icon3 = isDarkMode ? icon3Dark : icon3Light;

  return (
    <div class={`supporting1 ${isDarkMode ? 'dark' : ''}`}>
      <section className={`steps-section ${isDarkMode ? 'dark' : ''}`}>
        <div className="step">
          <h1>1</h1>
          <div className="step-icon"><img src={icon1} alt="icon"/></div>
          <h3>ELIGE TU CAFÉ</h3>
          <p>Elige entre nuestras variedades disponibles</p>
        </div>
        <div className="step">
          <h1>2</h1>
          <div className="step-icon"><img src={icon2} alt="icon" /></div>
          <h3>ORDENA EN LÍNEA</h3>
          <p>Coloca tus datos y dirección para recibir.</p>
        </div>
        <div className="step">
          <h1>3</h1>
          <div className="step-icon"><img src={icon3} alt="icon"/> </div>
          <h3>DISFRUTA</h3>
          <p>Recibe entre 3 a 5 días hábiles.</p>
        </div>
      </section>
      <section className="supporting-section">
        <div className="supporting-quote">
          <h1>“Nuestra misión es simple: Ayudar a despertar la productividad de los guatemaltecos con nuestro exclusivo café gourmet”</h1>
        </div>
      </section>
    </div>
  );
};

export default Supporting1;
