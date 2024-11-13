import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Supporting1.css';
import icon1Light from '../../assets/images/icon-1.svg';
import icon1Dark from '../../assets/images/icon-1-dark.svg';
import icon2Light from '../../assets/images/icon-2.svg';
import icon2Dark from '../../assets/images/icon-2-dark.svg';
import icon3Light from '../../assets/images/icon-3.svg';
import icon3Dark from '../../assets/images/icon-3-dark.svg';

import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Supporting1 = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const icon1 = isDarkMode ? icon1Dark : icon1Light;
  const icon2 = isDarkMode ? icon2Dark : icon2Light;
  const icon3 = isDarkMode ? icon3Dark : icon3Light;

  useEffect(() => {
    // Wait 2 seconds before starting to check if all images are loaded
    const timer = setTimeout(() => {
      const images = [icon1, icon2, icon3];
      let loadedCount = 0;

      images.forEach((src, index) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
          loadedCount += 1;
          if (loadedCount === images.length) {
            setIsLoading(false); // Set to false once all images are loaded
          }
        };

        img.onerror = () => {
          console.error(`Image ${index + 1} failed to load:`, src);
          setIsLoading(false); // Stop loading if any image fails to load
        };
      });
    }, 2000);

    // Cleanup timer if component unmounts before images load
    return () => clearTimeout(timer);
  }, [icon1, icon2, icon3]);

  return (
    <div className={`supporting1 ${isDarkMode ? 'dark' : ''}`}>
      {isLoading ? (
        <div>
          <section className="steps-section-loading">
            {[...Array(3)].map((_, index) => (
              <div className="step-loading" key={index}>
                <Skeleton circle width={216} height={216} />
                <Skeleton width="70%" height={24} style={{ marginTop: '32px' }} />
                <Skeleton width="90%" height={24} style={{ marginTop: '18px' }} />
              </div>
            ))}
          </section>
          <section className="feature-text-loading">
          <Skeleton width="80%" height={120} style={{ marginBottom: '18px' }} />
          <Skeleton width="80%" height={120} />
          </section>
        </div>
      ) : (
        <>
          <section className={`steps-section ${isDarkMode ? 'dark' : ''}`}>
            <div className="step">
              <h1>1</h1>
              <div className="step-icon"><img src={icon1} alt="icon" /></div>
              <h3>{t('supporting1.choose_coffee')}</h3>
              <p>{t('supporting1.choose_description')}</p>
            </div>
            <div className="step">
              <h1>2</h1>
              <div className="step-icon"><img src={icon2} alt="icon" /></div>
              <h3>{t('supporting1.order_online')}</h3>
              <p>{t('supporting1.order_description')}</p>
            </div>
            <div className="step">
              <h1>3</h1>
              <div className="step-icon"><img src={icon3} alt="icon" /></div>
              <h3>{t('supporting1.enjoy')}</h3>
              <p>{t('supporting1.enjoy_description')}</p>
            </div>
          </section>
          <section className="supporting-section">
            <div className="supporting-quote">
              <h1>{t('supporting1.mission_quote')}</h1>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Supporting1;
