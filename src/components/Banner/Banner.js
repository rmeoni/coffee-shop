import React, { useState, useEffect } from 'react';
import closeIconDark from '../../assets/images/icon-close-dark.svg';
import './Banner.css';
import { useCart } from '../../context/CartContext';

const Banner = () => {
  const { banner, clearBannerMessage } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  // Update visibility when banner message changes
  useEffect(() => {
    if (banner.message) {
      setIsVisible(true);
      console.log("Banner visible with message:", banner.message);
    }
  }, [banner]);

  const handleClose = () => {
    setIsVisible(false);
    clearBannerMessage();
  };

  if (!isVisible || !banner.message) return null;

  return (
    <div className={`banner banner-${banner.type}`}>
      <div className="banner-wrapper">
        <section className="banner-content">
          <p>{banner.message}</p>
        </section>
        <section className="banner-close">
          <img
            className="banner-icon-close"
            src={closeIconDark}
            alt="Close Icon"
            onClick={handleClose}
          />
        </section>
      </div>
    </div>
  );
};

export default Banner;
