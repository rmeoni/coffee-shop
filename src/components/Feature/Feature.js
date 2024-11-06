import React, { useState, useEffect } from 'react';
import './Feature.css';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import Skeleton from 'react-loading-skeleton'; // Import Skeleton for loading placeholders
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

const Feature = ({ features }) => {
  const { isDarkMode } = useTheme(); // Use context value
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="feature">
      {features.map((feature, index) => (
        <div className={`feature-item ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
          {isLoading ? (
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
            <>
              <div className="feature-image">
                <img src={feature.imageSrc} alt={`Feature ${index + 1}`} />
              </div>
              <div className="feature-text">
                <h1>{feature.heading}</h1>
                <p>{feature.description}</p>
                {feature.buttonLink && (
                  <a href={feature.buttonLink} className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}>
                    {feature.buttonLabel}
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="feature-text">
                <h1>{feature.heading}</h1>
                <p>{feature.description}</p>
                {feature.buttonLink && (
                  <a href={feature.buttonLink} className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`}>
                    {feature.buttonLabel}
                  </a>
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
