import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Feature from '../components/Feature/Feature';
import Footer from '../components/Footer/Footer';

const CoffeePage = () => {
  const { t } = useTranslation();

  // Define the features array using translations for headings and descriptions
  const featureItems = [
    {
      imageSrc: "/images/featureImage7.png",
      heading: t('coffee.bio_1_heading'),
      description: t('coffee.bio_1_description'),
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage8.png",
      heading: t('coffee.bio_2_heading'),
      description: t('coffee.bio_2_description'),
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/product-image-2.png",
      heading: t('coffee.bio_3_heading'),
      description: t('coffee.bio_3_description'),
      buttonLabel: "",
      buttonLink: ""
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/nuestro-cafe.png"
        heading={t('coffee.heading')}
        paragraph={t('coffee.paragraph')}
        buttonLabels={[t('coffee.our_coffee'), t('coffee.place_order')]}
        buttonLinks={['/compra1educa1', '/tienda']}
      />
      <Feature features={featureItems} namespace="coffee" />
      <Footer />
    </>
  );
};

export default CoffeePage;
