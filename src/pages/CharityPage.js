import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Feature from '../components/Feature/Feature';
import Footer from '../components/Footer/Footer';

const CharityPage = () => {
  // Define the features array
  const featureItems = [
    {
      imageSrc: "/images/featureImage9.png",
      heading: "Casa Guatemala",
      description: "Actualmente Casa Guatemala brinda educación, servicios de salud y nutrición a más de 300 niños de las 30 aldeas mayas de los alrededores que, sin Casa Guatemala, no tendrían otra opción para brindar educación a sus hijos.",
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage10.png",
      heading: "La misión",
      description: "Casa Guatemala busca brindar una educación de calidad, alimentación saludable y atención médica primaria en un ambiente amoroso y seguro a los niños vulnerables de la Región Oriental de Guatemala Rural.",
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/product-image.png",
      heading: "COMPROMETIDOS A AYUDAR",
      description: "Compra1Educa1: Estamos comprometidos a donar el 10% de nuestras ganancias a proyectos que apoyan la educación en Guatemala.",
      buttonLabel: "",
      buttonLink: ""
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/charity.png" // Direct path since the image is in the public folder
        heading="Compra1educa1"
        paragraph="Estamos comprometidos a donar el 10% de nuestras ganancias a proyectos que apoyan la educación en Guatemala."
        buttonLabels={['Donar a casa', 'Hacer Pedido']}
        buttonLinks={['/', '/tienda']} // Add your dynamic links here
      />
      <Feature features={featureItems} id="aboutPage" /> {/* Pass the featureItems array here */}
      <Footer />
    </>
  );
};

export default CharityPage;
