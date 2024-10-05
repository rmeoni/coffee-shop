import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ imageSrc, heading, paragraph, buttonLabels, buttonLinks }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      {isLoading ? (
        <div className="hero-loading">
          <div className="hero-loading-text">
            <div className="hero-loading-item" style={{ width: '70%', height: '120px' }}></div>
            <div className="hero-loading-item" style={{ width: '50%', height: '60px', marginTop: '20px' }}></div>
            <div className="hero-loading-item" style={{ width: '30%', height: '40px', marginTop: '90px' }}></div>
            <div className="hero-loading-item" style={{ width: '30%', height: '40px', marginTop: '20px' }}></div>
          </div>
          <div className="hero-loading-image">
            <div className="hero-loading-item" style={{ width: '360px', height: '360px', borderRadius: '50%' }}></div>
          </div>
        </div>
      ) : (
        <>
          <div className="hero-text">
            <h1>{heading}</h1>
            <p>{paragraph}</p>
            <ul>
              <li>
                <a href={buttonLinks[0]} className="secondary-btn-l" id="secondary-btn-hero">
                  {buttonLabels[0]}
                </a>
              </li>
              <li>
                <a href={buttonLinks[1]} className="primary-btn-l">
                  {buttonLabels[1]}
                </a>
              </li>
            </ul>
          </div>
          <div className="hero-image">
            <img src={imageSrc} alt="Hero Content" />
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
