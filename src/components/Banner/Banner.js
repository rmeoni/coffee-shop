import React, { useState, useEffect } from 'react';
import closeIconDark from '../../assets/images/icon-close-dark.svg';
import './Banner.css'; // CSS file to style the banner
import { useTranslation } from 'react-i18next';

const Banner = ({ type = 'info', message, onClose }) => { //Types: 'error', 'success', 'info'
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Always show the banner when message or type changes
        setIsVisible(true);

        // Check if the banner was previously closed and stored in localStorage
        const storedBannerState = localStorage.getItem('bannerClosed');
        if (storedBannerState === 'true') {
            setIsVisible(false);  // Keep the banner hidden if the user has closed it before
        } else {
            setIsVisible(true);  // Show it if it wasn't closed
        }
    }, [message, type]); // Runs whenever message or type changes

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('bannerClosed', 'true');
        if (onClose) {
            onClose();
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`banner banner-${type}`}>
            <div className="banner-wrapper">
                <section className="banner-content">
                    <p>{message || t('banner.defaultMessage')}</p>
                </section>
                <section className="banner-close">
                    <img className="banner-icon-close" src={closeIconDark} alt="Close Icon" onClick={handleClose} />
                </section>
            </div>
        </div>
    );
};

export default Banner;
