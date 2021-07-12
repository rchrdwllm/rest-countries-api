import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg: ${({ theme }) => theme.bg};
    --text: ${({ theme }) => theme.text};
    --els: ${({ theme }) => theme.els};
    --input: ${({ theme }) => theme.input};
  }
  html {
    scroll-behavior: smooth;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito Sans';
    transition-property: background-color;
    transition-duration: 0.25s;
  }
  body {
    font-weight: 600;
    background-color: var(--bg);
    color: var(--text);
    font-size: 1rem;
    button, input, select {
      position: relative;
      appearance: none;
      border: none;
      outline: none;
      background-color: transparent;
      color: inherit;
      font-weight: inherit;
      cursor: pointer;
      &::placeholder {
        color: var(--input);
      }
    }
    img {
      width: 100%;
    }
    p, span {
      line-height: 200%;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;
