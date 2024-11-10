import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Feature from '../components/Feature/Feature';
import Footer from '../components/Footer/Footer';

const AboutPage = () => {
  const { t } = useTranslation();

  // Define the features array using translations for headings and descriptions
  const featureItems = [
    {
      imageSrc: "/images/featureImage4.png",
      heading: t('about.bio_1_heading'), 
      description: t('about.bio_1_description'),
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage5.png",
      heading: t('about.bio_2_heading'), 
      description: t('about.bio_2_description'),
      buttonLabel: "",
      buttonLink: ""
    },
    {
      imageSrc: "/images/featureImage6.png",
      heading: t('about.bio_3_heading'), 
      description: t('about.bio_3_description'),
      buttonLabel: "",
      buttonLink: ""
    }
  ];

  return (
    <>
      <Header />
      <Hero
        imageSrc="/images/don-lucas.png"
        heading={t('about.heading')}
        paragraph={t('about.paragraph')}
        buttonLabels={[t('about.our_coffee'), t('about.place_order')]}
        buttonLinks={['/nuestro-cafe', '/tienda']}
      />
      {/* Pass the 'about' namespace to Feature component */}
      <Feature features={featureItems} namespace="about" />
      <Footer />
    </>
  );
};

export default AboutPage;
