import React from 'react';
import './Supporting1.css';

const Supporting1 = () => {
  return (
    <div>
      <section className="steps-section">
        <div className="step">
          <h1>1</h1>
          <div className="step-icon step-icon-1"></div>
          <h3>ELIGE TU CAFÉ</h3>
          <p>Elige entre nuestras variedades disponibles</p>
        </div>
        <div className="step">
          <h1>2</h1>
          <div className="step-icon step-icon-2"></div>
          <h3>ORDENA EN LÍNEA</h3>
          <p>Coloca tus datos y dirección para recibir.</p>
        </div>
        <div className="step">
          <h1>3</h1>
          <div className="step-icon step-icon-3"></div>
          <h3>DISFRUTA</h3>
          <p>Recibe entre 3 a 5 días hábiles.</p>
        </div>
      </section>
      <section className="supporting-section">
        <div className="supporting-quote">
          <h1>“Nuestra misión es simple: Ayudar a despertar la productividad de los guatemaltecos con nuestro exclusivo café gourmet.”</h1>
        </div>
      </section>
    </div>
  );
};

export default Supporting1;
