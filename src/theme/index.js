import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Microsoft JhengHei';
    background-color: rgb(0, 50, 78);
  }

  #root{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyle;
