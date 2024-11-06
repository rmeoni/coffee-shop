import React, { useEffect, useState } from 'react';
import './Testimonials.css';
import leftArrow from '../../assets/images/left-arrow.svg';  
import rightArrow from '../../assets/images/right-arrow.svg'; 
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

const testimonialsData = [
  {
    text: "Este café es totalmente delicioso. Tiene un aroma exquisito y sabe mmmmmm.... me encanta! 100% recomendado!",
    author: "Katherine B.",
    title: "CFO",
    image: "/images/testimonial1.svg",  
  },
  {
    text: "Me encanta el ambiente del lugar, muy acogedor.",
    author: "Ana Martínez",
    title: "Marketing Manager",
    image: "/images/testimonial2.svg",
  },
  {
    text: "El mejor café que he probado en años.",
    author: "Luis Gómez",
    title: "Software Engineer",
    image: "/images/testimonial3.svg",
  },
  {
    text: "Servicio excelente y productos de calidad.",
    author: "María Rodríguez",
    title: "Designer",
    image: "/images/testimonial4.svg",
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use context values

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
    <section className={`testimonials ${isDarkMode ? 'dark': ''}`}>
      <div className="testimonial-carousel">
        <button className="arrow left" onClick={handlePrevious}>
          <img src={leftArrow} alt="Previous" />
        </button>
        {testimonialsData.map((testimonial, index) => (
          <div
            className={`testimonial ${
              index === currentTestimonial ? 'active' : ''
            }`}
            key={index}
          >
            <img src={testimonial.image} alt={testimonial.author} className="testimonial-image" />
            <div className="testimonial-content">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author"><strong>{testimonial.author}</strong></p>
              <p className="testimonial-title">{testimonial.title}</p>
            </div>
          </div>
        ))}
        <button className="arrow right" onClick={handleNext}>
          <img src={rightArrow} alt="Next" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
