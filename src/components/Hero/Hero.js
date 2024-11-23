import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton for loading placeholders
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Hero = ({ imageSrc, heading, paragraph, buttonLabels, buttonLinks, isSecondaryButtonExternal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Use context value
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();

  useEffect(() => {
    // Set a 2-second delay before checking if the image has loaded
    const timer = setTimeout(() => {
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        setIsLoading(false); // Stop loading once the image is loaded
      };

      img.onerror = () => {
        console.error('Image failed to load:', imageSrc);
        setIsLoading(false); // Stop loading if image fails to load
      };
    }, 2000); // Delay for 2 seconds

    // Cleanup timeout if the component unmounts before the timer finishes
    return () => {
      clearTimeout(timer);
    };
  }, [imageSrc]);

  const handleViewDetails = (link, isSecondaryButtonExternal) => {
    if (isSecondaryButtonExternal) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link);
    }
  };

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
                <button className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}
                  onClick={() => handleViewDetails(buttonLinks[0], isSecondaryButtonExternal)}
                  id="secondary-btn-hero"
                >
                  {t(buttonLabels[0])} {/* Translate button label */}
                </button>
              </li>
              <li>
                <button className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}
                onClick={() => handleViewDetails(buttonLinks[1], false)}         
                >
                {t(buttonLabels[1])} {/* Translate button label */}
              </button>
            </li>
          </ul>
        </div>
      <div className="hero-image">
        <img
          src={imageSrc}
          alt={t('hero.image_alt_text')}
        />
      </div>
    </>
  )
}
    </section >
  );
};

export default Hero;
