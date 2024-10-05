import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Supporting1 from '../components/Supporting1/Supporting1';
import SubscriptionPlans from '../components/SubscriptionPlans/SubscriptionPlans';
import Feature from '../components/Feature/Feature';
import Newsletter from '../components/Newsletter/Newsletter';
import Testimonials from '../components/Testimonials/Testimonials';
import ReferEarn from '../components/ReferEarn/ReferEarn';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/product-image-2.svg" // Direct path since the image is in the public folder
        heading="Despierta tu productividad"
        paragraph="En todo lo que hacemos, creemos en la productividad y el café de Guatemala. Nuestro café es Gourmet porque es de un solo origen. Hacemos que sea fácil pedir café para tu casa, negocio u oficina."
        buttonLabels={['Crear Cuenta', 'Hacer Pedido']}
        buttonLinks={['/crear-cuenta', '/hacer-pedido']} // Add your dynamic links here
      />
      <Supporting1 />
      <SubscriptionPlans />
      <Feature />
      <Newsletter />
      <Testimonials />
      <ReferEarn />
      <Footer />
    </>
  );
};

export default HomePage;
