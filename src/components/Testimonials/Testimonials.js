import React, { useEffect, useState } from 'react';
import './Testimonials.css';
import leftArrow from '../../assets/images/left-arrow.svg';  
import rightArrow from '../../assets/images/right-arrow.svg'; 
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const testimonialsData = [
  {
    text: "testimonial.testimonial1_text", // Reference translation key
    author: "testimonial.testimonial1_author", 
    title: "testimonial.testimonial1_title",
    image: "/images/testimonial1.svg",  
  },
  {
    text: "testimonial.testimonial2_text",
    author: "testimonial.testimonial2_author",
    title: "testimonial.testimonial2_title",
    image: "/images/testimonial2.svg",
  },
  {
    text: "testimonial.testimonial3_text",
    author: "testimonial.testimonial3_author",
    title: "testimonial.testimonial3_title",
    image: "/images/testimonial3.svg",
  },
  {
    text: "testimonial.testimonial4_text",
    author: "testimonial.testimonial4_author",
    title: "testimonial.testimonial4_title",
    image: "/images/testimonial4.svg",
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { isDarkMode } = useTheme(); // Use context values
  const { t } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className={`testimonials ${isDarkMode ? 'dark' : ''}`}>
      <div className="testimonial-carousel">
        <button className="arrow left" onClick={handlePrevious}>
          <img src={leftArrow} alt={t('testimonial.previous')} />
        </button>
        {testimonialsData.map((testimonial, index) => (
          <div
            className={`testimonial ${
              index === currentTestimonial ? 'active' : ''
            }`}
            key={index}
          >
            <img src={testimonial.image} alt={t(testimonial.author)} className="testimonial-image" />
            <div className="testimonial-content">
              <p className="testimonial-text">"{t(testimonial.text)}"</p>
              <p className="testimonial-author"><strong>{t(testimonial.author)}</strong></p>
              <p className="testimonial-title">{t(testimonial.title)}</p>
            </div>
          </div>
        ))}
        <button className="arrow right" onClick={handleNext}>
          <img src={rightArrow} alt={t('testimonial.next')} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
