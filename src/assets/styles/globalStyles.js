// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Montserrat", sans-serif;
    background-color: #EFE5DE;
    padding-left: 96px;
    padding-right: 96px;
  }
  body.dark {
    background-color: #121212;
  }
  .react-loading-skeleton {
    --base-color:#ffffff !important;
  }  
  body.dark .react-loading-skeleton {
    --base-color:#000000 !important;
    --highlight-color: #121212;
  }
  body h1 {
    font-size: 60px;
    line-height: 60px;
    font-weight: 900;
    text-transform: uppercase;
    color: #01172F;
    margin-bottom: 40px;
    margin-top: 0px;
  }
  
  body.dark h1 {
    color: #fff;
  }

  body h2 {
    font-size: 32px;
    line-height: 40px;
    font-weight: extra-bold;
    text-transform: uppercase;
    color: #01172F;
  }

  body.dark h2 {
    color: #fff;
  }
  
  body h3 {
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    color: #01172F;
    text-transform: uppercase;
  }

  body.dark h3 {
    color: #fff;
  }
    
  body p {
    font-size: 20px;
    line-height: 24px;
    color: #01172F;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }
  
  body.dark p {
    color: #fff;
  }

  body span {
    color: #01172F;
  }

  body.dark span {
    color: #ffffff;
  }

  input {
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    background-color: #EFE5DE;
    padding: 16px;
    margin-bottom: 20px;
    border: 1.2px solid #01172F;
    border-radius: 12px;
    color: #01172F;
  }

  input:focus {
    outline: none !important;
  }

  input::placeholder {
    color: #344559;
  }

  body.dark input {
    background-color: #121212;
    border: 1.2px solid #ffffff;
    color: #fff;
  }

  body.dark input::placeholder {
    color: #F9F5F2;
  }

  .secondary-btn-s {
    font-family: "Montserrat", sans-serif;
    background: transparent;
    border: 3px solid #01172F;
    border-radius: 32px;
    color: #01172F;
    padding: 4px 12px;
    text-transform: uppercase;
    font-weight: 700;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  body.dark .secondary-btn-s {
    background: transparent;
    border: 3px solid #fff;
    border-radius: 32px;
    color: #fff;
    padding: 4px 12px;
    text-transform: uppercase;
    font-weight: 700;
    transition: background-color 0.3s;
  }

  .primary-btn-s {
    background: #01172F;
    border: 3px solid #01172F;
    border-radius: 32px;
    color: #EFE5DE;
    padding: 4px 12px;
    text-transform: uppercase;
    font-weight: 700;
    cursor:pointer;
  }

   body.dark .primary-btn-s {
    background: #fff;
    border: 3px solid #fff;
    border-radius: 32px;
    color: #000;
    padding: 4px 12px;
    text-transform: uppercase;
    font-weight: 700;
  }

  .secondary-btn-s:hover, .secondary-btn-l:hover {
    background-color: #D9D9D9;
  }

  .secondary-btn-l {
    font-family: "Montserrat", sans-serif;
    background: transparent;
    border: 4px solid #01172F;
    border-radius: 50px;
    color: #01172F;
    padding: 6px 24px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    transition: background-color 0.3s;
    white-space: nowrap; /* Prevents text from wrapping to the next line */
    overflow: hidden; /* Ensures content stays within the button bounds */
    cursor:pointer;
    min-height: 64px !important;
    letter-spacing: 1.6px;
  }

  .secondary-btn-l a {
    color: #01172F;
    text-decoration: none !important;
  }


  body.dark .secondary-btn-l {
    color: #fff !important;
    border: 4px solid #fff;
  }

  body.dark .secondary-btn-l a {
    color: #ffffff;
    text-decoration: none !important;
  }

  body.dark .secondary-btn-l:hover {
    background-color: #414141;
  }

  .primary-btn-l {
    font-family: "Montserrat", sans-serif;
    background: #01172F;
    border: 4px solid #01172F;
    border-radius: 50px;
    color: #EFE5DE;
    padding: 6px 24px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    cursor:pointer;
    min-height: 64px !important;
    letter-spacing: 1.6px;
  }

  .primary-btn-l a {
    color: #EFE5DE;
    text-decoration: none !important;
  }
   
  body.dark .primary-btn-l {
    background: #fff;
    color: #000;
    border: 4px solid #fff;
  }

  body.dark .primary-btn-l a {
    color: #000000;
    text-decoration: none !important;
  }

  @media (max-width: 820px) {
    body {
      padding-left: 24px;
      padding-right: 24px;
    }

    body h1 {
      font-size: 32px;
      line-height: 36px;
    }
    
    body h2 {
      font-size: 24px;
      line-height: 28px;
    }

    body h3 {
      font-size: 16px;
      line-height: 16px;
    }
    
    input {
      font-size: 16px;
    }

    .primary-btn-l {
      font-size: 20px;
    }

    .secondary-btn-l {
      font-size: 20px;
    }
  }
`;

export default GlobalStyle;
