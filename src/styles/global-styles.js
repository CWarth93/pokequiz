import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  @font-face {
    font-family: "Pokemon";
    src: url("/fonts/Pokemon/Pokemon-Solid.ttf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
`;

export default GlobalStyle;
