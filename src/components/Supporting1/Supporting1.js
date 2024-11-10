import React from 'react';
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

  const icon1 = isDarkMode ? icon1Dark : icon1Light;
  const icon2 = isDarkMode ? icon2Dark : icon2Light;
  const icon3 = isDarkMode ? icon3Dark : icon3Light;

  return (
    <div className={`supporting1 ${isDarkMode ? 'dark' : ''}`}>
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
    </div>
  );
};

export default Supporting1;
