import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Feature from '../components/Feature/Feature';
import Footer from '../components/Footer/Footer';

const CharityPage = () => {
  const { t } = useTranslation();

  // Define the features array using translations for headings and descriptions
  const featureItems = [
    {
      imageSrc: "/images/featureImage9.png",
      heading: t('charity.bio_1_heading'),
      description: t('charity.bio_1_description'),
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage10.png",
      heading: t('charity.bio_2_heading'),
      description: t('charity.bio_2_description'),
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/product-image.png",
      heading: t('charity.bio_3_heading'),
      description: t('charity.bio_3_description'),
      buttonLabel: "",
      buttonLink: ""
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/charity.png"
        heading={t('charity.heading')}
        paragraph={t('charity.paragraph')}
        buttonLabels={[t('charity.donate_button'), t('charity.place_order_button')]}
        buttonLinks={['https://casa-guatemala.org/', '/tienda']} // Add your dynamic links here
        isSecondaryButtonExternal={true} 
      />
      <Feature features={featureItems} namespace="charity" /> {/* Pass the 'charity' namespace */}
      <Footer />
    </>
  );
};

export default CharityPage;
