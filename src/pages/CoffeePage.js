// src/pages/CofeePage.js
import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Feature from '../components/Feature/Feature';
import Footer from '../components/Footer/Footer';


const CoffeePage = () => {
  // Define the features array
  const featureItems = [
    {
      imageSrc: "/images/featureImage7.png",
      heading: "TOSTADO POR MAESTROS",
      description: "Contamos con servicios y precios especiales para mayoristas, benefíciate con nuestra tarifa especial de envíos y programa tu punto de re-orden hoy mismo!",
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage8.png",
      heading: "PARA TODOS LOS MÉTODOS",
      description: "Personalizamos nuestro café para que se empareje mejor a tu método de café preferido. Quieres una recomendación específica a tu método de preparación? Envíanos un mensaje.",
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/product-image-2.png",
      heading: "PERFIL DE TAZA",
      description: (
        <>
          Altura:  1,100/1,200 m s. n. m.<br />
          Región:  San Rafael P.C. San Marcos, Guatemala.<br />
          Variedad: Arábica, Caturra.<br />
          Proceso: Lavado y secado en patio.<br />
          Tueste: A la medida.<br />
          Tipo de Molienda: A la medida.
        </>
      ),
      buttonLabel: "",
      buttonLink: ""
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/nuestro-cafe.png"
        heading="Nuestro Café"
        paragraph="Café gourmet de origen único, cosechado a las faldas del volcán Tajumulco. Grano duro, de primera cosecha. Empacado en bolsa biodegradable. Rinde hasta 60 tazas por libra."
        buttonLabels={['Compra1educa1', 'Hacer Pedido']}
        buttonLinks={['/compra1educa1', '/tienda']} /* Add your dynamic links here */
      />
      <Feature features={featureItems} /> {/* Pass the featureItems array here */}
      <Footer />
    </>
  );
};

export default CoffeePage;
