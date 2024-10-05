import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder for the API call to send form data to Google Sheets
    // Replace the console.log statement with actual API call
    console.log('Form data submitted:', formData);

    // Show success message after form submission
    setSuccessMessage('¡Gracias por suscribirte!');

    // Clear the form fields after submission
    setFormData({
      name: '',
      email: ''
    });

    // Hide the success message after a few seconds (optional)
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // 5 seconds
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h1>Suscríbete a nuestras noticias y obtén una guía para aumentar la productividad en tu consumo de café.</h1>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Nombre Completo *" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Correo Electrónico *" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="primary-btn-l" id="newsletter-btn">Enviar</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
