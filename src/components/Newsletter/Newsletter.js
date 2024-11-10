import React, { useState } from 'react';
import './Newsletter.css';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Newsletter = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); // Initialize the translation function
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
    console.log('Form data submitted:', formData);

    // Show translated success message after form submission
    setSuccessMessage(t('newsletter.successMessage'));

    // Clear the form fields after submission
    setFormData({
      name: '',
      email: ''
    });

    // Hide the success message after a few seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // 5 seconds
  };

  return (
    <section className={`newsletter ${isDarkMode ? 'dark' : ''}`}>
      <div className="newsletter-content">
        <h1>{t('newsletter.heading')}</h1>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder={t('newsletter.namePlaceholder')} 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder={t('newsletter.emailPlaceholder')} 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} id="newsletter-btn">
            {t('newsletter.submitButton')}
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
