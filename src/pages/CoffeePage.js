import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';


const CoffeePage = () => {
  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/don-lucas.png" // Direct path since the image is in the public folder
        heading="Nuestro Café"
        paragraph="Don Lucas fue un hombre productivo, trabajador y caritativo que empezó con esta tradición cafetalera desde cero junto a su esposa Doña Mary hace más de 60 años , practicando siempre la excelencia y la pasión por el café, heredándola a travez del ejemplo."
        buttonLabels={['Nuestro Café', 'Hacer Pedido']}
        buttonLinks={['/crear-cuenta', '/hacer-pedido']} // Add your dynamic links here
      />
    </>
  );
};

export default CoffeePage;
