import React, { useState } from 'react';
import './SubscriptionPlans.css';

const SubscriptionPlans = () => {
  const allPlans = [
    { imgSrc: '/images/product-image.svg', pricePerPound: 'Q82.25', title: 'Suscripción Mensual 4 Libras', category: 'Molido', price: 'Q329.00' },
    { imgSrc: '/images/product-image.svg', pricePerPound: 'Q87.66', title: 'Suscripción Mensual 3 Libras', category: 'Molido', price: 'Q263.00' },
    { imgSrc: '/images/product-image.svg', pricePerPound: 'Q89.55', title: 'Suscripción Mensual 2 Libras', category: 'Molido', price: 'Q179.00' },
    { imgSrc: '/images/product-image.svg', pricePerPound: 'Q85.25', title: 'Suscripción Mensual 4 Libras', category: 'Grano', price: 'Q340.00' },
    { imgSrc: '/images/product-image.svg', pricePerPound: 'Q88.66', title: 'Suscripción Mensual 3 Libras', category: 'Grano', price: 'Q266.00' },
    { imgSrc: '/images/product-image.svg', pricePerPound: 'Q90.55', title: 'Suscripción Mensual 2 Libras', category: 'Grano', price: 'Q181.00' },
    { imgSrc: '/images/product-image-2.svg', pricePerPound: '', title: 'Cuchara + Clip de Madera 2 en 1', category: 'Accesorios', price: 'Q99.00' },
  ];

  const [category, setCategory] = useState('Molido');
  const [isLoading, setIsLoading] = useState(false);
  const filteredPlans = allPlans.filter(plan => plan.category === category);

  const handleButtonClick = (category) => {
    setIsLoading(true);
    setCategory(category);

    // Simulate loading effect for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className={`subscription-plans ${isLoading ? 'loading' : ''}`}>
      <div className="buttons">
        <button className={category === 'Molido' ? 'active' : ''} onClick={() => handleButtonClick('Molido')}>Molido</button>
        <button className={category === 'Grano' ? 'active' : ''} onClick={() => handleButtonClick('Grano')}>Grano</button>
        <button className={category === 'Accesorios' ? 'active' : ''} onClick={() => handleButtonClick('Accesorios')}>Accesorios</button>
      </div>
      <div className="plans">
        {filteredPlans.map((plan, index) => (
          <div key={index} className="plan">
            <img src={plan.imgSrc} alt={plan.title} className="plan-img" />
            <p className="price-per-pound">{plan.pricePerPound} Por Libra</p>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <button className="primary-btn-s">Ver Detalles</button>
          </div>
        ))}
      </div>
      <p className="note">*Nuestras suscripciones estarán disponibles próximamente. <a href="#subscribe">Suscríbete a nuestras noticias</a> y se el primero en enterarte.</p>
    </section>
  );
};

export default SubscriptionPlans;
