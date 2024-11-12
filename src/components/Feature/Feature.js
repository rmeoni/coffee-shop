import React, { useState, useEffect } from 'react';
import './Feature.css';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';

const Feature = ({ features, namespace }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImagesWithDelay = async () => {
      // Wait for 2 seconds before starting the image loading check
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const imagePromises = features.map((feature) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = feature.imageSrc;
          img.onload = resolve;
          img.onerror = resolve; // Resolve on error to avoid indefinite loading
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    };

    loadImagesWithDelay();
  }, [features]);

  return (
    <section className="feature">
      {features.map((feature, index) => (
        <div className={`feature-item ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
          {isLoading ? (
            // Skeleton loaders
            <>
              {index % 2 === 0 ? (
                <>
                  <div className="loading-feature-image">
                    <Skeleton width={360} height={360} style={{ borderRadius: '50%' }} />
                  </div>
                  <div className="loading-feature-text">
                    <Skeleton width="90%" height={160} />
                    <Skeleton width="90%" height={80} style={{ marginTop: '40px' }} />
                    <Skeleton width="50%" height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
                  </div>
                </>
              ) : (
                <>
                  <div className="loading-feature-text">
                    <Skeleton width="90%" height={160} />
                    <Skeleton width="90%" height={80} style={{ marginTop: '40px' }} />
                    <Skeleton width="50%" height={64} style={{ marginTop: '76px', borderRadius: '50px' }} />
                  </div>
                  <div className="loading-feature-image">
                    <Skeleton width={360} height={360} style={{ borderRadius: '50%' }} />
                  </div>
                </>
              )}
            </>
          ) : index % 2 === 0 ? (
            // Feature layout when not loading
            <>
              <div className="feature-image">
                <img src={feature.imageSrc} alt={`Feature ${index + 1}`} />
              </div>
              <div className="feature-text">
                <h1>{t(`${namespace}.bio_${index + 1}_heading`)}</h1>
                <p>{t(`${namespace}.bio_${index + 1}_description`)}</p>
                {feature.buttonLink && (
                  <button className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}>
                    <a href={feature.buttonLink}>
                      {t(`${namespace}.bio_${index + 1}_buttonLabel`)}
                    </a>
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="feature-text">
                <h1>{t(`${namespace}.bio_${index + 1}_heading`)}</h1>
                <p>{t(`${namespace}.bio_${index + 1}_description`)}</p>
                {feature.buttonLink && (
                  <button className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}>
                    <a href={feature.buttonLink} >
                      {t(`${namespace}.bio_${index + 1}_buttonLabel`)}
                    </a>
                  </button>
                )}
              </div>
              <div className="feature-image">
                <img src={feature.imageSrc} alt={`Feature ${index + 1}`} />
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Feature;
