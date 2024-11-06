import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Feature from '../components/Feature/Feature';
import Footer from '../components/Footer/Footer';

const AboutPage = () => {
  // Define the features array
  const featureItems = [
    {
      imageSrc: "/images/featureImage4.png",
      heading: "nació un 21 de Febrero de 1928 ",
      description: "Don Lucas nació en el municipio de San Rafael P.C. San Marcos, Guatemala. Creciendo en una familia de escasos recursos, sin acceso a más educación que un tercero primaria. Venció todas las probabilidades y las expectativas de cualquier persona.",
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage5.png",
      heading: "Cómo comenzó Don Lucas",
      description: "Comenzó cargando los bultos de 100 lbs. en su propia espalda, luego ahorro para comprar un caballo y poder llevar más bultos. Al pasar el tiempo Don Lucas tuvo la oportunidad de comprar su primer carro tipo agrícola a crédito, gracias a un gran amigo, y dueño en ese entonces de una finca cercana llamada Las Cruces.",
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage6.png",
      heading: "Camión con lecciones de conducir",
      description: "El problema era que Don Lucas no sabia manejar, así es que su amigo ofreció venderle el carro, junto con lecciones de manejo de su chofer.",
      buttonLabel: "",
      buttonLink: ""
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/don-lucas.png" // Direct path since the image is in the public folder
        heading="Origenes"
        paragraph="Don Lucas fue un hombre productivo, trabajador y caritativo que empezó con esta tradición cafetalera desde cero junto a su esposa Doña Mary hace más de 60 años."
        buttonLabels={['Nuestro Café', 'Hacer Pedido']}
        buttonLinks={['/nuestro-cafe', '/tienda']} // Add your dynamic links here
      />
      <Feature features={featureItems} id="aboutPage" /> {/* Pass the featureItems array here */}
      <Footer />
    </>
  );
};

export default AboutPage;
