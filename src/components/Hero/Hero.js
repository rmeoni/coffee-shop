import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import Skeleton from 'react-loading-skeleton'; // Import Skeleton for loading placeholders
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Hero = ({ imageSrc, heading, paragraph, buttonLabels, buttonLinks, isSecondaryButtonExternal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Use context value
  const { t } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero ${isDarkMode ? 'dark' : ''}`}>
      {isLoading ? (
        <div className="hero-loading">
          <div className="hero-loading-text">
            <Skeleton width="90%" height={120} />
            <Skeleton width="90%" height={96} style={{ marginTop: '40px' }} />
            <Skeleton width="300px" height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
            <Skeleton width="300px" height={64} style={{ marginTop: '12px', borderRadius: '50px' }} />
          </div>
          <div className="hero-loading-image">
            <Skeleton style={{ width: '452px', height: '452px', borderRadius: '50%' }} />
          </div>
        </div>
      ) : (
        <>
          <div className="hero-text">
            <h1>{t(heading)}</h1> {/* Use translation for heading */}
            <p>{t(paragraph)}</p> {/* Use translation for paragraph */}
            <ul>
              <li>
                <a
                  href={buttonLinks[0]}
                  className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}
                  id="secondary-btn-hero"
                  target={isSecondaryButtonExternal ? '_blank' : '_self'} 
                  rel={isSecondaryButtonExternal ? 'noopener noreferrer' : undefined}
                >
                  {t(buttonLabels[0])} {/* Translate button label */}
                </a>
              </li>
              <li>
                <a href={buttonLinks[1]} className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`} id="hero-primary-btn">
                  {t(buttonLabels[1])} {/* Translate button label */}
                </a>
              </li>
            </ul>
          </div>
          <div className="hero-image">
            <img src={imageSrc} alt={t('hero.image_alt_text')} /> {/* You can add an alt text translation */}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
