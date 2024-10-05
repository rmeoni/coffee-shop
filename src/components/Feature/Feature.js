import React from 'react';
import './Feature.css';
import featureImage1 from '../../assets/images/featureImage1.png';
import featureImage2 from '../../assets/images/featureImage2.png';
import featureImage3 from '../../assets/images/featureImage3.png';

const Feature = () => {
  return (
    <section className="feature">
      <div className="feature-item">
        <div className="feature-image">
          <img src={featureImage1} alt="Feature 1" />
        </div>
        <div className="feature-text">
          <h1>Atendemos las necesidades de tu negocio u oficina. Precios especiales para mayoristas.</h1>
          <p>Contamos con servicios y precios especiales para mayoristas, benefíciate con nuestra tarifa especial de envíos y programa tu punto de re-orden hoy mismo!</p>
          <a href="/" className="primary-btn-l" id="feature-primary-btn">Conocer Más</a>
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-text">
          <h1>Ahorra tiempo: inscríbete a nuestra suscripción mensual.</h1>
          <p>Programa un despertar exitoso cada mañana al suscribirte a nuestro plan mensual. Fresco o Gratis, olvídate de colas y recordatorios de compra. cancela cuando quieras.</p>
          <a href="/" className="secondary-btn-l" id="feature-secondary-btn">Programar Café</a>
        </div>
        <div className="feature-image">
          <img src={featureImage2} alt="Feature 2" />
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-image">
          <img src={featureImage3} alt="Feature 3" />
        </div>
        <div className="feature-text">
          <h1>Comprometidos a apoyar la educación en Guatemala.</h1>
          <p>Cada mes enviamos el 10% de nuestras ganancias a diferentes organizaciones que apoyan la educación en Guatemala. Esfuerzo con el cual esperamos ayudar a brindar acceso a la educación en Guatemala.</p>
          <a href="/" className="secondary-btn-l" id="feature-secondary-btn">Apoya la Educación</a>
        </div>
      </div>
    </section>
  );
};

export default Feature;
