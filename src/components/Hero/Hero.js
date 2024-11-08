import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useTheme } from '../../context/ThemeContext'; // Import the useTheme hook
import Skeleton from 'react-loading-skeleton'; // Import Skeleton for loading placeholders
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

const Hero = ({ imageSrc, heading, paragraph, buttonLabels, buttonLinks }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Use context value

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
            <h1>{heading}</h1>
            <p>{paragraph}</p>
            <ul>
              <li>
                <a href={buttonLinks[0]} className={`secondary-btn-l ${isDarkMode ? 'dark' : ''}`} id="secondary-btn-hero">
                  {buttonLabels[0]}
                </a>
              </li>
              <li>
                <a href={buttonLinks[1]} className={`primary-btn-l ${isDarkMode ? 'dark' : ''}`}>
                  {buttonLabels[1]}
                </a>
              </li>
            </ul>
          </div>
          <div className="hero-image">
            <img src={imageSrc} alt="Coffee Bag" />
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
