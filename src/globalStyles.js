// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Montserrat", sans-serif;
  }  
  h1 {
    font-size: 3.75em;
    font-weight: 900;
    text-transform: uppercase;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }

  h3 {
    font-size: 1.2em;
    font-weight: bold;
  }

  p {
    font-size: 1em;
  }

  .secondary-btn-s {
    background: transparent;
    border: 3px solid #01172F;
    border-radius: 32px;
    color: #01172F;
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
  }

  .secondary-btn-l {
    background: transparent;
    border: 4px solid #01172F;
    border-radius: 32px;
    color: #01172F;
    padding: 6px 24px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    transition: background-color 0.3s;
  }

  .secondary-btn-s:hover, .secondary-btn-l:hover {
    background-color: #D9D9D9;
  }

  .primary-btn-l {
    background: #01172F;
    border: 3px solid #01172F;
    border-radius: 32px;
    color: #EFE5DE;
    padding: 6px 24px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
  }
`;

export default GlobalStyle;
