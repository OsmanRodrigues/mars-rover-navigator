import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html{
    font-size: 24px;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    @font-face{
      font-family: ${({ theme }) => theme.typography.fontFamily};
      src: url('/static/fonts/Calculator.ttf');
      font-weight: 500;
      font-display: swap;
      text-rendering: optimizeLegibility;
    };
    ${({ theme: { colors, typography } }) =>
      `
    font-family: ${typography.fontFamily};
    background: ${colors.background};
    color: ${colors.primary};
  `}
  }
`;
