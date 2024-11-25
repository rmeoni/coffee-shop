import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import './ReferEarn.css';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook

const ReferEarn = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isDarkMode } = useTheme(); // Use context value
  const { t } = useTranslation(); // Initialize useTranslation hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setFormSubmitted(true);
    
    // Hide the success message after a few seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000); // 5 seconds
  };

  return (
    <section className={`refer-earn ${isDarkMode ? 'dark' : ''}`}>
      <div className="refer-earn-content">
        <div className="refer-earn-text">
          <h1>{t('referEarn.title')}</h1>
          <p>{t('referEarn.description')}</p>
          <form className="refer-earn-form" onSubmit={handleSubmit}>
            <input type="text" placeholder={t('referEarn.namePlaceholder')} required />
            <input type="email" placeholder={t('referEarn.emailPlaceholder')} required />
            <input type="text" placeholder={t('referEarn.referralNamePlaceholder')} required />
            <input type="text" placeholder={t('referEarn.referralBusinessNamePlaceholder')} required />
            <input type="email" placeholder={t('referEarn.referralEmailPlaceholder')} required />
            <button type="submit" className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} id="refer-button">
              {t('referEarn.submitButton')}
            </button>
          </form>
        </div>
        <div className="refer-earn-photo">
          <img src="/images/refer-earn.svg" alt={t('referEarn.imageAlt')} />
        </div>
      </div>
      {formSubmitted && <div className="success-message">{t('referEarn.thankYouMessage')}</div>}
    </section>
  );
};

export default ReferEarn;
