import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Supporting1 from '../components/Supporting1/Supporting1';
import CoffeeProducts from '../components/CoffeeProducts/CoffeeProducts';
import Feature from '../components/Feature/Feature';
import Newsletter from '../components/Newsletter/Newsletter';
import Testimonials from '../components/Testimonials/Testimonials';
import ReferEarn from '../components/ReferEarn/ReferEarn';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  // Define the features array with static text, or you can use translations for headings and descriptions
  const featureItems = [
    {
      imageSrc: "/images/featureImage1.png",
      heading: "Atendemos las necesidades de tu negocio u oficina",
      description: "Contamos con servicios y precios especiales para mayoristas, benefíciate con nuestra tarifa especial de envíos.",
      buttonLabel: "Hacer Pedido",
      buttonLink: "/tienda"
    },
    {
      imageSrc: "/images/featureImage2.png",
      heading: "Don Lucas se levantaba todos los días a las 4 de la mañana",
      description: "Cuentan las historias que Don Lucas y Doña Mary se levantaban todos los días a las 4 de la mañana a trabajar los campos, y tener un día productivo y exitoso.",
      buttonLabel: "Nuestros orígenes",
      buttonLink: "/origenes"
    },
    {
      imageSrc: "/images/featureImage3.png",
      heading: "Comprometidos a apoyar la educación en Guatemala",
      description: "Cada mes enviamos el 10% de nuestras ganancias a diferentes organizaciones que apoyan la educación en Guatemala. Esfuerzo con el cual esperamos ayudar a brindar acceso a la educación en Guatemala.",
      buttonLabel: "Apoya la Educación",
      buttonLink: "/compra1educa1"
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/cdl-front-grano-spoon.png"
        heading="hero.heading"
        paragraph="hero.paragraph"
        buttonLabels={['hero.button1', 'hero.button2']}
        buttonLinks={['/origenes', '/tienda']}
      />
      <Supporting1 />
      <CoffeeProducts />
      <Feature features={featureItems} namespace="home" /> {/* Pass the namespace */}
      <Newsletter />
      <Testimonials />
      <ReferEarn />
      <Footer />
    </>
  );
};

export default HomePage;
