import React, { useState } from 'react';
import './ReferEarn.css';

const ReferEarn = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setFormSubmitted(true);
  };

  return (
    <section className="refer-earn">
      {formSubmitted ? (
        <div className="success-message">¡Gracias por tu referencia!</div>
      ) : (
        <div className="refer-earn-content">
          <div className="refer-earn-text">
            <h1>REFIERE Y GANA Q500</h1>
            <p>¿Conoces algún negocio u oficina al que le pueda interesar nuestro café? Refiérenos a tu contacto, tu ganaras Q500 y tu referido 50% de descuento en su primer orden.</p>
            <form className="refer-earn-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Tu nombre *" required />
            <input type="email" placeholder="Tu correo electrónico *" required />
            <input type="text" placeholder="Nombre del referido *" required />
            <input type="text" placeholder="Nombre del negocio del referido *" required />
            <input type="email" placeholder="Correo Electrónico del referido *" required />
            <button type="submit" className="primary-btn-l" id="refer-button">REFERIR AHORA</button>
          </form>
          </div>
          <div className="refer-earn-photo">
            <img src="/images/refer-earn.svg" alt="Refer and Earn" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ReferEarn;
